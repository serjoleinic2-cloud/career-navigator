import type { OnboardingState } from './onboarding_state';
import { getAllProfessions } from '@/professions/profession_registry';

export type ValidationError = {
  field: string;
  message: string;
};

export function validateOnboardingState(state: OnboardingState): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!state.situation) {
    errors.push({ field: 'situation', message: 'Situation is required' });
  }

  if (!state.emotion) {
    errors.push({ field: 'emotion', message: 'Emotion is required' });
  }

  if (state.professionId) {
    const professions = getAllProfessions();
    const exists = professions.some(p => p.id === state.professionId);
    if (!exists) {
      errors.push({ field: 'professionId', message: 'Profession does not exist' });
    }
  }

  if (state.confidenceLevel !== null) {
    if (state.confidenceLevel < 1 || state.confidenceLevel > 10) {
      errors.push({ field: 'confidenceLevel', message: 'Confidence must be 1–10' });
    }
  }

  if (state.applicationsCount !== null && state.applicationsCount < 0) {
    errors.push({ field: 'applicationsCount', message: 'Applications count must be >= 0' });
  }

  if (state.interviewsCount !== null && state.interviewsCount < 0) {
    errors.push({ field: 'interviewsCount', message: 'Interviews count must be >= 0' });
  }

  if (state.fears.length > 5) {
    errors.push({ field: 'fears', message: 'Maximum 5 fears allowed' });
  }

  return errors;
}

export function isOnboardingValid(state: OnboardingState): boolean {
  return validateOnboardingState(state).length === 0;
}
