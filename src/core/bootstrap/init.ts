import { SoftwareEngineerModule } from '@/professions/software_engineer/module';
import { registerProfession, getDefaultProfession } from '@/professions/profession_registry';
import { setActiveProfession } from '@/professions/profession_service';
import type { UnifiedRuntimeState } from '../runtime/unified_runtime_state';
import { createEmptyUnifiedState } from '../runtime/unified_runtime_state';
import type { SkillState } from '../skill_state';
import { CareerState } from '../state_engine/career_state';
import { createDefaultReadinessVector } from '../readiness_engine';

export function initSkillTrue(): UnifiedRuntimeState {
  registerProfession(SoftwareEngineerModule);
  setActiveProfession('software_engineer');

  const profession = getDefaultProfession();
  if (!profession) {
    throw new Error('No profession registered');
  }

  const skillState: Record<string, SkillState> = {};
  for (const node of profession.skillGraph) {
    skillState[node.id] = node.state as SkillState;
  }

  const chapterState: Record<string, { id: string; progress: number; completed: boolean; active: boolean }> = {};
  for (let i = 0; i < profession.chapters.length; i++) {
    const chapter = profession.chapters[i];
    chapterState[chapter.id] = {
      id: chapter.id,
      progress: i === 0 ? 0 : 0,
      completed: false,
      active: i === 0,
    };
  }

  return {
    ...createEmptyUnifiedState(),
    activeProfessionId: profession.id,
    professionId: profession.id,
    skillState,
    chapterState,
    currentNodeId: profession.entryNodeId,
    lockedNodes: profession.skillGraph.slice(profession.premiumConfig.freeChapters * 2).map(n => n.id),
    careerState: CareerState.EXPLORING,
    readinessVector: createDefaultReadinessVector(),
    careerScore: 0,
    selfScore: 0,
    taskCycles: {},
  };
}
