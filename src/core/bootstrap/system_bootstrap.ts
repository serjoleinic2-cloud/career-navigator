import { loadProfessionSync } from '../../professions/loader/profession_loader';
import { SoftwareEngineerModule } from '../../professions/software_engineer/module';
import { setActiveProfession, getActiveProfession } from '../../professions/profession_service';
import { createEmptyUnifiedState } from '../runtime/unified_runtime_state';
import type { UnifiedRuntimeState } from '../runtime/unified_runtime_state';
import { replaceState } from '../runtime/runtime_store';
import { emit } from '../events/system_event_bus';
import { syncUI } from '../bridge/ui_runtime_bridge';
import { syncWorldWithRuntime } from '../bridge/world_runtime_bridge';
import { setSystemContext } from './system_context';
import type { SystemContext } from './system_context';
import { CareerState } from '../state_engine/career_state';
import { createDefaultReadinessVector } from '../readiness_engine';

export type UserProfile = {
  userId: string;
  professionId?: string;
};

export function initializeSystem(
  userProfile: UserProfile = { userId: 'anonymous' }
): SystemContext {
  loadProfessionSync(SoftwareEngineerModule);
  setActiveProfession(userProfile.professionId ?? 'software_engineer');

  const profession = getActiveProfession();
  if (!profession) {
    throw new Error('Failed to load profession');
  }

  const skillState: Record<string, string> = {};
  for (const node of profession.skillGraph) {
    skillState[node.id] = node.state;
  }

  const chapterState: Record<string, { id: string; progress: number; completed: boolean; active: boolean }> = {};
  for (let i = 0; i < profession.chapters.length; i++) {
    const chapter = profession.chapters[i];
    chapterState[chapter.id] = {
      id: chapter.id,
      progress: 0,
      completed: false,
      active: i === 0,
    };
  }

  const runtime: UnifiedRuntimeState = {
    ...createEmptyUnifiedState(userProfile.userId),
    activeProfessionId: profession.id,
    professionId: profession.id,
    skillState: skillState as Record<string, any>,
    chapterState: chapterState as Record<string, any>,
    currentNodeId: profession.entryNodeId,
    lockedNodes: profession.skillGraph
      .slice(profession.premiumConfig.freeChapters * 2)
      .map(n => n.id),
    careerState: CareerState.EXPLORING,
    readinessVector: createDefaultReadinessVector(),
    careerScore: 0,
    selfScore: 0,
    taskCycles: {},
  };

  replaceState(runtime);

  const uiState = syncUI(runtime);
  const worldState = syncWorldWithRuntime(runtime);

  const context: SystemContext = {
    runtime,
    profession,
    uiState,
    worldState,
  };

  setSystemContext(context);

  emit('SYSTEM_BOOTED', { userId: userProfile.userId });
  emit('PROFESSION_LOADED', { professionId: profession.id });
  emit('STATE_CHANGED', { careerState: CareerState.EXPLORING });
  emit('UI_REFRESH', {});

  return context;
}
