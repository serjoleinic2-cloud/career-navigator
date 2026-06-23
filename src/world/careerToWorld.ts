import type { CareerLevel, VisualTheme } from './types';

const themes: VisualTheme[] = ['learning', 'practice', 'professional', 'industry', 'milestone'];
const leftEnvs = ['skill-lab', 'training-ground', 'school-tower', 'practice-field', 'milestone-gate'];
const rightEnvs = ['startup-office', 'dev-studio', 'corporate-building', 'industry-hub', 'offer-castle'];

export function mapCareerToLevels(steps: string[]): CareerLevel[] {
  return steps.map((title, index) => ({
    index,
    title,
    description: `Master ${title.toLowerCase()} to advance your career`,
    status: index === 0 ? 'current' : 'locked',
    theme: themes[index % themes.length],
    leftEnvironment: leftEnvs[index % leftEnvs.length],
    rightEnvironment: rightEnvs[index % rightEnvs.length],
    skillsRequired: [`${title} fundamentals`, 'Problem solving'],
    outcome: `Able to ${title.toLowerCase()} independently`,
    estimatedHours: (index + 1) * 20,
    resources: ['Documentation', 'Practice exercises'],
  }));
}
