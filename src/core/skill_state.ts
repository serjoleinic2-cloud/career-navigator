import type { TaskContent } from './task_content';

export type SkillState =
  | 'locked'
  | 'awareness'
  | 'understanding'
  | 'application'
  | 'readiness'
  | 'execution'
  | 'confidence';

export interface SkillNode {
  id: string;
  skill: string;
  domain: string;
  state: SkillState;
  nextState: SkillState | null;
  signals: string[];
  advice: Partial<Record<SkillState, string>>;
  tasks: TaskContent[];
  estimatedMinutes: number;
  difficulty: number;
}

// One successful mission submission is enough to master a node: unlocking
// moves it from 'locked' to 'awareness', and the first successful task on
// an unlocked node takes it straight to 'confidence'. The intermediate
// states ('understanding', 'application', 'readiness', 'execution') are
// kept in the SkillState union for advice-content lookups (each still has
// its own copy under node.advice) but are no longer part of the required
// progression — a single pass replaces the old 5-successful-attempts model.
export const STATE_FLOW: Record<SkillState, SkillState | null> = {
  locked: 'awareness',
  awareness: 'confidence',
  understanding: 'confidence',
  application: 'confidence',
  readiness: 'confidence',
  execution: 'confidence',
  confidence: null,
};
