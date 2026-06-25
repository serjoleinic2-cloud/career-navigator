import type { JourneyRuntimeState } from '../runtime/journey_runtime';
import { getProfession } from '../profession_registry';
import type { UI_NavigationState } from './ui_render_contract';

export function getNavigationState(
  runtimeState: JourneyRuntimeState
): UI_NavigationState {
  const profession = getProfession(runtimeState.professionId);

  if (!profession) {
    return {
      hasNext: false,
      hasPrevious: false,
      nextNodeId: null,
      previousNodeId: null,
    };
  }

  const nodeIds = profession.skillNodes.map(n => n.id);
  const currentIndex = nodeIds.indexOf(runtimeState.activeNodeId);

  const hasNext = currentIndex >= 0 && currentIndex < nodeIds.length - 1;
  const hasPrevious = currentIndex > 0;

  return {
    hasNext,
    hasPrevious,
    nextNodeId: hasNext ? nodeIds[currentIndex + 1] : null,
    previousNodeId: hasPrevious ? nodeIds[currentIndex - 1] : null,
  };
}

export function getNextUINodeId(runtimeState: JourneyRuntimeState): string | null {
  return getNavigationState(runtimeState).nextNodeId;
}

export function getPreviousUINodeId(runtimeState: JourneyRuntimeState): string | null {
  return getNavigationState(runtimeState).previousNodeId;
}
