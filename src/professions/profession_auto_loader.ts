/**
 * Profession Auto-Loader
 *
 * How to add a new profession:
 * 1. Create folder: src/professions/<profession_id>/
 * 2. Add module.ts that exports a default ProfessionModule
 * 3. Import it here and add to PROFESSION_MODULES array
 * 4. Done — the profession appears in onboarding automatically
 *
 * No other files need to change.
 */

import { registerProfession, hasProfession } from './profession_registry';
import type { ProfessionModule } from './profession_registry';
import SoftwareEngineerModule from './software_engineer/module';
import DataAnalystModule from './data_analyst/module';

// ─── ADD NEW PROFESSIONS HERE ──────────────────────────────────
import CybersecurityModule from './cybersecurity/module';
// import DigitalMarketingModule from './digital_marketing/module';
// import CustomerSupportModule from './customer_support/module';
// ──────────────────────────────────────────────────────────────

const PROFESSION_MODULES: ProfessionModule[] = [
  SoftwareEngineerModule,
  DataAnalystModule,
  CybersecurityModule,
  // DigitalMarketingModule,
  // CustomerSupportModule,
];

export function registerAllProfessions(): void {
  for (const module of PROFESSION_MODULES) {
    if (!hasProfession(module.id)) {
      registerProfession(module);
    }
  }
}

export function getAvailableProfessions(): ProfessionModule[] {
  return PROFESSION_MODULES;
}
