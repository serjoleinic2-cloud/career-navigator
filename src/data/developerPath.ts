import type { CareerJourney, Chapter, JourneyNode } from '@/types';

const nodes: JourneyNode[] = [
  {
    id: 'node-1',
    chapter_id: 'ch-1',
    title: 'Learn Git',
    description: 'Master version control. Commit, branch, merge, and collaborate with confidence.',
    type: 'learning',
    status: 'available',
    estimated_time: 180,
    position: { x: 50, y: 0 },
    environment: 'code-tower',
    tasks: [
      'Install Git and configure identity',
      'Create first repository',
      'Practice commit, push, pull workflow',
      'Learn branching and merging',
      'Set up GitHub account',
    ],
    icon: 'GitBranch',
    created_at: new Date().toISOString(),
  },
  {
    id: 'node-2',
    chapter_id: 'ch-1',
    title: 'GitHub Profile',
    description: 'Build a professional presence. README, pinned repos, contribution graph.',
    type: 'action',
    status: 'locked',
    estimated_time: 120,
    position: { x: 30, y: 1 },
    environment: 'server-building',
    tasks: [
      'Create professional README',
      'Pin 3-4 best repositories',
      'Set up contribution streak',
      'Enable GitHub Pages for portfolio',
      'Follow relevant developers',
    ],
    icon: 'Github',
    created_at: new Date().toISOString(),
  },
  {
    id: 'node-3',
    chapter_id: 'ch-2',
    title: 'First Project',
    description: 'Build something real. A calculator, weather app, or to-do list with clean code.',
    type: 'practice',
    status: 'locked',
    estimated_time: 420,
    position: { x: 70, y: 2 },
    environment: 'project-lab',
    tasks: [
      'Choose a project idea',
      'Set up project structure',
      'Write clean, documented code',
      'Add README with setup instructions',
      'Deploy to GitHub Pages or Vercel',
    ],
    icon: 'Code',
    created_at: new Date().toISOString(),
  },
  {
    id: 'node-4',
    chapter_id: 'ch-2',
    title: 'Portfolio',
    description: 'Showcase your work. A clean, fast, mobile-friendly portfolio site.',
    type: 'action',
    status: 'locked',
    estimated_time: 300,
    position: { x: 40, y: 3 },
    environment: 'portfolio-district',
    tasks: [
      'Design portfolio structure',
      'Build with HTML/CSS or React',
      'Add 3 projects with case studies',
      'Include contact section',
      'Test on mobile devices',
    ],
    icon: 'Layout',
    created_at: new Date().toISOString(),
  },
  {
    id: 'node-5',
    chapter_id: 'ch-2',
    title: 'Resume',
    description: 'One page that sells your skills. ATS-friendly, achievement-focused.',
    type: 'action',
    status: 'locked',
    estimated_time: 120,
    position: { x: 60, y: 4 },
    environment: 'terminal-station',
    tasks: [
      'Choose clean template',
      'Write strong summary',
      'Quantify achievements',
      'Add skills section',
      'Export as PDF',
    ],
    icon: 'FileText',
    created_at: new Date().toISOString(),
  },
  {
    id: 'node-6',
    chapter_id: 'ch-3',
    title: 'LinkedIn',
    description: 'Optimize your profile. Headline, summary, experience, and networking.',
    type: 'action',
    status: 'locked',
    estimated_time: 180,
    position: { x: 25, y: 5 },
    environment: 'server-building',
    tasks: [
      'Write compelling headline',
      'Craft professional summary',
      'Add experience with metrics',
      'Request recommendations',
      'Connect with 50+ professionals',
    ],
    icon: 'Linkedin',
    created_at: new Date().toISOString(),
  },
  {
    id: 'node-7',
    chapter_id: 'ch-4',
    title: 'Mock Interview',
    description: 'Practice behavioral questions. Tell me about yourself, strengths, weaknesses.',
    type: 'practice',
    status: 'locked',
    estimated_time: 240,
    position: { x: 75, y: 6 },
    environment: 'interview-tower',
    tasks: [
      'Prepare STAR stories',
      'Practice elevator pitch',
      'Record yourself answering',
      'Get feedback from peer',
      'Refine weak answers',
    ],
    icon: 'MessageCircle',
    created_at: new Date().toISOString(),
  },
  {
    id: 'node-8',
    chapter_id: 'ch-4',
    title: 'Technical Interview',
    description: 'Data structures, algorithms, system design. Practice with real problems.',
    type: 'practice',
    status: 'locked',
    estimated_time: 840,
    position: { x: 45, y: 7 },
    environment: 'interview-tower',
    tasks: [
      'Review Big O notation',
      'Practice arrays and strings',
      'Solve 10 LeetCode easy',
      'Explain solutions out loud',
      'Time yourself under pressure',
    ],
    icon: 'Terminal',
    created_at: new Date().toISOString(),
  },
  {
    id: 'node-9',
    chapter_id: 'ch-5',
    title: 'Job Applications',
    description: 'Apply with strategy. Tailored resumes, cover letters, and tracking.',
    type: 'action',
    status: 'locked',
    estimated_time: 1260,
    position: { x: 65, y: 8 },
    environment: 'terminal-station',
    tasks: [
      'Build target company list',
      'Tailor resume per role',
      'Write custom cover letters',
      'Track applications in spreadsheet',
      'Follow up after 1 week',
    ],
    icon: 'Send',
    created_at: new Date().toISOString(),
  },
  {
    id: 'node-10',
    chapter_id: 'ch-6',
    title: 'Offer',
    description: 'Negotiate and accept. Know your worth, evaluate the package, decide.',
    type: 'reflection',
    status: 'locked',
    estimated_time: 420,
    position: { x: 50, y: 9 },
    environment: 'offer-castle',
    tasks: [
      'Research market salary',
      'Prepare negotiation points',
      'Evaluate total compensation',
      'Negotiate respectfully',
      'Celebrate your win',
    ],
    icon: 'Trophy',
    created_at: new Date().toISOString(),
  },
];

const chapters: Chapter[] = [
  {
    chapter_id: 'ch-1',
    title: 'Resume Foundation',
    order: 1,
    status: 'active',
    progress_percent: 0,
    nodes: nodes.filter((n) => n.chapter_id === 'ch-1'),
  },
  {
    chapter_id: 'ch-2',
    title: 'Professional Positioning',
    order: 2,
    status: 'locked',
    progress_percent: 0,
    nodes: nodes.filter((n) => n.chapter_id === 'ch-2'),
  },
  {
    chapter_id: 'ch-3',
    title: 'Applications',
    order: 3,
    status: 'locked',
    progress_percent: 0,
    nodes: nodes.filter((n) => n.chapter_id === 'ch-3'),
  },
  {
    chapter_id: 'ch-4',
    title: 'Interview Preparation',
    order: 4,
    status: 'locked',
    progress_percent: 0,
    nodes: nodes.filter((n) => n.chapter_id === 'ch-4'),
  },
  {
    chapter_id: 'ch-5',
    title: 'Interview Practice',
    order: 5,
    status: 'locked',
    progress_percent: 0,
    nodes: nodes.filter((n) => n.chapter_id === 'ch-5'),
  },
  {
    chapter_id: 'ch-6',
    title: 'Offer Readiness',
    order: 6,
    status: 'locked',
    progress_percent: 0,
    nodes: nodes.filter((n) => n.chapter_id === 'ch-6'),
  },
];

export const developerJourney: CareerJourney = {
  journey_id: 'software-developer',
  profession: 'Software Developer',
  total_days: 45,
  current_day: 1,
  current_chapter: 1,
  status: 'active',
  chapters,
};

export const developerNodes = nodes;
export const developerChapters = chapters;

export const getNodeById = (id: string): JourneyNode | undefined =>
  nodes.find((n) => n.id === id);

export const getNextNode = (currentId: string): JourneyNode | undefined => {
  const currentIndex = nodes.findIndex((n) => n.id === currentId);
  return nodes[currentIndex + 1];
};

export const getChapterById = (id: string): Chapter | undefined =>
  chapters.find((c) => c.chapter_id === id);

export const getNodesByChapter = (chapterId: string): JourneyNode[] =>
  nodes.filter((n) => n.chapter_id === chapterId);

export const getNodeStatus = (
  nodeId: string,
  completedIds: string[],
  currentId: string | null
): 'completed' | 'current' | 'locked' => {
  if (completedIds.includes(nodeId)) return 'completed';
  if (currentId === nodeId) return 'current';
  return 'locked';
};
