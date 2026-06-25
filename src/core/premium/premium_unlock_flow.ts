import type { PremiumState } from './premium_state';
import { createPremiumState } from './premium_state';

export type UnlockResult = {
  success: boolean;
  previousState: PremiumState;
  newState: PremiumState;
  unlockedChapters: number;
};

export function unlockProfession(
  currentState: PremiumState
): UnlockResult {
  if (currentState.isUnlocked) {
    return {
      success: false,
      previousState: currentState,
      newState: currentState,
      unlockedChapters: 0,
    };
  }

  const newState = createPremiumState(
    currentState.professionId,
    currentState.totalChapters,
    'premium'
  );

  return {
    success: true,
    previousState: currentState,
    newState,
    unlockedChapters: newState.unlockedChapters - currentState.unlockedChapters,
  };
}

export function canUnlock(currentState: PremiumState): boolean {
  return !currentState.isUnlocked;
}
