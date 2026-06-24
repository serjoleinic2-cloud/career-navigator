export type SkillState =
  | 'awareness'
  | 'understanding'
  | 'application'
  | 'readiness'
  | 'execution'
  | 'confidence';

export interface SkillNode {
  id: string;
  skill: string;
  state: SkillState;
  nextState: SkillState | null;
  signals: string[];
  advice: Record<SkillState, string>;
}

export const STATE_FLOW: Record<SkillState, SkillState | null> = {
  awareness: 'understanding',
  understanding: 'application',
  application: 'readiness',
  readiness: 'execution',
  execution: 'confidence',
  confidence: null,
};
