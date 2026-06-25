import type { MemoryEntry, MemoryStore } from './memory_state';

export function addMemory(store: MemoryStore, entry: MemoryEntry): MemoryStore {
  const nodeEntries = store.entries.filter(e => e.nodeId === entry.nodeId);
  if (nodeEntries.length >= store.maxEntriesPerNode) {
    const oldest = nodeEntries.sort((a, b) => a.timestamp - b.timestamp)[0];
    const filtered = store.entries.filter(e => e.id !== oldest.id);
    return { ...store, entries: [...filtered, entry] };
  }
  return { ...store, entries: [...store.entries, entry] };
}

export function getMemoryByNode(store: MemoryStore, nodeId: string): MemoryEntry[] {
  return store.entries.filter(e => e.nodeId === nodeId);
}

export function getMemoryByChapter(store: MemoryStore, chapterId: string): MemoryEntry[] {
  return store.entries.filter(e => e.chapterId === chapterId);
}

export function getRecentMemory(store: MemoryStore, limit: number): MemoryEntry[] {
  return [...store.entries]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}

export function getPatternInsights(store: MemoryStore): Map<string, number> {
  const tagCounts = new Map<string, number>();
  for (const entry of store.entries) {
    for (const tag of entry.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  return tagCounts;
}

export function getRecurringTags(store: MemoryStore, threshold: number = 3): string[] {
  const patterns = getPatternInsights(store);
  return Array.from(patterns.entries())
    .filter(([, count]) => count >= threshold)
    .map(([tag]) => tag);
}
