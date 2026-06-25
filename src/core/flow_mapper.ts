import type { SkillNode } from './skill_state';
import type { FlowPosition } from './visual_flow';

export type FlowMapEntry = {
  nodeId: string;
  flowPosition: FlowPosition;
};

export function buildFlowMap(
  nodes: SkillNode[],
  activeNodeId: string
): FlowMapEntry[] {
  const activeIndex = nodes.findIndex(n => n.id === activeNodeId);

  return nodes.map((node, index) => ({
    nodeId: node.id,
    flowPosition:
      index < activeIndex
        ? 'past'
        : index === activeIndex
        ? 'active'
        : 'future',
  }));
}
