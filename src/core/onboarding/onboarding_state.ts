export type CurrentSituation =
  | 'no_job'
  | 'unsatisfied'
  | 'higher_salary'
  | 'career_change'
  | 'remote_work';

export type EmotionalState =
  | 'confident'
  | 'unsure'
  | 'frustrated'
  | 'exhausted'
  | 'lost';

export type OnboardingState = {
  situation: CurrentSituation | null;
  emotion: EmotionalState | null;
  applicationsCount: number | null;
  interviewsCount: number | null;
  professionId: string | null;
  confidenceLevel: number | null;
  fears: string[];
};

export function createEmptyOnboardingState(): OnboardingState {
  return {
    situation: null,
    emotion: null,
    applicationsCount: null,
    interviewsCount: null,
    professionId: null,
    confidenceLevel: null,
    fears: [],
  };
}
