import type { MemoryStore } from './memory_state';
import { getMemoryByChapter } from './memory_engine';

export type ChapterMemorySummary = {
  totalNotes: number;
  mistakesCount: number;
  insightsCount: number;
  dominantTags: string[];
  progressNarrative: string;
};

function buildNarrative(
  _notes: number,
  mistakes: number,
  insights: number,
  tags: string[]
): string {
  const parts: string[] = [];
  if (insights > mistakes) {
    parts.push('Strong learning trajectory');
  } else if (mistakes > insights) {
    parts.push('Focus on correcting recurring issues');
  } else {
    parts.push('Steady progress');
  }
  if (tags.length > 0) {
    parts.push(`Key themes: ${tags.join(', ')}`);
  }
  return parts.join('. ');
}

export function getChapterMemorySummary(
  store: MemoryStore,
  chapterId: string
): ChapterMemorySummary {
  const entries = getMemoryByChapter(store, chapterId);

  const totalNotes = entries.filter(e => e.type === 'note').length;
  const mistakesCount = entries.filter(e => e.type === 'mistake').length;
  const insightsCount = entries.filter(e => e.type === 'insight').length;

  const tagCounts = new Map<string, number>();
  for (const entry of entries) {
    for (const tag of entry.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  const dominantTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag);

  const progressNarrative = buildNarrative(totalNotes, mistakesCount, insightsCount, dominantTags);

  return {
    totalNotes,
    mistakesCount,
    insightsCount,
    dominantTags,
    progressNarrative,
  };
}
