import { useState, useCallback, useEffect } from 'react';

/**
 * Phase of the single-chapter progression flow (WORLD PROGRESSION REWORK).
 *
 * Persisted to sessionStorage so navigating away to WorldMap and back
 * (which unmounts/remounts JourneyHUD) doesn't reset the phase and
 * re-trigger cinematic/bridge animations.
 *
 * 'active'     — normal state.
 * 'celebrate'  — chapter just finished all its nodes.
 * 'bridge'     — BridgeRestoreScreen plays.
 * 'cinematic'  — FinalCinematicScreen plays after ALL chapters completed.
 * 'complete'   — terminal state after cinematic.
 *
 * reviewMode (orthogonal to phase) — true when the user browses already-
 * completed chapters after finishing the journey. Suppresses auto-bridge and
 * auto-cinematic effects. Also persisted so WorldMap -> Journey tab switch
 * doesn't lose it.
 */
export type ChapterFlowPhase = 'active' | 'celebrate' | 'bridge' | 'cinematic' | 'complete';

const PHASE_KEY = 'cn.chapterFlowPhase';
const REVIEW_KEY = 'cn.reviewMode';

function loadPhase(): ChapterFlowPhase {
  try {
    const v = sessionStorage.getItem(PHASE_KEY);
    if (v === 'active' || v === 'celebrate' || v === 'bridge' || v === 'cinematic' || v === 'complete') return v;
  } catch { /* private browsing */ }
  return 'active';
}

function loadReview(): boolean {
  try { return sessionStorage.getItem(REVIEW_KEY) === '1'; } catch { return false; }
}

function savePhase(p: ChapterFlowPhase) {
  try { sessionStorage.setItem(PHASE_KEY, p); } catch { /* ignore */ }
}

function saveReview(r: boolean) {
  try { sessionStorage.setItem(REVIEW_KEY, r ? '1' : '0'); } catch { /* ignore */ }
}

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
  const [phase, setPhaseState] = useState<ChapterFlowPhase>(loadPhase);
  const [reviewMode, setReviewModeState] = useState<boolean>(loadReview);

  const setPhase = useCallback((p: ChapterFlowPhase) => {
    setPhaseState(p);
    savePhase(p);
  }, []);

  const setReviewMode = useCallback((r: boolean) => {
    setReviewModeState(r);
    saveReview(r);
  }, []);

  const startCelebration = useCallback(() => setPhase('celebrate'), [setPhase]);
  const startBridge      = useCallback(() => setPhase('bridge'),    [setPhase]);
  const finishBridge     = useCallback(() => setPhase('active'),    [setPhase]);
  const startCinematic   = useCallback(() => setPhase('cinematic'), [setPhase]);
  const finishCinematic  = useCallback(() => {
    setPhase('complete');
    setReviewMode(true);
  }, [setPhase, setReviewMode]);

  const enterReview = useCallback(() => setReviewMode(true),  [setReviewMode]);
  const exitReview  = useCallback(() => {
    setPhase('active');
    setReviewMode(false);
  }, [setPhase, setReviewMode]);

  // When bridge phase is restored from sessionStorage on remount (e.g. user
  // navigated away mid-bridge), skip straight to active — the animation is
  // gone, finishing the bridge silently is the cleanest recovery.
  useEffect(() => {
    if (phase === 'bridge') {
      setPhase('active');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    phase, reviewMode,
    startCelebration, startBridge, finishBridge,
    startCinematic, finishCinematic,
    enterReview, exitReview,
  };
}
