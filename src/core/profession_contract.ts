import type { SkillNode } from './skill_state';
import type { Chapter } from './chapter_model';

export type ProfessionModule = {
  id: string;
  title: string;
  description: string;
  icon: string;
  skillNodes: SkillNode[];
  chapters: Chapter[];
};
