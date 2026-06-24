export type WorldMode = 'idle' | 'moving' | 'arrived';

export interface WorldState {
  currentLevelIndex: number;
  completedLevels: number[];
  activePathPosition: number;
  mode: WorldMode;
}

export const initialWorldState: WorldState = {
  currentLevelIndex: 0,
  completedLevels: [],
  activePathPosition: 0,
  mode: 'idle',
};
