import type { VisualNode } from './journey_adapter';

export type RenderNode = {
  id: string;
  title: string;
  uiState: 'completed' | 'active' | 'locked';
  depth: number;
  scale: number;
  opacity: number;
};

export function calculateDepth(index: number, state: string): number {
  if (state === 'active') return 1;
  if (state === 'completed') return 0.5;
  return index * 0.1;
}

export function calculateScale(state: string): number {
  switch (state) {
    case 'active': return 1.05;
    case 'completed': return 0.95;
    case 'locked': return 0.9;
    default: return 1;
  }
}

export function calculateOpacity(state: string): number {
  switch (state) {
    case 'active': return 1;
    case 'completed': return 0.7;
    case 'locked': return 0.35;
    default: return 1;
  }
}

export function mapVisualNodesToRender(nodes: VisualNode[]): RenderNode[] {
  return nodes.map((n, index) => ({
    id: n.id,
    title: n.title,
    uiState: n.uiState,
    depth: calculateDepth(index, n.uiState),
    scale: calculateScale(n.uiState),
    opacity: calculateOpacity(n.uiState),
  }));
}
