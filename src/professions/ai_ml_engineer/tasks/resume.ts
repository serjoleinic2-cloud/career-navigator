import type { TaskContent } from '@/core/task_content';

export const RESUME_TASKS: Record<string, TaskContent[]> = {
  'positioning-clarity': [
    {
      id: 'aiml-pc-define-role',
      title: 'Define Your AI/ML Positioning',
      objective: 'Create a clear positioning statement for your AI/ML job search.',
      instructions: [
        'Open 5 current AI/ML Engineer job postings on LinkedIn, Indeed, or Google Careers.',
        'Identify common requirements: PyTorch, TensorFlow, LLMs, MLOps, cloud deployment.',
        'Write one sentence: "AI/ML Engineer specializing in [domain] with [frameworks] for [industry]."',
        'List 3 dream companies hiring AI/ML engineers in your target domain.',
      ],
      completionCriteria: [
        'Positioning statement is under 20 words',
        'At least 3 frameworks/tools mentioned (Python required)',
        '3 target companies identified',
      ],
      estimatedMinutes: 15,
      difficulty: 1,
      tips: [
        'Avoid generic titles like "AI Professional" — be specific: NLP, Computer Vision, Generative AI, MLOps.',
        'Check LinkedIn profiles of AI engineers at your target companies.',
        'Domain matters: fintech ML differs from autonomous driving ML.',
      ],
      expectedOutcome: 'A clear positioning statement that guides your resume, LinkedIn, and interview prep.',
    },
    {
      id: 'aiml-pc-research-market',
      title: 'Research AI/ML Job Market',
      objective: 'Understand the current AI/ML job market in your region.',
      instructions: [
        'Search "ML Engineer" on 3 job boards: LinkedIn, Indeed, Google Careers.',
        'Filter by your location and experience level (Junior/Mid/Senior).',
        'Note the top 5 required skills across postings.',
        'Identify salary ranges for your level using Levels.fyi or Glassdoor.',
      ],
      completionCriteria: [
        '5 job postings analyzed',
        'Top 5 skills documented',
        'Salary range identified for your level',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Look for "MLOps", "LLM", "Generative AI" — these are 2026 high-demand keywords.',
        'Distinguish between research scientist (PhD preferred) and ML engineer (engineering focus).',
      ],
      expectedOutcome: 'Market intelligence that shapes your skill development and application strategy.',
    },
    {
      id: 'aiml-pc-align-resume',
      title: 'Align Resume with Positioning',
      objective: 'Ensure every resume section reinforces your AI/ML positioning.',
      instructions: [
        'Read your current resume from top to bottom.',
        'Mark every section that supports your target AI/ML role.',
        'Highlight sections that are irrelevant or generic.',
        'Write a prioritized list of changes needed.',
      ],
      completionCriteria: [
        'Every section reviewed against positioning statement',
        'At least 3 improvements identified',
        'Irrelevant content flagged for removal',
      ],
      estimatedMinutes: 25,
      difficulty: 1,
      tips: [
        'Remove generic software engineering projects that do not involve models or data.',
        'Add model metrics: accuracy, F1, latency, throughput, dataset size.',
      ],
      expectedOutcome: 'A concrete action plan for repositioning your resume for AI/ML roles.',
    },
  ],
  'ml-skills-matrix': [
    {
      id: 'aiml-sm-rate-skills',
      title: 'Rate Your ML Skills',
      objective: 'Create an honest self-assessment of your ML technical skills.',
      instructions: [
        'List all ML skills: frameworks, model architectures, cloud platforms, MLOps tools.',
        'Rate each 1-5: 1 = heard of it, 3 = used in project, 5 = production deployment.',
        'Add last used date and one project example for each 3+ rating.',
        'Identify 3 skills to improve before applying.',
      ],
      completionCriteria: [
        '15+ skills rated',
        'Each 3+ rating has project evidence',
        '3 improvement goals identified',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Be honest. Inflated ratings hurt you in technical interviews.',
        'Include MLOps: Docker, Kubernetes, MLflow, not just model training.',
      ],
      expectedOutcome: 'A skills matrix that guides your learning plan and resume content.',
    },
    {
      id: 'aiml-sm-document-tools',
      title: 'Document Tool Proficiency',
      objective: 'Prove your tool proficiency with specific examples.',
      instructions: [
        'For each top-rated skill, write one bullet: "Used [tool] to [achieve result] on [dataset]."',
        'Include metrics: accuracy improvement, latency reduction, cost savings.',
        'Organize by category: Frameworks, Cloud, MLOps, Data, Visualization.',
        'Review with an ML engineer friend for accuracy.',
      ],
      completionCriteria: [
        '10+ tool bullets written',
        'Each bullet has a metric',
        'External review completed',
      ],
      estimatedMinutes: 35,
      difficulty: 2,
      tips: [
        'Use STAR format for complex tools: Situation, Task, Action, Result.',
        'Link to GitHub repos or Kaggle notebooks as proof.',
      ],
      expectedOutcome: 'Documented tool proficiency ready for resume and interview use.',
    },
  ],
  'resume-structure': [
    {
      id: 'aiml-rs-reformat',
      title: 'Reformat for AI/ML Roles',
      objective: 'Structure your resume for AI recruiter scanning patterns.',
      instructions: [
        'Place Skills section before Experience if you are junior.',
        'Add Projects section with model cards and dataset descriptions.',
        'Use single-column format. No tables, no graphics.',
        'Ensure contact info includes GitHub, Kaggle, and LinkedIn.',
      ],
      completionCriteria: [
        'Skills section in top third',
        'Projects section with 2+ entries',
        'GitHub and Kaggle links present',
      ],
      estimatedMinutes: 25,
      difficulty: 1,
      tips: [
        'AI recruiters scan for: PyTorch, TensorFlow, LLM, MLOps, AWS/GCP/Azure.',
        'Keep resume to 1 page if < 5 years experience, 2 pages if senior.',
      ],
      expectedOutcome: 'A structurally optimized AI/ML resume.',
    },
    {
      id: 'aiml-rs-star-bullets',
      title: 'Write STAR Bullets with ML Metrics',
      objective: 'Transform experience bullets into AI/ML impact stories.',
      instructions: [
        'Pick 3 experience bullets.',
        'Rewrite each with STAR: Situation, Task, Action, Result.',
        'Add ML-specific metrics: accuracy, F1, BLEU, latency, dataset size.',
        'Remove generic responsibilities like "built models" or "analyzed data".',
      ],
      completionCriteria: [
        '3 STAR bullets written',
        'Each has 1+ ML metric',
        'No generic responsibilities remain',
      ],
      estimatedMinutes: 30,
      difficulty: 1,
      tips: [
        'Example: "Trained Transformer on 10M tokens achieving 92% accuracy, reducing inference time by 40% via quantization."',
        'Quantify dataset size. It signals scale experience.',
      ],
      expectedOutcome: 'Impact-focused bullets that prove AI/ML delivery capability.',
    },
  ],
  'projects-portfolio': [
    {
      id: 'aiml-pp-select-project',
      title: 'Select Portfolio Projects',
      objective: 'Choose 2-3 projects that demonstrate end-to-end ML skills.',
      instructions: [
        'List all ML projects you have worked on.',
        'Score each: complexity, dataset size, model novelty, deployment, metrics.',
        'Pick top 3 with variety: different model types, domains, or deployment modes.',
        'Ensure each has a public GitHub repo or Kaggle notebook.',
      ],
      completionCriteria: [
        '3 projects selected',
        'Each has public code',
        'Projects cover 2+ model types or domains',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Prefer projects with real-world data over toy datasets.',
        'Include one NLP, one CV, or one tabular project to show breadth.',