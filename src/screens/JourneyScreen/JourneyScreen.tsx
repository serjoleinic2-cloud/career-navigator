import { useState, useEffect, useCallback, useMemo } from 'react';
import { getUIState, getNavigation } from '@/core/ui_bridge/ui_bridge';
import { setActiveNode, getActiveNode, submitTask, getRuntimeState } from '@/core/runtime/runtime_controller';
import { subscribe } from '@/core/events/system_event_bus';
import { loadTaskForNode, createTaskFromDefinition } from '@/core/runtime/runtime_controller';
import type { SkillNode } from '@/core/skill_state';
import type { TaskContent } from '@/core/task_content';
import type { TaskResult } from '@/core/task/task_execution_engine';
import { BackgroundLayer } from './components/BackgroundLayer';
import { JourneyHeader } from './components/JourneyHeader';
import { JourneyPath } from './components/JourneyPath';
import { FloatingMissionCard } from './components/FloatingMissionCard';
import { JourneyBottomNav } from './components/JourneyBottomNav';
import { MissionFlow } from './components/MissionFlow';
import { HelpBar } from './components/HelpBar';
import { MissionReview } from './components/MissionReview';
import { ResultCard } from './components/ResultCard';
import './JourneyScreen.css';

export function JourneyScreen() {
  const [, setTick] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'mission' | 'review' | 'result'>('idle');
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTask, setSelectedTask] = useState<TaskContent | null>(null);
  const [taskResult, setTaskResult] = useState<TaskResult | null>(null);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [lockedToast, setLockedToast] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
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
    setSelectedTask(null);
    setTaskResult(null);
    setPhase('idle');
    setActiveStep(0);
    setShowHint(false);
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
    const task = node.tasks[ti];
    setSelectedTask(task);
    setMissionCardOpen(false);
    setPhase('mission');
    setActiveStep(0);
    setShowHint(false);
    setTaskResult(null);
  }, [node, completedTaskIds]);

  const handleStepComplete = useCallback(() => {
    if (!selectedTask) return;
    if (activeStep >= selectedTask.instructions.length - 1) {
      setPhase('review');
    } else {
      setActiveStep(s => s + 1);
    }
  }, [selectedTask, activeStep]);

  const handleCompleteMission = useCallback(() => {
    if (!selectedTask || !node) return;

    const definition = loadTaskForNode(node.id);
    if (definition) {
      createTaskFromDefinition(definition);
    }

    try {
      const result = submitTask({ taskId: selectedTask.id, completed: true });
      setTaskResult(result);
      setCompletedTaskIds(prev => [...prev, selectedTask.id]);
      setPhase('result');
    } catch (err) {
      console.error('[JourneyScreen] submitTask failed:', err);
    }
  }, [selectedTask, node]);

  const handleContinueJourney = useCallback(() => {
    setPhase('idle');
    setTaskResult(null);
    setSelectedTask(null);
    setActiveStep(0);
    setShowHint(false);
    if (nav.hasNext && nav.nextNodeId) {
      handleNodeSelect(nav.nextNodeId);
    }
  }, [nav, handleNodeSelect]);

  const handleOpenPlaybook = useCallback(() => {
    window.location.hash = '#playbook';
  }, []);

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

  const nextTaskIndex = node.tasks.findIndex(t => !completedTaskIds.includes(t.id));
  const displayTask = selectedTask || node.tasks[nextTaskIndex >= 0 ? nextTaskIndex : 0];
  const isTaskActive = phase === 'mission' || phase === 'review' || phase === 'result';

  return (
    <div className="journey-screen">
      {/* Layer 1: Background */}
      <BackgroundLayer chapterDomain={activeChapterDomain} />

      {/* Layer 2: Header */}
      <JourneyHeader
        chapterTitle={ui.currentChapterTitle || node.domain}
        nodeIndex={activeNodeIndex + 1}
        totalNodes={professionNodes.length}
        readinessScore={runtime?.readinessScore ?? 0}
      />

      {!isTaskActive && (
        <>
          {/* Layer 3: World Layer (Path) */}
          <div className="journey-world">
            <JourneyPath
              nodes={professionNodes}
              activeNodeId={ui.activeNodeId}
              onNodeSelect={handleNodeSelect}
            />
          </div>

          {/* Layer 4: Mission Card */}
          {missionCardOpen && node && (
            <FloatingMissionCard
              node={node}
              onContinue={startMission}
              onClose={() => setMissionCardOpen(false)}
            />
          )}

          {/* Layer 5: Bottom Navigation */}
          <JourneyBottomNav activeTab="journey" onTabChange={handleTabChange} />
        </>
      )}

      {/* Task flow overlay */}
      {isTaskActive && (
        <div className="journey-task-flow">
          {displayTask && phase === 'mission' && (
            <>
              <MissionFlow
                instructions={displayTask.instructions}
                activeStep={activeStep}
                totalSteps={displayTask.instructions.length}
                onStepComplete={handleStepComplete}
              />
              <HelpBar
                tips={displayTask.tips}
                showHint={showHint}
                onToggleHint={() => setShowHint(s => !s)}
                onOpenPlaybook={handleOpenPlaybook}
              />
            </>
          )}

          {phase === 'review' && (
            <MissionReview onComplete={handleCompleteMission} />
          )}

          {phase === 'result' && taskResult && (
            <ResultCard result={taskResult} onContinue={handleContinueJourney} />
          )}
        </div>
      )}

      {lockedToast && <div className="locked-toast">{lockedToast}</div>}
    </div>
  );
}
