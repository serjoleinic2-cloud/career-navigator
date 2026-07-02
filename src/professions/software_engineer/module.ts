import type { ProfessionModule } from '../profession_registry';
import {
  RESUME_SKILL_NODES,
  LINKEDIN_SKILL_NODES,
  APPLICATION_SKILL_NODES,
  INTERVIEW_SKILL_NODES,
  OFFER_SKILL_NODES,
} from './skill_nodes';
import { SOFTWARE_ENGINEER_CHAPTERS } from './chapters';
import './world'; // side effect: registers this profession's WorldTheme
import './world_art'; // side effect: registers this profession's WorldArtConfig
import './world_layout'; // side effect: registers this profession's WorldLayout

export const SoftwareEngineerModule: ProfessionModule = {
  id: 'software_engineer',
  title: 'Software Engineer',
  chapters: SOFTWARE_ENGINEER_CHAPTERS,
  skillGraph: [
    ...RESUME_SKILL_NODES,
    ...LINKEDIN_SKILL_NODES,
    ...APPLICATION_SKILL_NODES,
    ...INTERVIEW_SKILL_NODES,
    ...OFFER_SKILL_NODES,
  ],
  entryNodeId: 'positioning-clarity',
  premiumConfig: {
    freeChapters: 3,
    isLockedAfterFree: true,
  },
};

export default SoftwareEngineerModule;
