import type { UI_State } from '../ui_bridge/ui_render_contract';

let lastUIState: UI_State | null = null;

export function shouldUpdateUI(nextUI: UI_State): boolean {
  if (!lastUIState) {
    lastUIState = nextUI;
    return true;
  }

  const changed =
    lastUIState.activeNodeId !== nextUI.activeNodeId ||
    lastUIState.readinessBadge !== nextUI.readinessBadge ||
    lastUIState.confidenceBadge !== nextUI.confidenceBadge ||
    lastUIState.isJourneyComplete !== nextUI.isJourneyComplete ||
    lastUIState.nodes.length !== nextUI.nodes.length;

  if (changed) {
    lastUIState = nextUI;
  }

  return changed;
}

export function patchUpdateUI(
  prev: UI_State,
  next: UI_State
): Partial<UI_State> {
  const patch: Partial<UI_State> = {};

  if (prev.activeNodeId !== next.activeNodeId) patch.activeNodeId = next.activeNodeId;
  if (prev.readinessBadge !== next.readinessBadge) patch.readinessBadge = next.readinessBadge;
  if (prev.confidenceBadge !== next.confidenceBadge) patch.confidenceBadge = next.confidenceBadge;
  if (prev.isJourneyComplete !== next.isJourneyComplete) patch.isJourneyComplete = next.isJourneyComplete;

  return patch;
}
