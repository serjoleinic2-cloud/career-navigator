import type { UnifiedRuntimeState } from './unified_runtime_state';
import { getState, setState } from './runtime_store';
import { reduce } from './runtime_reducer';

export type RuntimeEvent =
  | { type: 'TASK_COMPLETED'; nodeId: string; skillState: string }
  | { type: 'TASK_FAILED'; nodeId: string; reason: string }
  | { type: 'CHAPTER_ADVANCED'; chapterId: string }
  | { type: 'SKILL_UPDATED'; nodeId: string; newState: string }
  | { type: 'READINESS_UPDATED'; score: number; confidence: number }
  | { type: 'PROFESSION_UNLOCKED'; professionId: string }
  | { type: 'PROFESSION_CHANGED'; professionId: string }
  | { type: 'NODE_SELECTED'; nodeId: string }
  | { type: 'MEMORY_ADDED'; memoryId: string };

export function processRuntimeEvent(event: RuntimeEvent): void {
  const current = getState();
  const next = reduce(current, event);
  setState(next);
}

export function dispatchEvent(event: RuntimeEvent): void {
  processRuntimeEvent(event);
}

export function getCurrentState(): UnifiedRuntimeState {
  return getState();
}
