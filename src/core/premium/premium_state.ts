export type UnlockType = 'free' | 'premium';

export type PremiumState = {
  professionId: string;
  isUnlocked: boolean;
  unlockedChapters: number;
  totalChapters: number;
  unlockType: UnlockType;
};

export const FREE_CHAPTER_LIMIT = 3;

export function createPremiumState(
  professionId: string,
  totalChapters: number,
  unlockType: UnlockType = 'free'
): PremiumState {
  return {
    professionId,
    isUnlocked: unlockType === 'premium',
    unlockedChapters: unlockType === 'premium' ? totalChapters : FREE_CHAPTER_LIMIT,
    totalChapters,
    unlockType,
  };
}
