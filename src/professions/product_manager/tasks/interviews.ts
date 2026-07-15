import type { TaskContent } from '@/core/task_content';

export const INTERVIEW_TASKS: Record<string, TaskContent[]> = {
  'interview-prep': [
    {
      id: 'pm-ip-build-plan',
      title: 'Build a 2-Week PM Interview Prep Plan',
      objective: 'Create a structured daily prep plan covering all PM interview types.',
      instructions: [
        'Map out the 4 PM interview types: product sense, estimation, metrics, behavioral.',
        'Allocate daily practice: 1 product design question Mon-Fri, 1 estimation Tue/Thu, stories always ready.',
        'Find a practice partner or book mock sessions on Exponent or Stellarpeers.',
        'Schedule the plan in your calendar now — block the sessions.',
      ],
      completionCriteria: [
        'Written prep plan covers all 4 PM interview types',
        '14 days of daily practice are scheduled in calendar',
        'At least 1 mock session booked in the first week',
      ],
      estimatedMinutes: 20,
      difficulty: 2,
      tips: [
        'Product sense daily practice is the highest ROI prep activity for PM interviews.',
        'Exponent (tryexponent.com) has a large library of real PM interview questions.',
        'Recording yourself answering and watching back is uncomfortable but highly effective.',
      ],
      expectedOutcome: 'A structured PM prep plan that builds interview readiness in 2 weeks.',
    },
  ],
  'product-sense': [
    {
      id: 'pm-ps-design-feature',
      title: 'Practice 3 Product Design Questions',
      objective: 'Build a consistent product sense framework using real PM interview questions.',
      instructions: [
        'Find 3 product design questions: "Improve Instagram Stories", "Design a product for seniors", "What would you build next for Slack?"',
        'Answer each using the framework: Clarify → Users → Pain points → Solutions → Prioritize → Metrics → Trade-offs.',
        'Time yourself: aim for 20 minutes per question.',
        'Record one answer and watch it back for structure and clarity.',
      ],
      completionCriteria: [
        '3 product design questions answered with the full framework',
        'At least one answer was recorded and reviewed',
        'Each answer defines a user segment before proposing any features',
      ],
      estimatedMinutes: 60,
      difficulty: 3,
      tips: [
        'Never start with solutions. Interviewers will push back hard if you skip user segmentation.',
        'State trade-offs explicitly: "I am choosing X over Y because of Z constraint."',
        'End every answer with success metrics — it shows product maturity.',
      ],
      expectedOutcome: 'A repeatable product sense framework that works across any PM interview question.',
    },
    {
      id: 'pm-ps-product-teardown',
      title: 'Write a 1-Page Product Teardown',
      objective: 'Demonstrate product sense by analyzing a product you use daily.',
      instructions: [
        'Choose a product you use and care about.',
        'Analyze: users, core jobs-to-be-done, north star metric, top 3 strengths, top 3 weaknesses.',
        'Propose one feature improvement with rationale, success metric, and trade-off.',
        'Keep to 1 page. Publish to your portfolio.',
      ],
      completionCriteria: [
        'Teardown covers: users, jobs, metric, strengths, weaknesses, one proposal',
        'One feature proposal has a clear success metric',
        'Published to your portfolio with a public link',
      ],
      estimatedMinutes: 45,
      difficulty: 2,
      tips: [
        'Analyzing products you use shows genuine product curiosity to interviewers.',
        'The "one feature" section is the most important — make it specific and defensible.',
        'Avoid "just add AI" as a feature proposal. Show first-principles thinking.',
      ],
      expectedOutcome: 'A published product teardown that demonstrates PM thinking and strengthens your portfolio.',
    },
  ],
  'estimation-prep': [
    {
      id: 'pm-ep-practice-estimates',
      title: 'Practice 5 PM Estimation Questions',
      objective: 'Build a structured approach to product estimation questions.',
      instructions: [
        'Answer these 5 classics: (1) How many Google searches per day? (2) Uber rides in NYC per week? (3) Spotify MAU? (4) Revenue of a Starbucks location? (5) WhatsApp messages sent daily?',
        'Use: Define scope → Break into components → Estimate each → Sum → Sanity check.',
        'State all assumptions out loud as you go.',
        'Check your answers against public data and note your error margin.',
      ],
      completionCriteria: [
        '5 estimations completed with written component breakdowns',
        'All assumptions stated explicitly',
        'Each answer includes a sanity check against a known reference point',
      ],
      estimatedMinutes: 45,
      difficulty: 2,
      tips: [
        'Memorize key reference numbers: US population 330M, global internet users 5B, iPhone users 1.3B.',
        'Interviewers want to see process, not a correct number. Be loud and explicit about your thinking.',
        'If stuck, anchor from something you do know and work outward.',
      ],
      expectedOutcome: 'A confident estimation approach that performs under interview pressure.',
    },
  ],
  'technical-fluency': [
    {
      id: 'pm-tf-learn-basics',
      title: 'Learn 5 Core Technical PM Concepts',
      objective: 'Build enough technical vocabulary to have credible engineer conversations.',
      instructions: [
        'Study these 5 concepts: (1) REST APIs and how data flows, (2) SQL basics for data queries, (3) Latency vs throughput trade-offs, (4) CDN and caching basics, (5) Mobile vs web architecture differences.',
        'For each, write one sentence explaining it in your own words.',
        'Ask a developer friend to review your explanations.',
        'Practice explaining one concept to a non-technical person.',
      ],
      completionCriteria: [
        '5 concepts understood and explained in your own words',
        'Explanations reviewed by a developer',
        'You can explain one concept without hesitation',
      ],
      estimatedMinutes: 45,
      difficulty: 2,
      tips: [
        'You do not need to code. You need to ask good questions about technical constraints.',
        'Resources: "The PM Interview Book" tech chapter, Exponent technical PM guides.',
        'The goal is to not look surprised when an engineer says "that will break our indexing".',
      ],
      expectedOutcome: 'Technical fluency that earns engineering respect and enables informed PM trade-offs.',
    },
  ],
  'interview-mindset': [
    {
      id: 'pm-im-mindset-practice',
      title: 'Do a PM Mock Interview Under Pressure',
      objective: 'Experience full PM interview conditions to normalize the pressure.',
      instructions: [
        'Book a mock PM interview with a partner, Exponent peer, or use an AI mock tool.',
        'Do NOT use notes. Simulate real conditions: camera on, timer running.',
        'Answer one product sense, one behavioral, and one estimation question.',
        'After, score yourself on: structure, user focus, metrics inclusion, composure.',
      ],
      completionCriteria: [
        '1 full mock interview completed without notes',
        'Self-scored on 4 dimensions after the session',
        '1 specific improvement area identified for next practice session',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'It is always worse than you expect the first time. That is the point.',
        'Slow down your delivery by 20%. Most candidates rush when nervous.',
        'Saying "let me take a moment to structure this" is a strength, not a weakness.',
      ],
      expectedOutcome: 'PM interview composure built through deliberate pressure exposure.',
    },
  ],
  'behavioral-prep': [
    {
      id: 'pm-bp-write-5-stories',
      title: 'Write 5 STAR PM Interview Stories',
      objective: 'Prepare flexible STAR stories covering the core PM behavioral topics.',
      instructions: [
        'Write 5 stories, one each for: (1) influencing without authority, (2) prioritization conflict, (3) feature failure or pivot, (4) cross-functional tension, (5) data-driven decision.',
        'Format each: Situation (2 sentences) → Task (1 sentence) → Action (3 sentences with metric) → Result (outcome + lesson).',
        'Keep each under 2 minutes when spoken aloud.',
        'Practice 2 stories aloud until they feel natural.',
      ],
      completionCriteria: [
        '5 STAR stories written and saved',
        'Each story includes a metric in the Action or Result',
        '2 stories practiced aloud and timed',
      ],
      estimatedMinutes: 45,
      difficulty: 2,
      tips: [
        '"Influencing without authority" is the #1 asked PM behavioral question. Prepare it first.',
        'Good PM stories show a decision you made, not just something that happened to you.',
        'The lesson at the end signals growth mindset — do not skip it.',
      ],
      expectedOutcome: '5 flexible STAR stories that cover 80% of PM behavioral interview questions.',
    },
  ],
  'metrics-interview': [
    {
      id: 'pm-mi-define-metrics',
      title: 'Practice 5 PM Metric Definition Questions',
      objective: 'Build fluency at defining success metrics for any product or feature.',
      instructions: [
        'Answer these 5 questions: (1) How would you measure success for Spotify\'s "DJ" AI feature? (2) What is the north star metric for Airbnb? (3) How do you measure success for a new onboarding flow? (4) A DAU metric dropped 15% — how do you diagnose it? (5) Define guardrail metrics for an ad-insertion experiment.',
        'Structure every answer: goal → primary metric → guardrail metrics → diagnostics.',
        'Practice the metric drop diagnosis question until it is automatic.',
        'Time each answer to under 5 minutes.',
      ],
      completionCriteria: [
        '5 metric questions answered with full structure',
        'Metric drop diagnosis answer completed without notes',
        'Each answer distinguishes north star from guardrail metrics',
      ],
      estimatedMinutes: 45,
      difficulty: 3,
      tips: [
        'Memorize the metric drop diagnosis framework: External → Segment → Platform → Feature → Data issue.',
        'Guardrail metrics are as important as north star metrics in senior PM interviews.',
        'Always define what "success" means before defining which metric measures it.',
      ],
      expectedOutcome: 'Metric interview fluency that handles any product measurement question.',
    },
  ],
  'on-site-prep': [
    {
      id: 'pm-osp-prepare-day',
      title: 'Prepare Your PM On-Site Day',
      objective: 'Plan every detail of the on-site to perform at peak PM interview level.',
      instructions: [
        'Get the interview schedule and list each interviewer\'s name, title, and round type.',
        'Research each interviewer on LinkedIn: their background, recent posts, career path.',
        'Prepare 1 tailored question per interviewer (different from your default list).',
        'Pack: charged laptop, printed resume copies, notebook, pen, water.',
      ],
      completionCriteria: [
        'Each interviewer researched and 1 tailored question prepared',
        'All logistics confirmed: location, time, parking, remote link',
        'One PM story ready that is relevant to each interviewer\'s background',
      ],
      estimatedMinutes: 30,
      difficulty: 1,
      tips: [
        'Ask the recruiter in advance: "What should I focus on in each round?"',
        'Bring a physical notebook. Taking notes during a PM interview shows process orientation.',
        'If it is a take-home assignment round, practice that format specifically.',
      ],
      expectedOutcome: 'A fully prepared PM on-site day that eliminates logistics stress and maximizes performance.',
    },
  ],
  'phone-screen': [
    {
      id: 'pm-phs-practice-pitch',
      title: 'Practice Your 2-Minute PM Phone Pitch',
      objective: 'Perfect the PM "tell me about yourself" answer for phone screen success.',
      instructions: [
        'Write a 2-minute structured intro: background → product I owned → metric I moved → what I am looking for.',
        'Practice it 5 times aloud. Time yourself each time.',
        'Record the 5th attempt. Listen for filler words, pace, and clarity.',
        'Refine based on the recording until it sounds natural and confident.',
      ],
      completionCriteria: [
        '2-minute pitch written and practiced 5+ times',
        'Pitch recorded and reviewed at least once',
        'Pitch includes a specific metric and a clear "what I want next"',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Stand up during phone screens. Voice energy and projection improve significantly.',
        'End your pitch with: "I\'m particularly excited about [Company] because [specific product reason]."',
        'Practice in your car, on walks, anywhere — repetition kills nervousness.',
      ],
      expectedOutcome: 'A polished PM phone pitch that consistently moves you to the product round.',
    },
  ],
  'interview-followup': [
    {
      id: 'pm-if-write-thanks',
      title: 'Write 3 PM Thank-You Email Templates',
      objective: 'Prepare follow-up templates that reinforce your PM candidacy after each round.',
      instructions: [
        'Write Template 1 (after phone screen): brief, mentions one specific topic, reiterates interest.',
        'Write Template 2 (after product round): references a point from your product design discussion.',
        'Write Template 3 (after on-site): personalized for each interviewer, mentions a specific product idea that came up.',
        'Keep each under 150 words.',
      ],
      completionCriteria: [
        '3 thank-you email templates written',
        'Each template references a specific topic from that round type',
        'Templates are under 150 words and actionable to personalize',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Send within 24 hours of every PM interview round — every single time without exception.',
        'Mention one product idea or observation from the interview: "Your comment about retention made me think..."',
        'Separate emails to each on-site interviewer always outperform a single group thank-you.',
      ],
      expectedOutcome: 'A PM follow-up habit that consistently reinforces your candidacy after every round.',
    },
  ],
};
