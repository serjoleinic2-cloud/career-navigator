import type { WorldNodeVisual } from '../../world/visual_world_contract';

export type VisibleRange = {
  startIndex: number;
  endIndex: number;
};

export function getVisibleRange(
  nodes: WorldNodeVisual[],
  activeId: string,
  viewportSize: number = 5
): VisibleRange {
  const activeIndex = nodes.findIndex(n => n.id === activeId);
  if (activeIndex === -1) return { startIndex: 0, endIndex: Math.min(viewportSize, nodes.length) };

  const startIndex = Math.max(0, activeIndex - 2);
  const endIndex = Math.min(nodes.length, activeIndex + viewportSize - 2);

  return { startIndex, endIndex };
}

export function filterVisibleNodes(
  nodes: WorldNodeVisual[],
  activeId: string
): WorldNodeVisual[] {
  const { startIndex, endIndex } = getVisibleRange(nodes, activeId);
  return nodes.slice(startIndex, endIndex);
}

export function shouldSkipNode(
  node: WorldNodeVisual,
  _maxDistance: number = 3
): boolean {
  if (node.status !== 'active' && node.status !== 'completed') {
    return true;
  }
  return false;
}
