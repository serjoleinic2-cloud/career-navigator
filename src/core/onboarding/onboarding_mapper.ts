import type { OnboardingState } from './onboarding_state';
import type { ProfessionModule } from '../profession_contract';

export type OnboardingJourneyMap = {
  activeProfessionId: string;
  startingNodeId: string;
  initialReadinessBias: number;
  initialConfidenceBias: number;
  fearTags: string[];
};

export function mapOnboardingToJourney(
  state: OnboardingState,
  profession: ProfessionModule
): OnboardingJourneyMap | null {
  if (!state.professionId || !profession.skillNodes.length) {
    return null;
  }

  const readinessBias = state.situation === 'career_change' ? 30
    : state.situation === 'no_job' ? -10
    : state.situation === 'higher_salary' ? 10
    : 0;

  const confidenceBias = state.emotion === 'confident' ? 20
    : state.emotion === 'unsure' ? -5
    : state.emotion === 'frustrated' ? -10
    : state.emotion === 'lost' ? -15
    : 0;

  return {
    activeProfessionId: profession.id,
    startingNodeId: profession.skillNodes[0].id,
    initialReadinessBias: readinessBias,
    initialConfidenceBias: confidenceBias,
    fearTags: state.fears,
  };
}
