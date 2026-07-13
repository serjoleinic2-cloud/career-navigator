import type { TaskContent } from '@/core/task_content';

export const APPLICATION_TASKS: Record<string, TaskContent[]> = {
  'application-tracking': [
    {
      id: 'da-at-create-tracker',
      title: 'Create Application Tracker',
      objective: 'Build a system to track your Data Analyst job applications.',
      instructions: [
        'Create a spreadsheet with columns: Company, Role, Date Applied, Status, Follow-up, Notes.',
        'Enter 5 applications you have already submitted.',
        'Set a weekly review reminder.',
        'Add a "Response Rate" formula: (Responses / Applications) * 100.'
      ],
      completionCriteria: [
        'Tracker has 7+ columns.',
        '5+ applications entered.',
        'Response rate formula works.'
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Use Google Sheets for mobile access.',
        'Color-code by status: green = offer, yellow = interview, red = rejected.',
        'Track which channels work: LinkedIn, referrals, job boards.'
      ],
      expectedOutcome: 'A tracking system that reveals patterns in your job search.',
    },
  ],
  'portfolio-submission': [
    {
      id: 'da-pk-polish-readme',
      title: 'Polish One Project README',
      objective: 'Transform a project folder into a recruiter-friendly portfolio piece.',
      instructions: [
        'Pick your best project on GitHub or Kaggle.',
        'Write README sections: Overview, Data, Method, Results, How to Run.',
        'Add 2-3 screenshots or charts.',
        'Include a link to a live dashboard or notebook.'
      ],
      completionCriteria: [
        'README has all 5 sections.',
        '2+ visuals included.',
        'Live demo or notebook link works.'
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Use real data. Avoid iris, titanic, or MNIST unless significantly enhanced.',
        'Explain the "so what?" in one sentence.',
        'Keep it under 500 words.'
      ],
      expectedOutcome: 'A project README that recruiters can evaluate in under 2 minutes.',
    },
  ],
  'sql-test-prep': [
    {
      id: 'da-stp-practice-sql',
      title: 'Practice SQL Interview Questions',
      objective: 'Master the SQL patterns that appear in every DA interview.',
      instructions: [
        'Complete 10 SQL problems on HackerRank or Mode Analytics.',
        'Focus: JOINs, GROUP BY, window functions, CTEs.',
        'Time yourself: basic query under 3 minutes, complex under 10.',
        'Explain your solution aloud as you write.'
      ],
      completionCriteria: [
        '10 problems completed.',
        'Window functions practiced (ROW_NUMBER, RANK, LEAD/LAG).',
        'Can explain a 3-table JOIN in plain English.'
      ],
      estimatedMinutes: 60,
      difficulty: 3,
      tips: [
        'Practice writing SQL without auto-complete.',
        'Learn to optimize: EXPLAIN plans, indexes, query cost.',
        'Common pitfalls: forgetting to handle NULLs, wrong JOIN type.'
      ],
      expectedOutcome: 'SQL fluency that passes live coding interviews.',
    },
  ],
  'take-home-strategy': [
    {
      id: 'da-ths-complete-sample',
      title: 'Complete a Sample Take-Home',
      objective: 'Practice the end-to-end analytical process under time constraints.',
      instructions: [
        'Find a public dataset (Kaggle, data.gov, or company blog).',
        'Define a business question in 2 sentences.',
        'Clean, analyze, and visualize the data in under 4 hours.',
        'Present findings in a 5-slide deck or 1-page memo.'
      ],
      completionCriteria: [
        'Business question is clear and answerable.',
        'Analysis includes cleaning, EDA, and insight.',
        'Presentation has 5 slides or 1 page max.'
      ],
      estimatedMinutes: 240,
      difficulty: 4,
      tips: [
        'Time-box strictly. Interviewers evaluate process, not perfection.',
        'Document assumptions. State limitations. Suggest next steps.',
        'A mediocre analysis with great communication beats a perfect analysis with poor communication.'
      ],
      expectedOutcome: 'A take-home template and practice that prepares you for real assignments.',
    },
  ],
  'company-research': [
    {
      id: 'da-cr-research-three',
      title: 'Research 3 Target Companies',
      objective: 'Build company-specific knowledge that tailors your applications.',
      instructions: [
        'Pick 3 companies. Find their data stack, metrics, and recent analytics blog posts.',
        'Identify their key data challenges: growth, retention, fraud, etc.',
        'Find 2 data team members on LinkedIn.',
        'Write one paragraph per company: why your skills fit their needs.'
      ],
      completionCriteria: [
        'Data stack identified for all 3 companies.',
        'Key metrics and challenges documented.',
        '2+ team members found per company.'
      ],
      estimatedMinutes: 45,
      difficulty: 2,
      tips: [
        'Read company engineering blogs. Look for data infrastructure posts.',
        'Glassdoor reviews often mention data tools and team culture.',
        'Use Crunchbase for funding stage and growth metrics.'
      ],
      expectedOutcome: 'Company-specific knowledge that turns generic applications into tailored ones.',
    },
  ],
  'application-tailoring': [
    {
      id: 'da-at-tailor-resume',
      title: 'Tailor Resume for One Role',
      objective: 'Practice rapid resume customization for a specific Data Analyst job.',
      instructions: [
        'Pick one job description. Highlight required skills and tools.',
        'Reorder your resume bullets to match the JD priority.',
        'Mirror JD language in your summary and bullets.',
        'Write a cover letter referencing a specific company metric or challenge.'
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
        'Do not lie about skills. Emphasize relevant ones.',
        'A tailored application takes 15-20 minutes. Batch similar roles.'
      ],
      expectedOutcome: 'A tailored application with 3x higher response rate than generic ones.',
    },
  ],
  'referral-strategy': [
    {
      id: 'da-rs-request-info',
      title: 'Request 2 Informational Interviews',
      objective: 'Build warm connections that lead to referrals.',
      instructions: [
        'Find 2 data analysts at target companies on LinkedIn.',
        'Send a personalized message: "I admire your work on X. Would you share advice on breaking into Y?"',
        'Prepare 5 questions for the call.',
        'Send a thank-you note within 24 hours.'
      ],
      completionCriteria: [
        '2 personalized requests sent.',
        'At least 1 call scheduled.',
        'Thank-you note sent after the call.'
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Ask for advice, not a job. People love giving advice.',
        'Prepare thoughtful questions about their career path and company culture.',
        'After the call, ask: "Would you be comfortable referring me if a role opens up?"'
      ],
      expectedOutcome: 'Warm connections that bypass the ATS and lead to interviews.',
    },
  ],
  'cover-letter': [
    {
      id: 'da-cl-template',
      title: 'Write a Reusable Cover Letter Template',
      objective: 'Build a cover letter framework you can tailor quickly for each application.',
      instructions: [
        'Structure: hook (1-2 sentences), relevant experience (2-3 sentences), why this company (1-2 sentences), close.',
        'Draft the hook around one concrete analytics result, not a generic opener.',
        'Write the "why this company" section with a placeholder to customize per application.',
        'Keep total length under 250 words.'
      ],
      completionCriteria: [
        'Template drafted with all 4 sections.',
        'Hook references a specific, quantified result.',
        'Under 250 words.'
      ],
      estimatedMinutes: 35,
      difficulty: 2,
      tips: [
        'Avoid restating the resume — the cover letter should add context, not repeat facts.',
        'Mention a specific product, dataset, or business problem from the company to show research.',
        'Skip the cover letter entirely for postings that do not request one, unless it adds real value.'
      ],
      expectedOutcome: 'A cover letter template that takes 5 minutes to tailor, not 30.',
    },
  ],
  'follow-up-strategy': [
    {
      id: 'da-fu-cadence',
      title: 'Build a Follow-Up Cadence',
      objective: 'Create a consistent schedule for following up on applications without seeming pushy.',
      instructions: [
        'Define a cadence: follow up at day 7 if no response, then day 14.',
        'Draft a short follow-up email template reaffirming interest and asking for status.',
        'Set calendar reminders for each application submitted.',
        'Stop following up after 2 attempts with no response.'
      ],
      completionCriteria: [
        'Cadence defined (e.g. day 7 / day 14).',
        'Follow-up email template drafted.',
        'Reminder system in place (calendar or tracker).'
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Keep follow-ups short — 3-4 sentences, no guilt-tripping tone.',
        'A follow-up is also a chance to add a new relevant detail (a project you just finished).',
        'Silence after 2 follow-ups usually means move on — protect your time.'
      ],
      expectedOutcome: 'A repeatable follow-up habit that recovers stalled applications.',
    },
  ],
  'application-volume': [
    {
      id: 'da-av-weekly-target',
      title: 'Set a Sustainable Weekly Application Target',
      objective: 'Balance quality and quantity so applications don\'t stall or burn you out.',
      instructions: [
        'Set a weekly target: e.g. 10 tailored applications, not 50 generic ones.',
        'Split time: 70% on tailored applications, 30% on networking/referrals.',
        'Track applications sent vs. responses in your tracker weekly.',
        'Adjust the target after 2 weeks based on response rate.'
      ],
      completionCriteria: [
        'Weekly target set and written down.',
        'Time split defined between applying and networking.',
        'First week tracked and reviewed.'
      ],
      estimatedMinutes: 15,
      difficulty: 1,
      tips: [
        'Quality beats volume: 10 tailored applications usually outperform 50 generic ones.',
        'A response rate under 5% after 20+ applications signals a resume or targeting problem — revisit those first.',
        'Batch applying (2-hour blocks) is more sustainable than trickling one a day.'
      ],
      expectedOutcome: 'A steady, sustainable application pace instead of burnout or stalling.',
    },
  ],
};
