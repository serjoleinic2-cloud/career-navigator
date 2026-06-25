import type { ProfessionModule } from '../profession_registry';
import { getProfession, registerProfession } from '../profession_registry';

export async function loadProfession(id: string): Promise<ProfessionModule | null> {
  const existing = getProfession(id);
  if (existing) return existing;

  try {
    const module = await import(`../${id}/module.ts`);
    const professionModule: ProfessionModule = module.default ?? module[id];

    if (!professionModule) {
      throw new Error(`Profession ${id} module not found`);
    }

    registerProfession(professionModule);
    return professionModule;
  } catch {
    return null;
  }
}

export function loadProfessionSync(module: ProfessionModule): void {
  registerProfession(module);
}
