import type { SkillNode } from '@/core/skill_state';
import { getStateDescription } from '@/core/advice_engine';
import './JourneyNodeView.css';

interface JourneyNodeViewProps {
  node: SkillNode;
  isActive?: boolean;
}

export function JourneyNodeView({ node, isActive }: JourneyNodeViewProps) {
  return (
    <div className={`journey-node ${isActive ? 'journey-node--active' : ''}`}>
      <div className="journey-node__header">
        <span className="journey-node__skill">{node.skill}</span>
        <span className="journey-node__state">{node.state.toUpperCase()}</span>
      </div>

      <div className="journey-node__description">
        {getStateDescription(node.state)}
      </div>

      <div className="journey-node__signals-preview">
        {node.signals.slice(0, 1).map(s => (
          <span key={s} className="journey-node__signal-tag">{s}</span>
        ))}
      </div>
    </div>
  );
}
