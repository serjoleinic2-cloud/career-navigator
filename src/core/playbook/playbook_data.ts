import type { PlaybookEntry, PlaybookCategory } from './playbook_types';
import { DATA_ANALYST_PLAYBOOK } from '@/professions/data_analyst/playbook_data';
import { CYBERSECURITY_PLAYBOOK } from '@/professions/cybersecurity/playbook_data';

export const PLAYBOOK: PlaybookEntry[] = [
  ...DATA_ANALYST_PLAYBOOK,
  ...CYBERSECURITY_PLAYBOOK,
  {
    id: 'resume/summary-formulas',
    title: 'Resume Summary Formulas',
    category: 'resume',
    professionId: 'software_engineer',
    overview: 'A resume summary is not a biography — it is a positioning statement answering who you are, what you do, and what you want. Recruiters scan summaries in under 5 seconds.',
    guides: [
      'Identify your target role and key differentiators',
      'Choose a formula: Junior / Career Changer / Specialist',
      'Write a first draft focusing on your strongest achievement',
      'Add specific technologies and measurable results',
      'ATS-optimise by mirroring keywords from the job description',
      'Trim to 2-3 lines max — brevity builds impact',
    ],
    templates: [
      'Software Engineer with 6 months of experience in React and TypeScript, specializing in frontend web applications. Built a task management app with real-time sync using Firebase. Seeking Junior Frontend role at a product company.',
      'Marketing professional transitioning to Software Engineering. Completed intensive bootcamp with focus on MERN stack. Built e-commerce platform with payment integration and admin dashboard.',
      'Backend Engineer focused on API design and database optimization. Deep expertise in Node.js, PostgreSQL, and REST architecture. Reduced API response time by 40% at internship project.'
    ],
    examples: [
      'Junior React Developer with hands-on experience building responsive web applications. Proficient in React, TypeScript, and Tailwind CSS. Developed a portfolio site with dark mode and animations. Seeking frontend role at a startup.',
      'Full-stack Developer specializing in Node.js and React. Built a social media analytics tool with OAuth, JWT auth, and MongoDB. Passionate about clean code and test-driven development.'
    ],
    checklist: [
      'Summary is under 3 lines',
      'Contains specific role title',
      'Mentions concrete technologies',
      'Includes one project or achievement',
      'States target role or company type'
    ],
    tags: ['summary', 'headline', 'positioning', 'formulas']
  },
  {
    id: 'interview/star-method-guide',
    title: 'STAR Method Mastery',
    category: 'interviews',
    professionId: 'software_engineer',
    overview: 'The STAR method is the industry standard for behavioral interview questions. Recruiters listen for Situation, Task, Action, and Result — missing any component weakens your answer.',
    guides: [
      'Set the context briefly — Situation in 1-2 sentences',
      'State your specific responsibility — Task in 1 sentence',
      'Describe what YOU did with "I" statements and specific technologies — Action in 3-5 sentences',
      'Quantify the outcome with numbers — Result in 1-2 sentences',
      'Practice each story out loud until it fits 90-120 seconds',
    ],
    templates: [
      'S: At my internship, our team was building a customer dashboard that loaded in 8 seconds.\nT: I was responsible for optimizing the frontend performance.\nA: I implemented virtual scrolling for the data table, lazy-loaded images, and memoized expensive React components using useMemo and React.memo.\nR: Dashboard load time dropped to 1.2 seconds. My approach became the team standard for large datasets.',
      'S: During a group project at bootcamp, we had a merge conflict that deleted 2 days of work.\nT: I needed to recover the lost code and prevent future conflicts.\nA: I used git reflog to recover the commits, then set up branch protection rules and required code reviews for all PRs.\nR: Zero data loss incidents after implementation. Team adopted the workflow for all projects.'
    ],
    examples: [
      'S: Our startup\'s landing page had 70% bounce rate.\nT: I was tasked with improving engagement.\nA: I A/B tested three headline versions, added social proof section, and implemented exit-intent popup with lead magnet.\nR: Bounce rate dropped to 45% in 2 weeks. Generated 120 new leads.',
      'S: My team was using manual deployment that took 30 minutes and often failed.\nT: I decided to automate the deployment process.\nA: I set up GitHub Actions CI/CD pipeline with automated testing, linting, and deployment to Vercel.\nR: Deployment time reduced to 3 minutes. Zero failed deployments in 2 months.'
    ],
    checklist: [
      'Situation is brief (1-2 sentences)',
      'Task clearly states MY responsibility',
      'Action uses "I" statements',
      'Action mentions specific technologies',
      'Result includes numbers or concrete outcome'
    ],
    tags: ['star', 'behavioral', 'interview', 'structure']
  },
  {
    id: 'offer/salary-negotiation',
    title: 'Salary Negotiation Scripts',
    category: 'offer',
    professionId: 'software_engineer',
    overview: 'Negotiation is information exchange, not confrontation. Most companies expect it and build flexibility into offers. Anchor high, justify with data, and frame for mutual gain.',
    guides: [
      'Research market rates on Levels.fyi and Glassdoor before the conversation',
      'Prepare your BATNA — know your walk-away number',
      'Let the employer state a number first whenever possible',
      'Anchor high with a range, not a single figure',
      'Discuss total compensation — base, equity, signing bonus, benefits',
      'Practise your script out loud at least 3 times',
    ],
    templates: [
      'Thank you for the offer. I\'m excited about the team and the product. Based on my research of market rates for Junior React Developers in [city] and my experience with [specific skill], I was targeting a range of 85-95k. Is there flexibility in the base salary?',
      'I appreciate the offer. I\'m comparing this with another opportunity, and I want to make the best decision for both of us. The other offer is at 92k base. If you could match 90k, I would accept immediately and start in 2 weeks.',
      'The base is close to my expectations. Could we discuss the equity package? I\'m particularly interested in the vesting schedule and the strike price relative to the last valuation.'
    ],
    examples: [
      'Candidate: "I was targeting 90-100k based on Levels.fyi data for this role in Austin." Recruiter: "We can do 92k base plus 10k signing bonus." Result: Candidate accepted, started 2 weeks later.',
      'Candidate: "The offer is strong. Could we add a professional development budget of 2k annually for conferences and courses?" Recruiter: "We can include 1.5k in the benefits package." Result: Candidate accepted with improved long-term value.'
    ],
    checklist: [
      'Researched market rates on Levels.fyi or Glassdoor',
      'Know your minimum acceptable number',
      'Have at least one alternative offer or strong BATNA',
      'Prepared 2-3 specific justifications for higher salary',
      'Ready to discuss total compensation, not just base'
    ],
    tags: ['salary', 'negotiation', 'scripts', 'batna', 'anchoring']
  },
  {
    id: 'linkedin/headline-seo',
    title: 'LinkedIn Headline SEO Guide',
    category: 'linkedin',
    professionId: 'software_engineer',
    overview: 'Your LinkedIn headline is the #1 searchable field. Recruiters search for "React Developer" or "Node.js Engineer" — keywords in your headline determine whether you appear in results.',
    guides: [
      'Include 3-5 core technologies in your headline',
      'State your target role explicitly — "Junior Frontend Developer" not just "Developer"',
      'Add one differentiator — "Building accessible UIs" or "API Performance Specialist"',
      'Remove generic phrases — "Passionate", "Looking for opportunities", "Open to work"',
      'Keep under 120 characters so the full headline is visible in search',
      'Cross-reference keywords from target job descriptions',
    ],
    templates: [
      'React Developer | TypeScript | Node.js | Building scalable web apps',
      'Junior Frontend Engineer | React | Next.js | UI/UX enthusiast',
      'Full-stack Developer | MERN Stack | API Design | Cloud Deployment'
    ],
    examples: [
      'Before: "Software Engineer looking for opportunities" → 2 recruiter views/week',
      'After: "React Developer | TypeScript | Node.js | Frontend Performance" → 15 recruiter views/week'
    ],
    checklist: [
      'Headline contains 3+ specific technologies',
      'Target role is stated explicitly',
      'No generic phrases like "passionate" or "looking"',
      'Under 120 characters (full headline visible in search)',
      'Matches keywords from target job descriptions'
    ],
    tags: ['linkedin', 'headline', 'seo', 'keywords', 'profile']
  },
  {
    id: 'communication/networking-messages',
    title: 'Networking Message Templates',
    category: 'communication',
    professionId: 'software_engineer',
    overview: 'Cold messages fail because they ask for jobs. Warm messages succeed because they start conversations. The goal is a reply, not a referral.',
    guides: [
      'Find a genuine connection point — shared conference, alumni, or mutual contact',
      'Open with specific praise or a detail from their work',
      'Make a soft ask — a 10-minute call, not a referral request',
      'Keep the first message under 100 words',
      'Send one gentle follow-up after 5-7 days if unanswered',
    ],
    templates: [
      'Hi [Name], I came across your article on React Server Components. I\'m building a similar architecture for my portfolio project and would love to hear your thoughts on trade-offs. Would you be open to a 15-minute call next week?',
      'Hi [Name], I noticed we both studied at [University] and transitioned to tech. I\'m currently preparing for frontend interviews at [Company] and would appreciate any insights about the process. No pressure if you\'re busy!',
      'Hi [Name], I watched your conference talk on [Topic]. I implemented your approach in my project and got [Result]. Thank you for sharing — would love to connect and learn more about your work at [Company].'
    ],
    examples: [
      'Message: "Hi Sarah, I saw your post about migrating from REST to GraphQL. I\'m considering the same for my startup project. What was the biggest challenge?" Reply: "Great question! The main issue was caching. Happy to chat — here\'s my Calendly."',
      'Message: "Hi Mike, we both went to State University. I\'m applying to Google and saw you made the same transition. Any advice on the interview loop?" Reply: "Sure! The system design round was toughest. Let\'s chat — free Thursday?"'
    ],
    checklist: [
      'Message mentions specific work of the recipient',
      'No job ask in the first message',
      'Request is low-commitment (10-15 min, no pressure)',
      'Message is under 100 words',
      'Sent follow-up after 7 days if no reply'
    ],
    tags: ['networking', 'messages', 'templates', 'linkedin', 'referrals']
  },
  {
    id: 'interview/technical-junior',
    title: 'Technical Interview Guide (Junior)',
    category: 'interviews',
    professionId: 'software_engineer',
    overview: 'Junior technical interviews focus on fundamentals — clean code, basic data structures, and clear thinking. Interviewers want to see your problem-solving process, not perfect answers.',
    guides: [
      'Ask clarifying questions before you start coding',
      'Talk through your approach out loud — silence is the #1 red flag',
      'Write a brute-force solution first, then optimise',
      'Test your solution with 2-3 examples including edge cases',
      'Explain time and space complexity after coding',
    ],
    templates: [
      'Interviewer: "Reverse a string in JavaScript"\nYou: "Before I start, should I handle Unicode characters or just ASCII? And should I do it in-place or return a new string?"\n[Write solution, explain each step]\nYou: "Let me test this with a few examples: empty string, single character, palindrome, regular string."',
      'Interviewer: "Fetch data from an API and handle errors"\nYou: "I\'ll use fetch with async/await. I\'ll handle network errors, 404s, and JSON parsing. Should I implement retry logic or timeout?"\n[Write code with try/catch, loading state, error message]'
    ],
    examples: [
      'Question: "What is the difference between let and const?"\nStrong answer: "Both are block-scoped. const prevents reassignment of the binding, but the value can still be mutable for objects. I use const by default and let only when reassignment is needed."',
      'Question: "Explain useEffect"\nStrong answer: "useEffect handles side effects in React. It runs after render. The dependency array controls when it re-runs. I always clean up subscriptions or timers in the return function to prevent memory leaks."'
    ],
    checklist: [
      'Always ask clarifying questions first',
      'Talk through approach before coding',
      'Test solution with 2-3 examples',
      'Mention edge cases even if not handling them',
      'Explain time and space complexity'
    ],
    tags: ['interview', 'technical', 'junior', 'coding', 'fundamentals']
  },
  {
    id: 'resume/ats-optimization',
    title: 'ATS Optimization Checklist',
    category: 'resume',
    professionId: 'software_engineer',
    overview: '75% of resumes are rejected by Applicant Tracking Systems before a human sees them. The right formatting and keywords make the difference between screened out and shortlisted.',
    guides: [
      'Copy 10+ keywords from the job description — use exact spelling',
      'Use a single-column layout with standard fonts (Arial, Calibri)',
      'Avoid tables, headers, footers, and text boxes',
      'Use standard section headers — "Experience", "Education", "Skills"',
      'Save as .docx first (most ATS-friendly), then .pdf if required',
      'Name your file professionally — FirstName_LastName_Role.pdf',
    ],
    templates: [
      'Before: Creative two-column design with icons and graphics → ATS score: 35%\nAfter: Single column, standard fonts, keyword-rich → ATS score: 92%',
      'File name: "resume_final_v2.pdf" → unprofessional\nFile name: "John_Smith_Frontend_Developer.pdf" → professional, searchable'
    ],
    examples: [
      'Job description: "React, TypeScript, Node.js, REST APIs, Git, CI/CD"\nResume skills section: "React, TypeScript, Node.js, REST APIs, Git, GitHub Actions, CI/CD"\nResult: 95% keyword match, passed ATS screening',
      'Job description: "Agile, Scrum, Jira"\nResume: "Worked in Agile environment with daily standups, sprint planning, and Jira ticket management"\nResult: Contextual keyword match, higher ATS score than list-only'
    ],
    checklist: [
      'Resume is single-column',
      'Standard section headers used',
      '10+ keywords from job description included',
      'File name is professional',
      'Submitted in requested format (.docx or .pdf)'
    ],
    tags: ['ats', 'resume', 'keywords', 'formatting', 'parsing']
  },
  {
    id: 'interview/behavioral-prep',
    title: 'Behavioral Interview Preparation',
    category: 'interviews',
    professionId: 'software_engineer',
    overview: 'Behavioral questions predict future performance based on past behaviour. Every major tech company uses them. Preparation beats improvisation every time.',
    guides: [
      'List 5-7 stories from your experience that show different skills',
      'Map each story to 2-3 likely question types',
      'Write each story in STAR format — Situation, Task, Action, Result',
      'Practise out loud until the story flows naturally in 90-120 seconds',
      'Record yourself and remove filler words or weak phrases',
    ],
    templates: [
      'Failure: "At my internship, I deployed a bug that broke the login for 2 hours. I immediately rolled back, wrote a post-mortem, and added integration tests. Now I always write tests for critical paths."\nConflict: "A teammate wanted to use Redux for a small app. I suggested Context API with useReducer. We prototyped both, measured bundle size, and chose Context. The app was 40% smaller."',
      'Leadership: "During a hackathon, our team was stuck on API integration. I suggested we split into pairs: one on frontend mockups, one on backend endpoints. We delivered a working MVP in 24 hours and won 2nd place."'
    ],
    examples: [
      'Weak: "I never really had conflicts. I get along with everyone."\nStrong: "In my bootcamp team, we disagreed on the tech stack. I proposed we each build a prototype in 2 hours and compare. We chose Next.js based on performance metrics, not opinions."',
      'Weak: "I work hard and always meet deadlines."\nStrong: "Last month, I noticed our sprint was falling behind. I took ownership of the authentication module, worked extra hours to unblock the team, and we shipped on time. The PM specifically thanked me in retro."'
    ],
    checklist: [
      'Prepared 5-7 STAR stories',
      'Each story maps to 2+ question types',
      'Answers are 90-120 seconds when spoken',
      'Stories include specific numbers and outcomes',
      'Practiced out loud at least 3 times'
    ],
    tags: ['interview', 'behavioral', 'star', 'preparation', 'stories']
  },
  {
    id: 'linkedin/about-section',
    title: 'LinkedIn About Section Guide',
    category: 'linkedin',
    professionId: 'software_engineer',
    overview: 'Your LinkedIn About section is your elevator pitch in writing. A strong About section converts profile views into interview requests.',
    guides: [
      'Paragraph 1: State your current role, stack, and focus area',
      'Paragraph 2: Describe 2-3 specific projects with measurable outcomes',
      'Paragraph 3: State your target role and company type',
      'Use first person ("I", not "John") — third person sounds pretentious',
      'Keep it narrative — no bullet points or skill lists',
      'Show, don\'t tell — replace "hardworking" with actual achievements',
    ],
    templates: [
      'I\'m a Full-stack Developer with expertise in the MERN stack. I\'ve built and deployed 4 production applications, including an e-commerce platform processing $10k/month. I specialize in API design and database optimization. Currently seeking backend-focused roles at fintech startups.',
      'Frontend Engineer with 1 year of experience in React and Vue.js. I redesigned a healthcare portal used by 5,000+ patients, improving accessibility score from 72 to 96. Passionate about inclusive design and component-driven architecture. Looking for mid-level frontend roles at mission-driven companies.'
    ],
    examples: [
      'Weak: "I am a hardworking software engineer with a passion for coding. I love learning new technologies and solving problems."\nStrong: "I\'m a Backend Developer focused on Node.js and microservices. At my last role, I designed a notification system handling 100k daily messages with 99.9% reliability. I\'m now expanding into Go and Kubernetes for cloud-native applications."',
      'Weak: "John is a dedicated professional with strong communication skills."\nStrong: "I transitioned from finance to tech through a rigorous bootcamp. I built a stock analysis tool using Python and React that processes real-time market data. My finance background gives me unique insight into fintech product development."'
    ],
    checklist: [
      '3 paragraphs, each with clear purpose',
      'Specific projects with metrics',
      'Target role stated explicitly',
      'First person ("I", not "John")',
      'No generic traits without evidence'
    ],
    tags: ['linkedin', 'about', 'profile', 'narrative', 'elevator-pitch']
  },
  {
    id: 'offer/total-compensation',
    title: 'Total Compensation Breakdown',
    category: 'offer',
    professionId: 'software_engineer',
    overview: 'Base salary is only 60-70% of total compensation in tech. Understanding equity, bonuses, and benefits prevents costly mistakes — junior engineers often leave 20-30% of value on the table.',
    guides: [
      'Calculate base salary first — it affects 401k match and bonus percentages',
      'Evaluate equity — RSUs for public companies, options for startups',
      'Factor in signing bonus — one-time cash that is immediately valuable',
      'Compare benefits — health insurance, 401k match, learning budget, PTO',
      'Annualise everything — "What is this worth per year?"',
      'Prioritise base salary for cash flow, equity for long-term upside',
    ],
    templates: [
      'Offer A: 90k base, 10k signing, 50k RSU over 4 years, 10% bonus\nAnnual value: 90k + 2.5k + 12.5k + 9k = 114k total',
      'Offer B: 85k base, 20k signing, 80k options (high-risk startup), 15% bonus\nAnnual value: 85k + 5k + 0-20k (uncertain) + 12.75k = 102.75k-122.75k'
    ],
    examples: [
      'Mistake: "I only care about base salary" → ignored 40k equity package that vested and became worth 200k after IPO',
      'Smart: "Can we increase the base by 5k and reduce the signing bonus by 5k?" → better long-term value, same first-year cash'
    ],
    checklist: [
      'Calculated annual total compensation for each offer',
      'Understood vesting schedule and cliff',
      'Compared benefits packages (health, 401k, PTO)',
      'Considered tax implications of equity vs cash',
      'Prioritized base salary for immediate needs'
    ],
    tags: ['salary', 'equity', 'compensation', 'rsu', 'benefits']
  },
  {
    id: 'communication/strong-weak-phrases',
    title: 'Strong vs Weak Phrases',
    category: 'communication',
    professionId: 'software_engineer',
    overview: 'The words you choose in an interview signal confidence and competence. Weak phrases introduce doubt. Strong phrases demonstrate ownership and directness.',
    guides: [
      'Replace "I think" and "maybe" with direct statements',
      'Start every answer with "I" followed by a strong action verb — led, built, designed',
      'When you don\'t know something, pivot to adjacent experience',
      'Remove minimising language — "just", "kind of", "sort of"',
      'Practise out loud and listen for filler words — "um", "like", "basically"',
    ],
    templates: [
      'Weak: "I think I might be able to handle that kind of project."\nStrong: "I\'ve delivered similar projects. I\'d start by breaking it into milestones and validating the approach early."',
      'Weak: "I just kind of helped with the backend stuff."\nStrong: "I designed and implemented the authentication service, including JWT handling and role-based access control."',
    ],
    examples: [
      'Question: "Do you know Kubernetes?"\nWeak: "Not really, but I\'ve maybe heard of it."\nStrong: "I haven\'t used Kubernetes in production, but I\'ve worked with Docker Compose and understand container orchestration concepts. I\'d be comfortable learning it on the job."',
    ],
    checklist: [
      'Removed "I think" and "maybe" from prepared answers',
      'Every answer starts with "I" + strong action verb',
      'Knowledge gaps addressed with adjacent experience',
      'Practiced answers out loud to catch weak phrases',
      'Recorded a mock answer and listened for filler language',
    ],
    tags: ['communication', 'phrases', 'confidence', 'language', 'interview'],
  },
  {
    id: 'body_language/interview-presence',
    title: 'Body Language in Interviews',
    category: 'body_language',
    professionId: 'software_engineer',
    overview: 'Interviewers form first impressions in under 7 seconds — mostly from non-verbal signals. Your posture, eye contact, and gestures communicate confidence before you say a word.',
    guides: [
      'Sit upright with feet flat — leaning forward 5-10° shows engagement',
      'Maintain eye contact 60-70% of the time — look away naturally when thinking',
      'Keep hands visible and use open gestures when emphasising points',
      'Smile when introduced — hold for 2 seconds',
      'For video calls: camera at eye level, clean background, front lighting',
      'Do a power pose for 2 minutes before the call to reduce stress',
    ],
    templates: [
      'Pre-interview routine: 5 minutes before, stand up, take 3 slow breaths, roll shoulders back. This activates confident posture and reduces cortisol.',
      'Power pose for 2 minutes before the call: stand with feet wide, hands on hips. Research shows this increases testosterone and reduces stress hormones.',
    ],
    examples: [
      'Common mistake: nodding too fast signals nervousness. Slow deliberate nods signal active listening and calm confidence.',
      'Zoom mistake: looking at your own video window means the interviewer sees you looking slightly down-left, not at them. Cover your own face tile with a sticky note.',
    ],
    checklist: [
      'Camera is at eye level for video interviews',
      'Background is neutral and professional',
      'Practiced maintaining eye contact in a mirror or on camera',
      'Removed fidget objects from desk',
      'Lighting source is in front of me, not behind',
    ],
    tags: ['body_language', 'interview', 'zoom', 'presence', 'confidence'],
  },
  {
    id: 'confidence/anxiety-management',
    title: 'Managing Interview Anxiety',
    category: 'confidence',
    professionId: 'software_engineer',
    overview: 'Interview anxiety is normal — the goal is not to eliminate it but to use it. Adrenaline improves focus when channeled correctly through breathing, reframing, and preparation.',
    guides: [
      'Do box breathing 30 minutes before: inhale 4s → hold 4s → exhale 4s → hold 4s',
      'Walk for 10 minutes — movement burns cortisol',
      'Write down 3 things you\'re genuinely good at',
      'Reframe the interview as a mutual exploration — not an exam',
      'Pause 2-3 seconds before answering — signals thoughtfulness, not nerves',
      'Prepare 2 phrases for blank moments — "Let me think about that"',
    ],
    templates: [
      '4-7-8 breathing: inhale for 4, hold for 7, exhale for 8. Use this in the waiting room or before joining the video call.',
      'Reframe script: "I am not being judged. I am exploring whether this team and I are a match. They need someone — I am here to find out if that is me."',
    ],
    examples: [
      'Candidate froze during a system design question. Said: "Let me think about this for a moment." Took 10 seconds, then gave a structured answer. Received offer. Interviewers noted "composed under pressure" in feedback.',
      'Candidate asked at end: "Do you have any concerns about my background I could address?" Interviewer mentioned React experience. Candidate explained relevant project. Turned a potential rejection into an offer.',
    ],
    checklist: [
      'Practiced box breathing at least once before the interview day',
      'Written down 3 genuine strengths to review before the call',
      'Prepared 2 phrases for handling blank moments',
      'Scheduled 10-minute walk within 30 minutes of interview time',
      'Reframed the interview as a conversation, not an exam',
    ],
    tags: ['confidence', 'anxiety', 'psychology', 'mindset', 'breathing'],
  },
  {
    id: 'interview/remote-interview',
    title: 'Remote Interview Guide',
    category: 'interviews',
    professionId: 'software_engineer',
    overview: 'Remote interviews have unique failure modes that in-person ones don\'t. Technical problems are the #1 avoidable reason candidates lose remote offers.',
    guides: [
      'Test your internet speed (10+ Mbps minimum) — use ethernet if possible',
      'Set up a quiet room with a door that closes',
      'Install and test the platform (Zoom, Teams, Meet) 24 hours before',
      'Prepare a phone hotspot as backup internet',
      'Disable all notifications on phone and computer',
      'Join 5 minutes early — have water nearby',
    ],
    templates: [
      'Pre-interview checklist (night before): charge laptop, test platform login, check background, confirm interview link, set alarm 30 min early.',
      'Technical failure script: "I apologize for the technical issue. I\'m switching to [backup]. Can you hear me now? Thank you for your patience — I\'m ready to continue."',
    ],
    examples: [
      'Candidate lost connection during remote interview. Immediately sent email: "Connection dropped — rejoining now." Rejoined within 90 seconds. Interviewer noted professionalism. Received offer.',
      'Common mistake: conducting interview in coffee shop. Background noise, poor WiFi, and distractions led to failed technical round that candidate would have passed in quiet environment.',
    ],
    checklist: [
      'Tested platform login and audio 24 hours before',
      'Ethernet cable connected or WiFi signal confirmed strong',
      'Phone hotspot available as backup',
      'Room is quiet with door that closes',
      'All notifications disabled on phone and computer',
    ],
    tags: ['remote', 'interview', 'zoom', 'setup', 'technical'],
  },
  {
    id: 'interview/common-mistakes',
    title: 'Common Interview Mistakes',
    category: 'interviews',
    professionId: 'software_engineer',
    overview: 'Most interview failures are preventable — the same mistakes appear across thousands of interviews. Knowing them in advance removes them as risks.',
    guides: [
      'Keep answers under 2 minutes — use STAR and stop',
      'Prepare 3-5 questions to ask — "No questions" signals disinterest',
      'Reframe negative experiences — never badmouth a previous employer',
      'Research the company — product, recent news, team on LinkedIn',
      'Answer "Tell me about yourself" in 90 seconds: current role → key achievement → why this company',
      'Send a thank-you email within 2 hours — less than 20% of candidates do this',
    ],
    templates: [
      'Thank-you email (send within 2 hours): "Hi [Name], thank you for the conversation today. I especially enjoyed discussing [specific topic]. I\'m excited about the [role] position and the team\'s work on [project]. Please let me know if you need anything else from me."',
      '"Tell me about yourself" structure: "I\'m a [role] with [X years] of experience in [stack]. Most recently, I [key achievement]. I\'m interested in this role because [specific reason tied to company]."',
    ],
    examples: [
      'Mistake: interviewer asks "Any questions?" Candidate says "No, I think we covered everything." Red flag — interviewer marks down as low interest. Strong response: "Yes — what does success look like for this role in the first 90 days?"',
      'Mistake: asked about previous company. Candidate says "My last manager micromanaged everyone and the codebase was a disaster." Immediate red flag. Strong response: "It was a good learning experience. I grew technically but was ready for a team with stronger engineering culture."',
    ],
    checklist: [
      'Prepared 5 questions to ask the interviewer',
      'Practiced "Tell me about yourself" in under 90 seconds',
      'Researched company product, recent news, and team on LinkedIn',
      'Prepared neutral framing for why you left/are leaving current role',
      'Drafted thank-you email template ready to personalize after interview',
    ],
    tags: ['mistakes', 'interview', 'preparation', 'follow-up', 'negotiation'],
  },
  {
    id: 'applications/tracking-system',
    title: 'Application Tracking System Guide',
    category: 'applications',
    professionId: 'software_engineer',
    overview: 'Keep track of every application you submit — roles, companies, statuses, and follow-ups. A system prevents missed opportunities and shows recruiters you\'re organised.',
    guides: [
      'Create a spreadsheet with columns: Company, Role, Date Applied, Status, Follow-up Date',
      'Apply within 48 hours of the job being posted',
      'Customise your resume and cover letter for each application',
      'Note the recruiter or hiring manager name for follow-up',
      'Set a reminder to follow up after 7 days of no response',
      'Log every interview stage — date, interviewer, key feedback',
    ],
    templates: [
      '| Company | Role | Date | Status | Follow-up |\n|---------|------|------|--------|-----------|\n| Acme | Jr Frontend | 01-Jan | Applied | 08-Jan |',
      'Follow-up email: "Hi [Name], I applied for the [Role] position on [Date] and wanted to reiterate my interest. I\'d love the opportunity to discuss how my experience in [Skill] could contribute to the team."',
    ],
    examples: [
      'Candidate tracked 50 applications → identified that applications submitted on Tuesday had the highest response rate → adjusted strategy → 30% more callbacks.',
      'No tracking → forgot about an application → missed the interview invite → lost the opportunity entirely.',
    ],
    checklist: [
      'Spreadsheet or tool set up with all required columns',
      'Resume customised for each application',
      'Cover letter tailored to the company',
      'Recruiter name noted for follow-up',
      'Follow-up reminder set for 7 days post-application',
    ],
    tags: ['tracking', 'applications', 'organisation', 'follow-up'],
  },
  {
    id: 'applications/cover-letter',
    title: 'Cover Letter Templates',
    category: 'applications',
    professionId: 'software_engineer',
    overview: 'A strong cover letter connects your experience to the company\'s needs. It should be concise, specific, and show that you understand the role and the business.',
    guides: [
      'Open with the specific role and why you\'re excited about it',
      'Paragraph 2: Connect your most relevant experience to the job requirements',
      'Paragraph 3: Show company research — mention a product, blog post, or news',
      'Close with a call to action — "I would welcome the chance to discuss..."',
      'Keep it under 300 words — recruiters spend 30 seconds on average',
    ],
    templates: [
      'Dear [Hiring Manager],\n\nI\'m excited to apply for the [Role] position at [Company]. With [X years] of experience in [Skill] and a track record of [Achievement], I\'m confident I can contribute immediately.\n\nAt my current role, I [specific accomplishment with metric]. I see that [Company] is [specific company initiative], and my experience in [related skill] aligns directly with this.\n\nThank you for your time. I would welcome the chance to discuss how I can contribute to the team.\n\nBest,\n[Name]',
    ],
    examples: [
      'Generic: "I am writing to apply for the position at your company. I have skills in many areas." → Low response rate.',
      'Specific: "I\'m applying for the Frontend role at Acme because I\'ve used your design system and have ideas for improving component reusability." → High response rate.',
    ],
    checklist: [
      'Addressed to a specific person whenever possible',
      'Connects experience to the job description',
      'Shows company-specific research',
      'Under 300 words',
      'Proofread for typos and formatting',
    ],
    tags: ['cover-letter', 'applications', 'templates', 'writing'],
  },
  {
    id: 'applications/follow-up',
    title: 'Follow-up Email Templates',
    category: 'applications',
    professionId: 'software_engineer',
    overview: 'A timely follow-up email keeps you top-of-mind without being pushy. Most candidates don\'t follow up — doing so sets you apart.',
    guides: [
      'Send the first follow-up 7 days after applying if you haven\'t heard back',
      'Keep it brief — 3-4 sentences max',
      'Reiterate interest without demanding a status update',
      'After an interview, send a thank-you note within 2 hours',
      'If rejected, send a gracious reply — you may be considered for future roles',
    ],
    templates: [
      'Post-application follow-up: "Hi [Name], I hope you\'re well. I applied for the [Role] position on [Date] and remain very interested. I\'d love the chance to discuss my fit for the role. Thank you for your time."',
      'Post-interview thank-you: "Hi [Name], thank you again for the conversation today. I especially enjoyed learning about [topic]. I\'m very excited about the role and would be grateful for any updates when available."',
    ],
    examples: [
      'Candidate sent a thoughtful follow-up referencing a topic from the interview → recruiter moved them to the next round, noting "genuine interest".',
      'Candidate didn\'t follow up → another candidate with similar qualifications who did follow up got the offer.',
    ],
    checklist: [
      'Follow-up email drafted and ready to personalise',
      'Sent within 7 days of application',
      'Thank-you email sent within 2 hours of interview',
      'Gracious rejection response prepared',
      'Recruiter name confirmed for correct addressing',
    ],
    tags: ['follow-up', 'email', 'templates', 'professionalism'],
  },
  {
    id: 'offer/evaluation-checklist',
    title: 'Job Offer Evaluation Checklist',
    category: 'offer',
    professionId: 'software_engineer',
    overview: 'A job offer is a decision that affects your career trajectory, finances, and daily happiness. Evaluate systematically — don\'t let excitement or pressure rush your choice.',
    guides: [
      'Compare base salary, equity, signing bonus, and benefits across offers',
      'Evaluate growth potential — mentorship, training budget, promotion track',
      'Assess company culture — team dynamics, management style, work-life balance',
      'Consider location/remote policy — commute, relocation, or WFH stipend',
      'Review the team and tech stack — will you learn skills that increase your market value?',
      'Talk to future teammates if possible — a 15-minute chat reveals more than any document',
    ],
    templates: [
      'Offer scoring matrix:\n| Factor | Weight | Offer A (1-5) | Offer B (1-5) |\n|--------|--------|--------------|--------------|\n| Salary | 30% | 4 | 5 |\n| Growth | 25% | 5 | 3 |\n| Culture | 25% | 4 | 4 |\n| Tech | 20% | 3 | 5 |\n| Total | 100% | 4.05 | 4.30 |',
    ],
    examples: [
      'Junior engineer chose a lower-paying startup over a big company — joined as early employee, learned full-stack fast, promoted to lead in 18 months.',
      'Junior engineer chose higher base salary with no learning budget or mentorship — stalled after 6 months, needed to switch jobs to continue growing.',
    ],
    checklist: [
      'Created an offer comparison spreadsheet',
      'Researched company on Glassdoor, Blind, and LinkedIn',
      'Talked to current or former employees if possible',
      'Evaluated long-term career growth, not just first-year comp',
      'Negotiated at least one component before accepting',
    ],
    tags: ['offer', 'evaluation', 'decision', 'comparison'],
  },
  {
    id: 'offer/benefits-guide',
    title: 'Tech Benefits Guide for Juniors',
    category: 'offer',
    professionId: 'software_engineer',
    overview: 'Benefits can be worth 20-40% of your base salary. Health insurance, retirement plans, learning budgets, and perks vary widely — knowing what to look for prevents bad surprises.',
    guides: [
      'Check health insurance — monthly premium, deductible, out-of-pocket max',
      'Review 401(k) match — "50% match up to 6%" means free money',
      'Look for a learning budget — conferences, courses, books',
      'Check PTO policy — unlimited sounds great but often means less time off',
      'Ask about remote stipend — home office setup, internet, co-working',
      'Evaluate parental leave, sick days, and mental health support',
    ],
    templates: [
      'Benefits comparison template:\n- Health: [Premium/Deductible/OOP Max]\n- 401k: [Match % up to X%]\n- Learning: [$ amount/year]\n- PTO: [days/year or "unlimited"]\n- Remote: [stipend amount]\n- Other: [unique perks]',
    ],
    examples: [
      'Offer A: 85k base, no 401k match, limited PTO, no learning budget.\nOffer B: 80k base, 5% 401k match ($4k/year), unlimited PTO, $2k learning budget.\nNet value: Offer B = 80k + 4k + 2k = 86k vs Offer A = 85k. Offer B wins.',
    ],
    checklist: [
      'Health insurance premium and deductible understood',
      '401(k) match percentage and vesting schedule checked',
      'Learning and development budget confirmed',
      'PTO policy understood (unlimited vs fixed)',
      'Remote work benefits and stipend clarified',
    ],
    tags: ['benefits', 'offer', 'compensation', 'insurance', 'perks'],
  },
];

export function getPlaybookEntry(id: string): PlaybookEntry | undefined {
  return PLAYBOOK.find(entry => entry.id === id);
}

export function getPlaybookByCategory(category: PlaybookCategory, professionId?: string): PlaybookEntry[] {
  return PLAYBOOK.filter(entry => entry.category === category && (!professionId || entry.professionId === professionId));
}

export function searchPlaybook(query: string, professionId?: string): PlaybookEntry[] {
  const lower = query.toLowerCase();
  return PLAYBOOK.filter(entry =>
    (!professionId || entry.professionId === professionId) &&
    (entry.title.toLowerCase().includes(lower) ||
    entry.tags.some(tag => tag.toLowerCase().includes(lower)) ||
    entry.overview.toLowerCase().includes(lower))
  );
}
