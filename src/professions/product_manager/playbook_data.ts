import type { PlaybookEntry } from '@/core/playbook/playbook_types';

export const PRODUCT_MANAGER_PLAYBOOK: PlaybookEntry[] = [
  {
    id: 'resume/pm-resume-summary-formulas',
    title: 'PM Resume Summary Formulas',
    category: 'resume',
    professionId: 'product_manager',
    overview:
      'A PM resume summary should signal product domain, ownership level, the metric you moved, and the type of company you target — not a list of soft skills or a generic mission statement.',
    guides: [
      'Lead with your product domain: B2B SaaS, consumer, marketplace, mobile, platform',
      'Name the metric you moved: retention, DAU, revenue, activation, NPS',
      'Specify the company stage you excelled at: startup, scale-up, or enterprise',
      'Include one product philosophy that makes you distinctive',
      'Keep to 2-3 lines maximum — no buzzwords',
    ],
    templates: [
      'Product Manager with 3 years growing B2B SaaS products from 0-to-1. Shipped features that drove 40% improvement in 30-day retention for a 50K-user platform. Seeking PM role at a Series A-C company with a strong data culture.',
      'Senior PM specializing in consumer mobile growth. Led redesign of onboarding flow that lifted activation from 34% to 61%, contributing to $3M incremental ARR. Looking for a growth PM role at a product-led company.',
      'Technical PM with engineering background. Built integrations platform adopted by 200+ enterprise clients. Comfortable owning the full stack from API design to go-to-market. Targeting platform PM roles at mid-size tech companies.',
    ],
    examples: [
      'PM with 2 years of 0-to-1 experience at an early-stage fintech startup. Shipped core payment flow from concept to 10K daily transactions. Strong in user research, SQL, and cross-functional alignment.',
      'Growth PM focused on activation and retention. Led 15 A/B tests per quarter, with a 60% win rate. North star metric ownership: DAU/MAU ratio improved from 18% to 29% in 6 months.',
    ],
    checklist: [
      'Summary is 2-3 lines',
      'Product domain is specified',
      'One metric with context is included',
      'No buzzwords: passionate, visionary, detail-oriented, self-starter',
      'Company type target is clear',
    ],
    tags: ['summary', 'resume', 'positioning', 'metrics', 'domain'],
  },
  {
    id: 'resume/pm-impact-bullet-guide',
    title: 'PM Impact Bullet Formula',
    category: 'resume',
    professionId: 'product_manager',
    overview:
      'PM resume bullets that describe responsibilities are ignored. Bullets that show ownership, a decision, and a metric are read twice. The formula: Led [what] → resulting in [metric] → enabling [business outcome].',
    guides: [
      'Start with an ownership verb: Led, Shipped, Defined, Prioritized, Negotiated, Drove',
      'Name the initiative specifically: not "new feature" but "mobile checkout redesign"',
      'Add the metric with context: not just "+18% conversion" but "+18% checkout conversion (23% → 41%)"',
      'Connect to business outcome: "enabling $1.2M estimated incremental ARR"',
      'One bullet per achievement — do not combine multiple wins',
    ],
    templates: [
      'Led [initiative] that resulted in [metric movement], contributing to [business outcome].',
      'Shipped [feature] to [user count] users in [timeframe], achieving [metric] and enabling [outcome].',
      'Defined and executed [strategy], moving [metric] from [X] to [Y] and [secondary metric].',
    ],
    examples: [
      'Before: "Managed onboarding redesign project with engineering and design teams."',
      'After: "Led onboarding redesign shipped to 200K users; activation improved 23→41%, contributing to $1.2M estimated incremental ARR."',
      'Before: "Worked on retention improvements for mobile app."',
      'After: "Shipped 3 retention features in Q3; 30-day retention improved from 31% to 47%, reducing estimated monthly churn cost by $180K."',
    ],
    checklist: [
      'Bullet starts with an ownership verb',
      'Initiative is specifically named',
      'Metric shows before and after values',
      'Business outcome connects to revenue, users, or efficiency',
      'One bullet = one achievement',
    ],
    tags: ['resume', 'bullets', 'metrics', 'impact', 'ownership'],
  },
  {
    id: 'interviews/pm-product-sense-framework',
    title: 'Product Sense Interview Framework',
    category: 'interviews',
    professionId: 'product_manager',
    overview:
      'Product sense questions test whether you think like a product owner: starting from users and pain, not features. The framework: Clarify → Users → Pain → Solutions → Prioritize → Metrics → Trade-offs.',
    guides: [
      'Always clarify scope before starting: "Are we optimizing for growth, engagement, or monetization?"',
      'Segment users first: power users vs new users vs churned users — they have different pains',
      'Name 2-3 user pain points before naming any solution',
      'Generate 3+ solution options before prioritizing — show breadth before depth',
      'Define success metric before pitching the feature — not after',
      'State trade-offs explicitly: what you are NOT building and why',
    ],
    templates: [
      'Let me clarify the goal first. Are we optimizing for [X] or [Y]? [Answer.] Great. I will focus on [Z].',
      'For users, I see 3 key segments: [A], [B], [C]. The highest-value problem to solve is [pain] for [segment].',
      'Given that pain, I can imagine several solutions: [1], [2], [3]. I would prioritize [1] because [rationale].',
      'I would measure success by [primary metric]. I would watch [guardrail metric] to ensure we do not [negative outcome].',
    ],
    examples: [
      '"How would you improve Spotify?" — Start with: "Are we optimizing for listener retention or creator growth?" Then segment: casual listeners, power users, podcast listeners. Then pain: casual users drop off after free trial expires. Then solutions: better discovery, smarter radio, social listening. Prioritize: social listening (high engagement, low cost). Metric: 30-day retention of free tier users.',
    ],
    checklist: [
      'Clarified scope and goal before starting',
      'Identified 2+ user segments',
      'Named user pain before solutions',
      'Generated 3+ solutions before picking one',
      'Defined success metric and at least one guardrail',
      'Stated explicit trade-offs',
    ],
    tags: ['product sense', 'interviews', 'framework', 'users', 'metrics'],
  },
  {
    id: 'interviews/pm-metrics-framework',
    title: 'PM Metrics Interview Framework',
    category: 'interviews',
    professionId: 'product_manager',
    overview:
      'Metric questions are in every PM interview. The framework: Goal → North Star → Guardrail Metrics → Diagnostic Breakdown. For metric drop questions: External → Segment → Platform → Feature → Data.',
    guides: [
      'Start by defining the goal: "The goal of this feature is to increase [business outcome]."',
      'North star metric: the single number that best captures the value delivered to users',
      'Guardrail metrics: what you watch to ensure you did not harm another part of the system',
      'Diagnostic metrics: lower-level metrics that explain why the north star moved',
      'For metric drops: check external first (holidays, outages), then segment (mobile/web), then feature-level',
    ],
    templates: [
      'The goal of [feature] is to [business outcome]. I would measure success with [north star metric]. I would watch [guardrail] to ensure we do not hurt [other area]. If the north star drops, I would diagnose by looking at [diagnostic 1], [diagnostic 2], and [diagnostic 3].',
    ],
    examples: [
      'Metric drop framework for a 20% DAU drop: (1) External: check for app store outage, holidays, competitor launch. (2) Segment: is it iOS or Android? New vs returning? Specific country? (3) Platform: did a recent deploy correlate? (4) Feature: which screens/features saw the biggest drop in engagement? (5) Data: is it a real drop or a tracking bug?',
    ],
    checklist: [
      'Goal defined before metrics',
      'North star metric named and justified',
      'At least one guardrail metric identified',
      'Diagnostic breakdown provided',
      'Metric drop diagnosis uses the 5-step framework',
    ],
    tags: ['metrics', 'interviews', 'north star', 'diagnosis', 'framework'],
  },
];
