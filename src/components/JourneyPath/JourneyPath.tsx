import type { UI_Node } from '@/core/ui_bridge/ui_render_contract';
import './JourneyPath.css';

type Props = {
  nodes: UI_Node[];
};

export function JourneyPath({ nodes }: Props) {
  return (
    <div className="journeyPath">
      {nodes.map(node => (
        <div
          key={node.id}
          className={`pathSegment pathSegment--${node.state}`}
        />
      ))}
    </div>
  );
}
