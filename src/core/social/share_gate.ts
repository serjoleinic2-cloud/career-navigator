import type { JourneyRuntimeState } from '../runtime/journey_runtime';

export type SharePrompt = {
  shouldPrompt: boolean;
  reason: 'chapter_completed' | 'readiness_milestone' | 'none';
  chapterId?: string;
  readinessDelta?: number;
};

export function shouldPromptShare(
  currentState: JourneyRuntimeState,
  previousState: JourneyRuntimeState | null
): SharePrompt {
  const currentCompleted = Object.entries(currentState.chapterProgress)
    .filter(([, p]) => p === 100)
    .map(([id]) => id);

  const previousCompleted = previousState
    ? Object.entries(previousState.chapterProgress)
        .filter(([, p]) => p === 100)
        .map(([id]) => id)
    : [];

  const newlyCompleted = currentCompleted.filter(id => !previousCompleted.includes(id));
  if (newlyCompleted.length > 0) {
    return {
      shouldPrompt: true,
      reason: 'chapter_completed',
      chapterId: newlyCompleted[0],
    };
  }

  if (previousState) {
    const delta = currentState.readinessScore - previousState.readinessScore;
    if (delta > 15) {
      return {
        shouldPrompt: true,
        reason: 'readiness_milestone',
        readinessDelta: delta,
      };
    }
  }

  return {
    shouldPrompt: false,
    reason: 'none',
  };
}

export function markShareCandidate(
  state: JourneyRuntimeState,
  _chapterId: string
): JourneyRuntimeState {
  return { ...state };
}
