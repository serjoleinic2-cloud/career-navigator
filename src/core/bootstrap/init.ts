import type { OrchestratorState } from '../orchestrator';
import { SOFTWARE_ENGINEER_PROFESSION } from '@/professions/software_engineer';
import { registerProfession, getDefaultProfession } from '../profession_registry';
import { setActiveProfession } from '../profession_loader';

export function initCareerNavigator(): OrchestratorState {
  registerProfession(SOFTWARE_ENGINEER_PROFESSION);
  setActiveProfession('software_engineer');

  const profession = getDefaultProfession();
  if (!profession) {
    throw new Error('No profession registered');
  }

  return {
    activeNodeId: profession.skillNodes[0]?.id ?? '',
    nodes: Object.fromEntries(profession.skillNodes.map(n => [n.id, n])),
  };
}

export function isAppReady(state: OrchestratorState): boolean {
  return Object.keys(state.nodes).length > 0 && state.activeNodeId !== '';
}
