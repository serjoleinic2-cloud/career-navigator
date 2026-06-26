import type { UI_Node } from '@/core/ui_bridge/ui_render_contract';
import './JourneyPath.css';

type Props = {
  nodes: UI_Node[];
  onNodeSelect?: (nodeId: string) => void;
};

export function JourneyPath({ nodes, onNodeSelect }: Props) {
  return (
    <div className="journeyPath">
      {nodes.map(node => (
        <div
          key={node.id}
          className={`pathSegment pathSegment--${node.state}`}
          onClick={() => onNodeSelect?.(node.id)}
        />
      ))}
    </div>
  );
}
