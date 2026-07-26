import type { ShareState } from './share_state_builder';

export type ShareTextTemplate = {
  template: string;
  requires: (keyof ShareState)[];
};

const TEMPLATES: ShareTextTemplate[] = [
  {
    template: 'I am {readinessScore}% ready for {professionTitle} role',
    requires: ['readinessScore', 'professionTitle'],
  },
  {
    template: 'Current weakness: {topGap}',
    requires: ['topGap'],
  },
  {
    template: 'Chapter completed: {completedChapters}',
    requires: ['completedChapters'],
  },
  {
    template: 'SkillTrue Score: {readinessScore}/100',
    requires: ['readinessScore'],
  },
  {
    template: 'Confidence level: {confidenceScore}% — {professionTitle} journey',
    requires: ['confidenceScore', 'professionTitle'],
  },
];

export function generateShareText(state: ShareState): string[] {
  const texts: string[] = [];

  for (const tpl of TEMPLATES) {
    const hasAll = tpl.requires.every(key => {
      const value = state[key];
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined;
    });

    if (!hasAll) continue;

    let text = tpl.template;
    text = text.replace('{readinessScore}', String(state.readinessScore));
    text = text.replace('{confidenceScore}', String(state.confidenceScore));
    text = text.replace('{professionTitle}', state.professionTitle);
    text = text.replace('{topGap}', state.topGap ?? 'none');
    text = text.replace('{completedChapters}', state.completedChapters[0] ?? 'none');
    text = text.replace('{currentChapter}', state.currentChapter);

    texts.push(text);
  }

  return texts;
}
