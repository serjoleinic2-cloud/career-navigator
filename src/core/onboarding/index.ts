export type {
  CurrentSituation,
  EmotionalState,
  OnboardingState,
} from './onboarding_state';
export { createEmptyOnboardingState } from './onboarding_state';

export { buildOnboardingState, getReadinessBias, getConfidenceModifier, getBaseConfidence } from './onboarding_engine';

export { selectProfession } from './profession_selector';

export { mapOnboardingToJourney } from './onboarding_mapper';
export type { OnboardingJourneyMap } from './onboarding_mapper';

export { validateOnboardingState, isOnboardingValid } from './onboarding_validation';
export type { ValidationError } from './onboarding_validation';

export { createOnboardingFlow, getNextStep, getPreviousStep } from './onboarding_flow';
export type { OnboardingStep } from './onboarding_flow';
