import type { CareerJourney, JourneyNode, Chapter } from './career_journey_model';

interface Profile {
  profession: string;
  experience: 'junior' | 'mid' | 'senior';
}

function generateResumeNodes(_profile: Profile): JourneyNode[] {
  return [
    { id: 'r1', chapter: 'Resume', title: 'Build your resume', status: 'active', tasks: ['Create first version', 'Add projects section', 'Get feedback', 'Finalize'], dayIndex: 1 },
    { id: 'r2', chapter: 'Resume', title: 'Optimize for ATS', status: 'locked', tasks: ['Check keywords', 'Format properly'], dayIndex: 2 },
  ];
}

function generateLinkedInNodes(_profile: Profile): JourneyNode[] {
  return [
    { id: 'l1', chapter: 'LinkedIn', title: 'Update LinkedIn profile', status: 'locked', tasks: ['Write headline', 'Add experience', 'Connect with professionals'], dayIndex: 3 },
  ];
}

function generateApplicationNodes(_profile: Profile): JourneyNode[] {
  return [
    { id: 'a1', chapter: 'Applications', title: 'Apply to 10 companies', status: 'locked', tasks: ['Research companies', 'Tailor resume', 'Submit applications', 'Track responses'], dayIndex: 4 },
  ];
}

function generateInterviewNodes(_profile: Profile): JourneyNode[] {
  return [
    { id: 'i1', chapter: 'Interview', title: 'Technical interview prep', status: 'locked', tasks: ['Practice coding', 'System design', 'Behavioral questions'], dayIndex: 5 },
  ];
}

function generateOfferNodes(_profile: Profile): JourneyNode[] {
  return [
    { id: 'o1', chapter: 'Offer', title: 'Negotiate offer', status: 'locked', tasks: ['Research salary', 'Prepare negotiation points', 'Accept offer'], dayIndex: 6 },
  ];
}

export function buildJourney(profile: Profile): CareerJourney {
  const chapters = [
    { chapter: 'Resume' as Chapter, nodes: generateResumeNodes(profile) },
    { chapter: 'LinkedIn' as Chapter, nodes: generateLinkedInNodes(profile) },
    { chapter: 'Applications' as Chapter, nodes: generateApplicationNodes(profile) },
    { chapter: 'Interview' as Chapter, nodes: generateInterviewNodes(profile) },
    { chapter: 'Offer' as Chapter, nodes: generateOfferNodes(profile) },
  ];

  const allNodes = chapters.flatMap(c => c.nodes);
  const currentDay = allNodes.find(n => n.status === 'active')?.dayIndex ?? 1;

  return {
    chapters,
    currentDay,
    totalDays: allNodes.length,
  };
}
