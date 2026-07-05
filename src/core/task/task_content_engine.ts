import type { TaskType } from './task_execution_engine';

// ─── Types ──────────────────────────────────────────────────

export type ValidationRule =
  | { type: 'min_checked'; min: number; items: string[] }
  | { type: 'min_length'; min: number; placeholder: string }
  | { type: 'min_rating'; min: number; max: number; question: string }
  | { type: 'exact_match'; correct: string; options: Array<{ value: string; label: string }> };

export interface TaskDefinition {
  id: string;
  chapterId: string;
  nodeId: string;
  title: string;
  description: string;
  type: TaskType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedDuration: number;
  validationType: ValidationRule;
  completionRule: 'all_or_nothing' | 'partial_credit';
  rewards: {
    confidenceBonus: number;
    readinessBonus: number;
    chapterProgress: number;
  };
  feedback: {
    success: string;
    partial: string;
    fail: string;
  };
  recommendation: {
    success: string;
    partial: string;
    fail: string;
  };
}

// ─── Task Library (20 tasks) ────────────────────────────────

export const TASK_LIBRARY: TaskDefinition[] = [
  // ═══════════════════════════════════════════════════════════
  // CHAPTER 1: RESUME (4 tasks)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'task-positioning-clarity',
    chapterId: 'resume',
    nodeId: 'positioning-clarity',
    title: 'Define Your Positioning',
    description: 'Write down your target job title and 3 dream companies. This is the foundation of your entire job search.',
    type: 'TEXT_TASK',
    difficulty: 1,
    estimatedDuration: 5,
    validationType: { type: 'min_length', min: 30, placeholder: 'Target role: ___. Dream companies: 1) ___ 2) ___ 3) ___' },
    completionRule: 'all_or_nothing',
    rewards: { confidenceBonus: 0.10, readinessBonus: 3, chapterProgress: 8 },
    feedback: {
      success: 'Excellent! You now have a clear target. This positioning will guide every resume bullet and interview answer.',
      partial: 'Good start. Try to be more specific about companies and roles.',
      fail: 'Positioning is critical. Take time to define your target before continuing.',
    },
    recommendation: {
      success: 'Proceed to Achievement Framing. Your positioning will make your achievements more compelling.',
      partial: 'Refine your positioning before moving to the next task.',
      fail: 'Spend 10 more minutes on this. Write specific company names and exact job titles.',
    },
  },
  {
    id: 'task-achievement-framing',
    chapterId: 'resume',
    nodeId: 'achievement-framing',
    title: 'Frame Your Achievements',
    description: 'Rewrite 3 responsibilities as achievements with numbers. Use the format: "Achieved X by doing Y, resulting in Z."',
    type: 'TEXT_TASK',
    difficulty: 2,
    estimatedDuration: 10,
    validationType: { type: 'min_length', min: 60, placeholder: 'Achievement 1: ___\nAchievement 2: ___\nAchievement 3: ___' },
    completionRule: 'partial_credit',
    rewards: { confidenceBonus: 0.15, readinessBonus: 5, chapterProgress: 8 },
    feedback: {
      success: 'Powerful! Achievement framing transforms your resume from a job description into a value proposition.',
      partial: 'Some achievements are well-framed. Add more specific numbers and outcomes.',
      fail: 'Focus on results, not duties. Every bullet should answer: "So what? What was the outcome?"',
    },
    recommendation: {
      success: 'Your resume is taking shape. Move to Structure & Formatting.',
      partial: 'Review your weakest achievement and reframe it with a specific metric.',
      fail: 'Study the example: "Reduced customer churn by 15% by implementing feedback loops." Try again.',
    },
  },
  {
    id: 'task-resume-structure',
    chapterId: 'resume',
    nodeId: 'resume-structure',
    title: 'Structure Your Resume',
    description: 'Check all sections that are present and well-formatted in your resume.',
    type: 'CHECKBOX_TASK',
    difficulty: 1,
    estimatedDuration: 5,
    validationType: {
      type: 'min_checked',
      min: 4,
      items: [
        'Clear header with name, phone, email, LinkedIn',
        'Professional summary or objective',
        'Experience section with reverse chronology',
        'Skills section relevant to target role',
        'Education section with dates',
        'Consistent formatting throughout',
      ],
    },
    completionRule: 'partial_credit',
    rewards: { confidenceBonus: 0.10, readinessBonus: 3, chapterProgress: 8 },
    feedback: {
      success: 'Well-structured! A clean format makes recruiters spend more time reading your content.',
      partial: 'Good structure. Add the missing sections to make your resume complete.',
      fail: 'A resume without proper structure gets rejected in 6 seconds. Fix the basics first.',
    },
    recommendation: {
      success: 'Your resume structure is solid. Time for the final polish.',
      partial: 'Complete the missing sections before proceeding.',
      fail: 'Use a proven template. Focus on: header, summary, experience, skills, education.',
    },
  },
  {
    id: 'task-resume-review',
    chapterId: 'resume',
    nodeId: 'resume-review',
    title: 'Resume Self-Review',
    description: 'Rate your resume quality across key dimensions.',
    type: 'SELF_ASSESSMENT',
    difficulty: 2,
    estimatedDuration: 3,
    validationType: { type: 'min_rating', min: 1, max: 5, question: 'How confident are you that your resume will pass ATS screening?' },
    completionRule: 'all_or_nothing',
    rewards: { confidenceBonus: 0.05, readinessBonus: 2, chapterProgress: 6 },
    feedback: {
      success: 'High confidence is earned through iteration. You are ready for real applications.',
      partial: 'Honest assessment. Identify 2 specific areas to improve before applying.',
      fail: 'If you are not confident, recruiters will not be either. Revise before continuing.',
    },
    recommendation: {
      success: 'Move to ATS Optimization to make sure your resume passes automated screening.',
      partial: 'Spend 15 more minutes on the weakest section of your resume.',
      fail: 'Get peer feedback. Sometimes others see strengths we miss.',
    },
  },

  // ═══════════════════════════════════════════════════════════
  // CHAPTER 2: LINKEDIN (4 tasks)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'task-headline-authority',
    chapterId: 'linkedin',
    nodeId: 'headline-authority',
    title: 'Craft Your Headline',
    description: 'Write a LinkedIn headline that goes beyond your job title. Include your specialty and value proposition.',
    type: 'TEXT_TASK',
    difficulty: 2,
    estimatedDuration: 8,
    validationType: { type: 'min_length', min: 25, placeholder: 'Example: "Software Engineer | React & Node.js | Building scalable web apps"' },
    completionRule: 'all_or_nothing',
    rewards: { confidenceBonus: 0.10, readinessBonus: 3, chapterProgress: 8 },
    feedback: {
      success: 'Strong headline! This will appear in search results and recruiter notifications.',
      partial: 'Good start. Add what you DO, not just what you ARE.',
      fail: 'A job-title-only headline is invisible. Add your specialty and impact.',
    },
    recommendation: {
      success: 'Your headline attracts attention. Now optimize your About section.',
      partial: 'Compare your headline with 3 people in your target role. What makes theirs compelling?',
      fail: 'Formula: Role | Specialty | Value. Example: "Data Analyst | SQL & Python | Turning data into decisions"',
    },
  },
  {
    id: 'task-about-section',
    chapterId: 'linkedin',
    nodeId: 'about-section',
    title: 'Write Your About Section',
    description: 'Write a 3-paragraph About section: 1) Who you are, 2) What you do, 3) What you are looking for.',
    type: 'TEXT_TASK',
    difficulty: 3,
    estimatedDuration: 15,
    validationType: { type: 'min_length', min: 150, placeholder: 'Paragraph 1: Who you are\nParagraph 2: What you do\nParagraph 3: What you seek' },
    completionRule: 'partial_credit',
    rewards: { confidenceBonus: 0.15, readinessBonus: 5, chapterProgress: 8 },
    feedback: {
      success: 'Compelling About section! This is your elevator pitch in writing.',
      partial: 'Good structure. Make it more personal and specific to your achievements.',
      fail: 'The About section is your story. Do not skip it — recruiters read this first.',
    },
    recommendation: {
      success: 'Your profile tells a story. Now build your network strategically.',
      partial: 'Add one specific achievement or metric to each paragraph.',
      fail: 'Read 5 About sections of people you admire. Note what makes them engaging.',
    },
  },
  {
    id: 'task-network-connections',
    chapterId: 'linkedin',
    nodeId: 'network-connections',
    title: 'Strategic Connections',
    description: 'Check the networking actions you have completed this week.',
    type: 'CHECKBOX_TASK',
    difficulty: 2,
    estimatedDuration: 10,
    validationType: {
      type: 'min_checked',
      min: 3,
      items: [
        'Sent 5+ personalized connection requests',
        'Engaged with 3+ posts from target companies',
        'Commented thoughtfully on 2+ industry discussions',
        'Updated your profile photo to professional quality',
        'Requested 2+ recommendations from colleagues',
        'Joined 1+ relevant professional group',
      ],
    },
    completionRule: 'partial_credit',
    rewards: { confidenceBonus: 0.10, readinessBonus: 3, chapterProgress: 8 },
    feedback: {
      success: 'Active networking! Visibility leads to opportunity.',
      partial: 'Good activity. Increase consistency — networking is a daily habit.',
      fail: 'A silent profile is an invisible profile. Start with 1 connection request per day.',
    },
    recommendation: {
      success: 'Your network is growing. Time to leverage it for applications.',
      partial: 'Set a daily goal: 3 connection requests + 1 meaningful comment.',
      fail: 'Start with your alumni network. They are most likely to accept and help.',
    },
  },
  {
    id: 'task-linkedin-quiz',
    chapterId: 'linkedin',
    nodeId: 'linkedin-optimization',
    title: 'LinkedIn Best Practices',
    description: 'Test your knowledge of LinkedIn optimization.',
    type: 'MULTIPLE_CHOICE',
    difficulty: 1,
    estimatedDuration: 3,
    validationType: {
      type: 'exact_match',
      correct: 'b',
      options: [
        { value: 'a', label: 'Post your resume as a photo in the featured section' },
        { value: 'b', label: 'Use keywords from target job descriptions in your headline and about' },
        { value: 'c', label: 'Change your job title every week to appear in more searches' },
        { value: 'd', label: 'Send connection requests to everyone in your city' },
      ],
    },
    completionRule: 'all_or_nothing',
    rewards: { confidenceBonus: 0.05, readinessBonus: 2, chapterProgress: 6 },
    feedback: {
      success: 'Correct! Keywords make you discoverable by recruiters searching for specific skills.',
      partial: '',
      fail: 'Keyword optimization is the #1 way to get found by recruiters. Study job descriptions in your target role.',
    },
    recommendation: {
      success: 'Move to your Profile Photo next — first impressions matter before recruiters read a word.',
      partial: '',
      fail: 'Review the LinkedIn optimization guide before continuing.',
    },
  },

  // ═══════════════════════════════════════════════════════════
  // CHAPTER 3: APPLICATIONS (4 tasks)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'task-application-tracking',
    chapterId: 'applications',
    nodeId: 'application-tracking',
    title: 'Set Up Tracking System',
    description: 'Create a simple tracking system for your applications. List 5 companies you will apply to this week.',
    type: 'TEXT_TASK',
    difficulty: 1,
    estimatedDuration: 10,
    validationType: { type: 'min_length', min: 50, placeholder: 'Company 1: ___ | Role: ___ | Date: ___\nCompany 2: ___ | Role: ___ | Date: ___' },
    completionRule: 'partial_credit',
    rewards: { confidenceBonus: 0.10, readinessBonus: 3, chapterProgress: 8 },
    feedback: {
      success: 'Organization is key. Tracking prevents applications from falling through the cracks.',
      partial: 'Good start. Add application dates and follow-up reminders.',
      fail: 'Without tracking, you will apply to the same role twice or miss follow-ups.',
    },
    recommendation: {
      success: 'You are organized. Now craft tailored cover letters.',
      partial: 'Add a column for "follow-up date" to stay on top of responses.',
      fail: 'Use a simple spreadsheet: Company, Role, Date Applied, Status, Follow-up.',
    },
  },
  {
    id: 'task-cover-letter',
    chapterId: 'applications',
    nodeId: 'cover-letter',
    title: 'Write a Cover Letter',
    description: 'Write a cover letter for one target role. Address: 1) Why this company, 2) Why this role, 3) Why you.',
    type: 'TEXT_TASK',
    difficulty: 3,
    estimatedDuration: 20,
    validationType: { type: 'min_length', min: 200, placeholder: 'Dear Hiring Manager,\n\n[Why this company]\n[Why this role]\n[Why you]\n\nSincerely,' },
    completionRule: 'partial_credit',
    rewards: { confidenceBonus: 0.15, readinessBonus: 5, chapterProgress: 8 },
    feedback: {
      success: 'Persuasive cover letter! Personalization is what separates you from generic applicants.',
      partial: 'Good structure. Make the "Why this company" section more specific.',
      fail: 'A generic cover letter is worse than no cover letter. Research the company deeply.',
    },
    recommendation: {
      success: 'Your application package is strong. Time to apply at scale.',
      partial: 'Find one specific company initiative and mention it in your letter.',
      fail: 'Read the company\'s latest blog post. Reference it in your first paragraph.',
    },
  },
  {
    id: 'task-follow-up',
    chapterId: 'applications',
    nodeId: 'follow-up-strategy',
    title: 'Follow-Up Strategy',
    description: 'Check the follow-up actions you have planned or completed.',
    type: 'CHECKBOX_TASK',
    difficulty: 2,
    estimatedDuration: 5,
    validationType: {
      type: 'min_checked',
      min: 2,
      items: [
        'Sent thank-you email within 24h of application',
        'Connected with hiring manager on LinkedIn',
        'Set calendar reminder for 1-week follow-up',
        'Prepared 3 questions for potential interview',
        'Researched interviewer backgrounds (if known)',
      ],
    },
    completionRule: 'partial_credit',
    rewards: { confidenceBonus: 0.10, readinessBonus: 3, chapterProgress: 8 },
    feedback: {
      success: 'Proactive follow-up shows genuine interest. This alone can get you an interview.',
      partial: 'Good habits. Add one more follow-up action to stand out.',
      fail: 'The squeaky wheel gets the grease. A polite follow-up can revive a dead application.',
    },
    recommendation: {
      success: 'Your application strategy is complete. Prepare for interviews.',
      partial: 'Schedule your follow-ups now. Do not wait for a response.',
      fail: 'Template: "Hi [Name], I applied for [Role] on [Date]. I am very excited about [Company] because [Reason]. Any updates?"',
    },
  },
  {
    id: 'task-application-volume',
    chapterId: 'applications',
    nodeId: 'application-volume',
    title: 'Application Volume Goal',
    description: 'Rate your current application volume and consistency.',
    type: 'SELF_ASSESSMENT',
    difficulty: 1,
    estimatedDuration: 2,
    validationType: { type: 'min_rating', min: 1, max: 5, question: 'How many quality applications do you send per week? (1=0-2, 5=10+)' },
    completionRule: 'all_or_nothing',
    rewards: { confidenceBonus: 0.05, readinessBonus: 2, chapterProgress: 6 },
    feedback: {
      success: 'High volume with quality is the formula for success. Keep the momentum.',
      partial: 'Quality matters more than quantity, but you need both. Aim for 5+ per week.',
      fail: 'The job search is a numbers game. Set a minimum: 3 quality applications per week.',
    },
    recommendation: {
      success: 'Move to Company Research next — targeted applications convert far better than generic ones.',
      partial: 'Block 2 hours every Tuesday and Thursday for focused application time.',
      fail: 'Start with 1 application today. Momentum builds momentum.',
    },
  },

  // ═══════════════════════════════════════════════════════════
  // CHAPTER 4: INTERVIEWS (4 tasks)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'task-interview-prep',
    chapterId: 'interviews',
    nodeId: 'interview-prep',
    title: 'Prepare Your Stories',
    description: 'Write 3 STAR-format stories (Situation, Task, Action, Result) for common behavioral questions.',
    type: 'TEXT_TASK',
    difficulty: 3,
    estimatedDuration: 20,
    validationType: { type: 'min_length', min: 200, placeholder: 'Story 1 (Leadership):\nS: ___\nT: ___\nA: ___\nR: ___' },
    completionRule: 'partial_credit',
    rewards: { confidenceBonus: 0.15, readinessBonus: 5, chapterProgress: 8 },
    feedback: {
      success: 'Powerful stories! The STAR format makes your answers memorable and credible.',
      partial: 'Good stories. Add more specific metrics and outcomes to strengthen impact.',
      fail: 'Interviewers remember stories, not statements. Turn every answer into a narrative.',
    },
    recommendation: {
      success: 'Your story bank is ready. Practice delivery next.',
      partial: 'Pick your weakest story and add one specific number or outcome.',
      fail: 'Example: "S: Server crashed during Black Friday. T: Restore checkout in 1h. A: Led 3-engineer war room. R: $2M saved."',
    },
  },
  {
    id: 'task-mock-interview',
    chapterId: 'interviews',
    nodeId: 'mock-interview',
    title: 'Mock Interview Practice',
    description: 'Check the preparation actions you have completed for your mock interview.',
    type: 'CHECKBOX_TASK',
    difficulty: 2,
    estimatedDuration: 15,
    validationType: {
      type: 'min_checked',
      min: 3,
      items: [
        'Scheduled mock interview with peer or mentor',
        'Prepared answers to top 10 common questions',
        'Recorded yourself answering 3 questions and reviewed',
        'Researched the company\'s recent news and products',
        'Prepared 5 questions to ask the interviewer',
        'Practiced elevator pitch (30 seconds)',
      ],
    },
    completionRule: 'partial_credit',
    rewards: { confidenceBonus: 0.15, readinessBonus: 5, chapterProgress: 8 },
    feedback: {
      success: 'Thorough preparation! Confidence comes from repetition, not talent.',
      partial: 'Good preparation. Record one more practice session to polish delivery.',
      fail: 'The first real interview should not be your first practice. Mock interviews reduce anxiety by 70%.',
    },
    recommendation: {
      success: 'You are interview-ready. Time for the real thing.',
      partial: 'Schedule one more mock interview this week. Focus on your weakest question.',
      fail: 'Find a friend or use a mirror. Practice the 3 most common questions until they feel natural.',
    },
  },
  {
    id: 'task-technical-prep',
    chapterId: 'interviews',
    nodeId: 'technical-prep',
    title: 'Technical Question Prep',
    description: 'Solve 2 technical problems and explain your approach in writing.',
    type: 'TEXT_TASK',
    difficulty: 4,
    estimatedDuration: 30,
    validationType: { type: 'min_length', min: 100, placeholder: 'Problem 1 approach: ___\nProblem 2 approach: ___' },
    completionRule: 'partial_credit',
    rewards: { confidenceBonus: 0.20, readinessBonus: 7, chapterProgress: 8 },
    feedback: {
      success: 'Strong technical foundation! Clear communication of complex ideas is a differentiator.',
      partial: 'Good approach. Practice explaining your solution out loud, not just in writing.',
      fail: 'Technical interviews test communication as much as coding. Practice verbal walkthroughs.',
    },
    recommendation: {
      success: 'Your technical skills are solid. Focus on communication next.',
      partial: 'Record yourself explaining one solution. Watch for filler words and unclear transitions.',
      fail: 'Use the "teach it to a 5-year-old" method. If you cannot simplify it, you do not understand it.',
    },
  },
  {
    id: 'task-interview-mindset',
    chapterId: 'interviews',
    nodeId: 'interview-mindset',
    title: 'Interview Mindset',
    description: 'Rate your confidence and readiness for real interviews.',
    type: 'SELF_ASSESSMENT',
    difficulty: 1,
    estimatedDuration: 2,
    validationType: { type: 'min_rating', min: 1, max: 5, question: 'How confident are you going into your next interview? (1=terrified, 5=excited)' },
    completionRule: 'all_or_nothing',
    rewards: { confidenceBonus: 0.05, readinessBonus: 2, chapterProgress: 6 },
    feedback: {
      success: 'Confidence is contagious. Your energy will make the interviewer want to hire you.',
      partial: 'Nerves are normal. Preparation is the antidote to anxiety.',
      fail: 'If you are not ready, postpone. A bad interview is worse than no interview.',
    },
    recommendation: {
      success: 'Move to Behavioral Preparation next — technical skill alone will not carry an interview.',
      partial: 'Do one more mock interview. Confidence comes from evidence, not hope.',
      fail: 'Revisit your STAR stories. Evidence of past success creates future confidence.',
    },
  },

  // ═══════════════════════════════════════════════════════════
  // CHAPTER 5: OFFER (4 tasks)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'task-offer-evaluation',
    chapterId: 'offer',
    nodeId: 'offer-evaluation',
    title: 'Evaluate Your Offer',
    description: 'List the components of your offer and rate their importance to you.',
    type: 'TEXT_TASK',
    difficulty: 2,
    estimatedDuration: 10,
    validationType: { type: 'min_length', min: 60, placeholder: 'Salary: ___ | Importance: 1-5\nBenefits: ___ | Importance: 1-5\nGrowth: ___ | Importance: 1-5\nCulture: ___ | Importance: 1-5' },
    completionRule: 'partial_credit',
    rewards: { confidenceBonus: 0.10, readinessBonus: 3, chapterProgress: 8 },
    feedback: {
      success: 'Clear priorities! Knowing what you value prevents regret later.',
      partial: 'Good framework. Weight each factor to make the decision objective.',
      fail: 'A job is more than salary. Consider growth, culture, and work-life balance.',
    },
    recommendation: {
      success: 'You know what you want. Time to negotiate.',
      partial: 'Create a weighted scorecard. Assign 1-5 to each factor and multiply by importance.',
      fail: 'Talk to 2 people in similar roles. Ask what they wish they had negotiated.',
    },
  },
  {
    id: 'task-salary-negotiation',
    chapterId: 'offer',
    nodeId: 'salary-negotiation',
    title: 'Negotiation Preparation',
    description: 'Check your negotiation readiness.',
    type: 'CHECKBOX_TASK',
    difficulty: 3,
    estimatedDuration: 10,
    validationType: {
      type: 'min_checked',
      min: 3,
      items: [
        'Researched market rate for this role in your location',
        'Prepared a specific counter-offer number with justification',
        'Identified 3 non-salary items to negotiate (remote, PTO, title)',
        'Practiced the negotiation conversation with a friend',
        'Prepared a BATNA (Best Alternative to Negotiated Agreement)',
        'Wrote down your walk-away number',
      ],
    },
    completionRule: 'partial_credit',
    rewards: { confidenceBonus: 0.15, readinessBonus: 5, chapterProgress: 8 },
    feedback: {
      success: 'Negotiation-ready! Most offers have 10-20% flexibility. Ask and you shall receive.',
      partial: 'Good preparation. Practice saying your counter-offer number out loud.',
      fail: 'Not negotiating is leaving money on the table. The worst they can say is no.',
    },
    recommendation: {
      success: 'You are ready to negotiate. Be confident, be specific, be polite.',
      partial: 'Role-play the negotiation one more time. Confidence comes from rehearsal.',
      fail: 'Script: "I am excited about this role. Based on my research, the market rate is $X. Can we discuss $Y?"',
    },
  },
  {
    id: 'task-decision-framework',
    chapterId: 'offer',
    nodeId: 'decision-framework',
    title: 'Decision Framework',
    description: 'Answer: What is your decision deadline? Who will you consult? What is your walk-away point?',
    type: 'TEXT_TASK',
    difficulty: 2,
    estimatedDuration: 8,
    validationType: { type: 'min_length', min: 40, placeholder: 'Deadline: ___ | Consultant: ___ | Walk-away: ___' },
    completionRule: 'all_or_nothing',
    rewards: { confidenceBonus: 0.10, readinessBonus: 3, chapterProgress: 8 },
    feedback: {
      success: 'Decisive! A clear framework prevents emotional decisions and future regret.',
      partial: 'Good start. Set a hard deadline to avoid paralysis by analysis.',
      fail: 'Without a deadline, you will overthink forever. Give yourself 48 hours.',
    },
    recommendation: {
      success: 'You have a framework. Trust it and decide.',
      partial: 'Sleep on it. The morning brings clarity.',
      fail: 'Talk to one trusted advisor. External perspective breaks analysis paralysis.',
    },
  },
  {
    id: 'task-offer-acceptance',
    chapterId: 'offer',
    nodeId: 'offer-acceptance',
    title: 'Acceptance Checklist',
    description: 'Rate your confidence in accepting or declining this offer.',
    type: 'SELF_ASSESSMENT',
    difficulty: 1,
    estimatedDuration: 2,
    validationType: { type: 'min_rating', min: 1, max: 5, question: 'How confident are you in your decision about this offer? (1=uncertain, 5=certain)' },
    completionRule: 'all_or_nothing',
    rewards: { confidenceBonus: 0.20, readinessBonus: 7, chapterProgress: 6 },
    feedback: {
      success: 'Congratulations! You have navigated the entire career journey. Welcome to your new role.',
      partial: 'Trust your framework. No decision is perfect, but a decided path is better than standing still.',
      fail: 'If you are unsure, it is okay to decline. A wrong yes is worse than a right no.',
    },
    recommendation: {
      success: '🎉 JOURNEY COMPLETE! You have mastered the career navigator.',
      partial: 'Revisit your priorities. The right answer will emerge.',
      fail: 'Set a 24-hour deadline. Make the best decision with the information you have.',
    },
  },
  // ═══════════════════════════════════════════════════════════
  // CHAPTER 6: OFFER PREPARATION (3 tasks)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'task-salary-prep',
    chapterId: 'offer_preparation',
    nodeId: 'salary_negotiation',
    title: 'Salary Research & Negotiation Prep',
    description: 'Research market rates for your role and prepare your negotiation strategy.',
    type: 'TEXT_TASK',
    difficulty: 3,
    estimatedDuration: 20,
    validationType: { type: 'min_length', min: 80, placeholder: 'Market rate range: ___\nTarget salary: ___\nKey talking points: ___' },
    completionRule: 'all_or_nothing',
    rewards: { confidenceBonus: 0.15, readinessBonus: 5, chapterProgress: 15 },
    feedback: {
      success: 'Excellent preparation! Knowing market rates removes the guesswork from negotiations.',
      partial: 'Good research. Add specific numbers and justifications to strengthen your position.',
      fail: 'Without market data, you cannot negotiate confidently. Research 3+ sources before proceeding.',
    },
    recommendation: {
      success: 'You are ready to negotiate. Move to Offer Review to evaluate your full package.',
      partial: 'Check Levels.fyi and Glassdoor for more accurate data points.',
      fail: 'Use Levels.fyi, Glassdoor, and Blind to gather salary data for your role and location.',
    },
  },
  {
    id: 'task-offer-review',
    chapterId: 'offer_preparation',
    nodeId: 'offer_review',
    title: 'Complete Offer Review',
    description: 'Review the full offer package including salary, equity, benefits, and growth potential.',
    type: 'CHECKBOX_TASK',
    difficulty: 2,
    estimatedDuration: 15,
    validationType: {
      type: 'min_checked',
      min: 3,
      items: [
        'Reviewed base salary against market data',
        'Evaluated equity or stock option value',
        'Reviewed benefits (health, PTO, remote policy)',
        'Assessed growth opportunities and team quality',
        'Compared with other offers or alternatives',
      ],
    },
    completionRule: 'partial_credit',
    rewards: { confidenceBonus: 0.10, readinessBonus: 3, chapterProgress: 15 },
    feedback: {
      success: 'Thorough review! You understand the full value of your offer beyond just salary.',
      partial: 'Good start. Focus on the areas you skipped to make a fully informed decision.',
      fail: 'An offer is more than a number. Review all components before making a decision.',
    },
    recommendation: {
      success: 'You know what your offer is worth. Time to prepare for your transition.',
      partial: 'Research one more area you skipped — equity or benefits can be significant.',
      fail: 'Read the full offer letter carefully. Create a list of questions for the recruiter.',
    },
  },
  {
    id: 'task-resignation-letter',
    chapterId: 'offer_preparation',
    nodeId: 'resignation_letter',
    title: 'Write Your Resignation Letter',
    description: 'Write a professional resignation letter for your current position (or draft one for future use).',
    type: 'TEXT_TASK',
    difficulty: 1,
    estimatedDuration: 10,
    validationType: { type: 'min_length', min: 40, placeholder: 'Dear [Manager],\n\nPlease accept this letter as formal notification...\n\nSincerely,\n[Your Name]' },
    completionRule: 'all_or_nothing',
    rewards: { confidenceBonus: 0.05, readinessBonus: 2, chapterProgress: 10 },
    feedback: {
      success: 'Professional and clear. Your resignation will leave a positive lasting impression.',
      partial: 'Good draft. Keep it concise and positive — avoid negative comments.',
      fail: 'Keep it simple: state your departure date, express gratitude, and offer transition help.',
    },
    recommendation: {
      success: 'You are fully prepared for your career transition. Journey complete!',
      partial: 'Shorten your letter and remove any negative or emotional language.',
      fail: 'Use a simple template: notification → gratitude → transition offer → closing.',
    },
  },
];

// ─── Task Factory ───────────────────────────────────────────

export function getTaskByNodeId(nodeId: string): TaskDefinition | undefined {
  return TASK_LIBRARY.find(t => t.nodeId === nodeId);
}

export function getTasksByChapterId(chapterId: string): TaskDefinition[] {
  return TASK_LIBRARY.filter(t => t.chapterId === chapterId);
}

export function getAllTasks(): TaskDefinition[] {
  return TASK_LIBRARY;
}

export function getTaskCount(): number {
  return TASK_LIBRARY.length;
}
