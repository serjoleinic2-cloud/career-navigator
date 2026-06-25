import type { MemoryStore, MemoryEntry } from './memory_state';
import { getMemoryByNode } from './memory_engine';

export type NodeMemoryContext = {
  nodeId: string;
  entries: MemoryEntry[];
  insightCount: number;
  mistakeCount: number;
  noteCount: number;
  dominantTags: string[];
  lastEntry: MemoryEntry | null;
};

export function linkMemoryToNode(store: MemoryStore, nodeId: string): NodeMemoryContext {
  const entries = getMemoryByNode(store, nodeId);

  const insightCount = entries.filter(e => e.type === 'insight').length;
  const mistakeCount = entries.filter(e => e.type === 'mistake').length;
  const noteCount = entries.filter(e => e.type === 'note').length;

  const tagCounts = new Map<string, number>();
  for (const entry of entries) {
    for (const tag of entry.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  const dominantTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => tag);

  const sorted = [...entries].sort((a, b) => b.timestamp - a.timestamp);
  const lastEntry = sorted[0] ?? null;

  return {
    nodeId,
    entries,
    insightCount,
    mistakeCount,
    noteCount,
    dominantTags,
    lastEntry,
  };
}
