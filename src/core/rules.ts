export const CORE_RULES = {
  NO_INDEX_BASED_PROGRESSION: true,
  NO_CHECKLIST_TASKS: true,
  NO_DAY_INDEX: true,
  ONLY_SKILL_STATE_MACHINE: true,
  ONLY_ORCHESTRATOR_MUTATES_STATE: true,
} as const;

export type CoreRule = keyof typeof CORE_RULES;

export function enforceRule(rule: CoreRule): void {
  if (!CORE_RULES[rule]) {
    throw new Error(`Core rule violated: ${rule}`);
  }
}
