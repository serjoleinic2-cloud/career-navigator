import { CareerState } from './career_state';
import type { UnifiedRuntimeState } from '../runtime/unified_runtime_state';

export type StateTrigger =
  | 'onboarding_complete'
  | 'resume_score_threshold'
  | 'first_interview_scheduled'
  | 'interview_passed'
  | 'offer_received'
  | 'confidence_drop'
  | 'failure_spike';

export type StateTransitionRule = {
  from: CareerState | 'ANY';
  to: CareerState;
  trigger: StateTrigger;
  guard?: (state: UnifiedRuntimeState) => boolean;
};

const RESUME_THRESHOLD = 60;

export const STATE_TRANSITIONS: StateTransitionRule[] = [
  {
    from: CareerState.EXPLORING,
    to: CareerState.PREPARING,
    trigger: 'onboarding_complete',
  },
  {
    from: CareerState.PREPARING,
    to: CareerState.APPLYING,
    trigger: 'resume_score_threshold',
    guard: (state) => (state.readinessVector?.resume ?? 0) >= RESUME_THRESHOLD,
  },
  {
    from: CareerState.APPLYING,
    to: CareerState.INTERVIEWING,
    trigger: 'first_interview_scheduled',
  },
  {
    from: CareerState.INTERVIEWING,
    to: CareerState.NEGOTIATING,
    trigger: 'interview_passed',
  },
  {
    from: CareerState.NEGOTIATING,
    to: CareerState.READY,
    trigger: 'offer_received',
  },
  {
    from: 'ANY',
    to: CareerState.PREPARING,
    trigger: 'confidence_drop',
    guard: (state) => state.confidenceScore < 30,
  },
  {
    from: 'ANY',
    to: CareerState.PREPARING,
    trigger: 'failure_spike',
    guard: (state) => {
      const failures = Object.values(state.gapState).reduce((sum, v) => sum + v, 0);
      return failures >= 5;
    },
  },
];

export function canTransition(
  currentState: CareerState,
  trigger: StateTrigger,
  runtime: UnifiedRuntimeState
): { allowed: boolean; nextState: CareerState | null; reason?: string } {
  for (const rule of STATE_TRANSITIONS) {
    if (rule.trigger !== trigger) continue;
    if (rule.from !== 'ANY' && rule.from !== currentState) continue;
    if (rule.guard && !rule.guard(runtime)) {
      return { allowed: false, nextState: null, reason: 'Guard condition not met' };
    }
    return { allowed: true, nextState: rule.to };
  }
  return { allowed: false, nextState: null, reason: 'No matching transition rule' };
}

export function applyTransition(
  currentState: CareerState,
  trigger: StateTrigger,
  runtime: UnifiedRuntimeState
): { newState: CareerState; transitioned: boolean } {
  const result = canTransition(currentState, trigger, runtime);
  if (!result.allowed || !result.nextState) {
    return { newState: currentState, transitioned: false };
  }
  return { newState: result.nextState, transitioned: true };
}
