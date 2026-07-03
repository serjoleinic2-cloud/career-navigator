import { useState, useCallback } from 'react';

/**
 * Phase of the single-chapter progression flow (WORLD PROGRESSION REWORK).
 *
 * 'active'     — normal state. The current chapter's card + its nodes are
 *                shown, mounted over WorldRenderer. This is the only phase
 *                where the player interacts with mission nodes.
 * 'celebrate'  — chapter just finished all its nodes. ChapterCompleteScreen
 *                (confetti/stats) is shown; player taps Continue.
 * 'bridge'     — BridgeRestoreScreen plays (short animation: the bridge to
 *                the next chapter "restores"), then the HUD camera rises.
 *
 * There is no more a "hub" of multiple chapter cards to pick from — the
 * player always works with exactly one chapter at a time. Future/locked
 * chapters are not represented as HUD cards at all (they only exist as
 * world objects in WorldRenderer, once real art exists for them).
 */
export type ChapterFlowPhase = 'active' | 'celebrate' | 'bridge';

interface UseChapterHubReturn {
  phase: ChapterFlowPhase;
  startCelebration: () => void;
  startBridge: () => void;
  finishBridge: () => void;
}

export function useChapterHub(): UseChapterHubReturn {
  const [phase, setPhase] = useState<ChapterFlowPhase>('active');

  const startCelebration = useCallback(() => setPhase('celebrate'), []);
  const startBridge = useCallback(() => setPhase('bridge'), []);
  const finishBridge = useCallback(() => setPhase('active'), []);

  return { phase, startCelebration, startBridge, finishBridge };
}
