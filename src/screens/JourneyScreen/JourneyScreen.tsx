import { useState, useEffect, useCallback, useMemo } from 'react';
import { getUIState, getNavigation } from '@/core/ui_bridge/ui_bridge';
import { setActiveNode, getActiveNode, getRuntimeState } from '@/core/runtime/runtime_controller';
import { subscribe } from '@/core/events/system_event_bus';
import { MissionScreen } from '@/screens/MissionScreen/MissionScreen';
import type { SkillNode } from '@/core/skill_state';
import type { TaskContent } from '@/core/task_content';
import { BackgroundLayer } from './components/BackgroundLayer';
import { JourneyHeader } from './components/JourneyHeader';
import { JourneyPath } from './components/JourneyPath';
import { FloatingMissionCard } from './components/FloatingMissionCard';
import { JourneyBottomNav } from './components/JourneyBottomNav';
import './JourneyScreen.css';

export function JourneyScreen() {
  const [, setTick] = useState(0);
  const [missionTask, setMissionTask] = useState<TaskContent | null>(null);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [lockedToast, setLockedToast] = useState<string | null>(null);
  const [missionCardOpen, setMissionCardOpen] = useState(false);

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
  const nav = getNavigation();
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

  const activeNodeIndex = useMemo(() => {
    return professionNodes.findIndex(n => n.id === ui.activeNodeId);
  }, [professionNodes, ui.activeNodeId]);

  const activeChapterDomain = useMemo(() => {
    if (!node) return undefined;
    return node.domain;
  }, [node]);

  const handleNodeSelect = useCallback((nodeId: string) => {
    const clickedRuntime = getRuntimeState();
    const clickedNodeState = clickedRuntime?.nodeStates[nodeId]?.state;
    if (!clickedNodeState || clickedNodeState === 'locked') {
      setLockedToast('Complete previous tasks to unlock this node.');
      return;
    }
    if (nodeId === ui.activeNodeId) {
      setMissionCardOpen(true);
      return;
    }
    setActiveNode(nodeId);
    setMissionCardOpen(false);
    setMissionTask(null);
  }, [ui.activeNodeId]);

  const handleTabChange = useCallback((tabId: string) => {
    if (tabId === 'journey') window.location.hash = '';
    else if (tabId === 'playbook') window.location.hash = '#playbook';
    else if (tabId === 'notes') window.location.hash = '#notes';
    else window.location.hash = `#${tabId}`;
  }, []);

  const startMission = useCallback(() => {
    if (!node) return;
    const ti = Math.min(completedTaskIds.length, node.tasks.length - 1);
    setMissionTask(node.tasks[ti]);
    setMissionCardOpen(false);
  }, [node, completedTaskIds]);

  const handleMissionBack = useCallback(() => {
    setMissionTask(null);
  }, []);

  const handleMissionContinue = useCallback(() => {
    if (missionTask) {
      setCompletedTaskIds(prev => [...prev, missionTask.id]);
    }
    setMissionTask(null);
    if (nav.hasNext && nav.nextNodeId) {
      handleNodeSelect(nav.nextNodeId);
    }
  }, [missionTask, nav, handleNodeSelect]);

  if (missionTask && node) {
    return (
      <MissionScreen
        task={missionTask}
        nodeId={node.id}
        chapterDomain={node.domain}
        chapterTitle={ui.currentChapterTitle}
        onBack={handleMissionBack}
        onContinue={handleMissionContinue}
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
        <BackgroundLayer chapterDomain={activeChapterDomain} />
        <div className="journey-complete-screen">
          <div className="confetti-container">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="confetti-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  backgroundColor: ['#FF6B6B', '#FFE66D', '#4ECDC4', '#45B7D1', '#96CEB4'][i % 5],
                }}
              />
            ))}
          </div>
          <div className="journey-complete-content">
            <div className="complete-icon">✅</div>
            <h1>You're ready!</h1>
            <p className="complete-subtitle">You've completed all nodes in your career journey.</p>
            <div className="final-score">
              <span className="score-label">Career Score</span>
              <span className="score-value">{runtime?.readinessScore ?? 0}%</span>
            </div>
            <div className="complete-actions">
              <button className="primary" onClick={() => { window.location.hash = '#journey'; refresh(); }}>
                Review Journey
              </button>
              <button onClick={() => { window.location.hash = '#onboarding'; }}>
                Start New Profession
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="journey-screen">
      <BackgroundLayer chapterDomain={activeChapterDomain} />

      <JourneyHeader
        chapterTitle={ui.currentChapterTitle || node.domain}
        nodeIndex={activeNodeIndex + 1}
        totalNodes={professionNodes.length}
        readinessScore={runtime?.readinessScore ?? 0}
      />

      <div className="journey-world">
        <JourneyPath
          nodes={professionNodes}
          activeNodeId={ui.activeNodeId}
          onNodeSelect={handleNodeSelect}
        />
      </div>

      {missionCardOpen && node && (
        <FloatingMissionCard
          node={node}
          onContinue={startMission}
          onClose={() => setMissionCardOpen(false)}
        />
      )}

      <JourneyBottomNav activeTab="journey" onTabChange={handleTabChange} />

      {lockedToast && <div className="locked-toast">{lockedToast}</div>}
    </div>
  );
}
