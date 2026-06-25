import type { ProfessionModule } from '@/core/profession_contract';
import { ALL_SKILL_NODES } from './skill_nodes';
import { SOFTWARE_ENGINEER_CHAPTERS } from './chapters';

export const SOFTWARE_ENGINEER_PROFESSION: ProfessionModule = {
  id: 'software_engineer',
  title: 'Software Engineer',
  chapters: SOFTWARE_ENGINEER_CHAPTERS,
  skillGraph: ALL_SKILL_NODES,
  entryNodeId: 'positioning-clarity',
  premiumConfig: {
    freeChapters: 3,
    isLockedAfterFree: true,
  },
};
