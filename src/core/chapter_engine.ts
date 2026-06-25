import type { Chapter } from './chapter_model';
import type { SkillNode, SkillState } from './skill_state';

const COMPLETED_STATES: SkillState[] = ['execution', 'confidence'];

const IN_PROGRESS_STATES: SkillState[] = [
  'awareness',
  'understanding',
  'application',
  'readiness',
];

export function getChapterProgress(
  chapter: Chapter,
  nodes: Record<string, SkillNode>
): {
  completed: number;
  total: number;
  percent: number;
} {
  const chapterNodes = chapter.nodeIds
    .map(id => nodes[id])
    .filter(Boolean);

  const total = chapterNodes.length;
  if (total === 0) return { completed: 0, total: 0, percent: 0 };

  const completed = chapterNodes.filter(n =>
    COMPLETED_STATES.includes(n.state)
  ).length;

  const percent = Math.round((completed / total) * 100);

  return { completed, total, percent };
}

export function isChapterCompleted(
  chapter: Chapter,
  nodes: Record<string, SkillNode>
): boolean {
  const chapterNodes = chapter.nodeIds
    .map(id => nodes[id])
    .filter(Boolean);

  if (chapterNodes.length === 0) return false;

  return chapterNodes.every(n => COMPLETED_STATES.includes(n.state));
}

export function isChapterActive(
  chapter: Chapter,
  nodes: Record<string, SkillNode>
): boolean {
  const chapterNodes = chapter.nodeIds
    .map(id => nodes[id])
    .filter(Boolean);

  return chapterNodes.some(n => IN_PROGRESS_STATES.includes(n.state));
}

export function getCurrentChapter(
  chapters: Chapter[],
  nodes: Record<string, SkillNode>
): Chapter | undefined {
  for (const chapter of chapters) {
    if (isChapterActive(chapter, nodes)) return chapter;
    if (!isChapterCompleted(chapter, nodes)) return chapter;
  }
  return chapters[chapters.length - 1];
}

export function getChapterById(
  chapters: Chapter[],
  id: string
): Chapter | undefined {
  return chapters.find(c => c.id === id);
}

export function getNextChapter(
  chapters: Chapter[],
  currentId: string
): Chapter | undefined {
  const currentIndex = chapters.findIndex(c => c.id === currentId);
  return chapters[currentIndex + 1];
}
