import { useState, useEffect, useCallback } from 'react';
import { getUIState, getNavigation } from '@/core/ui_bridge/ui_bridge';
import { setActiveNode, createTask, submitTask, getActiveTask } from '@/core/runtime/runtime_controller';
import { snapToActiveNode } from '@/core/focus_snap_controller';
import { subscribe } from '@/core/events/system_event_bus';
import type { SystemEvent } from '@/core/events/system_event_bus';
import { JourneyVisualLayer } from '@/components/JourneyVisualLayer/JourneyVisualLayer';
import { JourneyPath } from '@/components/JourneyPath/JourneyPath';
import { JourneyHeader } from '@/components/JourneyHeader/JourneyHeader';
import { JourneyBottomNav } from '@/components/JourneyBottomNav/JourneyBottomNav';
import type { TaskResult } from '@/core/task/task_execution_engine';
import type { TaskType } from '@/core/task/task_execution_engine';
import './JourneyScreen.css';

export function JourneyScreen() {
  const [, setTick] = useState(0);
  const [taskResult, setTaskResult] = useState<TaskResult | null>(null);
  const [isTaskActive, setIsTaskActive] = useState(false);
  const [taskType, setTaskType] = useState<TaskType>('CHECKBOX_TASK');

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
    const unsubJourney = subscribe('JOURNEY_COMPLETED', (_event: SystemEvent) => {
      alert('🎉 Journey Complete! All skills mastered.');
      refresh();
    });

    return () => {
      unsubNode();
      unsubState();
      unsubChapter();
      unsubScore();
      unsubUI();
      unsubTask();
      unsubJourney();
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

  const handleStartTask = (type: TaskType) => {
    const titles: Record<TaskType, string> = {
      CHECKBOX_TASK: 'Checklist Review',
      TEXT_TASK: 'Written Reflection',
      SELF_ASSESSMENT: 'Self Assessment',
      MULTIPLE_CHOICE: 'Knowledge Check',
    };
    createTask(type, titles[type], `Complete the ${titles[type]} for this skill.`);
    setTaskType(type);
    setIsTaskActive(true);
    setTaskResult(null);
  };

  const handleSubmitTask = (payload: unknown) => {
    const result = submitTask(payload);
    setTaskResult(result);
    setIsTaskActive(false);
  };

  const handleCloseResult = () => {
    setTaskResult(null);
    if (taskResult?.success && taskResult.skillTransition?.changed) {
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
        onAdvance={isTaskActive ? () => {} : () => handleStartTask('CHECKBOX_TASK')}
        hasNext={nav.hasNext}
        hasPrevious={nav.hasPrevious}
      />

      {!isTaskActive && !taskResult && (
        <div className="task-selector">
          <button onClick={() => handleStartTask('CHECKBOX_TASK')}>Checklist</button>
          <button onClick={() => handleStartTask('TEXT_TASK')}>Text Task</button>
          <button onClick={() => handleStartTask('SELF_ASSESSMENT')}>Self Assessment</button>
          <button onClick={() => handleStartTask('MULTIPLE_CHOICE')}>Quiz</button>
        </div>
      )}

      {isTaskActive && (
        <div className="task-overlay">
          <div className="task-panel">
            <h3>{getActiveTask()?.title ?? 'Task'}</h3>
            <p>{getActiveTask()?.description ?? ''}</p>
            <TaskInputForm type={taskType} onSubmit={handleSubmitTask} />
          </div>
        </div>
      )}

      {taskResult && (
        <div className="result-overlay" onClick={handleCloseResult}>
          <div className="result-card" onClick={e => e.stopPropagation()}>
            <h3>
              {taskResult.success ? '✓ Task Completed' : '✗ Task Incomplete'}
            </h3>

            <div className="result-score">
              <span className="score-label">Score</span>
              <span className="score-value">{taskResult.score}</span>
            </div>

            <div className="result-deltas">
              <div className="delta-row">
                <span>Confidence</span>
                <span className={taskResult.confidenceDelta >= 0 ? 'positive' : 'negative'}>
                  {taskResult.confidenceDelta >= 0 ? '+' : ''}
                  {Math.round(taskResult.confidenceDelta * 100)}%
                </span>
              </div>
              <div className="delta-row">
                <span>Readiness</span>
                <span className={taskResult.readinessDelta >= 0 ? 'positive' : 'negative'}>
                  {taskResult.readinessDelta >= 0 ? '+' : ''}
                  {taskResult.readinessDelta}
                </span>
              </div>
            </div>

            {taskResult.skillTransition?.changed && (
              <div className="result-skill">
                <strong>Skill Progress:</strong>{' '}
                {taskResult.skillTransition.previous} → {taskResult.skillTransition.current}
              </div>
            )}

            {taskResult.chapterProgressDelta > 0 && (
              <div className="result-chapter">
                <strong>Chapter Progress:</strong> +{taskResult.chapterProgressDelta}%
              </div>
            )}

            <div className="result-feedback">
              <p>{taskResult.feedback}</p>
            </div>

            <div className="result-recommendation">
              <strong>Next:</strong> {taskResult.recommendation}
            </div>

            <button className="result-close" onClick={handleCloseResult}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TaskInputForm({ type, onSubmit }: { type: TaskType; onSubmit: (payload: unknown) => void }) {
  const [payload, setPayload] = useState<unknown>(null);

  switch (type) {
    case 'CHECKBOX_TASK':
      return <CheckboxTaskForm onChange={setPayload} onSubmit={() => onSubmit(payload)} />;
    case 'TEXT_TASK':
      return <TextTaskForm onChange={setPayload} onSubmit={() => onSubmit(payload)} />;
    case 'SELF_ASSESSMENT':
      return <SelfAssessmentForm onChange={setPayload} onSubmit={() => onSubmit(payload)} />;
    case 'MULTIPLE_CHOICE':
      return <MultipleChoiceForm onChange={setPayload} onSubmit={() => onSubmit(payload)} />;
    default:
      return null;
  }
}

function CheckboxTaskForm({ onChange, onSubmit }: { onChange: (v: unknown) => void; onSubmit: () => void }) {
  const [items, setItems] = useState([
    { label: 'Reviewed resume structure', checked: false },
    { label: 'Updated contact information', checked: false },
    { label: 'Added relevant experience', checked: false },
  ]);

  useEffect(() => {
    onChange(items);
  }, [items]);

  return (
    <div className="checkbox-task">
      {items.map((item, i) => (
        <label key={i} className="checkbox-item">
          <input
            type="checkbox"
            checked={item.checked}
            onChange={e => {
              const updated = [...items];
              updated[i].checked = e.target.checked;
              setItems(updated);
            }}
          />
          {item.label}
        </label>
      ))}
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

function TextTaskForm({ onChange, onSubmit }: { onChange: (v: unknown) => void; onSubmit: () => void }) {
  const [text, setText] = useState('');

  return (
    <div className="text-task">
      <textarea
        placeholder="Write your reflection here (min 20 chars)..."
        value={text}
        onChange={e => {
          setText(e.target.value);
          onChange(e.target.value);
        }}
        rows={4}
      />
      <button onClick={onSubmit} disabled={text.trim().length < 20}>
        Submit
      </button>
    </div>
  );
}

function SelfAssessmentForm({ onChange, onSubmit }: { onChange: (v: unknown) => void; onSubmit: () => void }) {
  const [rating, setRating] = useState(3);

  return (
    <div className="self-assessment">
      <p>Rate your confidence (1-5):</p>
      <div className="rating-buttons">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            className={rating === n ? 'selected' : ''}
            onClick={() => {
              setRating(n);
              onChange(n);
            }}
          >
            {n}
          </button>
        ))}
      </div>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

function MultipleChoiceForm({ onChange: _onChange, onSubmit }: { onChange: (v: unknown) => void; onSubmit: () => void }) {
  const [answer, setAnswer] = useState('');

  return (
    <div className="multiple-choice">
      <p>What is the best practice for resume formatting?</p>
      <label>
        <input type="radio" name="mc" value="correct" onChange={e => setAnswer(e.target.value)} />
        Use clear sections with bullet points
      </label>
      <label>
        <input type="radio" name="mc" value="wrong1" onChange={e => setAnswer(e.target.value)} />
        Use a single paragraph for everything
      </label>
      <label>
        <input type="radio" name="mc" value="wrong2" onChange={e => setAnswer(e.target.value)} />
        Include every job ever held
      </label>
      <button onClick={onSubmit} disabled={!answer}>
        Submit
      </button>
    </div>
  );
}
