import type { JourneyRuntimeState } from './journey_runtime';
import { initializeJourneyRuntime } from './journey_runtime';
import type { OnboardingState } from '../onboarding/onboarding_state';
import type { UserAction } from '../skill_engine';
import type { SkillNode } from '../skill_state';
import { getActiveChapters, getActiveProfession } from '../profession_loader';
import type { Chapter } from '../chapter_model';
import { getNextChapter, getCurrentChapter } from '../chapter_engine';
import { checkNodeAccess } from '../premium/premium_gate';
import type { PremiumState } from '../premium/premium_state';
import { emit } from '../events/system_event_bus';
import {
  startAttempt,
  completeAttempt,
  evaluateAttempt,
  applyAttemptResult,
} from '../attempt/attempt_engine';
import type { Attempt, AttemptResult, AttemptOutcome } from '../attempt/attempt_engine';

let runtimeState: JourneyRuntimeState | null = null;
let currentAttempt: Attempt | null = null;

export function startJourney(onboardingState: OnboardingState): JourneyRuntimeState {
  runtimeState = initializeJourneyRuntime(onboardingState);
  emit('SYSTEM_BOOTED', { professionId: runtimeState.professionId });
  emit('UI_REFRESH', {});
  return runtimeState;
}

export function getRuntimeState(): JourneyRuntimeState | null {
  return runtimeState;
}

export function getCurrentAttempt(): Attempt | null {
  return currentAttempt;
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

export function beginTaskAttempt(taskId: string): Attempt {
  if (!runtimeState) {
    throw new Error('Runtime not initialized');
  }
  const nodeId = runtimeState.activeNodeId;
  const chapterId = runtimeState.activeChapterId;

  currentAttempt = startAttempt(taskId, nodeId, chapterId);
  emit('ATTEMPT_STARTED', { attemptId: currentAttempt.id, nodeId, taskId });
  return currentAttempt;
}

export function finishTaskAttempt(result: AttemptResult): AttemptOutcome {
  if (!runtimeState || !currentAttempt) {
    throw new Error('No active attempt');
  }

  const completedAttempt = completeAttempt(currentAttempt, result);

  const nodeBefore = runtimeState.nodeStates[completedAttempt.nodeId];
  if (!nodeBefore) {
    throw new Error(`Node ${completedAttempt.nodeId} not found`);
  }

  const evaluation = evaluateAttempt(completedAttempt, nodeBefore);

  const outcome = applyAttemptResult(
    evaluation,
    nodeBefore,
    runtimeState.confidenceScore,
    runtimeState.readinessScore
  );

  const updatedNodeMap: Record<string, SkillNode> = {
    ...runtimeState.nodeStates,
    [outcome.updatedNode.id]: outcome.updatedNode,
  };

  const chapters = getActiveChapters();
  const currentChapter = getCurrentChapter(chapters, updatedNodeMap);
  const prevChapterId = runtimeState.activeChapterId;
  const newChapterId = currentChapter?.id ?? prevChapterId;

  runtimeState = {
    ...runtimeState,
    nodeStates: updatedNodeMap,
    confidenceScore: outcome.updatedConfidence,
    readinessScore: outcome.updatedReadiness,
    activeChapterId: newChapterId,
  };

  emit('ATTEMPT_COMPLETED', {
    attemptId: completedAttempt.id,
    result: completedAttempt.result,
    score: completedAttempt.score,
  });

  emit('STATE_UPDATED', {
    nodeId: completedAttempt.nodeId,
    previousState: evaluation.previousState,
    newState: evaluation.newState,
    stateChanged: evaluation.stateChanged,
  });

  emit('SCORE_UPDATED', {
    confidence: runtimeState.confidenceScore,
    readiness: runtimeState.readinessScore,
  });

  emit('CONFIDENCE_CHANGED', {
    confidence: runtimeState.confidenceScore,
    delta: completedAttempt.confidenceDelta,
  });

  if (evaluation.stateChanged) {
    emit('SKILL_PROGRESS', {
      nodeId: completedAttempt.nodeId,
      previousState: evaluation.previousState,
      newState: evaluation.newState,
    });
  }

  if (newChapterId !== prevChapterId) {
    emit('CHAPTER_CHANGED', { chapterId: newChapterId, prevChapterId });
  }

  emit('TASK_COMPLETED', {
    nodeId: completedAttempt.nodeId,
    result: completedAttempt.result,
    nextAction: outcome.nextAction,
  });

  emit('UI_REFRESH', {});

  currentAttempt = null;

  return outcome;
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

  const taskId = `task_${runtimeState.activeNodeId}_${Date.now()}`;
  beginTaskAttempt(taskId);
  finishTaskAttempt('success');

  return runtimeState!;
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
  currentAttempt = null;
  emit('UI_REFRESH', {});
}
