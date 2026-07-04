import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getUIState } from '@/core/ui_bridge/ui_bridge';
import { setActiveNode, getActiveNode, getRuntimeState, advanceChapter } from '@/core/runtime/runtime_controller';
import { subscribe } from '@/core/events/system_event_bus';
import { MissionScreen } from '@/screens/MissionScreen/MissionScreen';
import type { SkillNode } from '@/core/skill_state';
import { JourneyHeader } from './components/JourneyHeader';
import { ChapterHub } from './components/ChapterHub';
import type { ChapterData } from './components/ChapterHub';
import { ChapterCompleteScreen } from './components/ChapterCompleteScreen';
import { BridgeRestoreScreen } from './components/BridgeRestoreScreen';
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
  interview: '🎤',
  offer: '💰',
};

const DEFAULT_ICON = '📄';

export function JourneyHUD() {
  const [, setTick] = useState(0);
  const [showMission, setShowMission] = useState(false);
  const [lockedToast, setLockedToast] = useState<string | null>(null);
  const [nextChapterTitle, setNextChapterTitle] = useState<string>('');
  const { phase, startCelebration, startBridge, finishBridge } = useChapterHub();
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
    const domainMap: Record<string, SkillNode[]> = {};
    Object.values(runtime.nodeStates).forEach(n => {
      const domain = n.domain || 'Unknown';
      if (!domainMap[domain]) domainMap[domain] = [];
      domainMap[domain].push(n);
    });
    return Object.entries(domainMap).map(([domain, nodes]) => ({
      id: domain,
      title: domain,
      icon: CHAPTER_ICONS[domain.toLowerCase()] || DEFAULT_ICON,
      nodes,
      completedCount: nodes.filter(n => n.state === 'confidence' || n.state === 'execution').length,
      totalCount: nodes.length,
      isActive: nodes.some(n => n.id === runtime.activeNodeId),
      isLocked: nodes.every(n => n.state === 'locked'),
      isCompleted: nodes.every(n => n.state === 'confidence'),
    } as ChapterData));
  }, [runtime]);

  const activeChapterIndex = chapters.findIndex(c => c.isActive);
  const activeChapter = activeChapterIndex >= 0 ? chapters[activeChapterIndex] : null;
  const nextChapter = activeChapterIndex >= 0 ? chapters[activeChapterIndex + 1] : undefined;

  // Detect the active chapter finishing all its nodes and kick off the
  // celebrate -> bridge -> advance sequence exactly once per chapter.
  useEffect(() => {
    if (!activeChapter) return;
    if (
      activeChapter.isCompleted &&
      phase === 'active' &&
      !showMission &&
      prevChapterCompletedRef.current !== activeChapter.id
    ) {
      prevChapterCompletedRef.current = activeChapter.id;
      if (nextChapter) {
        setNextChapterTitle(nextChapter.title);
        startCelebration();
      }
      // If there's no next chapter, allNodesCompleted (below) already
      // takes over and shows JourneyCompleteScreen instead.
    }
  }, [activeChapter, phase, showMission, nextChapter, startCelebration]);

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

  const handleCelebrationContinue = useCallback(() => {
    startBridge();
  }, [startBridge]);

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

  const handleMissionComplete = useCallback(() => {
    setShowMission(false);
    refresh();
  }, [refresh]);

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

  if (!node) {
    return (
      <div className="journey-screen journey-hud">
        <JourneyHeader chapterTitle="" nodeIndex={0} totalNodes={0} readinessScore={0} />
        <h1>No active node</h1>
      </div>
    );
  }

  if (allNodesCompleted) {
    return (
      <div className="journey-screen journey-hud">
        <JourneyCompleteScreen
          totalSkills={professionNodes.length}
          tasksCompleted={0}
          hoursInvested={0}
          readinessScore={runtime?.readinessScore ?? 0}
          confidenceScore={runtime?.confidenceScore ?? 0}
          chapters={chapters.map(c => ({ title: c.title, completed: c.isCompleted }))}
        />
      </div>
    );
  }

  return (
    <div className="journey-screen journey-hud">
      <JourneyHeader
        chapterTitle={ui.currentChapterTitle || node.domain}
        nodeIndex={0}
        totalNodes={professionNodes.length}
        readinessScore={runtime?.readinessScore ?? 0}
      />

      <div className="journey-world" style={cameraStyle}>
        <ChapterHub
          chapter={activeChapter}
          activeNodeId={ui.activeNodeId}
          onNodeSelect={handleNodeSelect}
        />
      </div>

      {phase === 'celebrate' && activeChapter && (
        <ChapterCompleteScreen
          chapterId={activeChapter.id}
          chapterTitle={activeChapter.title}
          skillsCompleted={activeChapter.completedCount}
          totalSkills={activeChapter.totalCount}
          readinessDelta={12}
          confidenceDelta={8}
          onContinue={handleCelebrationContinue}
        />
      )}

      {phase === 'bridge' && activeChapter && (
        <BridgeRestoreScreen
          fromChapterTitle={activeChapter.title}
          toChapterTitle={nextChapterTitle}
          onDone={handleBridgeDone}
        />
      )}

      {lockedToast && <div className="locked-toast">{lockedToast}</div>}
    </div>
  );
}
