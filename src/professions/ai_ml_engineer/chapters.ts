import type { Chapter } from '@/core/chapter_model';

export const AI_ML_ENGINEER_CHAPTERS: Chapter[] = [
  {
    id: 'resume',
    title: 'Resume',
    description: 'Build an ML-focused resume that highlights models shipped, experiments run, and measurable impact.',
    nodeIds: ['positioning-clarity', 'ml-skills-matrix', 'resume-structure', 'ml-portfolio-showcase', 'model-impact-stories', 'resume-ats'],
    artFilename: 'island-resume.png',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    description: 'Create a profile that attracts ML recruiters and showcases your Kaggle and research work.',
    nodeIds: ['headline-authority', 'about-section', 'network-connections', 'kaggle-writeups', 'ml-blog', 'certifications-display'],
    artFilename: 'island-linkedin.png',
  },
  {
    id: 'applications',
    title: 'Applications',
    description: 'Apply strategically with a portfolio that proves your modeling, engineering, and research skills.',
    nodeIds: ['application-tracking', 'portfolio-github', 'kaggle-rankings', 'math-stats-prep', 'company-research', 'application-tailoring', 'referral-strategy'],
    artFilename: 'island-applications.png',
  },
  {
    id: 'interviews',
    title: 'Interviews',
    description: 'Master ML system design, coding, statistics, and model evaluation under pressure.',
    nodeIds: ['interview-prep', 'ml-system-design', 'python-ml-engineering', 'coding-dsa-for-ml', 'model-evaluation-metrics', 'ml-case-study-scenario', 'llm-genai-fundamentals', 'on-site-prep', 'research-vs-production', 'interview-followup'],
    artFilename: 'island-interview.png',
  },
  {
    id: 'offer_preparation',
    title: 'Offer Preparation',
    description: 'Prepare certifications, take-home projects, and negotiate your entry into AI/ML engineering.',
    nodeIds: ['certification-prep', 'take-home-project-process', 'resignation-letter'],
    artFilename: 'island-offer-preparation.png',
  },
  {
    id: 'offer',
    title: 'Offer',
    description: 'Evaluate offers, negotiate compensation, and set up your ML toolkit.',
    nodeIds: ['offer-evaluation', 'salary-negotiation', 'decision-framework', 'offer-acceptance', 'toolkit-setup', 'start-transition'],
    artFilename: 'island-offer.png',
  },
];
