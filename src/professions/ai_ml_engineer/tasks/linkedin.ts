import type { TaskContent } from '@/core/task_content';

export const LINKEDIN_TASKS: Record<string, TaskContent[]> = {
  'headline-authority': [
    {
      id: 'aiml-ha-write-variants',
      title: 'Write Headline Variants',
      objective: 'Craft a LinkedIn headline that signals ML specialization and seniority.',
      instructions: [
        'Write 5 headline variants under 120 characters.',
        'Include: role, domain (NLP/CV/recommenders/MLOps), and one standout signal (metric, competition rank, publication).',
        'Remove "seeking opportunities" and generic buzzwords like "AI enthusiast".',
        'Test variants with a peer or mentor in ML.',
      ],
      completionCriteria: [
        'Headline names a specific role: ML Engineer, Applied Scientist, MLOps Engineer.',
        'Headline includes a domain or standout signal.',
        'Under 120 characters.',
      ],
      estimatedMinutes: 15,
      difficulty: 1,
      tips: [
        'LinkedIn search weights headline heavily. ML keywords matter more than creativity.',
        'If you have a Kaggle rank or paper, put it in the headline.',
        'Avoid emoji overload — one is enough if any.',
      ],
      expectedOutcome: 'A headline that attracts inbound messages from ML recruiters.',
    },
  ],
  'about-section': [
    {
      id: 'aiml-as-write-about',
      title: 'Write Your About Section',
      objective: 'Craft an About section that tells your ML career story.',
      instructions: [
        'Write 3 paragraphs: background, a key project or competition result, what you are looking for.',
        'Include one specific metric or outcome from a real project.',
        'End with a clear call to action: what roles/domains you are open to.',
      ],
      completionCriteria: [
        'About section tells a story, not just a skills list.',
        'Includes one specific project outcome.',
        'Ends with a clear call to action.',
      ],
      estimatedMinutes: 25,
      difficulty: 2,
      tips: [
        'Use first person. Keep paragraphs short.',
        'Mention your specialization clearly so search and recruiters can match you.',
        'Read it aloud — if it takes over 30 seconds, trim it.',
      ],
      expectedOutcome: 'A compelling About section that turns profile views into recruiter outreach.',
    },
  ],
  'network-connections': [
    {
      id: 'aiml-nc-outreach-plan',
      title: 'Build Your ML Network Outreach Plan',
      objective: 'Grow a targeted network of ML practitioners and hiring managers.',
      instructions: [
        'Identify 10 ML engineers, applied scientists, or hiring managers at target companies.',
        'Send 5 personalized connection requests this week, referencing shared interests (a paper, a competition, an OSS project).',
        'Engage weekly with posts from ML leaders you follow.',
        'Request 1-2 informational interviews with people in roles you want.',
      ],
      completionCriteria: [
        'At least 5 personalized connection requests sent.',
        'At least 1 informational interview requested.',
        'A weekly engagement habit started (comments, shares).',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Quality over quantity — target people at companies and in roles you actually want.',
        'Comment thoughtfully on technical posts, not just "Great post!".',
        'A warm connection is worth more than ten cold applications.',
      ],
      expectedOutcome: 'A growing network that surfaces referrals and hidden ML opportunities.',
    },
  ],
  'kaggle-writeups': [
    {
      id: 'aiml-kw-publish-writeup',
      title: 'Publish a Competition or Project Writeup',
      objective: 'Turn a Kaggle competition or personal project into a public writeup.',
      instructions: [
        'Pick one Kaggle competition or personal ML project you completed.',
        'Write it up: problem, data, approach, what worked, what did not, final result/leaderboard position.',
        'Include code snippets and one or two key plots (feature importance, learning curves, confusion matrix).',
        'Publish on LinkedIn or Medium and link it from your profile.',
      ],
      completionCriteria: [
        'Writeup includes problem, approach, and final result.',
        'At least one plot or visualization included.',
        'Published and linked from your profile.',
      ],
      estimatedMinutes: 40,
      difficulty: 3,
      tips: [
        'A well-written writeup proves technical depth and communication ability.',
        'Include what you tried that failed — it shows real experimentation, not just a lucky submission.',
        'Tag #MachineLearning #Kaggle for reach.',
      ],
      expectedOutcome: 'A public writeup that turns your profile into a portfolio recruiters can verify.',
    },
  ],
  'ml-blog': [
    {
      id: 'aiml-mb-write-article',
      title: 'Write Your First ML Article',
      objective: 'Publish a technical article that demonstrates ML depth and clear communication.',
      instructions: [
        'Pick a topic: explain a technique (e.g. attention mechanisms), analyze a paper, or review a tool.',
        'Structure: motivation, explanation with an example, practical takeaway.',
        'Keep it under 900 words with at least one diagram or code snippet.',
        'Publish and share with your network.',
      ],
      completionCriteria: [
        'Article has clear structure: motivation, explanation, takeaway.',
        'Includes a diagram, plot, or code snippet.',
        'Published and shared.',
      ],
      estimatedMinutes: 45,
      difficulty: 3,
      tips: [
        'Explaining a concept clearly is itself evidence of understanding it deeply.',
        'Link to the paper or docs you are referencing.',
        'Consistency matters more than length — a short clear article beats a rambling long one.',
      ],
      expectedOutcome: 'An article that positions you as a thoughtful ML practitioner, not just a model-runner.',
    },
  ],
  'certifications-display': [
    {
      id: 'aiml-cd-add-certifications',
      title: 'Add Certifications and Assessments',
      objective: 'Make your ML credentials visible and verifiable on LinkedIn.',
      instructions: [
        'Add relevant certifications: DeepLearning.AI, AWS ML Specialty, Google ML Engineer, TensorFlow Developer.',
        'Include credential IDs and verification links where available.',
        'Complete LinkedIn Skills Assessments for Python and Machine Learning.',
        'Order certifications by relevance to your target role.',
      ],
      completionCriteria: [
        'At least one certification listed with a verification link.',
        'Skills Assessments completed for at least 2 relevant skills.',
        'Certifications ordered by relevance.',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Certifications matter more for career-changers than for people with strong project portfolios.',
        'A completed specialization signals structured learning, not just tutorial-hopping.',
        'Pair certifications with a project that applies what you learned.',
      ],
      expectedOutcome: 'Certifications and assessments that add social proof to your profile.',
    },
  ],
};
