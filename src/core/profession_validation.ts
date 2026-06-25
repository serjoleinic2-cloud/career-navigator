import type { ProfessionModule } from './profession_contract';

export type ValidationSeverity = 'error' | 'warn';

export type ValidationIssue = {
  severity: ValidationSeverity;
  message: string;
};

export type ValidationResult = {
  valid: boolean;
  issues: ValidationIssue[];
};

export function validateProfession(module: ProfessionModule): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (!module.id) {
    issues.push({ severity: 'error', message: 'Module id is missing' });
  }

  if (!module.title) {
    issues.push({ severity: 'error', message: 'Module title is missing' });
  }

  if (!module.skillGraph || !Array.isArray(module.skillGraph)) {
    issues.push({ severity: 'error', message: 'Module skillGraph is missing or not an array' });
  }

  if (!module.chapters || !Array.isArray(module.chapters)) {
    issues.push({ severity: 'error', message: 'Module chapters is missing or not an array' });
  }

  // Check unique node ids
  if (module.skillGraph && Array.isArray(module.skillGraph)) {
    const ids = module.skillGraph.map(n => n.id);
    const uniqueIds = new Set(ids);
    if (ids.length !== uniqueIds.size) {
      issues.push({ severity: 'error', message: 'Duplicate node ids found in skillGraph' });
    }
  }

  // Check chapter references valid nodes
  if (module.chapters && Array.isArray(module.chapters) && module.skillGraph && Array.isArray(module.skillGraph)) {
    const allNodeIds = new Set(module.skillGraph.map(n => n.id));
    for (const chapter of module.chapters) {
      for (const nodeId of chapter.nodeIds) {
        if (!allNodeIds.has(nodeId)) {
          issues.push({ severity: 'error', message: `Chapter "${chapter.id}" references unknown node "${nodeId}"` });
        }
      }
    }
  }

  return {
    valid: issues.filter(i => i.severity === 'error').length === 0,
    issues,
  };
}
