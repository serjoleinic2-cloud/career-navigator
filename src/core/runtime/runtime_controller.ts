import type { JourneyRuntimeState } from './journey_runtime';
import { initializeJourneyRuntime } from './journey_runtime';
import type { OnboardingState } from '../onboarding/onboarding_state';
import type { UserAction } from '../skill_engine';
import type { SkillNode, SkillState } from '../skill_state';
import { getActiveChapters, getActiveProfession } from '../profession_loader';
import type { Chapter } from '../chapter_model';
import { getNextChapter, getCurrentChapter } from '../chapter_engine';
import { checkNodeAccess } from '../premium/premium_gate';
import type { PremiumState } from '../premium/premium_state';
import { emit } from '../events/system_event_bus';
import { saveRuntime, clearRuntime } from '../persistence/runtime_persistence';
import {
  beginTask,
  runTaskPipeline,
  abortTask,
} from '../task/task_execution_engine';
import type { Task, TaskResult } from '../task/task_execution_engine';
import { getTaskByNodeId } from '../task/task_content_engine';
import type { TaskDefinition } from '../task/task_content_engine';

let runtimeState: JourneyRuntimeState | null = null;
let activeTask: Task | null = null;
let activeTaskDefinition: TaskDefinition | null = null;

export function startJourney(onboardingState: OnboardingState): JourneyRuntimeState {
  runtimeState = initializeJourneyRuntime(onboardingState);
  saveRuntime(runtimeState);
  emit('SYSTEM_BOOTED', { professionId: runtimeState.professionId });
  emit('UI_REFRESH', {});
  return runtimeState;
}

export function getRuntimeState(): JourneyRuntimeState | null {
  return runtimeState;
}

export function getActiveTask(): Task | null {
  return activeTask;
}

export function getActiveTaskDefinition(): TaskDefinition | null {
  return activeTaskDefinition;
}

export function setActiveNode(nodeId: string): JourneyRuntimeState {
  if (!runtimeState) {
    throw new Error('Runtime not initialized');
  }
  runtimeState = { ...runtimeState, activeNodeId: nodeId };
  saveRuntime(runtimeState);
  emit('NODE_CHANGED', { nodeId });
  emit('UI_REFRESH', {});
  return runtimeState;
}

// ─── TASK LIFECYCLE WITH CONTENT ENGINE ─────────────────────

export function loadTaskForNode(nodeId: string): TaskDefinition | null {
  const definition = getTaskByNodeId(nodeId);
  if (!definition) {
    return null;
  }
  activeTaskDefinition = definition;
  return definition;
}

export function createTaskFromDefinition(
  definition: TaskDefinition,
  payload: unknown = null
): Task {
  if (!runtimeState) {
    throw new Error('Runtime not initialized');
  }
  activeTask = beginTask(
    definition.id,
    definition.type,
    definition.nodeId,
    definition.chapterId,
    definition.title,
    definition.description,
    payload
  );
  emit('TASK_STARTED', {
    taskId: definition.id,
    type: definition.type,
    nodeId: definition.nodeId,
    title: definition.title,
  });
  return activeTask;
}

// ─── Legacy compatibility ──────────────────────────────

export function createTask(
  taskType: 'CHECKBOX_TASK' | 'TEXT_TASK' | 'SELF_ASSESSMENT' | 'MULTIPLE_CHOICE',
  title: string,
  description: string,
  payload: unknown = null
): Task {
  if (!runtimeState) {
    throw new Error('Runtime not initialized');
  }
  const definition = getTaskByNodeId(runtimeState.activeNodeId);
  if (definition) {
    return createTaskFromDefinition(definition, payload);
  }
  const taskId = `task_${runtimeState.activeNodeId}_${Date.now()}`;
  activeTask = beginTask(
    taskId,
    taskType,
    runtimeState.activeNodeId,
    runtimeState.activeChapterId,
    title,
    description,
    payload
  );
  emit('TASK_STARTED', { taskId, type: taskType, nodeId: runtimeState.activeNodeId });
  return activeTask;
}

export function submitTask(userPayload: unknown): TaskResult {
  if (!runtimeState || !activeTask || !activeTaskDefinition) {
    throw new Error('No active task');
  }

  const node = runtimeState.nodeStates[activeTask.nodeId];
  if (!node) {
    throw new Error(`Node ${activeTask.nodeId} not found`);
  }

  const completedNodes = Object.values(runtimeState.nodeStates).filter(
    n => n.state === 'confidence' || n.state === 'execution'
  ).length;

  const context = {
    task: activeTask,
    node,
    currentConfidence: runtimeState.confidenceScore,
    currentReadiness: runtimeState.readinessScore,
    chapterProgress: runtimeState.chapterProgress[activeTask.chapterId] ?? 0,
    totalNodes: Object.keys(runtimeState.nodeStates).length,
    completedNodes,
  };

  // Run unified pipeline
  const { task: completedTask, result } = runTaskPipeline(activeTask, userPayload, context);

  // Override result with content engine rewards and feedback
  const enrichedResult: TaskResult = {
    ...result,
    confidenceDelta: activeTaskDefinition.rewards.confidenceBonus,
    readinessDelta: activeTaskDefinition.rewards.readinessBonus,
    chapterProgressDelta: activeTaskDefinition.rewards.chapterProgress,
    feedback: result.success
      ? activeTaskDefinition.feedback.success
      : result.score > 0
      ? activeTaskDefinition.feedback.partial
      : activeTaskDefinition.feedback.fail,
    recommendation: result.success
      ? activeTaskDefinition.recommendation.success
      : result.score > 0
      ? activeTaskDefinition.recommendation.partial
      : activeTaskDefinition.recommendation.fail,
  };

  activeTask = completedTask;

  // Apply to runtime
  applyTaskResultToRuntime(enrichedResult, node);

  // Emit events
  for (const event of enrichedResult.events) {
    emit(event.type as any, event.payload);
  }

  emit('CONFIDENCE_CHANGED', { confidence: runtimeState.confidenceScore });
  emit('READINESS_CHANGED', { readiness: runtimeState.readinessScore });

  const chapters = getActiveChapters();
  const currentChapter = getCurrentChapter(chapters, runtimeState.nodeStates);
  const prevChapterId = runtimeState.activeChapterId;
  const newChapterId = currentChapter?.id ?? prevChapterId;

  if (newChapterId !== prevChapterId) {
    runtimeState = { ...runtimeState, activeChapterId: newChapterId };
    emit('CHAPTER_CHANGED', { chapterId: newChapterId, prevChapterId });
    emit('CHAPTER_UNLOCKED', { chapterId: newChapterId });
  }

  const newProgress = Math.min(
    100,
    (runtimeState.chapterProgress[activeTask.chapterId] ?? 0) + enrichedResult.chapterProgressDelta
  );
  runtimeState = {
    ...runtimeState,
    chapterProgress: {
      ...runtimeState.chapterProgress,
      [activeTask.chapterId]: newProgress,
    },
  };

  emit('UI_REFRESH', {});

  // Check journey completion
  const allNodesCompleted = Object.values(runtimeState.nodeStates).every(
    n => n.state === 'confidence'
  );
  if (allNodesCompleted) {
    emit('JOURNEY_COMPLETED', { professionId: runtimeState.professionId });
  }

  return enrichedResult;
}

export function abortActiveTask(reason: string): Task {
  if (!activeTask) {
    throw new Error('No active task');
  }
  activeTask = abortTask(activeTask, reason);
  emit('TASK_ABORTED', { taskId: activeTask.id, reason });
  emit('UI_REFRESH', {});
  return activeTask;
}

// ─── Internal ───────────────────────────────────────────────

function applyTaskResultToRuntime(result: TaskResult, originalNode: SkillNode): void {
  if (!runtimeState) return;

  if (result.skillTransition?.changed) {
    const updatedNode: SkillNode = {
      ...originalNode,
      state: result.skillTransition.current,
      nextState: getNextState(result.skillTransition.current),
    };
    runtimeState = {
      ...runtimeState,
      nodeStates: {
        ...runtimeState.nodeStates,
        [result.nodeId]: updatedNode,
      },
    };
  }

  runtimeState = {
    ...runtimeState,
    confidenceScore: clamp(runtimeState.confidenceScore + result.confidenceDelta, 0, 1),
    readinessScore: clamp(runtimeState.readinessScore + result.readinessDelta, 0, 100),
  };
}

function getNextState(state: SkillState): SkillState | null {
  const flow: Record<SkillState, SkillState | null> = {
    locked: 'awareness',
    awareness: 'understanding',
    understanding: 'application',
    application: 'readiness',
    readiness: 'execution',
    execution: 'confidence',
    confidence: null,
  };
  return flow[state] ?? null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// ─── Legacy ─────────────────────────────────────────────────

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
  const definition = loadTaskForNode(runtimeState.activeNodeId);
  if (definition) {
    createTaskFromDefinition(definition);
    submitTask(true);
  }
  if (runtimeState) saveRuntime(runtimeState);
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
  saveRuntime(runtimeState);
  emit('CHAPTER_CHANGED', { chapterId: next.id });
  emit('NODE_CHANGED', { nodeId: nextNodeId });
  emit('UI_REFRESH', {});
  return runtimeState;
}

export function resetRuntime(): void {
  runtimeState = null;
  activeTask = null;
  activeTaskDefinition = null;
  clearRuntime();
  emit('UI_REFRESH', {});
}

export function initializeRuntime(saved: JourneyRuntimeState): void {
  runtimeState = saved;
}
