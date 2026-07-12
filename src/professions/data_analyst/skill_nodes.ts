import type { SkillNode } from '@/core/skill_state';
import { RESUME_TASKS } from './tasks/resume';
import { LINKEDIN_TASKS } from './tasks/linkedin';
import { APPLICATION_TASKS } from './tasks/applications';
import { INTERVIEW_TASKS } from './tasks/interviews';
import { OFFER_TASKS } from './tasks/offer';

export const RESUME_SKILL_NODES: SkillNode[] = [
  {
    id: 'positioning-clarity',
    skill: 'Positioning Clarity',
    domain: 'Resume',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 35,
    difficulty: 1,
    signals: [
      'You can describe your target data role in one clear sentence',
      'Your resume headline matches "Data Analyst" or similar',
      'Your SQL and visualization tools align with job postings'
    ],
    advice: {
      awareness: 'A data resume without clear positioning forces recruiters to guess your SQL level and tool stack.',
      understanding: 'Recruiters scan for specific tools: SQL, Excel, Tableau, Python, Power BI.',
      application: 'Analyze 5 data analyst job postings and extract common requirements.',
      readiness: 'You can state your target role, SQL proficiency, and primary BI tool in one sentence.',
      execution: 'Every resume section reinforces the same data analyst positioning.',
      confidence: 'A focused resume answers "Can this person analyze our data?" immediately.'
    },
    tasks: RESUME_TASKS['positioning-clarity'] || [],
  },
  {
    id: 'data-storytelling',
    skill: 'Data Storytelling',
    domain: 'Resume',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 45,
    difficulty: 2,
    signals: [
      'Your resume shows business impact, not just tools used',
      'You can frame a project as "saved $X" or "improved Y by Z%"',
      'Bullet points follow the Action-Metric-Outcome format'
    ],
    advice: {
      awareness: 'Listing tools is not enough. Recruiters want to see the business value you created.',
      understanding: 'Data analysts who communicate impact get higher offers than those who only list SQL.',
      application: 'Rewrite 3 resume bullets to include metrics: percentage, dollar amount, or time saved.',
      readiness: 'Every project on your resume has at least one quantified outcome.',
      execution: 'Replace "Used SQL" with "Used SQL to reduce reporting time by 40%".',
      confidence: 'Impact-focused resumes stand out in a sea of tool lists.'
    },
    tasks: RESUME_TASKS['data-storytelling'] || [],
  },
  {
    id: 'resume-structure',
    skill: 'Resume Structure',
    domain: 'Resume',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 30,
    difficulty: 1,
    signals: [
      'Your resume has clear sections: Summary, Skills, Experience, Projects, Education',
      'Each section has consistent formatting',
      'The most relevant information appears in the top third'
    ],
    advice: {
      awareness: 'A poorly structured resume buries your SQL skills under irrelevant experience.',
      understanding: 'Recruiters spend 6 seconds on the first scan. Structure controls what they see.',
      application: 'Reorder sections so Skills and Projects appear before Education if you are junior.',
      readiness: 'A recruiter can find your SQL level and top BI tool within 6 seconds.',
      execution: 'Use consistent formatting: same date format, same bullet style, same tense.',
      confidence: 'Clean structure signals professionalism before anyone reads a word.'
    },
    tasks: RESUME_TASKS['resume-structure'] || [],
  },
  {
    id: 'resume-ats',
    skill: 'ATS Optimization',
    domain: 'Resume',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 35,
    difficulty: 2,
    signals: [
      'Your resume uses standard section headings',
      'No tables, images, or unusual fonts that confuse parsers',
      'Keywords from job postings appear naturally in your text'
    ],
    advice: {
      awareness: '70% of resumes are rejected by ATS before a human sees them.',
      understanding: 'ATS parsers look for keywords in standard sections: Skills, Experience, Summary.',
      application: 'Paste your resume into a plain text editor. If it looks broken, ATS will struggle.',
      readiness: 'Your resume passes ATS screening for "SQL", "Excel", "Tableau", "data analysis".',
      execution: 'Use exact keywords from job postings: "data visualization" not just "made charts".',
      confidence: 'An ATS-friendly resume reaches human recruiters consistently.'
    },
    tasks: RESUME_TASKS['resume-ats'] || [],
  },
  {
    id: 'technical-skills',
    skill: 'Technical Skills',
    domain: 'Resume',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 35,
    difficulty: 2,
    signals: [
      'Your skills section lists SQL, Excel, and at least one BI tool',
      'Skill levels are honest (Beginner/Intermediate/Advanced)',
      'You can explain each skill in an interview'
    ],
    advice: {
      awareness: 'A vague "Proficient in data tools" tells recruiters nothing.',
      understanding: 'Recruiters match specific tools to their tech stack: PostgreSQL, BigQuery, Looker.',
      application: 'List tools by category: Query (SQL), Visualization (Tableau), Analysis (Excel/Python).',
      readiness: 'You can explain your SQL level and give an example query for each tool listed.',
      execution: 'Remove outdated tools. No one needs "MS Access 2003" in 2026.',
      confidence: 'A precise skills section attracts the right roles and filters out mismatches.'
    },
    tasks: RESUME_TASKS['technical-skills'] || [],
  },
  {
    id: 'projects-portfolio',
    skill: 'Projects Portfolio',
    domain: 'Resume',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 45,
    difficulty: 2,
    signals: [
      'You have 2-3 data projects with public links (GitHub, Tableau Public)',
      'Each project has a clear problem, dataset, analysis, and insight',
      'Projects use real or realistic datasets, not iris or titanic'
    ],
    advice: {
      awareness: 'Without projects, junior data analysts have no proof of skills.',
      understanding: 'A portfolio project is worth more than a certificate. It shows end-to-end thinking.',
      application: 'Pick one dataset you care about. Clean it, analyze it, visualize it, publish it.',
      readiness: 'You can walk through your project in 3 minutes: problem, approach, insight, impact.',
      execution: 'Host on GitHub with README. Include SQL queries, visualizations, and a short write-up.',
      confidence: 'Projects turn "I learned SQL" into "Here is what I built with SQL".'
    },
    tasks: RESUME_TASKS['projects-portfolio'] || [],
  },
  {
    id: 'resume-summary',
    skill: 'Resume Summary',
    domain: 'Resume',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 35,
    difficulty: 1,
    signals: [
      'Your summary is 2-3 lines and mentions SQL + BI tools + business impact',
      'It does not use buzzwords like "passionate" or "hardworking"',
      'A recruiter can understand your value in one glance'
    ],
    advice: {
      awareness: 'A generic summary wastes the most valuable space on your resume.',
      understanding: 'The summary is your elevator pitch. It must answer "Why hire this analyst?"',
      application: 'Write: "Data Analyst with X years using SQL and Tableau to drive Y business outcome."',
      readiness: 'Your summary contains role, tools, and impact — no filler words.',
      execution: 'Tailor the summary to each job posting by matching keywords.',
      confidence: 'A strong summary hooks recruiters in the first 3 seconds.'
    },
    tasks: RESUME_TASKS['resume-summary'] || [],
  },
];

export const LINKEDIN_SKILL_NODES: SkillNode[] = [
  {
    id: 'headline-authority',
    skill: 'Headline Authority',
    domain: 'LinkedIn',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 35,
    difficulty: 2,
    signals: [
      'Your headline says "Data Analyst" not just "Open to work"',
      'It includes your top BI tool or SQL specialty',
      'It fits within LinkedIn 220 character limit'
    ],
    advice: {
      awareness: 'A vague headline makes you invisible to data recruiters searching for "SQL analyst".',
      understanding: 'Recruiters search by keywords. Your headline is the #1 search field.',
      application: 'Write 3 headlines combining: role + tools + value proposition.',
      readiness: 'Your headline contains "Data Analyst" and at least one tool keyword.',
      execution: 'Test headlines by searching yourself on LinkedIn. Do you appear?',
      confidence: 'A keyword-rich headline puts you in recruiter search results daily.'
    },
    tasks: LINKEDIN_TASKS['headline-authority'] || [],
  },
  {
    id: 'about-section',
    skill: 'About Section',
    domain: 'LinkedIn',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 45,
    difficulty: 2,
    signals: [
      'Your About tells a data story, not just lists tools',
      'It includes a specific business problem you solved',
      'It ends with a clear call to action'
    ],
    advice: {
      awareness: 'An empty About section looks like a ghost profile.',
      understanding: 'The About section is your narrative. It connects tools to business outcomes.',
      application: 'Write 200 words: who you are, what data problems you solve, what you are looking for.',
      readiness: 'A stranger understands your data specialty after reading your About.',
      execution: 'Use the first 2 lines as a hook — they show before "see more".',
      confidence: 'A compelling About turns profile views into connection requests.'
    },
    tasks: LINKEDIN_TASKS['about-section'] || [],
  },
  {
    id: 'network-connections',
    skill: 'Network Connections',
    domain: 'LinkedIn',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 50,
    difficulty: 1,
    signals: [
      'You have 50+ connections in data analytics',
      'You engage weekly with posts from data leaders',
      'You send personalized connection requests'
    ],
    advice: {
      awareness: 'A small network limits your visibility to job opportunities.',
      understanding: 'Data analytics is a tight community. Referrals come from weak connections.',
      application: 'Connect with 5 data analysts, 3 hiring managers, 2 recruiters this week.',
      readiness: 'Your network includes people who could refer you to data roles.',
      execution: 'Comment thoughtfully on data posts. Visibility beats silence.',
      confidence: 'An active network surfaces jobs before they are posted publicly.'
    },
    tasks: LINKEDIN_TASKS['network-connections'] || [],
  },
  {
    id: 'linkedin-optimization',
    skill: 'Profile Optimization',
    domain: 'LinkedIn',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 45,
    difficulty: 2,
    signals: [
      'Your profile is 90%+ complete',
      'Skills section has SQL, Excel, Tableau endorsed',
      'Featured section shows your best project'
    ],
    advice: {
      awareness: 'An incomplete profile ranks lower in LinkedIn search.',
      understanding: 'LinkedIn algorithm favors complete profiles with recent activity.',
      application: 'Fill every section. Add skills. Request endorsements. Publish a project.',
      readiness: 'Your profile appears in recruiter searches for "Data Analyst SQL".',
      execution: 'Update your status weekly. Even a small post keeps you visible.',
      confidence: 'A complete, active profile generates inbound recruiter interest.'
    },
    tasks: LINKEDIN_TASKS['linkedin-optimization'] || [],
  },
  {
    id: 'profile-photo',
    skill: 'Profile Photo',
    domain: 'LinkedIn',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 35,
    difficulty: 1,
    signals: [
      'You have a professional headshot',
      'Your face takes up 60% of the frame',
      'The background is neutral or office-like'
    ],
    advice: {
      awareness: 'Profiles with photos get 21x more views than those without.',
      understanding: 'A photo builds trust before anyone reads your SQL skills.',
      application: 'Use a phone portrait mode against a plain wall. Dress business casual.',
      readiness: 'Your photo looks professional at thumbnail size (how recruiters see it).',
      execution: 'Smile naturally. Eye contact with camera. No sunglasses or group shots.',
      confidence: 'A good photo makes you memorable in a sea of generic profiles.'
    },
    tasks: LINKEDIN_TASKS['profile-photo'] || [],
  },
  {
    id: 'featured-content',
    skill: 'Featured Content',
    domain: 'LinkedIn',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 60,
    difficulty: 3,
    signals: [
      'Your Featured section shows a dashboard, SQL project, or case study',
      'Each item has a clear title and description',
      'Links are public and working'
    ],
    advice: {
      awareness: 'The Featured section is prime real estate for proof of skills.',
      understanding: 'Recruiters click Featured before scrolling to Experience.',
      application: 'Add your best Tableau dashboard, SQL project, or data blog post.',
      readiness: 'A recruiter can see your work in 1 click from your profile.',
      execution: 'Update Featured quarterly. Remove outdated projects.',
      confidence: 'Featured content turns a static profile into a living portfolio.'
    },
    tasks: LINKEDIN_TASKS['featured-content'] || [],
  },
  {
    id: 'recommendations',
    skill: 'Recommendations',
    domain: 'LinkedIn',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 35,
    difficulty: 1,
    signals: [
      'You have 2+ recommendations mentioning data analysis skills',
      'Recommendations are from managers or senior analysts',
      'Each recommendation is specific, not generic'
    ],
    advice: {
      awareness: 'Recommendations are social proof that you can do the work.',
      understanding: 'A specific recommendation ("Her SQL queries saved us 10 hours/week") beats "Great analyst".',
      application: 'Ask 3 former colleagues for recommendations. Provide a draft template.',
      readiness: 'Your recommendations mention specific tools and outcomes.',
      execution: 'Give recommendations first. Reciprocity increases response rate.',
      confidence: 'Strong recommendations reduce hiring manager risk perception.'
    },
    tasks: LINKEDIN_TASKS['recommendations'] || [],
  },
];

export const APPLICATION_SKILL_NODES: SkillNode[] = [
  {
    id: 'application-tracking',
    skill: 'Application Tracking',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 20,
    difficulty: 1,
    signals: [
      'You track every application in a spreadsheet or Notion',
      'You record company, role, date, status, and follow-up date',
      'You review your pipeline weekly'
    ],
    advice: {
      awareness: 'Without tracking, applications fall through cracks and follow-ups are missed.',
      understanding: 'Data analysts should analyze their own job search like any dataset.',
      application: 'Create a tracker with columns: Company, Role, Date, Status, SQL Test?, Notes.',
      readiness: 'You know exactly how many applications you sent and your response rate.',
      execution: 'Set a weekly review. Identify bottlenecks (no SQL test invites? Fix resume).',
      confidence: 'A tracked pipeline turns chaos into a measurable process.'
    },
    tasks: APPLICATION_TASKS['application-tracking'] || [],
  },
  {
    id: 'cover-letter',
    skill: 'Cover Letter',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 30,
    difficulty: 2,
    signals: [
      'Your cover letter mentions a specific company data challenge',
      'It connects your SQL skills to their business needs',
      'It is under 300 words and scannable'
    ],
    advice: {
      awareness: 'Generic cover letters signal generic interest.',
      understanding: 'A data-focused cover letter shows you researched their data stack.',
      application: 'Read the job posting. Find one data challenge. Explain how your SQL solves it.',
      readiness: 'Each cover letter is unique and mentions the company by name.',
      execution: 'Use a template: Hook (their challenge) + Proof (your SQL project) + Ask (interview).',
      confidence: 'A targeted cover letter doubles interview invitation rates.'
    },
    tasks: APPLICATION_TASKS['cover-letter'] || [],
  },
  {
    id: 'follow-up-strategy',
    skill: 'Follow-Up Strategy',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 20,
    difficulty: 1,
    signals: [
      'You follow up 5-7 days after applying',
      'Your follow-up is polite and adds value (new project, certification)',
      'You track responses and adjust timing'
    ],
    advice: {
      awareness: '80% of candidates never follow up. Those who do stand out.',
      understanding: 'A follow-up reminds recruiters you exist without being pushy.',
      application: 'Draft 3 follow-up templates: after applying, after interview, after no response.',
      readiness: 'You have a follow-up schedule and stick to it.',
      execution: 'Add value in each follow-up: "I just completed a Tableau dashboard on X topic."',
      confidence: 'Persistent but polite follow-up shows professionalism.'
    },
    tasks: APPLICATION_TASKS['follow-up-strategy'] || [],
  },
  {
    id: 'application-volume',
    skill: 'Application Volume',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 30,
    difficulty: 1,
    signals: [
      'You apply to 5-10 relevant roles per week',
      'Quality matches quantity: each application is tailored',
      'You track conversion rates (applications -> interviews)'
    ],
    advice: {
      awareness: 'Applying to 100 random jobs is less effective than 10 targeted ones.',
      understanding: 'Data analyst roles receive 200+ applications. Tailoring is the filter.',
      application: 'Set a weekly goal: 5 quality applications with customized cover letters.',
      readiness: 'Your application-to-interview rate is trackable and improving.',
      execution: 'Batch research on Sundays. Apply Tuesday-Thursday (peak recruiter activity).',
      confidence: 'Consistent volume with quality builds momentum.'
    },
    tasks: APPLICATION_TASKS['application-volume'] || [],
  },
  {
    id: 'company-research',
    skill: 'Company Research',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 45,
    difficulty: 2,
    signals: [
      'You know the company data stack before applying',
      'You understand their business model and KPIs',
      'You can name a specific data challenge they face'
    ],
    advice: {
      awareness: 'Applying blindly wastes time for you and the company.',
      understanding: 'Companies hire analysts who understand their business, not just SQL.',
      application: 'Research: data team size, tools used, recent data initiatives, KPIs.',
      readiness: 'You can explain why this company needs a data analyst right now.',
      execution: 'Use LinkedIn, company blog, Glassdoor, and job postings for research.',
      confidence: 'Deep research makes your application and interview answers specific.'
    },
    tasks: APPLICATION_TASKS['company-research'] || [],
  },
  {
    id: 'application-tailoring',
    skill: 'Application Tailoring',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 30,
    difficulty: 2,
    signals: [
      'Your resume keywords match each job posting',
      'Your cover letter references a specific company project',
      'You highlight relevant projects over generic experience'
    ],
    advice: {
      awareness: 'One-size-fits-all applications get one-size-fits-all rejections.',
      understanding: 'ATS and recruiters scan for keyword matches. Tailoring beats volume.',
      application: 'Mirror language from the job posting: "data visualization" not "making charts".',
      readiness: 'Each application feels custom-written for that specific role.',
      execution: 'Create 3 resume versions: SQL-heavy, Visualization-heavy, Business-heavy.',
      confidence: 'Tailored applications convert 3x better than generic ones.'
    },
    tasks: APPLICATION_TASKS['application-tailoring'] || [],
  },
  {
    id: 'portfolio-submission',
    skill: 'Portfolio Submission',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 30,
    difficulty: 2,
    signals: [
      'Your portfolio link is in every application',
      'It loads fast and works on mobile',
      'It showcases SQL, visualization, and business thinking'
    ],
    advice: {
      awareness: 'A broken or missing portfolio kills credibility instantly.',
      understanding: 'Portfolios prove you can do the work better than any resume bullet.',
      application: 'Host on GitHub, Tableau Public, or a personal site. Test on mobile.',
      readiness: 'A recruiter can view your best project in under 30 seconds.',
      execution: 'Include: problem, dataset, SQL queries, dashboard, insights, business impact.',
      confidence: 'A strong portfolio makes interviews easier — they have proof already.'
    },
    tasks: APPLICATION_TASKS['portfolio-submission'] || [],
  },
  {
    id: 'referral-strategy',
    skill: 'Referral Strategy',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 30,
    difficulty: 2,
    signals: [
      'You have asked 3+ people for referrals this month',
      'Your referral requests are specific and polite',
      'You offer value before asking (coffee chat, feedback)'
    ],
    advice: {
      awareness: 'Referred candidates are 15x more likely to be hired.',
      understanding: 'A warm introduction bypasses ATS and gets you a real conversation.',
      application: 'Identify 10 target companies. Find 1st or 2nd degree connections.',
      readiness: 'You have a referral request template and use it weekly.',
      execution: 'Build relationships first. Ask for advice, not jobs. Referrals follow naturally.',
      confidence: 'A strong network generates referrals without cold applications.'
    },
    tasks: APPLICATION_TASKS['referral-strategy'] || [],
  },
];

export const INTERVIEW_SKILL_NODES: SkillNode[] = [
  {
    id: 'interview-prep',
    skill: 'Interview Prep',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 30,
    difficulty: 2,
    signals: [
      'You have a structured prep plan with daily SQL practice',
      'You know the company interview format (phone, SQL test, case study)',
      'You have practiced explaining your projects aloud'
    ],
    advice: {
      awareness: 'Winging a data analyst interview guarantees failure.',
      understanding: 'Data interviews have 3 parts: SQL test, case study, behavioral. Prep for all.',
      application: 'Create a 2-week prep plan: SQL daily, case study weekly, behavioral stories ready.',
      readiness: 'You can solve a medium SQL problem in 15 minutes under pressure.',
      execution: 'Practice on LeetCode, HackerRank, StrataScratch. Time yourself.',
      confidence: 'Structured prep turns interview anxiety into predictable performance.'
    },
    tasks: INTERVIEW_TASKS['interview-prep'] || [],
  },
  {
    id: 'sql-technical-prep',
    skill: 'SQL Technical Prep',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 60,
    difficulty: 3,
    signals: [
      'You can write JOINs, subqueries, window functions without reference',
      'You explain your query logic clearly while coding',
      'You handle edge cases (NULLs, duplicates, date ranges)'
    ],
    advice: {
      awareness: 'SQL is the #1 tested skill in data analyst interviews.',
      understanding: 'Interviewers watch how you think, not just if the query runs.',
      application: 'Practice: JOINs, aggregations, window functions, CTEs, optimization.',
      readiness: 'You can whiteboard a 3-table JOIN with GROUP BY and HAVING.',
      execution: 'Explain your approach before coding. Test with sample data. Handle edge cases.',
      confidence: 'Solid SQL skills make you hirable at any data-driven company.'
    },
    tasks: INTERVIEW_TASKS['sql-technical-prep'] || [],
  },
  {
    id: 'case-study-prep',
    skill: 'Case Study Prep',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 45,
    difficulty: 3,
    signals: [
      'You can structure a business problem into data questions',
      'You propose metrics before diving into analysis',
      'You communicate insights with clear recommendations'
    ],
    advice: {
      awareness: 'Case studies test business thinking, not just SQL syntax.',
      understanding: 'Interviewers want to see: problem framing, metric selection, insight generation.',
      application: 'Practice 5 classic cases: churn, conversion, A/B test, funnel, cohort analysis.',
      readiness: 'You can walk through a case in 20 minutes: clarify, metric, analyze, recommend.',
      execution: 'Always start with "What is the business goal?" before writing any SQL.',
      confidence: 'Case study mastery separates analysts from query writers.'
    },
    tasks: INTERVIEW_TASKS['case-study-prep'] || [],
  },
  {
    id: 'interview-mindset',
    skill: 'Interview Mindset',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 30,
    difficulty: 1,
    signals: [
      'You view interviews as conversations, not interrogations',
      'You pause and think before answering hard questions',
      'You recover gracefully from mistakes'
    ],
    advice: {
      awareness: 'Anxiety kills performance. Mindset is a skill you can train.',
      understanding: 'Interviewers want you to succeed. They are looking for reasons to hire you.',
      application: 'Practice mock interviews. Record yourself. Review body language and filler words.',
      readiness: 'You enter interviews calm, curious, and ready to collaborate.',
      execution: 'Breathe before answering. It is okay to say "Let me think for a moment."',
      confidence: 'A calm analyst thinks clearly. A clear thinker writes better SQL.'
    },
    tasks: INTERVIEW_TASKS['interview-mindset'] || [],
  },
  {
    id: 'behavioral-prep',
    skill: 'Behavioral Prep',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 45,
    difficulty: 2,
    signals: [
      'You have 5 STAR stories ready (Situation, Task, Action, Result)',
      'Your stories include data and business impact',
      'You can adapt any story to different questions'
    ],
    advice: {
      awareness: 'Behavioral questions filter out candidates who cannot work in teams.',
      understanding: 'Data analysts collaborate with stakeholders. Soft skills matter.',
      application: 'Prepare stories for: conflict, failure, leadership, prioritization, learning.',
      readiness: 'Each story has a clear metric and shows growth.',
      execution: 'Use STAR format. Keep stories under 2 minutes. Practice aloud.',
      confidence: 'Strong behavioral answers build trust before you write a single query.'
    },
    tasks: INTERVIEW_TASKS['behavioral-prep'] || [],
  },
  {
    id: 'data-visualization-prep',
    skill: 'Visualization Prep',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 30,
    difficulty: 2,
    signals: [
      'You can critique a dashboard and suggest improvements',
      'You know when to use bar chart vs line chart vs scatter plot',
      'You design for the audience, not for beauty'
    ],
    advice: {
      awareness: 'Bad visualization hides insights. Good visualization reveals them.',
      understanding: 'Interviewers test if you can turn data into decisions, not just charts.',
      application: 'Practice critiquing dashboards. Redesign one bad chart per week.',
      readiness: 'You can explain why you chose a specific chart type for a specific insight.',
      execution: 'Always ask: Who is the audience? What decision do they need to make?',
      confidence: 'Visualization skills make your analysis actionable, not just descriptive.'
    },
    tasks: INTERVIEW_TASKS['data-visualization-prep'] || [],
  },
  {
    id: 'on-site-prep',
    skill: 'On-Site Prep',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 30,
    difficulty: 1,
    signals: [
      'You know the interview schedule and who you will meet',
      'You have questions prepared for each interviewer',
      'You have printed copies of your resume and portfolio links'
    ],
    advice: {
      awareness: 'On-site interviews are marathons, not sprints. Energy management is key.',
      understanding: 'You will meet 4-6 people. Each evaluates different skills. Prep for all.',
      application: 'Research each interviewer on LinkedIn. Prepare 1 personalized question each.',
      readiness: 'You have a schedule, directions, outfit, and materials ready the night before.',
      execution: 'Bring a notebook. Take notes. Ask about team culture and data stack.',
      confidence: 'Preparation turns a stressful day into a series of good conversations.'
    },
    tasks: INTERVIEW_TASKS['on-site-prep'] || [],
  },
  {
    id: 'phone-screen',
    skill: 'Phone Screen',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 20,
    difficulty: 1,
    signals: [
      'You have a quiet space with good connection',
      'You can explain your background in 2 minutes',
      'You ask about the role and team data stack'
    ],
    advice: {
      awareness: 'Phone screens filter out mismatches early. Do not treat them lightly.',
      understanding: 'Recruiters check: communication, motivation, salary alignment, availability.',
      application: 'Prepare a 2-minute pitch: who you are, what you do, what you want.',
      readiness: 'You sound confident and clear without visual cues.',
      execution: 'Stand up during the call. It improves voice projection and energy.',
      confidence: 'A strong phone screen gets you the SQL test or case study interview.'
    },
    tasks: INTERVIEW_TASKS['phone-screen'] || [],
  },
  {
    id: 'interview-followup',
    skill: 'Interview Follow-Up',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 20,
    difficulty: 1,
    signals: [
      'You send thank-you emails within 24 hours',
      'Each email references a specific conversation topic',
      'You reiterate your interest and value proposition'
    ],
    advice: {
      awareness: 'Thank-you emails are not optional. They are your last impression.',
      understanding: 'A thoughtful follow-up can tip a borderline decision in your favor.',
      application: 'Draft templates now. Personalize each with a detail from the interview.',
      readiness: 'You send follow-ups within 24 hours, every time, without fail.',
      execution: 'Mention something specific: "I enjoyed discussing your cohort analysis approach."',
      confidence: 'Professional follow-up signals maturity and genuine interest.'
    },
    tasks: INTERVIEW_TASKS['interview-followup'] || [],
  },
  {
    id: 'presentation-prep',
    skill: 'Presentation Prep',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 60,
    difficulty: 3,
    signals: [
      'You can present a project in 10 minutes with clear structure',
      'Your slides show insights, not just charts',
      'You anticipate questions and prepare answers'
    ],
    advice: {
      awareness: 'Take-home assignments and presentations are common in data interviews.',
      understanding: 'Interviewers evaluate: analysis quality, communication, business thinking.',
      application: 'Practice presenting your best project. Time it. Get feedback.',
      readiness: 'You can walk through a project in 10 minutes: problem, data, analysis, insight, impact.',
      execution: 'Lead with the insight, not the methodology. "We reduced churn by 15%" hooks attention.',
      confidence: 'A polished presentation proves you can communicate data to stakeholders.'
    },
    tasks: INTERVIEW_TASKS['presentation-prep'] || [],
  },
];

export const OFFER_PREPARATION_SKILL_NODES: SkillNode[] = [
  {
    id: 'salary-research',
    skill: 'Salary Research',
    domain: 'Offer Preparation',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 45,
    difficulty: 2,
    signals: [
      'You know the salary range for your role, level, and location',
      'You have data from 3+ sources: Glassdoor, Levels.fyi, PayScale',
      'You understand total compensation: base, bonus, equity, benefits'
    ],
    advice: {
      awareness: 'Negotiating without data is guessing. Guessing leaves money on the table.',
      understanding: 'Data analyst salaries vary by industry, location, and company size.',
      application: 'Research: base salary, bonus, equity, benefits for your target role.',
      readiness: 'You have a specific number range backed by market data.',
      execution: 'Use Levels.fyi for tech, Glassdoor for general, company reports for public data.',
      confidence: 'Data-backed negotiation requests are hard to refuse.'
    },
    tasks: OFFER_TASKS['salary-research'] || [],
  },
  {
    id: 'offer-review',
    skill: 'Offer Review',
    domain: 'Offer Preparation',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 30,
    difficulty: 1,
    signals: [
      'You read every line of the offer letter',
      'You note verbal promises not in writing',
      'You understand vesting schedules and clawback clauses'
    ],
    advice: {
      awareness: 'Offer letters are legal documents. Read them like a data analyst reads a schema.',
      understanding: 'Verbal promises mean nothing. Only written terms are enforceable.',
      application: 'Create a checklist: salary, start date, benefits, equity, vesting, probation.',
      readiness: 'You can explain every component of your offer to a friend.',
      execution: 'Ask for clarification on anything vague. Get promises in writing.',
      confidence: 'A thorough review prevents surprises on day one.'
    },
    tasks: OFFER_TASKS['offer-review'] || [],
  },
  {
    id: 'resignation-letter',
    skill: 'Resignation Letter',
    domain: 'Offer Preparation',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 20,
    difficulty: 1,
    signals: [
      'You have a professional resignation letter template',
      'It is concise, positive, and gives proper notice',
      'You are prepared for a counter-offer conversation'
    ],
    advice: {
      awareness: 'Burning bridges is expensive. The data world is smaller than it looks.',
      understanding: 'A graceful exit preserves relationships and references for years.',
      application: 'Draft a resignation letter. Keep it under 150 words. Be professional.',
      readiness: 'You can resign without drama, regardless of how you feel about the job.',
      execution: 'Give notice in person first. Then follow up with the written letter.',
      confidence: 'Professional exits open doors. Dramatic exits close them.'
    },
    tasks: OFFER_TASKS['resignation-letter'] || [],
  },
];

export const OFFER_SKILL_NODES: SkillNode[] = [
  {
    id: 'offer-evaluation',
    skill: 'Offer Evaluation',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 30,
    difficulty: 2,
    signals: [
      'You score offers on multiple dimensions, not just salary',
      'You consider growth, learning, team, and work-life balance',
      'You have a decision framework, not just gut feeling'
    ],
    advice: {
      awareness: 'The highest salary is not always the best career move.',
      understanding: 'Early career growth compounds. A $10K difference is negligible vs skill growth.',
      application: 'Create a weighted scorecard: salary, growth, team, tech stack, commute, culture.',
      readiness: 'You can justify your choice with specific criteria, not just emotion.',
      execution: 'Sleep on it. Discuss with a mentor. Do not decide under pressure.',
      confidence: 'A structured evaluation prevents regret six months later.'
    },
    tasks: OFFER_TASKS['offer-evaluation'] || [],
  },
  {
    id: 'salary-negotiation',
    skill: 'Salary Negotiation',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 45,
    difficulty: 3,
    signals: [
      'You always negotiate, even when the offer seems fair',
      'You anchor high but reasonable based on market data',
      'You negotiate total compensation, not just base salary'
    ],
    advice: {
      awareness: 'Not negotiating costs you hundreds of thousands over a career.',
      understanding: 'Companies expect negotiation. Asking does not make you difficult.',
      application: 'Script your negotiation: gratitude + market data + specific ask + flexibility.',
      readiness: 'You can ask for more without anxiety or apology.',
      execution: 'Negotiate base, bonus, equity, signing bonus, PTO, remote work, title.',
      confidence: 'Every dollar negotiated now compounds over your entire career.'
    },
    tasks: OFFER_TASKS['salary-negotiation'] || [],
  },
  {
    id: 'decision-framework',
    skill: 'Decision Framework',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 15,
    difficulty: 1,
    signals: [
      'You have a written list of priorities before comparing offers',
      'You weight short-term gains against long-term growth',
      'You involve mentors or peers in major decisions'
    ],
    advice: {
      awareness: 'Deciding between offers is stressful. A framework removes emotion.',
      understanding: 'Your priorities change over time. A framework adapts with you.',
      application: 'List your top 5 priorities. Rank them. Score each offer against each priority.',
      readiness: 'You can explain why offer A beats offer B with specific reasons.',
      execution: 'Set a deadline. Gather input. Decide. Commit. Do not look back.',
      confidence: 'A clear decision framework makes you decisive, not impulsive.'
    },
    tasks: OFFER_TASKS['decision-framework'] || [],
  },
  {
    id: 'offer-acceptance',
    skill: 'Offer Acceptance',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 30,
    difficulty: 1,
    signals: [
      'You confirm the offer in writing before giving notice',
      'You understand start date, onboarding, and first 30 days',
      'You prepare a transition plan for your current role'
    ],
    advice: {
      awareness: 'Verbal acceptance is not binding. Written confirmation protects both sides.',
      understanding: 'A smooth start sets the tone for your entire tenure.',
      application: 'Send written acceptance. Confirm start date. Ask about onboarding.',
      readiness: 'You have a plan for your first week: tools, access, introductions, quick wins.',
      execution: 'Give notice professionally. Wrap up current projects. Document your work.',
      confidence: 'A professional transition builds reputation before day one.'
    },
    tasks: OFFER_TASKS['offer-acceptance'] || [],
  },
  {
    id: 'benefits-evaluation',
    skill: 'Benefits Evaluation',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 30,
    difficulty: 2,
    signals: [
      'You calculate the dollar value of benefits, not just salary',
      'You compare health insurance, 401k match, PTO, education stipends',
      'You understand vesting schedules and equity refreshers'
    ],
    advice: {
      awareness: 'Benefits can be worth 30-50% of base salary. Ignoring them is expensive.',
      understanding: 'A lower base with great benefits can beat a higher base with none.',
      application: 'Calculate total compensation including all benefits over 1 year and 4 years.',
      readiness: 'You can compare two offers on total value, not just base salary.',
      execution: 'Ask HR for detailed benefits docs. Run the numbers. Ask questions.',
      confidence: 'A complete benefits analysis prevents costly surprises.'
    },
    tasks: OFFER_TASKS['benefits-evaluation'] || [],
  },
  {
    id: 'start-transition',
    skill: 'Start Transition',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    estimatedMinutes: 45,
    difficulty: 2,
    signals: [
      'You have a 30-60-90 day plan for your new role',
      'You identified quick wins to build credibility fast',
      'You are learning the new data stack before day one'
    ],
    advice: {
      awareness: 'The first 90 days determine your trajectory at a new company.',
      understanding: 'Managers form opinions quickly. Early wins create momentum.',
      application: 'Research the company data stack. Brush up on their tools. Set learning goals.',
      readiness: 'You can articulate your first-month priorities on day one.',
      execution: 'Listen more than you speak in week 1. Build relationships. Deliver one small win.',
      confidence: 'A strong start turns a new job into a career accelerator.'
    },
    tasks: OFFER_TASKS['start-transition'] || [],
  },
];

export const ALL_SKILL_NODES: SkillNode[] = [
  ...RESUME_SKILL_NODES,
  ...LINKEDIN_SKILL_NODES,
  ...APPLICATION_SKILL_NODES,
  ...INTERVIEW_SKILL_NODES,
  ...OFFER_PREPARATION_SKILL_NODES,
  ...OFFER_SKILL_NODES,
];
