import type { SkillNode } from '@/core/skill_state';
import { RESUME_TASKS } from './tasks/resume';
import { LINKEDIN_TASKS } from './tasks/linkedin';
import { APPLICATION_TASKS } from './tasks/applications';
import { INTERVIEW_TASKS } from './tasks/interviews';
import { OFFER_TASKS } from './tasks/offer';

export const RESUME_SKILL_NODES: SkillNode[] = [
  {
    id: 'positioning-clarity',
    skill: 'Positioning Clarity',
    domain: 'Resume',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You can describe your target role in one clear sentence',
      'Your resume headline matches the role you are applying for',
      'Your chosen tech stack aligns with multiple real job postings'
    ],
    advice: {
      awareness: 'A resume without a clear target role forces recruiters to guess. Make your destination obvious from the first seconds.',
      understanding: 'Recruiters compare your profile against one specific opening, not every software engineering position available.',
      application: 'Analyze several job postings, identify common requirements, and position yourself toward one realistic role.',
      readiness: 'You can confidently explain your target role, level, and primary technology stack without hesitation.',
      execution: 'Every section of your resume should reinforce the same positioning instead of telling unrelated stories.',
      confidence: 'A focused resume receives stronger recruiter attention because it answers "Why this candidate?" immediately.'
    },
    tasks: [
      {
        id: 'task-resume-positioning-1',
        title: 'Define Your Target Role',
        objective: 'Create one precise positioning statement describing the role you are applying for.',
        instructions: [
          'Open five current Junior or Middle React/TypeScript job postings.',
          'Identify the common job title and seniority.',
          'Write one sentence describing your target role, stack, and specialization.',
          'Read the sentence aloud and remove unnecessary words.'
        ],
        completionCriteria: [
          'Positioning statement contains fewer than 20 words.',
          'Technology stack is explicitly mentioned.',
          'The statement matches at least three real job postings.'
        ],
        estimatedMinutes: 25,
        difficulty: 1.0,
        tips: [
          'Avoid generic titles like "Software Engineer" when a more specific title fits.',
          'Mirror the wording used in the job descriptions.'
        ],
        expectedOutcome: 'A finalized positioning statement ready for your resume header.'
      },
      {
        id: 'task-resume-positioning-2',
        title: 'Analyze Market Requirements',
        objective: 'Build a prioritized list of skills employers consistently request.',
        instructions: [
          'Collect five relevant job descriptions.',
          'Highlight every programming language, framework, tool, and soft skill.',
          'Count how often each requirement appears.',
          'Create a ranked list of the ten most common requirements.'
        ],
        completionCriteria: [
          'Ten requirements are documented.',
          'Frequency is recorded for every requirement.',
          'Top five technical skills are clearly identified.'
        ],
        estimatedMinutes: 35,
        difficulty: 1.3,
        tips: [
          'Use postings published within the last three months.',
          'Group similar technologies together where appropriate.'
        ],
        expectedOutcome: 'A prioritized keyword list that guides resume customization.'
      },
      {
        id: 'task-resume-positioning-3',
        title: 'Evaluate Resume Alignment',
        objective: 'Measure how closely your current resume matches your chosen target role.',
        instructions: [
          'Read your current resume from top to bottom.',
          'Mark every section that supports your target role.',
          'Highlight sections that are irrelevant or distracting.',
          'Write a short list of improvements needed before editing.'
        ],
        completionCriteria: [
          'Every resume section has been reviewed.',
          'At least three improvement opportunities are documented.',
          'Irrelevant content has been identified.'
        ],
        estimatedMinutes: 30,
        difficulty: 1.4,
        tips: [
          'Pretend you are a recruiter reviewing the resume for the first time.',
          'Focus on relevance rather than document length.'
        ],
        expectedOutcome: 'A prioritized action list for improving resume positioning.'
      },
      {
        id: 'task-resume-positioning-4',
        title: 'Validate Your Positioning',
        objective: 'Confirm that another person immediately understands the role you are targeting.',
        instructions: [
          'Share your positioning statement and resume header with two people.',
          'Ask them what role they believe you are applying for.',
          'Record every suggestion or misunderstanding.',
          'Refine the positioning statement based on consistent feedback.'
        ],
        completionCriteria: [
          'Feedback collected from two reviewers.',
          'At least one improvement has been applied.',
          'Both reviewers correctly identify the intended role.'
        ],
        estimatedMinutes: 20,
        difficulty: 1.2,
        tips: [
          'Use mentors, experienced developers, or hiring managers if available.',
          'If feedback conflicts, prioritize clarity over creativity.'
        ],
        expectedOutcome: 'A validated positioning statement that clearly communicates your career target.'
      }
    ],
    estimatedMinutes: 110,
    difficulty: 1.2
  },
  {
    id: 'achievement-framing',
    skill: 'Achievement Framing',
    domain: 'Resume',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You describe achievements using measurable results instead of responsibilities',
      'Every major project includes evidence of your contribution',
      'You can explain the impact of your work with concrete numbers or outcomes'
    ],
    advice: {
      awareness:
        'Recruiters are interested in outcomes, not task lists. "Built a feature" is less convincing than "Built a feature that reduced page load time by 35%."',
      understanding:
        'Strong resume bullets follow a simple pattern: Action → Context → Result. Even if you do not have business metrics, you can demonstrate technical impact, learning speed, code quality, or user value.',
      application:
        'Review every project and rewrite each bullet so it highlights what changed because of your work instead of what tools you used.',
      readiness:
        'You can explain every bullet point with supporting evidence, code examples, or project demonstrations.',
      execution:
        'Your resume contains achievement-focused bullets that clearly communicate value to recruiters and engineering managers.',
      confidence:
        'Mock interviews and peer reviews consistently identify your project descriptions as specific, credible, and impactful.'
    },
    tasks: [
      {
        id: 'task-resume-achievement-1',
        title: 'Rewrite Responsibilities into Achievements',
        objective:
          'Transform generic resume bullets into achievement-focused statements.',
        instructions: [
          'Select 10 existing resume bullet points.',
          'Highlight statements that only describe responsibilities.',
          'Rewrite each using the format: Action + Context + Result.',
          'Ensure every rewritten bullet demonstrates value created.'
        ],
        completionCriteria: [
          '10 bullets rewritten.',
          'Each bullet starts with a strong action verb.',
          'Every bullet describes a measurable or observable outcome.'
        ],
        estimatedMinutes: 45,
        difficulty: 1.5,
        tips: [
          'Use verbs like Built, Improved, Automated, Reduced, Designed, Optimized.',
          'If exact numbers are unavailable, describe qualitative impact honestly.'
        ],
        expectedOutcome:
          'A resume with achievement-oriented bullet points instead of task descriptions.'
      },
      {
        id: 'task-resume-achievement-2',
        title: 'Collect Evidence for Every Project',
        objective:
          'Gather proof that supports each achievement listed on your resume.',
        instructions: [
          'Open every portfolio or GitHub project mentioned in your resume.',
          'Record commits, pull requests, screenshots, deployment links, or metrics.',
          'Match each resume bullet with at least one supporting artifact.',
          'Store all evidence in a single document for future interviews.'
        ],
        completionCriteria: [
          'Every project has supporting evidence.',
          'At least one artifact is linked for each achievement.',
          'Evidence document is saved for interview preparation.'
        ],
        estimatedMinutes: 35,
        difficulty: 1.5,
        tips: [
          'GitHub commit history is valid evidence of contribution.',
          'Screenshots of deployed applications help demonstrate completed work.'
        ],
        expectedOutcome:
          'A structured evidence document validating every important resume claim.'
      },
      {
        id: 'task-resume-achievement-3',
        title: 'Quantify Technical Impact',
        objective:
          'Add realistic technical metrics to your strongest resume achievements.',
        instructions: [
          'Review your three most important projects.',
          'Identify measurable improvements such as performance, reliability, testing, or delivery speed.',
          'Estimate only metrics you can reasonably justify.',
          'Rewrite the corresponding resume bullets with those metrics.'
        ],
        completionCriteria: [
          'At least three bullets include measurable results.',
          'All metrics are realistic and defensible.',
          'No exaggerated or unverifiable claims remain.'
        ],
        estimatedMinutes: 40,
        difficulty: 2.0,
        tips: [
          'Examples include response time, bundle size, Lighthouse score, test coverage, deployment frequency, or issue resolution time.',
          'When uncertain, use approximate wording such as "reduced", "improved", or "simplified" instead of inventing percentages.'
        ],
        expectedOutcome:
          'Three high-impact resume bullets with credible technical outcomes.'
      },
      {
        id: 'task-resume-achievement-4',
        title: 'Validate Resume Stories',
        objective:
          'Verify that every achievement can be explained confidently during an interview.',
        instructions: [
          'Read each achievement aloud.',
          'For every bullet, answer: What was the problem? What did I do? What was the result?',
          'Remove or rewrite any bullet you cannot explain clearly.',
          'Practice the final stories until each takes under one minute.'
        ],
        completionCriteria: [
          'Every achievement has a matching verbal explanation.',
          'No bullet remains unsupported.',
          'Each explanation fits within one minute.'
        ],
        estimatedMinutes: 30,
        difficulty: 1.5,
        tips: [
          'Interviewers often ask about the first project they see on your resume.',
          'If you cannot defend a claim, remove it rather than risk losing credibility.'
        ],
        expectedOutcome:
          'A resume where every achievement is backed by a clear, interview-ready story.'
      }
    ],
    estimatedMinutes: 150,
    difficulty: 1.6
  },
  {
    id: 'resume-structure',
    skill: 'Resume Structure',
    domain: 'resume',
    state: 'locked',
    nextState: 'awareness',
    signals: ['Your resume lacks clear sections', 'Formatting is inconsistent'],
    advice: {
      awareness: 'Review standard resume section ordering.',
      understanding: 'Identify the key sections for your industry.',
      application: 'Restructure your resume with proper sections.',
      readiness: 'Validate your structure against ATS requirements.',
      execution: 'Finalize your resume template.',
      confidence: 'Your resume is well-structured and scannable.',
    },
    tasks: RESUME_TASKS['resume-structure'],
    estimatedMinutes: 40,
    difficulty: 1,
  },
  {
    id: 'resume-review',
    skill: 'Resume Self-Review',
    domain: 'resume',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You have not reviewed your resume recently', 'You are unsure about quality'],
    advice: {
      awareness: 'Understand what makes a resume effective.',
      understanding: 'Learn the key metrics for resume quality.',
      application: 'Score your resume across all dimensions.',
      readiness: 'Get external feedback on your resume.',
      execution: 'Polish your resume based on feedback.',
      confidence: 'Your resume is interview-ready.',
    },
    tasks: RESUME_TASKS['resume-review'],
    estimatedMinutes: 35,
    difficulty: 2,
  },
  {
    id: 'resume-ats',
    skill: 'ATS Optimization',
    domain: 'resume',
    state: 'locked',
    nextState: 'awareness',
    signals: ['Your resume gets no responses', 'You do not know about ATS systems'],
    advice: {
      awareness: 'Understand how ATS screening works.',
      understanding: 'Learn what makes a resume ATS-friendly.',
      application: 'Optimize your resume for ATS parsing.',
      readiness: 'Test your resume with ATS simulators.',
      execution: 'Tailor resumes for each ATS submission.',
      confidence: 'Your resume consistently passes ATS screening.',
    },
    tasks: RESUME_TASKS['resume-ats'],
    estimatedMinutes: 50,
    difficulty: 3,
  },
  {
    id: 'resume-summary',
    skill: 'Professional Summary',
    domain: 'resume',
    state: 'locked',
    nextState: 'awareness',
    signals: ['Your resume has no summary', 'Your summary is generic'],
    advice: {
      awareness: 'Understand the purpose of a professional summary.',
      understanding: 'Learn what makes a summary compelling.',
      application: 'Write a targeted professional summary.',
      readiness: 'Test your summary with peers and mentors.',
      execution: 'Refine your summary for each application.',
      confidence: 'Your summary opens resumes with impact.',
    },
    tasks: RESUME_TASKS['resume-summary'],
    estimatedMinutes: 20,
    difficulty: 2,
  },
  {
    id: 'resume-skills',
    skill: 'Skills Inventory',
    domain: 'resume',
    state: 'locked',
    nextState: 'awareness',
    signals: ['Your skills section is incomplete', 'You are unsure which skills to list'],
    advice: {
      awareness: 'Understand the importance of a targeted skills section.',
      understanding: 'Learn how to categorize and prioritize skills.',
      application: 'Build a comprehensive skills inventory.',
      readiness: 'Validate your skills against job market demands.',
      execution: 'Keep your skills section updated and relevant.',
      confidence: 'Your skills section is a keyword-rich asset.',
    },
    tasks: RESUME_TASKS['resume-skills'],
    estimatedMinutes: 20,
    difficulty: 1,
  },
];

export const LINKEDIN_SKILL_NODES: SkillNode[] = [
  {
    id: 'headline-authority',
    skill: 'Headline Authority',
    domain: 'linkedin',
    state: 'awareness',
    nextState: 'understanding',
    signals: ['Your headline is your job title only', 'Recruiters do not reach out'],
    advice: {
      awareness:
        "Your headline is the first thing recruiters read after your name. A generic headline like 'Software Engineer' gives them no reason to click your profile, while a specific headline immediately communicates your direction and technical stack.",
      understanding:
        "A strong headline combines your target role, core technologies, and the value you bring. Recruiters search using keywords such as React, TypeScript, Node.js, REST APIs, and JavaScript, so including them improves discoverability without making the headline feel like a keyword list.",
      application:
        "Review ten LinkedIn profiles of junior engineers working at companies where you would like to work. Identify the common structure of their headlines, then write three alternative versions for your own profile and compare which one is the clearest and easiest to understand in less than five seconds.",
      readiness:
        "Someone reading your headline should immediately know what position you are seeking, what technologies you specialize in, and whether your profile is relevant. If two different people describe your professional focus using nearly identical words after reading your headline, it is clear enough.",
      execution:
        "Replace vague phrases like 'Passionate Developer' or 'Looking for Opportunities' with specific technical positioning. Keep the headline updated whenever your primary stack, portfolio, or target role changes so recruiters always see your current focus.",
      confidence:
        "After updating your headline, monitor recruiter profile views and search appearances for several weeks. If more recruiters reach your profile and conversations begin with your actual technical stack instead of asking what you do, your headline is performing well."
    },
    tasks: LINKEDIN_TASKS['headline-authority'],
    estimatedMinutes: 30,
    difficulty: 1,
  },
  {
    id: 'about-section',
    skill: 'About Section',
    domain: 'linkedin',
    state: 'locked',
    nextState: 'awareness',
    signals: ['Your About section is empty or generic', 'You do not tell your story'],
    advice: {
      awareness:
        "The About section should explain who you are, what you build, and where you are heading. It should not repeat your resume or list every technology you have ever touched.",
      understanding:
        "Recruiters want a short story that connects your motivation, technical interests, and practical experience. Mentioning projects built with React, TypeScript, Node.js, Express, PostgreSQL or similar technologies makes your profile more credible than describing yourself with generic personality traits.",
      application:
        "Write your About section in three parts: your current focus, your strongest technical experience, and the type of opportunities you are seeking. Support every important statement with a concrete example such as a deployed application, GitHub repository, or measurable project outcome.",
      readiness:
        "Your About section is ready when someone can understand your background without opening your resume. Every sentence should either explain your technical direction or demonstrate experience that supports your target role.",
      execution:
        "Remove unnecessary phrases about being a hardworking or passionate developer unless they are supported by evidence. Replace them with specific achievements, technologies, projects, and learning experiences that demonstrate continuous growth as an engineer.",
      confidence:
        "Review your About section every few months as your projects become stronger. As your experience grows, replace educational content with production-level work, open-source contributions, internships, or measurable engineering achievements."
    },
    tasks: LINKEDIN_TASKS['about-section'],
    estimatedMinutes: 40,
    difficulty: 3,
  },
  {
    id: 'network-connections',
    skill: 'Strategic Networking',
    domain: 'linkedin',
    state: 'locked',
    nextState: 'awareness',
    signals: ['Your network is smaller than 100', 'You do not engage with content'],
    advice: {
      awareness:
        "LinkedIn networking is not about collecting thousands of random connections. A focused network increases the quality of opportunities because recruiters, engineers, and hiring managers become part of your professional visibility.",
      understanding:
        "Connections influence both profile visibility and access to referrals. Building relationships with software engineers, engineering managers, recruiters, and alumni creates significantly more opportunities than connecting only with classmates or friends.",
      application:
        "Create a weekly networking routine. Send personalized connection requests to engineers from companies you admire, engage with technical posts, congratulate connections on career milestones, and participate in discussions about React, TypeScript, Node.js, frontend architecture, and software engineering.",
      readiness:
        "Your network becomes valuable when people recognize your name through meaningful interactions instead of random connection requests. A healthy network contains professionals from companies where you genuinely want to work and people whose content you actively follow.",
      execution:
        "Aim to build consistent habits instead of chasing large numbers. Five thoughtful conversations each week create more long-term opportunities than sending one hundred generic invitations that receive no response.",
      confidence:
        "As your network grows, monitor whether referrals, recruiter messages, interview invitations, or collaboration requests increase. When new opportunities begin arriving without active job applications, your networking strategy is producing measurable results."
    },
    tasks: LINKEDIN_TASKS['network-connections'],
    estimatedMinutes: 40,
    difficulty: 2,
  },
  {
    id: 'linkedin-optimization',
    skill: 'LinkedIn Optimization',
    domain: 'linkedin',
    state: 'locked',
    nextState: 'awareness',
    signals: ['Your profile is incomplete', 'Recruiters cannot find you'],
    advice: {
      awareness: "LinkedIn search is driven by keywords from your headline, about section, and experience. If you don't explicitly include React, Node.js, TypeScript, and related terms, recruiters simply won't surface your profile. Most junior engineers lose visibility because their profile is written like a biography instead of a searchable technical entry.",
      understanding: "The LinkedIn algorithm matches recruiter queries like 'Junior React Developer' or 'Node.js Intern' against structured fields, not storytelling. Sections like Experience and Skills must repeat consistent technical terms so your profile forms a clear keyword cluster. If your stack is fragmented or inconsistent across sections, you rank lower in search results.",
      application: "Rewrite your headline, about section, and experience so they all repeat the same core stack: React, TypeScript, Node.js, REST APIs, PostgreSQL. Add 3-5 pinned projects that clearly match job descriptions you are applying for. Review 10 job posts and copy exact terminology used in them into your profile sections.",
      readiness: "A recruiter searching your stack should land on your profile and immediately see the same technologies repeated in at least three sections. Your profile should match at least 70-80% of keywords from real junior job descriptions. If your profile feels 'broad' instead of 'focused,' it is not ready.",
      execution: "Align every section so it supports one target role instead of multiple directions. Remove unrelated technologies that dilute your positioning, even if you have used them once. Keep updating keywords based on real job postings every time you refine your direction.",
      confidence: "When recruiters start messaging you for roles that exactly match your stack without manual outreach, your optimization is working. If your profile views increase from recruiter searches instead of connections, your keyword structure is effective. Consistent inbound interest is the signal that your LinkedIn SEO is correctly tuned."
    },
    tasks: LINKEDIN_TASKS['linkedin-optimization'],
    estimatedMinutes: 50,
    difficulty: 2,
  },
  {
    id: 'profile-photo',
    skill: 'Profile Photo',
    domain: 'linkedin',
    state: 'locked',
    nextState: 'awareness',
    signals: ['Your photo is outdated or unprofessional', 'You have no profile photo'],
    advice: {
      awareness: "Your profile photo is the first visual filter before anyone reads your headline or experience. Recruiters subconsciously decide trust and professionalism within seconds based on clarity, lighting, and framing. A low-quality or casual photo reduces perceived seriousness even if your technical skills are strong.",
      understanding: "A good profile photo for a junior software engineer communicates clarity, accessibility, and professional intent rather than corporate stiffness. Clean background, visible face, and neutral lighting create a sense of reliability that aligns with remote engineering roles. Overly edited or informal photos break trust before profile reading even starts.",
      application: "Use a neutral background such as a plain wall or blurred workspace with soft natural light facing your face. Frame the shot from shoulders up, keeping eyes centered and expression neutral but approachable. Avoid group photos, filters, screenshots, or cropped social media images.",
      readiness: "Your photo is ready when it looks like something a recruiter could see on a company team page without hesitation. If your face is clearly visible even in small thumbnail size, it passes the first filter. It should still look professional when reduced to the LinkedIn circle icon.",
      execution: "Take multiple shots in daylight and select the one with the sharpest focus and most natural expression. Ensure clothing is simple and non-distracting, ideally aligned with a 'startup casual' engineering environment. Update the photo if your appearance changes significantly so it always reflects your current presence.",
      confidence: "When recruiters visit your profile and spend more time reading instead of hesitating at the visual level, your photo is effective. If connection acceptance rates increase after updating your image, it is positively influencing first impressions. Strong photos reduce friction and increase profile engagement before any text is read."
    },
    tasks: LINKEDIN_TASKS['profile-photo'],
    estimatedMinutes: 20,
    difficulty: 1,
  },
  {
    id: 'featured-content',
    skill: 'Featured Content',
    domain: 'linkedin',
    state: 'locked',
    nextState: 'awareness',
    signals: ['Your featured section is empty', 'You have not shared your work'],
    advice: {
      awareness: 'Understand the value of featuring your work.',
      understanding: 'Learn what content performs best on LinkedIn.',
      application: 'Select and organize your top work samples.',
      readiness: 'Get feedback on your featured content.',
      execution: 'Keep featured content updated with recent work.',
      confidence: 'Your featured section showcases your best professional work.',
    },
    tasks: LINKEDIN_TASKS['featured-content'],
    estimatedMinutes: 15,
    difficulty: 1,
  },
  {
    id: 'recommendations',
    skill: 'LinkedIn Recommendations',
    domain: 'linkedin',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You have no recommendations', 'Your recommendations are outdated'],
    advice: {
      awareness: 'Understand the social proof value of recommendations.',
      understanding: 'Learn how to request effective recommendations.',
      application: 'Request recommendations from key colleagues.',
      readiness: 'Write recommendations for others to encourage reciprocity.',
      execution: 'Maintain a current set of relevant recommendations.',
      confidence: 'Your recommendations validate your skills and character.',
    },
    tasks: LINKEDIN_TASKS['recommendations'],
    estimatedMinutes: 25,
    difficulty: 2,
  },
];

export const APPLICATION_SKILL_NODES: SkillNode[] = [
  {
    id: 'application-tracking',
    skill: 'Application Tracking',
    domain: 'applications',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You lose track of applications', 'You miss follow-up deadlines'],
    advice: {
      awareness: 'Understand why tracking is essential.',
      understanding: 'Learn different tracking methods.',
      application: 'Set up your tracking system.',
      readiness: 'Populate your tracker with target companies.',
      execution: 'Maintain and update your tracker regularly.',
      confidence: 'Your application pipeline is fully visible and managed.',
    },
    tasks: APPLICATION_TASKS['application-tracking'],
    estimatedMinutes: 35,
    difficulty: 1,
  },
  {
    id: 'cover-letter',
    skill: 'Cover Letter Writing',
    domain: 'applications',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You use the same cover letter for every role', 'You struggle to customize'],
    advice: {
      awareness: 'Understand the purpose of a cover letter.',
      understanding: 'Learn the 3-paragraph structure.',
      application: 'Write a tailored cover letter for a target role.',
      readiness: 'Get feedback and iterate.',
      execution: 'Customize and send cover letters efficiently.',
      confidence: 'Your cover letters open doors to interviews.',
    },
    tasks: APPLICATION_TASKS['cover-letter'],
    estimatedMinutes: 35,
    difficulty: 3,
  },
  {
    id: 'follow-up-strategy',
    skill: 'Follow-Up Strategy',
    domain: 'applications',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You never follow up', 'You miss opportunities due to silence'],
    advice: {
      awareness: 'Understand the importance of follow-up.',
      understanding: 'Learn timing and etiquette for follow-ups.',
      application: 'Create follow-up templates and schedule.',
      readiness: 'Practice follow-up communication.',
      execution: 'Execute follow-ups systematically.',
      confidence: 'Your follow-up strategy maximizes response rates.',
    },
    tasks: APPLICATION_TASKS['follow-up-strategy'],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'application-volume',
    skill: 'Application Volume',
    domain: 'applications',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You apply to fewer than 3 roles per week', 'You have no application rhythm'],
    advice: {
      awareness: 'Understand the volume-quality balance.',
      understanding: 'Set realistic weekly targets.',
      application: 'Build a batch application workflow.',
      readiness: 'Track and adjust your volume strategy.',
      execution: 'Maintain consistent application output.',
      confidence: 'Your application volume generates interview opportunities.',
    },
    tasks: APPLICATION_TASKS['application-volume'],
    estimatedMinutes: 50,
    difficulty: 3,
  },
  {
    id: 'company-research',
    skill: 'Company Research',
    domain: 'applications',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You apply without researching the company', 'You cannot answer "Why this company?"'],
    advice: {
      awareness: 'Understand why company research matters.',
      understanding: 'Learn what to research for each company.',
      application: 'Build company intelligence dossiers.',
      readiness: 'Identify connections at target companies.',
      execution: 'Use research to tailor applications and interviews.',
      confidence: 'Your company knowledge gives you a competitive edge.',
    },
    tasks: APPLICATION_TASKS['company-research'],
    estimatedMinutes: 40,
    difficulty: 2,
  },
  {
    id: 'application-tailoring',
    skill: 'Application Tailoring',
    domain: 'applications',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You send the same application to every role', 'Your match rate is low'],
    advice: {
      awareness: 'Understand why tailoring is essential.',
      understanding: 'Learn how to map experience to requirements.',
      application: 'Tailor your resume and cover letter per role.',
      readiness: 'Verify consistency across tailored documents.',
      execution: 'Make tailoring a repeatable, efficient process.',
      confidence: 'Every application you send is optimized for that specific role.',
    },
    tasks: APPLICATION_TASKS['application-tailoring'],
    estimatedMinutes: 25,
    difficulty: 3,
  },
  {
    id: 'portfolio-submission',
    skill: 'Portfolio Submission',
    domain: 'applications',
    state: 'locked',
    nextState: 'awareness',
    signals: ['Your portfolio is outdated', 'You have no work samples ready'],
    advice: {
      awareness: 'Understand the role of portfolios in technical hiring.',
      understanding: 'Learn what makes a compelling portfolio.',
      application: 'Clean up and organize your best work.',
      readiness: 'Get feedback on your portfolio presentation.',
      execution: 'Include portfolio links in all applications.',
      confidence: 'Your portfolio proves your capabilities before the interview.',
    },
    tasks: APPLICATION_TASKS['portfolio-submission'],
    estimatedMinutes: 50,
    difficulty: 3,
  },
  {
    id: 'referral-strategy',
    skill: 'Referral Strategy',
    domain: 'applications',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You never get referrals', 'You do not ask for introductions'],
    advice: {
      awareness: 'Understand the power of referrals in hiring.',
      understanding: 'Learn how to ask for referrals effectively.',
      application: 'Request referrals from your network.',
      readiness: 'Build a network that can provide referrals.',
      execution: 'Systematically leverage referrals for target companies.',
      confidence: 'Your referral network accelerates your job search.',
    },
    tasks: APPLICATION_TASKS['referral-strategy'],
    estimatedMinutes: 30,
    difficulty: 2,
  },
];

export const INTERVIEW_SKILL_NODES: SkillNode[] = [
  {
    id: 'interview-prep',
    skill: 'Interview Preparation',
    domain: 'interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You do not have STAR stories ready', 'You ramble in interviews'],
    advice: {
      awareness: 'Understand the STAR method.',
      understanding: 'Identify 3 key stories from your career.',
      application: 'Write your STAR stories.',
      readiness: 'Practice delivery until natural.',
      execution: 'Use your stories confidently in interviews.',
      confidence: 'Your STAR stories make you memorable.',
    },
    tasks: INTERVIEW_TASKS['interview-prep'],
    estimatedMinutes: 65,
    difficulty: 3,
  },
  {
    id: 'mock-interview',
    skill: 'Mock Interview Practice',
    domain: 'interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: ['Your first interview is your first practice', 'You are nervous about interviewing'],
    advice: {
      awareness: 'Understand the value of mock interviews.',
      understanding: 'Learn how to structure mock sessions.',
      application: 'Schedule and complete a mock interview.',
      readiness: 'Review and learn from your mock performance.',
      execution: 'Do multiple mock interviews before the real one.',
      confidence: 'Mock interviews have prepared you for anything.',
    },
    tasks: INTERVIEW_TASKS['mock-interview'],
    estimatedMinutes: 55,
    difficulty: 2,
  },
  {
    id: 'technical-prep',
    skill: 'Technical Question Prep',
    domain: 'interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You struggle with technical questions', 'You cannot explain your approach clearly'],
    advice: {
      awareness: 'Understand common technical question formats.',
      understanding: 'Learn problem-solving frameworks.',
      application: 'Solve practice problems with documentation.',
      readiness: 'Record and review your solution walkthroughs.',
      execution: 'Communicate technical solutions confidently.',
      confidence: 'You solve and explain technical problems with ease.',
    },
    tasks: INTERVIEW_TASKS['technical-prep'],
    estimatedMinutes: 75,
    difficulty: 4,
  },
  {
    id: 'interview-mindset',
    skill: 'Interview Mindset',
    domain: 'interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You feel anxious before interviews', 'You doubt your preparation'],
    advice: {
      awareness: 'Understand the psychology of interviews.',
      understanding: 'Learn mindset techniques.',
      application: 'Build your pre-interview routine.',
      readiness: 'Practice mindset exercises regularly.',
      execution: 'Enter interviews with calm confidence.',
      confidence: 'Your mindset is your greatest interview asset.',
    },
    tasks: INTERVIEW_TASKS['interview-mindset'],
    estimatedMinutes: 20,
    difficulty: 1,
  },
  {
    id: 'behavioral-prep',
    skill: 'Behavioral Preparation',
    domain: 'interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You are unprepared for behavioral questions', 'Your answers lack structure'],
    advice: {
      awareness: 'Understand what behavioral questions assess.',
      understanding: 'Learn to map stories to competencies.',
      application: 'Build a comprehensive story bank.',
      readiness: 'Practice answering competency-based questions.',
      execution: 'Deliver structured, compelling behavioral answers.',
      confidence: 'You handle any behavioral question with a relevant story.',
    },
    tasks: INTERVIEW_TASKS['behavioral-prep'],
    estimatedMinutes: 45,
    difficulty: 2,
  },
  {
    id: 'system-design-prep',
    skill: 'System Design Preparation',
    domain: 'interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You have not practiced system design', 'You cannot explain architectural trade-offs'],
    advice: {
      awareness: 'Understand the system design interview format.',
      understanding: 'Learn design frameworks and patterns.',
      application: 'Practice full design sessions.',
      readiness: 'Study trade-off analysis.',
      execution: 'Communicate architectural decisions confidently.',
      confidence: 'You design and explain systems with clarity and depth.',
    },
    tasks: INTERVIEW_TASKS['system-design-prep'],
    estimatedMinutes: 95,
    difficulty: 5,
  },
  {
    id: 'on-site-prep',
    skill: 'On-Site Interview Preparation',
    domain: 'interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You are unprepared for full-day interviews', 'Logistics stress you out'],
    advice: {
      awareness: 'Understand the on-site interview structure.',
      understanding: 'Learn how to prepare for a full day.',
      application: 'Plan logistics and energy management.',
      readiness: 'Prepare your follow-up strategy in advance.',
      execution: 'Navigate the full interview day with composure.',
      confidence: 'You are fully prepared for the on-site experience.',
    },
    tasks: INTERVIEW_TASKS['on-site-prep'],
    estimatedMinutes: 35,
    difficulty: 1,
  },
  {
    id: 'phone-screen',
    skill: 'Phone Screen',
    domain: 'interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You are unprepared for recruiter calls', 'You stumble on introduction'],
    advice: {
      awareness: 'Understand what phone screens evaluate.',
      understanding: 'Learn how to structure your introduction.',
      application: 'Prepare your talking points and questions.',
      readiness: 'Practice your phone screen delivery.',
      execution: 'Handle phone screens with confidence and clarity.',
      confidence: 'Phone screens are your opportunity to make a strong first impression.',
    },
    tasks: INTERVIEW_TASKS['phone-screen'],
    estimatedMinutes: 15,
    difficulty: 1,
  },
  {
    id: 'interview-followup',
    skill: 'Interview Follow-Up',
    domain: 'interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You forget to send thank-you notes', 'You do not track interview outcomes'],
    advice: {
      awareness: 'Understand the importance of post-interview follow-up.',
      understanding: 'Learn proper follow-up timing and etiquette.',
      application: 'Send personalized thank-you emails.',
      readiness: 'Reflect on interview performance.',
      execution: 'Maintain professional communication throughout the process.',
      confidence: 'Your follow-up reinforces your candidacy.',
    },
    tasks: INTERVIEW_TASKS['interview-followup'],
    estimatedMinutes: 30,
    difficulty: 2,
  },
  {
    id: 'presentation-prep',
    skill: 'Presentation Preparation',
    domain: 'interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You have a presentation interview coming up', 'You are unsure how to structure it'],
    advice: {
      awareness: 'Understand the presentation interview format.',
      understanding: 'Learn how to structure a compelling talk.',
      application: 'Create your presentation slides.',
      readiness: 'Rehearse with recording and feedback.',
      execution: 'Deliver a confident, engaging presentation.',
      confidence: 'Your presentations showcase your expertise and communication skills.',
    },
    tasks: INTERVIEW_TASKS['presentation-prep'],
    estimatedMinutes: 75,
    difficulty: 3,
  },
];

export const OFFER_SKILL_NODES: SkillNode[] = [
  {
    id: 'offer-evaluation',
    skill: 'Offer Evaluation',
    domain: 'offer',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You do not know what your offer is worth', 'You focus only on salary'],
    advice: {
      awareness: 'Understand all offer components.',
      understanding: 'Learn how to value equity, benefits, and perks.',
      application: 'Evaluate a real offer using a scorecard.',
      readiness: 'Compare offers against market data.',
      execution: 'Make an informed, confident decision.',
      confidence: 'You evaluate offers holistically and objectively.',
    },
    tasks: OFFER_TASKS['offer-evaluation'],
    estimatedMinutes: 40,
    difficulty: 2,
  },
  {
    id: 'salary-negotiation',
    skill: 'Salary Negotiation',
    domain: 'offer',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You accept the first number offered', 'You are afraid to negotiate'],
    advice: {
      awareness: 'Understand that negotiation is expected.',
      understanding: 'Learn negotiation frameworks.',
      application: 'Prepare your negotiation strategy.',
      readiness: 'Practice the negotiation conversation.',
      execution: 'Negotiate confidently and professionally.',
      confidence: 'You negotiate offers that reflect your worth.',
    },
    tasks: OFFER_TASKS['salary-negotiation'],
    estimatedMinutes: 40,
    difficulty: 3,
  },
  {
    id: 'decision-framework',
    skill: 'Decision Framework',
    domain: 'offer',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You agonize over decisions', 'You cannot compare offers objectively'],
    advice: {
      awareness: 'Understand the need for structured decisions.',
      understanding: 'Learn weighted decision frameworks.',
      application: 'Build your decision scorecard.',
      readiness: 'Consult advisors and weigh scenarios.',
      execution: 'Make a timely, confident decision.',
      confidence: 'Your decision framework eliminates regret.',
    },
    tasks: OFFER_TASKS['decision-framework'],
    estimatedMinutes: 45,
    difficulty: 2,
  },
  {
    id: 'offer-acceptance',
    skill: 'Offer Acceptance',
    domain: 'offer',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You do not know how to accept professionally', 'You forget important steps'],
    advice: {
      awareness: 'Understand the acceptance process.',
      understanding: 'Learn what to check before accepting.',
      application: 'Complete your acceptance checklist.',
      readiness: 'Draft your acceptance communication.',
      execution: 'Accept or decline professionally.',
      confidence: 'You close offers with professionalism and clarity.',
    },
    tasks: OFFER_TASKS['offer-acceptance'],
    estimatedMinutes: 45,
    difficulty: 2,
  },
  {
    id: 'equity-evaluation',
    skill: 'Equity Evaluation',
    domain: 'offer',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You do not understand equity', 'You ignore equity in your evaluation'],
    advice: {
      awareness: 'Understand the basics of equity compensation.',
      understanding: 'Learn to evaluate stock options and RSUs.',
      application: 'Calculate equity value under different scenarios.',
      readiness: 'Compare equity across multiple offers.',
      execution: 'Make informed equity decisions.',
      confidence: 'You understand and properly value equity compensation.',
    },
    tasks: OFFER_TASKS['equity-evaluation'],
    estimatedMinutes: 35,
    difficulty: 4,
  },
  {
    id: 'start-transition',
    skill: 'Start Transition',
    domain: 'offer',
    state: 'locked',
    nextState: 'awareness',
    signals: ['You are starting a new role soon', 'You want to make a strong start'],
    advice: {
      awareness: 'Understand the importance of a strong start.',
      understanding: 'Learn how to ramp up effectively.',
      application: 'Create a 30-60-90 day plan.',
      readiness: 'Prepare for your first week.',
      execution: 'Navigate the transition professionally.',
      confidence: 'Your structured start sets you up for success.',
    },
    tasks: OFFER_TASKS['start-transition'],
    estimatedMinutes: 50,
    difficulty: 2,
  },
];

export const ALL_SKILL_NODES: SkillNode[] = [
  ...RESUME_SKILL_NODES,
  ...LINKEDIN_SKILL_NODES,
  ...APPLICATION_SKILL_NODES,
  ...INTERVIEW_SKILL_NODES,
  ...OFFER_SKILL_NODES,
];
