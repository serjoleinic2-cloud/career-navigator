import { useState, useEffect } from 'react';
import type { JourneyNode } from '@/core/career_journey_model';
import './JourneyFocusPanel.css';

interface JourneyFocusPanelProps {
  node: JourneyNode | undefined;
  onTaskComplete?: (taskIndex: number) => void;
  onAllTasksComplete?: () => void;
}

export function JourneyFocusPanel({ node, onTaskComplete, onAllTasksComplete }: JourneyFocusPanelProps) {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setCompletedTasks([]);
    setNotes('');
  }, [node?.id]);

  if (!node) return null;

  const progress = node ? (completedTasks.length / node.tasks.length) * 100 : 0;

  const handleCheck = (index: number) => {
    const newCompleted = completedTasks.includes(index)
      ? completedTasks.filter(i => i !== index)
      : [...completedTasks, index];

    setCompletedTasks(newCompleted);
    onTaskComplete?.(index);

    if (newCompleted.length === node.tasks.length) {
      onAllTasksComplete?.();
    }
  };

  return (
    <div className="focus-panel">
      <div className="focus-panel__header">
        <span className="focus-panel__chapter">{node.chapter}</span>
        <span className="focus-panel__day">Day {node.dayIndex}</span>
      </div>

      <div className="focus-panel__progress">
        <div className="focus-panel__progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="focus-panel__progress-text">
        {completedTasks.length} of {node.tasks.length} completed
      </div>

      <div className="focus-panel__title">{node.title}</div>

      <div className="focus-panel__tasks">
        {node.tasks.map((t, i) => (
          <label key={t} className="focus-panel__task">
            <input
              type="checkbox"
              className="focus-panel__task-check"
              checked={completedTasks.includes(i)}
              onChange={() => handleCheck(i)}
            />
            <span className="focus-panel__task-text">{t}</span>
          </label>
        ))}
      </div>

      <div className="focus-panel__notes">
        <div className="focus-panel__notes-label">Notes</div>
        <textarea
          className="focus-panel__notes-input"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tap to add notes..."
          rows={3}
        />
      </div>

      <button
        className="focus-panel__action"
        onClick={() => console.log('Start task:', node.title)}
      >
        Start Task
      </button>
    </div>
  );
}
