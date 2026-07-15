import type { TaskContent } from '@/core/task_content';

export const APPLICATION_TASKS: Record<string, TaskContent[]> = {
  'application-tracking': [
    {
      id: 'pm-at-build-tracker',
      title: 'Build Your PM Application Tracker',
      objective: 'Create a structured system to track every PM application and follow-up.',
      instructions: [
        'Create a spreadsheet or Notion database with columns: Company, Role, Domain, Date Applied, Stage, Follow-Up Date, Notes.',
        'Add a Stage pipeline: Applied → Phone Screen → Product Round → On-Site → Offer → Rejected.',
        'Import all current applications you have sent.',
        'Set a weekly 30-minute review slot to update stages and plan follow-ups.',
      ],
      completionCriteria: [
        'Tracker is live with all current applications imported',
        'Stage pipeline covers the full PM interview process',
        'Weekly review is scheduled in your calendar',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Add a "PM Round Type" column: product sense, estimation, technical, behavioral — useful for prep.',
        'Track time between stages to identify bottlenecks in your funnel.',
        'Good PMs analyze data. Analyze your own job search funnel the same way.',
      ],
      expectedOutcome: 'A PM job search tracker that gives you full pipeline visibility and never misses a follow-up.',
    },
  ],
  'cover-letter': [
    {
      id: 'pm-cl-product-cover',
      title: 'Write a Product-First Cover Letter',
      objective: 'Write a cover letter that demonstrates PM thinking about the company product.',
      instructions: [
        'Spend 20 minutes using the target company product or reading user reviews.',
        'Identify one user pain point or opportunity you noticed.',
        'Write 3 paragraphs: (1) their user problem, (2) how your PM experience is relevant, (3) specific ask.',
        'Keep under 300 words. No generic opening line ("I am excited to apply...").',
      ],
      completionCriteria: [
        'Cover letter references a specific company product, feature, or user',
        'One concrete PM experience connected to their product domain',
        'Opens with insight, not with "I am applying for..."',
      ],
      estimatedMinutes: 25,
      difficulty: 2,
      tips: [
        'Reading App Store or G2 reviews for 10 minutes gives you real user language to use.',
        'The best PM cover letters read like a mini product teardown with a job application attached.',
        'Hiring managers remember candidates who clearly used their product.',
      ],
      expectedOutcome: 'A product-first cover letter that signals PM curiosity and competitive intelligence.',
    },
  ],
  'follow-up-strategy': [
    {
      id: 'pm-fs-draft-templates',
      title: 'Draft 3 PM Follow-Up Templates',
      objective: 'Create a follow-up system that keeps you visible without being annoying.',
      instructions: [
        'Write Template 1: "After applying" — sent 5-7 days post-application if no response.',
        'Write Template 2: "After phone screen" — sent same day as the interview.',
        'Write Template 3: "After silence" — sent 14 days after last contact with added value.',
        'Add personalization placeholders: [Company], [Product], [Specific topic discussed].',
      ],
      completionCriteria: [
        '3 follow-up templates written and saved',
        'Each template is under 100 words',
        'Template 3 adds value: new case study, product observation, or relevant article',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Value-add follow-ups work best: "I shipped a teardown of your checkout flow after our call."',
        'Never follow up more than 3 times. After that, move on.',
        'Reference something specific from the job posting or your earlier conversation.',
      ],
      expectedOutcome: 'A PM follow-up system that maintains visibility without appearing desperate.',
    },
  ],
  'application-volume': [
    {
      id: 'pm-av-set-weekly-goal',
      title: 'Set a Weekly PM Application Goal',
      objective: 'Define and commit to a sustainable weekly application rate.',
      instructions: [
        'Calculate how many tailored PM applications you can realistically write per week.',
        'Set a minimum: 5 quality applications per week (not 20 generic ones).',
        'Block 3 dedicated job search sessions in your calendar this week.',
        'Track your actual output vs goal in your tracker at the end of week 1.',
      ],
      completionCriteria: [
        'Weekly application goal is set and written down',
        '3 job search sessions scheduled in calendar',
        'First week actual output is tracked',
      ],
      estimatedMinutes: 15,
      difficulty: 1,
      tips: [
        'Tuesday-Thursday are peak recruiter activity days. Prioritize applying then.',
        'Batch research on Sunday: identify 10 companies, research 5 deeply, apply to the 5 best-fit.',
        'Quality over quantity: one targeted PM application beats five generic ones.',
      ],
      expectedOutcome: 'A sustainable PM application rhythm that builds pipeline without burning out.',
    },
  ],
  'company-research': [
    {
      id: 'pm-cr-deep-dive',
      title: 'Do a PM Company Deep Dive',
      objective: 'Research one target company thoroughly enough to pass a product sense interview.',
      instructions: [
        'Use the product for 30 minutes: note UX friction, missing features, and strengths.',
        'Read their product blog, release notes, and recent job postings for roadmap signals.',
        'Read 20+ App Store or G2 reviews. Note recurring user pain points.',
        'Write a 1-page summary: product, users, north star metric hypothesis, one opportunity.',
      ],
      completionCriteria: [
        '1-page company product summary written',
        'North star metric hypothesis stated',
        'One product opportunity identified with supporting evidence',
      ],
      estimatedMinutes: 45,
      difficulty: 2,
      tips: [
        'Interviewers notice candidates who clearly used and thought about the product.',
        'Crunchbase and Sacra reveal funding, growth trajectory, and competitive position.',
        'LinkedIn headcount growth is a proxy for company health and hiring urgency.',
      ],
      expectedOutcome: 'A company intelligence brief that powers your cover letter, application, and interview answers.',
    },
  ],
  'application-tailoring': [
    {
      id: 'pm-appt-keyword-tailor',
      title: 'Tailor One PM Application End-to-End',
      objective: 'Create a fully tailored PM application: customized resume + cover letter for one role.',
      instructions: [
        'Choose one target PM role.',
        'Extract 10 keywords from the job posting.',
        'Update your resume to naturally include missing keywords in current bullets.',
        'Write a cover letter that references their specific product and a user pain point you observed.',
      ],
      completionCriteria: [
        'Resume has at least 8 of 10 posting keywords',
        'Cover letter mentions the specific product by name',
        'Application submitted within 48 hours of tailoring',
      ],
      estimatedMinutes: 35,
      difficulty: 2,
      tips: [
        'Mirror exact phrases: "cross-functional alignment" not just "teamwork".',
        'If posting says "0-to-1 experience", your cover letter should use that exact phrase.',
        'Create a master PM resume and create tailored versions from it — do not start from scratch each time.',
      ],
      expectedOutcome: 'A fully tailored PM application that converts significantly better than generic submissions.',
    },
  ],
  'portfolio-submission': [
    {
      id: 'pm-ps-add-link',
      title: 'Add Your Portfolio to Every PM Application',
      objective: 'Ensure your PM portfolio link appears in your resume, cover letter, and LinkedIn.',
      instructions: [
        'Confirm your portfolio link is live and publicly accessible.',
        'Add the link to: resume header, cover letter signature, LinkedIn Featured and About.',
        'Test the link from a private browser on both desktop and mobile.',
        'Add a 1-sentence description next to the link: what type of case studies it contains.',
      ],
      completionCriteria: [
        'Portfolio link appears in 3+ places in your application materials',
        'Link works correctly on mobile',
        'Portfolio loads in under 3 seconds',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Use a short URL: notion.so/yourname or yourname.com/product — long URLs look messy.',
        'A password-protected portfolio is better than no portfolio, but public is always preferred.',
        'Mention your portfolio in your follow-up emails as a resource for the hiring team.',
      ],
      expectedOutcome: 'A PM portfolio that appears consistently across all application touchpoints.',
    },
  ],
  'referral-strategy': [
    {
      id: 'pm-rs-map-network',
      title: 'Map Your PM Referral Network',
      objective: 'Identify people in your network who can refer you to PM roles at target companies.',
      instructions: [
        'List your 10 target companies.',
        'For each, search LinkedIn for 1st or 2nd degree connections who work there.',
        'Filter for: PMs, engineers you know, designers, former colleagues who moved there.',
        'Draft a personalized outreach message for each connection. Ask for 15 minutes of advice.',
      ],
      completionCriteria: [
        '10 target companies listed',
        'At least 5 have identified connections',
        '5 outreach messages drafted and sent',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Ask for advice, not a referral. Advice conversations naturally lead to referrals.',
        'Warm LinkedIn messages work: "We worked together at X — I am exploring PM roles at [Company]."',
        'Always follow up with your portfolio after a coffee chat.',
      ],
      expectedOutcome: 'An active PM referral pipeline that bypasses ATS at your top target companies.',
    },
  ],
};
