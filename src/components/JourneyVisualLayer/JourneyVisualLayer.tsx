import type { UI_Node } from '@/core/ui_bridge/ui_render_contract';
import './JourneyVisualLayer.css';

type Props = {
  nodes: UI_Node[];
};

export function JourneyVisualLayer({ nodes }: Props) {
  return (
    <div className="journeyLayer">
      {nodes.map((n) => {
        const stateClass = n.state === 'active' && n.glow ? 'node--active node--glow'
          : n.state === 'completed' ? 'node--completed'
          : 'node--locked';
        return (
          <div
            key={n.id}
            id={n.id}
            className={`node ${stateClass}`}
            style={{
              opacity: n.state === 'locked' ? 0.4 : 1,
              zIndex: n.state === 'active' ? 10 : 1,
            }}
          >
            <span className="nodeTitle">{n.title}</span>
          </div>
        );
      })}
    </div>
  );
}
