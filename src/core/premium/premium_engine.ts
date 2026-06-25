import type { PremiumState } from './premium_state';
import type { Chapter } from '../chapter_model';

export type AccessLevel = 'free' | 'premium' | 'locked';

export function isChapterLocked(
  premiumState: PremiumState,
  chapterIndex: number
): boolean {
  return chapterIndex >= premiumState.unlockedChapters;
}

export function isNodeLocked(
  premiumState: PremiumState,
  nodeChapterIndex: number
): boolean {
  return nodeChapterIndex >= premiumState.unlockedChapters;
}

export function getAccessLevel(premiumState: PremiumState): AccessLevel {
  if (premiumState.isUnlocked) return 'premium';
  return 'free';
}

export function getRemainingLockedContent(
  premiumState: PremiumState
): {
  lockedChapters: number;
  lockedNodesEstimate: number;
} {
  const lockedChapters = Math.max(0, premiumState.totalChapters - premiumState.unlockedChapters);
  return {
    lockedChapters,
    lockedNodesEstimate: lockedChapters * 3,
  };
}

export function getChapterIndex(
  chapters: Chapter[],
  chapterId: string
): number {
  return chapters.findIndex(c => c.id === chapterId);
}
