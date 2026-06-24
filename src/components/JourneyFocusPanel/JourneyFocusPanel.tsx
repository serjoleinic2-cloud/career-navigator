import type { JourneyNode } from '@/core/career_journey_model';
import './JourneyFocusPanel.css';

interface JourneyFocusPanelProps {
  node: JourneyNode | undefined;
}

export function JourneyFocusPanel({ node }: JourneyFocusPanelProps) {
  if (!node) return null;

  return (
    <div className="focus-panel">
      <div className="focus-panel__header">
        <span className="focus-panel__chapter">{node.chapter}</span>
        <span className="focus-panel__day">Day {node.dayIndex}</span>
      </div>

      <div className="focus-panel__title">{node.title}</div>

      <div className="focus-panel__tasks">
        {node.tasks.map((t) => (
          <div key={t} className="focus-panel__task">
            <span className="focus-panel__task-dot" />
            {t}
          </div>
        ))}
      </div>

      <div className="focus-panel__notes">
        <div className="focus-panel__notes-label">Notes</div>
        <div className="focus-panel__notes-placeholder">Tap to add notes...</div>
      </div>

      <button className="focus-panel__action">Start Task</button>
    </div>
  );
}
