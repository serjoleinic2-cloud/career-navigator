export type NodeState = 'locked' | 'active' | 'completed';

export interface Skill {
  id: string;
  name: string;
  description: string;
}

export interface CareerNode {
  id: string;
  title: string;
  chapter: string;
  state: NodeState;
  skills: Skill[];
  outcome: string;
  dayIndex: number;
}

export interface UserProgress {
  completedSkills: string[];
  currentNodeId: string | null;
}

export function updateNodeState(node: CareerNode, progress: UserProgress): NodeState {
  const allSkillsCompleted = node.skills.every(s => progress.completedSkills.includes(s.id));

  if (allSkillsCompleted) return 'completed';
  if (progress.currentNodeId === node.id) return 'active';
  return 'locked';
}

export function canAdvance(node: CareerNode, progress: UserProgress): boolean {
  return node.skills.every(s => progress.completedSkills.includes(s.id));
}
