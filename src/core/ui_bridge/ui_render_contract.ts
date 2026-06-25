export type UI_NodeState = 'completed' | 'active' | 'locked';

export type UI_Node = {
  id: string;
  title: string;
  state: UI_NodeState;
  visualLevel: number;
  glow: boolean;
  positionHint?: 'top' | 'middle' | 'bottom';
};

export type UI_ChapterProgress = {
  chapterId: string;
  title: string;
  percent: number;
  completed: boolean;
  active: boolean;
  locked: boolean;
  lockReason: string;
  unlockHint: string;
};

export type UI_State = {
  nodes: UI_Node[];
  activeNodeId: string;
  completedNodes: string[];
  lockedNodes: string[];
  chapterProgress: UI_ChapterProgress[];
  readinessBadge: string;
  confidenceBadge: string;
  currentChapterTitle: string;
  isJourneyComplete: boolean;
  careerState: string;
  worldZone: string;
};

export type UI_NavigationState = {
  hasNext: boolean;
  hasPrevious: boolean;
  nextNodeId: string | null;
  previousNodeId: string | null;
};
