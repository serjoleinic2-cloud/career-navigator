import type { JourneyRuntimeState } from '../runtime/journey_runtime';
import { getProfession } from '../profession_registry';
import { getChapterById } from '../chapter_engine';
import { toUINode } from './ui_node_adapter';
import type { UI_State, UI_ChapterProgress } from './ui_render_contract';

export function mapRuntimeToUI(runtimeState: JourneyRuntimeState): UI_State {
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
    };
  }

  const total = profession.skillNodes.length;
  const nodes = profession.skillNodes.map((n, i) => toUINode(n, i, total));

  const completedNodes = nodes.filter(n => n.state === 'completed').map(n => n.id);
  const lockedNodes = nodes.filter(n => n.state === 'locked').map(n => n.id);

  const chapterProgress: UI_ChapterProgress[] = profession.chapters.map(chapter => {
    const progress = runtimeState.chapterProgress[chapter.id] ?? 0;
    return {
      chapterId: chapter.id,
      title: chapter.title,
      percent: progress,
      completed: progress === 100,
      active: chapter.id === runtimeState.activeChapterId,
    };
  });

  const currentChapter = getChapterById(profession.chapters, runtimeState.activeChapterId);

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
  };
}
