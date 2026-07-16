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
 *
 * reviewMode (orthogonal to phase) — set to true when the user enters the
 * journey AFTER completing all chapters (Restart Journey or WorldMap island
 * tap while phase === 'complete'). In this mode:
 *   - allNodesCompleted effects are suppressed (no bridge / no re-cinematic)
 *   - Back / Next nav buttons are shown regardless of phase
 *   - WorldMap island taps navigate without triggering animations
 * exitReview() is called only when the user explicitly chooses "Choose New
 * Profession" (RESET_JOURNEY) — the only action that actually leaves the
 * completed journey.
 */
export type ChapterFlowPhase = 'active' | 'celebrate' | 'bridge' | 'cinematic' | 'complete';

interface UseChapterHubReturn {
  phase: ChapterFlowPhase;
  reviewMode: boolean;
  startCelebration: () => void;
  startBridge: () => void;
  finishBridge: () => void;
  startCinematic: () => void;
  finishCinematic: () => void;
  enterReview: () => void;
  exitReview: () => void;
}

export function useChapterHub(): UseChapterHubReturn {
  const [phase, setPhase] = useState<ChapterFlowPhase>('active');
  const [reviewMode, setReviewMode] = useState(false);

  const startCelebration = useCallback(() => setPhase('celebrate'), []);
  const startBridge = useCallback(() => setPhase('bridge'), []);
  const finishBridge = useCallback(() => setPhase('active'), []);
  const startCinematic = useCallback(() => setPhase('cinematic'), []);
  const finishCinematic = useCallback(() => {
    setPhase('complete');
    setReviewMode(true);
  }, []);

  // enterReview: called when "Restart Journey" button is pressed or WorldMap
  // island is tapped while journey is already complete. Sets reviewMode
  // without touching phase — phase stays 'complete' which is fine because
  // JourneyHUD now gates on phase === 'cinematic' only (not phase === 'complete').
  const enterReview = useCallback(() => setReviewMode(true), []);

  // exitReview: called only on "Choose New Profession" (full reset). Brings
  // everything back to a clean slate so the next journey starts normally.
  const exitReview = useCallback(() => {
    setPhase('active');
    setReviewMode(false);
  }, []);

  return {
    phase,
    reviewMode,
    startCelebration,
    startBridge,
    finishBridge,
    startCinematic,
    finishCinematic,
    enterReview,
    exitReview,
  };
}
