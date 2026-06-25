export { validateRuntimeState, isRuntimeValid } from './system_guard';
export type { ValidationResult } from './system_guard';

export {
  saveStateSnapshot,
  restoreLastValidState,
  getFallbackState,
  clearHistory,
} from './fallback_state_manager';
