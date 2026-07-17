import { getRuntimeState } from '../runtime/runtime_controller';
import { mapRuntimeToUI } from './ui_state_mapper';
import { getNavigationState } from './ui_navigation';
import { getCurrentPremiumState } from '../premium/premium_state';
import { getProfession } from '../../professions/profession_registry';
import type { PremiumState } from '../premium/premium_state';
import type { UI_State, UI_NavigationState } from './ui_render_contract';

export function getUIState(premiumState?: PremiumState): UI_State {
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
      careerState: 'unknown',
      worldZone: 'plains',
    };
  }
  // Если вызывающий код не передал явный PremiumState (это большинство мест
  // в приложении — ShareScreen, JourneyHUD и т.д.), строим его сами из
  // реального billing-состояния, а не молча считаем всё бесплатным/открытым.
  const resolvedPremiumState = premiumState ?? (() => {
    const profession = getProfession(runtime.professionId);
    if (!profession) return undefined;
    return getCurrentPremiumState(runtime.professionId, profession.chapters.length);
  })();
  return mapRuntimeToUI(runtime, resolvedPremiumState);
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
