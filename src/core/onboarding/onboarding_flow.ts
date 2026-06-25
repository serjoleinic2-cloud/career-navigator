import type { CurrentSituation, EmotionalState } from './onboarding_state';
import { createEmptyOnboardingState, buildOnboardingState } from './onboarding_engine';
import { selectProfession } from './profession_selector';
import { mapOnboardingToJourney } from './onboarding_mapper';
import { validateOnboardingState, isOnboardingValid } from './onboarding_validation';
import { getAllProfessions } from '@/professions/profession_registry';

export type OnboardingStep =
  | 'situation'
  | 'emotion'
  | 'applications_count'
  | 'interviews_count'
  | 'profession_selection'
  | 'confidence'
  | 'fears'
  | 'complete';

const STEP_ORDER: OnboardingStep[] = [
  'situation',
  'emotion',
  'applications_count',
  'interviews_count',
  'profession_selection',
  'confidence',
  'fears',
  'complete',
];

export function getNextStep(currentStep: OnboardingStep): OnboardingStep | null {
  const index = STEP_ORDER.indexOf(currentStep);
  return STEP_ORDER[index + 1] ?? null;
}

export function getPreviousStep(currentStep: OnboardingStep): OnboardingStep | null {
  const index = STEP_ORDER.indexOf(currentStep);
  return STEP_ORDER[index - 1] ?? null;
}

export function createOnboardingFlow() {
  let state = createEmptyOnboardingState();

  return {
    getState: () => state,
    setSituation: (situation: CurrentSituation) => {
      state = buildOnboardingState({ ...state, situation });
    },
    setEmotion: (emotion: EmotionalState) => {
      state = buildOnboardingState({ ...state, emotion });
    },
    setApplicationsCount: (count: number) => {
      state = buildOnboardingState({ ...state, applicationsCount: count });
    },
    setInterviewsCount: (count: number) => {
      state = buildOnboardingState({ ...state, interviewsCount: count });
    },
    setProfession: (professionId: string) => {
      state = buildOnboardingState({ ...state, professionId });
    },
    setConfidence: (level: number) => {
      state = buildOnboardingState({ ...state, confidenceLevel: level });
    },
    setFears: (fears: string[]) => {
      state = buildOnboardingState({ ...state, fears });
    },
    getValidationErrors: () => validateOnboardingState(state),
    isValid: () => isOnboardingValid(state),
    getSelectedProfession: () => {
      const catalog = getAllProfessions();
      return selectProfession(state, catalog);
    },
    getJourneyMap: () => {
      const catalog = getAllProfessions();
      const selected = selectProfession(state, catalog);
      if (!selected.professionId) return null;
      const profession = catalog.find(p => p.id === selected.professionId);
      if (!profession) return null;
      return mapOnboardingToJourney(state, profession);
    },
  };
}
