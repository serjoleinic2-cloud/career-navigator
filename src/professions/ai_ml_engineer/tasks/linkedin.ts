import type { TaskContent } from '@/core/task_content';

export const LINKEDIN_TASKS: Record<string, TaskContent[]> = {
  'headline-authority': [
    {
      id: 'aiml-ha-write-headlines',
      title: 'Write AI/ML Headlines',
      objective: 'Create 5 headline variants that attract AI recruiters.',
      instructions: [
        'Write 5 headlines combining: role + domain + framework + value.',
        'Example: "ML Engineer | NLP & LLMs | PyTorch | Building production-ready language models"',
        'Keep each under 120 characters.',
        'Test searchability: search each headline on LinkedIn, do similar profiles appear?',
      ],
      completionCriteria: [
        '5 headlines written',
        'Each under 120 characters',
        'Each contains role + domain + framework',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Avoid: "Passionate about AI", "Open to opportunities", "Seeking new challenges".',
        'Include: "LLM", "PyTorch", "MLOps", "Computer Vision", "NLP".',
      ],
      expectedOutcome: 'A headline that appears in recruiter searches for your target role.',
    },
    {
      id: 'aiml-ha-select-best',
      title: 'Select Best Headline',
      objective: 'Choose the highest-impact headline through testing.',
      instructions: [
        'Show all 5 headlines to 3 AI professionals or recruiters.',
        'Ask: which would make you click the profile?',
        'Note feedback on clarity, specificity, and credibility.',
        'Pick the winner and update LinkedIn.',
      ],
      completionCriteria: [
        'Feedback from 3 people collected',
        'Winner selected with rationale',
        'LinkedIn updated',
      ],
      estimatedMinutes: 15,
      difficulty: 1,
      tips: [
        'Recruiters prefer specificity over creativity in AI roles.',
        'A/B test by changing weekly and tracking profile views.',
      ],
      expectedOutcome: 'An optimized LinkedIn headline with validated appeal.',
    },
  ],
  'about-section': [
    {
      id: 'aiml-as-draft',
      title: 'Draft AI/ML About Section',
      objective: 'Write a compelling narrative that showcases ML depth.',
      instructions: [
        'Paragraph 1: Background and what drew you to AI/ML.',
        'Paragraph 2: Key project or model with metric and business impact.',
        'Paragraph 3: Research interests and what you are looking for.',
        'Keep to 200-250 words. Use first person.',
      ],
      completionCriteria: [
        '3 paragraphs drafted',
        '200-250 words total',
        'One specific model metric included',
      ],
      estimatedMinutes: 25,
      difficulty: 2,
      tips: [
        'Start with a hook: "I build models that..." not "I am a motivated..."',
        'Include: framework names, model architectures, dataset sizes, evaluation metrics.',
      ],
      expectedOutcome: 'An About section that converts profile views to connection requests.',
    },
    {
      id: 'aiml-as-optimize',
      title: 'Optimize About for Search',
      objective: 'Ensure AI recruiters find your profile through keywords.',
      instructions: [
        'Identify 10 keywords from AI/ML job postings: PyTorch, LLM,