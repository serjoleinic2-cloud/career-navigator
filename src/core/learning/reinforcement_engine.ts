import type { LearningLoop } from './learning_loop_model';

export type UserConfidenceState = {
  confidence: number;
  momentum: number;
  streak: number;
};

export function createConfidenceState(): UserConfidenceState {
  return {
    confidence: 5.0,
    momentum: 0,
    streak: 0,
  };
}

export function applyReinforcement(
  userState: UserConfidenceState,
  loop: LearningLoop
): UserConfidenceState {
  let confidence = userState.confidence + loop.adaptationDelta;
  confidence = clamp(confidence, 0, 10);

  let streak = userState.streak;
  let momentum = userState.momentum;

  if (loop.result === 'success') {
    streak = userState.streak + 1;
    momentum = Math.min(5, userState.momentum + 1);
  } else if (loop.result === 'fail') {
    streak = 0;
    momentum = Math.max(-3, userState.momentum - 1);
  } else {
    streak = Math.max(0, userState.streak);
    momentum = userState.momentum;
  }

  return {
    confidence,
    momentum,
    streak,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
