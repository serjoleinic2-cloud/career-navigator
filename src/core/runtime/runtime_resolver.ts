import type { JourneyRuntimeState } from './journey_runtime';
import type { SkillNode } from '../skill_state';
import type { Chapter } from '../chapter_model';
import type { ProfessionModule } from '../profession_contract';
import { getProfession } from '@/professions/profession_registry';
import { getActiveNodes, getActiveChapters } from '../profession_loader';
import { getCurrentChapter, getNextChapter } from '../chapter_engine';

export type ResolvedContext = {
  profession: ProfessionModule;
  currentNode: SkillNode | null;
  currentChapter: Chapter | null;
  nextChapter: Chapter | null;
  allNodes: SkillNode[];
  allChapters: Chapter[];
};

export function resolveCurrentContext(runtimeState: JourneyRuntimeState): ResolvedContext {
  const profession = getProfession(runtimeState.professionId);
  if (!profession) {
    throw new Error(`Profession ${runtimeState.professionId} not found`);
  }

  const allNodes = getActiveNodes();
  const allChapters = getActiveChapters();

  const currentNode = allNodes.find(n => n.id === runtimeState.activeNodeId) ?? null;

  const nodeMap: Record<string, SkillNode> = {};
  for (const n of allNodes) {
    nodeMap[n.id] = n;
  }

  const currentChapter = getCurrentChapter(allChapters, nodeMap) ?? null;

  let nextChapter: Chapter | null = null;
  if (currentChapter) {
    nextChapter = getNextChapter(allChapters, currentChapter.id) ?? null;
  }

  return {
    profession,
    currentNode,
    currentChapter,
    nextChapter,
    allNodes,
    allChapters,
  };
}
