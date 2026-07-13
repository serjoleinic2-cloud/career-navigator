import type { Chapter } from '@/core/chapter_model';

export const CYBERSECURITY_CHAPTERS: Chapter[] = [
  {
    id: 'resume',
    title: 'Resume',
    description: 'Build a security-focused resume that highlights certs, tools, and incident response.',
    nodeIds: ['positioning-clarity', 'cyber-skills-matrix', 'resume-structure', 'home-lab-showcase', 'incident-response-stories', 'resume-ats'],
    artFilename: 'island-resume.png',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    description: 'Create a profile that attracts security recruiters and showcases your CTF wins.',
    nodeIds: ['headline-authority', 'about-section', 'network-connections', 'ctf-writeups', 'security-blog', 'certifications-display'],
    artFilename: 'island-linkedin.png',
  },
  {
    id: 'applications',
    title: 'Applications',
    description: 'Apply strategically with a portfolio that proves your defensive and offensive skills.',
    nodeIds: ['application-tracking', 'portfolio-home-lab', 'ctf-scores', 'clearance-prep', 'company-research', 'application-tailoring', 'referral-strategy'],
    artFilename: 'island-applications.png',
  },
  {
    id: 'interviews',
    title: 'Interviews',
    description: 'Master networking, Linux, Python, SIEM, and incident response under pressure.',
    nodeIds: ['interview-prep', 'networking-deep-dive', 'linux-administration', 'python-security', 'siem-analysis', 'incident-response-scenario', 'threat-hunting-basics', 'on-site-prep', 'red-team-blue-team', 'interview-followup'],
    artFilename: 'island-interview.png',
  },
  {
    id: 'offer_preparation',
    title: 'Offer Preparation',
    description: 'Prepare certifications, security clearance, and negotiate your entry into cybersecurity.',
    nodeIds: ['certification-prep', 'clearance-process', 'resignation-letter'],
    artFilename: 'island-offer-preparation.png',
  },
  {
    id: 'offer',
    title: 'Offer',
    description: 'Evaluate offers, negotiate compensation, and set up your security toolkit.',
    nodeIds: ['offer-evaluation', 'salary-negotiation', 'decision-framework', 'offer-acceptance', 'toolkit-setup', 'start-transition'],
    artFilename: 'island-offer.png',
  },
];