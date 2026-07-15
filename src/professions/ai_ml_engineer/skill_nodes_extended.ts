import type { SkillNode } from '@/core/skill_state';
import { APPLICATION_TASKS } from './tasks/applications';
import { INTERVIEW_TASKS } from './tasks/interviews';
import { OFFER_TASKS } from './tasks/offer';

// ─── CHAPTER 3: APPLICATIONS (7 nodes) ──────────────────────────────
export const APPLICATION_SKILL_NODES: SkillNode[] = [
  {
    id: 'application-tracking',
    skill: 'Application Tracking',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have a spreadsheet tracking 20+ ML job applications',
      'Each entry includes: company, domain, date, status',
      'You follow up on 50% of applications within 1-2 weeks'
    ],
    advice: {
      awareness: 'Applying blindly to ML roles is inefficient. Tracking reveals what works.',
      understanding: 'A tracker shows patterns: which companies respond, which roles fit, which channels work.',
      application: 'Create a tracker with columns: Company, Role, Domain, Date Applied, Status, Follow-up, Notes.',
      readiness: 'You can see your pipeline: applied, OA, phone screen, on-site, offer.',
      execution: 'Set weekly review. Archive rejected roles. Prioritize roles matching your specialization.',
      confidence: 'A tracked pipeline turns chaos into an ML job search strategy.'
    },
    tasks: APPLICATION_TASKS['application-tracking'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'portfolio-github',
    skill: 'GitHub Portfolio',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'Your GitHub is curated with 3-4 pinned, well-documented ML repos',
      'You have 1+ end-to-end pipeline with training, evaluation, and serving',
      'Repos include both notebooks and production-style modular code'
    ],
    advice: {
      awareness: 'An ML portfolio without a clean GitHub looks theoretical. Show hands-on experience.',
      understanding: 'Recruiters evaluate: can you build, train, evaluate, and deploy a model? Not just run notebooks.',
      application: 'Document one complete pipeline: data ingestion → training → evaluation → serving.',
      readiness: 'You can walk through your GitHub in 5 minutes with technical depth.',
      execution: 'Pin your best repos, add clear READMEs, and archive stale tutorial-following ones.',
      confidence: 'A GitHub portfolio answers technical questions before the interview starts.'
    },
    tasks: APPLICATION_TASKS['portfolio-github'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'kaggle-rankings',
    skill: 'Kaggle Rankings',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have a Kaggle profile with 3+ competitions entered',
      'Your rank or percentile is visible and improving',
      'You have writeups for 2+ competitions linked in your application'
    ],
    advice: {
      awareness: 'Kaggle rankings are objective proof of your modeling and iteration skills.',
      understanding: 'Recruiters value competition participation: it shows persistence, curiosity, and hands-on ability.',
      application: 'Complete 3 submissions this week. Document your methodology.',
      readiness: 'You have 3+ competitions entered with public writeups.',
      execution: 'Include Kaggle profile links in your resume and cover letter.',
      confidence: 'Kaggle rankings turn "interested in ML" into "proven modeling skills."'
    },
    tasks: APPLICATION_TASKS['kaggle-rankings'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'math-stats-prep',
    skill: 'Math & Stats Preparation',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You know linear algebra, probability, and optimization fundamentals cold',
      'You have reviewed and can explain gradient descent and regularization',
      'You understand evaluation tradeoffs: bias-variance, precision-recall'
    ],
    advice: {
      awareness: 'Many ML roles gate interviews on math fluency. Without it, you get filtered before the phone screen.',
      understanding: 'Preparation process: review foundations → practice explaining simply → practice derivations.',
      application: 'Review core topics. Write plain-English explanations for 10 concepts.',
      readiness: 'You can explain any core concept without surprises or hand-waving.',
      execution: 'Be precise. Ground explanations in intuition first, then formalism.',
      confidence: 'Math fluency opens doors to research-adjacent and senior ML roles.'
    },
    tasks: APPLICATION_TASKS['math-stats-prep'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'company-research',
    skill: 'Company Research',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You know the ML stack of 5 target companies',
      'You can name their key ML problems and recent launches',
      'You have identified 2 ML team members on LinkedIn'
    ],
    advice: {
      awareness: 'Generic applications get ignored. Tailored ones show genuine interest in the team\'s ML problems.',
      understanding: 'Research reveals: frameworks they use, problems they solve, and how ML fits the business.',
      application: 'Pick 3 companies. Find their engineering blog, model launches, and team structure.',
      readiness: 'You can explain why your skills match their specific ML challenges.',
      execution: 'Reference company-specific ML problems in your cover letter.',
      confidence: 'Research turns "I need a job" into "I can improve your recommendation system."'
    },
    tasks: APPLICATION_TASKS['company-research'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'application-tailoring',
    skill: 'Application Tailoring',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'Each cover letter references a specific company ML problem',
      'Your resume bullets are reordered to match the job description',
      'You mention relevant domain and frameworks upfront'
    ],
    advice: {
      awareness: 'One resume for all ML roles is a myth. Tailoring increases response rates significantly.',
      understanding: 'ML recruiters scan for: domain match, framework match, and deployment experience.',
      application: 'Take one ML JD. Highlight required tools and domain. Mirror them in your resume.',
      readiness: 'You can tailor an application in under 15 minutes per role.',
      execution: 'Use a master resume. Copy-paste relevant bullets. Adjust domain framing.',
      confidence: 'Tailored applications feel personal. Personal gets ML interviews.'
    },
    tasks: APPLICATION_TASKS['application-tailoring'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'referral-strategy',
    skill: 'Referral Strategy',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have identified 10+ potential referrers at target ML teams',
      'You have a warm introduction request template for ML professionals',
      'You follow up with referrers after application submission'
    ],
    advice: {
      awareness: 'Referrals bypass the ATS and dramatically increase interview odds at most tech companies.',
      understanding: 'A referral from an ML team member carries more weight than a recruiter connection.',
      application: 'Find 3 ML professionals at your target company. Request an informational interview.',
      readiness: 'You have a 30-second ask: "I applied for X. Would you be open to referring me?"',
      execution: 'Build the relationship first. Ask for advice on the team or stack. Then ask for referral.',
      confidence: 'Referrals turn cold applications into warm conversations with ML teams.'
    },
    tasks: APPLICATION_TASKS['referral-strategy'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
];

// ─── CHAPTER 4: INTERVIEWS (10 nodes) ─────────────────────────────
export const INTERVIEW_SKILL_NODES: SkillNode[] = [
  {
    id: 'interview-prep',
    skill: 'Interview Prep',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have a 30-second elevator pitch for ML roles',
      'You can explain your best project or competition result in 2 minutes',
      'You have practiced with an ML professional at least 3 times'
    ],
    advice: {
      awareness: 'Walking into an ML interview unprepared is like training a model without validating your data first.',
      understanding: 'ML interviews test: coding, system design, statistics, and applied judgment.',
      application: 'Record yourself answering "Tell me about yourself" and "Walk me through a project."',
      readiness: 'You can pitch, explain your project, and whiteboard a pipeline without notes.',
      execution: 'Schedule mock interviews with ML professionals. Get feedback on technical depth.',
      confidence: 'Preparation turns interview anxiety into interview confidence.'
    },
    tasks: INTERVIEW_TASKS['interview-prep'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'ml-system-design',
    skill: 'ML System Design',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You can design an end-to-end ML system: data, features, model, serving, monitoring',
      'You understand batch vs real-time inference tradeoffs',
      'You can whiteboard a recommendation or fraud detection pipeline'
    ],
    advice: {
      awareness: 'ML system design is the ML equivalent of a coding interview. Weak system design = filtered senior candidates.',
      understanding: 'Interviewers test: can you frame the problem, choose reasonable models, and plan for production concerns?',
      application: 'Practice 10 ML system design prompts. Draw the full pipeline for each.',
      readiness: 'You can design any common ML system with a clear structure and tradeoffs.',
      execution: 'Practice out loud. Always cover monitoring and retraining, not just modeling.',
      confidence: 'ML system design fluency proves you can build systems, not just train models.'
    },
    tasks: INTERVIEW_TASKS['ml-system-design'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'python-ml-engineering',
    skill: 'Python for ML Engineering',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You can write modular, testable Python for training pipelines',
      'You understand packaging, config management, and reproducibility',
      'You can refactor a notebook into production-quality code'
    ],
    advice: {
      awareness: 'Most ML tools run on Python. Weak engineering skills = weak ML engineer, regardless of modeling talent.',
      understanding: 'Interviewers test: can you write clean pipelines? Handle configs? Write basic tests?',
      application: 'Refactor a notebook project into modular scripts with tests and config files.',
      readiness: 'You can write clean, testable ML code without excessive hand-holding.',
      execution: 'Use Python for every project end-to-end. Build reusable pipeline components.',
      confidence: 'Engineering fluency separates production ML engineers from notebook-only practitioners.'
    },
    tasks: INTERVIEW_TASKS['python-ml-engineering'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'coding-dsa-for-ml',
    skill: 'Coding & DSA for ML',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You can solve medium-level DSA problems within 25-30 minutes',
      'You can implement a core ML algorithm (k-means, k-NN, linear regression) from scratch',
      'You have practiced explaining your approach out loud before coding'
    ],
    advice: {
      awareness: 'Most ML roles still include a general coding round. Skipping this prep is a common, avoidable mistake.',
      understanding: 'Interviewers test: can you write correct, efficient code and communicate your reasoning?',
      application: 'Solve 5 medium DSA problems and 1-2 from-scratch ML implementations.',
      readiness: 'You can solve a new medium problem within the time limit while narrating your thinking.',
      execution: 'Practice daily. Time-box every problem. Review mistakes after each attempt.',
      confidence: 'Coding fluency clears the general engineering bar in ML interviews.'
    },
    tasks: INTERVIEW_TASKS['coding-dsa-for-ml'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'model-evaluation-metrics',
    skill: 'Model Evaluation Metrics',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You can choose the right metric for imbalanced, regression, and ranking problems',
      'You understand the precision-recall tradeoff with a concrete example',
      'You can explain why accuracy is often a misleading metric'
    ],
    advice: {
      awareness: 'Model evaluation is one of the most commonly asked ML interview topics. Weak metric fluency signals shallow experience.',
      understanding: 'Interviewers test: can you justify a metric choice with the business context, not just recite definitions?',
      application: 'Match 3 scenarios to appropriate metrics with justification.',
      readiness: 'You can defend any metric choice with a concrete business consequence.',
      execution: 'Ground every explanation in a real scenario, not abstract definitions.',
      confidence: 'Metric fluency proves you understand what "good" actually means for a given problem.'
    },
    tasks: INTERVIEW_TASKS['model-evaluation-metrics'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'ml-case-study-scenario',
    skill: 'ML Case Study Scenario',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You can walk through a full case: problem, data, features, model, evaluation, deployment',
      'You can identify failure modes: data leakage, label bias, drift',
      'You have practiced tabletop-style case walkthroughs'
    ],
    advice: {
      awareness: 'ML case studies are the ultimate applied interview test — they combine judgment, technical depth, and communication.',
      understanding: 'Interviewers evaluate: problem framing, technical soundness, and awareness of what could go wrong.',
      application: 'Practice 3 case studies: a classification problem, a ranking problem, a forecasting problem.',
      readiness: 'You can lead a case walkthrough without notes, from problem to deployment plan.',
      execution: 'Always name failure modes and mitigations. Communicate clearly with a non-technical audience in mind.',
      confidence: 'Case study fluency proves you can apply ML to real business problems, not just benchmarks.'
    },
    tasks: INTERVIEW_TASKS['ml-case-study-scenario'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'llm-genai-fundamentals',
    skill: 'LLM & GenAI Fundamentals',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You understand attention, tokenization, and the difference between fine-tuning and prompting',
      'You can explain RAG and when it is preferable to fine-tuning',
      'You have a clear answer for evaluating generative AI output quality'
    ],
    advice: {
      awareness: 'LLM and GenAI fluency is expected in most 2026 ML interviews, even for non-NLP roles.',
      understanding: 'Interviewers test: can you reason about cost, latency, and hallucination risk, not just describe capabilities?',
      application: 'Review core concepts. Trace through a small RAG pipeline conceptually or in code.',
      readiness: 'You can explain any core LLM concept simply and discuss practical tradeoffs.',
      execution: 'Ground answers in real constraints: cost, latency, evaluation difficulty.',
      confidence: 'LLM/GenAI fluency proves you are current with where the field has moved.'
    },
    tasks: INTERVIEW_TASKS['llm-genai-fundamentals'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'on-site-prep',
    skill: 'On-Site Prep',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You know the interview loop: coding, ML system design, case study, team fit',
      'You have questions ready for each interviewer',
      'You have researched the team\'s recent ML launches and problems'
    ],
    advice: {
      awareness: 'ML on-sites are marathons. Multiple technical rounds drain energy fast.',
      understanding: 'Each round tests different things: depth, breadth, judgment, and culture fit.',
      application: 'Prepare distinct questions for each interviewer type. Practice technical whiteboarding.',
      readiness: 'You can adapt your pitch to IC, manager, and cross-functional audiences.',
      execution: 'Bring a notebook. Take notes. Reference earlier conversations in later rounds.',
      confidence: 'A well-prepared on-site feels like a series of conversations, not interrogations.'
    },
    tasks: INTERVIEW_TASKS['on-site-prep'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'research-vs-production',
    skill: 'Research vs Production',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You can explain the difference between research-grade and production-grade ML work',
      'You have experience in at least one: exploratory modeling or production deployment',
      'You understand production concerns: versioning, drift monitoring, rollback'
    ],
    advice: {
      awareness: 'ML roles are divided: research-leaning vs production-leaning. Know which you fit and why.',
      understanding: 'Interviewers test: do you understand both sides? Can you reason about production readiness?',
      application: 'Compare a research notebook approach vs a production pipeline for the same problem.',
      readiness: 'You can articulate why you lean research or production, and how you collaborate with the other.',
      execution: 'If research-leaning: demonstrate experimentation rigor. If production-leaning: demonstrate reliability engineering.',
      confidence: 'Understanding both sides makes you a stronger, more versatile ML candidate.'
    },
    tasks: INTERVIEW_TASKS['research-vs-production'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'interview-followup',
    skill: 'Interview Follow-Up',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You send a thank-you email within 24 hours to every interviewer',
      'Your email references a specific technical discussion from the interview',
      'You reiterate your interest and one concrete fit reason'
    ],
    advice: {
      awareness: 'A thoughtful follow-up can tip a close decision in your favor.',
      understanding: 'Follow-ups show professionalism, enthusiasm, and attention to detail.',
      application: 'Draft a template thank-you email. Personalize for each interviewer.',
      readiness: 'You send follow-ups within 4 hours of every interview.',
      execution: 'Reference a specific topic: "I enjoyed discussing the RAG pipeline..." Reaffirm interest.',
      confidence: 'Follow-ups keep you top of mind while the hiring committee deliberates.'
    },
    tasks: INTERVIEW_TASKS['interview-followup'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
];

// ─── CHAPTER 5: OFFER PREPARATION (3 nodes) ─────────────────────────
export const OFFER_PREPARATION_SKILL_NODES: SkillNode[] = [
  {
    id: 'certification-prep',
    skill: 'Certification Prep',
    domain: 'Offer Preparation',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have identified 1-2 relevant certifications: DeepLearning.AI, AWS ML Specialty, Google ML Engineer',
      'You have a study plan with weekly milestones',
      'You have scheduled the exam or completion date'
    ],
    advice: {
      awareness: 'Certifications are not always required for ML roles, but they strengthen a case for career-changers.',
      understanding: 'DeepLearning.AI: foundational theory. AWS/GCP ML certs: cloud deployment fluency.',
      application: 'Pick one certification. Create a 4-week schedule. Schedule the exam.',
      readiness: 'You can pass a practice exam or quiz with a strong score.',
      execution: 'Study consistently. Pair learning with a small applied project.',
      confidence: 'A certification in progress signals commitment to employers.'
    },
    tasks: OFFER_TASKS['certification-prep'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'take-home-project-process',
    skill: 'Take-Home Project Process',
    domain: 'Offer Preparation',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You understand the typical structure of an ML take-home assignment',
      'You have a reusable project template and write-up format',
      'You have practiced completing a take-home within the suggested time limit'
    ],
    advice: {
      awareness: 'Take-home projects gate many ML offers. Being efficient and structured with them saves energy for the rest of the process.',
      understanding: 'Companies evaluate: problem framing, code quality, and the write-up — not just final model performance.',
      application: 'Complete a practice take-home project within a time-box. Prepare a write-up template.',
      readiness: 'You can complete a take-home and produce a clear write-up within the suggested time.',
      execution: 'State assumptions explicitly. Respect the time limit. Highlight what you would improve with more time.',
      confidence: 'A repeatable take-home process turns a stressful gate into a showcase of your best work.'
    },
    tasks: OFFER_TASKS['take-home-project-process'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'resignation-letter',
    skill: 'Resignation Letter',
    domain: 'Offer Preparation',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have a draft resignation letter ready',
      'It is professional, concise, and expresses gratitude',
      'You have a transition plan for your current ML responsibilities'
    ],
    advice: {
      awareness: 'A graceful exit preserves references and reputation. The ML community is smaller than it looks.',
      understanding: 'Resignation letters are simple documents. Keep them positive, factual, and brief.',
      application: 'Draft your letter. Keep it under 150 words. No complaints, no demands.',
      readiness: 'You can submit your resignation calmly, professionally, and without drama.',
      execution: 'Give standard notice. Offer to document models, pipelines, and ongoing experiments.',
      confidence: 'A professional exit leaves doors open for future ML opportunities.'
    },
    tasks: OFFER_TASKS['resignation-letter'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
];

// ─── CHAPTER 6: OFFER (6 nodes) ─────────────────────────────────────
export const OFFER_SKILL_NODES: SkillNode[] = [
  {
    id: 'offer-evaluation',
    skill: 'Offer Evaluation',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have a spreadsheet comparing all offers: base, bonus, equity, team, tech stack',
      'You weighted factors: research time, mentorship, compute access, growth',
      'You discussed the offer with a mentor or advisor'
    ],
    advice: {
      awareness: 'The highest base salary is not always the best ML offer. Evaluate holistically.',
      understanding: 'Consider: base, bonus, equity, compute budget, team quality, and problem impact.',
      application: 'Create a weighted scorecard. Rank each factor 1-5. Multiply by importance.',
      readiness: 'You can defend your top choice with data, not just gut feeling.',
      execution: 'Sleep on it. Discuss with peers. Consider the 3-5 year trajectory, not just today.',
      confidence: 'A thorough evaluation ensures you accept the right ML role.'
    },
    tasks: OFFER_TASKS['offer-evaluation'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'salary-negotiation',
    skill: 'Salary Negotiation',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have a target range, a walk-away number, and a BATNA',
      'You practiced negotiation scripts with a friend',
      'You know when to negotiate base vs equity vs sign-on bonus'
    ],
    advice: {
      awareness: 'Most ML offers have 10-20% flexibility. Not asking leaves money on the table.',
      understanding: 'Negotiate the total package: base, bonus, equity, and even compute/training budget.',
      application: 'Write your ask: "Based on my research, I was hoping for $X." Practice 10 times.',
      readiness: 'You can make your ask confidently, justify it with data, and handle pushback.',
      execution: 'Always negotiate in writing. Give a range, not a number. Anchor high.',
      confidence: 'A successful negotiation can meaningfully add to your first-year compensation.'
    },
    tasks: OFFER_TASKS['salary-negotiation'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'decision-framework',
    skill: 'Decision Framework',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have a structured decision matrix for comparing offers',
      'You weighted long-term growth over short-term compensation',
      'You have a "no regrets" criterion for accepting or declining'
    ],
    advice: {
      awareness: 'Decision paralysis costs time and momentum. A framework simplifies complex choices.',
      understanding: 'Use a weighted matrix: score each offer on factors that matter to you.',
      application: 'List 6-7 factors. Weight them. Score each offer. Multiply and sum.',
      readiness: 'Your top choice is clear and defensible to yourself and others.',
      execution: 'Set a deadline. Gather input. Decide. Commit. Move on.',
      confidence: 'A framework turns emotional decisions into rational ones.'
    },
    tasks: OFFER_TASKS['decision-framework'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'offer-acceptance',
    skill: 'Offer Acceptance',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have accepted the offer in writing with all terms confirmed',
      'You have a start date and onboarding schedule',
      'You have notified other companies that you are off the market'
    ],
    advice: {
      awareness: 'A verbal acceptance is not binding. Get it in writing before celebrating.',
      understanding: 'Written confirmation protects both sides: role, start date, compensation, equity, benefits.',
      application: 'Review offer letter carefully. Ask for clarification on ambiguous terms.',
      readiness: 'You have signed and returned the offer letter. It is real.',
      execution: 'Confirm start date. Ask about equipment and access. Prepare your first 30-60-90 day plan.',
      confidence: 'A signed offer is the culmination of your ML job search. Celebrate, then prepare to excel.'
    },
    tasks: OFFER_TASKS['offer-acceptance'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'toolkit-setup',
    skill: 'Toolkit Setup',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have installed the company ML stack: framework, orchestration tool, cloud CLI',
      'You have access to key compute resources and data documentation',
      'You have bookmarked internal documentation and style guides'
    ],
    advice: {
      awareness: 'Day 1 is too late to set up tools. Prepare your environment before you start.',
      understanding: 'A smooth setup impresses your manager and lets you contribute faster.',
      application: 'Install required tools. Set up your environment. Request access to compute/data.',
      readiness: 'You can run a basic training job and reproduce a result on day 1.',
      execution: 'Ask for tool list before start date. Set up locally. Practice with public datasets.',
      confidence: 'A prepared toolkit turns a nervous first day into a confident first week.'
    },
    tasks: OFFER_TASKS['toolkit-setup'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'start-transition',
    skill: 'Start Transition',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have a 30-60-90 day plan for your new ML role',
      'You have identified key stakeholders: manager, senior ML engineer, product/data partner',
      'You have set personal goals for the first quarter: model shipped, tool learned, paper read'
    ],
    advice: {
      awareness: 'The first 90 days define your ML trajectory. A plan turns anxiety into momentum.',
      understanding: 'Managers evaluate new hires on: learning speed, early wins, and collaboration.',
      application: 'Write a 30-60-90 day plan. Share it with your manager on day 1.',
      readiness: 'You know your first project, your key stakeholders, and your success metrics.',
      execution: 'Listen more than speak in week 1. Deliver a small win in week 2: a fixed bug or small model improvement.',
      confidence: 'A strong start builds credibility that compounds over your entire ML tenure.'
    },
    tasks: OFFER_TASKS['start-transition'] || [],
    estimatedMinutes: 30,
    difficulty: 2,
  },
];
