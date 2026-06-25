export const MEMORY_RULES = {
  maxEntriesPerNode: 50,
  maxTagsPerEntry: 5,
  maxInsightsPerChapter: 20,
  patternThreshold: 3,
  mistakeRecurringThreshold: 2,
  insightStrongThreshold: 2,
  weakPatternThreshold: 3,
} as const;

export type MemoryRule = keyof typeof MEMORY_RULES;

export function getMemoryRule(rule: MemoryRule): number {
  return MEMORY_RULES[rule];
}
