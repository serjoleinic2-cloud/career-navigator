import type { ProfessionModule } from '../profession_registry';
import { AI_ML_ENGINEER_CHAPTERS } from './chapters';
import { ALL_SKILL_NODES } from './skill_nodes';
import './world/theme';
import './world/art';
import './world/layout';

export const AIMLEngineerModule: ProfessionModule = {
  id: 'ai_ml_engineer',
  title: 'AI / ML Engineer',
  icon: '🤖',
  chapters: AI_ML_ENGINEER_CHAPTERS,
  skillGraph: ALL_SKILL_NODES,
  entryNodeId: 'positioning-clarity',
  premiumConfig: {
    freeChapters: 3,
    isLockedAfterFree: true,
  },
};

export default AIMLEngineerModule;