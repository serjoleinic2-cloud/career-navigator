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

let runtimeState: JourneyRuntimeState | null = null;

export function startJourney(onboardingState: OnboardingState): JourneyRuntimeState {
  runtimeState = initializeJourneyRuntime(onboardingState);
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

  runtimeState = {
    ...runtimeState,
    nodeStates: updatedNodeMap,
    readinessScore: result.updatedReadiness.readinessScore,
    confidenceScore: result.updatedReadiness.confidenceScore,
    chapterProgress: Object.fromEntries(
      result.updatedChapterProgress.map(c => [c.chapterId, c.percent])
    ),
    activeChapterId: currentChapter?.id ?? runtimeState.activeChapterId,
  };

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
  return runtimeState;
}

export function resetRuntime(): void {
  runtimeState = null;
}
