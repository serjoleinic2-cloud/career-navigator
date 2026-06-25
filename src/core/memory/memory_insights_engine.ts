import type { MemoryEntry } from './memory_state';

export type InsightsResult = {
  recurringMistakes: string[];
  strongAreas: string[];
  weakPatterns: string[];
  recommendationTags: string[];
};

function countTags(entries: MemoryEntry[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    for (const tag of entry.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return counts;
}

export function generateInsights(entries: MemoryEntry[]): InsightsResult {
  const mistakes = entries.filter(e => e.type === 'mistake');
  const insights = entries.filter(e => e.type === 'insight');
  const notes = entries.filter(e => e.type === 'note');

  const mistakeTagCounts = countTags(mistakes);
  const recurringMistakes = Array.from(mistakeTagCounts.entries())
    .filter(([, count]) => count >= 2)
    .map(([tag]) => tag);

  const insightTagCounts = countTags(insights);
  const strongAreas = Array.from(insightTagCounts.entries())
    .filter(([, count]) => count >= 2)
    .map(([tag]) => tag);

  const weakNotes = [...notes, ...mistakes];
  const weakTagCounts = countTags(weakNotes);
  const weakPatterns = Array.from(weakTagCounts.entries())
    .filter(([, count]) => count >= 3)
    .map(([tag]) => tag)
    .filter(tag => !strongAreas.includes(tag));

  const recommendationTags = [...new Set([...weakPatterns, ...recurringMistakes])];

  return {
    recurringMistakes,
    strongAreas,
    weakPatterns,
    recommendationTags,
  };
}
