import { useState } from 'react';
import type { SkillNode } from '@/core/skill_state';
import { transition, getCurrentAdvice, canTransition } from '@/core/skill_engine';
import './JourneyFocusPanel.css';

interface JourneyFocusPanelProps {
  node: SkillNode | undefined;
  onStateAdvance?: (nodeId: string, newState: string) => void;
}

export function JourneyFocusPanel({ node, onStateAdvance }: JourneyFocusPanelProps) {
  const [localNode, setLocalNode] = useState<SkillNode | undefined>(node);

  if (node?.id !== localNode?.id) {
    setLocalNode(node);
  }

  if (!localNode) return null;

  const advice = getCurrentAdvice(localNode);

  const handleAdvance = () => {
    if (!canTransition(localNode)) return;
    const next = transition(localNode, 'tap_primary');
    setLocalNode(next);
    onStateAdvance?.(next.id, next.state);
  };

  return (
    <div className="focus-panel">
      <div className="focus-panel__header">
        <span className="focus-panel__chapter">Skill Node</span>
        <span className="focus-panel__state">{localNode.state.toUpperCase()}</span>
      </div>

      <h2 className="focus-panel__title">{localNode.skill}</h2>

      <div className="focus-panel__advice">
        <div className="focus-panel__advice-label">Current State</div>
        <p className="focus-panel__advice-text">{advice}</p>
      </div>

      <div className="focus-panel__signals">
        <div className="focus-panel__signals-label">Signals</div>
        {localNode.signals.map(s => (
          <div key={s} className="focus-panel__signal">• {s}</div>
        ))}
      </div>

      {canTransition(localNode) && (
        <button className="focus-panel__advance-btn" onClick={handleAdvance}>
          Confirm State Advance → {localNode.nextState}
        </button>
      )}

      {!canTransition(localNode) && (
        <div className="focus-panel__complete">Skill Mastered ✓</div>
      )}
    </div>
  );
}
