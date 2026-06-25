import type { MemoryEntry, MemoryEntryType } from './memory_state';

export type FeedbackInput = {
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  tags: string[];
};

export function mapFeedbackToMemory(
  feedback: FeedbackInput,
  nodeId: string,
  chapterId: string
): Omit<MemoryEntry, 'id' | 'timestamp'> {
  const type: MemoryEntryType = feedback.sentiment === 'positive' ? 'insight'
    : feedback.sentiment === 'negative' ? 'mistake'
    : 'note';

  return {
    nodeId,
    chapterId,
    type,
    text: feedback.text,
    tags: feedback.tags.slice(0, 5),
  };
}

export function createMemoryEntry(
  feedback: FeedbackInput,
  nodeId: string,
  chapterId: string,
  id: string
): MemoryEntry {
  const mapped = mapFeedbackToMemory(feedback, nodeId, chapterId);
  return {
    ...mapped,
    id,
    timestamp: Date.now(),
  };
}
