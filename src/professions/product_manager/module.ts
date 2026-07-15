import type { ProfessionModule } from '../profession_registry';
import {
  RESUME_SKILL_NODES,
  LINKEDIN_SKILL_NODES,
  APPLICATION_SKILL_NODES,
  INTERVIEW_SKILL_NODES,
  OFFER_PREPARATION_SKILL_NODES,
  OFFER_SKILL_NODES,
} from './skill_nodes';
import { PRODUCT_MANAGER_CHAPTERS } from './chapters';
import './world/theme';
import './world/art';
import './world/layout';

export const ProductManagerModule: ProfessionModule = {
  id: 'product_manager',
  title: 'Product Manager',
  icon: '🧭',
  chapters: PRODUCT_MANAGER_CHAPTERS,
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

export default ProductManagerModule;
