import type { Chapter } from '@/core/chapter_model';

export const DATA_ANALYST_CHAPTERS: Chapter[] = [
  {
    id: 'resume',
    title: 'Resume',
    description: 'Build a data-focused resume that highlights SQL, visualization, and business impact.',
    nodeIds: ['positioning-clarity', 'data-storytelling', 'resume-structure', 'resume-ats', 'technical-skills', 'projects-portfolio', 'resume-summary'],
    artFilename: 'island-resume.png',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    description: 'Create a profile that attracts analytics recruiters and data hiring managers.',
    nodeIds: ['headline-authority', 'about-section', 'network-connections', 'linkedin-optimization', 'profile-photo', 'featured-content', 'recommendations'],
    artFilename: 'island-linkedin.png',
  },
  {
    id: 'applications',
    title: 'Applications',
    description: 'Apply strategically to data roles that match your SQL and visualization skills.',
    nodeIds: ['application-tracking', 'cover-letter', 'follow-up-strategy', 'application-volume', 'company-research', 'application-tailoring', 'portfolio-submission', 'referral-strategy'],
    artFilename: 'island-applications.png',
  },
  {
    id: 'interviews',
    title: 'Interviews',
    description: 'Prepare for SQL tests, case studies, and behavioral questions with confidence.',
    nodeIds: ['interview-prep', 'sql-technical-prep', 'case-study-prep', 'interview-mindset', 'behavioral-prep', 'data-visualization-prep', 'on-site-prep', 'phone-screen', 'interview-followup', 'presentation-prep'],
    artFilename: 'island-interview.png',
  },
  {
    id: 'offer_preparation',
    title: 'Offer Preparation',
    description: 'Prepare for salary negotiations and evaluate data analyst offers.',
    nodeIds: ['salary-research', 'offer-review', 'resignation-letter'],
    artFilename: 'island-offer-preparation.png',
  },
  {
    id: 'offer',
    title: 'Offer',
    description: 'Negotiate and evaluate offers to maximize your data career trajectory.',
    nodeIds: ['offer-evaluation', 'salary-negotiation', 'decision-framework', 'offer-acceptance', 'benefits-evaluation', 'start-transition'],
    artFilename: 'island-offer.png',
  },
];
