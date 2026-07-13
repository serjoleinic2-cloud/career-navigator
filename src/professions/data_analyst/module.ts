import type { ProfessionModule } from '../profession_registry';
import {
  RESUME_SKILL_NODES,
  LINKEDIN_SKILL_NODES,
  APPLICATION_SKILL_NODES,
  INTERVIEW_SKILL_NODES,
  OFFER_PREPARATION_SKILL_NODES,
  OFFER_SKILL_NODES,
} from './skill_nodes';
import { DATA_ANALYST_CHAPTERS } from './chapters';
import './world/theme'; // side effect: registers this profession's WorldTheme
import './world/art'; // side effect: registers this profession's WorldArtConfig
import './world/layout'; // side effect: registers this profession's WorldLayout

export const DataAnalystModule: ProfessionModule = {
  id: 'data_analyst',
  title: 'Data Analyst',
  icon: '📊',
  chapters: DATA_ANALYST_CHAPTERS,
  skillGraph: [
    ...RESUME_SKILL_NODES,
    ...LINKEDIN_SKILL_NODES,
    ...APPLICATION_SKILL_NODES,
    ...INTERVIEW_SKILL_NODES,
    ...OFFER_PREPARATION_SKILL_NODES,
    ...OFFER_SKILL_NODES,
  ],
  entryNodeId: 'positioning-clarity',
  premiumConfig: {
    freeChapters: 3,
    isLockedAfterFree: true,
  },
};

export default DataAnalystModule;
