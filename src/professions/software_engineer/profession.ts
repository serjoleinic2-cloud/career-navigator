import type { ProfessionModule } from '@/core/profession_contract';
import { ALL_SKILL_NODES } from './skill_nodes';
import { SOFTWARE_ENGINEER_CHAPTERS } from './chapters';

export const SOFTWARE_ENGINEER_PROFESSION: ProfessionModule = {
  id: 'software_engineer',
  title: 'Software Engineer',
  description: 'Build a career in software development from resume to offer.',
  icon: 'Code',
  skillNodes: ALL_SKILL_NODES,
  chapters: SOFTWARE_ENGINEER_CHAPTERS,
};
