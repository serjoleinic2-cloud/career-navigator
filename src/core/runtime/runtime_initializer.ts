import type { OnboardingState } from '../onboarding/onboarding_state';
import type { JourneyRuntimeState } from './journey_runtime';
import type { ProfessionModule } from '../profession_contract';
import { initializeJourneyRuntime } from './journey_runtime';
import { resetRuntime } from './runtime_controller';
import { selectProfession } from '../onboarding/profession_selector';
import { setActiveProfession, getActiveProfessionId } from '../profession_loader';
import { getAllProfessions } from '@/professions/profession_registry';
import { bootstrapProfessions } from '../profession_bootstrap';
import { SoftwareEngineerModule } from '@/professions/software_engineer/module';

const DEFAULT_PROFESSIONS: ProfessionModule[] = [SoftwareEngineerModule];

export function validateRuntimeConsistency(runtimeState: JourneyRuntimeState): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  if (!runtimeState.professionId) {
    issues.push('Profession ID is empty');
  }

  if (!runtimeState.activeNodeId) {
    issues.push('Active node ID is empty');
  }

  if (!runtimeState.onboardingSnapshot) {
    issues.push('Onboarding snapshot is missing');
  }

  if (runtimeState.createdAt === 0) {
    issues.push('Creation timestamp is zero');
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

export function bootstrapRuntime(onboardingState: OnboardingState): JourneyRuntimeState {
  bootstrapProfessions(DEFAULT_PROFESSIONS);

  if (!getActiveProfessionId()) {
    const catalog = getAllProfessions();
    const result = selectProfession(onboardingState, catalog);
    if (result.professionId) {
      setActiveProfession(result.professionId);
    } else {
      throw new Error('No profession could be selected from onboarding state');
    }
  }

  resetRuntime();

  return initializeJourneyRuntime(onboardingState);
}
