import { isProfessionOwned } from './entitlements';

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

/**
 * Строит PremiumState для активной профессии на основе РЕАЛЬНОГО владения
 * (billing_service.ts / entitlements.ts), а не жёстко заданного unlockType.
 * Это единственная функция, которую стоит использовать в рантайме приложения
 * (ui_bridge.getUIState(), JourneyHUD и т.д.) — createPremiumState() выше
 * остаётся низкоуровневым конструктором для тестов/явных сценариев.
 */
export function getCurrentPremiumState(professionId: string, totalChapters: number): PremiumState {
  const owned = isProfessionOwned(professionId);
  return createPremiumState(professionId, totalChapters, owned ? 'premium' : 'free');
}
