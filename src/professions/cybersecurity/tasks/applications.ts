import type { TaskContent } from '@/core/task_content';

export const APPLICATION_TASKS: Record<string, TaskContent[]> = {
  'application-tracking': [
    {
      id: 'cy-at-tracker',
      title: 'Build Application Tracker',
      objective: 'Create a tracking system for all security job applications.',
      instructions: [
        'Choose a tool: Notion, Google Sheets, or similar.',
        'Create columns: Company, Role, Date, Clearance?, Status, Next Action.',
        'Add all current applications.',
        'Set up follow-up reminders.',
      ],
      completionCriteria: [
        'Tracker created with all required columns',
        'All current applications logged',
        'Follow-up reminders set',
      ],
      estimatedMinutes: 25,
      difficulty: 1,
      tips: [
        'Security roles often require clearance — track this separately.',
        'Update daily for consistency.',
        'Track application-to-interview conversion rate.',
      ],
      expectedOutcome: 'A functional application tracker for your job search.',
    },
  ],
  'portfolio-home-lab': [
    {
      id: 'cy-ph-portfolio',
      title: 'Create Lab Portfolio Page',
      objective: 'Build a portfolio page showcasing your home lab.',
      instructions: [
        'Create a page on GitHub Pages or similar.',
        'Add lab architecture diagram.',
        'Document 3 attack/defense scenarios.',
        'Include screenshots and tool outputs.',
      ],
      completionCriteria: [
        'Portfolio page is live',
        'Architecture diagram included',
        '3 scenarios documented with screenshots',
      ],
      estimatedMinutes: 60,
      difficulty: 3,
      tips: [
        'Use GitHub Pages for free hosting.',
        'Include both successful and failed detections.',
        'Add network topology diagrams.',
      ],
      expectedOutcome: 'A portfolio page ready to share with recruiters.',
    },
  ],
  'ctf-scores': [
    {
      id: 'cy-cs-document',
      title: 'Document CTF Performance',
      objective: 'Create a record of your CTF participation and results.',
      instructions: [
        'List all CTFs you have participated in.',
        'Record your ranking and score.',
        'Document your best challenge write-ups.',
        'Create a CTF profile on CTFtime.',
      ],
      completionCriteria: [
        'All CTFs documented',
        'Rankings recorded',
        'At least 2 write-ups available',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'CTFtime.org tracks team and individual rankings.',
        'Include both team and solo competitions.',
        'Rankings provide objective proof of skills.',
      ],
      expectedOutcome: 'A documented CTF record for your portfolio.',
    },
  ],
  'clearance-prep': [
    {
      id: 'cy-cp-research',
      title: 'Research Clearance Requirements',
      objective: 'Understand security clearance requirements for your target roles.',
      instructions: [
        'Research clearance levels: Confidential, Secret, Top Secret.',
        'Check if your target companies require clearance.',
        'Understand the investigation process and timeline.',
        'Assess your eligibility for clearance.',
      ],
      completionCriteria: [
        'Clearance levels understood',
        'Target company requirements documented',
        'Investigation timeline known',
        'Personal eligibility assessed',
      ],
      estimatedMinutes: 30,
      difficulty: 1,
      tips: [
        'Clearance investigations can take 6-18 months.',
        'Clean financial history and no foreign contacts help.',
        'Being clearance-ready gives you an edge.',
      ],
      expectedOutcome: 'A clear understanding of clearance requirements and your eligibility.',
    },
  ],
  'company-research': [
    {
      id: 'cy-cr-profiles',
      title: 'Research Target Companies',
      objective: 'Create profiles for 5 target companies.',
      instructions: [
        'Research each company security stack.',
        'Identify their compliance requirements.',
        'Find recent security news or breaches.',
        'Document their security team size and structure.',
      ],
      completionCriteria: [
        '5 company profiles created',
        'Security stacks documented',
        'Recent security news noted',
      ],
      estimatedMinutes: 40,
      difficulty: 2,
      tips: [
        'Check their security blog or engineering blog.',
        'Look for security job postings to understand their stack.',
        'Note compliance: SOC 2, PCI DSS, HIPAA, FedRAMP.',
      ],
      expectedOutcome: 'Detailed company profiles for targeted applications.',
    },
  ],
  'application-tailoring': [
    {
      id: 'cy-at-resumes',
      title: 'Create Role-Specific Resumes',
      objective: 'Build 3 resume versions for different security roles.',
      instructions: [
        'Create versions for: SOC Analyst, Security Engineer, Penetration Tester.',
        'Customize keywords for each role.',
        'Adjust experience bullets to match each role.',
        'Ensure ATS compatibility for each version.',
      ],
      completionCriteria: [
        '3 resume versions created',
        'Each has role-specific keywords',
        'Experience tailored for each role',
      ],
      estimatedMinutes: 45,
      difficulty: 3,
      tips: [
        'SOC: emphasize monitoring, SIEM, incident response.',
        'Security Engineer: emphasize automation, tools, architecture.',
        'Pen Tester: emphasize offensive tools, vulnerabilities, exploits.',
      ],
      expectedOutcome: 'Role-specific resumes ready for targeted applications.',
    },
  ],
  'referral-strategy': [
    {
      id: 'cy-rs-pipeline',
      title: 'Build Referral Pipeline',
      objective: 'Identify referral opportunities at 5 target companies.',
      instructions: [
        'Find 2-3 contacts at each target company.',
        'Check LinkedIn for shared connections or interests.',
        'Send personalized messages to build rapport.',
        'Ask for advice before asking for referrals.',
      ],
      completionCriteria: [
        '5 companies have referral contacts identified',
        '10+ personalized messages sent',
        'At least 3 conversations started',
      ],
      estimatedMinutes: 40,
      difficulty: 2,
      tips: [
        'Attend BSides, DEF CON, or local security meetups.',
        'Join security Discord servers and Slack channels.',
        'Build relationships first, referrals follow naturally.',
      ],
      expectedOutcome: 'A pipeline of potential referrals at target companies.',
    },
  ],
};
