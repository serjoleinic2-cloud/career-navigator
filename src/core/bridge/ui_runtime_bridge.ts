import type { UnifiedRuntimeState } from '../runtime/unified_runtime_state';
import { getCurrentView } from '../runtime/runtime_selector_final';
import type { UI_State, UI_NodeState } from '../ui_bridge/ui_render_contract';

export function syncUI(runtimeState: UnifiedRuntimeState): UI_State {
  const view = getCurrentView(runtimeState);

  const nodes = Object.entries(runtimeState.skillState).map(([id, state]) => ({
    id,
    title: id,
    state: mapSkillStateToUI(state),
    visualLevel: getVisualLevel(state),
    glow: state === 'readiness' || state === 'application',
  }));

  const completedNodes = nodes.filter(n => n.state === 'completed').map(n => n.id);
  const lockedNodes = nodes.filter(n => n.state === 'locked').map(n => n.id);

  return {
    nodes,
    activeNodeId: view.currentNodeId,
    completedNodes,
    lockedNodes,
    chapterProgress: Object.entries(runtimeState.chapterState).map(([id, c]) => ({
      chapterId: id,
      title: id,
      percent: c.progress,
      completed: c.completed,
      active: c.active,
      locked: false,
      lockReason: '',
      unlockHint: '',
    })),
    readinessBadge: `${view.readinessScore}%`,
    confidenceBadge: `${view.confidenceScore}%`,
    currentChapterTitle: view.activeChapterId,
    isJourneyComplete: view.completedNodes === view.totalNodes && view.totalNodes > 0,
  };
}

function mapSkillStateToUI(state: string): UI_NodeState {
  if (state === 'confidence' || state === 'execution') return 'completed';
  if (state === 'readiness' || state === 'application') return 'active';
  return 'locked';
}

function getVisualLevel(state: string): number {
  const levels: Record<string, number> = {
    locked: 0,
    awareness: 1,
    understanding: 2,
    application: 3,
    readiness: 4,
    execution: 5,
    confidence: 6,
  };
  return levels[state] ?? 0;
}
