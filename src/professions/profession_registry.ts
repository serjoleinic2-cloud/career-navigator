import type { SkillNode } from '@/core/skill_state';
import type { Chapter } from '@/core/chapter_model';

export type PremiumConfig = {
  freeChapters: number;
  isLockedAfterFree: boolean;
};

export type ProfessionModule = {
  id: string;
  title: string;
  chapters: Chapter[];
  skillGraph: SkillNode[];
  entryNodeId: string;
  premiumConfig: PremiumConfig;
};

const registry = new Map<string, ProfessionModule>();

export function registerProfession(module: ProfessionModule): void {
  if (registry.has(module.id)) {
    throw new Error(`Profession ${module.id} already registered`);
  }
  registry.set(module.id, module);
}

export function getProfession(id: string): ProfessionModule | undefined {
  return registry.get(id);
}

export function getAllProfessions(): ProfessionModule[] {
  return Array.from(registry.values());
}

export function unregisterProfession(id: string): void {
  registry.delete(id);
}

export function hasProfession(id: string): boolean {
  return registry.has(id);
}

export function getDefaultProfession(): ProfessionModule | undefined {
  return getAllProfessions()[0];
}
