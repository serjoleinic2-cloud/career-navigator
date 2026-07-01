import type { WorldNodeVisual, WorldState } from './visual_world_contract';
import { getActiveProfession } from '../core/profession_loader';

const CHAPTER_VERTICAL_SPACING = 180;
const NODE_HORIZONTAL_SPREAD = 120;
const BASELINE_Y = 0;

export function buildWorldStateFromRuntime(runtimeState: {
  nodeStates: Record<string, { state: string }>;
  activeNodeId: string;
  activeChapterId: string;
  chapterProgress: Record<string, number>;
}): WorldState {
  const profession = getActiveProfession();
  const chapters = profession.chapters;
  const nodes: WorldNodeVisual[] = [];
  let totalNodes = 0;

  // Build nodes bottom-to-top: Chapter 0 at bottom, last chapter at top
  for (let chapterIdx = 0; chapterIdx < chapters.length; chapterIdx++) {
    const chapter = chapters[chapterIdx];
    const chapterY = BASELINE_Y + (chapterIdx * CHAPTER_VERTICAL_SPACING);
    const nodeCount = chapter.nodeIds.length;

    for (let nodeIdx = 0; nodeIdx < nodeCount; nodeIdx++) {
      const nodeId = chapter.nodeIds[nodeIdx];
      const nodeState = runtimeState.nodeStates[nodeId];
      const isActive = nodeId === runtimeState.activeNodeId;
      const isCompleted = nodeState?.state === 'confidence' || nodeState?.state === 'execution';
      const isLocked = !isCompleted && !isActive;

      // Horizontal spread: center node, then alternating left/right
      const offset = nodeIdx % 2 === 0 ? 0 : (nodeIdx % 4 === 1 ? -1 : 1) * Math.ceil(nodeIdx / 2);
      const x = offset * NODE_HORIZONTAL_SPREAD;

      nodes.push({
        id: nodeId,
        x,
        y: chapterY,
        chapterId: chapter.id,
        status: isCompleted ? 'completed' : isActive ? 'active' : 'locked',
        glowIntensity: isActive ? 1.0 : isCompleted ? 0.3 : 0,
        scale: isActive ? 1.2 : isCompleted ? 1.0 : 0.8,
        opacity: isLocked ? 0.4 : 1.0,
        label: chapter.title,
      });

      totalNodes++;
    }
  }

  // Reverse Y so bottom chapter is visually at bottom
  const maxY = Math.max(...nodes.map(n => n.y));
  const reversedNodes = nodes.map(n => ({
    ...n,
    y: maxY - n.y,
  }));

  // Recalculate active node index after reversal
  const activeNode = reversedNodes.find(n => n.status === 'active');
  const activeNodeY = activeNode?.y ?? 0;

  return {
    nodes: reversedNodes,
    connections: buildConnections(reversedNodes),
    camera: {
      x: 0,
      y: activeNodeY - 200, // Focus active node in lower third
      zoom: 1.0,
    },
    atmosphere: {
      timeOfDay: 'day',
      fogDensity: 0.2,
    },
  };
}

function buildConnections(nodes: WorldNodeVisual[]): Array<{ from: string; to: string }> {
  const connections: Array<{ from: string; to: string }> = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const current = nodes[i];
    const next = nodes[i + 1];
    // Only connect upward (next has lower Y = higher visually)
    if (next.y < current.y) {
      connections.push({ from: current.id, to: next.id });
    }
  }
  return connections;
}
