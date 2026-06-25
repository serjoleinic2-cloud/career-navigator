import type { SkillNode } from './skill_state';
import { buildJourneyViewModel } from './journey_adapter';
import { mapVisualNodesToRender, type RenderNode } from './visual_node_renderer';

export function buildJourneyUI(nodes: SkillNode[], activeNodeId?: string): RenderNode[] {
  const fallback = nodes[0]?.id ?? '';
  const visual = buildJourneyViewModel(nodes, activeNodeId ?? fallback);
  return mapVisualNodesToRender(visual);
}
