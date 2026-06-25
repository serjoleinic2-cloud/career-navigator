import type { ProfessionModule } from './profession_registry';

export interface BaseProfessionModule {
  id: string;
  build(): ProfessionModule;
}

export function validateProfessionModule(module: ProfessionModule): string[] {
  const errors: string[] = [];

  if (!module.id) errors.push('Missing id');
  if (!module.title) errors.push('Missing title');
  if (module.chapters.length === 0) errors.push('No chapters defined');
  if (module.skillGraph.length === 0) errors.push('No skill graph defined');
  if (!module.entryNodeId) errors.push('Missing entryNodeId');
  if (!module.skillGraph.some(n => n.id === module.entryNodeId)) {
    errors.push('entryNodeId not found in skillGraph');
  }
  if (module.premiumConfig.freeChapters < 0) {
    errors.push('freeChapters cannot be negative');
  }
  if (module.premiumConfig.freeChapters > module.chapters.length) {
    errors.push('freeChapters exceeds total chapters');
  }

  return errors;
}
