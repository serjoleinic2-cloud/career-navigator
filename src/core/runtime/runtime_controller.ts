import type { JourneyRuntimeState } from './journey_runtime';
import { initializeJourneyRuntime } from './journey_runtime';
import type { OnboardingState } from '../onboarding/onboarding_state';
import type { UserAction } from '../skill_engine';
import type { SkillNode } from '../skill_state';
import { getActiveChapters, getActiveProfession } from '../profession_loader';
import type { Chapter } from '../chapter_model';
import { getNextChapter, getCurrentChapter } from '../chapter_engine';
import { processUserAction } from '../interaction/interaction_engine';
import { checkNodeAccess } from '../premium/premium_gate';
import type { PremiumState } from '../premium/premium_state';
import { emit } from '../events/system_event_bus';

let runtimeState: JourneyRuntimeState | null = null;

export function startJourney(onboardingState: OnboardingState): JourneyRuntimeState {
  runtimeState = initializeJourneyRuntime(onboardingState);
  emit('SYSTEM_BOOTED', { userId: onboardingState.professionId ?? 'anonymous' });
  emit('UI_REFRESH', {});
  return runtimeState;
}

export function getRuntimeState(): JourneyRuntimeState | null {
  return runtimeState;
}

export function setActiveNode(nodeId: string): JourneyRuntimeState {
  if (!runtimeState) {
    throw new Error('Runtime not initialized');
  }
  runtimeState = { ...runtimeState, activeNodeId: nodeId };
  emit('NODE_CHANGED', { nodeId });
  emit('UI_REFRESH', {});
  return runtimeState;
}

export function advanceNode(
  _action: UserAction,
  premiumState?: PremiumState
): JourneyRuntimeState {
  if (!runtimeState) {
    throw new Error('Runtime not initialized');
  }

  if (premiumState) {
    const profession = getActiveProfession();
    const activeNode = profession.skillGraph.find(n => n.id === runtimeState!.activeNodeId);
    if (activeNode) {
      const nodeIndex = profession.skillGraph.indexOf(activeNode);
      const chapterIndex = Math.floor(nodeIndex / 3);
      const access = checkNodeAccess(premiumState, chapterIndex);
      if (!access.allowed) {
        return runtimeState;
      }
    }
  }

  const result = processUserAction(
    'complete_task',
    runtimeState.nodeStates,
    runtimeState.activeNodeId
  );

  const updatedNodeMap: Record<string, SkillNode> = {};
  for (const n of result.updatedSkillNodes) {
    updatedNodeMap[n.id] = n;
  }

  const chapters = getActiveChapters();
  const currentChapter = getCurrentChapter(chapters, updatedNodeMap);

  const prevChapterId = runtimeState.activeChapterId;
  const newChapterId = currentChapter?.id ?? prevChapterId;

  runtimeState = {
    ...runtimeState,
    nodeStates: updatedNodeMap,
    readinessScore: result.updatedReadiness.readinessScore,
    confidenceScore: result.updatedReadiness.confidenceScore,
    chapterProgress: Object.fromEntries(
      result.updatedChapterProgress.map(c => [c.chapterId, c.percent])
    ),
    activeChapterId: newChapterId,
  };

  emit('STATE_UPDATED', { nodeId: runtimeState.activeNodeId });
  emit('SCORE_UPDATED', { readiness: runtimeState.readinessScore, confidence: runtimeState.confidenceScore });
  emit('CONFIDENCE_CHANGED', { confidence: runtimeState.confidenceScore });
  emit('TASK_COMPLETED', { nodeId: runtimeState.activeNodeId });

  if (newChapterId !== prevChapterId) {
    emit('CHAPTER_CHANGED', { chapterId: newChapterId });
  }

  if (result.updatedGaps.length > 0) {
    emit('GAP_UPDATED', { gapCount: result.updatedGaps.length });
  }

  emit('UI_REFRESH', {});

  return runtimeState;
}

export function advanceChapter(): JourneyRuntimeState {
  if (!runtimeState) {
    throw new Error('Runtime not initialized');
  }
  const chapters = getActiveChapters();
  const currentChapter: Chapter | undefined = chapters.find(
    ch => ch.nodeIds.includes(runtimeState!.activeNodeId)
  );
  if (!currentChapter) {
    throw new Error('Current chapter not found');
  }
  const next = getNextChapter(chapters, currentChapter.id);
  if (!next) {
    throw new Error('No next chapter available');
  }
  const nextNodeId = next.nodeIds[0];
  if (!nextNodeId) {
    throw new Error('Next chapter has no nodes');
  }
  runtimeState = { ...runtimeState, activeNodeId: nextNodeId };

  emit('CHAPTER_CHANGED', { chapterId: next.id });
  emit('NODE_CHANGED', { nodeId: nextNodeId });
  emit('UI_REFRESH', {});

  return runtimeState;
}

export function resetRuntime(): void {
  runtimeState = null;
  emit('UI_REFRESH', {});
}
