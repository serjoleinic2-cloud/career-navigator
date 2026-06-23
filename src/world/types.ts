export type LevelStatus = 'locked' | 'current' | 'completed';

export type EnvironmentSide = 'left' | 'right';

export type VisualTheme =
  | 'learning'
  | 'practice'
  | 'professional'
  | 'industry'
  | 'milestone';

export interface CareerLevel {
  index: number;
  title: string;
  description: string;
  status: LevelStatus;
  theme: VisualTheme;
  leftEnvironment: string;
  rightEnvironment: string;
  skillsRequired: string[];
  outcome: string;
  estimatedHours: number;
  resources: string[];
}

export interface WorldState {
  currentLevel: number;
  totalLevels: number;
  levels: CareerLevel[];
}

export interface PathSegment {
  from: number;
  to: number;
  status: LevelStatus;
}
