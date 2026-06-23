import type { CareerLevel, VisualTheme } from './types';

const themes: VisualTheme[] = ['learning', 'practice', 'professional', 'industry', 'milestone'];
const leftEnvs = ['skill-lab', 'training-ground', 'school-tower', 'practice-field', 'milestone-gate'];
const rightEnvs = ['startup-office', 'dev-studio', 'corporate-building', 'industry-hub', 'offer-castle'];

const defaultSkills: Record<number, string[]> = {
  0: ['HTML', 'CSS', 'Browser DevTools'],
  1: ['JavaScript', 'DOM', 'Async Programming'],
  2: ['React', 'TypeScript', 'State Management'],
  3: ['Project Architecture', 'Testing', 'Git'],
  4: ['Portfolio', 'Resume', 'Interview'],
};

const defaultOutcomes: Record<number, string> = {
  0: 'Core web fundamentals mastered',
  1: 'JavaScript proficiency established',
  2: 'Framework expertise developed',
  3: 'Full project completed and shipped',
  4: 'Job-ready portfolio and skillset',
};

const defaultHours: Record<number, number> = {
  0: 40,
  1: 60,
  2: 80,
  3: 100,
  4: 50,
};

const defaultResources: Record<number, string[]> = {
  0: ['MDN Web Docs', 'freeCodeCamp'],
  1: ['JavaScript.info', 'You Don\'t Know JS'],
  2: ['React Docs', 'TypeScript Handbook'],
  3: ['GitHub Guides', 'Testing Library Docs'],
  4: ['LinkedIn', 'Glassdoor', 'LeetCode'],
};

export function mapCareerToLevels(steps: string[]): CareerLevel[] {
  return steps.map((title, index) => ({
    index,
    title,
    description: '',
    status: index === 0 ? 'current' : 'locked',
    theme: themes[index % themes.length],
    leftEnvironment: leftEnvs[index % leftEnvs.length],
    rightEnvironment: rightEnvs[index % rightEnvs.length],
    skillsRequired: defaultSkills[index] || [],
    outcome: defaultOutcomes[index] || '',
    estimatedHours: defaultHours[index] || 40,
    resources: defaultResources[index] || [],
  }));
}
