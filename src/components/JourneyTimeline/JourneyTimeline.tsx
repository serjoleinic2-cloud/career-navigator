import type { VisualNode } from '@/core/journey_adapter';
import './JourneyTimeline.css';

interface JourneyTimelineProps {
  nodes: VisualNode[];
  activeNodeId: string;
  onNodeSelect: (nodeId: string) => void;
}

export function JourneyTimeline({ nodes, activeNodeId, onNodeSelect }: JourneyTimelineProps) {
  return (
    <div className="journey-timeline">
      <div className="journey-timeline__nodes">
        {nodes.map(node => (
          <div
            key={node.id}
            className={`journey-timeline__dot ${node.id === activeNodeId ? 'journey-timeline__dot--active' : ''} journey-timeline__dot--${node.uiState}`}
            onClick={() => onNodeSelect(node.id)}
          >
            <div className="journey-timeline__dot-inner" />
          </div>
        ))}
      </div>
      <div className="journey-timeline__scroll-hint">
        <span className="journey-timeline__scroll-arrow">↓</span>
        <span className="journey-timeline__scroll-text">Scroll for more</span>
      </div>
    </div>
  );
}
