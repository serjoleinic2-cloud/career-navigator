import { useState, useEffect, useCallback } from 'react';
import { getUIState, getNavigation } from '@/core/ui_bridge/ui_bridge';
import { setActiveNode, beginTaskAttempt, finishTaskAttempt } from '@/core/runtime/runtime_controller';
import { snapToActiveNode } from '@/core/focus_snap_controller';
import { subscribe } from '@/core/events/system_event_bus';
import type { SystemEvent } from '@/core/events/system_event_bus';
import { JourneyVisualLayer } from '@/components/JourneyVisualLayer/JourneyVisualLayer';
import { JourneyPath } from '@/components/JourneyPath/JourneyPath';
import { JourneyHeader } from '@/components/JourneyHeader/JourneyHeader';
import { JourneyBottomNav } from '@/components/JourneyBottomNav/JourneyBottomNav';
import type { AttemptOutcome } from '@/core/attempt/attempt_engine';
import './JourneyScreen.css';

export function JourneyScreen() {
  const [, setTick] = useState(0);
  const [outcome, setOutcome] = useState<AttemptOutcome | null>(null);
  const [isAttempting, setIsAttempting] = useState(false);

  const refresh = useCallback(() => {
    setTick(t => t + 1);
  }, []);

  useEffect(() => {
    const unsubNode = subscribe('NODE_CHANGED', refresh);
    const unsubState = subscribe('STATE_UPDATED', refresh);
    const unsubChapter = subscribe('CHAPTER_CHANGED', refresh);
    const unsubScore = subscribe('SCORE_UPDATED', refresh);
    const unsubUI = subscribe('UI_REFRESH', refresh);
    const unsubAttempt = subscribe('ATTEMPT_COMPLETED', (_event: SystemEvent) => {
      refresh();
    });

    return () => {
      unsubNode();
      unsubState();
      unsubChapter();
      unsubScore();
      unsubUI();
      unsubAttempt();
    };
  }, [refresh]);

  const ui = getUIState();
  const nav = getNavigation();

  useEffect(() => {
    snapToActiveNode(ui.activeNodeId);
  }, [ui.activeNodeId]);

  const handleNodeSelect = (nodeId: string) => {
    setActiveNode(nodeId);
  };

  const handleStartTask = () => {
    const taskId = `task_${ui.activeNodeId}_${Date.now()}`;
    beginTaskAttempt(taskId);
    setIsAttempting(true);
    setOutcome(null);
  };

  const handleCompleteTask = (result: 'success' | 'partial' | 'fail') => {
    const attemptOutcome = finishTaskAttempt(result);
    setOutcome(attemptOutcome);
    setIsAttempting(false);
  };

  const handleCloseOutcome = () => {
    setOutcome(null);
    if (outcome?.nextAction === 'next_node' && outcome.evaluation.attempt.nodeId) {
      const nodes = ui.nodes;
      const currentIndex = nodes.findIndex(n => n.id === ui.activeNodeId);
      if (currentIndex >= 0 && currentIndex < nodes.length - 1) {
        setActiveNode(nodes[currentIndex + 1].id);
      }
    }
  };

  return (
    <div className="journey-screen">
      <JourneyHeader
        chapterTitle={ui.currentChapterTitle}
        readiness={ui.readinessBadge}
        confidence={ui.confidenceBadge}
      />
      <div className="journey-path-container">
        <JourneyPath nodes={ui.nodes} onNodeSelect={handleNodeSelect} />
        <JourneyVisualLayer nodes={ui.nodes} />
      </div>
      <JourneyBottomNav
        activeNodeId={ui.activeNodeId}
        onNodeSelect={handleNodeSelect}
        onAdvance={isAttempting ? () => {} : handleStartTask}
        hasNext={nav.hasNext}
        hasPrevious={nav.hasPrevious}
      />

      {isAttempting && (
        <div className="attempt-overlay">
          <div className="attempt-panel">
            <h3>Task in Progress</h3>
            <p>Complete the task and select your result:</p>
            <div className="attempt-buttons">
              <button className="attempt-success" onClick={() => handleCompleteTask('success')}>
                ✓ Success
              </button>
              <button className="attempt-partial" onClick={() => handleCompleteTask('partial')}>
                ~ Partial
              </button>
              <button className="attempt-fail" onClick={() => handleCompleteTask('fail')}>
                ✗ Fail
              </button>
            </div>
          </div>
        </div>
      )}

      {outcome && (
        <div className="outcome-overlay" onClick={handleCloseOutcome}>
          <div className="outcome-card" onClick={e => e.stopPropagation()}>
            <h3>
              {outcome.evaluation.attempt.result === 'success' ? '✓ Task Completed' :
               outcome.evaluation.attempt.result === 'partial' ? '~ Partial Progress' :
               '✗ Task Incomplete'}
            </h3>

            <div className="outcome-score">
              <span className="score-label">Score</span>
              <span className="score-value">{outcome.evaluation.attempt.score}</span>
            </div>

            <div className="outcome-deltas">
              <div className="delta-row">
                <span>Confidence</span>
                <span className={outcome.evaluation.attempt.confidenceDelta >= 0 ? 'positive' : 'negative'}>
                  {outcome.evaluation.attempt.confidenceDelta >= 0 ? '+' : ''}
                  {Math.round(outcome.evaluation.attempt.confidenceDelta * 100)}%
                </span>
              </div>
              <div className="delta-row">
                <span>Readiness</span>
                <span className={outcome.evaluation.attempt.readinessDelta >= 0 ? 'positive' : 'negative'}>
                  {outcome.evaluation.attempt.readinessDelta >= 0 ? '+' : ''}
                  {outcome.evaluation.attempt.readinessDelta}
                </span>
              </div>
            </div>

            {outcome.evaluation.stateChanged && (
              <div className="outcome-skill">
                <strong>Skill State:</strong>{' '}
                {outcome.evaluation.previousState} → {outcome.evaluation.newState}
              </div>
            )}

            <div className="outcome-feedback">
              <p>{outcome.feedback}</p>
            </div>

            <div className="outcome-next">
              <strong>Next:</strong>{' '}
              {outcome.nextAction === 'next_node' ? 'Proceed to next task' :
               outcome.nextAction === 'retry' ? 'Retry this task' :
               outcome.nextAction === 'review' ? 'Review before continuing' :
               'Continue'}
            </div>

            <button className="outcome-close" onClick={handleCloseOutcome}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
