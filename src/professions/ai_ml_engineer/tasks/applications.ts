import type { TaskContent } from '@/core/task_content';

export const APPLICATION_TASKS: Record<string, TaskContent[]> = {
  'application-tracking': [
    {
      id: 'aiml-at-build-tracker',
      title: 'Build Your Application Tracker',
      objective: 'Create a spreadsheet to track ML job applications systematically.',
      instructions: [
        'Create a tracker with columns: Company, Role, Domain, Date Applied, Status, Follow-up, Notes.',
        'Add 20+ target ML roles you plan to apply to.',
        'Set a weekly review cadence.',
        'Follow up on applications with no response after 1-2 weeks.',
      ],
      completionCriteria: [
        'Tracker has 20+ entries.',
        'Every entry has a status and next action.',
        'A weekly review habit is scheduled.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Track the interview loop stage too: OA, phone screen, ML system design, on-site.',
        'Archive rejected roles instead of deleting — patterns matter.',
        'Prioritize roles that match your positioning statement.',
      ],
      expectedOutcome: 'A tracked pipeline that turns chaos into an ML job search strategy.',
    },
  ],
  'portfolio-github': [
    {
      id: 'aiml-pg-clean-repos',
      title: 'Clean Up Your GitHub Portfolio',
      objective: 'Make your GitHub profile a credible ML portfolio.',
      instructions: [
        'Pin 3-4 repos that best represent your ML skills.',
        'Ensure each has a clear README: problem, approach, results, how to run.',
        'Remove or archive dead tutorial-following repos with no original work.',
        'Add a profile README summarizing your focus areas.',
      ],
      completionCriteria: [
        '3-4 pinned repos, each with a complete README.',
        'At least one repo shows an end-to-end pipeline, not just a notebook.',
        'Profile README added.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Recruiters skim GitHub for 30 seconds — the README has to sell the project fast.',
        'Include a results table or plot directly in the README, not buried in a notebook.',
        'Consistent commit history over time reads better than one giant dump.',
      ],
      expectedOutcome: 'A GitHub profile that proves hands-on modeling and engineering ability.',
    },
  ],
  'kaggle-rankings': [
    {
      id: 'aiml-kr-improve-rank',
      title: 'Improve Your Kaggle Rank',
      objective: 'Build objective, verifiable proof of your modeling skills.',
      instructions: [
        'Join or continue 1-2 active Kaggle competitions.',
        'Submit at least 3 iterations, documenting what changed each time.',
        'Publish a public notebook or writeup for at least one submission.',
        'Track your rank and percentile over time.',
      ],
      completionCriteria: [
        'At least 3 submissions made with documented iteration.',
        'Rank/percentile is visible on your profile.',
        'At least one public notebook or writeup linked.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Competitions are objective proof — no one can dispute a leaderboard position.',
        'Focus on the reasoning behind score improvements, not just chasing the leaderboard.',
        'Include competition links directly in your resume and cover letter.',
      ],
      expectedOutcome: 'Kaggle results that turn "interested in ML" into "proven modeling skills."',
    },
  ],
  'math-stats-prep': [
    {
      id: 'aiml-msp-review-foundations',
      title: 'Review Math & Stats Foundations',
      objective: 'Ensure you can confidently discuss the math underpinning ML models.',
      instructions: [
        'Review: linear algebra (vectors, matrices, eigenvalues), probability, gradient descent, regularization.',
        'Write short explanations (2-3 sentences each) for 10 core concepts in your own words.',
        'Practice deriving backpropagation or gradient descent updates by hand once.',
        'Identify 2-3 weak areas and schedule focused review time.',
      ],
      completionCriteria: [
        '10 core concepts explained in your own words.',
        'At least one derivation practiced by hand.',
        'Weak areas identified with a review plan.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Interviewers often ask you to explain a concept simply — practice that, not just the math.',
        'Whiteboard practice matters more than passive reading.',
        'Focus depth on the math relevant to your target domain (e.g. attention math for NLP roles).',
      ],
      expectedOutcome: 'Confidence explaining and deriving core ML math without notes.',
    },
  ],
  'company-research': [
    {
      id: 'aiml-cr-research-companies',
      title: 'Research Target Companies',
      objective: 'Understand the ML stack and problems of your target companies.',
      instructions: [
        'Pick 3 target companies. Find their ML/engineering blog posts.',
        'Identify their ML stack: frameworks, cloud provider, model serving approach.',
        'Note the business problems their ML team likely solves.',
        'Identify 2 ML team members on LinkedIn.',
      ],
      completionCriteria: [
        'Notes on ML stack and problems for 3 companies.',
        'At least one engineering blog post read per company.',
        '2 team members identified per company.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Engineering blogs reveal real problems — reference them in your cover letter or interview answers.',
        'Company research also helps you ask sharper questions in interviews.',
        'Look for recent model launches or outages — great conversation starters.',
      ],
      expectedOutcome: 'Research that turns generic applications into targeted, informed ones.',
    },
  ],
  'application-tailoring': [
    {
      id: 'aiml-att-tailor-application',
      title: 'Tailor One Application',
      objective: 'Customize your resume and cover letter for a specific ML role.',
      instructions: [
        'Take one ML job description. Highlight required tools and domain.',
        'Reorder resume bullets to lead with the most relevant project.',
        'Mirror job description keywords naturally in your summary.',
        'Reference a specific company problem in your cover letter.',
      ],
      completionCriteria: [
        'Resume bullets reordered to match the job description.',
        'Keywords from the JD appear naturally.',
        'Cover letter references a specific company problem.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'A master resume with swappable bullets speeds up tailoring.',
        'Tailoring should take under 15 minutes once your master resume is solid.',
        'Tailored applications get meaningfully higher response rates.',
      ],
      expectedOutcome: 'A tailored application that reads as written specifically for that role.',
    },
  ],
  'referral-strategy': [
    {
      id: 'aiml-rs-request-referral',
      title: 'Request Your First Referral',
      objective: 'Turn your network into warm introductions at target companies.',
      instructions: [
        'Identify 5+ contacts at target companies (1st or 2nd degree).',
        'Draft a short, specific ask: role, why you fit, a project or link.',
        'Send 3 referral requests this week.',
        'Follow up with a thank-you regardless of outcome.',
      ],
      completionCriteria: [
        '5+ potential referrers identified.',
        'At least 3 referral requests sent.',
        'A template ask message drafted and reused.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Referrals dramatically increase interview rates at most tech companies.',
        'Give the person an easy way to help: a one-paragraph blurb they can forward.',
        'Build the relationship first if it is a cold contact — ask for advice before asking for a referral.',
      ],
      expectedOutcome: 'Referral requests that turn cold applications into warm introductions.',
    },
  ],
};
