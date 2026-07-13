import type { ProfessionModule } from '../profession_registry';
import { CYBERSECURITY_CHAPTERS } from './chapters';
import { ALL_SKILL_NODES } from './skill_nodes';
import './world/theme';
import './world/art';
import './world/layout';

export const CybersecurityModule: ProfessionModule = {
  id: 'cybersecurity',
  title: 'Cybersecurity',
  icon: '🛡️',
  chapters: CYBERSECURITY_CHAPTERS,
  skillGraph: ALL_SKILL_NODES,
  entryNodeId: 'positioning-clarity',
  premiumConfig: {
    freeChapters: 3,
    isLockedAfterFree: true,
  },
};

export default CybersecurityModule;