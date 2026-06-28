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

function validateProfessionModule(module: ProfessionModule): void {
  const errors: string[] = [];

  if (!module.id || typeof module.id !== 'string') {
    errors.push('missing or invalid id');
  }
  if (!module.title || typeof module.title !== 'string') {
    errors.push('missing or invalid title');
  }
  if (!Array.isArray(module.skillGraph) || module.skillGraph.length === 0) {
    errors.push('skillGraph must be a non-empty array');
  }
  if (!Array.isArray(module.chapters) || module.chapters.length === 0) {
    errors.push('chapters must be a non-empty array');
  }
  if (!module.entryNodeId || typeof module.entryNodeId !== 'string') {
    errors.push('missing or invalid entryNodeId');
  }
  if (module.skillGraph && !module.skillGraph.find(n => n.id === module.entryNodeId)) {
    errors.push(`entryNodeId "${module.entryNodeId}" not found in skillGraph`);
  }
  if (!module.premiumConfig || typeof module.premiumConfig.freeChapters !== 'number') {
    errors.push('missing or invalid premiumConfig');
  }

  if (errors.length > 0) {
    throw new Error(
      `[ProfessionRegistry] Invalid module "${module.id ?? 'unknown'}":\n  - ${errors.join('\n  - ')}`
    );
  }
}

export function registerProfession(module: ProfessionModule): void {
  if (registry.has(module.id)) {
    return; // silent on HMR double-registration
  }
  validateProfessionModule(module); // throws with clear message if invalid
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
