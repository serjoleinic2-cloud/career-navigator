import { useState, useEffect, useCallback, useMemo } from 'react';
import { getUIState } from '@/core/ui_bridge/ui_bridge';
import { setActiveNode, getActiveNode, getRuntimeState } from '@/core/runtime/runtime_controller';
import { subscribe } from '@/core/events/system_event_bus';
import { MissionScreen } from '@/screens/MissionScreen/MissionScreen';
import type { SkillNode } from '@/core/skill_state';
import { BackgroundLayer } from './components/BackgroundLayer';
import { JourneyHeader } from './components/JourneyHeader';
import { ChapterHub } from './components/ChapterHub';
import type { ChapterData } from './components/ChapterHub';
import { ChapterCompleteScreen } from './components/ChapterCompleteScreen';
import { JourneyCompleteScreen } from './components/JourneyCompleteScreen';
import { JourneyBottomNav } from './components/JourneyBottomNav';
import { useCamera } from './hooks/useCamera';
import { useChapterHub } from './hooks/useChapterHub';
import './JourneyScreen.css';

const CHAPTER_ICONS: Record<string, string> = {
  resume: '📄',
  linkedin: '💼',
  applications: '📨',
  interview: '🎤',
  offer: '🏆',
};

const DEFAULT_ICON = '📄';

export function JourneyScreen() {
  const [, setTick] = useState(0);
  const [showMission, setShowMission] = useState(false);
  const [lockedToast, setLockedToast] = useState<string | null>(null);
  const { view, selectedChapter, selectChapter, dismissComplete } = useChapterHub();
  const { cameraStyle, zoomOut } = useCamera();

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

  const activeChapterDomain = useMemo(() => {
    if (!node) return undefined;
    return node.domain;
  }, [node]);

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

  const handleNodeSelect = useCallback((nodeId: string) => {
    const clickedRuntime = getRuntimeState();
    const clickedNodeState = clickedRuntime?.nodeStates[nodeId]?.state;
    if (!clickedNodeState || clickedNodeState === 'locked') {
      setLockedToast('Complete previous tasks to unlock this node.');
      return;
    }
    if (nodeId === ui.activeNodeId) {
      setShowMission(true);
      return;
    }
    setActiveNode(nodeId);
  }, [ui.activeNodeId]);

  const handleChapterSelect = useCallback((chapterId: string) => {
    selectChapter(chapterId);
  }, [selectChapter]);

  const handleDismissComplete = useCallback(() => {
    zoomOut();
    setTimeout(() => dismissComplete(), 400);
  }, [zoomOut, dismissComplete]);

  const handleTabChange = useCallback((tabId: string) => {
    if (tabId === 'journey') window.location.hash = '';
    else if (tabId === 'playbook') window.location.hash = '#playbook';
    else if (tabId === 'notes') window.location.hash = '#notes';
    else window.location.hash = `#${tabId}`;
  }, []);

  const handleMissionComplete = useCallback(() => {
    setShowMission(false);
    refresh();
  }, [refresh]);

  const isChaptersView = view === 'chapter' || view === 'chapterComplete';

  if (showMission && runtime) {
    return (
      <MissionScreen
        runtimeState={runtime}
        chapterTitle={ui.currentChapterTitle}
        onComplete={handleMissionComplete}
      />
    );
  }

  if (!node) {
    return (
      <div className="journey-screen">
        <BackgroundLayer />
        <JourneyHeader chapterTitle="" nodeIndex={0} totalNodes={0} readinessScore={0} />
        <h1>No active node</h1>
      </div>
    );
  }

  if (allNodesCompleted) {
    return (
      <div className="journey-screen">
        <BackgroundLayer />
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
    <div className="journey-screen">
      <BackgroundLayer chapterDomain={activeChapterDomain} />

      <JourneyHeader
        chapterTitle={isChaptersView && selectedChapter ? selectedChapter : (ui.currentChapterTitle || node.domain)}
        nodeIndex={0}
        totalNodes={professionNodes.length}
        readinessScore={runtime?.readinessScore ?? 0}
      />

      <div className="journey-world" style={view === 'chapter' ? cameraStyle : undefined}>
        <ChapterHub
          chapters={chapters}
          activeNodeId={ui.activeNodeId}
          selectedChapter={selectedChapter}
          onChapterSelect={handleChapterSelect}
          onNodeSelect={handleNodeSelect}
        />
      </div>

      {view === 'chapterComplete' && selectedChapter && (
        <ChapterCompleteScreen
          chapterId={selectedChapter}
          chapterTitle={selectedChapter}
          skillsCompleted={chapters.find(c => c.id === selectedChapter)?.completedCount ?? 0}
          totalSkills={chapters.find(c => c.id === selectedChapter)?.totalCount ?? 0}
          readinessDelta={12}
          confidenceDelta={8}
          onContinue={handleDismissComplete}
        />
      )}

      <JourneyBottomNav activeTab="journey" onTabChange={handleTabChange} />

      {lockedToast && <div className="locked-toast">{lockedToast}</div>}
    </div>
  );
}
