import type { UnifiedRuntimeState } from '../runtime/unified_runtime_state';
import type { UI_State } from '../ui_bridge/ui_render_contract';
import type { ShareModel } from './share_model';

export function mapToShareModel(
  runtime: UnifiedRuntimeState,
  ui: UI_State
): ShareModel {
  const completedNodes = runtime.completedNodes?.length || 0;
  const totalNodes = Object.keys(runtime.skillState).length || 38;

  const chapterColors: Record<string, string> = {
    'Resume': '#4A90D9',
    'LinkedIn': '#7B68EE',
    'Applications': '#F6AD55',
    'Interview': '#4A5568',
    'Offer': '#48BB78',
  };

  const quotes = [
    'Every expert was once a beginner.',
    'Consistency beats intensity.',
    'Small steps, big results.',
    'Your career is a marathon, not a sprint.',
    'Progress, not perfection.',
  ];

  return {
    profession: runtime.activeProfessionId || 'Software Engineer',
    completedSkills: completedNodes,
    totalSkills: totalNodes,
    readinessScore: Math.round(runtime.readinessScore),
    confidenceScore: Math.round(runtime.confidenceScore * 100),
    currentChapter: ui.currentChapterTitle || 'Resume',
    quote: quotes[completedNodes % quotes.length],
    themeColor: chapterColors[ui.currentChapterTitle] || '#4A90D9',
  };
}
