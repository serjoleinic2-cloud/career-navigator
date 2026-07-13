import type { TaskContent } from '@/core/task_content';

export const OFFER_TASKS: Record<string, TaskContent[]> = {
  'certification-prep': [
    {
      id: 'cyber-cp-study-plan',
      title: 'Create Security Certification Study Plan',
      objective: 'Build a structured plan to earn a relevant security certification.',
      instructions: [
        'Pick one certification: Security+, CEH, CISSP, or OSCP.',
        'Download exam objectives. List all domains and weights.',
        'Create a 4-week schedule: 1 hour daily, 5 days per week.',
        'Schedule exam date and pay fee.'
      ],
      completionCriteria: [
        'Certification chosen with objectives downloaded.',
        '4-week schedule created with daily topics.',
        'Exam date scheduled and paid.'
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Security+: entry-level, 2 weeks study. OSCP: advanced, 3+ months.',
        'Use Boson practice exams for Security+. HackTheBox for OSCP.',
        'Join study groups on Discord or Reddit.'
      ],
      expectedOutcome: 'A certification roadmap that signals commitment to security employers.',
    },
  ],
  'clearance-process': [
    {
      id: 'cyber-cp-complete-sf86',
      title: 'Complete SF-86 Draft',
      objective: 'Prepare security clearance application without surprises.',
      instructions: [
        'Gather 10 years of history: residences, employers, schools, foreign contacts.',
        'Complete SF-86 draft online.',
        'Review with cleared friend or security clearance attorney.',
        'Prepare explanations for any potential issues.'
      ],
      completionCriteria: [
        '10 years of history gathered.',
        'SF-86 draft completed.',
        'Reviewed by cleared professional.'
      ],
      estimatedMinutes: 180,
      difficulty: 3,
      tips: [
        'Be thorough. Omissions are worse than issues.',
        'Foreign contacts: list all, even if not close.',
        'Financial issues: show resolution plan, not just problems.'
      ],
      expectedOutcome: 'SF-86 readiness that speeds clearance processing.',
    },
  ],
  'resignation-letter': [
    {
      id: 'cyber-rl-draft-letter',
      title: 'Draft Security Resignation Letter',
      objective: 'Write a professional resignation that preserves clearance and references.',
      instructions: [
        'Keep under 150 words.',
        'Express gratitude for security opportunities and clearance sponsorship.',
        'State last day clearly. Offer transition help.',
        'No complaints, no demands, no mention of new employer.'
      ],
      completionCriteria: [
        'Letter under 150 words.',
        'Gratitude expressed for clearance sponsorship.',
        'Last day specified. Transition offered.'
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Clearance sponsorship is valuable. Express appreciation.',
        'Offer to help with knowledge transfer.',
        'Maintain relationships for future cleared opportunities.'
      ],
      expectedOutcome: 'A resignation letter that protects clearance and professional reputation.',
    },
  ],
  'offer-evaluation': [
    {
      id: 'cyber-oe-scorecard',
      title: 'Create Security Offer Scorecard',
      objective: 'Evaluate cleared offers holistically.',
      instructions: [
        'List factors: base, bonus, clearance sponsorship, training budget, tool access, mission.',
        'Weight each 1-5 based on priority.',
        'Score each offer. Multiply weight × score. Sum.',
        'Rank offers.'
      ],
      completionCriteria: [
        '7 factors listed and weighted.',
        'All offers scored.',
        'Top choice clear and defensible.'
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Clearance sponsorship is valuable: costs $5K-$15K to sponsor.',
        'Training budget: conferences, certifications, lab access.',
        'Mission impact: defending critical infrastructure vs commercial data.'
      ],
      expectedOutcome: 'A rational framework for comparing cleared security offers.',
    },
  ],
  'salary-negotiation': [
    {
      id: 'cyber-sn-negotiate',
      title: 'Negotiate Security Salary',
      objective: 'Maximize total compensation for cleared roles.',
      instructions: [
        'Research cleared salaries: ClearanceJobs, Glassdoor, Levels.fyi.',
        'Prepare script: "Based on my research and clearance, I was hoping for $X."',
        'Practice 10 times without apologizing.',
        'Role-play with friend.'
      ],
      completionCriteria: [
        'Script written and practiced 10 times.',
        'Cleared salary data gathered.',
        'Role-play completed with feedback.'
      ],
      estimatedMinutes: 45,
      difficulty: 3,
      tips: [
        'Cleared roles often pay 15-30% premium. Factor that in.',
        'Negotiate: base, bonus, training budget, conference attendance.',
        'Clearance sponsorship is a bargaining chip.'
      ],
      expectedOutcome: 'A negotiation that adds $10K-$30K to cleared compensation.',
    },
  ],
  'decision-framework': [
    {
      id: 'cyber-df-decide',
      title: 'Set Decision Deadline',
      objective: 'Avoid paralysis when choosing between cleared offers.',
      instructions: [
        'Give yourself 48-72 hours.',
        'Gather input: scorecard, mentor advice, family discussion.',
        'Sleep on it. Decide fresh.',
        'Commit. No second-guessing.'
      ],
      completionCriteria: [
        'Deadline set.',
        'Input gathered.',
        'Decision made and communicated.'
      ],
      estimatedMinutes: 15,
      difficulty: 1,
      tips: [
        'Cleared roles often have long onboarding. Do not delay unnecessarily.',
        'Trust your scorecard. Emotions fade; data endures.',
        'Communicate decision professionally to all parties.'
      ],
      expectedOutcome: 'A confident, timely decision with no regrets.',
    },
  ],
  'offer-acceptance': [
    {
      id: 'cyber-oa-accept',
      title: 'Accept Offer in Writing',
      objective: 'Secure your cleared role with written confirmation.',
      instructions: [
        'Review offer letter: role, start date, salary, clearance sponsorship, benefits.',
        'Ask for clarification on ambiguous terms.',
        'Sign and return. Keep copy.',
        'Confirm start date and clearance initiation with HR.'
      ],
      completionCriteria: [
        'All terms reviewed.',
        'Ambiguous terms clarified.',
        'Signed copy returned.'
      ],
      estimatedMinutes: 30,
      difficulty: 1,
      tips: [
        'Clearance initiation timeline: confirm when process starts.',
        'Training budget: get specifics on conferences and certifications.',
        'Benefits: health, 401K, PTO, remote policy.'
      ],
      expectedOutcome: 'A signed offer that starts your cleared security career.',
    },
  ],
  'toolkit-setup': [
    {
      id: 'cyber-ts-install-tools',
      title: 'Install Security Toolkit',
      objective: 'Prepare your environment before day 1.',
      instructions: [
        'Install: SIEM client, EDR console, vulnerability scanner, Python, Git.',
        'Set up VMs: Kali, Windows, vulnerable machines.',
        'Configure VPN and test access.',
        'Bookmark internal docs and playbooks.'
      ],
      completionCriteria: [
        'All tools installed.',
        'VMs configured.',
        'VPN tested.'
      ],
      estimatedMinutes: 120,
      difficulty: 3,
      tips: [
        'Ask for tool list before start date.',
        'Practice with public datasets: Splunk Boss of the SOC, Blue Team Labs Online.',
        'Create a personal cheat sheet for common queries.'
      ],
      expectedOutcome: 'A ready toolkit that lets you contribute on day 1.',
    },
  ],
  'start-transition': [
    {
      id: 'cyber-st-30-60-90',
      title: 'Write Security 30-60-90 Day Plan',
      objective: 'Create a roadmap for your first 90 days in a cleared role.',
      instructions: [
        'Days 1-30: Learn. Meet team. Understand tools. Complete onboarding.',
        'Days 31-60: Contribute. Close tickets. Tune alerts. Complete first hunt.',
        'Days 61-90: Optimize. Propose improvements. Take ownership. Present findings.',
        'Share with manager on day 1.'
      ],
      completionCriteria: [
        'Plan covers 90 days with specific goals.',
        'One quick win identified per month.',
        'Shared with manager and agreed upon.'
      ],
      estimatedMinutes: 45,
      difficulty: 2,
      tips: [
        'Listen more than speak in month 1. Build trust.',
        'First win: close a ticket, tune an alert, find a false positive.',
        'Document everything. Create team wiki for your learnings.'
      ],
      expectedOutcome: 'A 30-60-90 plan that builds credibility in your cleared security role.',
    },
  ],
};