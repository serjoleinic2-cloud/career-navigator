import type { UnifiedRuntimeState } from '../runtime/unified_runtime_state';

export type ValidationResult = {
  valid: boolean;
  errors: string[];
};

export function validateRuntimeState(state: UnifiedRuntimeState): ValidationResult {
  const errors: string[] = [];

  if (!state.userId) errors.push('Missing userId');
  if (!state.professionId) errors.push('Missing professionId');
  if (!state.currentNodeId) errors.push('Missing currentNodeId');
  if (state.readinessScore < 0 || state.readinessScore > 100) {
    errors.push('Invalid readinessScore');
  }
  if (state.confidenceScore < 0 || state.confidenceScore > 100) {
    errors.push('Invalid confidenceScore');
  }

  const skillCount = Object.keys(state.skillState).length;
  if (skillCount === 0) errors.push('No skills loaded');

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function isRuntimeValid(state: UnifiedRuntimeState): boolean {
  return validateRuntimeState(state).valid;
}
