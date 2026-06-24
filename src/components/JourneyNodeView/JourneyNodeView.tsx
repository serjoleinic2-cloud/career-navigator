import type { JourneyNode } from '@/core/career_journey_model';
import './JourneyNodeView.css';

interface JourneyNodeViewProps {
  node: JourneyNode;
}

export function JourneyNodeView({ node }: JourneyNodeViewProps) {
  return (
    <div className={`journey-node journey-node--${node.status}`}>
      <div className="journey-node__header">
        <span className="journey-node__chapter">{node.chapter}</span>
        <span className="journey-node__day">Day {node.dayIndex}</span>
      </div>

      <div className="journey-node__title">{node.title}</div>

      {node.status === 'active' && (
        <div className="journey-node__actions">
          <button className="journey-node__action-btn">Start Task</button>
        </div>
      )}
    </div>
  );
}
