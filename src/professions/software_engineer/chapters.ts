import type { Chapter } from '@/core/chapter_model';

export const SOFTWARE_ENGINEER_CHAPTERS: Chapter[] = [
  {
    id: 'resume',
    title: 'Resume',
    description: 'Build a resume that passes screening and tells your story.',
    nodeIds: ['positioning-clarity', 'achievement-framing'],
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    description: 'Create a profile that attracts recruiters and builds authority.',
    nodeIds: ['headline-authority'],
  },
  {
    id: 'applications',
    title: 'Applications',
    description: 'Apply strategically to companies that match your goals.',
    nodeIds: [],
  },
  {
    id: 'interviews',
    title: 'Interviews',
    description: 'Prepare for technical and behavioral interviews with confidence.',
    nodeIds: [],
  },
  {
    id: 'offer',
    title: 'Offer',
    description: 'Negotiate and evaluate offers to maximize your career trajectory.',
    nodeIds: [],
  },
];
