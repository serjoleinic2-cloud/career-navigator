import type { ProfessionModule } from './profession_registry';
import { getProfession, getDefaultProfession } from './profession_registry';

let activeProfessionId: string = '';

export function setActiveProfession(id: string): void {
  const profession = getProfession(id);
  if (!profession) {
    throw new Error(`Profession ${id} not found`);
  }
  activeProfessionId = id;
}

export function getActiveProfession(): ProfessionModule | undefined {
  if (!activeProfessionId) return getDefaultProfession();
  return getProfession(activeProfessionId);
}

export function getActiveProfessionId(): string {
  return activeProfessionId;
}

export function getProfessionGraph(): ProfessionModule['skillGraph'] {
  return getActiveProfession()?.skillGraph ?? [];
}

export function getProfessionChapters(): ProfessionModule['chapters'] {
  return getActiveProfession()?.chapters ?? [];
}

export function getProfessionEntryNodeId(): string {
  return getActiveProfession()?.entryNodeId ?? '';
}

export function getProfessionPremiumConfig(): ProfessionModule['premiumConfig'] {
  return getActiveProfession()?.premiumConfig ?? { freeChapters: 0, isLockedAfterFree: true };
}
