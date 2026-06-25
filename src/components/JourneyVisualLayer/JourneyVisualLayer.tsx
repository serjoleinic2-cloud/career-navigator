import type { RenderNode } from '@/core/visual_node_renderer';
import type { VisualNode } from '@/core/journey_adapter';
import './JourneyVisualLayer.css';

type Props = {
  nodes: RenderNode[];
  visualNodes?: VisualNode[];
};

export function JourneyVisualLayer({ nodes, visualNodes }: Props) {
  const visualById = new Map(visualNodes?.map(v => [v.id, v]) ?? []);

  return (
    <div className="journeyLayer">
      {nodes.map((n) => {
        const visual = visualById.get(n.id);
        const flowClass = visual?.flowPosition ?? '';
        return (
          <div
            key={n.id}
            id={n.id}
            className={`node ${n.uiState} ${flowClass}`}
            style={{
              transform: `scale(${n.scale}) translateY(${n.depth * 40}px)`,
              opacity: n.opacity,
              zIndex: n.uiState === 'active' ? 10 : 1,
            }}
          >
            <span className="nodeTitle">{n.title}</span>
          </div>
        );
      })}
    </div>
  );
}
