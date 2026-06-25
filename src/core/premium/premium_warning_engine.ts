import type { PremiumState } from './premium_state';
import type { Chapter } from '../chapter_model';

export type PremiumWarning = {
  title: string;
  message: string;
  lockedContentPreview: string[];
  upgradeCTA: string;
};

export function getPremiumWarning(
  premiumState: PremiumState,
  chapters: Chapter[]
): PremiumWarning {
  const lockedChapters = chapters
    .slice(premiumState.unlockedChapters)
    .map(c => c.title);

  return {
    title: 'Premium required',
    message: `You have access to first ${premiumState.unlockedChapters} chapters only. Unlock full profession path to continue.`,
    lockedContentPreview: lockedChapters.slice(0, 3),
    upgradeCTA: `Unlock ${premiumState.professionId}`,
  };
}

export function getChapterLockWarning(
  chapterTitle: string
): PremiumWarning {
  return {
    title: 'Chapter locked',
    message: `${chapterTitle} is available in premium version only.`,
    lockedContentPreview: [chapterTitle],
    upgradeCTA: 'Unlock full profession path',
  };
}
