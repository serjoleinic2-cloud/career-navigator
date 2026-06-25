import type { SkillState } from '../skill_state';
import { CareerState } from '../state_engine/career_state';
import type { ReadinessVector } from '../readiness_engine';
import { createDefaultReadinessVector } from '../readiness_engine';
import type { TaskCycle } from '../interaction/task_cycle';

export type ChapterState = {
  id: string;
  progress: number;
  completed: boolean;
  active: boolean;
};

export type UnifiedRuntimeState = {
  userId: string;
  activeProfessionId: string;
  professionId: string;
  skillState: Record<string, SkillState>;
  chapterState: Record<string, ChapterState>;
  readinessScore: number;
  confidenceScore: number;
  gapState: Record<string, number>;
  memoryIndex: string[];
  currentNodeId: string;
  lockedNodes: string[];
  completedNodes: string[];
  careerState: CareerState;
  readinessVector: ReadinessVector;
  careerScore: number;
  selfScore: number;
  taskCycles: Record<string, TaskCycle[]>;
};

export function createEmptyUnifiedState(userId: string = 'anonymous'): UnifiedRuntimeState {
  return {
    userId,
    activeProfessionId: '',
    professionId: '',
    skillState: {},
    chapterState: {},
    readinessScore: 0,
    confidenceScore: 0,
    gapState: {},
    memoryIndex: [],
    currentNodeId: '',
    lockedNodes: [],
    completedNodes: [],
    careerState: CareerState.UNKNOWN,
    readinessVector: createDefaultReadinessVector(),
    careerScore: 0,
    selfScore: 0,
    taskCycles: {},
  };
}
