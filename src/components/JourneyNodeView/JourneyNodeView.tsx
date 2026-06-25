import type { VisualNode } from '@/core/journey_adapter';
import './JourneyNodeView.css';

interface JourneyNodeViewProps {
  nodes: VisualNode[];
  activeNodeId: string;
}

export function JourneyNodeView({ nodes, activeNodeId }: JourneyNodeViewProps) {
  return (
    <div className="journey-nodes">
      {nodes.map(node => (
        <div
          key={node.id}
          className={`journey-node ${node.id === activeNodeId ? 'journey-node--active' : ''} journey-node--${node.uiState}`}
        >
          <div className="journey-node__header">
            <span className="journey-node__chapter">{node.chapter}</span>
            <span className="journey-node__state">{node.uiState.toUpperCase()}</span>
          </div>
          <div className="journey-node__title">{node.title}</div>
          <div className="journey-node__intensity" style={{ opacity: node.focusIntensity }}>
            Focus: {Math.round(node.focusIntensity * 100)}%
          </div>
        </div>
      ))}
    </div>
  );
}
