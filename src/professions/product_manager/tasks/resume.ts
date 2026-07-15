import type { TaskContent } from '@/core/task_content';

export const RESUME_TASKS: Record<string, TaskContent[]> = {
  'positioning-clarity': [
    {
      id: 'pm-pc-define-role',
      title: 'Define Your PM Positioning',
      objective: 'Create a precise positioning statement for your product management job search.',
      instructions: [
        'Open 5 current Product Manager job postings on LinkedIn or Indeed.',
        'Identify the product domain: B2B SaaS, consumer, marketplace, platform, growth, mobile.',
        'Identify the company stage signals: seed, Series A-C, scale-up, enterprise, FAANG.',
        'Write one sentence: "PM specializing in [domain] for [company type] at [level]."',
      ],
      completionCriteria: [
        'Positioning statement is under 20 words',
        'Product domain is named (not just "software")',
        '3 target companies identified that match the positioning',
      ],
      estimatedMinutes: 15,
      difficulty: 1,
      tips: [
        'Avoid generic titles like "Product Professional" — be specific about domain.',
        'Check LinkedIn profiles of PMs at your target companies.',
        'B2B SaaS PM and consumer PM require very different interview prep.',
      ],
      expectedOutcome: 'A clear positioning statement that guides your resume, LinkedIn, and interview prep.',
    },
    {
      id: 'pm-pc-research-market',
      title: 'Research the PM Job Market',
      objective: 'Understand current PM hiring trends in your target domain.',
      instructions: [
        'Search "Product Manager [your domain]" on LinkedIn, Indeed, and Levels.fyi.',
        'Filter by your experience level (APM / PM / Senior PM).',
        'Note the top 5 required skills and tools across postings.',
        'Identify the typical PM compensation range for your level and location.',
      ],
      completionCriteria: [
        '5 job postings analyzed in detail',
        'Top 5 required PM skills documented',
        'Salary range identified for your target level',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Look for which companies mention SQL as a requirement — this signals a data-heavy PM role.',
        'Note "Technical PM" vs "Business PM" signals in each posting.',
        'Save the 5 best-fit postings for application tailoring later.',
      ],
      expectedOutcome: 'Market intelligence that shapes your PM skill development and targeting strategy.',
    },
  ],
  'pm-impact-bullets': [
    {
      id: 'pm-ib-rewrite-bullets',
      title: 'Rewrite 5 Resume Bullets with PM Impact',
      objective: 'Transform responsibility-focused bullets into outcome-driven PM statements.',
      instructions: [
        'Open your current resume and find 5 bullets that describe activities.',
        'Rewrite each using: "Led [initiative] → resulting in [metric] → enabling [business outcome]".',
        'Examples: "Shipped onboarding redesign → +18% activation → $1.2M ARR uplift".',
        'Ensure every bullet has at least one number: %, dollar amount, time, or user count.',
      ],
      completionCriteria: [
        '5 bullets rewritten with measurable PM outcomes',
        'Each bullet shows ownership ("Led", "Defined", "Shipped"), not just participation',
        'At least one dollar or percentage metric in each',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'If you lack exact metrics, estimate conservatively and note "approx." to be honest.',
        'Use PM verbs: shipped, launched, defined, prioritized, negotiated, drove.',
        'Outcomes beat activities: "Defined roadmap" is weak; "Shipped 3 features in Q1 → +12% retention" is strong.',
      ],
      expectedOutcome: 'A resume that proves product impact and ownership, not just process management.',
    },
    {
      id: 'pm-ib-impact-framework',
      title: 'Build Your PM Impact Framework',
      objective: 'Document the business outcomes you have driven across all PM roles.',
      instructions: [
        'List every product you have owned or contributed to significantly.',
        'For each product, identify: north star metric, metric movement, and business outcome.',
        'Find the 3 most impressive outcomes across your career.',
        'Write 1 sentence per outcome: what you did, the metric, the business result.',
      ],
      completionCriteria: [
        '3 career-defining PM outcomes documented',
        'Each outcome has a specific metric with before/after values',
        'Business context is clear (why the metric mattered)',
      ],
      estimatedMinutes: 25,
      difficulty: 2,
      tips: [
        'Retention improvement is often worth more than feature count in PM interviews.',
        'Connect metrics to revenue: "30% retention improvement → estimated $2M ARR retained".',
        'If you cannot recall exact numbers, document the direction and magnitude.',
      ],
      expectedOutcome: 'A personal PM impact inventory that powers both resume bullets and interview stories.',
    },
  ],
  'resume-structure': [
    {
      id: 'pm-rs-reorganize',
      title: 'Reorganize Your PM Resume Structure',
      objective: 'Ensure your most impressive product work appears where recruiters look first.',
      instructions: [
        'Print or display your current resume.',
        'Circle your 3 biggest PM achievements.',
        'Check: do all 3 appear in the top half of page 1?',
        'Reorder sections and bullets until the biggest wins are visible within 6 seconds.',
      ],
      completionCriteria: [
        'Biggest product achievement is the first bullet under the most recent role',
        'Skills section lists product tools: Jira, Amplitude, Figma, SQL basics',
        'No role description buries wins under a wall of responsibilities',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Move "Responsibilities:" wording to "Key Achievements:" — it changes the signal.',
        'For senior PM roles, education should be below experience.',
        'Condense old roles to 2 bullets each to give new work more space.',
      ],
      expectedOutcome: 'A PM resume structure that surfaces your biggest wins in the first 6-second scan.',
    },
  ],
  'resume-ats': [
    {
      id: 'pm-ats-keyword-match',
      title: 'Run a PM ATS Keyword Match',
      objective: 'Ensure your resume contains the keywords PM recruiters and ATS systems scan for.',
      instructions: [
        'Copy text from 3 target PM job postings.',
        'List the top 15 repeated keywords: roadmap, OKR, stakeholder, A/B testing, GTM, etc.',
        'Compare against your resume. Identify missing keywords.',
        'Naturally insert missing keywords into your existing bullets — never keyword-stuff.',
      ],
      completionCriteria: [
        '15 PM keywords identified from target postings',
        'At least 10 appear naturally in your resume',
        'Resume passes plain-text paste test (no formatting breaks)',
      ],
      estimatedMinutes: 25,
      difficulty: 2,
      tips: [
        'Exact match matters: "go-to-market strategy" not just "strategy".',
        'Include both abbreviated and full forms: "OKR (Objectives and Key Results)".',
        'Tools section is the easiest place to add missing keywords: Amplitude, Mixpanel, Jira, Confluence.',
      ],
      expectedOutcome: 'A PM resume that consistently passes ATS screening and reaches human reviewers.',
    },
  ],
  'product-portfolio': [
    {
      id: 'pm-pp-write-case-study',
      title: 'Write Your First PM Case Study',
      objective: 'Document one product decision as a publishable case study.',
      instructions: [
        'Choose one product decision you owned: a feature launch, pivot, or kill.',
        'Write sections: Context → Problem → Data → Options → Decision → Outcome → Lessons.',
        'Keep total length under 800 words. Use headers and bullet points.',
        'Publish to Notion, Medium, or a personal site. Get a public link.',
      ],
      completionCriteria: [
        'Case study is published and publicly accessible',
        'Includes at least one metric showing before/after',
        'Decision rationale is explained, not just the outcome',
      ],
      estimatedMinutes: 60,
      difficulty: 3,
      tips: [
        'Failures make better case studies than wins — show what you learned.',
        'Anonymize company data if needed. Focus on thinking process, not proprietary details.',
        'Include a "What I would do differently" section — it signals PM maturity.',
      ],
      expectedOutcome: 'A published PM case study you can share in every application and interview.',
    },
    {
      id: 'pm-pp-portfolio-page',
      title: 'Build Your PM Portfolio Page',
      objective: 'Create a single page that showcases your best product work.',
      instructions: [
        'Choose a platform: Notion (easiest), personal site, or a PDF deck.',
        'Add 2-3 case studies with thumbnails, 1-sentence summaries, and links.',
        'Add a short bio (50 words) and your email for contact.',
        'Test the link on mobile and send to one person for feedback.',
      ],
      completionCriteria: [
        'Portfolio page is live with a shareable URL',
        '2+ case studies visible on the page',
        'Page loads in under 3 seconds on mobile',
      ],
      estimatedMinutes: 45,
      difficulty: 2,
      tips: [
        'Simple is better. A clean Notion page beats a broken custom site.',
        'Add a password option only for confidential work — public is always better.',
        'Link from LinkedIn Featured section and the top of your resume.',
      ],
      expectedOutcome: 'A PM portfolio page that you confidently share in every job application.',
    },
  ],
  'metrics-ownership': [
    {
      id: 'pm-mo-map-metrics',
      title: 'Map Your Metrics Ownership',
      objective: 'Document every metric you owned or significantly influenced in past roles.',
      instructions: [
        'List every PM role you have held.',
        'For each role, write: north star metric, 2 supporting metrics, and your contribution.',
        'Mark each as: "owned" (responsible for moving it) or "influenced" (contributed to).',
        'Identify your 3 strongest metric stories for interview use.',
      ],
      completionCriteria: [
        'All roles have metrics documented',
        'Owned vs influenced distinction is clear',
        '3 strong metric stories identified for interviews',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Interviewers will ask "what was the metric" for every story. Know them cold.',
        'If you did not own a metric directly, explain what you contributed and how it moved.',
        'Before/after values are more compelling than absolute numbers alone.',
      ],
      expectedOutcome: 'A personal metrics inventory that powers both resume bullets and interview answers.',
    },
  ],
  'resume-summary': [
    {
      id: 'pm-rs-write-summary',
      title: 'Write Your PM Resume Summary',
      objective: 'Create a 2-3 line summary that hooks PM recruiters in the first 3 seconds.',
      instructions: [
        'Write a draft: "[Level] PM with [X years] driving [metric] for [product type/audience]."',
        'Add one product philosophy or approach that makes you distinctive.',
        'Remove all buzzwords: passionate, visionary, innovative, detail-oriented.',
        'Read aloud. If it sounds generic, rewrite it until it sounds like you specifically.',
      ],
      completionCriteria: [
        'Summary is 2-3 lines maximum',
        'Mentions domain, a metric, and your target company type',
        'No buzzwords or filler phrases',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Tailor for each application: swap domain or company type to match the job.',
        'Test with a non-PM friend: can they explain what you do after reading it?',
        'Your summary should be the written version of your 30-second phone intro.',
      ],
      expectedOutcome: 'A sharp PM summary that immediately signals your product focus and level.',
    },
  ],
};
