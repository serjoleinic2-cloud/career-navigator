import type { TaskContent } from '@/core/task_content';

export const RESUME_TASKS: Record<string, TaskContent[]> = {
  'positioning-clarity': [
    {
      id: 'aiml-pc-define-role',
      title: 'Define Your ML Role',
      objective: 'Create one precise positioning statement for your AI/ML job search.',
      instructions: [
        'Open five current ML job postings: ML Engineer, Applied Scientist, MLOps Engineer.',
        'Identify common tools: PyTorch, TensorFlow, scikit-learn, MLflow, Kubernetes.',
        'Write one sentence: "I am a [level] [role] specializing in [domain: NLP/CV/recommenders/MLOps]."',
        'Remove vague words like "passionate", "interested", or "AI enthusiast".',
      ],
      completionCriteria: [
        'Statement is under 20 words.',
        'Specific role is named: ML Engineer, Applied Scientist, or MLOps Engineer.',
        'Domain is specified: NLP, computer vision, recommender systems, or MLOps.',
      ],
      estimatedMinutes: 15,
      difficulty: 1,
      tips: [
        'Mirror job posting language exactly: "ML Engineer, NLP" not "AI person".',
        'Avoid "entry-level" if you have shipped models or placed in competitions.',
        'Focus on one specialization, not "full-stack AI".',
      ],
      expectedOutcome: 'A clear positioning statement that guides your entire ML job search.',
    },
  ],
  'ml-skills-matrix': [
    {
      id: 'aiml-sm-build-matrix',
      title: 'Build Your ML Skills Matrix',
      objective: 'Create a honest, detailed skills matrix for your ML resume.',
      instructions: [
        'List modeling frameworks: PyTorch, TensorFlow/Keras, scikit-learn, XGBoost.',
        'List MLOps tools: MLflow, Docker, Kubernetes, Airflow, SageMaker/Vertex AI.',
        'List foundations: linear algebra, probability, optimization, statistics.',
        'Rate each 1-5: 1 = tutorial, 3 = project-used, 5 = production or competition.',
      ],
      completionCriteria: [
        'Minimum 5 modeling tools and 3 MLOps tools listed.',
        'Every tool has a project or production example.',
        'No inflated ratings (be honest about tutorial vs production experience).',
      ],
      estimatedMinutes: 25,
      difficulty: 2,
      tips: [
        'Include data tooling: pandas, SQL, Spark — most ML roles are 80% data work.',
        'Add cloud ML platforms: AWS SageMaker, GCP Vertex AI, Azure ML.',
        'Soft skills do not belong in a technical matrix.',
      ],
      expectedOutcome: 'A credible skills matrix that passes recruiter screening and interview deep-dives.',
    },
  ],
  'resume-structure': [
    {
      id: 'aiml-rs-reformat-bullet',
      title: 'Reformat One ML Bullet',
      objective: 'Transform a weak bullet into a metric-driven, model-impact statement.',
      instructions: [
        'Pick your weakest resume bullet.',
        'Identify: Problem (business goal), Approach (model/technique), Action (what you built), Result (impact).',
        'Add a metric: accuracy/AUC gain, latency reduction, revenue impact, cost saved.',
        'Lead with the result, then the technique, then the action.',
      ],
      completionCriteria: [
        'Bullet starts with a measurable result.',
        'Technique is explicitly named: XGBoost, transformer fine-tuning, A/B test.',
        'Business outcome is clear: increased conversion, reduced churn, cut inference cost.',
      ],
      estimatedMinutes: 15,
      difficulty: 2,
      tips: [
        'Before: "Built a recommendation model." After: "Shipped a two-tower recommender model that lifted click-through rate 12%, serving 2M requests/day at <50ms p99."',
        'Use action verbs: trained, deployed, optimized, scaled, validated.',
        'One strong bullet beats three weak ones.',
      ],
      expectedOutcome: 'A resume bullet that proves ML impact, not just experimentation.',
    },
  ],
  'ml-portfolio-showcase': [
    {
      id: 'aiml-ps-document-portfolio',
      title: 'Document Your ML Portfolio',
      objective: 'Create a README for your ML portfolio that recruiters can evaluate.',
      instructions: [
        'Pick 2-3 projects: a modeling project, a deployed pipeline, and a from-scratch implementation.',
        'List all tools and versions: PyTorch 2.x, MLflow, Docker, FastAPI.',
        'Document one end-to-end project: data → training → evaluation → deployment.',
        'Include a diagram of the pipeline and screenshots of results/dashboards.',
      ],
      completionCriteria: [
        'README has a pipeline diagram.',
        'One full end-to-end project documented.',
        'Screenshots or plots of evaluation results included.',
      ],
      estimatedMinutes: 45,
      difficulty: 3,
      tips: [
        'Use draw.io or Excalidraw for pipeline diagrams. Export as PNG.',
        'Include evaluation logic: "Model selected via 5-fold CV, AUC 0.91 vs 0.84 baseline."',
        'Show the full lifecycle, not just a notebook: training, serving, monitoring.',
      ],
      expectedOutcome: 'An ML portfolio README that proves hands-on modeling and deployment experience.',
    },
  ],
  'model-impact-stories': [
    {
      id: 'aiml-mis-write-stories',
      title: 'Write Three Model Impact Stories',
      objective: 'Transform experience bullets into model-impact narratives.',
      instructions: [
        'Pick 3 ML projects you worked on (work, competition, or personal).',
        'Format: Problem → Approach → Iteration → Result → Lessons Learned.',
        'Quantify: model metric improvement, latency, cost, business KPI moved.',
        'Write one paragraph per project, under 100 words.',
      ],
      completionCriteria: [
        'All 3 stories follow the problem-to-impact arc.',
        'Each has at least one metric.',
        'Written in plain English, not just jargon.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Use a simple frame: baseline → what you tried → what won → measured impact.',
        'If no production project, use a Kaggle competition or personal project with real data.',
        'Focus on your decisions (feature choices, model selection), not just tools used.',
      ],
      expectedOutcome: 'Three model impact stories that prove you can ship models that matter.',
    },
  ],
  'resume-ats': [
    {
      id: 'aiml-ats-parse-test',
      title: 'Test ATS Parsing for ML Roles',
      objective: 'Ensure your resume parses correctly by corporate and startup ATS.',
      instructions: [
        'Copy your resume into a plain text editor (Notepad).',
        'Check: correct order, no garbled text, dates readable, tools visible.',
        'Compare against an ML job description: highlight keyword matches.',
        'Fix any formatting: tables, columns, headers, images.',
      ],
      completionCriteria: [
        'Plain text version is readable and ordered correctly.',
        'Keywords from target job appear naturally: PyTorch, MLOps, NLP, LLM.',
        'Framework and language versions are visible where relevant.',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Startups often skip ATS but read fast — keep it scannable either way.',
        'Use standard headings: Skills, Experience, Projects, Education.',
        'Save as PDF with selectable text. Avoid scanned images.',
      ],
      expectedOutcome: 'An ATS-friendly resume that reaches ML recruiters and hiring systems.',
    },
  ],
};
