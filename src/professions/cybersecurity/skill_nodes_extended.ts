import type { SkillNode } from '@/core/skill_state';
import { APPLICATION_TASKS } from './tasks/applications';
import { INTERVIEW_TASKS } from './tasks/interviews';
import { OFFER_TASKS } from './tasks/offer';

// ─── CHAPTER 3: APPLICATIONS (7 nodes) ──────────────────────────────
export const APPLICATION_SKILL_NODES: SkillNode[] = [
  {
    id: 'application-tracking',
    skill: 'Application Tracking',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have a spreadsheet tracking 20+ security job applications',
      'Each entry includes: company, clearance requirement, date, status',
      'You follow up on 50% of applications within 1 week'
    ],
    advice: {
      awareness: 'Applying blindly to security roles is inefficient. Tracking reveals what works.',
      understanding: 'A tracker shows patterns: which companies respond, which roles fit, which channels work.',
      application: 'Create a tracker with columns: Company, Role, Clearance, Date Applied, Status, Follow-up, Notes.',
      readiness: 'You can see your pipeline: applied, phone screen, technical interview, polygraph, offer.',
      execution: 'Set weekly review. Archive rejected roles. Prioritize cleared positions.',
      confidence: 'A tracked pipeline turns chaos into a security job search strategy.'
    },
    tasks: APPLICATION_TASKS['application-tracking'] || [],
  },
  {
    id: 'portfolio-home-lab',
    skill: 'Home Lab Portfolio',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'Your home lab is documented with network diagram and tool list',
      'You have 3+ attack scenarios with detection and response writeups',
      'Lab includes both offensive (Kali) and defensive (SIEM) components'
    ],
    advice: {
      awareness: 'A security portfolio without a home lab looks theoretical. Show hands-on experience.',
      understanding: 'Recruiters evaluate: can you build, attack, and defend a network? Not just watch videos.',
      application: 'Document one complete attack chain: recon → exploit → persistence → detection → containment.',
      readiness: 'You can walk through your lab in 5 minutes with technical depth.',
      execution: 'Link to GitHub with network diagram, configs, and attack writeups.',
      confidence: 'A home lab portfolio answers technical questions before the interview starts.'
    },
    tasks: APPLICATION_TASKS['portfolio-home-lab'] || [],
  },
  {
    id: 'ctf-scores',
    skill: 'CTF Scores & Rankings',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have profiles on TryHackMe, HackTheBox, or VulnHub with 10+ completed boxes',
      'Your rank is visible and improving',
      'You have writeups for 5+ challenges linked in your application'
    ],
    advice: {
      awareness: 'CTF scores are objective proof of your offensive and defensive skills.',
      understanding: 'Recruiters value CTF participation: it shows persistence, curiosity, and hands-on ability.',
      application: 'Complete 3 boxes this week. Document your methodology.',
      readiness: 'You have 10+ boxes completed with public writeups.',
      execution: 'Include CTF profile links in your resume and cover letter.',
      confidence: 'CTF scores turn "interested in security" into "proven security skills."'
    },
    tasks: APPLICATION_TASKS['ctf-scores'] || [],
  },
  {
    id: 'clearance-prep',
    skill: 'Clearance Preparation',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You know the difference between Secret, Top Secret, and TS/SCI',
      'You have reviewed the SF-86 form and gathered required information',
      'You understand the adjudication criteria: foreign contacts, finances, criminal history'
    ],
    advice: {
      awareness: 'Many security roles require clearance. Without it, you are excluded from 40% of the market.',
      understanding: 'Clearance process: application → investigation → adjudication. Takes 3-18 months.',
      application: 'Review SF-86. Gather 10 years of residence, employment, and foreign travel history.',
      readiness: 'You can complete SF-86 without surprises or omissions.',
      execution: 'Be honest. Disclose everything. Investigators value transparency over perfection.',
      confidence: 'Clearance eligibility opens doors to defense contractors and government agencies.'
    },
    tasks: APPLICATION_TASKS['clearance-prep'] || [],
  },
  {
    id: 'company-research',
    skill: 'Company Research',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You know the security stack of 5 target companies',
      'You can name their key threats and how security supports mission',
      'You have identified 2 security team members on LinkedIn'
    ],
    advice: {
      awareness: 'Generic applications get ignored. Tailored ones show genuine interest in security.',
      understanding: 'Research reveals: tools they use, threats they face, compliance requirements.',
      application: 'Pick 3 companies. Find their security blog, breach history, and team structure.',
      readiness: 'You can explain why your skills match their specific security challenges.',
      execution: 'Reference company-specific threats in your cover letter.',
      confidence: 'Research turns "I need a job" into "I can defend your cloud infrastructure."'
    },
    tasks: APPLICATION_TASKS['company-research'] || [],
  },
  {
    id: 'application-tailoring',
    skill: 'Application Tailoring',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'Each cover letter references a specific company threat or compliance requirement',
      'Your resume bullets are reordered to match the security job description',
      'You mention relevant clearance level and certifications upfront'
    ],
    advice: {
      awareness: 'One resume for all security roles is a myth. Tailoring increases response rates 3x.',
      understanding: 'Security recruiters scan for: clearance, certifications, SIEM experience, incident response.',
      application: 'Take one security JD. Highlight required tools. Mirror them in your resume.',
      readiness: 'You can tailor an application in under 15 minutes per role.',
      execution: 'Use a master resume. Copy-paste relevant bullets. Adjust clearance and certs.',
      confidence: 'Tailored applications feel personal. Personal gets security interviews.'
    },
    tasks: APPLICATION_TASKS['application-tailoring'] || [],
  },
  {
    id: 'referral-strategy',
    skill: 'Referral Strategy',
    domain: 'Applications',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have identified 10+ potential referrers at cleared defense contractors',
      'You have a warm introduction request template for security professionals',
      'You follow up with referrers after application submission'
    ],
    advice: {
      awareness: 'Referrals bypass the ATS. In cleared roles, they are often required.',
      understanding: 'A referral from a cleared employee carries more weight than a recruiter connection.',
      application: 'Find 3 cleared professionals at your target company. Request an informational interview.',
      readiness: 'You have a 30-second ask: "I applied for X. Would you be open to referring me?"',
      execution: 'Build the relationship first. Ask for advice on clearance or tools. Then ask for referral.',
      confidence: 'Referrals turn cold applications into warm conversations at cleared facilities.'
    },
    tasks: APPLICATION_TASKS['referral-strategy'] || [],
  },
];

// ─── CHAPTER 4: INTERVIEWS (10 nodes) ─────────────────────────────
export const INTERVIEW_SKILL_NODES: SkillNode[] = [
  {
    id: 'interview-prep',
    skill: 'Interview Prep',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have a 30-second elevator pitch for cybersecurity roles',
      'You can explain your home lab and CTF experience in 2 minutes',
      'You have practiced with a security professional at least 3 times'
    ],
    advice: {
      awareness: 'Walking into a security interview unprepared is like running nmap without understanding the network.',
      understanding: 'Security interviews test: networking, Linux, SIEM, incident response, and security mindset.',
      application: 'Record yourself answering "Tell me about yourself" and "Walk me through an incident."',
      readiness: 'You can pitch, explain your lab, and whiteboard a network diagram without notes.',
      execution: 'Schedule mock interviews with security professionals. Get feedback on technical depth.',
      confidence: 'Preparation turns interview anxiety into interview confidence.'
    },
    tasks: INTERVIEW_TASKS['interview-prep'] || [],
  },
  {
    id: 'networking-deep-dive',
    skill: 'Networking Deep Dive',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You can explain TCP/IP, OSI model, and common protocols',
      'You understand subnetting, VLANs, and routing',
      'You can analyze a packet capture in Wireshark'
    ],
    advice: {
      awareness: 'Networking is the foundation of cybersecurity. Weak networking = weak security.',
      understanding: 'Interviewers test: can you read a packet capture? Identify anomalous traffic? Explain DNS hijacking?',
      application: 'Practice 10 networking questions. Set up a lab with Wireshark and tcpdump.',
      readiness: 'You can explain any OSI layer with a real-world attack example.',
      execution: 'Use Wireshark daily. Capture your own traffic. Identify protocols and anomalies.',
      confidence: 'Networking fluency proves you understand what you are defending.'
    },
    tasks: INTERVIEW_TASKS['networking-deep-dive'] || [],
  },
  {
    id: 'linux-administration',
    skill: 'Linux Administration',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You can navigate Linux filesystem, manage permissions, and use grep/awk/sed',
      'You understand systemd, cron, and log analysis',
      'You can harden a Linux server: iptables, SELinux, updates'
    ],
    advice: {
      awareness: 'Most security tools run on Linux. Weak Linux skills = weak security skills.',
      understanding: 'Interviewers test: can you find malware in logs? Harden a server? Analyze cron jobs?',
      application: 'Practice 20 Linux commands daily. Set up a hardened Linux VM.',
      readiness: 'You can perform any administrative task without GUI.',
      execution: 'Use Linux as your daily OS. Script repetitive tasks with Bash.',
      confidence: 'Linux fluency is non-negotiable for blue team and red team roles.'
    },
    tasks: INTERVIEW_TASKS['linux-administration'] || [],
  },
  {
    id: 'python-security',
    skill: 'Python for Security',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You can write scripts for log parsing, automation, and API interaction',
      'You understand libraries: requests, scapy, impacket, pwntools',
      'You have used Python in a CTF or home lab scenario'
    ],
    advice: {
      awareness: 'Python is the lingua franca of security. Scripting separates analysts from operators.',
      understanding: 'Interviewers test: can you automate a task? Parse logs? Write a simple exploit?',
      application: 'Write 5 scripts: port scanner, log parser, hash cracker, API client, automation tool.',
      readiness: 'You can write a script from scratch in under 15 minutes.',
      execution: 'Use Python for every repetitive task. Build a personal toolkit.',
      confidence: 'Python skills open doors to automation, threat hunting, and red team roles.'
    },
    tasks: INTERVIEW_TASKS['python-security'] || [],
  },
  {
    id: 'siem-analysis',
    skill: 'SIEM Analysis',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You can write SPL (Splunk) or KQL (Sentinel) queries',
      'You understand correlation rules, alerts, and dashboards',
      'You can tune false positives and create detection logic'
    ],
    advice: {
      awareness: 'SIEM is the heart of SOC operations. Weak SIEM skills = weak SOC analyst.',
      understanding: 'Interviewers test: can you write a detection rule? Tune an alert? Investigate an event?',
      application: 'Build a Splunk or ELK instance. Ingest logs. Create alerts. Tune false positives.',
      readiness: 'You can write a complex query and explain the detection logic.',
      execution: 'Practice daily: write queries, create dashboards, document playbooks.',
      confidence: 'SIEM fluency proves you can detect and respond to real threats.'
    },
    tasks: INTERVIEW_TASKS['siem-analysis'] || [],
  },
  {
    id: 'incident-response-scenario',
    skill: 'Incident Response Scenario',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You can walk through a full incident: detection, containment, eradication, recovery',
      'You understand chain of custody, evidence handling, and reporting',
      'You have practiced tabletop exercises'
    ],
    advice: {
      awareness: 'Incident response scenarios are the ultimate security interview test.',
      understanding: 'Interviewers evaluate: speed of decision, technical depth, communication, and calm under pressure.',
      application: 'Practice 3 scenarios: ransomware, insider threat, APT compromise.',
      readiness: 'You can lead an IR scenario without notes, from alert to lessons learned.',
      execution: 'Use NIST SP 800-61. Document every decision. Communicate with stakeholders.',
      confidence: 'IR scenario fluency proves you can protect assets when it matters most.'
    },
    tasks: INTERVIEW_TASKS['incident-response-scenario'] || [],
  },
  {
    id: 'threat-hunting-basics',
    skill: 'Threat Hunting Basics',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You understand the difference between IOCs and TTPs',
      'You can use MITRE ATT&CK to map adversary behavior',
      'You have performed hypothesis-driven hunts in your lab'
    ],
    advice: {
      awareness: 'Threat hunting is proactive defense. It separates analysts from hunters.',
      understanding: 'Interviewers test: can you form a hypothesis? Search for evidence? Validate or disprove?',
      application: 'Pick a MITRE technique. Form a hypothesis. Hunt in your lab. Document findings.',
      readiness: 'You can explain the hunting loop: hypothesis → data collection → analysis → validation.',
      execution: 'Use Sigma rules, YARA, and behavioral analytics. Document false positives.',
      confidence: 'Threat hunting skills elevate you from alert responder to proactive defender.'
    },
    tasks: INTERVIEW_TASKS['threat-hunting-basics'] || [],
  },
  {
    id: 'on-site-prep',
    skill: 'On-Site Prep',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You know the interview loop: HR, technical, culture, polygraph (if cleared)',
      'You have questions ready for each interviewer',
      'You have researched the company security posture and recent incidents'
    ],
    advice: {
      awareness: 'Security on-sites are marathons. Polygraph and technical rounds drain energy.',
      understanding: 'Each round tests different things: fit, depth, breadth, culture, and stress response.',
      application: 'Prepare for polygraph: be honest, consistent, and calm. Practice technical whiteboarding.',
      readiness: 'You can adapt your pitch to HR, SOC manager, and CISO audiences.',
      execution: 'Bring a notebook. Take notes. Reference earlier conversations in later rounds.',
      confidence: 'A well-prepared on-site feels like a series of conversations, not interrogations.'
    },
    tasks: INTERVIEW_TASKS['on-site-prep'] || [],
  },
  {
    id: 'red-team-blue-team',
    skill: 'Red Team vs Blue Team',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You can explain the difference between red team, blue team, and purple team',
      'You have experience in at least one: offensive or defensive',
      'You understand the adversary mindset and defender constraints'
    ],
    advice: {
      awareness: 'Security roles are divided: offensive (red) vs defensive (blue). Know which you fit.',
      understanding: 'Interviewers test: do you understand both sides? Can you think like an attacker?',
      application: 'Practice red team: attack a vulnerable machine. Practice blue team: detect and respond.',
      readiness: 'You can articulate why you chose red or blue, and how you collaborate with the other.',
      execution: 'If red team: demonstrate exploit development. If blue team: demonstrate detection engineering.',
      confidence: 'Understanding both sides makes you a purple team candidate — rare and valuable.'
    },
    tasks: INTERVIEW_TASKS['red-team-blue-team'] || [],
  },
  {
    id: 'interview-followup',
    skill: 'Interview Follow-Up',
    domain: 'Interviews',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You send a thank-you email within 24 hours to every interviewer',
      'Your email references a specific technical discussion from the interview',
      'You reiterate your clearance status and interest'
    ],
    advice: {
      awareness: 'A thoughtful follow-up can tip a close decision in your favor.',
      understanding: 'Follow-ups show professionalism, enthusiasm, and attention to detail.',
      application: 'Draft a template thank-you email. Personalize for each interviewer.',
      readiness: 'You send follow-ups within 4 hours of every interview.',
      execution: 'Reference a specific topic: "I enjoyed discussing the SIEM migration..." Reaffirm interest.',
      confidence: 'Follow-ups keep you top of mind while the hiring committee deliberates.'
    },
    tasks: INTERVIEW_TASKS['interview-followup'] || [],
  },
];

// ─── CHAPTER 5: OFFER PREPARATION (3 nodes) ─────────────────────────
export const OFFER_PREPARATION_SKILL_NODES: SkillNode[] = [
  {
    id: 'certification-prep',
    skill: 'Certification Prep',
    domain: 'Offer Preparation',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have identified 2-3 relevant certifications: Security+, CEH, CISSP, OSCP',
      'You have a study plan with weekly milestones',
      'You have scheduled the exam date and paid the fee'
    ],
    advice: {
      awareness: 'Certifications are often required for security roles. They gate interviews.',
      understanding: 'Security+: entry-level. CEH: offensive. CISSP: management. OSCP: hands-on offensive.',
      application: 'Pick one certification. Create a 4-week schedule. Schedule the exam.',
      readiness: 'You can pass a practice exam with 80% score.',
      execution: 'Study 1 hour daily. Use Boson practice exams for Security+. HackTheBox for OSCP.',
      confidence: 'A certification in progress signals commitment to employers.'
    },
    tasks: OFFER_TASKS['certification-prep'] || [],
  },
  {
    id: 'clearance-process',
    skill: 'Clearance Process',
    domain: 'Offer Preparation',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You understand the SF-86 form and have gathered 10 years of history',
      'You know the adjudication criteria and potential issues',
      'You have consulted with a security clearance attorney if needed'
    ],
    advice: {
      awareness: 'Clearance can take 3-18 months. Start early. Be honest. Disclose everything.',
      understanding: 'Adjudicators evaluate: foreign influence, financial responsibility, criminal conduct, personal conduct.',
      application: 'Complete SF-86 draft. Review with a cleared friend or attorney.',
      readiness: 'You can submit SF-86 without surprises or omissions.',
      execution: 'Be transparent. Investigators value honesty over perfection. Foreign contacts are not disqualifying.',
      confidence: 'Clearance eligibility opens doors to defense, intelligence, and critical infrastructure roles.'
    },
    tasks: OFFER_TASKS['clearance-process'] || [],
  },
  {
    id: 'resignation-letter',
    skill: 'Resignation Letter',
    domain: 'Offer Preparation',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have a draft resignation letter ready',
      'It is professional, concise, and expresses gratitude',
      'You have a transition plan for your current security responsibilities'
    ],
    advice: {
      awareness: 'A graceful exit preserves security clearances and references. Burning bridges is costly.',
      understanding: 'Resignation letters are legal documents. Keep them simple, positive, and factual.',
      application: 'Draft your letter. Keep it under 150 words. No complaints, no demands.',
      readiness: 'You can submit your resignation calmly, professionally, and without drama.',
      execution: 'Give standard notice. Offer to transfer knowledge. Document your processes.',
      confidence: 'A professional exit leaves doors open for future cleared opportunities.'
    },
    tasks: OFFER_TASKS['resignation-letter'] || [],
  },
];

// ─── CHAPTER 6: OFFER (6 nodes) ─────────────────────────────────────
export const OFFER_SKILL_NODES: SkillNode[] = [
  {
    id: 'offer-evaluation',
    skill: 'Offer Evaluation',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have a spreadsheet comparing all offers: base, bonus, clearance level, benefits',
      'You weighted factors: career growth, clearance sponsorship, team, culture',
      'You discussed the offer with a cleared mentor or advisor'
    ],
    advice: {
      awareness: 'The highest base salary is not always the best security offer. Evaluate holistically.',
      understanding: 'Consider: base, bonus, clearance sponsorship, training budget, tool access, mission impact.',
      application: 'Create a weighted scorecard. Rank each factor 1-5. Multiply by importance.',
      readiness: 'You can defend your top choice with data, not just gut feeling.',
      execution: 'Sleep on it. Discuss with family. Consider the 5-year trajectory, not just today.',
      confidence: 'A thorough evaluation ensures you accept the right cleared role.'
    },
    tasks: OFFER_TASKS['offer-evaluation'] || [],
  },
  {
    id: 'salary-negotiation',
    skill: 'Salary Negotiation',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have a target range, a walk-away number, and a BATNA',
      'You practiced negotiation scripts with a friend',
      'You know when to negotiate base vs bonus vs clearance sponsorship'
    ],
    advice: {
      awareness: 'Most security offers have 10-20% flexibility. Not asking leaves money on the table.',
      understanding: 'Negotiate the total package: base, bonus, training budget, conference attendance, tool licenses.',
      application: 'Write your ask: "Based on my research, I was hoping for $X." Practice 10 times.',
      readiness: 'You can make your ask confidently, justify it with data, and handle pushback.',
      execution: 'Always negotiate in writing. Give a range, not a number. Anchor high.',
      confidence: 'A successful negotiation can add $10K-$30K to your first-year compensation.'
    },
    tasks: OFFER_TASKS['salary-negotiation'] || [],
  },
  {
    id: 'decision-framework',
    skill: 'Decision Framework',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have a structured decision matrix for comparing cleared offers',
      'You weighted long-term growth over short-term compensation',
      'You have a "no regrets" criterion for accepting or declining'
    ],
    advice: {
      awareness: 'Decision paralysis costs time and momentum. A framework simplifies complex choices.',
      understanding: 'Use a weighted matrix: score each offer on factors that matter to you.',
      application: 'List 7 factors. Weight them. Score each offer. Multiply and sum.',
      readiness: 'Your top choice is clear and defensible to yourself and others.',
      execution: 'Set a deadline. Gather input. Decide. Commit. Move on.',
      confidence: 'A framework turns emotional decisions into rational ones.'
    },
    tasks: OFFER_TASKS['decision-framework'] || [],
  },
  {
    id: 'offer-acceptance',
    skill: 'Offer Acceptance',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have accepted the offer in writing with all terms confirmed',
      'You have a start date and onboarding schedule',
      'You have notified other companies that you are off the market'
    ],
    advice: {
      awareness: 'A verbal acceptance is not binding. Get it in writing before celebrating.',
      understanding: 'Written confirmation protects both sides: role, start date, salary, clearance sponsorship, benefits.',
      application: 'Review offer letter carefully. Ask for clarification on ambiguous terms.',
      readiness: 'You have signed and returned the offer letter. It is real.',
      execution: 'Confirm start date. Ask about clearance initiation. Prepare your first 30-60-90 day plan.',
      confidence: 'A signed offer is the culmination of your security journey. Celebrate, then prepare to excel.'
    },
    tasks: OFFER_TASKS['offer-acceptance'] || [],
  },
  {
    id: 'toolkit-setup',
    skill: 'Toolkit Setup',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have installed the company security stack: SIEM client, EDR, vulnerability scanner',
      'You have access to key dashboards and threat intel feeds',
      'You have bookmarked internal documentation and playbooks'
    ],
    advice: {
      awareness: 'Day 1 is too late to set up tools. Prepare your environment before you start.',
      understanding: 'A smooth setup impresses your SOC manager and lets you contribute faster.',
      application: 'Install required tools. Set up VMs. Configure VPN. Test SIEM access.',
      readiness: 'You can run a simple query and investigate an alert on day 1.',
      execution: 'Ask for tool list before start date. Set up locally. Practice with public datasets.',
      confidence: 'A prepared toolkit turns a nervous first day into a confident first week.'
    },
    tasks: OFFER_TASKS['toolkit-setup'] || [],
  },
  {
    id: 'start-transition',
    skill: 'Start Transition',
    domain: 'Offer',
    state: 'locked',
    nextState: 'awareness',
    signals: [
      'You have a 30-60-90 day plan for your new security role',
      'You have identified key stakeholders: SOC manager, threat intel team, IR lead',
      'You have set personal goals for the first quarter: certifications, hunts, incidents'
    ],
    advice: {
      awareness: 'The first 90 days define your security trajectory. A plan turns anxiety into momentum.',
      understanding: 'Managers evaluate new hires on: learning speed, early wins, and cultural fit.',
      application: 'Write a 30-60-90 day plan. Share it with your manager on day 1.',
      readiness: 'You know your first project, your key stakeholders, and your success metrics.',
      execution: 'Listen more than speak in week 1. Deliver a small win in week 2: tune one alert, close one ticket.',
      confidence: 'A strong start builds credibility that compounds over your entire security tenure.'
    },
    tasks: OFFER_TASKS['start-transition'] || [],
  },
];