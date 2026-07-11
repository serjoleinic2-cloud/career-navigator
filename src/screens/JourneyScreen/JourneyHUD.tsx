import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getUIState } from '@/core/ui_bridge/ui_bridge';
import { setActiveNode, getActiveNode, getRuntimeState, advanceChapter, setActiveChapter } from '@/core/runtime/runtime_controller';
import { getActiveChapters } from '@/core/profession_loader';
import { getNextChapter, getCurrentChapter } from '@/core/chapter_engine';
import { calculateReadiness } from '@/core/readiness_engine';
import { subscribe, emit } from '@/core/events/system_event_bus';
import { MissionScreen } from '@/screens/MissionScreen/MissionScreen';
import { fastForwardJourney } from '@/core/runtime/runtime_controller';
import type { SkillNode } from '@/core/skill_state';
import { JourneyHeader } from './components/JourneyHeader';
import { ChapterHub } from './components/ChapterHub';
import type { ChapterData } from './components/ChapterHub';
import { Icon } from '@/components/Icon/Icon';
import { BridgeRestoreScreen } from './components/BridgeRestoreScreen';
import { FinalCinematicScreen } from './components/FinalCinematicScreen';
import { JourneyCompleteScreen } from './components/JourneyCompleteScreen';
import { useCamera } from './hooks/useCamera';
import { useChapterHub } from './hooks/useChapterHub';
import './JourneyScreen.css';

/**
 * JourneyHUD — UI-only layer.
 *
 * Per architecture decision (see задание.txt "ARCHITECTURE DECISION"):
 * - WorldRenderer (src/world/world_renderer.tsx) is the permanent rendering
 *   engine: world, camera, atmosphere, islands, environment, particles,
 *   lighting, animations.
 * - This component is NOT a screen. It renders NOTHING about the world
 *   itself (no WorldBackdrop, no BackgroundLayer, no world_composer) —
 *   it only renders mission cards, header, progress, and navigation,
 *   meant to be mounted ON TOP of a persistent WorldRenderer instance.
 *
 * WORLD PROGRESSION REWORK (this session):
 * - The HUD shows exactly one chapter card at a time — the active one.
 *   Future chapters are never rendered as cards here; they only exist as
 *   world objects in WorldRenderer. Locked-chapter cards were removed.
 * - When the active chapter's last node reaches 'confidence' on all its
 *   nodes: ChapterCompleteScreen (celebration) -> BridgeRestoreScreen
 *   (bridge-restore animation) -> HUD camera rises (useCamera.moveUp) ->
 *   advanceChapter() unlocks + activates the next chapter's first node ->
 *   its card fades in. See useChapterHub for the phase state machine.
 *
 * Formerly `JourneyScreen` — renamed conceptually, kept file-adjacent
 * for minimal diff. See App.tsx for how this is composed with
 * WorldRenderer (world stays mounted, this fades in above it).
 */

const CHAPTER_ICONS: Record<string, string> = {
  resume: '📄',
  linkedin: '🔗',
  applications: '📨',
  interviews: '🎤',
  offer_preparation: '📚',
  offer: '💰',
};

const DEFAULT_ICON = '📄';

export function JourneyHUD({ onOpenSettings }: { onOpenSettings?: () => void }) {
  const [, setTick] = useState(0);
  const [showMission, setShowMission] = useState(false);
  const [lockedToast, setLockedToast] = useState<string | null>(null);
  const [nextChapterTitle, setNextChapterTitle] = useState<string>('');
  const { phase, startBridge, finishBridge, startCinematic, finishCinematic } = useChapterHub();
  const { cameraStyle, moveUp, zoomOut } = useCamera();
  const prevChapterCompletedRef = useRef<string | null>(null);

  const refresh = useCallback(() => {
    setTick(t => t + 1);
  }, []);

  useEffect(() => {
    const unsubNode = subscribe('NODE_CHANGED', refresh);
    const unsubState = subscribe('STATE_UPDATED', refresh);
    const unsubChapter = subscribe('CHAPTER_CHANGED', refresh);
    const unsubScore = subscribe('SCORE_UPDATED', refresh);
    const unsubUI = subscribe('UI_REFRESH', refresh);
    const unsubTask = subscribe('TASK_COMPLETED', refresh);

    return () => {
      unsubNode();
      unsubState();
      unsubChapter();
      unsubScore();
      unsubUI();
      unsubTask();
    };
  }, [refresh]);

  useEffect(() => {
    if (lockedToast) {
      const t = setTimeout(() => setLockedToast(null), 2000);
      return () => clearTimeout(t);
    }
  }, [lockedToast]);

  const ui = getUIState();
  const node: SkillNode | null = getActiveNode();
  const runtime = getRuntimeState();

  const professionNodes = useMemo(() => {
    if (!runtime) return [];
    return Object.values(runtime.nodeStates);
  }, [runtime]);

  const allNodesCompleted = useMemo(() => {
    if (!runtime) return false;
    return Object.values(runtime.nodeStates).every(n => n.state === 'confidence');
  }, [runtime]);

  const chapters = useMemo(() => {
    if (!runtime) return [];
    // BUGFIX (2026-07-06): this used to group nodeStates by their `domain`
    // string (e.g. 'Interviews', 'Offer Preparation' — capitalized, as
    // authored in skill_nodes.ts) instead of using the canonical chapter
    // list from chapters.ts (ids like 'interviews', 'offer_preparation' —
    // lowercase/underscored). Every other part of the app (submitTask,
    // advanceChapter, chapter_engine, MissionScreen) tracks chapters by
    // that canonical id. The id-casing mismatch between the two systems
    // caused two concrete bugs: the "already celebrated this chapter" ref
    // check below never matched (so the ChapterCompleteScreen could fire
    // twice for the same chapter, double-advancing and silently skipping
    // the next chapter — this is how "Offer Preparation" could vanish),
    // and this HUD's active/next chapter could disagree with what
    // MissionScreen and the runtime considered current. Building `chapters`
    // from getActiveChapters() (same source everyone else uses) removes
    // the second, redundant bookkeeping system entirely.
    const definitions = getActiveChapters();
    return definitions.map((def) => {
      const nodes = def.nodeIds.map(id => runtime.nodeStates[id]).filter(Boolean);
      return {
        id: def.id,
        title: def.title,
        icon: CHAPTER_ICONS[def.id.toLowerCase()] || DEFAULT_ICON,
        nodes,
        completedCount: nodes.filter(n => n.state === 'confidence' || n.state === 'execution').length,
        totalCount: nodes.length,
        isActive: nodes.some(n => n.id === runtime.activeNodeId),
        isLocked: nodes.length > 0 && nodes.every(n => n.state === 'locked'),
        isCompleted: nodes.length > 0 && nodes.every(n => n.state === 'confidence'),
      } as ChapterData;
    });
  }, [runtime]);

  const activeChapterIndex = chapters.findIndex(c => c.isActive);
  const activeChapter = activeChapterIndex >= 0 ? chapters[activeChapterIndex] : null;
  const nextChapter = activeChapterIndex >= 0 ? chapters[activeChapterIndex + 1] : undefined;
  const prevChapter = activeChapterIndex > 0 ? chapters[activeChapterIndex - 1] : undefined;

  // BUGFIX (2026-07-10): the bridge-forward effect below used to fire any
  // time the active chapter was fully completed, regardless of *how* the
  // user got there. That's correct right after finishing a chapter's last
  // task, but it also fired when the user manually revisited an
  // already-finished chapter from the WorldMap (e.g. tapping chapter 1's
  // island to review it after having moved on to chapter 3) — since
  // chapter 1 is "completed", the effect immediately bridged forward to
  // chapter 2, then chapter 2 was also completed so it bridged again to
  // chapter 3, auto-ejecting the user from the chapter they explicitly
  // chose to look at. The bridge-forward behavior only makes sense at the
  // actual leading edge of progression (the first not-yet-completed
  // chapter, same definition chapter_engine/runtime_controller use
  // elsewhere) — not for reviewing chapters behind that edge. Gate the
  // effect on activeChapter actually being that frontier chapter.
  const frontierChapterId = useMemo(() => {
    if (!runtime) return null;
    const definitions = getActiveChapters();
    return getCurrentChapter(definitions, runtime.nodeStates)?.id ?? null;
  }, [runtime]);
  const isReviewingPastChapter =
    !!activeChapter && frontierChapterId !== null && activeChapter.id !== frontierChapterId;

  // BUGFIX (2026-07-07): the HUD used to show `runtime.readinessScore`,
  // a single number that only ever accumulates (+readinessDelta per task,
  // clamped 0-100) across the ENTIRE journey and never comes back down.
  // In practice this means it hits 100% around chapter 2-3 and then
  // stays pinned at 100% for every chapter after that — which isn't
  // wrong exactly, but is useless as a readiness indicator: it tells the
  // user nothing about how ready they are for the chapter in front of
  // them right now. Readiness shown in the HUD is now computed fresh
  // from the CURRENT chapter's own nodes each render (same formula as
  // `calculateReadiness`, averaging each node's skill-state value), so
  // it starts low at the beginning of every chapter and climbs back up
  // as that chapter's nodes are completed — an actually informative,
  // per-chapter number. The cumulative `runtime.readinessScore` is left
  // untouched for the final journey-complete summary, where an overall
  // lifetime score does make sense.
  const chapterReadinessScore = activeChapter
    ? calculateReadiness(activeChapter.nodes).readinessScore
    : 0;

  // Detect the active chapter finishing all its nodes and kick off the
  // bridge -> advance sequence exactly once per chapter.
  //
  // BUGFIX (2026-07-06): this used to call startCelebration() and render
  // ChapterCompleteScreen here — a second "Chapter Complete / X Mastered"
  // screen with its own stats (skills/readiness/confidence), shown right
  // after TaskCompleteScreen already showed the exact same celebration
  // (see MissionScreen/TaskCompleteScreen.tsx isChapterComplete branch).
  // That was a plain duplicate: same numbers, same message, twice in a
  // row. TaskCompleteScreen is now the one and only chapter-complete
  // celebration; this effect just moves straight to the bridge animation
  // (visual transition to the next island) once the player is back on
  // the Journey view.
  useEffect(() => {
    if (!activeChapter) return;
    if (
      activeChapter.isCompleted &&
      phase === 'active' &&
      !showMission &&
      !isReviewingPastChapter &&
      prevChapterCompletedRef.current !== activeChapter.id
    ) {
      prevChapterCompletedRef.current = activeChapter.id;
      if (nextChapter) {
        setNextChapterTitle(nextChapter.title);
        startBridge();
      }
      // If there's no next chapter, allNodesCompleted (below) already
      // takes over and shows JourneyCompleteScreen instead.
    }
  }, [activeChapter, phase, showMission, nextChapter, startBridge, isReviewingPastChapter]);

  useEffect(() => {
    if (allNodesCompleted && phase === 'active') {
      startCinematic();
    }
  }, [allNodesCompleted, phase, startCinematic]);

  const handleNodeSelect = useCallback((nodeId: string) => {
    const clickedRuntime = getRuntimeState();
    if (!clickedRuntime?.nodeStates[nodeId]) {
      setLockedToast('Node not found.');
      return;
    }
    const clickedNodeState = clickedRuntime.nodeStates[nodeId].state;
    if (!clickedNodeState || clickedNodeState === 'locked') {
      setLockedToast('Complete previous tasks to unlock this node.');
      return;
    }
    // BUGFIX (2026-07-04): an already-completed node (state 'confidence' /
    // 'execution') could still be tapped back open and its mission
    // resubmitted. Combined with the chapterProgress fix above this no
    // longer inflates progress, but it also silently let users keep
    // replaying e.g. "positioning-clarity" instead of moving on to the
    // node that was actually unlocked next (e.g. "achievement-framing"),
    // which read as "the next node never activates". Completed nodes are
    // now shown as done instead of reopening their mission.
    if (clickedNodeState === 'confidence' || clickedNodeState === 'execution') {
      setLockedToast('This step is already complete.');
      return;
    }
    if (nodeId === ui.activeNodeId) {
      setShowMission(true);
      return;
    }
    setActiveNode(nodeId);
  }, [ui.activeNodeId]);

  const handleBridgeDone = useCallback(() => {
    // Bridge finished restoring — camera rises to reveal the next chapter,
    // then the runtime actually advances (unlocks + activates the next
    // chapter's first node), then we're back to normal HUD interaction.
    moveUp();
    setTimeout(() => {
      advanceChapter();
      zoomOut();
      finishBridge();
      refresh();
    }, 650);
  }, [moveUp, zoomOut, finishBridge, refresh]);

  // BUGFIX: tapping an already-completed island in the World map (via
  // onChapterSelect -> setActiveChapter) dropped the user into that
  // chapter to review it, but with no way to move forward — the
  // auto-bridge-to-next-chapter effect above is deliberately gated off
  // while reviewing a past chapter (isReviewingPastChapter), and even for
  // the just-finished frontier chapter, `prevChapterCompletedRef` blocks
  // it from firing a second time. If that chapter was the last one the
  // player had completed, there was simply no path from "reviewing a done
  // chapter" back to "start the next, unstarted chapter." These Back/Next
  // controls (rendered below, only while the active chapter is completed)
  // give that path explicitly: Next reuses advanceChapter() (unlocks the
  // next chapter if needed, otherwise just re-activates its first node —
  // it never touches nodeStates for chapters already unlocked/in progress)
  // and Back reuses setActiveChapter() (the same mutator WorldMap island
  // taps use), so no new state-mutation logic was introduced.
  const handleGoToPrevChapter = useCallback(() => {
    if (!prevChapter) return;
    setActiveChapter(prevChapter.id);
    refresh();
  }, [prevChapter, refresh]);

  const handleGoToNextChapter = useCallback(() => {
    if (!nextChapter) return;
    advanceChapter();
    refresh();
  }, [nextChapter, refresh]);

  const handleMissionComplete = useCallback(() => {
    setShowMission(false);
    refresh();
    // The TaskCompleteScreen already showed the chapter-complete celebration
    // when this was the last node in the chapter. Jump straight to the
    // bridge animation and skip the ChapterCompleteScreen entirely so the
    // user doesn't see two celebration screens back-to-back.
    // We read the runtime directly (not via captured closure) to get the
    // state AFTER submitTask() has already persisted the final node.
    const rt = getRuntimeState();
    if (!rt) return;
    // BUGFIX (2026-07-05): this used to group nodes by `n.domain` (e.g.
    // 'Resume', capitalized as authored in skill_nodes.ts) and look that
    // group up by `rt.activeChapterId` (e.g. 'resume', lowercase chapter id
    // from chapters.ts). The casing never matched, so `activeChapterNodes`
    // was always undefined, `chapterJustCompleted` was always falsy, and
    // advanceChapter() was never called here — leaving the Journey view
    // stuck showing a chapter whose nodes were all already 'confidence'.
    // Group by the same chapter definitions advanceChapter()/getCurrentChapter()
    // use instead of re-deriving groups from node.domain strings.
    const chapters = getActiveChapters();
    const currentChapter = chapters.find(ch => ch.nodeIds.includes(rt.activeNodeId));
    const activeChapterNodes = currentChapter
      ? currentChapter.nodeIds.map(id => rt.nodeStates[id]).filter(Boolean)
      : undefined;
    const chapterJustCompleted =
      !!activeChapterNodes && activeChapterNodes.length > 0 &&
      activeChapterNodes.every(n => n.state === 'confidence');
    if (chapterJustCompleted && currentChapter) {
      // BUGFIX (2026-07-07): this used to call advanceChapter() itself on a
      // bare setTimeout — a SECOND, independent path to the exact same
      // "advance to the next chapter" operation that the activeChapter
      // .isCompleted useEffect above also performs (via startBridge ->
      // handleBridgeDone -> advanceChapter). Two separate call sites able
      // to advance the same runtime is exactly the class of bug that
      // previously made "Offer Preparation" vanish entirely (see the
      // 2026-07-06 entry in PROJECT_STATUS.md): if this timeout fired
      // after another render had already moved `activeNodeId` forward,
      // "current chapter" here could resolve against a stale/advanced
      // id and skip a whole chapter, or leave no chapter matching
      // `isActive` at all — and ChapterHub renders nothing for a null
      // chapter, i.e. a completely blank Journey screen with no error.
      // Fixed by removing this direct advanceChapter() call. There is
      // now exactly ONE place that ever calls advanceChapter():
      // handleBridgeDone. This function's only job is to mark the
      // chapter as celebrated (so the effect below doesn't also try to
      // celebrate it) and kick off the same bridge animation the other
      // path uses, instead of silently jumping chapters in the background.
      prevChapterCompletedRef.current = currentChapter.id;
      const next = getNextChapter(chapters, currentChapter.id);
      if (next) {
        setNextChapterTitle(next.title);
        startBridge();
      } else {
        // Last chapter completed — no bridge to the next island,
        // go straight to the cinematic finale.
        startCinematic();
      }
    }
  }, [refresh, startBridge, startCinematic]);

  if (showMission && runtime) {
    return (
      <MissionScreen
        runtimeState={runtime}
        chapterTitle={ui.currentChapterTitle}
        onComplete={handleMissionComplete}
        onClose={() => setShowMission(false)}
      />
    );
  }

  if (!node && !runtime) {
    return (
      <div className="journey-screen journey-hud">
        <JourneyHeader chapterTitle="" nodeIndex={0} totalNodes={0} readinessScore={0} />
        <div style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 80, fontSize: 16 }}>
          Loading journey...
        </div>
      </div>
    );
  }

  if (allNodesCompleted || phase === 'cinematic' || phase === 'complete') {
    return (
      <>
        {phase === 'cinematic' && (
          <FinalCinematicScreen
            professionId={runtime?.professionId ?? 'default'}
            chapters={chapters.map(c => ({ id: c.id, title: c.title, completed: c.isCompleted }))}
            onComplete={() => {
              finishCinematic();
              refresh();
            }}
          />
        )}
        {phase === 'complete' && (
          <div className="journey-screen journey-hud">
            <JourneyCompleteScreen
              totalSkills={professionNodes.length}
              tasksCompleted={chapters.reduce((sum, c) => sum + c.completedCount, 0)}
              hoursInvested={Math.round((runtime?.totalMinutesInvested ?? 0) / 60)}
              readinessScore={runtime?.readinessScore ?? 0}
              confidenceScore={runtime?.confidenceScore ?? 0}
              chapters={chapters.map(c => ({ title: c.title, completed: c.isCompleted }))}
              onStartInterview={() => emit('START_INTERVIEW_TRAINER', {})}
              onNewJourney={() => emit('RESET_JOURNEY', {})}
            />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="journey-screen journey-hud">
      <JourneyHeader
        chapterTitle={ui.currentChapterTitle || node?.domain || ''}
        nodeIndex={0}
        totalNodes={professionNodes.length}
        readinessScore={chapterReadinessScore}
      />

      <div className="journey-world" style={cameraStyle}>
        <ChapterHub
          chapter={activeChapter}
          activeNodeId={ui.activeNodeId}
          onNodeSelect={handleNodeSelect}
        />

        {activeChapter?.isCompleted && phase === 'active' && (
          <div className="journey-chapter-nav">
            <button
              className="journey-chapter-nav-btn"
              onClick={handleGoToPrevChapter}
              disabled={!prevChapter}
            >
              ← Back
            </button>
            <button
              className="journey-chapter-nav-btn primary"
              onClick={handleGoToNextChapter}
              disabled={!nextChapter}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {phase === 'bridge' && activeChapter && (
        <BridgeRestoreScreen
          fromChapterTitle={activeChapter.title}
          toChapterTitle={nextChapterTitle}
          onDone={handleBridgeDone}
        />
      )}

      <button className="journey-settings-btn" onClick={onOpenSettings} aria-label="Settings">
        <Icon name="settings" size={20} />
      </button>

      {lockedToast && <div className="locked-toast">{lockedToast}</div>}

      {import.meta.env.DEV && (
        <>
          <button
            className="dev-interview-btn"
            onClick={() => emit('START_INTERVIEW_TRAINER', {})}
            title="DEV: Skip to Interview Trainer"
          >
            Test → Interview
          </button>
          <button
            className="dev-ffwd-btn"
            onClick={() => { fastForwardJourney(); window.location.reload(); }}
            title="DEV: Complete all chapters instantly"
          >
            Test: Complete Journey
          </button>
        </>
      )}
    </div>
  );
}
