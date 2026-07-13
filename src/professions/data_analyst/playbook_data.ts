import type { PlaybookEntry } from '@/core/playbook/playbook_types';

export const DATA_ANALYST_PLAYBOOK: PlaybookEntry[] = [
  {
    id: 'resume/data-analyst-summary-formulas',
    title: 'Resume Summary Formulas',
    category: 'resume',
    professionId: 'data_analyst',
    overview:
      'A data analyst resume summary should signal tool fluency (SQL/Python/BI), the type of decisions you\'ve influenced, and measurable business impact — not just a list of software.',
    guides: [
      'Lead with your strongest tool stack (SQL, Python, Tableau/Power BI, etc.)',
      'Name the business domain you analyzed (e-commerce, finance, product, marketing)',
      'Include one quantified insight or decision your analysis drove',
      'Mirror keywords from the job description for ATS matching',
      'Keep it to 2-3 lines',
    ],
    templates: [
      'Data Analyst with 1 year of experience turning SQL and Python analysis into product decisions. Built dashboards in Tableau tracking user retention, surfacing a churn driver that informed a feature change.',
      'Analytics professional transitioning from finance to data analysis. Skilled in SQL, Excel, and Power BI. Automated a manual reporting process, saving the team 5 hours per week.',
      'Data Analyst focused on marketing analytics. Experienced in A/B testing, cohort analysis, and SQL. Analysis of campaign data identified a channel with 2x ROI over baseline.',
    ],
    examples: [
      'Junior Data Analyst with hands-on experience in SQL, Python (pandas), and dashboard design. Built a weekly sales dashboard adopted by 3 regional teams. Seeking analyst role at a data-driven product company.',
      'Data Analyst specializing in product analytics. Ran and interpreted A/B tests for onboarding flow changes, contributing to a measurable signup-conversion improvement.',
    ],
    checklist: [
      'Summary is under 3 lines',
      'Names concrete tools (SQL, Python, BI tool)',
      'Mentions the business domain',
      'Includes one measurable insight or outcome',
      'States target role',
    ],
    tags: ['summary', 'resume', 'positioning', 'sql', 'dashboards'],
  },
  {
    id: 'resume/data-analyst-ats-optimization',
    title: 'ATS Optimization Checklist',
    category: 'resume',
    professionId: 'data_analyst',
    overview:
      'Applicant tracking systems parse resumes for keyword matches before a human ever sees them. Data analyst postings cluster around a predictable set of tools and techniques worth mirroring exactly.',
    guides: [
      'Copy exact tool names from the posting (e.g. "Power BI" not "BI tools")',
      'Include both the technique and its abbreviation where relevant (A/B testing, ETL)',
      'List SQL dialect if specified (PostgreSQL, MySQL, BigQuery)',
      'Use standard section headers: Experience, Skills, Education',
      'Avoid tables/graphics that some parsers cannot read',
    ],
    templates: [
      'Skills: SQL (PostgreSQL, BigQuery), Python (pandas, numpy), Tableau, Excel (pivot tables, VLOOKUP), A/B testing, statistical analysis, ETL pipelines',
    ],
    examples: [
      'Before: "Good with data tools." After: "Proficient in SQL, Python, and Tableau for data extraction, cleaning, and visualization."',
    ],
    checklist: [
      'Tool names match the job posting exactly',
      'Standard section headers used',
      'No unreadable tables or text boxes',
      'Skills section lists tools individually, not as a paragraph',
    ],
    tags: ['ats', 'resume', 'keywords', 'sql'],
  },
  {
    id: 'interview/data-analyst-sql-technical-prep',
    title: 'SQL Technical Interview Guide',
    category: 'interviews',
    professionId: 'data_analyst',
    overview:
      'SQL screens test whether you can translate a business question into a correct, efficient query — not just whether you know syntax. Interviewers watch how you clarify ambiguity before writing anything.',
    guides: [
      'Restate the question and confirm what "correct" looks like before coding',
      'Sketch the table relationships out loud before writing SQL',
      'Start with a simple correct query, then optimize (indexes, joins vs subqueries)',
      'Narrate edge cases: NULLs, duplicates, date boundaries',
      'Double-check GROUP BY / aggregate logic against the original question',
    ],
    templates: [
      'When asked "find the second highest salary": clarify whether ties should be handled, then use a window function (DENSE_RANK) rather than a fragile LIMIT/OFFSET subquery, explaining the tradeoff out loud.',
    ],
    examples: [
      'Candidate given a messy schema clarified whether "active users" meant logged-in-this-month or has-a-subscription before writing any SQL — avoided solving the wrong problem.',
    ],
    checklist: [
      'Clarified ambiguous terms before writing SQL',
      'Considered NULLs and duplicates explicitly',
      'Could explain why a join or window function was chosen',
      'Checked the result against the original question at the end',
    ],
    tags: ['sql', 'technical', 'interview', 'whiteboard'],
  },
  {
    id: 'interview/data-analyst-case-study-prep',
    title: 'Case Study & Take-Home Framework',
    category: 'interviews',
    professionId: 'data_analyst',
    overview:
      'Data analyst case studies (e.g. "metric X dropped 10%, why?") reward a structured framework over a scramble for the "right" answer. Interviewers are grading your process.',
    guides: [
      'State your framework before diving into numbers: define the metric, segment, hypothesize, validate',
      'Segment by time, geography, platform, and user cohort to isolate where the change happened',
      'Separate correlation from causation explicitly in your narrative',
      'End with a recommendation and what data would confirm or rule it out',
      'For take-homes: prioritize a clear narrative over exhaustive analysis',
    ],
    templates: [
      'Framework: 1) Confirm the metric definition and time window 2) Check for data/tracking issues first 3) Segment (new vs returning, platform, region) 4) Form 2-3 hypotheses 5) Test each against the data 6) Recommend next steps.',
    ],
    examples: [
      'Given "signups dropped 15% last week," candidate first ruled out a tracking outage, then found the drop was concentrated in one traffic source — pointing to a broken campaign link rather than a product issue.',
    ],
    checklist: [
      'Stated a framework before analyzing',
      'Ruled out data quality issues first',
      'Segmented the data at least two ways',
      'Distinguished correlation from causation',
      'Ended with a concrete, testable recommendation',
    ],
    tags: ['case-study', 'take-home', 'interview', 'framework'],
  },
  {
    id: 'interview/data-analyst-data-visualization-prep',
    title: 'Data Visualization Pitch Guide',
    category: 'interviews',
    professionId: 'data_analyst',
    overview:
      'When asked to present a chart or dashboard in an interview, evaluators care more about whether you lead with the business "so what" than about chart aesthetics.',
    guides: [
      'Open with the one-sentence takeaway, not the chart type',
      'Choose the simplest chart that shows the comparison (avoid 3D, excessive pie charts)',
      'Label axes and callouts so the chart works without narration',
      'Preempt the obvious follow-up question ("why did this change?")',
      'Practice a 60-second version and a 3-minute version',
    ],
    templates: [
      '"Revenue grew 12% quarter over quarter, driven almost entirely by the mobile channel — here\'s the breakdown." (then show the chart, not the reverse)',
    ],
    examples: [
      'Candidate presenting a retention curve led with "week-1 retention is our biggest drop-off point," then showed the curve — reviewers noted the takeaway was memorable and clear.',
    ],
    checklist: [
      'Takeaway stated before or alongside the chart',
      'Chart type matches the comparison being made',
      'Axes and units are labeled',
      'Anticipated at least one likely follow-up question',
    ],
    tags: ['visualization', 'dashboard', 'presentation', 'interview'],
  },
  {
    id: 'interview/data-analyst-behavioral-prep',
    title: 'Behavioral Interview Preparation',
    category: 'interviews',
    professionId: 'data_analyst',
    overview:
      'Behavioral questions for analyst roles probe how you handle ambiguous asks from stakeholders and disagreements about what the data shows — the STAR method applies with an analytics-specific lens.',
    guides: [
      'Pick stories that show you pushing back on a vague or leading question from a stakeholder',
      'Include a story where your analysis contradicted the expected answer',
      'Quantify impact wherever possible (time saved, decision changed, revenue affected)',
      'Practice a story about handling messy or incomplete data',
    ],
    templates: [
      'S: A stakeholder asked for "the numbers that show the campaign worked."\nT: I needed to give an honest read, not a cherry-picked one.\nA: I pulled the full funnel, including channels that underperformed, and presented both sides with a recommendation.\nR: The team paused the underperforming channel, saving budget the following quarter.',
    ],
    examples: [
      'Candidate described being asked to find data supporting a decision already made, and instead presented the full picture — decision was revised, and the analyst was later brought into decisions earlier.',
    ],
    checklist: [
      'At least one story shows pushing back constructively',
      'At least one story involves messy/incomplete data',
      'Results are quantified',
      'Stories are 90-120 seconds when spoken',
    ],
    tags: ['behavioral', 'star', 'interview', 'stakeholders'],
  },
  {
    id: 'interview/data-analyst-phone-screen',
    title: 'Recruiter Phone Screen Guide',
    category: 'interviews',
    professionId: 'data_analyst',
    overview:
      'The recruiter screen for analyst roles filters on tool fit, domain interest, and basic SQL/stats fluency before the technical rounds — treat it as a real evaluation, not small talk.',
    guides: [
      'Have a 60-second walkthrough of your background ready, ending on why this role/domain',
      'Know the job\'s tool stack cold and be ready to map your experience to it',
      'Prepare a one-line answer for "SQL vs Excel vs Python — when do you reach for each"',
      'Ask about the team\'s data stack and what decisions the role influences',
    ],
    templates: [
      '"I work in SQL for anything that needs to scale or be repeatable, Excel for quick one-off exploration, and Python when I need more complex transformations or statistics."',
    ],
    examples: [
      'Candidate asked the recruiter what the last analysis from this role changed in the business — signaled genuine interest in impact, not just tools.',
    ],
    checklist: [
      '60-second background summary is ready',
      'Can map own experience to the posting\'s tool stack',
      'Has 2 questions prepared about the team\'s data stack',
    ],
    tags: ['phone-screen', 'recruiter', 'interview'],
  },
  {
    id: 'interview/data-analyst-mindset',
    title: 'Interview Mindset for Analysts',
    category: 'interviews',
    professionId: 'data_analyst',
    overview:
      'Analyst interviews reward curiosity and skepticism about data more than confident answers — interviewers are often testing whether you\'ll question a flawed premise instead of computing on autopilot.',
    guides: [
      'Treat every prompt as possibly missing context — ask before assuming',
      'It is fine to say "I would check the data quality here first"',
      'Narrate your thinking; silence reads as uncertainty even when you\'re on track',
      'If you don\'t know something, say what you\'d look up rather than guessing confidently',
    ],
    templates: [
      '"Before I answer, can I confirm what time zone/period this metric is measured in? Definitions like that often change the analysis."',
    ],
    examples: [
      'Candidate given a question with a subtly wrong premise ("why did conversion drop") first checked whether conversion had actually dropped in the data provided — it hadn\'t, the premise was a test.',
    ],
    checklist: [
      'Asked at least one clarifying question per prompt',
      'Narrated reasoning rather than working silently',
      'Comfortable saying "I don\'t know, but here\'s how I\'d find out"',
    ],
    tags: ['mindset', 'interview', 'critical-thinking'],
  },
  {
    id: 'applications/data-analyst-portfolio-submission',
    title: 'Portfolio & Project Submission Guide',
    category: 'applications',
    professionId: 'data_analyst',
    overview:
      'A data analyst portfolio is judged on whether a project tells a clear business story end-to-end, not on the number of projects or model complexity.',
    guides: [
      'Pick 2-3 projects max, each with a clear question, method, and conclusion',
      'Show the data cleaning step, not just the final chart — it demonstrates rigor',
      'Include the "so what": what decision would this analysis support?',
      'Host code and a written summary (README) together, not code alone',
      'Prefer real or realistic messy datasets over pristine textbook data',
    ],
    templates: [
      'Project README structure: Question → Data source & limitations → Method → Key finding (with chart) → Recommendation → What I\'d do with more time.',
    ],
    examples: [
      'A project analyzing public transit delays included a short section on data quality issues found and how they were handled — reviewers called this out as a differentiator.',
    ],
    checklist: [
      '2-3 focused projects, not a long unfiltered list',
      'Each project states a business question upfront',
      'Data limitations are acknowledged',
      'Each project ends with a recommendation, not just a chart',
    ],
    tags: ['portfolio', 'projects', 'applications'],
  },
  {
    id: 'applications/data-analyst-cover-letter',
    title: 'Cover Letter Templates',
    category: 'applications',
    professionId: 'data_analyst',
    overview:
      'A data analyst cover letter should demonstrate you understand the company\'s specific data/business context, not restate the resume.',
    guides: [
      'Open with a specific observation about the company\'s product or data challenge',
      'Connect one of your projects directly to a need implied in the posting',
      'Keep it to 3 short paragraphs',
      'Close with genuine interest in the domain, not generic enthusiasm',
    ],
    templates: [
      'I noticed [Company] relies heavily on user engagement metrics to guide product decisions. In my project analyzing [similar metric], I found [specific insight], which is the kind of question I\'d enjoy digging into on your team...',
    ],
    examples: [
      'A candidate applying to a fintech startup referenced a specific public statement about fraud detection challenges and tied it to their own coursework project on anomaly detection.',
    ],
    checklist: [
      'Mentions something specific to the company, not generic',
      'Ties one project to a real need in the posting',
      'Under 300 words',
    ],
    tags: ['cover-letter', 'applications', 'templates'],
  },
  {
    id: 'applications/data-analyst-follow-up-strategy',
    title: 'Follow-Up Strategy',
    category: 'applications',
    professionId: 'data_analyst',
    overview:
      'Following up shows initiative without being pushy when it\'s brief, specific, and spaced appropriately.',
    guides: [
      'Wait 1-2 weeks after applying before a first follow-up',
      'Reference the specific role and one new, relevant detail (a recent project, certification)',
      'Keep follow-ups to 2-3 sentences',
      'After an interview, follow up within 24 hours with a thank-you referencing something specific discussed',
    ],
    templates: [
      'Hi [Name], I applied for the Data Analyst role on [date] and wanted to check in. Since applying, I completed a project on [topic] that\'s directly relevant to the role — happy to share if useful. Thanks for your time!',
    ],
    examples: [
      'A post-interview thank-you note referenced a specific dataset challenge discussed in the interview and added one additional thought on how to approach it — interviewer remembered the candidate positively.',
    ],
    checklist: [
      'First follow-up sent 1-2 weeks after applying',
      'Message is 2-3 sentences',
      'Post-interview thank-you sent within 24 hours',
    ],
    tags: ['follow-up', 'applications', 'templates'],
  },
  {
    id: 'applications/data-analyst-application-volume',
    title: 'Application Volume & Targeting Strategy',
    category: 'applications',
    professionId: 'data_analyst',
    overview:
      'For analyst roles, targeted applications with a tailored resume consistently outperform high-volume generic applications.',
    guides: [
      'Tailor the skills section to mirror each posting\'s specific tools',
      'Prioritize postings that name a specific tool stack you have (higher fit signal)',
      'Track applications in a simple spreadsheet: company, date, status, tailoring notes',
      'Aim for quality over quantity — 5 tailored applications beat 20 generic ones',
    ],
    templates: [
      'Tracker columns: Company | Role | Date Applied | Tool Stack Match | Status | Follow-up Date | Notes',
    ],
    examples: [
      'A candidate who tailored their top 3 skills to each posting\'s exact language saw a noticeably higher response rate than when sending one generic resume.',
    ],
    checklist: [
      'Resume skills section is tailored per application',
      'Applications are tracked systematically',
      'Prioritizing fit over volume',
    ],
    tags: ['job-search', 'strategy', 'applications'],
  },
  {
    id: 'offer/data-analyst-salary-research',
    title: 'Salary Research & Benchmarking',
    category: 'offer',
    professionId: 'data_analyst',
    overview:
      'Data analyst compensation varies widely by industry (finance vs. nonprofit) and by whether the role leans SQL-reporting or Python/statistics-heavy — research needs to match the specific role type.',
    guides: [
      'Benchmark using multiple sources (Levels.fyi, Glassdoor, LinkedIn Salary) and average them',
      'Adjust for the company\'s industry and stage (startup equity vs. established company cash)',
      'Note whether the role is titled "Data Analyst," "Analytics Engineer," or "BI Analyst" — ranges differ',
      'Factor in your location and whether the role is remote',
    ],
    templates: [
      'Research note: "Data Analyst, Series B startup, remote — base range $X-$Y per [source A, source B], plus early-stage equity."',
    ],
    examples: [
      'A candidate found their target role was closer to "Analytics Engineer" pay bands (higher, due to pipeline/ETL work) than generic "Data Analyst" and adjusted their ask accordingly.',
    ],
    checklist: [
      'Checked at least 2 independent salary sources',
      'Adjusted for company stage/industry',
      'Confirmed which specific role variant this posting matches',
    ],
    tags: ['salary', 'negotiation', 'research'],
  },
  {
    id: 'offer/data-analyst-offer-review',
    title: 'Offer Review Checklist',
    category: 'offer',
    professionId: 'data_analyst',
    overview:
      'Reviewing an offer means reading beyond the headline base salary to understand the full package and any conditions.',
    guides: [
      'Confirm base, bonus (target vs. guaranteed), and equity vesting schedule separately',
      'Ask about the review/promotion cycle and typical raise ranges',
      'Clarify remote/hybrid policy in writing, not verbally',
      'Check for any data-access or non-compete clauses relevant to analytics work',
    ],
    templates: [
      'Questions to ask before signing: "Is the bonus target or guaranteed? What does the promotion timeline typically look like for this level? Is the remote policy documented?"',
    ],
    examples: [
      'A candidate asked for the vesting schedule in writing and discovered a 1-year cliff not mentioned verbally — it changed their negotiation approach.',
    ],
    checklist: [
      'Base, bonus, and equity are each confirmed separately',
      'Vesting schedule is in writing',
      'Remote/hybrid policy is documented',
    ],
    tags: ['offer', 'negotiation', 'checklist'],
  },
  {
    id: 'offer/data-analyst-benefits-evaluation',
    title: 'Benefits Evaluation Guide',
    category: 'offer',
    professionId: 'data_analyst',
    overview:
      'Non-salary benefits can meaningfully shift total compensation and should be weighed alongside base pay, especially for early-career analysts choosing between offers.',
    guides: [
      'List all benefits with an approximate dollar value where possible (health premium coverage, 401k match, learning budget)',
      'Weigh professional development budget for tools/certifications relevant to analytics (e.g. cloud platform courses)',
      'Consider PTO policy and whether it\'s unlimited-in-name-only',
      'Compare total package, not just base salary, across competing offers',
    ],
    templates: [
      'Benefits comparison table: Health premium coverage | 401k match % | Learning/certification budget | PTO days | Remote stipend',
    ],
    examples: [
      'Comparing two offers, a candidate found a lower base salary came with a $2,000 annual learning budget and better 401k match, roughly closing the gap.',
    ],
    checklist: [
      'All benefits are listed with estimated value',
      'Learning/development budget is factored in',
      'Total package compared, not just base salary',
    ],
    tags: ['benefits', 'offer', 'negotiation'],
  },
  // GAP FIX (2026-07-13): data_analyst previously had zero entries for
  // linkedin, communication, body_language, and confidence — those 4
  // Playbook tabs rendered empty for every Data Analyst user, even though
  // PlaybookScreen always shows all 8 category tabs regardless of
  // profession. Added below so every tab has at least one entry.
  {
    id: 'linkedin/data-analyst-headline-and-portfolio',
    title: 'LinkedIn Headline & Portfolio for Data Analysts',
    category: 'linkedin',
    professionId: 'data_analyst',
    overview:
      'Recruiters searching for data analysts filter by specific tools (SQL, Python, Tableau, Power BI) more than by job title alone. Your headline and Featured section should surface both your tools and a visible, checkable piece of analysis work.',
    guides: [
      'Include your 2-4 core tools in the headline, not just "Data Analyst"',
      'Name the business domain you focus on (product, marketing, finance) if you have one',
      'Pin a dashboard, SQL project, or analysis write-up in the Featured section — something a recruiter can actually open',
      'Avoid generic filler phrases like "data enthusiast" or "passionate about numbers" — they add no searchable value',
      'Keep the headline under 120 characters so it displays fully in search results',
    ],
    templates: [
      'Data Analyst | SQL | Python | Tableau | Product Analytics',
      'Junior Data Analyst | Power BI | Excel | E-commerce Metrics',
      'Aspiring Data Analyst | SQL and Python | A/B Testing | Marketing Analytics',
    ],
    examples: [
      'Before: "Data enthusiast learning analytics" -- low recruiter search visibility. After: "Data Analyst | SQL | Tableau | Retention and Churn Analysis" -- surfaces in recruiter searches for those exact terms.',
    ],
    checklist: [
      'Headline names 2-4 specific tools, not vague descriptors',
      'A real dashboard, query, or project is pinned in Featured',
      'Business domain mentioned if applicable',
      'No filler phrases like "passionate" or "enthusiast" alone',
      'Under 120 characters',
    ],
    tags: ['linkedin', 'headline', 'portfolio', 'visibility'],
  },
  {
    id: 'communication/explaining-analysis-to-non-technical-stakeholders',
    title: 'Explaining Analysis to Non-Technical Stakeholders',
    category: 'communication',
    professionId: 'data_analyst',
    overview:
      "The single most common interview and on-the-job test for a data analyst is translating a technical finding into a decision a non-technical stakeholder can act on. Analysts who can't do this get their insights ignored, no matter how correct the SQL was.",
    guides: [
      'Lead with the business implication, not the method -- state the outcome before the statistical test',
      'State your confidence level in plain language ("this is a strong signal" vs. "this is suggestive but the sample is small")',
      'Use one concrete number or comparison instead of a wall of statistics',
      'Anticipate the obvious follow-up question ("why?" or "what should we do?") and have an answer ready',
      'Avoid leading with tool names (SQL, pandas, regression) unless the audience asks how you got there',
    ],
    templates: [
      "Weak opening: \"I ran a multivariate regression controlling for seasonality and found a coefficient of -0.34 with p<0.05.\" Strong opening: \"Signups dropped about 12% after the pricing change, and it doesn't look like seasonality explains it. I'd recommend we look at the checkout flow next.\"",
    ],
    examples: [
      "Interview question: \"How would you explain a correlation you found to a non-technical manager?\" Strong answer: \"I'd say what we observed in plain terms first -- for example, 'users who saw the new onboarding finished setup faster' -- then note the caveat simply, like 'we can't be fully sure it caused it, but it's a strong early signal,' before offering to dig deeper if they want the statistical detail.\"",
    ],
    checklist: [
      'Opens with the business finding, not the method',
      'States confidence level in plain language',
      'Uses one clear number instead of a list of statistics',
      'Has a prepared answer for the likely "why" or "what now" follow-up',
      'Practiced explaining one real finding out loud in under 60 seconds',
    ],
    tags: ['communication', 'stakeholders', 'non-technical', 'storytelling'],
  },
  {
    id: 'body_language/presenting-dashboards-with-confidence',
    title: 'Presenting Dashboards & Findings With Confidence',
    category: 'body_language',
    professionId: 'data_analyst',
    overview:
      "Data analysts are frequently asked to walk stakeholders or interviewers through a dashboard or chart live. How you present the visual -- pace, pointing, pausing -- affects whether the finding lands as credible, independent of whether the analysis itself is correct.",
    guides: [
      'Orient the viewer before diving in -- say what the chart shows and what the axes mean in one sentence first',
      'Point to or highlight the specific data point you are discussing rather than describing its location verbally only',
      'Pause after stating a key number so it has time to register before you move on',
      'Slow down your speaking pace when presenting numbers -- data is misheard easily when rushed',
      'For video calls, share the exact chart/dashboard view rather than your whole messy screen',
    ],
    templates: [
      'Presentation opening line: "This chart shows weekly active users over the last 6 months, with the change we shipped marked here in week 14." (then pause, then continue with the finding)',
    ],
    examples: [
      'Weak: rushing through 4 charts in 90 seconds while talking continuously. Strong: showing one chart, stating what it shows, pausing 2 seconds, then stating the one takeaway before moving to the next chart.',
    ],
    checklist: [
      'Orients the audience to axes/scope before stating the finding',
      'Points to or highlights the specific data referenced',
      'Pauses briefly after stating a key number',
      'Speaking pace slows down specifically during numbers',
      'Shares a clean, focused screen view rather than a cluttered one',
    ],
    tags: ['body_language', 'presenting', 'dashboards', 'confidence'],
  },
  {
    id: 'confidence/handling-i-dont-know-in-analytics-interviews',
    title: "Handling \"I Don't Know\" in Analytics Interviews",
    category: 'confidence',
    professionId: 'data_analyst',
    overview:
      "Analytics interviews often include an ambiguous business case or an unfamiliar dataset on purpose -- the goal is to see how you reason with incomplete information, not whether you already know the answer. Treating 'I don't know yet' as a normal, confident starting point (not a failure) changes how these interviews go.",
    guides: [
      'When faced with an unfamiliar scenario, state your reasoning process out loud instead of guessing silently',
      'It is fine to say "I would want to check X before answering that precisely" -- this is often exactly what is being tested',
      'Ask a clarifying question before diving into a case study rather than assuming the goal',
      'Keep a short list of past wins (a specific analysis you are proud of) to mentally reference before the interview',
      'Reframe silence/thinking time as normal -- a brief pause before tackling ambiguity reads as rigor, not hesitation',
    ],
    templates: [
      'Reframe script for an unfamiliar case question: "I have not worked with this exact scenario before, but here is how I would approach figuring it out: first I would clarify the goal, then look at the baseline data to understand normal behavior, then check for anything unusual before drawing conclusions."',
    ],
    examples: [
      'Candidate given an unfamiliar dataset froze initially, then recovered by saying: "Let me think through this systematically -- first I would check for missing data, then look at the distribution before drawing conclusions." Interviewer noted this structured response positively despite not reaching a final number in time.',
    ],
    checklist: [
      'Has a scripted, calm response ready for unfamiliar scenario questions',
      'Practiced asking one clarifying question before starting a case study',
      'Keeps a short mental list of past analysis wins to reference before interviews',
      'Treats a brief pause before answering as acceptable, not something to apologize for',
      'Practiced narrating reasoning out loud on at least one mock case',
    ],
    tags: ['confidence', 'mindset', 'case-study', 'ambiguity'],
  },
];
