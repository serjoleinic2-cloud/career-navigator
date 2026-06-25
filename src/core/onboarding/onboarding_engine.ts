import type { OnboardingState, CurrentSituation, EmotionalState } from './onboarding_state';
export { createEmptyOnboardingState } from './onboarding_state';

const SITUATION_BIAS: Record<CurrentSituation, number> = {
  no_job: -10,
  unsatisfied: 0,
  higher_salary: 10,
  career_change: 30,
  remote_work: 5,
};

const EMOTION_CONFIDENCE: Record<EmotionalState, number> = {
  confident: 20,
  unsure: -5,
  frustrated: -10,
  exhausted: -10,
  lost: -15,
};

export function buildOnboardingState(rawInput: Partial<OnboardingState>): OnboardingState {
  return {
    situation: rawInput.situation ?? null,
    emotion: rawInput.emotion ?? null,
    applicationsCount: rawInput.applicationsCount ?? null,
    interviewsCount: rawInput.interviewsCount ?? null,
    professionId: rawInput.professionId ?? null,
    confidenceLevel: rawInput.confidenceLevel ?? null,
    fears: rawInput.fears ?? [],
  };
}

export function getReadinessBias(state: OnboardingState): number {
  if (!state.situation) return 0;
  return SITUATION_BIAS[state.situation];
}

export function getConfidenceModifier(state: OnboardingState): number {
  if (!state.emotion) return 0;
  return EMOTION_CONFIDENCE[state.emotion];
}

export function getBaseConfidence(state: OnboardingState): number {
  const base = state.confidenceLevel ?? 5;
  return Math.max(1, Math.min(10, base + getConfidenceModifier(state) / 10));
}
