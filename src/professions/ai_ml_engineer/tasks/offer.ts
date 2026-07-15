import type { TaskContent } from '@/core/task_content';

export const OFFER_TASKS: Record<string, TaskContent[]> = {
  'certification-prep': [
    {
      id: 'aiml-cp-schedule-cert',
      title: 'Pick and Schedule a Certification',
      objective: 'Add a credible, in-progress certification to your profile.',
      instructions: [
        'Pick one certification: DeepLearning.AI Specialization, AWS ML Specialty, or Google ML Engineer.',
        'Create a 4-week study schedule with weekly milestones.',
        'Schedule the exam date and pay the fee if applicable.',
        'Take a practice exam or quiz to baseline your readiness.',
      ],
      completionCriteria: [
        'One certification chosen with an exam or completion date scheduled.',
        '4-week study plan created.',
        'A baseline practice score recorded.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'A certification in progress signals commitment, even before you finish it.',
        'Pick the certification most relevant to your target domain (e.g. AWS ML Specialty for cloud-heavy MLE roles).',
        'Pair the certification with a small project applying what you learn.',
      ],
      expectedOutcome: 'A certification plan in motion that strengthens your candidacy.',
    },
  ],
  'take-home-project-process': [
    {
      id: 'aiml-thp-prepare-process',
      title: 'Prepare for the Take-Home Project Process',
      objective: 'Get ready to handle an ML take-home assignment efficiently and well.',
      instructions: [
        'Review 2-3 example ML take-home prompts (public repos or interview prep sites).',
        'Set up a personal template: project structure, README format, evaluation section.',
        'Time-box a practice take-home to 3-4 hours to simulate real constraints.',
        'Prepare a short write-up format: assumptions, approach, results, what you would improve with more time.',
      ],
      completionCriteria: [
        'A reusable take-home project template is ready.',
        'At least one practice take-home completed within a time-box.',
        'A write-up format prepared covering assumptions and next steps.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Most companies weight the write-up and communication as much as the model itself.',
        'State your assumptions explicitly — ambiguity handling is part of what is being evaluated.',
        'Respect the suggested time limit; going wildly over signals poor scoping judgment.',
      ],
      expectedOutcome: 'A repeatable, efficient process for take-home assignments that showcases your best work under time pressure.',
    },
  ],
  'resignation-letter': [
    {
      id: 'aiml-rl-draft-letter',
      title: 'Draft Your Resignation Letter',
      objective: 'Prepare a professional resignation letter and transition plan.',
      instructions: [
        'Draft a resignation letter under 150 words: notice, gratitude, offer to help transition.',
        'List your current responsibilities and identify what needs documentation before you leave.',
        'Draft a brief transition plan for handing off models, pipelines, or ongoing experiments.',
        'Plan the timing of your resignation conversation.',
      ],
      completionCriteria: [
        'Resignation letter drafted, under 150 words, professional in tone.',
        'A transition plan covering key responsibilities is drafted.',
        'No complaints or demands included in the letter.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'A graceful exit preserves references and reputation in a small ML community.',
        'Offer to document model/pipeline context — it is genuinely valuable and appreciated.',
        'Keep the letter factual and positive regardless of your real feelings about the job.',
      ],
      expectedOutcome: 'A professional resignation and transition plan ready to execute calmly.',
    },
  ],
  'offer-evaluation': [
    {
      id: 'aiml-oe-compare-offers',
      title: 'Build an Offer Comparison Scorecard',
      objective: 'Evaluate ML job offers holistically, not just by base salary.',
      instructions: [
        'Create a spreadsheet comparing offers: base, bonus, equity, team, tech stack, growth potential.',
        'Weight factors that matter to you: research time, mentorship, compute access, work-life balance.',
        'Score each offer 1-5 per factor and compute a weighted total.',
        'Discuss your top choice with a mentor or trusted peer.',
      ],
      completionCriteria: [
        'A weighted scorecard comparing all offers is built.',
        'Each factor is scored, not just gut-feel ranked.',
        'Discussed with at least one outside perspective.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'The team and problems you will work on matter as much as compensation for long-term ML career growth.',
        'Ask about compute budget and data access — these vary hugely between ML teams.',
        'Sleep on big decisions; do not decide the same day you receive an offer.',
      ],
      expectedOutcome: 'A data-backed evaluation that leads to the right offer decision.',
    },
  ],
  'salary-negotiation': [
    {
      id: 'aiml-sn-practice-negotiation',
      title: 'Practice Your Negotiation Script',
      objective: 'Prepare and rehearse a confident salary/equity negotiation.',
      instructions: [
        'Research market compensation for your role and level (levels.fyi, Glassdoor, peer benchmarks).',
        'Write your ask: target range, walk-away number, and BATNA.',
        'Draft a negotiation script: "Based on my research and offers, I was hoping for $X."',
        'Practice the script out loud 5-10 times with a friend or mirror.',
      ],
      completionCriteria: [
        'Target range, walk-away number, and BATNA are written down.',
        'A negotiation script is drafted.',
        'Script practiced out loud at least 5 times.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Most offers have 10-20% flexibility; not asking leaves money on the table.',
        'Negotiate the full package: base, sign-on, equity, and even start date or compute/training budget.',
        'Always negotiate in writing after any verbal conversation, to confirm terms.',
      ],
      expectedOutcome: 'A confident, well-rehearsed negotiation that maximizes your offer.',
    },
  ],
  'decision-framework': [
    {
      id: 'aiml-df-build-matrix',
      title: 'Build a Decision Matrix',
      objective: 'Turn a complex multi-offer decision into a structured, defensible choice.',
      instructions: [
        'List 6-7 factors that matter for your career decision.',
        'Weight each factor by importance (sum to 100%).',
        'Score every offer 1-5 per factor and compute the weighted sum.',
        'Set a decision deadline and commit once the numbers are in.',
      ],
      completionCriteria: [
        'A weighted decision matrix with 6-7 factors is completed.',
        'Every offer is scored against every factor.',
        'A decision deadline is set.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'A framework turns emotional decisions into rational ones you can look back on without regret.',
        'Include "no regrets" criteria explicitly — some factors are non-negotiable for you.',
        'Once decided, commit and stop re-litigating the choice.',
      ],
      expectedOutcome: 'A clear, defensible top choice among your offers.',
    },
  ],
  'offer-acceptance': [
    {
      id: 'aiml-oa-confirm-offer',
      title: 'Confirm and Accept Your Offer',
      objective: 'Formalize your offer acceptance and close out other processes cleanly.',
      instructions: [
        'Review the offer letter carefully for role, compensation, start date, and equity terms.',
        'Ask for clarification on any ambiguous terms in writing.',
        'Sign and return the offer letter.',
        'Notify other companies in your pipeline that you have accepted an offer.',
      ],
      completionCriteria: [
        'Offer letter reviewed and any questions resolved in writing.',
        'Offer signed and returned.',
        'Other companies in the pipeline notified.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'A verbal acceptance is not binding — get everything in writing before celebrating.',
        'Be gracious when declining other opportunities; the ML community is small.',
        'Confirm your start date and any pre-start logistics (equipment, access, onboarding).',
      ],
      expectedOutcome: 'A signed offer and a clean close to your job search.',
    },
  ],
  'toolkit-setup': [
    {
      id: 'aiml-ts-prepare-environment',
      title: 'Prepare Your ML Toolkit',
      objective: 'Set up your development environment before day one.',
      instructions: [
        'Install core tools: Python environment, Git, Docker, and any frameworks mentioned by the team.',
        'Request access to compute resources or cloud accounts ahead of your start date if possible.',
        'Review any public documentation, style guides, or onboarding docs shared in advance.',
        'Bookmark key internal resources once access is granted.',
      ],
      completionCriteria: [
        'Local environment set up with core tools installed.',
        'Access requests submitted ahead of start date.',
        'Available onboarding materials reviewed.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Day one is too late to start setting up your environment — prepare in advance.',
        'Ask your manager what frameworks/tools the team uses before you start.',
        'A smooth setup lets you contribute meaningfully in week one, not week three.',
      ],
      expectedOutcome: 'An environment ready to go so you can focus on learning the codebase and models from day one.',
    },
  ],
  'start-transition': [
    {
      id: 'aiml-st-plan-30-60-90',
      title: 'Write Your 30-60-90 Day Plan',
      objective: 'Set clear goals and stakeholder relationships for your first quarter.',
      instructions: [
        'Draft a 30-60-90 day plan: learning goals, key stakeholders, early wins.',
        'Identify key people: manager, senior ML engineer, cross-functional partner (product/data).',
        'Set personal goals: model shipped, paper read, tool learned, by day 90.',
        'Share the plan with your manager in your first week.',
      ],
      completionCriteria: [
        'A written 30-60-90 day plan exists.',
        'Key stakeholders are identified by name/role.',
        'Plan shared with manager.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'The first 90 days set your trajectory — a plan turns anxiety into momentum.',
        'Listen more than you speak in week one.',
        'Deliver a small, visible win early: a fixed bug, a small model improvement, a clear analysis.',
      ],
      expectedOutcome: 'A strong start that builds credibility and compounds over your tenure.',
    },
  ],
};
