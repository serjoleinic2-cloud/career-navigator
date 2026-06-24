import type { SkillNode } from './skill_state';

export const RESUME_SKILL_NODES: SkillNode[] = [
  {
    id: 'positioning-clarity',
    skill: 'Positioning Clarity',
    state: 'awareness',
    nextState: 'understanding',
    signals: ['You can name your target role', 'You know 3 companies you want to work for'],
    advice: {
      awareness: 'Write down your target job title and 3 dream companies.',
      understanding: 'Explain why this role fits your background in 2 sentences.',
      application: 'Draft a positioning statement for your resume header.',
      readiness: 'Test your positioning statement with a peer.',
      execution: 'Use your positioning statement in 3 real applications.',
      confidence: 'Your positioning is clear and tested.',
    },
  },
  {
    id: 'achievement-framing',
    skill: 'Achievement Framing',
    state: 'awareness',
    nextState: 'understanding',
    signals: ['You list responsibilities', 'You cannot quantify results'],
    advice: {
      awareness: 'Identify 3 achievements from your past work.',
      understanding: 'Rewrite one responsibility as a result with numbers.',
      application: 'Rewrite your entire experience section with achievements.',
      readiness: 'Get feedback on your achievement statements.',
      execution: 'Use achievement bullets in your LinkedIn profile.',
      confidence: 'Every bullet point shows impact, not activity.',
    },
  },
];

export const LINKEDIN_SKILL_NODES: SkillNode[] = [
  {
    id: 'headline-authority',
    skill: 'Headline Authority',
    state: 'awareness',
    nextState: 'understanding',
    signals: ['Your headline is your job title only', 'Recruiters do not reach out'],
    advice: {
      awareness: 'Read 10 headlines of people in your target role.',
      understanding: 'Identify what makes those headlines compelling.',
      application: 'Draft 3 headline options for yourself.',
      readiness: 'A/B test your headline with peers.',
      execution: 'Update your headline and track recruiter views.',
      confidence: 'Your headline attracts the right opportunities.',
    },
  },
];
