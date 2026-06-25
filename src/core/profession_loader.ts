import type { ProfessionModule } from './profession_contract';
import { getProfession } from './profession_registry';

export type ActiveProfessionState = {
  professionId: string;
};

let activeState: ActiveProfessionState | null = null;

export function setActiveProfession(professionId: string): void {
  if (!getProfession(professionId)) {
    throw new Error(`Cannot set active: profession ${professionId} not registered`);
  }
  activeState = { professionId };
}

export function getActiveProfession(): ProfessionModule {
  if (!activeState) {
    throw new Error('No active profession set');
  }
  const profession = getProfession(activeState.professionId);
  if (!profession) {
    throw new Error(`Active profession ${activeState.professionId} not found in registry`);
  }
  return profession;
}

export function getActiveNodes(): ProfessionModule['skillNodes'] {
  return getActiveProfession().skillNodes;
}

export function getActiveChapters(): ProfessionModule['chapters'] {
  return getActiveProfession().chapters;
}

export function getActiveProfessionId(): string | null {
  return activeState?.professionId ?? null;
}
