import type { OnboardingState, CurrentSituation, EmotionalState } from './onboarding_state';
import { createEmptyOnboardingState } from './onboarding_state';
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

let onboardingState: OnboardingState | null = null;

export function startOnboarding(): OnboardingState {
  onboardingState = createEmptyOnboardingState();
  return onboardingState!;
}

export function getOnboardingState(): OnboardingState | null {
  return onboardingState;
}

export function selectProfession(professionId: string): void {
  if (!onboardingState) return;
  onboardingState = { ...onboardingState, professionId };
}

export function setExperience(level: string): void {
  if (!onboardingState) return;
  onboardingState = { ...onboardingState, experienceLevel: level };
}

export function toggleGoal(goal: string): void {
  if (!onboardingState) return;
  const goals = onboardingState.goals.includes(goal)
    ? onboardingState.goals.filter(g => g !== goal)
    : [...onboardingState.goals, goal];
  onboardingState = { ...onboardingState, goals };
}

export function setTimeline(timeline: string): void {
  if (!onboardingState) return;
  onboardingState = { ...onboardingState, timeline };
}

export function togglePreference(pref: string): void {
  if (!onboardingState) return;
  const preferences = onboardingState.preferences.includes(pref)
    ? onboardingState.preferences.filter(p => p !== pref)
    : [...onboardingState.preferences, pref];
  onboardingState = { ...onboardingState, preferences };
}

export function nextStep(): { success: boolean; error?: string } {
  if (!onboardingState) return { success: false, error: 'Not started' };

  const validation = validateOnboardingStep(onboardingState);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  if (onboardingState.step >= 6) {
    return { success: false, error: 'Already at last step' };
  }

  onboardingState = { ...onboardingState, step: onboardingState.step + 1 };
  return { success: true };
}

export function previousStep(): void {
  if (!onboardingState || onboardingState.step <= 0) return;
  onboardingState = { ...onboardingState, step: onboardingState.step - 1 };
}

export function finishOnboarding(): OnboardingState | null {
  if (!onboardingState) return null;

  const validation = validateOnboardingStep(onboardingState);
  if (!validation.valid) return null;

  onboardingState = { ...onboardingState, isComplete: true };
  return onboardingState;
}

function validateOnboardingStep(state: OnboardingState): { valid: boolean; error?: string } {
  switch (state.step) {
    case 1:
      if (!state.professionId) return { valid: false, error: 'Please select a profession' };
      return { valid: true };
    case 2:
      if (!state.experienceLevel) return { valid: false, error: 'Please select your experience level' };
      return { valid: true };
    case 3:
      if (state.goals.length === 0) return { valid: false, error: 'Please select at least one goal' };
      return { valid: true };
    case 4:
      if (!state.timeline) return { valid: false, error: 'Please select a timeline' };
      return { valid: true };
    case 6:
      if (!state.professionId) return { valid: false, error: 'Missing profession' };
      return { valid: true };
    default:
      return { valid: true };
  }
}

export function buildOnboardingState(rawInput: Partial<OnboardingState>): OnboardingState {
  return {
    situation: rawInput.situation ?? null,
    emotion: rawInput.emotion ?? null,
    applicationsCount: rawInput.applicationsCount ?? null,
    interviewsCount: rawInput.interviewsCount ?? null,
    professionId: rawInput.professionId ?? null,
    confidenceLevel: rawInput.confidenceLevel ?? null,
    fears: rawInput.fears ?? [],
    step: rawInput.step ?? 0,
    experienceLevel: rawInput.experienceLevel ?? null,
    goals: rawInput.goals ?? [],
    timeline: rawInput.timeline ?? null,
    preferences: rawInput.preferences ?? [],
    isComplete: rawInput.isComplete ?? false,
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
