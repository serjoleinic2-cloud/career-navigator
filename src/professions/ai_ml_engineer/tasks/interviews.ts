import type { TaskContent } from '@/core/task_content';

export const INTERVIEW_TASKS: Record<string, TaskContent[]> = {
  'interview-prep': [
    {
      id: 'aiml-ip-record-pitch',
      title: 'Record Your Interview Pitch',
      objective: 'Prepare a confident, structured self-introduction for ML interviews.',
      instructions: [
        'Write a 30-second elevator pitch: background, specialization, one standout project.',
        'Record yourself answering "Tell me about yourself" and "Walk me through a project."',
        'Watch the recording and note filler words or unclear parts.',
        'Practice with a peer or mentor at least 3 times.',
      ],
      completionCriteria: [
        'Elevator pitch is under 30 seconds and specific.',
        'Recording reviewed and revised at least once.',
        'Practiced live with another person at least 3 times.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Lead with your specialization, not a generic "I love AI" opener.',
        'Have one project ready to go deep on in under 2 minutes.',
        'Preparation turns interview anxiety into interview confidence.',
      ],
      expectedOutcome: 'A polished, confident opening that sets the tone for the whole interview.',
    },
  ],
  'ml-system-design': [
    {
      id: 'aiml-msd-practice-design',
      title: 'Practice an ML System Design Question',
      objective: 'Build fluency designing end-to-end ML systems under interview conditions.',
      instructions: [
        'Pick a classic prompt: "Design a recommendation system" or "Design a fraud detection pipeline."',
        'Structure your answer: problem framing, data, features, model choice, serving, monitoring.',
        'Draw the pipeline on a whiteboard or paper within 25 minutes.',
        'Identify tradeoffs: latency vs accuracy, batch vs real-time, model complexity vs interpretability.',
      ],
      completionCriteria: [
        'Full pipeline sketched: data to serving to monitoring.',
        'At least 2 tradeoffs explicitly discussed.',
        'Completed within a 25-30 minute time-box.',
      ],
      estimatedMinutes: 30,
      difficulty: 3,
      tips: [
        'Interviewers care more about structured thinking than a "correct" architecture.',
        'Always mention monitoring and retraining — most candidates forget the post-deployment story.',
        'Practice 3-4 different prompts, not just one, to build a reusable framework.',
      ],
      expectedOutcome: 'A reusable framework for answering any ML system design question.',
    },
  ],
  'python-ml-engineering': [
    {
      id: 'aiml-pme-write-pipeline',
      title: 'Write a Clean Training Pipeline',
      objective: 'Demonstrate production-quality Python for ML, not just notebook code.',
      instructions: [
        'Take one notebook-based experiment and refactor it into modular scripts.',
        'Separate: data loading, feature engineering, training, evaluation.',
        'Add type hints, docstrings, and basic unit tests for one function.',
        'Add a config file or CLI args instead of hardcoded values.',
      ],
      completionCriteria: [
        'Pipeline is split into at least 3 clear modules.',
        'At least one function has a unit test.',
        'No hardcoded paths or hyperparameters left in code.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Interviewers at MLE-heavy companies often ask you to review or write clean pipeline code live.',
        'Reproducibility (seeds, config, versioning) is a common follow-up question.',
        'Show you know the difference between research code and production code.',
      ],
      expectedOutcome: 'A refactored pipeline that demonstrates engineering discipline, not just modeling skill.',
    },
  ],
  'coding-dsa-for-ml': [
    {
      id: 'aiml-cd-practice-problems',
      title: 'Practice Coding & DSA for ML Interviews',
      objective: 'Build coding fluency for the general software rounds most ML interviews include.',
      instructions: [
        'Solve 5 medium-level problems covering arrays, hash maps, and trees/graphs.',
        'Solve 1-2 problems that resemble ML-adjacent coding (e.g. implement k-means, sliding window).',
        'Practice explaining your approach out loud before coding.',
        'Time-box each problem to 25-30 minutes.',
      ],
      completionCriteria: [
        '5+ general DSA problems solved.',
        'At least 1 ML-adjacent implementation problem solved from scratch.',
        'Solutions explained out loud, not just typed silently.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Many ML roles still include a standard coding round — do not skip this prep.',
        'Practicing "think aloud" matters as much as getting the right answer.',
        'Implementing k-NN, k-means, or a simple neural net forward pass from scratch is a common ask.',
      ],
      expectedOutcome: 'Coding fluency that clears the general software engineering bar in ML interviews.',
    },
  ],
  'model-evaluation-metrics': [
    {
      id: 'aiml-mem-explain-metrics',
      title: 'Master Model Evaluation Metrics',
      objective: 'Be able to choose and defend the right evaluation metric for any scenario.',
      instructions: [
        'Review: precision/recall, F1, AUC-ROC, AUC-PR, calibration, RMSE/MAE.',
        'For 3 different scenarios (imbalanced fraud detection, regression forecasting, ranking), pick the right metric and justify it.',
        'Explain the precision/recall tradeoff with a concrete business example.',
        'Practice answering "why not just use accuracy?" clearly.',
      ],
      completionCriteria: [
        '3 scenarios matched to appropriate metrics with justification.',
        'Precision/recall tradeoff explained with a business example.',
        'Can explain in under 2 minutes why accuracy is often misleading.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'This is one of the most commonly asked ML interview questions — do not wing it.',
        'Ground every metric choice in a business consequence, not just a definition.',
        'Know the difference between offline metrics and online business metrics.',
      ],
      expectedOutcome: 'Fluent, scenario-grounded answers about model evaluation.',
    },
  ],
  'ml-case-study-scenario': [
    {
      id: 'aiml-mcs-practice-case',
      title: 'Practice a Full ML Case Study',
      objective: 'Rehearse a full applied ML case study end-to-end.',
      instructions: [
        'Pick a case: "Build a churn prediction model" or "Improve search relevance."',
        'Walk through: business problem, data available, features, model choice, evaluation, deployment plan.',
        'Time-box the full walkthrough to 30-40 minutes as if presenting to a hiring panel.',
        'Identify what could go wrong (data leakage, label bias, drift) and how you would catch it.',
      ],
      completionCriteria: [
        'Full case walked through from business problem to deployment plan.',
        'At least 2 failure modes identified and mitigations proposed.',
        'Completed within the time-box.',
      ],
      estimatedMinutes: 30,
      difficulty: 3,
      tips: [
        'Case studies test judgment as much as technical knowledge.',
        'Always address data leakage and label quality — interviewers listen for this.',
        'Practice out loud with a mock panel if possible, not just in your head.',
      ],
      expectedOutcome: 'A rehearsed case-study narrative you can adapt to almost any applied ML prompt.',
    },
  ],
  'llm-genai-fundamentals': [
    {
      id: 'aiml-lgf-review-fundamentals',
      title: 'Review LLM & GenAI Fundamentals',
      objective: 'Build baseline fluency in transformer and LLM concepts expected in most 2026 ML interviews.',
      instructions: [
        'Review: attention mechanism, tokenization, fine-tuning vs prompting, RAG, evaluation of generative outputs.',
        'Explain the difference between fine-tuning, LoRA, and prompt engineering in your own words.',
        'Build or trace through a small RAG pipeline (retrieval + generation) conceptually or in code.',
        'Prepare one answer for "how would you evaluate a chatbot/LLM feature?"',
      ],
      completionCriteria: [
        'Can explain attention and tokenization simply, without jargon.',
        'Can distinguish fine-tuning, LoRA, and prompting with tradeoffs.',
        'Has a concrete answer for evaluating generative AI output quality.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Most ML interviews in 2026 include at least one LLM/GenAI question, even for non-NLP roles.',
        'Interviewers care about practical judgment: when NOT to use an LLM matters as much as when to use one.',
        'Ground answers in cost, latency, and hallucination risk, not just capability.',
      ],
      expectedOutcome: 'Baseline LLM/GenAI fluency that covers you regardless of role specialization.',
    },
  ],
  'on-site-prep': [
    {
      id: 'aiml-osp-prepare-loop',
      title: 'Prepare for the On-Site Loop',
      objective: 'Get ready for a multi-round ML on-site interview loop.',
      instructions: [
        'Map the likely loop: coding, ML system design, case study/behavioral, team fit.',
        'Prepare 3 questions to ask each type of interviewer (IC, manager, cross-functional partner).',
        'Research the team you are interviewing with and recent product/model launches.',
        'Plan logistics: rest, meals, and breaks between rounds.',
      ],
      completionCriteria: [
        'Loop structure mapped with expected round types.',
        'Questions prepared for at least 2 interviewer types.',
        'Team-specific research completed.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'On-sites are marathons — plan energy management, not just content prep.',
        'Ask different, non-repeated questions to each interviewer; they compare notes.',
        'Bring a notebook and reference earlier conversations in later rounds.',
      ],
      expectedOutcome: 'A well-prepared on-site that feels like a series of conversations, not interrogations.',
    },
  ],
  'research-vs-production': [
    {
      id: 'aiml-rvp-articulate-tradeoffs',
      title: 'Articulate Research vs Production Tradeoffs',
      objective: 'Show you understand the difference between research-grade and production-grade ML work.',
      instructions: [
        'Compare a research notebook approach vs a production pipeline for the same problem.',
        'List tradeoffs: reproducibility, latency, monitoring, retraining, technical debt.',
        'Prepare an answer for "how do you decide when a model is ready for production?"',
        'Identify which side (research-leaning or production-leaning) better fits your target roles.',
      ],
      completionCriteria: [
        'At least 4 concrete tradeoffs listed and explained.',
        'A clear answer prepared for production-readiness criteria.',
        'A stated preference for research-leaning vs production-leaning roles, with reasoning.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Interviewers use this to gauge self-awareness about where you add the most value.',
        'Mention concrete production concerns: model versioning, drift monitoring, rollback plans.',
        'Understanding both sides makes you a stronger candidate even for a specialized role.',
      ],
      expectedOutcome: 'A clear, credible answer about where you sit on the research-to-production spectrum.',
    },
  ],
  'interview-followup': [
    {
      id: 'aiml-if-send-followup',
      title: 'Send a Strong Follow-Up',
      objective: 'Reinforce your candidacy with a thoughtful post-interview email.',
      instructions: [
        'Draft a template thank-you email within 4 hours of the interview.',
        'Personalize it: reference a specific technical discussion or question.',
        'Reiterate your interest in the role and one reason you are a strong fit.',
        'Send to each interviewer or the recruiter, as appropriate.',
      ],
      completionCriteria: [
        'Email sent within 24 hours.',
        'References a specific moment from the interview.',
        'Reaffirms interest and one concrete fit reason.',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'A thoughtful follow-up can tip a close decision in your favor.',
        'Keep it short — 3-4 sentences is enough.',
        'Avoid generic templates; specificity is what stands out.',
      ],
      expectedOutcome: 'A follow-up that keeps you top of mind while the hiring committee deliberates.',
    },
  ],
};
