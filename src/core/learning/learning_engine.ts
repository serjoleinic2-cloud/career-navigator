import type { SkillNode } from '../skill_state';
import type { SkillState } from '../skill_state';

export type AttemptResult = {
  success: boolean;
  stateChanged: boolean;
  previousState: SkillState;
  newState: SkillState;
};

export type FeedbackCard = {
  title: string;
  body: string;
  confidenceChange: number;
  readinessChange: number;
  nextSuggestion: string;
  type: 'positive' | 'neutral' | 'warning';
};

export type NextRecommendation = {
  action: 'continue' | 'review' | 'next_node';
  targetNodeId: string | null;
  label: string;
};

export type LearningCycleResult = {
  evaluation: AttemptResult;
  updatedConfidence: number;
  updatedReadiness: number;
  feedback: FeedbackCard;
  recommendation: NextRecommendation;
};

export function evaluateAttempt(
  _node: SkillNode,
  previousState: SkillState,
  newState: SkillState
): AttemptResult {
  const stateChanged = previousState !== newState;
  return {
    success: stateChanged,
    stateChanged,
    previousState,
    newState,
  };
}

export function updateConfidence(
  current: number,
  evaluation: AttemptResult,
  streak: number,
  progressPercent: number
): number {
  let base = 0;
  if (evaluation.success && evaluation.stateChanged) {
    base = 15;
  } else if (evaluation.success) {
    base = 5;
  } else {
    base = -10;
  }

  const streakBonus = streak > 0 ? 2 * streak : 0;
  const multiplier = progressPercent < 50 ? 1.0 : 0.5;

  const delta = (base + streakBonus) * multiplier;
  return Math.max(0, Math.min(100, current + delta));
}

export function updateReadiness(
  current: number,
  evaluation: AttemptResult,
  totalNodes: number,
  completedNodes: number
): number {
  let base = 0;
  if (evaluation.success && evaluation.stateChanged) {
    base = 5;
  } else if (evaluation.success) {
    base = 2;
  } else {
    base = -1;
  }

  const progressPercent = totalNodes > 0 ? (completedNodes / totalNodes) * 100 : 0;
  const multiplier = progressPercent < 50 ? 1.0 : 0.5;

  const delta = base * multiplier;
  return Math.max(0, Math.min(100, current + delta));
}

export function buildFeedback(
  evaluation: AttemptResult,
  nodeTitle: string,
  nextNodeTitle?: string
): FeedbackCard {
  if (evaluation.success && evaluation.stateChanged) {
    return {
      title: 'Progress Made!',
      body: `You advanced from ${evaluation.previousState} to ${evaluation.newState} in "${nodeTitle}".`,
      confidenceChange: 15,
      readinessChange: 5,
      nextSuggestion: nextNodeTitle ? `Ready for "${nextNodeTitle}"` : 'Continue your journey',
      type: 'positive',
    };
  } else if (evaluation.success) {
    return {
      title: 'Task Completed',
      body: `You completed a task in "${nodeTitle}". Keep practicing to deepen your understanding.`,
      confidenceChange: 5,
      readinessChange: 2,
      nextSuggestion: 'Review the material or move to the next task',
      type: 'neutral',
    };
  }
  return {
    title: 'Keep Trying',
    body: `The task in "${nodeTitle}" needs more work. Review the material and try again.`,
    confidenceChange: -10,
    readinessChange: -1,
    nextSuggestion: 'Review the current material before proceeding',
    type: 'warning',
  };
}

export function recommendNextAction(
  currentNodeId: string,
  nodeStates: Record<string, SkillNode>,
  evaluation: AttemptResult
): NextRecommendation {
  if (evaluation.success && evaluation.stateChanged) {
    const nodeIds = Object.keys(nodeStates);
    const currentIndex = nodeIds.indexOf(currentNodeId);
    const nextNodeId = currentIndex >= 0 && currentIndex < nodeIds.length - 1
      ? nodeIds[currentIndex + 1]
      : null;
    return {
      action: 'next_node',
      targetNodeId: nextNodeId,
      label: nextNodeId ? 'Move to next skill' : 'Journey complete!',
    };
  }
  return {
    action: 'continue',
    targetNodeId: currentNodeId,
    label: 'Continue practicing',
  };
}

export function runLearningCycle(
  node: SkillNode,
  previousState: SkillState,
  newState: SkillState,
  currentConfidence: number,
  currentReadiness: number,
  streak: number,
  totalNodes: number,
  completedNodes: number,
  nodeStates: Record<string, SkillNode>
): LearningCycleResult {
  const evaluation = evaluateAttempt(node, previousState, newState);

  const progressPercent = totalNodes > 0 ? (completedNodes / totalNodes) * 100 : 0;

  const updatedConfidence = updateConfidence(currentConfidence, evaluation, streak, progressPercent);
  const updatedReadiness = updateReadiness(currentReadiness, evaluation, totalNodes, completedNodes);

  const nodeIds = Object.keys(nodeStates);
  const currentIndex = nodeIds.indexOf(node.id);
  const nextNodeId = currentIndex >= 0 && currentIndex < nodeIds.length - 1
    ? nodeIds[currentIndex + 1]
    : undefined;
  const nextNodeTitle = nextNodeId ? nodeStates[nextNodeId]?.skill : undefined;

  const feedback = buildFeedback(evaluation, node.skill, nextNodeTitle);
  const recommendation = recommendNextAction(node.id, nodeStates, evaluation);

  return {
    evaluation,
    updatedConfidence,
    updatedReadiness,
    feedback,
    recommendation,
  };
}
