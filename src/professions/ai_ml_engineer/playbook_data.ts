import type { PlaybookEntry } from '@/core/playbook/playbook_types';

// Playbook content for the AI / Machine Learning Engineer profession.
// Same PlaybookEntry shape used by software_engineer, data_analyst, and
// cybersecurity, tagged with professionId 'ai_ml_engineer' so it renders
// correctly for this profession's users across all 8 fixed category tabs.
export const AI_ML_ENGINEER_PLAYBOOK: PlaybookEntry[] = [
  {
    id: 'resume/ml-summary-formulas',
    title: 'Resume Summary Formulas',
    category: 'resume',
    professionId: 'ai_ml_engineer',
    overview:
      'An ML resume summary should signal your domain specialization (NLP/CV/recommenders/MLOps), your framework fluency, and concrete proof you can ship — a shipped model, a competition result, or a deployed pipeline.',
    guides: [
      'State your target domain clearly: NLP, Computer Vision, Recommender Systems, MLOps',
      'Lead with the strongest proof you have (a deployed model, a Kaggle rank, a paper implementation)',
      'Name your core frameworks (PyTorch, TensorFlow, MLflow) so keyword search finds you',
      'Include one measurable outcome — metric improved, latency reduced, cost cut',
      'Mirror exact keywords from the job description — many ML postings are ATS-screened for framework names',
      'Keep it to 2-3 lines; save the depth for your portfolio and model-impact entries below',
    ],
    templates: [
      'ML Engineer (PyTorch, MLflow) with hands-on experience shipping a churn prediction model to production, improving recall 18% while cutting inference cost 30%.',
      'Aspiring Applied Scientist transitioning from data analytics. Top 5% finish in 2 Kaggle competitions, comfortable with scikit-learn, XGBoost, and basic deep learning workflows.',
      'Entry-level MLOps-focused engineer with coursework in distributed training and model serving. Built and deployed an end-to-end recommendation pipeline as a capstone project.',
    ],
    examples: [
      'PyTorch-focused ML engineer with a documented end-to-end fraud-detection pipeline (data ingestion, training, FastAPI serving). Wrote 3 model iterations improving AUC from 0.81 to 0.91. Seeking junior ML Engineer role.',
      'NLP-focused practitioner with Kaggle top 10% finish on a text classification competition and a documented RAG pipeline project. Seeking junior applied scientist role.',
    ],
    checklist: [
      'Summary states a specific target domain, not just "AI/ML"',
      'Names at least one project, competition result, or deployed model as proof',
      'Mentions concrete frameworks by name',
      'Includes one measurable detail (metric improvement, latency, cost)',
      'Under 3 lines',
    ],
    tags: ['summary', 'headline', 'positioning', 'frameworks'],
  },
  {
    id: 'resume/portfolio-showcase',
    title: 'Turning a Project Portfolio Into Resume Evidence',
    category: 'resume',
    professionId: 'ai_ml_engineer',
    overview:
      'Without prior ML employment, a documented end-to-end project is the strongest evidence you can offer that you can actually ship. Recruiters and hiring managers in ML consistently rate a well-written pipeline bullet above generic coursework.',
    guides: [
      'Describe the pipeline briefly — data source, framework, model architecture',
      'State what problem or benchmark you tackled',
      'Explain what you measured, improved, or deployed — the outcome, not just the setup',
      'Link a write-up (blog or GitHub) if you have one — this turns a bullet into verifiable proof',
      'Update the portfolio every few months as you learn new techniques; stale projects read as one-off tutorials',
    ],
    templates: [
      'Built an end-to-end recommendation pipeline (PyTorch two-tower model + FastAPI serving) trained on public interaction data; improved offline NDCG by 15% over a popularity baseline and documented latency under 40ms p99.',
      'Fine-tuned a transformer model for sentiment classification on a domain-specific dataset; documented full training, evaluation, and error analysis in a public write-up.',
    ],
    examples: [
      'Weak: "Built a machine learning model to learn ML."\nStrong: "Trained and deployed a demand-forecasting model on 2 years of retail data; reduced MAPE from 22% to 14% versus the existing baseline and documented the full pipeline in a public repo."',
    ],
    checklist: [
      'Project description names the actual frameworks/platforms used',
      'States a specific problem or benchmark, not just "practiced ML"',
      'Includes an outcome or metric, even a self-measured one',
      'Write-up or repo link included if available',
      'Project content is recent (updated within the last few months)',
    ],
    tags: ['portfolio', 'resume', 'proof-of-skill', 'end-to-end'],
  },
  {
    id: 'linkedin/ml-headline-and-kaggle',
    title: 'LinkedIn Headline & Kaggle Showcase',
    category: 'linkedin',
    professionId: 'ai_ml_engineer',
    overview:
      'ML recruiters search LinkedIn for framework names and domain keywords as often as job titles. Your headline and featured section should make your specialization and proof-of-skill searchable in five seconds.',
    guides: [
      'Include your target role and 2-3 frameworks/domain keywords in the headline — not just "AI Enthusiast"',
      'Use the Featured section to pin your best Kaggle write-up, project repo, or published article',
      'Post short technical breakdowns of projects or competitions you completed — this builds a visible track record',
      'Join and stay active in 2-3 ML-focused LinkedIn/Discord/Slack communities relevant to your target domain',
      'Add your certifications directly to the Licenses & Certifications section, not just the headline',
    ],
    templates: [
      'Aspiring ML Engineer | PyTorch | MLflow | End-to-End Pipelines',
      'Junior Applied Scientist | NLP | Kaggle Top 5% | Transformer Fine-Tuning',
      'MLOps-Focused Engineer | Kubernetes | Model Serving | CI/CD for ML',
    ],
    examples: [
      'Before: "ML student passionate about AI" → low recruiter search visibility.\nAfter: "ML Engineer (PyTorch) | Recommender Systems | Model Serving" → appears in recruiter searches for those exact terms.',
    ],
    checklist: [
      'Headline includes target role and named frameworks/domain, not generic buzzwords',
      'At least one project write-up or Kaggle result pinned in Featured',
      'Certifications added to the Licenses & Certifications section',
      'Active in at least one relevant ML community',
      'Headline under 120 characters',
    ],
    tags: ['linkedin', 'headline', 'kaggle', 'certifications', 'visibility'],
  },
  {
    id: 'linkedin/technical-writing-for-visibility',
    title: 'Technical Writing as a Visibility Strategy',
    category: 'linkedin',
    professionId: 'ai_ml_engineer',
    overview:
      'In a field this fast-moving, publicly explaining a technique or reviewing a paper is one of the fastest ways to demonstrate depth without needing a production job title yet.',
    guides: [
      'Pick topics slightly ahead of "beginner" — explain a technique you just learned well, in your own words',
      'Include a diagram or a small code snippet in every article; pure prose reads as shallower than it is',
      'Reference the specific paper, blog, or dataset you drew from — this builds credibility, not just content',
      'Post consistently over sporadic bursts — a monthly cadence beats ten posts in one week and silence after',
      'Engage with comments; a good discussion thread often reaches more recruiters than the original post',
    ],
    templates: [
      'Article structure: "What is [technique]? A practical explanation" → motivation, one diagram, a minimal code example, when to use it, when not to.',
    ],
    examples: [
      'Candidate wrote a short explainer on LoRA fine-tuning with a simple diagram and a 15-line code snippet; it was shared by two ML engineers at target companies and led to an informational interview request.',
    ],
    checklist: [
      'Has a running list of 3-5 planned topics slightly ahead of current skill level',
      'Every article includes at least one visual or code snippet',
      'Sources and references are cited explicitly',
      'Posts on a consistent, sustainable cadence',
      'Actively responds to comments and questions',
    ],
    tags: ['linkedin', 'writing', 'visibility', 'technical-depth'],
  },
  {
    id: 'applications/take-home-and-portfolio-prep',
    title: 'Applying With a Take-Home Project Pipeline',
    category: 'applications',
    professionId: 'ai_ml_engineer',
    overview:
      'Many ML roles gate an offer behind a take-home project rather than (or in addition to) a whiteboard round. Treating this as a repeatable process — not a one-off scramble — saves energy and produces better work.',
    guides: [
      'Build a reusable project template before you need it: folder structure, README skeleton, requirements file',
      'Respect the suggested time limit; going far over it signals poor scoping judgment more than it signals extra effort',
      'State your assumptions explicitly in the write-up — ambiguity handling is part of what is being evaluated',
      'Include a "what I would do with more time" section — this is read as maturity, not incompleteness',
      'Keep a private log of take-homes completed and feedback received, to improve the template over time',
    ],
    templates: [
      'Take-home write-up skeleton: Assumptions → Approach → Results (with a table/plot) → Limitations → What I\\u2019d do with more time.',
    ],
    examples: [
      'Candidate reused a personal take-home template (structured README, evaluation script, results table) across 4 different companies\\u2019 assignments, cutting the time spent on each from 8 hours to 3-4 while improving clarity of the final write-up.',
    ],
    checklist: [
      'Has a reusable project template ready before a take-home is assigned',
      'Completed at least one practice take-home within a realistic time-box',
      'Write-up explicitly states assumptions and limitations',
      'Includes a clear evaluation/results section, not just code',
      'Tracks take-homes completed and feedback for future improvement',
    ],
    tags: ['take-home', 'applications', 'portfolio', 'process'],
  },
  {
    id: 'applications/kaggle-and-portfolio-tracking',
    title: 'Tracking Kaggle Rank & Portfolio Applications',
    category: 'applications',
    professionId: 'ai_ml_engineer',
    overview:
      'In ML, your Kaggle ranking and project portfolio function like a work-sample test recruiters can verify. Track and present them the same way you would track job applications — deliberately, not as an afterthought.',
    guides: [
      'Keep a running log of competitions entered, rank/percentile, and techniques used',
      'Write a short public write-up for your best 2-3 competitions or projects',
      'Link your Kaggle profile and write-up repo directly in every application where a portfolio field exists',
      'Tailor which write-ups you highlight to the role — NLP roles want text-model write-ups, MLOps roles want pipeline/deployment write-ups',
      'Track applications the same way: company, role, date applied, status, follow-up date',
    ],
    templates: [
      'Portfolio line for applications: "Kaggle profile: Top 8%, 4 competitions — github.com/[you]/ml-writeups"',
      'Application tracker columns: Company | Role | Date Applied | Portfolio Version Sent | Status | Follow-up Date',
    ],
    examples: [
      'Candidate tailored which 2 write-ups to link per application (NLP write-up for NLP roles, deployment write-up for MLOps roles) instead of sending the same generic profile link everywhere — got a noticeably higher response rate.',
    ],
    checklist: [
      'Kaggle rank/percentile and competition count documented and current',
      'At least 2 project or competition write-ups published',
      'Portfolio link included in every application with a relevant field',
      'Write-ups selected match the target role\\u2019s domain',
      'Application tracker kept up to date with follow-up dates',
    ],
    tags: ['kaggle', 'portfolio', 'applications', 'tracking'],
  },
  {
    id: 'interview/ml-system-design-fundamentals',
    title: 'Technical Interview Guide: ML System Design',
    category: 'interviews',
    professionId: 'ai_ml_engineer',
    overview:
      'ML system design interviews check whether you can turn a vague product prompt into a structured, production-aware pipeline. Interviewers are checking for structured judgment, not a single "correct" architecture.',
    guides: [
      'Always start by clarifying the business objective and constraints before naming any model',
      'Walk through the pipeline in order: data → features → model choice → training → serving → monitoring',
      'Explicitly name the tradeoff you are making at each stage (latency vs accuracy, batch vs real-time)',
      'Never skip the post-deployment story — mention monitoring, drift detection, and retraining cadence',
      'Practice narrating out loud while sketching; silent thinking reads as uncertainty in a live interview',
    ],
    templates: [
      'ML system design skeleton: (1) Clarify objective & constraints, (2) Data sources & labels, (3) Feature engineering, (4) Model choice & baseline, (5) Offline evaluation, (6) Serving architecture (batch/real-time), (7) Monitoring & retraining plan.',
      'Common tradeoff phrasing: "A simpler model gives us faster iteration and easier debugging now; a more complex model may gain 2-3 points of AUC but adds latency and retraining cost — I\\u2019d start simple and justify complexity with measured gains."',
    ],
    examples: [
      'Candidate asked to "design a fraud detection system" spent the first 3 minutes clarifying volume, latency requirements, and false-positive cost before naming any model — interviewer noted this framing discipline positively even before the technical content began.',
    ],
    checklist: [
      'Clarifies business objective and constraints before proposing a model',
      'Covers the full pipeline: data to serving to monitoring',
      'States at least 2 explicit tradeoffs during the design',
      'Includes a concrete monitoring/retraining plan',
      'Narrates reasoning out loud while sketching, not silently',
    ],
    tags: ['interview', 'system-design', 'ml-pipeline', 'tradeoffs'],
  },
  {
    id: 'interview/coding-and-metrics-fundamentals',
    title: 'Technical Interview Guide: Coding, Metrics & LLM Basics',
    category: 'interviews',
    professionId: 'ai_ml_engineer',
    overview:
      'Beyond system design, most ML interviews still test general coding fluency, metric judgment, and — increasingly in 2026 — baseline LLM/GenAI literacy. These rounds reward precision and honest tradeoff reasoning over encyclopedic recall.',
    guides: [
      'Practice implementing a core ML algorithm from scratch (k-means, k-NN, or linear regression) without a library',
      'Know when to reach for precision, recall, F1, AUC-ROC, or AUC-PR — and be ready to justify the choice with a business scenario',
      'Prepare a plain-language explanation of attention, fine-tuning vs prompting, and RAG — interviewers probe for practical judgment, not textbook definitions',
      'Practice explaining your code as you write it — narrating builds interviewer confidence',
      'Always ground metric or LLM-approach choices in a concrete cost/latency/business consequence',
    ],
    templates: [
      'Metric decision quick reference:\\nImbalanced classification (e.g. fraud) → precision/recall, AUC-PR over accuracy\\nRanking/recommendation → NDCG, MRR\\nForecasting → MAPE, RMSE depending on error sensitivity\\nGenerative output quality → task-specific human eval + automated proxy metrics, rarely a single number',
      'LLM approach decision: "For a narrow, stable knowledge domain I\\u2019d lean toward RAG over fine-tuning — it\\u2019s cheaper to update and reduces hallucination risk versus baking facts into weights."',
    ],
    examples: [
      'Candidate asked "why not just use accuracy?" for a fraud model explained that with 0.1% fraud prevalence, a model predicting "never fraud" scores 99.9% accuracy while catching zero fraud — and pivoted to precision/recall as the honest metric.',
    ],
    checklist: [
      'Can implement at least one core ML algorithm from scratch',
      'Can justify a metric choice with a concrete business scenario',
      'Has a plain-language explanation ready for attention, fine-tuning vs prompting, and RAG',
      'Narrates code and reasoning out loud during live coding',
      'Grounds LLM-related answers in cost/latency/hallucination tradeoffs',
    ],
    tags: ['interview', 'coding', 'metrics', 'llm', 'genai'],
  },
  {
    id: 'offer/negotiating-ml-compensation',
    title: 'Negotiating ML Compensation & Equity',
    category: 'offer',
    professionId: 'ai_ml_engineer',
    overview:
      'ML compensation packages often include a meaningful equity component alongside base and bonus, and vary widely by company stage. Understanding the full package — not just the base number — is essential before negotiating.',
    guides: [
      'Research market compensation by role, level, and company stage (levels.fyi, Glassdoor, peer benchmarks) before responding to an offer',
      'Ask for the full breakdown: base, bonus, equity (RSU/options), vesting schedule, sign-on bonus',
      'For equity-heavy offers at earlier-stage companies, weigh dilution risk and realistic exit timelines, not just the headline grant value',
      'Negotiate the full package, not just base — training/compute budget and conference attendance can matter for ML roles specifically',
      'Always confirm any negotiated terms in writing before accepting',
    ],
    templates: [
      'Negotiation opener: "Thank you for the offer — I\\u2019m excited about the team and the problems. Based on my research and other conversations in progress, I was hoping we could get closer to $X base with the equity/bonus structure as proposed."',
    ],
    examples: [
      'Candidate received two offers — one cash-heavy at a large company, one equity-heavy at an early-stage startup — and built a simple scenario model (conservative/moderate/optimistic equity outcomes) before deciding, rather than comparing headline numbers directly.',
    ],
    checklist: [
      'Researched market compensation for the specific role, level, and company stage',
      'Has the full offer breakdown in writing: base, bonus, equity, vesting',
      'Modeled equity value under at least a conservative and optimistic scenario if equity is significant',
      'Has a written negotiation ask prepared, not just a verbal target',
      'Confirmed any negotiated changes in writing before accepting',
    ],
    tags: ['offer', 'negotiation', 'equity', 'compensation'],
  },
  {
    id: 'offer/first-month-toolkit-and-transition',
    title: 'Preparing Your First Month as an ML Engineer',
    category: 'offer',
    professionId: 'ai_ml_engineer',
    overview:
      'The gap between accepting an offer and starting is a low-pressure window to prepare — reviewing the team\\u2019s stack, refreshing fundamentals, and handling any transition out of a current role professionally.',
    guides: [
      'Ask your future manager which specific frameworks, orchestration tools, and cloud platform the team uses day-to-day',
      'Review public documentation for the team\\u2019s core tools before day one, if available',
      'Refresh your notes on the ML fundamentals most relevant to the team\\u2019s domain (e.g. recommender systems math, or transformer basics for an NLP team)',
      'If leaving a current role, give standard notice and offer to document any models, pipelines, or experiments you own',
      'Set realistic expectations for month one: learning the codebase and data matters more than shipping immediately',
    ],
    templates: [
      'Pre-start prep checklist: (1) review vendor docs for the team\\u2019s ML framework/orchestration tool, (2) refresh core math/domain fundamentals, (3) re-read 1-2 papers relevant to the team\\u2019s domain, (4) confirm start date logistics and required access/equipment, (5) submit resignation with standard notice if applicable.',
    ],
    examples: [
      'New ML engineer spent one weekend reviewing their new employer\\u2019s feature store documentation before day one — was able to follow along in onboarding training instead of learning the tool from scratch under time pressure.',
    ],
    checklist: [
      'Asked which specific frameworks/tools the team uses day-to-day',
      'Reviewed public documentation for at least the core orchestration/serving tool named',
      'Refreshed fundamentals relevant to the team\\u2019s specific domain',
      'Resignation/notice handled professionally if coming from another role',
      'Realistic expectations set for a learning-focused first month',
    ],
    tags: ['offer', 'onboarding', 'toolkit', 'transition'],
  },
  {
    id: 'communication/ml-jargon-for-non-technical-stakeholders',
    title: 'Explaining ML Concepts to Non-Technical Stakeholders',
    category: 'communication',
    professionId: 'ai_ml_engineer',
    overview:
      'Some interviewers and future stakeholders (hiring managers, product partners, cross-functional panels) won\\u2019t have deep ML background. Being able to explain what a model does and why it matters — without dumbing it down — is a distinct, learnable skill.',
    guides: [
      'Lead with the business impact before the technical detail: what decision does this model improve, not just what architecture it uses',
      'Use one concrete analogy per concept, then offer to go deeper if they want (don\\u2019t force it)',
      'Avoid strings of acronyms in a row — spell out the first use of any acronym (e.g. "AUC, or area under the curve")',
      'Check in mid-explanation: "Should I go more technical, or is this the right level?"',
      'Practice a 30-second and a 2-minute version of your elevator pitch for what you do',
    ],
    templates: [
      '30-second version: "I build models that predict what\\u2019s likely to happen next — like which customers might churn — so the business can act before it happens, instead of after."',
      '2-minute version, when asked to expand: adds the specific method (e.g. "I train the model on past customer behavior to spot early warning patterns, similar to how a doctor learns to recognize early symptoms") and one concrete example outcome.',
    ],
    examples: [
      'Weak: "I fine-tuned a transformer with LoRA and evaluated it with BLEU and human eval."\nStrong (to a non-technical interviewer): "I adapted a language model to our specific use case efficiently, without retraining it from scratch, and checked its quality both with an automated score and by having people review real examples."',
    ],
    checklist: [
      'Has a prepared 30-second, jargon-free explanation of their role',
      'Has a prepared 2-minute expanded version with one analogy',
      'Practiced spelling out acronyms on first use',
      'Comfortable checking in on technical depth mid-answer',
      'Removed unnecessary acronym strings from prepared answers',
    ],
    tags: ['communication', 'jargon', 'non-technical', 'elevator-pitch'],
  },
  {
    id: 'body_language/composure-in-ml-case-interviews',
    title: 'Projecting Composure in ML Case Study Interviews',
    category: 'body_language',
    professionId: 'ai_ml_engineer',
    overview:
      'ML case study and system design interviews are often intentionally open-ended and ambiguous — because that\\u2019s what real ML problems look like. How you carry yourself while thinking through ambiguity matters as much as your final architecture.',
    guides: [
      'When given an ambiguous prompt, pause deliberately for a few seconds and ask 1-2 clarifying questions before diving in',
      'Keep your posture upright and hands visible even when thinking through a hard technical scenario',
      'If you don\\u2019t know an answer, say so calmly and pivot to how you\\u2019d investigate or estimate it — don\\u2019t freeze or over-apologize',
      'For live coding or whiteboarding, narrate your process steadily rather than going silent while typing or drawing',
      'On video calls, keep your camera framing steady; don\\u2019t look away for long stretches when checking notes',
    ],
    templates: [
      'Composure script for a stumped moment: "I haven\\u2019t worked with that exact scenario before. Here\\u2019s how I\\u2019d approach figuring it out: [state your investigation steps calmly]." Said steadily, this reads as competence, not failure.',
    ],
    examples: [
      'Candidate was given an ambiguous "design a content moderation system" prompt. Rather than guessing immediately, they asked two clarifying questions about scale and false-positive tolerance, then narrated their design calmly — this was rated highly even though the final architecture was fairly standard.',
    ],
    checklist: [
      'Practiced pausing and asking clarifying questions before diving into ambiguous prompts',
      'Maintains upright, open posture during technical questions',
      'Has a calm scripted response for "I don\\u2019t know, but here\\u2019s how I\\u2019d find out"',
      'Practiced narrating thought process during any live coding/whiteboard exercise',
      'Camera framing and eye contact stable during video interviews',
    ],
    tags: ['body_language', 'composure', 'ambiguity', 'interview'],
  },
  {
    id: 'confidence/imposter-syndrome-in-ml',
    title: 'Managing Imposter Syndrome Entering ML',
    category: 'confidence',
    professionId: 'ai_ml_engineer',
    overview:
      'ML has an unusually visible, fast-moving research and social-media community, which makes newcomers feel behind by comparison. This is a mindset problem, not a skills gap — most working ML engineers do not read every paper or use every new technique on day one either.',
    guides: [
      'Remind yourself that job postings list "nice to have" skills as if they\\u2019re required — you don\\u2019t need every listed framework to be a strong candidate',
      'Compare yourself to where you started, not to researchers years into their career on social media',
      'Keep a running list of concrete things you\\u2019ve done (projects, competitions, certifications) to counter the vague feeling of "not enough"',
      'Before interviews, review that concrete list instead of scrolling ML social media, which tends to amplify comparison',
      'Reframe not knowing the latest paper or technique as normal and expected, not as evidence you don\\u2019t belong',
    ],
    templates: [
      'Pre-interview reframe: "I don\\u2019t need to know every recent paper a research scientist knows. I need to show I can frame problems clearly, iterate rigorously, and ship something that works. That\\u2019s what this interview is actually testing."',
    ],
    examples: [
      'Candidate felt behind seeing cutting-edge research content on social media, despite having a solid applied project portfolio appropriate for the junior ML engineer roles they were applying to. Reviewing their own concrete accomplishment list before interviews reduced pre-interview anxiety significantly.',
    ],
    checklist: [
      'Keeps a written list of concrete accomplishments (projects, competitions, certs) to review before interviews',
      'Avoids comparing entry-level readiness to research-level practitioners\\u2019 public content right before interviews',
      'Has a reframe ready for "I don\\u2019t know" moments that treats them as normal, not disqualifying',
      'Targets roles matching current level rather than assuming research-level knowledge is required',
      'Reviewed accomplishment list within 24 hours of each interview',
    ],
    tags: ['confidence', 'imposter-syndrome', 'mindset', 'entry-level'],
  },
];
