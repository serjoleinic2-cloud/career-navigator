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
import { runLearningCycle } from '../learning/learning_engine';
import type { SkillState } from '../skill_state';
import { emit } from '../events/system_event_bus';

let runtimeState: JourneyRuntimeState | null = null;

export function startJourney(onboardingState: OnboardingState): JourneyRuntimeState {
  runtimeState = initializeJourneyRuntime(onboardingState);
  emit('SYSTEM_BOOTED', {
    professionId: runtimeState.professionId,
  });
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
  const previousNodeId = runtimeState.activeNodeId;
  runtimeState = { ...runtimeState, activeNodeId: nodeId };
  emit('NODE_CHANGED', { nodeId, previousNodeId });
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
        emit('TASK_FAILED', {
          nodeId: runtimeState.activeNodeId,
          reason: 'premium_locked',
        });
        return runtimeState;
      }
    }
  }

  const activeNode = runtimeState.nodeStates[runtimeState.activeNodeId];
  const previousState: SkillState = activeNode?.state ?? 'locked';

  const result = processUserAction(
    'complete_task',
    runtimeState.nodeStates,
    runtimeState.activeNodeId
  );

  const updatedNodeMap: Record<string, SkillNode> = {};
  for (const n of result.updatedSkillNodes) {
    updatedNodeMap[n.id] = n;
  }

  const newNode = updatedNodeMap[runtimeState.activeNodeId];
  const newState: SkillState = newNode?.state ?? previousState;

  const chapters = getActiveChapters();
  const currentChapter = getCurrentChapter(chapters, updatedNodeMap);
  const previousChapterId = runtimeState.activeChapterId;

  const streak = 0;
  const totalNodes = Object.keys(updatedNodeMap).length;
  const completedNodes = Object.values(updatedNodeMap).filter(
    n => n.state === 'confidence'
  ).length;

  const learningResult = runLearningCycle(
    activeNode ?? newNode,
    previousState,
    newState,
    runtimeState.confidenceScore,
    runtimeState.readinessScore,
    streak,
    totalNodes,
    completedNodes,
    updatedNodeMap
  );

  runtimeState = {
    ...runtimeState,
    nodeStates: updatedNodeMap,
    readinessScore: learningResult.updatedReadiness,
    confidenceScore: learningResult.updatedConfidence,
    chapterProgress: Object.fromEntries(
      result.updatedChapterProgress.map(c => [c.chapterId, c.percent])
    ),
    activeChapterId: currentChapter?.id ?? runtimeState.activeChapterId,
  };

  emit('STATE_UPDATED', {
    readinessScore: runtimeState.readinessScore,
    confidenceScore: runtimeState.confidenceScore,
    chapterProgress: runtimeState.chapterProgress,
  });
  emit('SCORE_UPDATED', {
    readinessScore: runtimeState.readinessScore,
    confidenceScore: runtimeState.confidenceScore,
  });
  emit('CONFIDENCE_CHANGED', {
    confidenceScore: runtimeState.confidenceScore,
  });

  if (result.rewards.chapterCompleted) {
    emit('CHAPTER_CHANGED', {
      chapterId: currentChapter?.id ?? '',
      previousChapterId,
    });
    emit('CHAPTER_UNLOCKED', {
      chapterId: currentChapter?.id ?? '',
    });
  }

  emit('TASK_COMPLETED', {
    nodeId: runtimeState.activeNodeId,
    action: 'complete_task',
    newState: updatedNodeMap[runtimeState.activeNodeId]?.state,
  });

  if (result.updatedGaps.length > 0) {
    emit('GAP_UPDATED', { gaps: result.updatedGaps });
  }

  emit('LEARNING_FEEDBACK', {
    feedback: learningResult.feedback,
    recommendation: learningResult.recommendation,
  });

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
  const previousChapterId = runtimeState.activeChapterId;
  runtimeState = { ...runtimeState, activeNodeId: nextNodeId };
  emit('CHAPTER_CHANGED', {
    chapterId: next.id,
    previousChapterId,
  });
  emit('NODE_CHANGED', {
    nodeId: nextNodeId,
    previousNodeId: runtimeState.activeNodeId,
  });
  emit('UI_REFRESH', {});
  return runtimeState;
}

export function resetRuntime(): void {
  runtimeState = null;
  emit('UI_REFRESH', {});
}
