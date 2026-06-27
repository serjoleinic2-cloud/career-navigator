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
  step: number;
  experienceLevel: string | null;
  goals: string[];
  timeline: string | null;
  preferences: string[];
  isComplete: boolean;
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
    step: 0,
    experienceLevel: null,
    goals: [],
    timeline: null,
    preferences: [],
    isComplete: false,
  };
}
