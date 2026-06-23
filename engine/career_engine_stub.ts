import { CAREER_DATA, CareerOption } from './career_data';

// FRZ v0.2.1 OFFLINE CORE
// Deterministic engine only
// No AI, no external calls, no dynamic generation

// RULE: getCareerOptions() returns only fixed data
// RULE: getCareerSteps() returns only predefined steps
// RULE: No logic generation, no dynamic content

export function getCareerOptions(): CareerOption[] {
  return CAREER_DATA.map(({ id, title }) => ({ id, title, steps: [] }));
}

export function getCareerSteps(optionId: string): string[] {
  const career = CAREER_DATA.find((c) => c.id === optionId);
  return career ? career.steps : [];
}
