import { useState, useEffect, useCallback } from 'react';
import { getUIState, getNavigation } from '@/core/ui_bridge/ui_bridge';
import { setActiveNode, getActiveNode, submitTask, getRuntimeState } from '@/core/runtime/runtime_controller';
import { subscribe } from '@/core/events/system_event_bus';
import type { SkillNode } from '@/core/skill_state';
import { JourneyPath } from '@/components/JourneyPath/JourneyPath';
import type { TaskContent } from '@/core/task_content';
import { InterviewTrainerScreen } from '@/screens/InterviewTrainer/InterviewTrainerScreen';
import { loadTaskForNode, createTaskFromDefinition } from '@/core/runtime/runtime_controller';
import type { TaskResult } from '@/core/task/task_execution_engine';
import { AppShell } from '@/components/layout/AppShell';
import { HeroCard } from './components/HeroCard';
import { MissionCard } from './components/MissionCard';
import { MissionFlow } from './components/MissionFlow';
import { HelpBar } from './components/HelpBar';
import { MissionReview } from './components/MissionReview';
import { ResultCard } from './components/ResultCard';
import { CollapsibleSidebar } from './components/CollapsibleSidebar';
import './JourneyScreen.css';

export function JourneyScreen() {
  const [, setTick] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'mission' | 'review' | 'result'>('idle');
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTask, setSelectedTask] = useState<TaskContent | null>(null);
  const [taskResult, setTaskResult] = useState<TaskResult | null>(null);
  const [trainerTask, setTrainerTask] = useState<TaskContent | null>(null);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [lockedToast, setLockedToast] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

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
  const professionNodes = runtime
    ? Object.values(runtime.nodeStates).map(n => ({
        id: n.id,
        title: n.skill,
        state: n.state,
        domain: typeof n.domain === 'string' ? n.domain : String(n.domain),
      }))
    : [];

  const allNodesCompleted = runtime
    ? Object.values(runtime.nodeStates).every(n => n.state === 'confidence')
    : false;

  const handleTabChange = (tabId: string) => {
    if (tabId === 'journey') window.location.hash = '';
    else if (tabId === 'playbook') window.location.hash = '#playbook';
    else if (tabId === 'notes') window.location.hash = '#notes';
    else window.location.hash = `#${tabId}`;
  };

  const handleNodeSelect = (nodeId: string) => {
    setActiveNode(nodeId);
    setSelectedTask(null);
    setTaskResult(null);
    setPhase('idle');
    setActiveStep(0);
    setShowHint(false);
    const clickedRuntime = getRuntimeState();
    const clickedNodeState = clickedRuntime?.nodeStates[nodeId]?.state;
    if (clickedNodeState === 'locked') {
      setLockedToast('Complete previous tasks to unlock this node.');
      return;
    }
  };

  const startMission = () => {
    if (!node) return;
    const ti = Math.min(completedTaskIds.length, node.tasks.length - 1);
    const task = node.tasks[ti];
    setSelectedTask(task);
    setPhase('mission');
    setActiveStep(0);
    setShowHint(false);
    setTaskResult(null);
  };

  const handleStepComplete = () => {
    if (!selectedTask) return;
    if (activeStep >= selectedTask.instructions.length - 1) {
      setPhase('review');
    } else {
      setActiveStep(s => s + 1);
    }
  };

  const handleCompleteMission = () => {
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
  };

  const handleContinueJourney = () => {
    setPhase('idle');
    setTaskResult(null);
    setSelectedTask(null);
    setActiveStep(0);
    setShowHint(false);
    if (nav.hasNext && nav.nextNodeId) {
      handleNodeSelect(nav.nextNodeId);
    }
  };

  const handleOpenPlaybook = () => {
    window.location.hash = '#playbook';
  };

  if (trainerTask) {
    return (
      <InterviewTrainerScreen
        task={trainerTask}
        onComplete={() => { setTrainerTask(null); refresh(); }}
        onClose={() => setTrainerTask(null)}
      />
    );
  }

  if (!node) {
    return <div className="journey-screen"><h1>No active node</h1></div>;
  }

  if (allNodesCompleted) {
    return (
      <div className="journey-screen journey-complete-screen">
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
    );
  }

  const nextTaskIndex = node.tasks.findIndex(t => !completedTaskIds.includes(t.id));
  const displayTask = selectedTask || node.tasks[nextTaskIndex >= 0 ? nextTaskIndex : 0];

  return (
    <AppShell title="Journey" activeTab="journey" onTabChange={handleTabChange}>
      <HeroCard
        chapterTitle={ui.currentChapterTitle}
        skillName={node.skill}
        taskProgress={completedTaskIds.length > 0 ? `Task ${completedTaskIds.length} of ${node.tasks.length}` : `Task 1 of ${node.tasks.length}`}
        readinessScore={runtime?.readinessScore ?? 0}
        confidenceScore={runtime ? Math.round(runtime.confidenceScore * 100) : 0}
        hasActiveTask={completedTaskIds.length > 0}
        onAction={startMission}
      />

      <JourneyPath
        nodes={professionNodes}
        activeNodeId={ui.activeNodeId}
        onNodeSelect={handleNodeSelect}
        totalNodes={professionNodes.length}
        readinessScore={runtime?.readinessScore ?? 0}
      />

      {displayTask && phase === 'idle' && (
        <MissionCard task={displayTask} onStart={startMission} />
      )}

      {phase === 'mission' && displayTask && (
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

      <CollapsibleSidebar
        advice={node.advice}
        signals={node.signals}
        nodeId={node.id}
      />

      {lockedToast && <div className="locked-toast">{lockedToast}</div>}
    </AppShell>
  );
}
