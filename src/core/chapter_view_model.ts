import type { Chapter } from './chapter_model';
import type { SkillNode } from './skill_state';
import {
  getChapterProgress,
  isChapterCompleted,
  isChapterActive,
} from './chapter_engine';

export type ChapterViewModel = {
  chapterId: string;
  title: string;
  progressPercent: number;
  completed: boolean;
  active: boolean;
};

export function buildChapterViewModel(
  chapter: Chapter,
  nodes: Record<string, SkillNode>
): ChapterViewModel {
  const progress = getChapterProgress(chapter, nodes);

  return {
    chapterId: chapter.id,
    title: chapter.title,
    progressPercent: progress.percent,
    completed: isChapterCompleted(chapter, nodes),
    active: isChapterActive(chapter, nodes),
  };
}

export function buildAllChapterViewModels(
  chapters: Chapter[],
  nodes: Record<string, SkillNode>
): ChapterViewModel[] {
  return chapters.map(chapter => buildChapterViewModel(chapter, nodes));
}

export function getActiveChapterViewModel(
  viewModels: ChapterViewModel[]
): ChapterViewModel | undefined {
  return viewModels.find(vm => vm.active);
}

export function getCompletedChapters(
  viewModels: ChapterViewModel[]
): ChapterViewModel[] {
  return viewModels.filter(vm => vm.completed);
}
