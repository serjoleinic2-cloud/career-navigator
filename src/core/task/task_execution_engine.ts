import type { SkillNode, SkillState } from '../skill_state';
import { transition, canTransition } from '../skill_engine';

export type TaskType = 'CHECKBOX_TASK' | 'TEXT_TASK' | 'SELF_ASSESSMENT' | 'MULTIPLE_CHOICE';

export type TaskStatus = 'idle' | 'active' | 'submitted' | 'validated' | 'completed' | 'failed' | 'aborted';

export interface Task {
  id: string;
  type: TaskType;
  nodeId: string;
  chapterId: string;
  title: string;
  description: string;
  status: TaskStatus;
  startedAt: number | null;
  submittedAt: number | null;
  completedAt: number | null;
  payload: unknown;
  result: TaskResult | null;
}

export type TaskResult = {
  taskId: string;
  nodeId: string;
  chapterId: string;
  status: TaskStatus;
  success: boolean;
  score: number;
  confidenceDelta: number;
  readinessDelta: number;
  skillTransition: { previous: SkillState; current: SkillState; changed: boolean } | null;
  chapterProgressDelta: number;
  events: Array<{ type: string; payload: Record<string, unknown> }>;
  feedback: string;
  recommendation: string;
};

export type ValidationInput = {
  taskType: TaskType;
  payload: unknown;
  nodeState: SkillState;
};

export type TaskExecutionContext = {
  task: Task;
  node: SkillNode;
  currentConfidence: number;
  currentReadiness: number;
  chapterProgress: number;
  totalNodes: number;
  completedNodes: number;
};

const SCORE_MAP = { success: 100, partial: 50, fail: 0 };
const CONFIDENCE_MAP = { success: 0.15, partial: 0.05, fail: -0.10 };
const READINESS_MAP = { success: 5.0, partial: 2.0, fail: -1.0 };

const VALIDATION_RULES: Record<TaskType, (payload: unknown) => { valid: boolean; quality: number }> = {
  CHECKBOX_TASK: (payload) => {
    // User checked at least one item OR sent { completed: true } = success
    if (payload && typeof payload === 'object' && (payload as Record<string, unknown>).completed) {
      return { valid: true, quality: 1.0 };
    }
    const items = Array.isArray(payload) ? payload : [];
    if (items.length === 0) return { valid: true, quality: 1.0 }; // no items = auto-pass
    const checked = items.filter((i: unknown) => (i as { checked?: boolean }).checked).length;
    return { valid: true, quality: checked / items.length };
  },
  TEXT_TASK: (payload) => {
    // Any non-empty response = valid. Length drives quality but not pass/fail.
    // MissionScreen submits a combined { text, checked, score } object, not
    // a raw string — unwrap .text when present so quality reflects what the
    // user actually wrote instead of String()-ifying the whole object into
    // the literal text "[object Object]".
    const raw = payload && typeof payload === 'object' && 'text' in (payload as Record<string, unknown>)
      ? (payload as Record<string, unknown>).text
      : payload;
    const text = String(raw || '').trim();
    if (!text || text === 'false' || text === 'null') {
      // BUGFIX (2026-07-04): an empty note used to still "pass" (quality
      // 0.5, i.e. partial success worth +5 chapter progress and +0.05
      // confidence) — meaning the note was effectively optional even
      // though the UI presents it as the actual deliverable of the task.
      // An empty response is now a real fail: no progress, no confidence,
      // and the node does not advance.
      return { valid: false, quality: 0 };
    }
    return { valid: true, quality: Math.min(text.length / 50, 1.0) };
  },
  SELF_ASSESSMENT: (payload) => {
    // Same unwrap as TEXT_TASK: MissionScreen sends { text, checked, score },
    // not a raw number — Number() on the whole object was always NaN,
    // silently defaulting every submission to a flat score of 3/5.
    const raw = payload && typeof payload === 'object' && 'score' in (payload as Record<string, unknown>)
      ? (payload as Record<string, unknown>).score
      : payload;
    const score = Number(raw) || 3;
    return { valid: true, quality: score / 5 };
  },
  MULTIPLE_CHOICE: (payload) => {
    // { completed: true } from JourneyScreen = user self-certified completion
    if (payload && typeof payload === 'object' && (payload as Record<string, unknown>).completed) {
      return { valid: true, quality: 1.0 };
    }
    const answer = String(payload || '');
    return { valid: answer.length > 0, quality: answer === 'correct' ? 1.0 : 0.7 };
  },
};

export function beginTask(
  id: string,
  type: TaskType,
  nodeId: string,
  chapterId: string,
  title: string,
  description: string,
  payload: unknown = null
): Task {
  return {
    id,
    type,
    nodeId,
    chapterId,
    title,
    description,
    status: 'active',
    startedAt: Date.now(),
    submittedAt: null,
    completedAt: null,
    payload,
    result: null,
  };
}

export function submitTask(task: Task, userPayload: unknown): Task {
  return {
    ...task,
    status: 'submitted',
    submittedAt: Date.now(),
    payload: userPayload,
  };
}

export function validateTask(input: ValidationInput): { result: 'success' | 'partial' | 'fail'; score: number } {
  const validator = VALIDATION_RULES[input.taskType];
  if (!validator) {
    return { result: 'fail', score: 0 };
  }

  const { valid, quality } = validator(input.payload);

  if (valid && quality >= 0.8) return { result: 'success', score: SCORE_MAP.success };
  if (valid) return { result: 'partial', score: SCORE_MAP.partial };
  return { result: 'fail', score: SCORE_MAP.fail };
}

export function completeTask(
  context: TaskExecutionContext,
  validationResult: { result: 'success' | 'partial' | 'fail'; score: number }
): TaskResult {
  const { task, node, totalNodes, completedNodes } = context;
  const result = validationResult.result;

  const previousState = node.state;
  let updatedNode = node;
  let skillTransition: TaskResult['skillTransition'] = null;

  if (result === 'success' && canTransition(node)) {
    updatedNode = transition(node, 'tap_primary');
    skillTransition = {
      previous: previousState,
      current: updatedNode.state,
      changed: true,
    };
  } else {
    skillTransition = {
      previous: previousState,
      current: previousState,
      changed: false,
    };
  }

  const score = validationResult.score;
  const confidenceDelta = CONFIDENCE_MAP[result];
  const readinessDelta = calculateReadinessDelta(result, totalNodes, completedNodes);

  const chapterProgressDelta = result === 'success' ? 10 : result === 'partial' ? 5 : 0;

  const feedback = buildFeedback(result, task.title, skillTransition);

  const recommendation = buildRecommendation(result, skillTransition, updatedNode.state);

  const events = buildEvents(task, result, skillTransition, updatedNode);

  return {
    taskId: task.id,
    nodeId: task.nodeId,
    chapterId: task.chapterId,
    status: 'completed',
    success: result === 'success',
    score,
    confidenceDelta,
    readinessDelta,
    skillTransition,
    chapterProgressDelta,
    events,
    feedback,
    recommendation,
  };
}

export function failTask(context: TaskExecutionContext, reason: string): TaskResult {
  const { task, node } = context;
  return {
    taskId: task.id,
    nodeId: task.nodeId,
    chapterId: task.chapterId,
    status: 'failed',
    success: false,
    score: 0,
    confidenceDelta: CONFIDENCE_MAP.fail,
    readinessDelta: READINESS_MAP.fail,
    skillTransition: {
      previous: node.state,
      current: node.state,
      changed: false,
    },
    chapterProgressDelta: 0,
    events: [
      { type: 'TASK_FAILED', payload: { taskId: task.id, reason } },
    ],
    feedback: `Task failed: ${reason}`,
    recommendation: 'Review the material and retry this task.',
  };
}

export function abortTask(task: Task, _reason: string): Task {
  return {
    ...task,
    status: 'aborted',
    completedAt: Date.now(),
    result: null,
  };
}

function calculateReadinessDelta(
  result: 'success' | 'partial' | 'fail',
  totalNodes: number,
  completedNodes: number
): number {
  const base = READINESS_MAP[result];
  const progressRatio = completedNodes / Math.max(totalNodes, 1);
  const weight = 1.0 - (progressRatio * 0.5);
  return base * weight;
}

function buildFeedback(
  result: 'success' | 'partial' | 'fail',
  taskTitle: string,
  skillTransition: TaskResult['skillTransition']
): string {
  const base = {
    success: `✓ "${taskTitle}" completed successfully.`,
    partial: `~ "${taskTitle}" partially completed. Some areas need more work.`,
    fail: `✗ "${taskTitle}" not completed. Review and retry.`,
  }[result];

  if (skillTransition?.changed) {
    return `${base} Skill advanced: ${skillTransition.previous} → ${skillTransition.current}.`;
  }
  return base;
}

function buildRecommendation(
  result: 'success' | 'partial' | 'fail',
  skillTransition: TaskResult['skillTransition'],
  currentState: SkillState
): string {
  if (result === 'fail') return 'Retry this task after reviewing the fundamentals.';
  if (result === 'partial') return 'Continue practicing. Focus on the areas that need improvement.';
  if (skillTransition?.changed && currentState === 'confidence') {
    return 'Excellent! This skill is now mastered. Proceed to the next challenge.';
  }
  if (skillTransition?.changed) {
    return 'Great progress! Continue to the next task to build momentum.';
  }
  return 'Task complete. Continue with the next activity.';
}

function buildEvents(
  task: Task,
  result: 'success' | 'partial' | 'fail',
  skillTransition: TaskResult['skillTransition'],
  _updatedNode: SkillNode
): Array<{ type: string; payload: Record<string, unknown> }> {
  const events: Array<{ type: string; payload: Record<string, unknown> }> = [
    { type: 'TASK_COMPLETED', payload: { taskId: task.id, result } },
    { type: 'SCORE_UPDATED', payload: { result } },
  ];

  if (skillTransition?.changed) {
    events.push({
      type: 'SKILL_PROGRESS',
      payload: {
        nodeId: task.nodeId,
        previousState: skillTransition.previous,
        newState: skillTransition.current,
      },
    });
  }

  if (result === 'success') {
    events.push({
      type: 'CONFIDENCE_CHANGED',
      payload: { delta: CONFIDENCE_MAP.success },
    });
  }

  return events;
}

export function runTaskPipeline(
  task: Task,
  userPayload: unknown,
  context: TaskExecutionContext
): { task: Task; result: TaskResult } {
  const submitted = submitTask(task, userPayload);

  const validation = validateTask({
    taskType: task.type,
    payload: userPayload,
    nodeState: context.node.state,
  });

  const result = completeTask(context, validation);

  const completed: Task = {
    ...submitted,
    status: result.success ? 'completed' : 'failed',
    completedAt: Date.now(),
    result,
  };

  return { task: completed, result };
}
