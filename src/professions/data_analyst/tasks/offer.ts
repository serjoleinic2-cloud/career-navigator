import type { TaskContent } from '@/core/task_content';

export const OFFER_TASKS: Record<string, TaskContent[]> = {
  'certification-prep': [
    {
      id: 'da-cp-study-plan',
      title: 'Create Certification Study Plan',
      objective: 'Build a structured plan to earn a relevant analytics certification.',
      instructions: [
        'Pick one certification: Google Data Analytics, IBM Data Analyst, or Tableau Desktop Specialist.',
        'Download the exam guide. List all topics and weights.',
        'Create a 4-week schedule: 1 hour daily, 5 days per week.',
        'Schedule the exam date (creates commitment).'
      ],
      completionCriteria: [
        'Certification chosen with exam guide downloaded.',
        '4-week schedule created with daily topics.',
        'Exam date scheduled and paid.'
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Google Data Analytics is most recognized for entry-level roles.',
        'Tableau Desktop Specialist is valuable if target companies use Tableau.',
        'Set calendar reminders. Treat study time as non-negotiable.'
      ],
      expectedOutcome: 'A certification roadmap that signals commitment to employers.',
    },
  ],
  'salary-benchmark': [
    {
      id: 'da-sb-research-salaries',
      title: 'Research Salary Benchmarks',
      objective: 'Build data-backed salary expectations for negotiation.',
      instructions: [
        'Search Glassdoor, Levels.fyi, PayScale for "Data Analyst" in your city.',
        'Document: base salary, bonus, equity (if startup), benefits value.',
        'Adjust for experience level: entry, mid, senior.',
        'Create a target range: minimum, target, ideal.'
      ],
      completionCriteria: [
        '10+ data points collected.',
        'Range adjusted for experience and location.',
        'Total compensation calculated (base + bonus + equity + benefits).'
      ],
      estimatedMinutes: 45,
      difficulty: 2,
      tips: [
        'Use multiple sources. One site can be skewed.',
        'Consider cost of living: $80K in Austin ≠ $80K in San Francisco.',
        'Equity at startups can be valuable, but risky. Research vesting schedules.'
      ],
      expectedOutcome: 'A salary range backed by market data, not guesswork.',
    },
  ],
  'resignation-letter': [
    {
      id: 'da-rl-draft-letter',
      title: 'Draft Resignation Letter',
      objective: 'Write a professional resignation letter that preserves relationships.',
      instructions: [
        'Keep it under 150 words.',
        'Express gratitude for opportunities and growth.',
        'State your last day clearly (standard 2 weeks notice).',
        'Offer to help with transition. No complaints, no demands.'
      ],
      completionCriteria: [
        'Letter is under 150 words.',
        'Gratitude expressed without excessive emotion.',
        'Last day specified. Transition help offered.'
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'This is a legal document. Keep it simple and positive.',
        'Do not mention your new employer or salary.',
        'Deliver in person if possible, then follow up with email.'
      ],
      expectedOutcome: 'A resignation letter that protects references and professional reputation.',
    },
  ],
  'offer-evaluation': [
    {
      id: 'da-oe-scorecard',
      title: 'Create Offer Scorecard',
      objective: 'Evaluate offers holistically using a weighted decision matrix.',
      instructions: [
        'List 7 factors: base salary, bonus, equity, benefits, growth, team, culture, commute.',
        'Weight each 1-5 based on personal priority.',
        'Score each offer 1-5 on every factor.',
        'Multiply weight × score. Sum. Rank offers.'
      ],
      completionCriteria: [
        '7 factors listed and weighted.',
        'All offers scored.',
        'Top choice is clear and defensible.'
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Do not overvalue base salary. A $10K difference is small over 2 years.',
        'Growth potential and learning often outweigh 5-10% salary differences early in career.',
        'Discuss with a mentor or family member before deciding.'
      ],
      expectedOutcome: 'A rational framework for comparing offers beyond just salary.',
    },
  ],
  'salary-negotiation': [
    {
      id: 'da-sn-practice-script',
      title: 'Practice Negotiation Script',
      objective: 'Build confidence for salary negotiation conversations.',
      instructions: [
        'Write your ask: "Based on my research, I was hoping for $X."',
        'Prepare 3 justifications: market data, your value, competing offers.',
        'Practice saying it aloud 10 times without apologizing.',
        'Role-play with a friend playing the hiring manager.'
      ],
      completionCriteria: [
        'Script written and practiced 10 times.',
        '3 justifications prepared with data.',
        'Role-play completed with feedback.'
      ],
      estimatedMinutes: 45,
      difficulty: 3,
      tips: [
        'Always negotiate in writing after verbal agreement. Email gives you time to craft.',
        'Give a range, not a number. Anchor high: "I was hoping for $75K-$85K."',
        'If they say no to base, ask about bonus, equity, or signing bonus.'
      ],
      expectedOutcome: 'A negotiation script that adds $5K-$15K to your offer.',
    },
  ],
  'decision-framework': [
    {
      id: 'da-df-set-deadline',
      title: 'Set Decision Deadline',
      objective: 'Avoid decision paralysis by setting a clear deadline.',
      instructions: [
        'Give yourself 48-72 hours for any offer decision.',
        'Gather all input: scorecard, mentor advice, family discussion.',
        'Sleep on it. Decide fresh in the morning.',
        'Commit to the decision. No second-guessing after deadline.'
      ],
      completionCriteria: [
        'Deadline set and communicated to employer.',
        'All input gathered before deadline.',
        'Decision made and communicated within deadline.'
      ],
      estimatedMinutes: 15,
      difficulty: 1,
      tips: [
        'Employers respect decisive candidates. Indecision signals lack of confidence.',
        'If you need more time, ask: "I want to give this proper consideration. Could I respond by [date]?"',
        'Trust your scorecard. Emotions fade; data endures.'
      ],
      expectedOutcome: 'A confident, timely decision that you will not regret.',
    },
  ],
  'offer-acceptance': [
    {
      id: 'da-oa-confirm-terms',
      title: 'Confirm Offer Terms in Writing',
      objective: 'Protect yourself by getting all terms in a signed offer letter.',
      instructions: [
        'Review offer letter: role, start date, salary, bonus, equity, benefits.',
        'Ask for clarification on ambiguous terms.',
        'Sign and return. Keep a copy.',
        'Confirm start date and onboarding schedule with HR.'
      ],
      completionCriteria: [
        'All terms reviewed and understood.',
        'Ambiguous terms clarified in writing.',
        'Signed copy returned and retained.'
      ],
      estimatedMinutes: 30,
      difficulty: 1,
      tips: [
        'Verbal offers can change. Written offers are binding.',
        'Check equity details: strike price, vesting schedule, cliff.',
        'Benefits matter: health insurance, 401K match, PTO, remote policy.'
      ],
      expectedOutcome: 'A signed offer letter that protects both sides.',
    },
  ],
  'toolkit-setup': [
    {
      id: 'da-ts-install-tools',
      title: 'Install Your Analytics Toolkit',
      objective: 'Prepare your development environment before day 1.',
      instructions: [
        'Install: SQL client (DBeaver, DataGrip), Python (Anaconda), Jupyter, Git.',
        'Set up accounts: Tableau Public, Kaggle, GitHub.',
        'Configure IDE with linting, formatting, and shortcuts.',
        'Test with a public dataset: load, query, visualize.'
      ],
      completionCriteria: [
        'All tools installed and running.',
        'Test query executed successfully.',
        'GitHub repo created for work projects.'
      ],
      estimatedMinutes: 60,
      difficulty: 2,
      tips: [
        'Ask your future manager for the company tool stack. Install those specifically.',
        'Set up SSH keys for Git. Configure .gitignore for data files.',
        'Create a template Jupyter notebook: imports, data load, EDA, visualization.'
      ],
      expectedOutcome: 'A ready toolkit that lets you contribute on day 1.',
    },
  ],
  'start-transition': [
    {
      id: 'da-st-30-60-90',
      title: 'Write Your 30-60-90 Day Plan',
      objective: 'Create a roadmap for your first 90 days that impresses your manager.',
      instructions: [
        'Days 1-30: Learn. Meet stakeholders. Understand data stack. Complete onboarding.',
        'Days 31-60: Contribute. Deliver one small win. Build relationships. Identify quick wins.',
        'Days 61-90: Optimize. Propose improvements. Take ownership of one metric. Present findings.',
        'Share plan with manager on day 1.'
      ],
      completionCriteria: [
        'Plan covers all 90 days with specific goals.',
        'At least one "quick win" identified per month.',
        'Shared with manager and agreed upon.'
      ],
      estimatedMinutes: 45,
      difficulty: 2,
      tips: [
        'Listen more than speak in month 1. Build trust before proposing changes.',
        'Your first win should be visible and low-risk: fix a broken dashboard, automate a report.',
        'Document everything. Create a team wiki page for your learnings.'
      ],
      expectedOutcome: 'A 30-60-90 day plan that builds credibility and accelerates your impact.',
    },
  ],
};
