import type { TaskContent } from '@/core/task_content';

export const OFFER_TASKS: Record<string, TaskContent[]> = {
  'salary-research': [
    {
      id: 'pm-sr-research-comp',
      title: 'Research PM Market Compensation',
      objective: 'Build a data-backed salary target for your PM negotiation.',
      instructions: [
        'Search Levels.fyi for PM base salary at companies in your target tier (FAANG, mid-size tech, startup).',
        'Search Glassdoor for "[your PM level] + [your city]" salary data.',
        'Search Blind or LinkedIn Salary for anonymous PM compensation data.',
        'Calculate your target range: 10th percentile (floor), 50th (fair), 75th (goal), 90th (anchor).',
      ],
      completionCriteria: [
        'Salary data from at least 3 sources',
        'Target range defined with floor, fair, goal, and anchor numbers',
        'Total compensation calculated: base + bonus + equity estimated value',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'PM equity can be 20-100% of base at startups. Factor it into your total comp calculation.',
        'Levels.fyi is the most reliable source for tech PM compensation.',
        'Location matters: San Francisco PM salaries can be 2x a comparable role in Austin.',
      ],
      expectedOutcome: 'A specific PM salary target range backed by market data, ready for negotiation.',
    },
  ],
  'offer-review': [
    {
      id: 'pm-or-review-offer',
      title: 'Review a PM Offer Letter Systematically',
      objective: 'Read every component of a PM offer with the same scrutiny you give a product spec.',
      instructions: [
        'Create a checklist: Base salary, Bonus target %, Equity grant (shares + type), Vesting schedule, Cliff, Signing bonus, Start date, Title, Benefits, PTO, Remote policy.',
        'For each item, note: (1) what it says, (2) what is unclear, (3) what you want to negotiate.',
        'List all verbal promises made during interviews. Confirm which are in the letter.',
        'Identify the 2-3 items you will negotiate in priority order.',
      ],
      completionCriteria: [
        'Checklist completed for every offer component',
        'Verbal promises cross-referenced against written offer',
        '2-3 negotiation targets identified and prioritized',
      ],
      estimatedMinutes: 30,
      difficulty: 1,
      tips: [
        'Equity cliff (usually 1 year) is critical — understand it before accepting.',
        'Ask HR: "Can you explain the equity type (ISO vs RSU) and current 409A valuation?"',
        'Performance review cycle timing affects when your equity refreshes begin.',
      ],
      expectedOutcome: 'A thoroughly reviewed PM offer with a clear negotiation agenda prepared.',
    },
  ],
  'resignation-letter': [
    {
      id: 'pm-rl-write-letter',
      title: 'Write Your PM Resignation Letter',
      objective: 'Prepare a professional resignation letter that protects your PM reputation.',
      instructions: [
        'Write a 3-paragraph letter: (1) Formal notice with date, (2) Gratitude for opportunity and growth, (3) Commitment to clean transition.',
        'Keep under 150 words. No explanations, no complaints, no names.',
        'Prepare a transition document: current roadmap status, open decisions, key contacts.',
        'Practice what you will say when you resign in person before the written letter.',
      ],
      completionCriteria: [
        'Resignation letter written, under 150 words',
        'Transition document outline created',
        'In-person resignation conversation planned and practiced',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Resign to your manager in person (or video) first, then send the written letter.',
        'Your PM transition document is your professional gift to the team — do it well.',
        'Counter-offers are common for PMs. Know your answer before you resign.',
      ],
      expectedOutcome: 'A professional PM exit that preserves relationships and references for years ahead.',
    },
  ],
  'offer-evaluation': [
    {
      id: 'pm-oe-scorecard',
      title: 'Build a PM Offer Evaluation Scorecard',
      objective: 'Create a weighted framework to compare PM offers beyond just salary.',
      instructions: [
        'List the 8 dimensions: Compensation, Product scope, Team caliber, Domain fit, Growth trajectory, Autonomy, Company stage, Work-life balance.',
        'Assign a weight (1-5) to each based on your current career priorities.',
        'Score each offer on each dimension (1-10).',
        'Multiply score × weight. Sum totals. Compare.',
      ],
      completionCriteria: [
        'Scorecard built with 8 weighted dimensions',
        'At least one offer scored completely',
        'Total scores calculated and compared',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Weights reveal your real priorities. If you weight comp highest, own that decision.',
        'Involve a PM mentor in reviewing your scorecard — they can challenge your weights.',
        'The process of building the scorecard is as valuable as the final score.',
      ],
      expectedOutcome: 'A structured PM offer evaluation framework that removes emotion from a high-stakes decision.',
    },
  ],
  'salary-negotiation': [
    {
      id: 'pm-sn-script-negotiation',
      title: 'Script Your PM Salary Negotiation',
      objective: 'Prepare word-for-word what you will say when negotiating your PM offer.',
      instructions: [
        'Write the opening: "Thank you for the offer. I am very excited about this role. Based on my research and experience, I was expecting closer to [anchor number]. Is there flexibility?"',
        'Prepare responses to 3 scenarios: (1) They say yes immediately, (2) They ask why you want more, (3) They say the number is final.',
        'Identify what you will accept vs what will make you decline.',
        'Practice the script aloud 3 times until it sounds natural, not rehearsed.',
      ],
      completionCriteria: [
        'Full negotiation script written for 3 scenarios',
        'Accept floor and decline ceiling defined',
        'Script practiced aloud 3 times',
      ],
      estimatedMinutes: 30,
      difficulty: 3,
      tips: [
        'Always negotiate over the phone or video, never by email — you can read reactions.',
        'Silence is powerful. After making your ask, stop talking and wait.',
        'If base is fixed, negotiate equity refresh, signing bonus, title, or remote days.',
      ],
      expectedOutcome: 'A scripted PM negotiation that you can execute confidently without anxiety.',
    },
  ],
  'decision-framework': [
    {
      id: 'pm-df-write-framework',
      title: 'Write Your PM Career Decision Framework',
      objective: 'Define your personal PM career priorities to guide any future decision.',
      instructions: [
        'Write your top 5 PM career priorities in ranked order.',
        'For each, write 1 sentence explaining why it matters to you right now.',
        'Apply the framework to your current decision: how does each option score?',
        'Share with one trusted PM mentor for pushback.',
      ],
      completionCriteria: [
        '5 priorities ranked and explained',
        'Current decision evaluated against the framework',
        'Shared with and reviewed by at least one PM mentor',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Priorities change across career stages. Revisit this framework annually.',
        'If you cannot rank your priorities, you are not ready to make a major career decision yet.',
        'Short-term vs long-term thinking: a lower-paying role with more product scope can be the right call.',
      ],
      expectedOutcome: 'A personal PM decision framework that prevents impulsive career choices.',
    },
  ],
  'offer-acceptance': [
    {
      id: 'pm-oa-confirm-and-plan',
      title: 'Accept the Offer and Plan Your First 30 Days',
      objective: 'Confirm your PM offer in writing and prepare for a strong start.',
      instructions: [
        'Send written acceptance via email within 24 hours of verbal agreement.',
        'Confirm: start date, who to report to on day 1, first-day logistics.',
        'Write a 30-day PM plan: week 1 = listening and learning, week 2 = stakeholder mapping, week 3-4 = first deliverable.',
        'Begin pre-boarding: research the product deeply, read team blog posts, join any Slack workspaces opened early.',
      ],
      completionCriteria: [
        'Written acceptance email sent and confirmed',
        '30-day PM plan written',
        'Pre-boarding research started before day one',
      ],
      estimatedMinutes: 30,
      difficulty: 1,
      tips: [
        'Ask HR: "Is there anything I can read or access before I start to get up to speed?"',
        'Your 30-60-90 day plan is often discussed in final interviews — having one shows PM maturity.',
        'The best PM first move is to listen and ask questions for 2 weeks before proposing changes.',
      ],
      expectedOutcome: 'A professional PM acceptance and a strong start plan that builds credibility from day one.',
    },
  ],
  'benefits-evaluation': [
    {
      id: 'pm-be-calculate-total-comp',
      title: 'Calculate Your Total PM Compensation',
      objective: 'Evaluate the full monetary value of a PM offer including all benefits.',
      instructions: [
        'List all components: base salary, target bonus, equity (calculate annual value), signing bonus, health insurance value, 401k match, PTO days × daily rate, learning budget, remote stipend.',
        'Calculate total year 1 value and year 4 value (including equity vesting).',
        'Compare across competing offers on total 4-year value.',
        'Identify any benefits that could be negotiated if base is fixed.',
      ],
      completionCriteria: [
        'Year 1 and Year 4 total compensation calculated',
        'All benefit components assigned a dollar value',
        'Comparison table created if evaluating multiple offers',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'For startup equity, model 3 scenarios: 0x exit, 5x, and 20x. Understand your risk.',
        'Health insurance premium differences between offers can be $5-10K/year — do not ignore it.',
        'A generous learning budget ($3-5K/year) is extremely valuable for PM career growth.',
      ],
      expectedOutcome: 'A complete PM total compensation picture that enables truly informed offer comparisons.',
    },
  ],
  'start-transition': [
    {
      id: 'pm-st-30-60-90-plan',
      title: 'Write Your PM 30-60-90 Day Plan',
      objective: 'Create a concrete first-quarter plan that sets up your PM success.',
      instructions: [
        'Day 1-30: Define learning goals. Map: product, users, data, team, stakeholders, roadmap status.',
        'Day 31-60: Define contribution goals. First PRD draft, first stakeholder alignment, one quick win shipped.',
        'Day 61-90: Define ownership goals. Own one feature end-to-end, deliver first OKR check-in.',
        'For each phase, identify your 3 key questions and who can answer them.',
      ],
      completionCriteria: [
        '30-60-90 plan written with specific goals per phase',
        'Each phase has 3 key questions to answer',
        'Plan is under 1 page and shareable with your new manager',
      ],
      estimatedMinutes: 40,
      difficulty: 2,
      tips: [
        'Your new manager will love this. Share it on day 1 and ask for feedback.',
        'The best day-1 question: "What does success look like for me in the first 3 months?"',
        'Resist the urge to propose roadmap changes in the first 30 days. Listen and learn first.',
      ],
      expectedOutcome: 'A PM 30-60-90 plan that accelerates your impact and builds stakeholder trust from day one.',
    },
  ],
};
