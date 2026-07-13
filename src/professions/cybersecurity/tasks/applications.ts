import type { TaskContent } from '@/core/task_content';

export const APPLICATION_TASKS: Record<string, TaskContent[]> = {
  'application-tracking': [
    {
      id: 'cyber-at-create-tracker',
      title: 'Create Security Application Tracker',
      objective: 'Build a system to track your cybersecurity job applications.',
      instructions: [
        'Create a spreadsheet with columns: Company, Role, Clearance, Date Applied, Status, Follow-up, Notes.',
        'Enter 5 applications you have already submitted.',
        'Set a weekly review reminder.',
        'Add a "Response Rate" formula: (Responses / Applications) * 100.'
      ],
      completionCriteria: [
        'Tracker has 7+ columns including Clearance.',
        '5+ applications entered.',
        'Response rate formula works.'
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Use Google Sheets for mobile access.',
        'Color-code by status: green = offer, yellow = interview, red = rejected, blue = clearance pending.',
        'Track which channels work: ClearanceJobs, LinkedIn, referrals, company sites.'
      ],
      expectedOutcome: 'A tracking system that reveals patterns in your security job search.',
    },
  ],
  'portfolio-home-lab': [
    {
      id: 'cyber-phl-document-lab',
      title: 'Document Home Lab for Portfolio',
      objective: 'Create a recruiter-friendly document of your home lab.',
      instructions: [
        'Draw network topology: firewall, SIEM, vulnerable machines, attacker machine.',
        'List all tools and versions.',
        'Document one complete attack chain with detection.',
        'Include screenshots and mitigation advice.'
      ],
      completionCriteria: [
        'Network diagram created.',
        'One attack chain documented.',
        'Screenshots of detection and response included.'
      ],
      estimatedMinutes: 45,
      difficulty: 3,
      tips: [
        'Use draw.io for diagrams. Export as PNG.',
        'Show both offense and defense: how you broke in and how you blocked it.',
        'Include detection logic: "Splunk alert fires when..."'
      ],
      expectedOutcome: 'A home lab document that proves hands-on security experience.',
    },
  ],
  'ctf-scores': [
    {
      id: 'cyber-cs-complete-boxes',
      title: 'Complete 3 CTF Boxes',
      objective: 'Build your CTF profile with completed challenges.',
      instructions: [
        'Sign up for TryHackMe or HackTheBox.',
        'Complete 3 boxes: 1 easy, 1 medium, 1 hard.',
        'Document your methodology for each.',
        'Update your resume and LinkedIn with profile links.'
      ],
      completionCriteria: [
        '3 boxes completed.',
        'Methodology documented for each.',
        'Profile links added to resume and LinkedIn.'
      ],
      estimatedMinutes: 180,
      difficulty: 4,
      tips: [
        'Start with TryHackMe "Blue", "Kenobi", "Steel Mountain".',
        'Document every step: recon, exploit, privesc, lessons.',
        'Take screenshots of proof flags.'
      ],
      expectedOutcome: 'A CTF profile that proves offensive and defensive skills.',
    },
  ],
  'clearance-prep': [
    {
      id: 'cyber-cp-review-sf86',
      title: 'Review SF-86 Form',
      objective: 'Prepare for security clearance application.',
      instructions: [
        'Download SF-86 from OPM website.',
        'Review all sections: personal info, residence, employment, foreign contacts, finances.',
        'Gather 10 years of history: addresses, employers, foreign travel.',
        'Identify potential issues and prepare explanations.'
      ],
      completionCriteria: [
        'SF-86 reviewed section by section.',
        '10 years of history gathered.',
        'Potential issues identified with explanations prepared.'
      ],
      estimatedMinutes: 120,
      difficulty: 3,
      tips: [
        'Be honest. Investigators value transparency.',
        'Foreign contacts are not disqualifying. Undisclosed contacts are.',
        'Financial issues: show resolution plan, not just problems.'
      ],
      expectedOutcome: 'SF-86 readiness that speeds up clearance processing.',
    },
  ],
  'company-research': [
    {
      id: 'cyber-cr-research-three',
      title: 'Research 3 Security Companies',
      objective: 'Build company-specific knowledge for tailored applications.',
      instructions: [
        'Pick 3 target companies: defense contractor, tech company, government agency.',
        'Find their security stack, recent breaches, and compliance requirements.',
        'Identify 2 security team members on LinkedIn.',
        'Write one paragraph per company: why your skills fit.'
      ],
      completionCriteria: [
        'Security stack identified for all 3 companies.',
        'Recent breaches or threats documented.',
        '2+ team members found per company.'
      ],
      estimatedMinutes: 45,
      difficulty: 2,
      tips: [
        'Read company security blogs and vulnerability disclosures.',
        'Check CISA alerts for company-specific threats.',
        'Use LinkedIn to find SOC managers and CISOs.'
      ],
      expectedOutcome: 'Company-specific knowledge that turns generic applications into tailored ones.',
    },
  ],
  'application-tailoring': [
    {
      id: 'cyber-at-tailor-resume',
      title: 'Tailor Resume for Security Role',
      objective: 'Practice rapid customization for a specific cybersecurity job.',
      instructions: [
        'Pick one security job description. Highlight required tools and clearance.',
        'Reorder your resume bullets to match the JD priority.',
        'Mirror JD language: SIEM, incident response, vulnerability assessment.',
        'Write a cover letter referencing a company-specific threat.'
      ],
      completionCriteria: [
        'Resume bullets reordered to match JD.',
        'JD keywords appear in summary and bullets.',
        'Cover letter references company-specific context.'
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Keep a master resume. Copy and customize for each application.',
        'Emphasize clearance if required. Mention certifications upfront.',
        'Reference recent company breach or security initiative.'
      ],
      expectedOutcome: 'A tailored security application with 3x higher response rate.',
    },
  ],
  'referral-strategy': [
    {
      id: 'cyber-rs-request-info',
      title: 'Request 2 Informational Interviews',
      objective: 'Build warm connections in cleared security community.',
      instructions: [
        'Find 2 cleared security professionals at target companies.',
        'Send personalized message: "I admire your work on X. Would you share advice on breaking into Y?"',
        'Prepare 5 questions about clearance, tools, and culture.',
        'Send thank-you note within 24 hours.'
      ],
      completionCriteria: [
        '2 personalized requests sent.',
        'At least 1 call scheduled.',
        'Thank-you note sent after call.'
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Ask for advice, not a job. People love giving advice.',
        'Prepare questions about clearance process and team structure.',
        'After call: "Would you be comfortable referring me if a role opens up?"'
      ],
      expectedOutcome: 'Warm connections that bypass ATS and lead to cleared interviews.',
    },
  ],
};