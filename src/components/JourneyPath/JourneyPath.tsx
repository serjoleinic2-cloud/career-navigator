import type { VisualNode } from '@/core/journey_adapter';
import './JourneyPath.css';

type Props = {
  nodes: VisualNode[];
};

export function JourneyPath({ nodes }: Props) {
  return (
    <div className="journeyPath">
      {nodes.map(node => (
        <div
          key={node.id}
          className={`pathSegment ${node.flowPosition}`}
        />
      ))}
    </div>
  );
}
