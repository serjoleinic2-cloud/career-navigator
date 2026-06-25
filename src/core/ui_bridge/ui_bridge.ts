import { getRuntimeState } from '../runtime/runtime_controller';
import { mapRuntimeToUI } from './ui_state_mapper';
import { getNavigationState } from './ui_navigation';
import type { UI_State, UI_NavigationState } from './ui_render_contract';

export function getUIState(): UI_State {
  const runtime = getRuntimeState();
  if (!runtime) {
    return {
      nodes: [],
      activeNodeId: '',
      completedNodes: [],
      lockedNodes: [],
      chapterProgress: [],
      readinessBadge: '0%',
      confidenceBadge: '0%',
      currentChapterTitle: '',
      isJourneyComplete: false,
    };
  }
  return mapRuntimeToUI(runtime);
}

export function getVisibleNodes(): UI_State['nodes'] {
  return getUIState().nodes;
}

export function getCurrentFocus(): string {
  return getUIState().activeNodeId;
}

export function getProgressSnapshot(): {
  readiness: string;
  confidence: string;
  completed: number;
  total: number;
} {
  const ui = getUIState();
  return {
    readiness: ui.readinessBadge,
    confidence: ui.confidenceBadge,
    completed: ui.completedNodes.length,
    total: ui.nodes.length,
  };
}

export function getNavigation(): UI_NavigationState {
  const runtime = getRuntimeState();
  if (!runtime) {
    return {
      hasNext: false,
      hasPrevious: false,
      nextNodeId: null,
      previousNodeId: null,
    };
  }
  return getNavigationState(runtime);
}
