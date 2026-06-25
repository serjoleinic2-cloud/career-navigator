export type JourneyNodeType = 'task' | 'checkpoint' | 'lock';

export type JourneyNodeState = 'locked' | 'active' | 'completed';

export type JourneyNode = {
  id: string;
  chapter: string;
  type: JourneyNodeType;
  state: JourneyNodeState;
  difficulty: number;
  emotionalWeight: number;
};

export function createJourneyNode(
  id: string,
  chapter: string,
  type: JourneyNodeType = 'task',
  difficulty: number = 1,
  emotionalWeight: number = 0
): JourneyNode {
  return {
    id,
    chapter,
    type,
    state: 'locked',
    difficulty,
    emotionalWeight,
  };
}
