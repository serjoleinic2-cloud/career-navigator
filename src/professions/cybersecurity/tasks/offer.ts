import type { TaskContent } from '@/core/task_content';

export const OFFER_TASKS: Record<string, TaskContent[]> = {
  'certification-prep': [
    {
      id: 'cy-cp-plan',
      title: 'Plan Certification Path',
      objective: 'Choose and plan your first security certification.',
      instructions: [
        'Research: CompTIA Security+, CEH, OSCP, CISSP.',
        'Choose one that matches your career goals.',
        'Create a study plan with weekly milestones.',
        'Schedule your exam date.',
      ],
      completionCriteria: [
        'Certification chosen',
        'Study plan created',
        'Exam scheduled',
      ],
      estimatedMinutes: 30,
      difficulty: 1,
      tips: [
        'CompTIA Security+ is best for entry-level blue team.',
        'CEH is valued for offensive roles.',
        'OSCP is the gold standard for penetration testing.',
      ],
      expectedOutcome: 'A clear certification roadmap with scheduled exam.',
    },
  ],
  'clearance-process': [
    {
      id: 'cy-cle-proc',
      title: 'Prepare for Clearance Investigation',
      objective: 'Gather all documents needed for a security clearance application.',
      instructions: [
        'Research SF-86 form requirements.',
        'Gather: employment history, addresses, foreign contacts.',
        'Document your financial history.',
        'Prepare references who can vouch for your character.',
      ],
      completionCriteria: [
        'SF-86 requirements understood',
        'Employment history documented',
        'Financial history reviewed',
        '3+ references identified',
      ],
      estimatedMinutes: 60,
      difficulty: 2,
      tips: [
        'Be completely honest — omissions are worse than disclosures.',
        'Clearance investigations can take 6-18 months.',
        'Start the process early if targeting government roles.',
      ],
      expectedOutcome: 'Documents ready for a security clearance application.',
    },
  ],
  'resignation-letter': [
    {
      id: 'cy-rl-draft',
      title: 'Draft Resignation Letter',
      objective: 'Create a professional resignation letter template.',
      instructions: [
        'Write a resignation letter under 150 words.',
        'Keep it professional and positive.',
        'Include proper notice period.',
        'Practice delivering it verbally.',
      ],
      completionCriteria: [
        'Resignation letter written',
        'Letter is under 150 words',
        'Verbal delivery practiced',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Do not include reasons for leaving.',
        'Offer to help with transition.',
        'The security world is smaller than it looks.',
      ],
      expectedOutcome: 'A professional resignation letter ready to deliver.',
    },
  ],
  'salary-research': [
    {
      id: 'cy-sr-market',
      title: 'Research Security Salary Market',
      objective: 'Gather salary data for your target security role.',
      instructions: [
        'Check: Glassdoor, Levels.fyi, Payscale, LinkedIn Salary.',
        'Research by role, level, location, and company size.',
        'Document the salary range for your market.',
        'Identify your target salary and walk-away number.',
      ],
      completionCriteria: [
        '3+ salary sources checked',
        'Salary range documented',
        'Target and walk-away numbers set',
      ],
      estimatedMinutes: 30,
      difficulty: 1,
      tips: [
        'Security roles pay more in high-cost areas.',
        'Clearance holders earn 15-25% more.',
        'Total compensation includes: base, bonus, equity, benefits.',
      ],
      expectedOutcome: 'Salary data ready for negotiation.',
    },
  ],
  'offer-evaluation': [
    {
      id: 'cy-oe-scorecard',
      title: 'Create Offer Scorecard',
      objective: 'Build a weighted scoring system for comparing offers.',
      instructions: [
        'List criteria: salary, learning, tools, team, location, remote, clearance.',
        'Assign weights to each criterion.',
        'Score each offer against each criterion.',
        'Calculate weighted scores.',
      ],
      completionCriteria: [
        'Scorecard created with 7+ criteria',
        'Weights assigned',
        'Each offer scored',
        'Final scores calculated',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Learning opportunities often outweigh salary differences early in career.',
        'Clearance eligibility has long-term value.',
        'Tool exposure matters for future career moves.',
      ],
      expectedOutcome: 'A data-driven comparison of all offers.',
    },
  ],
  'salary-negotiation': [
    {
      id: 'cy-sn-script',
      title: 'Script Your Negotiation',
      objective: 'Prepare and practice your salary negotiation script.',
      instructions: [
        'Write your opening: gratitude + market data + specific ask.',
        'Prepare responses to common pushbacks.',
        'Practice with a friend or record yourself.',
        'Negotiate total compensation, not just base salary.',
      ],
      completionCriteria: [
        'Negotiation script written',
        '3+ pushback responses prepared',
        'Practice session completed',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Companies expect negotiation. Asking does not make you difficult.',
        'Negotiate base, bonus, equity, signing bonus, PTO, remote work.',
        'Always get the final offer in writing.',
      ],
      expectedOutcome: 'A confident negotiation approach ready for any offer.',
    },
  ],
  'decision-framework': [
    {
      id: 'cy-df-priorities',
      title: 'Apply Decision Framework',
      objective: 'Use a structured framework to compare and choose between offers.',
      instructions: [
        'List your top 5 career priorities.',
        'Score each offer against each priority.',
        'Discuss with a mentor or trusted advisor.',
        'Make your decision and commit.',
      ],
      completionCriteria: [
        'Priorities listed and ranked',
        'Each offer scored',
        'Mentor input gathered',
        'Decision made and documented',
      ],
      estimatedMinutes: 20,
        difficulty: 1,
      tips: [
        'Do not compare offers after the deadline.',
        'Once you decide, stop second-guessing.',
        'Your priorities change over time — a framework adapts.',
      ],
      expectedOutcome: 'A confident decision backed by clear criteria.',
    },
  ],
  'offer-acceptance': [
    {
      id: 'cy-oa-confirm',
      title: 'Accept Offer Professionally',
      objective: 'Send written acceptance and confirm all offer details.',
      instructions: [
        'Send written acceptance email.',
        'Confirm start date and onboarding process.',
        'Ask about first-week expectations.',
        'Document all confirmed details.',
      ],
      completionCriteria: [
        'Written acceptance sent',
        'Start date confirmed',
        'Onboarding details documented',
      ],
      estimatedMinutes: 15,
      difficulty: 1,
      tips: [
        'Get everything in writing.',
        'Confirm benefits and start date before resigning.',
        'Ask about equipment and access provisioning.',
      ],
      expectedOutcome: 'A professionally accepted offer with all details confirmed.',
    },
  ],
  'toolkit-setup': [
    {
      id: 'cy-ts-prepare',
      title: 'Prepare Security Toolkit',
      objective: 'Set up your primary security tools before starting your new role.',
      instructions: [
        'Research the company security stack from the job posting.',
        'Install and configure essential tools: Wireshark, Nmap, Burp Suite.',
        'Set up a clean lab environment.',
        'Practice with tools you will use on the job.',
      ],
      completionCriteria: [
        'Essential tools installed',
        'Lab environment configured',
        'Tools tested and working',
      ],
      estimatedMinutes: 60,
      difficulty: 2,
      tips: [
        'Most security tools have free community editions.',
        'Practice with sample data before day one.',
        'Document your setup for quick recovery.',
      ],
      expectedOutcome: 'A ready-to-use security toolkit for your first day.',
    },
  ],
  'start-transition': [
    {
      id: 'cy-st-plan',
      title: 'Create 90-Day Plan',
      objective: 'Develop a structured plan for your first 90 days.',
      instructions: [
        'Week 1: Learn tools, meet team, understand processes.',
        'Month 1: Take on first assignments, build relationships.',
        'Month 2: Contribute independently, identify improvements.',
        'Month 3: Propose and implement improvements.',
        'Document your goals for each phase.',
      ],
      completionCriteria: [
        '30-60-90 day plan written',
        'Goals are specific and measurable',
        'Plan ready to share with manager',
      ],
      estimatedMinutes: 30,
      difficulty: 1,
      tips: [
        'Start with listening and learning.',
        'Build relationships before proposing changes.',
        'Document everything you learn.',
      ],
      expectedOutcome: 'A clear 90-day plan ready for your new role.',
    },
  ],
};
