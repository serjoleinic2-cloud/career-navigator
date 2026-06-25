import type { OnboardingState, CurrentSituation } from './onboarding_state';
import type { ProfessionModule } from '../profession_contract';

const SITUATION_PRIORITY: Record<CurrentSituation, string[]> = {
  career_change: ['software_engineer', 'data_analyst', 'cybersecurity'],
  remote_work: ['software_engineer', 'data_analyst', 'product_manager'],
  higher_salary: ['software_engineer', 'cybersecurity', 'data_scientist'],
  no_job: ['software_engineer', 'data_analyst', 'qa_engineer'],
  unsatisfied: ['software_engineer', 'product_manager', 'ux_designer'],
};

export function selectProfession(
  state: OnboardingState,
  catalog: ProfessionModule[]
): {
  professionId: string | null;
  confidenceScore: number;
} {
  if (!state.situation || catalog.length === 0) {
    return { professionId: null, confidenceScore: 0 };
  }

  const priority = SITUATION_PRIORITY[state.situation];
  const catalogIds = new Set(catalog.map(p => p.id));

  for (const id of priority) {
    if (catalogIds.has(id)) {
      return {
        professionId: id,
        confidenceScore: state.confidenceLevel ?? 5,
      };
    }
  }

  return {
    professionId: catalog[0]?.id ?? null,
    confidenceScore: state.confidenceLevel ?? 5,
  };
}
