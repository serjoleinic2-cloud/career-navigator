import { useState, useEffect, useCallback, useRef } from 'react';
import { getUIState, getNavigation } from '@/core/ui_bridge/ui_bridge';
import { setActiveNode, getActiveNode, submitTask, getRuntimeState } from '@/core/runtime/runtime_controller';
import { subscribe } from '@/core/events/system_event_bus';
import type { SkillNode } from '@/core/skill_state';
import { getActiveProfessionId } from '@/core/profession_loader';
import { JourneyPath } from '@/components/JourneyPath/JourneyPath';
import type { TaskContent } from '@/core/task_content';
import { InterviewTrainerScreen } from '@/screens/InterviewTrainer/InterviewTrainerScreen';
import { getPlaybookEntry } from '@/core/playbook/playbook_data';
import { addNote } from '@/core/user_data/notes/notes_controller';
import { loadTaskForNode, createTaskFromDefinition } from '@/core/runtime/runtime_controller';
import { getTaskByNodeId } from '@/core/task/task_content_engine';
import type { TaskDefinition } from '@/core/task/task_content_engine';
import type { TaskResult } from '@/core/task/task_execution_engine';
import './JourneyScreen.css';

export function JourneyScreen() {
  const [, setTick] = useState(0);
  const [selectedTask, setSelectedTask] = useState<TaskContent | null>(null);
  const [taskResult, setTaskResult] = useState<TaskResult | null>(null);
  const [expandedAdvice, setExpandedAdvice] = useState<string>('awareness');
  const [trainerTask, setTrainerTask] = useState<TaskContent | null>(null);
  const [noteContent, setNoteContent] = useState('');
  const [clickedNodeId, setClickedNodeId] = useState<string | null>(null);
  const [platformTaskDef, setPlatformTaskDef] = useState<TaskDefinition | null>(null);
  const [fabVisible, setFabVisible] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [lockedToast, setLockedToast] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  // Scroll listener for FAB hide/show
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let lastScroll = 0;
    const onScroll = () => {
      const current = el.scrollTop;
      setFabVisible(current <= lastScroll || current < 20);
      lastScroll = current;
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Timer for active task
  useEffect(() => {
    if (selectedTask && !taskResult) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(t => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [selectedTask, taskResult]);

  const ui = getUIState();
  const nav = getNavigation();
  const node: SkillNode | null = getActiveNode();

  const runtime = getRuntimeState();
  const professionNodes: { id: string; title: string; state: string; domain: string }[] = runtime
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

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Toast auto-dismiss
  useEffect(() => {
    if (lockedToast) {
      const t = setTimeout(() => setLockedToast(null), 2000);
      return () => clearTimeout(t);
    }
  }, [lockedToast]);

  const handleNodeSelect = (nodeId: string) => {
    setActiveNode(nodeId);
    setSelectedTask(null);
    setTaskResult(null);
    const clickedRuntime = getRuntimeState();
    const clickedNodeState = clickedRuntime?.nodeStates[nodeId]?.state;
    if (clickedNodeState === 'locked') {
      setLockedToast('Complete previous tasks to unlock this node.');
      setClickedNodeId(null);
      setPlatformTaskDef(null);
      return;
    }
    const taskDef = getTaskByNodeId(nodeId);
    setPlatformTaskDef(taskDef ?? null);
    setClickedNodeId(nodeId);
  };

  const handleClosePlatformModal = () => {
    setClickedNodeId(null);
    setPlatformTaskDef(null);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimerSeconds(0);
  };

  const handleStartTaskFromModal = () => {
    const node = runtime ? runtime.nodeStates[clickedNodeId!] : null;
    if (!node) return;
    const taskContent = node.tasks[0];
    if (taskContent) {
      handleStartTask(taskContent);
    }
    handleClosePlatformModal();
  };

  const handleNextNodeInModal = () => {
    if (!nav.hasNext || !nav.nextNodeId) return;
    handleClosePlatformModal();
    handleNodeSelect(nav.nextNodeId);
  };

  const handleStartTask = (task: TaskContent) => {
    setSelectedTask(task);
    setTaskResult(null);
  };

  const handleCompleteTask = () => {
    if (!selectedTask || !node) return;

    // Ensure task definition is loaded before submitting
    const definition = loadTaskForNode(node.id);
    if (definition) {
      createTaskFromDefinition(definition);
    }

    try {
      const result = submitTask({ taskId: selectedTask.id, completed: true });
      setTaskResult(result);
      setCompletedTaskIds(prev => [...prev, selectedTask.id]);
    } catch (err) {
      console.error('[JourneyScreen] submitTask failed:', err);
    }
    setSelectedTask(null);
  };

  const handleCloseResult = () => {
    setTaskResult(null);
  };

  const handleSaveNote = () => {
    if (!selectedTask || !noteContent.trim()) return;
    const professionId = getActiveProfessionId() || '';
    const runtime = getRuntimeState();
    addNote({
      professionId,
      chapterId: runtime?.activeChapterId || '',
      nodeId: node?.id || '',
      taskId: selectedTask.id,
      content: noteContent.trim(),
    });
    setNoteContent('');
  };

  const toggleAdvice = (key: string) => {
    setExpandedAdvice(expandedAdvice === key ? '' : key);
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

  const adviceKeys = ['awareness', 'understanding', 'application', 'readiness', 'execution', 'confidence'] as const;

  return (
    <div className="journey-screen" ref={scrollRef}>
      {/* FAB */}
      <div className={`fab-container ${fabVisible ? 'fab-visible' : 'fab-hidden'}`}>
        <span className="fab-tooltip" data-tooltip="Quick start current task">Quick start current task</span>
        <button
          className="fab-button"
          onClick={() => {
            if (node) {
              const taskDef = getTaskByNodeId(node.id);
              setPlatformTaskDef(taskDef ?? null);
              setClickedNodeId(node.id);
            }
          }}
          aria-label="Start Day"
        >
          ▶
        </button>
      </div>

      {/* Minimal Header */}
      <div className="journey-header-minimal">
        <h2>{ui.currentChapterTitle}</h2>
      </div>

      {/* Journey Path */}
      <JourneyPath 
        nodes={professionNodes} 
        activeNodeId={ui.activeNodeId}
        onNodeSelect={handleNodeSelect} 
        totalNodes={professionNodes.length}
        readinessScore={runtime?.readinessScore ?? 0}
      />

      {/* Node Info */}
      <div className="node-info">
        <h3>{node.skill}</h3>
        <p className="domain">{node.domain}</p>
      </div>

      {/* Advice - Collapsible */}
      <div className="advice-section">
        <h4>Advice</h4>
        {adviceKeys.map(key => (
          <div key={key} className="advice-item">
            <button 
              className="advice-toggle" 
              onClick={() => toggleAdvice(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
              {expandedAdvice === key ? ' ▼' : ' ▶'}
            </button>
            {expandedAdvice === key && node.advice[key] && (
              <p className="advice-text">{node.advice[key]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Signals */}
      <div className="signals-section">
        <h4>Signals (Mastery Criteria)</h4>
        <ul>
          {node.signals.map((signal, i) => (
            <li key={i}>{signal}</li>
          ))}
        </ul>
      </div>

      {/* Tasks List */}
      <div className="tasks-section">
        <h4>Tasks ({node.tasks.length})</h4>
        {!selectedTask && !taskResult && (
          <div className="task-list">
            {node.tasks.map(task => (
              <div 
                key={task.id} 
                className="task-card"
                onClick={() => handleStartTask(task)}
              >
                <div className="task-header">
                  <h5>{task.title}</h5>
                  <span className="task-meta">{task.estimatedMinutes} min • Difficulty {task.difficulty}</span>
                </div>
                <p className="task-objective">{task.objective}</p>
              </div>
            ))}
          </div>
        )}

        {/* Task Detail */}
        {selectedTask && !taskResult && (
          <div className="task-detail">
            {node.tasks.indexOf(selectedTask) > 0 && completedTaskIds.includes(node.tasks[node.tasks.indexOf(selectedTask) - 1]?.id) && (
              <div className="previous-task-badge">Previous task completed ✅</div>
            )}
            <div className="task-detail-header">
              <div>
                <h4>{selectedTask.title}</h4>
                <div className="task-progress-dots">
                  {node.tasks.map(t => {
                    const isCompleted = completedTaskIds.includes(t.id);
                    const isCurrent = t.id === selectedTask.id;
                    return (
                      <span key={t.id} className="progress-dot-wrapper">
                        <span
                          className={`progress-dot ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                        >
                          {isCompleted && '✓'}
                        </span>
                      </span>
                    );
                  })}
                  <span className="progress-label">Task {node.tasks.indexOf(selectedTask) + 1} of {node.tasks.length}</span>
                </div>
              </div>
              <div className="task-timer">Est. {selectedTask.estimatedMinutes} min | Spent {formatTime(timerSeconds)}</div>
            </div>
            <p className="objective"><strong>Objective:</strong> {selectedTask.objective}</p>
            
            <div className="instructions">
              <h5>Instructions</h5>
              <ol>
                {selectedTask.instructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ol>
            </div>

            <div className="completion-criteria">
              <h5>Completion Criteria</h5>
              <ul>
                {selectedTask.completionCriteria.map((crit, i) => (
                  <li key={i}>{crit}</li>
                ))}
              </ul>
            </div>

            {selectedTask.tips.length > 0 && (
              <div className="tips">
                <h5>Tips</h5>
                <ul>
                  {selectedTask.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="expected-outcome"><strong>Expected Outcome:</strong> {selectedTask.expectedOutcome}</p>
            <p className="meta">{selectedTask.estimatedMinutes} minutes • Difficulty {selectedTask.difficulty}</p>

            {(selectedTask as { playbookReference?: string }).playbookReference && (
              <div className="playbook-link" style={{ marginBottom: 12 }}>
                <button
                  onClick={() => {
                    const ref = (selectedTask as { playbookReference?: string }).playbookReference!;
                    const entry = getPlaybookEntry(ref);
                    if (entry) {
                      localStorage.setItem('playbook_selected_entry', JSON.stringify(entry));
                      window.location.hash = '#playbook';
                    }
                  }}
                  className="trainer-btn primary"
                  style={{ width: '100%', display: 'block' }}
                >
                  📖 Open Playbook
                </button>
              </div>
            )}

            <div className="note-section">
              <h5>Notes</h5>
              <div className="char-count">{noteContent.length} characters</div>
              <textarea
                value={noteContent}
                onChange={e => setNoteContent(e.target.value)}
                onKeyDown={e => {
                  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                    e.preventDefault();
                    handleSaveNote();
                  }
                }}
                placeholder="Write a note about this task..."
                rows={3}
              />
              <button
                onClick={handleSaveNote}
                disabled={!noteContent.trim()}
                className="note-save-btn"
              >
                Save Note
              </button>
            </div>

            <div className="task-actions">
              <button onClick={() => setSelectedTask(null)}>Back</button>
              <button onClick={() => setTrainerTask(selectedTask)} className="primary">Practice with Trainer</button>
              <button onClick={handleCompleteTask}>Complete Task</button>
            </div>
          </div>
        )}

        {/* Task Result */}
        {taskResult && (
          <div className="task-result">
            {taskResult.success && (
              <div className="confetti-burst">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="burst-particle"
                    style={{
                      left: `${50 + (Math.random() - 0.5) * 80}%`,
                      top: `${50 + (Math.random() - 0.5) * 80}%`,
                      animationDelay: `${Math.random() * 0.5}s`,
                      backgroundColor: ['#FF6B6B', '#FFE66D', '#4ECDC4', '#45B7D1', '#96CEB4'][i % 5],
                    }}
                  />
                ))}
              </div>
            )}
            <div className={`checkmark-icon ${taskResult.success ? 'checkmark-draw' : ''}`}>
              {taskResult.success ? '✓' : '✗'}
            </div>
            <h4>{taskResult.success ? 'Task Completed!' : 'Task Incomplete'}</h4>
            {taskResult.confidenceDelta !== undefined && (
              <p>Confidence: {taskResult.confidenceDelta >= 0 ? '+' : ''}{Math.round(taskResult.confidenceDelta * 100)}%</p>
            )}
            {taskResult.readinessDelta !== undefined && (
              <p>Readiness: {taskResult.readinessDelta >= 0 ? '+' : ''}{taskResult.readinessDelta}</p>
            )}
            {taskResult.feedback && <p className="feedback">{taskResult.feedback}</p>}
            {taskResult.recommendation && <p className="recommendation"><strong>Next:</strong> {taskResult.recommendation}</p>}
            <div className="result-actions">
              <button onClick={handleCloseResult}>Return to Journey</button>
              {nav.hasNext && nav.nextNodeId && (
                <button className="primary" onClick={() => { handleCloseResult(); handleNodeSelect(nav.nextNodeId!); }}>
                  Next Task →
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <button 
          disabled={!nav.hasPrevious} 
          onClick={() => handleNodeSelect(nav.previousNodeId!)}
        >
          ← Previous
        </button>
        <button onClick={() => { window.location.hash = '#notes'; }}>
          Notes
        </button>
        <button onClick={() => { window.location.hash = '#dashboard'; }}>
          Dashboard
        </button>
        <button 
          disabled={!nav.hasNext} 
          onClick={() => handleNodeSelect(nav.nextNodeId!)}
        >
          Next →
        </button>
      </div>

      {/* Platform Modal (Bottom Sheet) */}
      {/* Locked Toast */}
      {lockedToast && <div className="locked-toast">{lockedToast}</div>}

      {/* Platform Modal (Bottom Sheet) */}
      {clickedNodeId && runtime && runtime.nodeStates[clickedNodeId] && (() => {
        const clickedNode = runtime.nodeStates[clickedNodeId];
        const nodeState = clickedNode.state;
        const isCompleted = nodeState === 'confidence' || nodeState === 'execution';
        const taskDef = platformTaskDef;

        return (
          <div className="platform-modal-overlay" onClick={handleClosePlatformModal}>
            <div className="platform-modal-sheet" onClick={e => e.stopPropagation()}>
              <div className="modal-handle" />
              <div className="modal-header">
                <h3>{clickedNode.skill}</h3>
                <button className="modal-close" onClick={handleClosePlatformModal}>✕</button>
              </div>

              {isCompleted && (
                <div className="modal-body completed-content">
                  <div className="completed-icon">✓</div>
                  <p className="completed-title">Node Completed</p>
                  <div className="completed-signals">
                    <h5>Signals Achieved</h5>
                    <ul>
                      {clickedNode.signals?.map((signal: string, i: number) => (
                        <li key={i}>{signal}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {!isCompleted && taskDef && (
                <div className="modal-body active-content">
                  <p className="task-description">{taskDef.description}</p>
                  <div className="task-meta-row">
                    <span>⏱ {taskDef.estimatedDuration} min</span>
                    <span>Difficulty: {'★'.repeat(taskDef.difficulty)}{'☆'.repeat(5 - taskDef.difficulty)}</span>
                  </div>
                  <button className="start-task-btn" onClick={handleStartTaskFromModal}>
                    Start Task
                  </button>
                </div>
              )}

              {!isCompleted && !taskDef && (
                <div className="modal-body">
                  <p>No task available for this node.</p>
                </div>
              )}

              <div className="modal-footer">
                {nav.hasNext && nav.nextNodeId && (
                  <button className="next-task-btn" onClick={handleNextNodeInModal}>
                    Next Task →
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
