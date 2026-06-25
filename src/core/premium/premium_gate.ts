import type { PremiumState } from './premium_state';
import { isChapterLocked, getChapterIndex } from './premium_engine';
import type { Chapter } from '../chapter_model';

export type AccessCheckResult = {
  allowed: boolean;
  reason: 'free_limit' | 'premium_required' | 'allowed';
  unlockHint: string;
};

export function checkAccess(
  premiumState: PremiumState,
  chapters: Chapter[],
  contentId: string
): AccessCheckResult {
  const chapterIndex = getChapterIndex(chapters, contentId);

  if (chapterIndex === -1) {
    return {
      allowed: false,
      reason: 'premium_required',
      unlockHint: 'Content not found in this profession',
    };
  }

  if (!isChapterLocked(premiumState, chapterIndex)) {
    return {
      allowed: true,
      reason: 'allowed',
      unlockHint: '',
    };
  }

  return {
    allowed: false,
    reason: 'free_limit',
    unlockHint: `Unlock ${premiumState.professionId} to access chapter ${chapterIndex + 1} and beyond`,
  };
}

export function checkNodeAccess(
  premiumState: PremiumState,
  nodeChapterIndex: number
): AccessCheckResult {
  if (!isChapterLocked(premiumState, nodeChapterIndex)) {
    return {
      allowed: true,
      reason: 'allowed',
      unlockHint: '',
    };
  }

  return {
    allowed: false,
    reason: 'free_limit',
    unlockHint: `Premium required for chapter ${nodeChapterIndex + 1} content`,
  };
}
