import type { CareerSnapshot } from './export_engine';
import { getAllProfessions } from '@/professions/profession_registry';

export type ImportResult = {
  valid: boolean;
  errors: string[];
  snapshot?: CareerSnapshot;
};

export function importCareerSnapshot(raw: string): ImportResult {
  const errors: string[] = [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { valid: false, errors: ['Invalid JSON'] };
  }

  if (typeof parsed !== 'object' || parsed === null) {
    return { valid: false, errors: ['Not an object'] };
  }

  const snapshot = parsed as Partial<CareerSnapshot>;

  if (snapshot.version !== 'FRZ_2.2') {
    errors.push(`Invalid version: ${snapshot.version}`);
  }

  if (!snapshot.professionId) {
    errors.push('Missing professionId');
  } else {
    const professions = getAllProfessions();
    const exists = professions.some(p => p.id === snapshot.professionId);
    if (!exists) {
      errors.push(`Profession not found: ${snapshot.professionId}`);
    }
  }

  if (!snapshot.skillStates || typeof snapshot.skillStates !== 'object') {
    errors.push('Missing skillStates');
  }

  if (!snapshot.chapterProgress || typeof snapshot.chapterProgress !== 'object') {
    errors.push('Missing chapterProgress');
  }

  if (typeof snapshot.readiness !== 'number') {
    errors.push('Missing readiness');
  }

  if (typeof snapshot.confidence !== 'number') {
    errors.push('Missing confidence');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    snapshot: snapshot as CareerSnapshot,
  };
}
