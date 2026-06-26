import type { Chapter } from '@/core/chapter_model';

export const SOFTWARE_ENGINEER_CHAPTERS: Chapter[] = [
  {
    id: 'resume',
    title: 'Resume',
    description: 'Build a resume that passes screening and tells your story.',
    nodeIds: ['positioning-clarity', 'achievement-framing', 'resume-structure', 'resume-review', 'resume-ats', 'resume-summary', 'resume-skills'],
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    description: 'Create a profile that attracts recruiters and builds authority.',
    nodeIds: ['headline-authority', 'about-section', 'network-connections', 'linkedin-optimization', 'profile-photo', 'featured-content', 'recommendations'],
  },
  {
    id: 'applications',
    title: 'Applications',
    description: 'Apply strategically to companies that match your goals.',
    nodeIds: ['application-tracking', 'cover-letter', 'follow-up-strategy', 'application-volume', 'company-research', 'application-tailoring', 'portfolio-submission', 'referral-strategy'],
  },
  {
    id: 'interviews',
    title: 'Interviews',
    description: 'Prepare for technical and behavioral interviews with confidence.',
    nodeIds: ['interview-prep', 'mock-interview', 'technical-prep', 'interview-mindset', 'behavioral-prep', 'system-design-prep', 'on-site-prep', 'phone-screen', 'interview-followup', 'presentation-prep'],
  },
  {
    id: 'offer',
    title: 'Offer',
    description: 'Negotiate and evaluate offers to maximize your career trajectory.',
    nodeIds: ['offer-evaluation', 'salary-negotiation', 'decision-framework', 'offer-acceptance', 'equity-evaluation', 'start-transition'],
  },
];
