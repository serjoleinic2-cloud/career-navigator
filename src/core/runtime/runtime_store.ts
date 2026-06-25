import type { UnifiedRuntimeState } from './unified_runtime_state';
import { createEmptyUnifiedState } from './unified_runtime_state';

let state: UnifiedRuntimeState = createEmptyUnifiedState();

export function getState(): UnifiedRuntimeState {
  return state;
}

export function setState(partial: Partial<UnifiedRuntimeState>): void {
  state = { ...state, ...partial };
}

export function updateState(fn: (prev: UnifiedRuntimeState) => Partial<UnifiedRuntimeState>): void {
  state = { ...state, ...fn(state) };
}

export function resetState(): void {
  state = createEmptyUnifiedState();
}

export function replaceState(newState: UnifiedRuntimeState): void {
  state = newState;
}
