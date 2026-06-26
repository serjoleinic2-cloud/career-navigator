import type { SkillNode, SkillState } from '../skill_state';
import { transition, canTransition } from '../skill_engine';

export type AttemptResult = 'success' | 'partial' | 'fail';

export interface Attempt {
  id: string;
  taskId: string;
  nodeId: string;
  chapterId: string;
  startedAt: number;
  completedAt: number | null;
  result: AttemptResult | null;
  score: number;
  feedback: string;
  confidenceDelta: number;
  readinessDelta: number;
  completed: boolean;
}

export type AttemptEvaluation = {
  attempt: Attempt;
  stateChanged: boolean;
  previousState: SkillState;
  newState: SkillState;
  skillProgressed: boolean;
};

export type AttemptOutcome = {
  evaluation: AttemptEvaluation;
  updatedNode: SkillNode;
  updatedConfidence: number;
  updatedReadiness: number;
  feedback: string;
  nextAction: 'continue' | 'retry' | 'next_node' | 'review';
};

const SCORE_SUCCESS = 100;
const SCORE_PARTIAL = 50;
const SCORE_FAIL = 0;

const CONFIDENCE_SUCCESS = 0.15;
const CONFIDENCE_PARTIAL = 0.05;
const CONFIDENCE_FAIL = -0.10;

const READINESS_SUCCESS = 5.0;
const READINESS_PARTIAL = 2.0;
const READINESS_FAIL = -1.0;

export function startAttempt(
  taskId: string,
  nodeId: string,
  chapterId: string
): Attempt {
  return {
    id: generateAttemptId(),
    taskId,
    nodeId,
    chapterId,
    startedAt: Date.now(),
    completedAt: null,
    result: null,
    score: 0,
    feedback: '',
    confidenceDelta: 0,
    readinessDelta: 0,
    completed: false,
  };
}

export function completeAttempt(
  attempt: Attempt,
  result: AttemptResult
): Attempt {
  const score = calculateScore(result);
  const confidenceDelta = calculateConfidenceDelta(result);
  const readinessDelta = calculateReadinessDelta(result);
  const feedback = generateFeedback(result);

  return {
    ...attempt,
    completedAt: Date.now(),
    result,
    score,
    feedback,
    confidenceDelta,
    readinessDelta,
    completed: true,
  };
}

export function cancelAttempt(attempt: Attempt): Attempt {
  return {
    ...attempt,
    completedAt: Date.now(),
    result: 'fail',
    score: SCORE_FAIL,
    feedback: 'Attempt cancelled. Task marked as incomplete.',
    confidenceDelta: CONFIDENCE_FAIL,
    readinessDelta: READINESS_FAIL,
    completed: true,
  };
}

export function evaluateAttempt(
  attempt: Attempt,
  node: SkillNode
): AttemptEvaluation {
  const previousState = node.state;
  const canProgress = canTransition(node) && (attempt.result === 'success');

  let updatedNode = node;
  if (canProgress) {
    updatedNode = transition(node, 'tap_primary');
  }

  const newState = updatedNode.state;
  const stateChanged = previousState !== newState;
  const skillProgressed = stateChanged && getStateRank(newState) > getStateRank(previousState);

  return {
    attempt,
    stateChanged,
    previousState,
    newState,
    skillProgressed,
  };
}

export function applyAttemptResult(
  evaluation: AttemptEvaluation,
  node: SkillNode,
  currentConfidence: number,
  currentReadiness: number
): AttemptOutcome {
  const { attempt, stateChanged, previousState, newState, skillProgressed } = evaluation;

  let updatedNode = node;
  if (stateChanged && canTransition(node) && attempt.result === 'success') {
    updatedNode = transition(node, 'tap_primary');
  }

  const updatedConfidence = clamp(
    currentConfidence + attempt.confidenceDelta,
    0,
    1
  );

  const updatedReadiness = clamp(
    currentReadiness + attempt.readinessDelta,
    0,
    100
  );

  const nextAction = determineNextAction(attempt.result ?? 'fail', skillProgressed, newState);

  const feedback = buildOutcomeFeedback(attempt, stateChanged, previousState, newState);

  return {
    evaluation,
    updatedNode,
    updatedConfidence,
    updatedReadiness,
    feedback,
    nextAction,
  };
}

function generateAttemptId(): string {
  return `att_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function calculateScore(result: AttemptResult): number {
  switch (result) {
    case 'success': return SCORE_SUCCESS;
    case 'partial': return SCORE_PARTIAL;
    case 'fail': return SCORE_FAIL;
  }
}

function calculateConfidenceDelta(result: AttemptResult): number {
  switch (result) {
    case 'success': return CONFIDENCE_SUCCESS;
    case 'partial': return CONFIDENCE_PARTIAL;
    case 'fail': return CONFIDENCE_FAIL;
  }
}

function calculateReadinessDelta(result: AttemptResult): number {
  switch (result) {
    case 'success': return READINESS_SUCCESS;
    case 'partial': return READINESS_PARTIAL;
    case 'fail': return READINESS_FAIL;
  }
}

function generateFeedback(result: AttemptResult): string {
  switch (result) {
    case 'success': return 'Excellent work! Task completed successfully.';
    case 'partial': return 'Good progress. Some areas need more practice.';
    case 'fail': return 'Task not completed. Review the material and try again.';
  }
}

function getStateRank(state: SkillState): number {
  const ranks: Record<SkillState, number> = {
    locked: 0,
    awareness: 1,
    understanding: 2,
    application: 3,
    readiness: 4,
    execution: 5,
    confidence: 6,
  };
  return ranks[state];
}

function determineNextAction(
  result: AttemptResult,
  skillProgressed: boolean,
  currentState: SkillState
): 'continue' | 'retry' | 'next_node' | 'review' {
  if (result === 'fail') return 'retry';
  if (result === 'partial') return 'review';
  if (skillProgressed && currentState === 'confidence') return 'next_node';
  if (skillProgressed) return 'continue';
  return 'continue';
}

function buildOutcomeFeedback(
  attempt: Attempt,
  stateChanged: boolean,
  previousState: SkillState,
  newState: SkillState
): string {
  if (stateChanged) {
    return `${attempt.feedback} Skill advanced: ${previousState} → ${newState}.`;
  }
  return attempt.feedback;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
