import type { VisualNode } from '@/core/journey_adapter';
import './JourneyFocusPanel.css';

interface JourneyFocusPanelProps {
  node: VisualNode | undefined;
}

export function JourneyFocusPanel({ node }: JourneyFocusPanelProps) {
  if (!node) return null;

  return (
    <div className="focus-panel">
      <div className="focus-panel__header">
        <span className="focus-panel__chapter">{node.chapter}</span>
        <span className="focus-panel__state">{node.uiState.toUpperCase()}</span>
      </div>

      <h2 className="focus-panel__title">{node.title}</h2>

      <div className="focus-panel__intensity">
        Focus Intensity: {Math.round(node.focusIntensity * 100)}%
      </div>

      <div className="focus-panel__status">
        Status: {node.uiState === 'completed' ? 'Completed' : node.uiState === 'active' ? 'In Progress' : 'Locked'}
      </div>
    </div>
  );
}
