import type { SkillState } from '../skill_state';
import type { InteractionAction, RewardResult } from './interaction_types';

let streak = 0;
let lastActionTime = 0;

export function calculateRewards(
  action: InteractionAction,
  previousState: SkillState,
  newState: SkillState
): RewardResult {
  const now = Date.now();

  if (action === 'skip_task' || action === 'fail_task') {
    return { streakBonus: 0, progressBurst: false, chapterCompleted: false, confidenceBoost: 0 };
  }

  if (now - lastActionTime < 24 * 60 * 60 * 1000) {
    streak++;
  } else {
    streak = 1;
  }
  lastActionTime = now;

  const streakBonus = Math.min(streak, 10);
  const stateChanged = newState !== previousState;
  const progressBurst = stateChanged && newState === 'execution';
  const chapterCompleted = newState === 'confidence';
  const confidenceBoost = stateChanged && newState === 'confidence' ? 5 : 0;

  return { streakBonus, progressBurst, chapterCompleted, confidenceBoost };
}

export function getStreak(): number {
  return streak;
}

export function resetStreak(): void {
  streak = 0;
  lastActionTime = 0;
}
