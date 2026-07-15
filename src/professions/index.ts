export type { ProfessionModule, PremiumConfig } from './profession_registry';
export {
  registerProfession,
  getProfession,
  getAllProfessions,
  unregisterProfession,
  hasProfession,
  getDefaultProfession,
} from './profession_registry';

export type { BaseProfessionModule } from './base_profession_module';
export { validateProfessionModule } from './base_profession_module';

export { loadProfession, loadProfessionSync } from './loader/profession_loader';
export { PROFESSION_MANIFEST, getManifestEntry, getAllManifestEntries } from './loader/profession_manifest';

export {
  setActiveProfession,
  getActiveProfession,
  getActiveProfessionId,
  getProfessionGraph,
  getProfessionChapters,
  getProfessionEntryNodeId,
  getProfessionPremiumConfig,
} from './profession_service';

export { SoftwareEngineerModule } from './software_engineer/module';
export { DataAnalystModule } from './data_analyst/module';
export { AiMlEngineerModule } from './ai_ml_engineer/module';
