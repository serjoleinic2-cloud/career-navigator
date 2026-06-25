import type { SkillNode, SkillState } from './skill_state';
import type { FlowPosition } from './visual_flow';
import { buildFlowMap } from './flow_mapper';
import { getNodeDepth } from './depth_mapper';

export type VisualNode = {
  id: string;
  title: string;
  chapter: string;
  uiState: 'completed' | 'active' | 'locked';
  flowPosition: FlowPosition;
  depth: number;
  focusIntensity: number;
};

export function mapSkillStateToUI(state: SkillState): VisualNode['uiState'] {
  switch (state) {
    case 'confidence':
    case 'execution':
      return 'completed';
    case 'readiness':
    case 'application':
      return 'active';
    case 'understanding':
    case 'awareness':
    default:
      return 'locked';
  }
}

export function getFocusIntensity(state: SkillState): number {
  switch (state) {
    case 'awareness': return 0.2;
    case 'understanding': return 0.4;
    case 'application': return 0.6;
    case 'readiness': return 0.8;
    case 'execution': return 1.0;
    case 'confidence': return 1.0;
    default: return 0;
  }
}

export function extractChapter(node: SkillNode): string {
  if (node.skill.includes('Resume')) return 'Resume';
  if (node.skill.includes('LinkedIn')) return 'LinkedIn';
  if (node.skill.includes('Interview')) return 'Interview';
  if (node.skill.includes('Application')) return 'Applications';
  if (node.skill.includes('Network')) return 'Networking';
  if (node.skill.includes('Negotiation')) return 'Negotiation';
  return 'General';
}

export function buildJourneyViewModel(
  nodes: SkillNode[],
  activeNodeId: string
): VisualNode[] {
  const flowMap = buildFlowMap(nodes, activeNodeId);
  const flowById = new Map(flowMap.map(f => [f.nodeId, f.flowPosition]));

  return nodes.map((node) => {
    const flowPosition = flowById.get(node.id) ?? 'future';
    return {
      id: node.id,
      title: node.skill,
      chapter: extractChapter(node),
      uiState: mapSkillStateToUI(node.state),
      flowPosition,
      depth: getNodeDepth(flowPosition),
      focusIntensity: getFocusIntensity(node.state),
    };
  });
}

export function getVisibleNodes(visualNodes: VisualNode[]): {
  completed: VisualNode[];
  active: VisualNode[];
  locked: VisualNode[];
} {
  const completed = visualNodes.filter(n => n.uiState === 'completed');
  const active = visualNodes.filter(n => n.uiState === 'active');
  const locked = visualNodes.filter(n => n.uiState === 'locked');
  return { completed, active, locked };
}
