import type { JourneyRuntimeState } from './journey_runtime';
import { initializeJourneyRuntime } from './journey_runtime';
import type { OnboardingState } from '../onboarding/onboarding_state';
import type { UserAction } from '../skill_engine';
import type { SkillNode, SkillState } from '../skill_state';
import { getActiveChapters, getActiveProfession, setActiveProfession } from '../profession_loader';
import type { Chapter } from '../chapter_model';
import { getNextChapter, getCurrentChapter } from '../chapter_engine';
import { checkNodeAccess } from '../premium/premium_gate';
import type { PremiumState } from '../premium/premium_state';
import { emit, clearAll } from '../events/system_event_bus';
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
  // Ensure core profession_loader knows the active profession
  // before initializeJourneyRuntime calls getActiveProfession()
  const professionId = onboardingState.professionId ?? 'software_engineer';
  try {
    setActiveProfession(professionId);
  } catch (err) {
    console.error('[startJourney] setActiveProfession failed:', err);
    throw new Error(`Failed to activate profession: ${professionId}`);
  }

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

export function getActiveNode(): SkillNode | null {
  if (!runtimeState || !runtimeState.activeNodeId) return null;
  return runtimeState.nodeStates[runtimeState.activeNodeId] ?? null;
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
    let nodeStates = {
      ...runtimeState.nodeStates,
      [result.nodeId]: updatedNode,
    };

    let nextActiveNodeId: string | null = null;

    // Symmetric unlock: when a node reaches 'confidence', unlock the next
    // node WITHIN THE SAME CHAPTER (if it exists and is still 'locked').
    // Without this, every node in a chapter after the first was reachable
    // in the skill graph definition but never actually unlocked through
    // play — only the chapter's entry node (unlocked in
    // initializeJourneyRuntime) and the chapter's first node (unlocked in
    // advanceChapter) ever left the 'locked' state. Same pattern as both
    // of those call sites: flip 'locked' -> 'awareness'.
    if (updatedNode.state === 'confidence') {
      const chapters = getActiveChapters();
      const chapter = chapters.find(ch => ch.nodeIds.includes(result.nodeId));
      if (chapter) {
        const idx = chapter.nodeIds.indexOf(result.nodeId);
        const nextNodeId = chapter.nodeIds[idx + 1];
        const nextNode = nextNodeId ? nodeStates[nextNodeId] : undefined;
        if (nextNode && nextNode.state === 'locked') {
          nodeStates = {
            ...nodeStates,
            [nextNodeId]: { ...nextNode, state: 'awareness', nextState: 'understanding' },
          };
          // Also move the "active" pointer to the newly unlocked node —
          // same as advanceChapter does at chapter boundaries — so World
          // immediately shows it as current and a single tap opens its
          // mission, instead of requiring one tap to focus camera and a
          // second tap to actually open the mission.
          nextActiveNodeId = nextNodeId;
        }
      }
    }

    runtimeState = {
      ...runtimeState,
      nodeStates,
      ...(nextActiveNodeId ? { activeNodeId: nextActiveNodeId } : {}),
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
  // Same unlock pattern used for the entry node in initializeJourneyRuntime:
  // a fresh chapter's first node starts out 'locked' in the skill graph
  // definition (see professions/*/skill_nodes.ts). Without this, advancing
  // into the chapter would make it "active" in the UI but clicking its node
  // would still show "Complete previous tasks to unlock this node" —
  // the node itself must be explicitly unlocked, not just made active.
  const nextNode = runtimeState.nodeStates[nextNodeId];
  const unlockedNodeStates = nextNode && nextNode.state === 'locked'
    ? { ...runtimeState.nodeStates, [nextNodeId]: { ...nextNode, state: 'awareness' as const, nextState: 'understanding' as const } }
    : runtimeState.nodeStates;
  runtimeState = { ...runtimeState, activeNodeId: nextNodeId, nodeStates: unlockedNodeStates };
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
  clearAll();
  emit('UI_REFRESH', {});
}

export function initializeRuntime(saved: JourneyRuntimeState): void {
  runtimeState = saved;
}
