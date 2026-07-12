import type { TaskContent } from '@/core/task_content';

export const INTERVIEW_TASKS: Record<string, TaskContent[]> = {
  'interview-prep': [
    {
      id: 'da-ip-pitch-practice',
      title: 'Practice Your Elevator Pitch',
      objective: 'Deliver a compelling 30-second introduction for DA interviews.',
      instructions: [
        'Write your pitch: who you are, what you do, what you want.',
        'Include one metric-driven achievement.',
        'Practice aloud 10 times. Record yourself.',
        'Get feedback from a friend or mentor.'
      ],
      completionCriteria: [
        'Pitch is under 30 seconds.',
        'Includes one metric.',
        'Delivered confidently without notes.'
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Start with the hook: "I help companies make decisions with data."',
        'End with the ask: "I am looking for a Data Analyst role in fintech."',
        'Practice in front of a mirror. Smile. Energy matters.'
      ],
      expectedOutcome: 'A polished pitch that opens every interview strong.',
    },
  ],
  'sql-whiteboard': [
    {
      id: 'da-sw-whiteboard-practice',
      title: 'Whiteboard SQL Practice',
      objective: 'Master live SQL coding under interview conditions.',
      instructions: [
        'Pick 5 medium SQL problems (LeetCode 50-150, HackerRank).',
        'Practice on a whiteboard or blank document (no IDE).',
        'Talk through your logic: tables, joins, filters, aggregations.',
        'Time yourself: 10 minutes per problem.'
      ],
      completionCriteria: [
        '5 problems completed on whiteboard.',
        'Logic explained aloud for each.',
        'Average time under 10 minutes.'
      ],
      estimatedMinutes: 60,
      difficulty: 3,
      tips: [
        'Start with pseudocode: "I need users, orders, and a join on user_id."',
        'Handle edge cases: NULLs, duplicates, empty results.',
        'Optimize last. Correct first, fast second.'
      ],
      expectedOutcome: 'Confidence in live SQL coding without IDE assistance.',
    },
  ],
  'statistics-fundamentals': [
    {
      id: 'da-sf-study-stats',
      title: 'Study Statistics for Interviews',
      objective: 'Master the statistical concepts tested in DA interviews.',
      instructions: [
        'Study: p-value, confidence interval, Type I/II error, central limit theorem.',
        'Practice explaining each in plain English (no jargon).',
        'Solve 5 problems: hypothesis testing, A/B test analysis, regression interpretation.',
        'Create a cheat sheet: formula, when to use, common mistake.'
      ],
      completionCriteria: [
        '5 concepts explained in plain English.',
        '5 problems solved correctly.',
        'Cheat sheet created and reviewed.'
      ],
      estimatedMinutes: 90,
      difficulty: 4,
      tips: [
        'Use Khan Academy or OpenIntro Statistics (free).',
        'Focus on interpretation, not calculation. Interviewers rarely ask you to compute by hand.',
        'Common question: "What does p=0.03 mean in business terms?"'
      ],
      expectedOutcome: 'Statistical fluency that separates analysts from report generators.',
    },
  ],
  'ab-testing-design': [
    {
      id: 'da-ab-design-test',
      title: 'Design an A/B Test',
      objective: 'Practice the full A/B test design process for product analytics interviews.',
      instructions: [
        'Pick a real feature: "Change checkout button color from green to blue."',
        'Define: hypothesis, primary metric, guardrail metrics, sample size.',
        'Calculate duration based on traffic and MDE.',
        'Write an analysis plan: segments, statistical test, interpretation.'
      ],
      completionCriteria: [
        'Hypothesis is falsifiable and business-relevant.',
        'Sample size calculation shown.',
        'Analysis plan includes segments and stopping rules.'
      ],
      estimatedMinutes: 60,
      difficulty: 4,
      tips: [
        'Minimum Detectable Effect (MDE) is key. Too small = endless test. Too large = misses real effects.',
        'Guardrail metrics prevent harm: "Do not hurt conversion rate while improving click-through."',
        'Always plan for segmentation: mobile vs desktop, new vs returning users.'
      ],
      expectedOutcome: 'A complete A/B test design that impresses product analytics interviewers.',
    },
  ],
  'case-study-framework': [
    {
      id: 'da-cs-practice-case',
      title: 'Practice a Business Case',
      objective: 'Apply a structured framework to ambiguous business problems.',
      instructions: [
        'Pick a case: "Churn is up 20%. Why?" or "How to prioritize 10 features?"',
        'Apply framework: Clarify → Metrics → Hypothesize → Analyze → Recommend → Next Steps.',
        'Time yourself: 5 minutes to structure, 10 minutes to present.',
        'Record yourself. Review for clarity and depth.'
      ],
      completionCriteria: [
        'Case structured in under 5 minutes.',
        'Framework followed without skipping steps.',
        'Recommendation includes risk and next steps.'
      ],
      estimatedMinutes: 45,
      difficulty: 3,
      tips: [
        'Clarify first: "Is churn defined as 30-day or 90-day?"',
        'Hypothesize before analyzing. "I suspect it is a pricing issue because..."',
        'Always include "What data would I need to confirm this?"'
      ],
      expectedOutcome: 'A structured approach to case studies that turns panic into conversation.',
    },
  ],
  'python-pandas-prep': [
    {
      id: 'da-pp-pandas-practice',
      title: 'Practice Pandas Operations',
      objective: 'Master data manipulation with pandas for technical interviews.',
      instructions: [
        'Complete 5 exercises: groupby, merge, pivot, apply, datetime handling.',
        'Practice without Stack Overflow. Use only pandas docs.',
        'Time yourself: 5 minutes per exercise.',
        'Explain your code aloud as you write.'
      ],
      completionCriteria: [
        '5 exercises completed without external help.',
        'Average time under 5 minutes.',
        'Code explained step by step.'
      ],
      estimatedMinutes: 45,
      difficulty: 3,
      tips: [
        'Common interview tasks: merge 3 tables, calculate rolling average, handle missing data.',
        'Know when to use apply vs vectorized operations.',
        'Practice reading CSV with encoding issues and date parsing.'
      ],
      expectedOutcome: 'Pandas fluency that handles live coding challenges confidently.',
    },
  ],
  'data-visualization-pitch': [
    {
      id: 'da-dv-chart-selection',
      title: 'Defend Your Chart Choices',
      objective: 'Practice explaining visualization decisions under interview scrutiny.',
      instructions: [
        'Pick 3 charts from your portfolio.',
        'For each, answer: Why this chart? Why this color? Why this order?',
        'Practice with a friend playing skeptical interviewer.',
        'Refine answers until they are concise and compelling.'
      ],
      completionCriteria: [
        '3 charts defended with clear rationale.',
        'Color and ordering choices justified.',
        'Answers are under 30 seconds each.'
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Bar charts for comparison. Line charts for trends. Scatter for correlation.',
        'Avoid pie charts. Humans are bad at comparing angles.',
        'Color should encode meaning, not just decorate.'
      ],
      expectedOutcome: 'Visualization fluency that proves you can communicate data to stakeholders.',
    },
  ],
  'on-site-prep': [
    {
      id: 'da-os-prep-day',
      title: 'Prepare for On-Site Day',
      objective: 'Plan energy, materials, and strategy for a full-day interview loop.',
      instructions: [
        'Research the interview loop: who, what, when, how long each round.',
        'Prepare 3 questions per interviewer (tailored to their role).',
        'Pack: notebook, pen, water, phone charger, printed resume.',
        'Plan breaks: where to rest, when to eat, how to recharge.'
      ],
      completionCriteria: [
        'Interview loop documented.',
        '3 questions per interviewer prepared.',
        'Logistics planned: transport, parking, arrival time.'
      ],
      estimatedMinutes: 30,
      difficulty: 1,
      tips: [
        'Ask the recruiter for the schedule in advance.',
        'Prepare different pitches for HR, technical, and executive interviewers.',
        'Energy management is key. Do not peak in round 1 and crash in round 4.'
      ],
      expectedOutcome: 'A calm, prepared on-site performance that spans 4-6 hours.',
    },
  ],
  'take-home-presentation': [
    {
      id: 'da-thp-practice-deck',
      title: 'Practice Take-Home Presentation',
      objective: 'Deliver a crisp 15-minute presentation of your analytical work.',
      instructions: [
        'Pick your best project. Create a 5-slide deck.',
        'Slide 1: Problem. Slide 2: Data. Slide 3: Method. Slide 4: Insights. Slide 5: Recommendations.',
        'Practice timing: 2 minutes per slide, 5 minutes for Q&A.',
        'Record yourself. Review for filler words, pacing, and clarity.'
      ],
      completionCriteria: [
        '5-slide deck created.',
        'Presentation under 15 minutes.',
        'Q&A handled confidently.'
      ],
      estimatedMinutes: 60,
      difficulty: 3,
      tips: [
        'Start with the recommendation. Hook them in the first 30 seconds.',
        'One insight per slide. No walls of text.',
        'Anticipate questions: "Why this method?" "What about bias?" "How would you validate?"'
      ],
      expectedOutcome: 'A presentation that turns good analysis into a memorable interview.',
    },
  ],
  'interview-followup': [
    {
      id: 'da-if-send-thanks',
      title: 'Send Thank-You Emails',
      objective: 'Write thoughtful follow-up emails that reinforce your candidacy.',
      instructions: [
        'Draft a template thank-you email.',
        'Personalize for each interviewer: reference a specific topic.',
        'Reiterate one key strength that matches the role.',
        'Send within 4 hours of the interview.'
      ],
      completionCriteria: [
        'Template drafted.',
        'Personalized for each interviewer.',
        'Sent within 4 hours.'
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Reference a specific conversation: "I enjoyed discussing the retention analysis..."',
        'Reiterate interest: "I am excited about the opportunity to..."',
        'Keep it short: 3-4 sentences max.'
      ],
      expectedOutcome: 'Follow-up emails that keep you top of mind during deliberation.',
    },
  ],
};
