import type { UnifiedRuntimeState } from '../runtime/unified_runtime_state';
import type { ProfessionModule } from '../../professions/profession_registry';
import type { UI_State } from '../ui_bridge/ui_render_contract';
import type { WorldState } from '../../world/visual_world_contract';

export type SystemContext = {
  runtime: UnifiedRuntimeState;
  profession: ProfessionModule | undefined;
  uiState: UI_State;
  worldState: WorldState;
};

let context: SystemContext | null = null;

export function setSystemContext(ctx: SystemContext): void {
  context = ctx;
}

export function getSystemContext(): SystemContext | null {
  return context;
}

export function isSystemReady(): boolean {
  return context !== null;
}
