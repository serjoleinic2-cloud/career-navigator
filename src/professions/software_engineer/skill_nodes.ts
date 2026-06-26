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
      awareness: "Resume structure determines whether your experience is readable in under 20 seconds. Recruiters quickly discard resumes that feel cluttered, inconsistent, or overly decorative. For junior engineers, clarity matters more than content volume.",
      understanding: "ATS systems parse resumes linearly, so single-column structure performs better than complex layouts. Sections like Experience, Projects, Skills, and Education must follow a predictable order. Any deviation reduces parsing accuracy and recruiter readability.",
      application: "Use a single-column layout with clear headings and consistent spacing. Place Experience and Projects near the top, followed by Skills and Education. Avoid tables, multi-column grids, or visual-heavy design elements that break parsing.",
      readiness: "Your resume is ready when it can be copied into a plain text file and still remain readable. Each section should be clearly separated and scannable within seconds. If structure requires explanation, it is too complex.",
      execution: "Standardize formatting across all entries: same date format, same bullet style, and consistent verb usage. Keep each job or project entry visually balanced with 3-5 bullet points. Remove decorative elements that do not add informational value.",
      confidence: "When recruiters can quickly summarize your experience after a single glance, your structure is effective. If ATS systems consistently return your resume in search results, formatting is correct. Clean structure directly increases interview conversion rate."
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
      awareness: "Resume review is the process of identifying gaps between your actual skills and how they are presented. Many junior engineers underestimate how unclear their resumes appear to external reviewers. Without feedback, weak framing stays unnoticed.",
      understanding: "Peer review reveals issues like unclear impact, missing keywords, or weak technical framing. A structured review process helps align your resume with real job descriptions for React, Node.js, and TypeScript roles. External feedback is essential because self-assessment is usually biased.",
      application: "Ask at least two engineers or mentors to review your resume against real job descriptions. Provide them with a checklist: clarity, technical accuracy, and impact strength. Compare their feedback and identify repeated issues.",
      readiness: "Your resume is ready when independent reviewers consistently understand your experience without explanation. If different people highlight the same strengths and weaknesses, your positioning is stable. A single confusing section indicates a structural problem.",
      execution: "Iterate your resume after every review cycle instead of waiting for full rewrites. Focus on improving clarity of impact statements first, then technical keywords. Keep a version history so you can track improvements over time.",
      confidence: "When reviewers start suggesting only minor edits instead of structural changes, your resume is strong. If feedback becomes consistent across different reviewers, your narrative is aligned. Stable feedback signals readiness for active job applications."
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
      awareness: "ATS systems decide whether your resume reaches a human recruiter. If keywords like React, Node.js, TypeScript, and REST APIs are missing or inconsistent, your resume may never be seen. Formatting mistakes can break parsing entirely.",
      understanding: "ATS tools scan for keyword density, job title alignment, and structured formatting. Complex layouts, images, or inconsistent headings reduce parsing accuracy. Matching language from real job descriptions increases visibility in automated filtering systems.",
      application: "Extract keywords directly from 5-10 job postings and integrate them into your resume naturally. Use standard section names like Experience, Projects, Skills, and Education. Avoid tables, icons, or embedded graphics.",
      readiness: "Your resume is ATS-ready when it passes keyword alignment with at least 70% of target job descriptions. It should be readable when converted to plain text without losing structure. If parsing fails in any online ATS checker, it needs revision.",
      execution: "Continuously update keywords as job requirements change. Prioritize technical relevance over stylistic design. Keep your resume optimized for machines first, then for humans.",
      confidence: "When your resume consistently appears in recruiter searches and ATS screenings, optimization is effective. Increased interview invitations without major content changes confirm proper keyword alignment. ATS performance is measurable through response rate improvements."
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
      awareness: "The resume summary is the first narrative signal about your professional identity. If it is vague or generic, recruiters assume the rest of the resume will also lack focus. For junior engineers, clarity is more important than storytelling.",
      understanding: "A strong summary connects your stack (React, Node.js, TypeScript) with the type of systems you build and your current career stage. It should immediately position you within a specific engineering direction instead of listing personality traits.",
      application: "Write 2-3 sentences: your role, your main stack, and one concrete type of work you focus on such as building web applications or APIs. Include one example project or achievement if possible. Avoid phrases without technical meaning.",
      readiness: "Your summary is ready when it can replace your headline without losing clarity. A recruiter should understand your technical direction within five seconds. If it requires rereading, it is too complex.",
      execution: "Update your summary whenever your target role changes. Keep it aligned with your featured projects and experience section. Ensure consistency between summary, headline, and skills.",
      confidence: "When recruiters describe your profile in the same terms you used in your summary, it is effective. If interviewers reference your summary language during conversations, your positioning is aligned. Strong summaries reduce ambiguity in early screening."
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
      awareness: "The skills section acts as a keyword map for recruiters and ATS systems. If it is incomplete or overly broad, your profile becomes harder to categorize. For junior engineers, relevance matters more than quantity.",
      understanding: "Skills should reflect real job requirements for React, Node.js, and TypeScript roles. Grouping skills into categories like Frontend, Backend, Tools, and Databases improves readability and searchability. Random or inflated lists reduce credibility.",
      application: "List core technologies first: React, TypeScript, Node.js, Express, REST APIs. Then add supporting tools like Git, Docker, CI/CD, and testing frameworks. Ensure every skill listed appears in at least one project or job description.",
      readiness: "Your skills section is ready when it matches at least 70% of skills found in target job postings. Each skill should be verifiable through experience or project evidence. If a skill cannot be explained in an interview, remove it.",
      execution: "Regularly update skills based on actual usage in projects. Remove outdated or unused technologies to keep focus sharp. Align skills with both resume and LinkedIn for consistency.",
      confidence: "When recruiters reference your listed skills during interviews and you can confidently demonstrate them, alignment is strong. If your skills section leads directly to technical screening questions, it is correctly optimized. High relevance increases interview conversion rates."
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
      awareness: "Featured content is the first proof of real engineering ability on your profile. Recruiters often click this section before reading your experience because it shows actual work instead of claims. If this section is empty or generic, your profile loses credibility instantly.",
      understanding: "Pinned projects act as evidence of your stack, especially React, TypeScript, and Node.js skills. Deployed applications, GitHub repositories, and portfolio links create a technical narrative that supports your headline and About section. Without this, your profile becomes purely descriptive instead of demonstrative.",
      application: "Pin 3-5 items: one full-stack project, one frontend-focused React app, one backend API built with Node.js, and optionally one open-source contribution. Each item must include a live demo link, GitHub repository, and a short technical explanation of architecture or key decisions. Prioritize projects that reflect job descriptions you are targeting.",
      readiness: "Your featured section is ready when a recruiter can open your profile and immediately see working software. Each project should load without errors and clearly show your stack in action. If a project cannot be deployed or explained in under 30 seconds, it does not belong here.",
      execution: "Replace school or tutorial projects with original or significantly modified work. Keep descriptions short but technical, focusing on what problem the app solves and how it is built. Regularly rotate featured projects based on the roles you are applying for.",
      confidence: "When recruiters mention your projects during outreach or interviews, your featured section is effective. If profile engagement increases after adding live projects, your visibility is improving. Strong featured content often becomes the reason you get contacted instead of being skipped."
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
      awareness: "Recommendations act as external validation of your engineering ability. Recruiters trust peer-written feedback more than self-described skills. Without recommendations, your profile relies only on self-reporting.",
      understanding: "Strong recommendations from teammates, mentors, or internship supervisors create social proof that supports your technical claims. They confirm that you can collaborate in React/Node/TypeScript environments and deliver real work in teams. Even a few credible endorsements significantly increase profile trust.",
      application: "Request recommendations from people who worked directly with you on projects, not random connections. Ask them to describe specific contributions, such as features you built, bugs you solved, or systems you improved. Offer to write a recommendation in return to increase response rate.",
      readiness: "Your recommendations are ready when at least two of them mention concrete technologies and real outcomes. They should reference actual projects or collaboration contexts instead of generic praise. If they could apply to anyone, they are not useful.",
      execution: "Send personalized requests after completing a project or collaboration, when your contribution is still fresh. Guide reviewers by reminding them of specific tasks you worked on together. Keep the process consistent instead of waiting until you urgently need them.",
      confidence: "When recruiters reference your recommendations during interviews or outreach, your social proof is working. If multiple recommendations highlight similar strengths, your professional identity is clear. Strong endorsements often influence final hiring decisions in borderline cases."
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
      awareness: 'You cannot manage what you cannot see. When applications are scattered across email, LinkedIn, and job boards, you lose control of your pipeline. For junior engineers this is critical because responses often arrive 1–3 weeks later and easily get buried.',
      understanding: 'Every application is an object in a pipeline with stages: sent → viewed → interview → rejected/offer. Without structure you cannot see which companies actually respond to your stack (React/Node/TypeScript) and which ones simply ghost you.',
      application: 'Build a tracker: company, role, date applied, stack match %, status, next action. Update it every day after any responses or status changes on LinkedIn or email.',
      readiness: 'You have a single source of truth for all applications and can answer in 10 seconds: how many are active, how many are silent, where there is a real chance for an interview.',
      execution: 'Track in Notion or Google Sheets with status filters. Spend 5–10 minutes every evening updating it instead of postponing it to "later."',
      confidence: 'You begin to see patterns: which companies react to your level and which resume phrasings generate replies. This removes chaos and reduces anxiety.'
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
      awareness: 'Junior candidates often write identical letters that are indistinguishable from each other. Recruiters read them in 5–10 seconds, so the first paragraph decides everything.',
      understanding: 'A strong cover letter is not a description of yourself. It answers why exactly you fit this stack and this problem. It is especially important to connect your React/Node/TypeScript experience to the specific opening.',
      application: 'Structure: 1) technical hook (what similar work you have already done), 2) specific match with the opening, 3) short confirmation of motivation plus links to GitHub/portfolio.',
      readiness: 'You have a letter template that you can adapt in 5–10 minutes for any opening without losing quality.',
      execution: 'Before sending every application rewrite 2–3 lines for the specific company and their stack instead of using copy-paste without changes.',
      confidence: 'You begin receiving more responses not because you "got lucky" but because your letters became relevant to actual team problems.'
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
      awareness: 'Most junior candidates disappear after submitting an application and never follow up, even though some offers come precisely after the second contact.',
      understanding: 'Follow-up is not pressure. It is a signal of engagement. In tech companies 1–2 polite reminders at specific intervals are considered normal.',
      application: 'Follow the schedule: 3 days — soft check-in, 5 days — add value (for example a project or GitHub update), 7–10 days — final short message.',
      readiness: 'You have 2–3 message templates that sound professional and do not look pushy.',
      execution: 'After every application immediately set follow-up reminders in your calendar or tracker so you do not rely on memory.',
      confidence: 'You stop depending on the company\'s first response and increase your chances of dialogue even after a "silent" application.'
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
      awareness: 'One or two applications per week do not produce statistics, especially at the junior level where conversion is low and heavily market-dependent.',
      understanding: 'The goal is not simply "send a lot" but to create a flow of applications so you can test different resume and cover letter phrasings.',
      application: 'Target 10–15 quality applications per week with mandatory match of at least 70–80% of the opening requirements.',
      readiness: 'You have a stable rhythm: 2–3 days per week you do batch submissions instead of chaotic single actions.',
      execution: 'Split the process: 1 day — search for openings, 1 day — customization, 1 day — send applications in batches.',
      confidence: 'You stop treating rejection as an event because you always have an active pipeline.'
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
      awareness: 'Without understanding the company you send "blind" applications that ignore their stack, stage, and the real problem the team is solving.',
      understanding: 'React/Node openings differ dramatically between a startup and a product company: some need speed, others need stability and scalability.',
      application: 'For every company capture: tech stack, product, team size, stage (startup/mid/enterprise), and one reason "why them."',
      readiness: 'You have a short research template that takes 10–15 minutes per company.',
      execution: 'Before sending every application always add 1 personalized line to the cover letter based on your research.',
      confidence: 'You start writing not "into the void" but to a specific team with clear context, which increases response rate.'
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
      awareness: 'The same resume for every opening almost always lowers your chances, especially at the junior level where competition is high.',
      understanding: 'Recruiters scan keyword matches (React, Node.js, TypeScript, REST, Git, CI/CD) in seconds through ATS.',
      application: 'Use the 80% match rule: apply only where you cover most requirements and adjust your resume to the keywords in the opening.',
      readiness: 'You have several resume versions for different types of openings (frontend, fullstack, backend light).',
      execution: 'Before sending copy 5–10 keywords from the opening into skills and experience if they honestly reflect your background.',
      confidence: 'You stop "spamming the market" and begin receiving more relevant interviews.'
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
      awareness: 'Junior candidates are often evaluated not by resume but by what they can show on GitHub and live demo.',
      understanding: 'Projects without README, deployment, and problem description are perceived as unfinished even if the code is good.',
      application: 'Every project must have: live demo, GitHub repo, README with problem statement, stack, and 2–3 screenshots or GIFs.',
      readiness: 'You have 2–3 projects that you can show a recruiter without additional explanations.',
      execution: 'Before every application check: all links work, the project deploys, README reads in 30 seconds.',
      confidence: 'You can prove your skills through real projects instead of resume text alone.'
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
      awareness: 'At the junior level referrals multiply your chances of getting an interview compared to cold applications.',
      understanding: 'A referral is not "asking for a job." It is entering through trust: someone inside the company confirms your level.',
      application: 'Find 2–3 contacts per company through LinkedIn, alumni, open source, or acquaintances. Build rapport first instead of immediately asking for a referral.',
      readiness: 'You have a list of companies and potential entry points for each.',
      execution: 'Write a short message: who you are, what you do (React/Node/TS), and what you have already built — without a direct job ask in the first message.',
      confidence: 'You begin gaining access to the "hidden job market" where competition is significantly lower.'
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
      awareness: 'Most junior candidates walk into interviews without structured stories and end up improvising under pressure. In the US market, interviewers expect clear, repeatable narratives about your projects and decisions, not vague descriptions of "what you built."',
      understanding: 'The STAR method (Situation, Task, Action, Result) is how your experience gets evaluated, even for junior roles. You need a small story bank covering React apps, Node APIs, debugging problems, and teamwork situations.',
      application: 'Build 6–8 reusable stories from your projects: performance optimization, API design, UI bug fixing, collaboration, and a failure you recovered from. Write them out in STAR format and rehearse them until they sound natural, not memorized.',
      readiness: 'You can answer "Tell me about a project" or "Tell me about a challenge" without thinking from scratch. Each answer follows a clear structure and stays under 2–3 minutes.',
      execution: 'Spend 30–45 minutes daily rehearsing 2–3 stories out loud, ideally recording yourself. Refine weak transitions and remove unnecessary technical jargon.',
      confidence: 'You stop freezing during open-ended questions because you always fall back on prepared narratives. This creates consistency across every interview stage.'
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
      awareness: 'Most juniors underestimate how unnatural it feels to solve problems while speaking out loud. Without simulation, real interviews feel like a completely different skill than studying.',
      understanding: 'Mock interviews expose gaps between what you think you know and what you can clearly explain under pressure. Feedback from peers or engineers is more valuable than passive studying.',
      application: 'Run 2–3 mock interviews per week with peers or platforms like Pramp or interviewing.io. Record sessions and focus on clarity of explanation, not just correctness.',
      readiness: 'You can handle being interrupted, corrected, or asked to re-explain without losing structure. You\'re comfortable thinking out loud in front of another developer.',
      execution: 'After every mock interview, write down 3 mistakes: one technical, one communication, one structure issue. Re-run the same problem 48 hours later to confirm improvement.',
      confidence: 'You start seeing interviews as a familiar environment instead of an unknown event. Anxiety drops because you\'ve already been "in this situation" multiple times.'
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
      awareness: 'Many junior candidates focus only on LeetCode and ignore real-world React and Node patterns. In US interviews, both algorithmic thinking and practical web development are tested.',
      understanding: 'You are expected to understand arrays, hash maps, recursion basics, and also React state flow, hooks, and API integration. Node.js interviews often focus on REST APIs, async behavior, and database interactions.',
      application: 'Practice 3–5 LeetCode problems per week focused on arrays, strings, and hash maps. In parallel, build small features in React like forms, authentication flows, and API fetching with error handling.',
      readiness: 'You can explain both how a solution works algorithmically and how it would be implemented in a real React/Node app. You are not switching between "theory mode" and "real code mode."',
      execution: 'Alternate days: one day algorithms, one day React/Node practical coding. Always explain your solution out loud before writing code.',
      confidence: 'You stop feeling split between "DSA knowledge" and "frontend/backend skills." Everything becomes part of one coherent engineering toolkit.'
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
      awareness: 'Most interview failures at junior level are not technical but psychological. Candidates know the answer but lose clarity under stress.',
      understanding: 'Interviewers evaluate how you think under uncertainty, not just perfect correctness. Calm reasoning often scores higher than rushed perfect answers.',
      application: 'Use short grounding routines before interviews: slow breathing, reviewing 2–3 key stories, and scanning your cheat sheet of patterns. Reframe questions as collaboration, not examination.',
      readiness: 'You can stay composed even when you don\'t immediately know the answer. You default to structured thinking instead of panic.',
      execution: 'If stuck, verbalize your thought process step by step instead of staying silent. Ask clarifying questions instead of guessing silently.',
      confidence: 'You start treating interviews as technical conversations with peers rather than judgment scenarios. This significantly improves clarity and flow.'
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
      awareness: 'US tech interviews heavily evaluate behavior through structured questions. Even strong technical candidates get rejected due to weak communication or unclear teamwork stories.',
      understanding: 'Amazon Leadership Principles and similar frameworks are often indirectly used to evaluate ownership, conflict handling, and decision-making. Your past projects must demonstrate these behaviors clearly.',
      application: 'Prepare 5–7 behavioral stories: conflict in a team, tight deadline, bug under pressure, disagreement on approach, and a successful collaboration. Map each story to a clear outcome and your specific action.',
      readiness: 'You can answer "Tell me about a time you disagreed with a teammate" without hesitation and with a structured, calm narrative. Your answers always include your reasoning, not just actions.',
      execution: 'Rewrite each story to emphasize your decision-making process and trade-offs. Practice delivering them in under 2 minutes.',
      confidence: 'You stop feeling that behavioral questions are "soft" or secondary. You understand they directly influence hiring decisions at every US tech company.'
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
      awareness: 'Junior candidates are not expected to design large-scale systems, but they are still asked to think about architecture at a basic level. Many struggle because they jump straight into implementation details.',
      understanding: 'You are expected to understand basic concepts like client-server flow, REST APIs, simple database schema design, and trade-offs between simplicity and scalability. Clarity of reasoning matters more than complexity.',
      application: 'Practice designing small systems like a todo app, URL shortener, or simple chat app. Focus on API endpoints, data models, and how React frontend communicates with Node backend.',
      readiness: 'You can sketch a basic system on paper and explain how data flows end-to-end. You can justify why you chose a simple design over an over-engineered one.',
      execution: 'For each system design question, start with requirements → API → data model → flow → edge cases. Keep explanations simple and structured.',
      confidence: 'You no longer panic when hearing "system design" in junior interviews. You recognize it as structured thinking, not senior-level architecture design.'
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
      awareness: 'On-site interviews in US companies are long and mentally exhausting, often involving multiple back-to-back rounds. Many candidates underestimate the impact of fatigue on performance.',
      understanding: 'Each round tests a different dimension: coding, behavior, communication, and collaboration. Consistency across the whole day matters more than performing perfectly in one round.',
      application: 'Simulate full interview days with 2–3 mock sessions back-to-back. Practice maintaining clarity and energy from the first to the last session.',
      readiness: 'You can stay focused and articulate even in the final interview round after hours of problem-solving. Your performance does not degrade significantly under fatigue.',
      execution: 'Plan breaks, hydration, and mental resets between sessions. Avoid cramming during gaps and instead review light notes or key patterns.',
      confidence: 'You stop fearing "long interview days" because you\'ve trained your cognitive endurance like a skill, not a trait.'
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
      awareness: 'Phone screens are often underestimated, but they are the first real filter in US hiring pipelines. Many candidates fail here due to unclear communication rather than technical gaps.',
      understanding: 'Recruiters evaluate clarity, confidence, and alignment with the role, not deep technical expertise. You are expected to summarize experience, answer basic technical questions, and communicate salary expectations.',
      application: 'Prepare a 60–90 second introduction: who you are, what stack you use (React/Node/TypeScript), and what kind of role you want. Practice explaining 2–3 projects clearly without jargon.',
      readiness: 'You can handle recruiter questions about availability, salary range, and relocation without hesitation. Your answers are consistent and calm.',
      execution: 'Keep a simple cheat sheet next to you during calls with key points: projects, numbers, tech stack, and questions to ask. Avoid over-explaining.',
      confidence: 'You treat phone screens as low-pressure filtering steps instead of high-stakes interviews. This improves your natural communication.'
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
      awareness: 'Many candidates assume the interview ends when the call ends, but follow-up is part of the evaluation process. In competitive US markets, small signals matter.',
      understanding: 'A well-written thank-you email reinforces interest and clarifies any missed points. It also keeps you top-of-mind during hiring discussions.',
      application: 'Send a short thank-you email within 12–24 hours referencing one specific topic from the interview. If appropriate, add a small clarification or improvement to one answer.',
      readiness: 'You have a reusable email structure that you can personalize in under 5 minutes. You never miss follow-up timing.',
      execution: 'Track every interview outcome in a pipeline and schedule follow-ups if no response comes within 5–7 business days. Keep tone professional but concise.',
      confidence: 'You maintain visibility even after the interview ends, increasing your chances without extra technical effort.'
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
      awareness: 'Take-home assignments and presentations are common for junior roles, especially in US startups. Many candidates lose points not on code quality, but on how they explain it.',
      understanding: 'Interviewers care about your decision-making: why you chose certain architecture, trade-offs you made, and how you structured your solution.',
      application: 'Prepare a 5–10 minute walkthrough structure: problem → approach → architecture → key decisions → trade-offs → future improvements. Always include reasoning behind choices.',
      readiness: 'You can confidently present a React/Node project and answer questions about edge cases, scalability, and code structure. You don\'t rely on reading code line by line.',
      execution: 'Rehearse presentation out loud with timing constraints. Use diagrams (even simple ones) to explain flow between frontend, backend, and database.',
      confidence: 'You stop feeling nervous about presenting code because you treat it as storytelling about engineering decisions, not defense of your work.'
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
