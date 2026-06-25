import type { UnifiedRuntimeState } from './unified_runtime_state';
import { getState, setState } from './runtime_store';
import { reduce } from './runtime_reducer';

import type { CareerState } from '../state_engine/career_state';
import type { TaskCycle } from '../interaction/task_cycle';
import type { ReadinessVector } from '../readiness_engine';

export type RuntimeEvent =
  | { type: 'TASK_COMPLETED'; nodeId: string; skillState: string }
  | { type: 'TASK_FAILED'; nodeId: string; reason: string }
  | { type: 'CHAPTER_ADVANCED'; chapterId: string }
  | { type: 'SKILL_UPDATED'; nodeId: string; newState: string }
  | { type: 'READINESS_UPDATED'; score: number; confidence: number }
  | { type: 'PROFESSION_UNLOCKED'; professionId: string }
  | { type: 'PROFESSION_CHANGED'; professionId: string }
  | { type: 'NODE_SELECTED'; nodeId: string }
  | { type: 'MEMORY_ADDED'; memoryId: string }
  | { type: 'CAREER_STATE_CHANGED'; newState: CareerState; trigger: string }
  | { type: 'CAREER_SCORE_UPDATED'; careerScore: number; selfScore: number }
  | { type: 'READINESS_VECTOR_UPDATED'; vector: ReadinessVector }
  | { type: 'TASK_CYCLE_RECORDED'; nodeId: string; cycle: TaskCycle }
  | { type: 'CONFIDENCE_UPDATED'; newConfidence: number };

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
