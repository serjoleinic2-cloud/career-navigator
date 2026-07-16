import { useState, useCallback } from 'react';

/**
 * Phase of the single-chapter progression flow (WORLD PROGRESSION REWORK).
 *
 * 'active'     — normal state. The current chapter's card + its nodes are
 *                shown, mounted over WorldRenderer.
 * 'celebrate'  — chapter just finished all its nodes. ChapterCompleteScreen
 *                (confetti/stats) is shown; player taps Continue.
 * 'bridge'     — BridgeRestoreScreen plays (short animation: the bridge to
 *                the next chapter "restores"), then the HUD camera rises.
 * 'cinematic'  — FinalCinematicScreen plays after ALL chapters completed.
 * 'complete'   — terminal state after cinematic; HeroPhase buttons fire
 *                their actions (interview/restart/reset) and JourneyHUD
 *                falls through to normal render.
 */
export type ChapterFlowPhase = 'active' | 'celebrate' | 'bridge' | 'cinematic' | 'complete';

interface UseChapterHubReturn {
  phase: ChapterFlowPhase;
  startCelebration: () => void;
  startBridge: () => void;
  finishBridge: () => void;
  startCinematic: () => void;
  finishCinematic: () => void;
}

export function useChapterHub(): UseChapterHubReturn {
  const [phase, setPhase] = useState<ChapterFlowPhase>('active');

  const startCelebration = useCallback(() => setPhase('celebrate'), []);
  const startBridge = useCallback(() => setPhase('bridge'), []);
  const finishBridge = useCallback(() => setPhase('active'), []);
  const startCinematic = useCallback(() => setPhase('cinematic'), []);
  const finishCinematic = useCallback(() => setPhase('complete'), []);

  return { phase, startCelebration, startBridge, finishBridge, startCinematic, finishCinematic };
}
