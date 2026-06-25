export type MemoryEntryType =
  | 'note'
  | 'insight'
  | 'mistake'
  | 'interview_log'
  | 'decision';

export type MemoryEntry = {
  id: string;
  nodeId: string;
  chapterId: string;
  type: MemoryEntryType;
  text: string;
  timestamp: number;
  tags: string[];
};

export type MemoryStore = {
  entries: MemoryEntry[];
  maxEntriesPerNode: number;
  maxTagsPerEntry: number;
  maxInsightsPerChapter: number;
};

export function createMemoryStore(): MemoryStore {
  return {
    entries: [],
    maxEntriesPerNode: 50,
    maxTagsPerEntry: 5,
    maxInsightsPerChapter: 20,
  };
}
