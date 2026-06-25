import type { ChapterId } from '../chapter_model';

export type PremiumFeature = 'interview_trainer' | 'advanced_gap_analysis' | 'full_chapters';

export const PREMIUM_FEATURES: PremiumFeature[] = [
  'interview_trainer',
  'advanced_gap_analysis',
  'full_chapters',
];

export const FREE_FEATURES: PremiumFeature[] = [];

export const FEATURE_LIMITS: Record<PremiumFeature, { free: boolean; premium: boolean }> = {
  interview_trainer: { free: false, premium: true },
  advanced_gap_analysis: { free: false, premium: true },
  full_chapters: { free: false, premium: true },
};

export function isFeatureAvailable(
  feature: PremiumFeature,
  isPremium: boolean
): boolean {
  return isPremium ? FEATURE_LIMITS[feature].premium : FEATURE_LIMITS[feature].free;
}

export const FREE_CHAPTER_IDS: ChapterId[] = ['resume', 'linkedin', 'applications'];

export const PREMIUM_CHAPTER_IDS: ChapterId[] = ['interviews', 'offer'];

export function isChapterFree(chapterId: ChapterId): boolean {
  return FREE_CHAPTER_IDS.includes(chapterId);
}

export function isChapterPremium(chapterId: ChapterId): boolean {
  return PREMIUM_CHAPTER_IDS.includes(chapterId);
}
