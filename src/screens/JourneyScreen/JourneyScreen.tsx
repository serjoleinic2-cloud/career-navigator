import { useState, useEffect, useCallback } from 'react';
import { getUIState, getNavigation } from '@/core/ui_bridge/ui_bridge';
import { setActiveNode, getActiveNode, submitTask, getRuntimeState } from '@/core/runtime/runtime_controller';
import { subscribe } from '@/core/events/system_event_bus';
import type { SkillNode } from '@/core/skill_state';
import { getActiveProfession, getActiveProfessionId } from '@/core/profession_loader';
import { JourneyPath } from '@/components/JourneyPath/JourneyPath';
import type { TaskContent } from '@/core/task_content';
import { InterviewTrainerScreen } from '@/screens/InterviewTrainer/InterviewTrainerScreen';
import { getPlaybookEntry } from '@/core/playbook/playbook_data';
import { addNote } from '@/core/user_data/notes/notes_controller';
import { loadTaskForNode, createTaskFromDefinition } from '@/core/runtime/runtime_controller';
import type { TaskResult } from '@/core/task/task_execution_engine';
import './JourneyScreen.css';

export function JourneyScreen() {
  const [, setTick] = useState(0);
  const [selectedTask, setSelectedTask] = useState<TaskContent | null>(null);
  const [taskResult, setTaskResult] = useState<TaskResult | null>(null);
  const [expandedAdvice, setExpandedAdvice] = useState<string>('awareness');
  const [trainerTask, setTrainerTask] = useState<TaskContent | null>(null);
  const [noteContent, setNoteContent] = useState('');

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

  const ui = getUIState();
  const nav = getNavigation();
  const node: SkillNode | null = getActiveNode();

  let professionNodes: { id: string; title: string; state: string; domain: string }[] = [];
  try {
    const profession = getActiveProfession();
    professionNodes = profession.skillGraph.map(n => ({
      id: n.id,
      title: n.skill,
      state: n.state,
      domain: typeof n.domain === 'string' ? n.domain : String(n.domain),
    }));
  } catch {
    professionNodes = ui.nodes.map(n => ({
      id: n.id,
      title: n.title,
      state: n.state,
      domain: 'Unknown',
    }));
  }

  const handleNodeSelect = (nodeId: string) => {
    setActiveNode(nodeId);
    setSelectedTask(null);
    setTaskResult(null);
  };

  const handleStartTask = (task: TaskContent) => {
    setSelectedTask(task);
    setTaskResult(null);
  };

  const handleCompleteTask = () => {
    if (!selectedTask || !node) return;
    const definition = loadTaskForNode(node.id);
    if (!definition) {
      console.warn('No task definition for node', node.id);
      return;
    }
    createTaskFromDefinition(definition);
    const result = submitTask({ taskId: selectedTask.id, completed: true });
    setTaskResult(result);
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

  const adviceKeys = ['awareness', 'understanding', 'application', 'readiness', 'execution', 'confidence'] as const;

  return (
    <div className="journey-screen">
      {/* Header */}
      <div className="journey-header">
        <h2>{ui.currentChapterTitle}</h2>
        <div className="badges">
          <span className="badge readiness">{ui.readinessBadge}</span>
          <span className="badge confidence">{ui.confidenceBadge}</span>
        </div>
      </div>

      {/* Journey Path */}
      <JourneyPath 
        nodes={professionNodes} 
        activeNodeId={ui.activeNodeId}
        onNodeSelect={handleNodeSelect} 
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
            <h4>{selectedTask.title}</h4>
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
            <h4>{taskResult.success ? '✓ Task Completed' : '✗ Task Incomplete'}</h4>
            <p><strong>Score:</strong> {taskResult.score}</p>
            {taskResult.confidenceDelta !== undefined && (
              <p>Confidence: {taskResult.confidenceDelta >= 0 ? '+' : ''}{Math.round(taskResult.confidenceDelta * 100)}%</p>
            )}
            {taskResult.readinessDelta !== undefined && (
              <p>Readiness: {taskResult.readinessDelta >= 0 ? '+' : ''}{taskResult.readinessDelta}</p>
            )}
            {taskResult.feedback && <p className="feedback">{taskResult.feedback}</p>}
            {taskResult.recommendation && <p className="recommendation"><strong>Next:</strong> {taskResult.recommendation}</p>}
            <button onClick={handleCloseResult}>Continue</button>
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
        <button 
          disabled={!nav.hasNext} 
          onClick={() => handleNodeSelect(nav.nextNodeId!)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
