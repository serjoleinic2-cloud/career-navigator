import type { CareerNode } from './node_engine';

export const CAREER_NODES: CareerNode[] = [
  {
    id: 'resume-positioning',
    title: 'Resume Positioning',
    chapter: 'Resume',
    state: 'active',
    skills: [
      { id: 'clarity', name: 'Positioning Clarity', description: 'You understand what role you want and why' },
      { id: 'framing', name: 'Achievement Framing', description: 'You can describe results, not just responsibilities' },
    ],
    outcome: 'Your resume is ready for recruiter screening',
    dayIndex: 1,
  },
  {
    id: 'resume-optimization',
    title: 'Resume Optimization',
    chapter: 'Resume',
    state: 'locked',
    skills: [
      { id: 'ats', name: 'ATS Compatibility', description: 'Your resume passes automated screening' },
      { id: 'keywords', name: 'Keyword Alignment', description: 'Your resume matches job descriptions' },
    ],
    outcome: 'Your resume ranks in top 20% of applicants',
    dayIndex: 2,
  },
  {
    id: 'linkedin-presence',
    title: 'LinkedIn Presence',
    chapter: 'LinkedIn',
    state: 'locked',
    skills: [
      { id: 'headline', name: 'Headline Authority', description: 'Your headline attracts recruiters' },
      { id: 'network', name: 'Network Building', description: 'You grow relevant connections weekly' },
    ],
    outcome: 'Recruiters reach out to you directly',
    dayIndex: 3,
  },
  {
    id: 'application-strategy',
    title: 'Application Strategy',
    chapter: 'Applications',
    state: 'locked',
    skills: [
      { id: 'targeting', name: 'Company Targeting', description: 'You apply to companies that match your goals' },
      { id: 'tracking', name: 'Application Tracking', description: 'You follow up systematically' },
    ],
    outcome: 'You get interviews at desired companies',
    dayIndex: 4,
  },
  {
    id: 'interview-readiness',
    title: 'Interview Readiness',
    chapter: 'Interview',
    state: 'locked',
    skills: [
      { id: 'behavioral', name: 'Behavioral Stories', description: 'You answer "Tell me about yourself" with impact' },
      { id: 'technical', name: 'Technical Fluency', description: 'You explain your work clearly under pressure' },
    ],
    outcome: 'You pass screening interviews consistently',
    dayIndex: 5,
  },
  {
    id: 'offer-negotiation',
    title: 'Offer Negotiation',
    chapter: 'Offer',
    state: 'locked',
    skills: [
      { id: 'valuation', name: 'Self Valuation', description: 'You know your market worth' },
      { id: 'negotiation', name: 'Negotiation Tactics', description: 'You negotiate without damaging relationships' },
    ],
    outcome: 'You accept an offer above your target',
    dayIndex: 6,
  },
];
