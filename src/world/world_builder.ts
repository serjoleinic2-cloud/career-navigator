import type { UI_Node } from '@/core/ui_bridge/ui_render_contract';
import type { WorldNodeVisual } from './visual_world_contract';

export function buildWorldFromUI(uiNodes: UI_Node[]): WorldNodeVisual[] {
  return uiNodes.map((node, index) => {
    const total = uiNodes.length;
    const progress = total > 1 ? index / (total - 1) : 0;

    const x = Math.sin(index * 0.8) * 60;
    const y = progress * 400;
    const z = Math.cos(index * 0.8) * 30;

    const glowIntensity = node.state === 'active' ? 1.0
      : node.state === 'completed' ? 0.6
      : 0.15;

    return {
      id: node.id,
      level: node.visualLevel,
      position3D: { x, y, z },
      glowIntensity,
      isActive: node.state === 'active',
      isCompleted: node.state === 'completed',
      isLocked: node.state === 'locked',
    };
  });
}

export function getCameraFocusId(uiNodes: UI_Node[]): string {
  const active = uiNodes.find(n => n.state === 'active');
  return active?.id ?? uiNodes[0]?.id ?? '';
}

export function getFogIntensity(uiNodes: UI_Node[]): number {
  const completed = uiNodes.filter(n => n.state === 'completed').length;
  const total = uiNodes.length;
  return total > 0 ? 0.3 + (completed / total) * 0.5 : 0.3;
}
