import type { UnifiedRuntimeState } from '../runtime/unified_runtime_state';
import { createEmptyUnifiedState } from '../runtime/unified_runtime_state';

const MAX_HISTORY = 10;
const stateHistory: UnifiedRuntimeState[] = [];

export function saveStateSnapshot(state: UnifiedRuntimeState): void {
  stateHistory.push({ ...state });
  if (stateHistory.length > MAX_HISTORY) {
    stateHistory.shift();
  }
}

export function restoreLastValidState(): UnifiedRuntimeState | null {
  while (stateHistory.length > 0) {
    const candidate = stateHistory.pop();
    if (candidate) return candidate;
  }
  return null;
}

export function getFallbackState(): UnifiedRuntimeState {
  const last = restoreLastValidState();
  if (last) return last;

  return createEmptyUnifiedState('fallback_user');
}

export function clearHistory(): void {
  stateHistory.length = 0;
}
