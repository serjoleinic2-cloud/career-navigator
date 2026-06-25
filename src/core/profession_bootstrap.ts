import type { ProfessionModule } from './profession_contract';
import { validateProfession } from './profession_validation';
import type { ValidationIssue } from './profession_validation';
import { registerProfession } from './profession_registry';
import { setActiveProfession } from './profession_loader';

export type BootstrapResult = {
  registered: number;
  failed: number;
  issues: ValidationIssue[];
};

export function bootstrapProfessions(modules: ProfessionModule[]): BootstrapResult {
  let registered = 0;
  let failed = 0;
  const allIssues: ValidationIssue[] = [];

  for (const module of modules) {
    const result = validateProfession(module);
    allIssues.push(...result.issues);

    if (result.valid) {
      try {
        registerProfession(module);
        registered++;
      } catch (e) {
        failed++;
        allIssues.push({ severity: 'error', message: `Failed to register ${module.id}: ${e}` });
      }
    } else {
      failed++;
    }
  }

  // Set first registered profession as active
  for (const module of modules) {
    if (validateProfession(module).valid) {
      try {
        setActiveProfession(module.id);
        break;
      } catch {
        // skip
      }
    }
  }

  return {
    registered,
    failed,
    issues: allIssues,
  };
}
