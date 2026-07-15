import type { Chapter } from '@/core/chapter_model';

export const AI_ML_ENGINEER_CHAPTERS: Chapter[] = [
  {
    id: 'resume',
    title: 'Resume',
    description: 'Build an AI/ML resume that highlights models, frameworks, and business impact of your algorithms.',
    nodeIds: ['positioning-clarity', 'ml-skills-matrix', 'resume-structure', 'projects-portfolio', 'model-deployment-stories', 'resume-ats'],
    artFilename: 'island-resume.png',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    description: 'Create a profile that attracts AI recruiters and showcases your Kaggle competitions and research.',
    nodeIds: ['headline-authority', 'about-section', 'network-connections', 'kaggle-showcase', 'research-publications', 'certifications-display'],
    artFilename: 'island-linkedin.png',
  },
  {
    id: 'applications',
    title: 'Applications',
    description: 'Apply strategically with a portfolio that proves your end-to-end ML pipeline skills.',
    nodeIds: ['application-tracking', 'portfolio-github', 'ml-competition-scores', 'company-research', 'application-tailoring', 'referral-strategy', 'open-source-contributions'],
    artFilename: 'island-applications.png',
  },
  {
    id: 'interviews',
    title: 'Interviews',
    description: 'Master ML theory, coding, system design, and MLOps under pressure.',
    nodeIds: ['interview-prep', 'ml-theory-deep-dive', 'coding-ml-pipelines', 'system-design-ml', 'mlops-cicd', 'model-evaluation', 'behavioral-ml-scenarios', 'on-site-prep', 'research-presentation', 'interview-followup'],
    artFilename: 'island-interview.png',
  },
  {
    id: 'offer_preparation',
    title: 'Offer Preparation',
    description: 'Prepare for ML role negotiations, equity in startups, and research lab offers.',
    nodeIds: ['salary-research-ml', 'equity-negotiation', 'resignation-letter'],
    artFilename: 'island-offer-preparation.png',
  },
  {
    id: 'offer',
    title: 'Offer',
    description: 'Evaluate ML offers, negotiate GPU budgets, and plan your research trajectory.',
    nodeIds: ['offer-evaluation', 'salary-negotiation', 'decision-framework', 'offer-acceptance', 'research-budget', 'start-transition'],
    artFilename: 'island-offer.png',
  },
];