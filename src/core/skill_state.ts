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
}

export const STATE_FLOW: Record<SkillState, SkillState | null> = {
  locked: null,
  awareness: 'understanding',
  understanding: 'application',
  application: 'readiness',
  readiness: 'execution',
  execution: 'confidence',
  confidence: null,
};
