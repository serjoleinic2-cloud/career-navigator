import type { SkillState } from '../skill_state';

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
  };
}
