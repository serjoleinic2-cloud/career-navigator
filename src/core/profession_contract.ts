import type { SkillNode } from './skill_state';
import type { Chapter } from './chapter_model';
import type { PremiumConfig } from '../professions/profession_registry';

export type ProfessionModule = {
  id: string;
  title: string;
  chapters: Chapter[];
  skillGraph: SkillNode[];
  entryNodeId: string;
  premiumConfig: PremiumConfig;
};

export type { WorldTheme, WorldPalette, WorldGeometry } from './world/world_theme';
