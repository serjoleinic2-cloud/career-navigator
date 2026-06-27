import type { PlaybookEntry, PlaybookCategory } from './playbook_types';

export const PLAYBOOK: PlaybookEntry[] = [
  {
    id: 'resume/summary-formulas',
    title: 'Resume Summary Formulas',
    category: 'resume',
    content: 'A resume summary is not a biography. It is a positioning statement that answers three questions: who you are, what you do, and what you want. The most effective summaries follow proven formulas that recruiters scan in under 5 seconds.\n\nFormula 1 (Junior): [Role] with [X months/years] of experience in [stack], specializing in [domain]. Built [project type] using [key technologies]. Seeking [target role] at [company type].\n\nFormula 2 (Career Changer): [Previous field] professional transitioning to [target role]. Completed [credential/bootcamp] with focus on [stack]. Built [project] demonstrating [skill].\n\nFormula 3 (Specialist): [Role] focused on [specialization]. Deep expertise in [technology 1], [technology 2], and [methodology]. Reduced [metric] by [X]% at [context].',
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
    category: 'interview',
    content: 'The STAR method is the industry standard for answering behavioral interview questions. Recruiters are trained to listen for these four components. Missing any part weakens your answer significantly.\n\nSITUATION (1-2 sentences): Set the context. Where were you? What team? What was the project? Keep it brief — this is not the main point.\n\nTASK (1 sentence): What was your specific responsibility? What problem did you need to solve? Be clear about your role, not the team\'s.\n\nACTION (3-5 sentences): What did YOU do? Use "I" statements. Describe the specific steps, technologies, and decisions. This is the longest part and where you demonstrate competence.\n\nRESULT (1-2 sentences): What happened? Use numbers when possible. "Reduced load time by 30%." "Increased test coverage from 40% to 85%." If negative, show what you learned.',
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
    id: 'salary/negotiation-scripts',
    title: 'Salary Negotiation Scripts',
    category: 'salary',
    content: 'Negotiation is not confrontation. It is information exchange. Most companies expect negotiation and have built-in flexibility. The key is to anchor high, justify with data, and create win-win framing.\n\nANCHORING: The first number mentioned becomes the reference point. If you say a number first, it anchors the conversation. If they say a number first, you can anchor higher with data.\n\nBATNA (Best Alternative to Negotiated Agreement): Know your walk-away number. If you have multiple offers, your BATNA is stronger. Never reveal your BATNA directly.\n\nRANGES NOT NUMBERS: Always give ranges. "Based on market data, I\'m targeting 85-95k." This shows flexibility while setting a floor.\n\nTOTAL COMPENSATION: Base salary is only part of the package. Consider signing bonus, equity, benefits, remote flexibility, learning budget.',
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
    content: 'Your LinkedIn headline is the #1 searchable field. Recruiters search for "React Developer" or "Node.js Engineer" — not "Passionate Coder" or "Aspiring Techie". The algorithm matches keywords in headline, about, and experience sections.\n\nKEYWORD DENSITY: Include 3-5 core technologies in your headline. "React | TypeScript | Node.js | Frontend Developer" performs better than "Software Engineer" alone.\n\nROLE CLARITY: State your target role explicitly. "Junior Frontend Developer" is better than "Developer" because it matches exact search queries.\n\nVALUE PROPOSITION: Add one differentiator. "React Developer | Building accessible UIs" or "Node.js Engineer | API Performance Specialist".\n\nAVOID: "Looking for opportunities", "Open to work", "Passionate about tech" — these are not searchable and signal desperation.',
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
    id: 'networking/connection-templates',
    title: 'Networking Message Templates',
    category: 'networking',
    content: 'Cold messages fail because they ask for jobs. Warm messages succeed because they start conversations. The goal of the first message is not a referral — it is a reply.\n\nFORMULA: Context + Specific Interest + Soft Ask\n\nCONTEXT: How did you find them? "I saw your talk on React performance" or "We both went to [university]".\n\nSPECIFIC INTEREST: Why them specifically? "Your approach to code splitting was exactly what I needed for my project."\n\nSOFT ASK: Low-commitment request. "Would you be open to a 10-minute call about your experience at [company]?" NOT "Can you refer me?"\n\nFOLLOW-UP: If no reply in 5-7 days, send one gentle follow-up with value. "I implemented your suggestion and reduced bundle size by 40%."',
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
    category: 'interview',
    content: 'Junior technical interviews focus on fundamentals, not complex algorithms. Interviewers want to see: can you write clean code? Do you understand basic data structures? Can you explain your thinking?\n\nCOMMON QUESTIONS:\n- Reverse a string/array\n- Find duplicates in an array\n- FizzBuzz variations\n- Basic DOM manipulation\n- API fetching with error handling\n- React: state vs props, useEffect cleanup\n\nWHAT INTERVIEWERS LOOK FOR:\n1. Do you ask clarifying questions before coding?\n2. Do you talk through your approach?\n3. Do you test your solution with examples?\n4. Do you consider edge cases?\n5. Do you optimize after brute force?\n\nRED FLAGS:\n- Silent coding without explanation\n- Ignoring edge cases (empty input, duplicates)\n- Not testing the solution\n- Giving up without trying\n- Copy-pasting solutions without understanding',
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
    content: 'Applicant Tracking Systems (ATS) parse resumes before humans see them. 75% of resumes are rejected by ATS, not recruiters. The system looks for: keyword matches, standard formatting, and section headers.\n\nKEYWORD MATCHING: Copy 10 keywords from the job description into your resume. Use exact spelling: "TypeScript" not "Typescript", "React.js" not "React".\n\nFORMATTING RULES:\n- Single column layout\n- Standard fonts (Arial, Calibri, Georgia)\n- No tables, headers, footers, or text boxes\n- Save as .docx or .pdf (ATS-friendly)\n- File name: FirstName_LastName_Role.pdf\n\nSECTION HEADERS: Use standard names: "Experience", "Education", "Skills", "Projects". Creative headers like "My Journey" confuse parsers.\n\nFILE FORMAT: Some ATS cannot read PDFs. When in doubt, submit .docx. Always follow the application instructions exactly.',
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
    category: 'interview',
    content: 'Behavioral questions predict future performance based on past behavior. Every major tech company uses them. The key is preparation, not improvisation.\n\nTOP 10 QUESTIONS:\n1. Tell me about a time you failed.\n2. Describe a conflict with a teammate.\n3. Give an example of leadership.\n4. Tell me about a time you had to learn quickly.\n5. Describe a situation with a difficult stakeholder.\n6. Tell me about a time you went above and beyond.\n7. Describe a decision you made with incomplete information.\n8. Tell me about a time you received critical feedback.\n9. Give an example of prioritization under pressure.\n10. Describe a time you had to convince someone.\n\nPREPARATION METHOD:\n1. List 5-7 stories from your experience\n2. Map each to 2-3 question types\n3. Write in STAR format\n4. Practice out loud until natural\n5. Time each answer: 90-120 seconds optimal',
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
    content: 'The About section is your elevator pitch in writing. Recruiters read it after your headline. A strong About section converts profile views into interview requests.\n\nSTRUCTURE (3 paragraphs):\n1. WHO YOU ARE: Current role, stack, and focus. "I\'m a Frontend Developer specializing in React and TypeScript, building accessible and performant web applications."\n2. WHAT YOU\'VE BUILT: 2-3 specific projects with metrics. "I developed a real-time dashboard that reduced data loading time by 60% using React Query and WebSockets."\n3. WHAT YOU WANT: Target role and company type. "I\'m seeking a Senior Frontend role at a product company where I can lead UI architecture decisions."\n\nAVOID:\n- Third person ("John is a developer...") — sounds pretentious\n- Bullet points — About is narrative, not a resume\n- Skills list — that\'s what the Skills section is for\n- Generic traits ("hardworking", "passionate") — show, don\'t tell',
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
    id: 'salary/total-compensation',
    title: 'Total Compensation Breakdown',
    category: 'salary',
    content: 'Base salary is only 60-70% of total compensation in tech. Understanding the full package prevents costly mistakes. Junior engineers often ignore equity and benefits, leaving 20-30% of value on the table.\n\nCOMPONENTS:\n1. BASE SALARY: Guaranteed cash. Negotiable. Affects 401k match and bonus calculations.\n2. SIGNING BONUS: One-time cash. Common for competitive roles. Taxed as regular income.\n3. EQUITY: Stock options or RSUs. Vesting over 4 years with 1-year cliff. Illiquid until IPO/acquisition.\n4. BONUS: Annual performance bonus. Typically 10-20% of base for juniors.\n5. BENEFITS: Health insurance, 401k match, learning budget, remote stipend, PTO.\n\nVALUATION METHOD:\n- Public company: RSU value = stock price × shares\n- Startup: Option value = (future price - strike price) × shares × probability of success\n- Always annualize: "What is this worth per year?"\n\nNEGOTIATION PRIORITY:\n1. Base salary (most important for cash flow)\n2. Signing bonus (immediate value)\n3. Equity (long-term upside)\n4. Benefits (quality of life)',
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
    content: 'The words you choose in an interview signal confidence, clarity, and competence. Weak phrases introduce doubt. Strong phrases demonstrate ownership and directness.\n\nWEAK PHRASES TO AVOID:\n- "I think I can..." → signals uncertainty\n- "Maybe I could..." → signals hesitation\n- "I\'m not sure but..." → signals lack of preparation\n- "I just did..." → minimizes your contribution\n- "I kind of worked on..." → vague and uncommitted\n- "Hopefully I\'ll be able to..." → future uncertainty\n\nSTRONG PHRASES TO USE:\n- "I led..." / "I built..." / "I designed..."\n- "I\'m confident that..."\n- "Based on my experience with X..."\n- "I would approach this by..."\n- "The result was..." / "I measured success by..."\n\nFOR TECHNICAL QUESTIONS:\n- Weak: "I\'ve heard of that, I think I used it once"\n- Strong: "I\'ve worked with X in [project]. The key tradeoff I noticed was..."\n\nFOR GAPS IN KNOWLEDGE:\n- Weak: "I don\'t know that"\n- Strong: "I haven\'t used that specific tool, but I\'ve solved similar problems with X. I\'d approach it by..."',
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
    content: 'Body language communicates confidence before you say a word. Research shows interviewers form first impressions in under 7 seconds — mostly from non-verbal signals.\n\nPOSTURE:\n- Sit upright with back against the chair\n- Lean slightly forward (5–10°) to show engagement\n- Keep both feet flat on the floor\n- Avoid crossing arms — it signals defensiveness\n\nEYE CONTACT:\n- Maintain eye contact 60–70% of the time\n- Look away naturally when thinking — not down\n- For video calls: look at the camera, not your own face\n- Avoid staring — break contact every 5–7 seconds\n\nHANDS:\n- Keep hands visible on the table or in your lap\n- Use open gestures when emphasizing a point\n- Avoid touching your face (signals anxiety)\n- No fidgeting with pens, phones, or clothing\n\nFACIAL EXPRESSION:\n- Smile genuinely when introduced — hold for 2 seconds\n- Nod slowly to show you\'re listening\n- Avoid blank face when the interviewer is speaking\n\nZOOM-SPECIFIC:\n- Camera at eye level — not looking up or down\n- Background is clean and professional\n- Lighting is in front of you, not behind\n- Join 5 minutes early to test audio/video',
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
    content: 'Interview anxiety is normal. The goal is not to eliminate it but to use it. Adrenaline improves focus and performance when channeled correctly.\n\nBEFORE THE INTERVIEW:\n\nPhysical reset (30 minutes before):\n- Walk for 10 minutes — movement burns cortisol\n- Box breathing: inhale 4s → hold 4s → exhale 4s → hold 4s → repeat 4 times\n- Cold water on wrists — reduces pulse rate\n\nMental reset:\n- Write down 3 things you\'re genuinely good at\n- Remind yourself: they invited you — you already passed initial screening\n- Replace "I must not fail" with "I am here to see if this is a good fit for both sides"\n\nDURING THE INTERVIEW:\n\nSlowing down:\n- Pause 2–3 seconds before answering — signals thoughtfulness, not nervousness\n- Drink water — gives you a natural pause and slows speech\n- Speak slower than you think you need to\n\nHandling blank moments:\n- "That\'s a great question. Let me think for a moment."\n- "I want to give you a complete answer — can I take 30 seconds?"\n- Interviewers prefer a 5-second pause over a rushed wrong answer\n\nAFTER REJECTION:\n- Rejection is data, not verdict\n- Every interview is a training session\n- Ask for feedback — most companies will share it',
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
    id: 'remote/remote-interview-guide',
    title: 'Remote Interview Guide',
    category: 'remote',
    content: 'Remote interviews have unique failure modes that in-person interviews do not. Technical problems are the #1 avoidable reason candidates lose remote offers.\n\nTECHNICAL SETUP (test 24 hours before):\n- Internet: use ethernet cable if possible; test speed at fast.com (minimum 10 Mbps up)\n- Backup: have phone hotspot ready\n- Audio: external microphone or headset — laptop mic picks up room echo\n- Camera: 1080p preferred; clean lens\n- Platform: install Zoom, Teams, Meet — whichever they use. Test login and audio\n\nENVIRONMENT:\n- Quiet room with door closed\n- Notify household members of interview time\n- Turn off phone notifications, desktop notifications, Slack\n- Close all browser tabs except what you need\n- Have water nearby\n\nDURING THE INTERVIEW:\n- If audio drops: "I think the connection cut out — could you repeat the last part?"\n- If video freezes: turn off video temporarily to save bandwidth\n- If major technical failure: call or email the interviewer immediately\n\nASYNCHRONOUS INTERVIEWS (one-way video):\n- Record in a quiet place with good lighting\n- Dress as for in-person interview\n- Look at camera, not the question on screen\n- Re-record if needed — most platforms allow multiple attempts',
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
    id: 'mistakes/common-interview-mistakes',
    title: 'Common Interview Mistakes',
    category: 'mistakes',
    content: 'Most interview failures are preventable. The same mistakes appear across thousands of interviews. Knowing them in advance removes them as risks.\n\nMISTAKE 1: Talking too long\nAnswers over 3 minutes lose the interviewer\'s attention. Use STAR and stop. If they want more, they\'ll ask.\n\nMISTAKE 2: Not asking questions\n"No questions" signals disinterest. Prepare 3–5 questions in advance. Asking nothing is a red flag.\n\nMISTAKE 3: Badmouthing previous employer\nAlways reframe negatively. "I learned a lot but was looking for more growth opportunities" — not "my manager was terrible."\n\nMISTAKE 4: Not researching the company\nNot knowing the product, recent news, or team signals laziness. Spend 30 minutes on their website, blog, and LinkedIn.\n\nMISTAKE 5: Answering "Tell me about yourself" with a life story\nThis is a 90-second pitch: current role → key achievement → why this company. Not your childhood.\n\nMISTAKE 6: Accepting the first salary offer\nCompanies expect negotiation. Accepting immediately leaves money on the table. Always ask for 24 hours to consider.\n\nMISTAKE 7: Forgetting to follow up\nSend a thank-you email within 2 hours of the interview. Mention one specific thing from the conversation. Less than 20% of candidates do this.\n\nMISTAKE 8: Not preparing for "Why do you want this role?"\nVague answers ("I like the company") fail. Specific answers succeed: "I saw your team is building X and my experience in Y maps directly to that problem."',
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
];

export function getPlaybookEntry(id: string): PlaybookEntry | undefined {
  return PLAYBOOK.find(entry => entry.id === id);
}

export function getPlaybookByCategory(category: PlaybookCategory): PlaybookEntry[] {
  return PLAYBOOK.filter(entry => entry.category === category);
}

export function searchPlaybook(query: string): PlaybookEntry[] {
  const lower = query.toLowerCase();
  return PLAYBOOK.filter(entry =>
    entry.title.toLowerCase().includes(lower) ||
    entry.tags.some(tag => tag.toLowerCase().includes(lower)) ||
    entry.content.toLowerCase().includes(lower)
  );
}
