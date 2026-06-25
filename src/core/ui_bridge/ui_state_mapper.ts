import type { JourneyRuntimeState } from '../runtime/journey_runtime';
import { getProfession } from '@/professions/profession_registry';
import { getChapterById } from '../chapter_engine';
import { toUINode } from './ui_node_adapter';
import { checkAccess } from '../premium/premium_gate';
import type { PremiumState } from '../premium/premium_state';
import type { UI_State, UI_ChapterProgress } from './ui_render_contract';
import { mapCareerStateToZone } from '../../world/world_zone_mapper';

export function mapRuntimeToUI(
  runtimeState: JourneyRuntimeState,
  premiumState?: PremiumState
): UI_State {
  const profession = getProfession(runtimeState.professionId);

  if (!profession) {
    return {
      nodes: [],
      activeNodeId: '',
      completedNodes: [],
      lockedNodes: [],
      chapterProgress: [],
      readinessBadge: '0%',
      confidenceBadge: '0%',
      currentChapterTitle: '',
      isJourneyComplete: false,
      careerState: 'unknown',
      worldZone: 'plains',
    };
  }

  const total = profession.skillGraph.length;
  const nodes = profession.skillGraph.map((n, i) => toUINode(n, i, total));

  const completedNodes = nodes.filter(n => n.state === 'completed').map(n => n.id);
  const lockedNodes = nodes.filter(n => n.state === 'locked').map(n => n.id);

  const chapterProgress: UI_ChapterProgress[] = profession.chapters.map(chapter => {
    const progress = runtimeState.chapterProgress[chapter.id] ?? 0;
    const accessResult = premiumState
      ? checkAccess(premiumState, profession.chapters, chapter.id)
      : { allowed: true, reason: 'allowed' as const, unlockHint: '' };
    return {
      chapterId: chapter.id,
      title: chapter.title,
      percent: progress,
      completed: progress === 100,
      active: chapter.id === runtimeState.activeChapterId,
      locked: !accessResult.allowed,
      lockReason: accessResult.reason,
      unlockHint: accessResult.unlockHint,
    };
  });

  const currentChapter = getChapterById(profession.chapters, runtimeState.activeChapterId);

  const zone = mapCareerStateToZone('exploring' as any);

  return {
    nodes,
    activeNodeId: runtimeState.activeNodeId,
    completedNodes,
    lockedNodes,
    chapterProgress,
    readinessBadge: `${runtimeState.readinessScore}%`,
    confidenceBadge: `${runtimeState.confidenceScore}%`,
    currentChapterTitle: currentChapter?.title ?? '',
    isJourneyComplete: runtimeState.confidenceScore === 100,
    careerState: 'exploring',
    worldZone: zone.zone,
  };
}
