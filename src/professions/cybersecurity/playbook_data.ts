import type { PlaybookEntry } from '@/core/playbook/playbook_types';

// Playbook content for the Cybersecurity profession.
//
// BUGFIX (2026-07-13): the previous playbook lived at
// `professions/cybersecurity/playbook/index.ts`, imported a type
// (`@/core/playbook/playbook_model`) that doesn't exist anywhere in the
// codebase (broke `npx tsc --noEmit`), used a completely different entry
// shape (`category: 'technical'`, `content: string[]`) than the one
// `PlaybookScreen` actually reads (`PlaybookEntry` from `playbook_types.ts`,
// with `overview` / `guides` / `templates` / `examples` / `checklist`), and
// was never imported into `core/playbook/playbook_data.ts`'s `PLAYBOOK`
// array — so Cybersecurity users saw an empty Playbook in every one of the
// 8 fixed category tabs (resume/linkedin/applications/interviews/offer/
// communication/body_language/confidence), regardless of profession.
//
// This file replaces it: same PlaybookEntry shape used by
// software_engineer and data_analyst, so it renders correctly, and at
// least one entry per category tab so nothing looks empty. Where useful,
// content from the old (unwired) file is preserved and reshaped — Linux
// forensics commands, SIEM queries, the IR lifecycle, and MITRE ATT&CK are
// folded into the interview-prep entries below instead of being lost.
export const CYBERSECURITY_PLAYBOOK: PlaybookEntry[] = [
  {
    id: 'resume/cybersecurity-summary-formulas',
    title: 'Resume Summary Formulas',
    category: 'resume',
    professionId: 'cybersecurity',
    overview:
      'A cybersecurity resume summary should signal your domain (offensive/defensive/GRC), your tool fluency, and — unlike most tech resumes — concrete proof you can be trusted with access: certs, a home lab, or CTF results.',
    guides: [
      'State your target domain clearly: SOC Analyst, Pentester, GRC, Incident Response',
      'Lead with the certification or hands-on proof you have (Security+, OSCP, CTF rank, home lab)',
      'Name your core tools (SIEM platform, Nmap/Burp, EDR) so keyword search finds you',
      'Include one measurable outcome — detections written, incidents handled, vulnerabilities found',
      'Mirror exact keywords from the job description — many security postings are ATS-screened for cert names',
      'Keep it to 2-3 lines; save the depth for your home-lab and incident-response entries below',
    ],
    templates: [
      'SOC Analyst (Security+, currently studying for CySA+) with hands-on home-lab experience in SIEM alert triage and Linux log forensics. Built a detection lab covering brute-force and lateral-movement scenarios using Splunk and Sysmon.',
      'Aspiring Penetration Tester transitioning from IT support. Completed 40+ HackTheBox/TryHackMe machines, ranked top 5% on TryHackMe. Comfortable with Nmap, Burp Suite, and basic Metasploit workflows.',
      'Entry-level GRC / Security Analyst with coursework in NIST CSF and ISO 27001. Conducted a mock risk assessment for a fictional SMB as a capstone project, mapping 15 controls to real gaps.',
    ],
    examples: [
      'Security+ certified analyst with a home SOC lab (pfSense, Security Onion, Sysmon) generating and triaging simulated attacks. Wrote 6 detection rules for common MITRE ATT&CK techniques. Seeking Tier 1 SOC role.',
      'Cybersecurity graduate with CTF experience (HackTheBox top 10%) and a documented home lab demonstrating Active Directory attack paths and remediation. Seeking junior penetration testing role.',
    ],
    checklist: [
      'Summary states a specific target domain, not just "cybersecurity"',
      'Names at least one cert, CTF result, or home-lab project as proof',
      'Mentions concrete tools by name',
      'Includes one measurable detail (detections, machines solved, controls mapped)',
      'Under 3 lines',
    ],
    tags: ['summary', 'headline', 'positioning', 'certifications'],
  },
  {
    id: 'resume/home-lab-showcase',
    title: 'Turning a Home Lab Into Resume Evidence',
    category: 'resume',
    professionId: 'cybersecurity',
    overview:
      'Without prior security employment, a documented home lab is the strongest evidence you can offer that you can actually do the work. Recruiters and hiring managers in security consistently rate a well-written home-lab bullet above generic coursework.',
    guides: [
      'Describe the lab setup briefly — tools, virtualization platform, network topology',
      'State what attack or defense scenario you built or reproduced',
      'Explain what you detected, exploited, or remediated — the outcome, not just the setup',
      'Link a write-up (blog or GitHub) if you have one — this turns a bullet into verifiable proof',
      'Update the lab section every few months as you learn new techniques; stale labs read as one-off tutorials',
    ],
    templates: [
      'Built a home SOC lab (Security Onion + Sysmon + pfSense) to detect brute-force and lateral-movement techniques from the MITRE ATT&CK framework; wrote 4 custom detection rules and documented false-positive tuning.',
      'Deployed a vulnerable Active Directory environment (GOAD) to practice Kerberoasting and pass-the-hash attacks; documented full attack chain and corresponding defensive controls in a write-up.',
    ],
    examples: [
      'Weak: "Set up a home lab to learn cybersecurity."\nStrong: "Built a segmented home lab simulating a small business network; used it to practice detecting and containing a simulated ransomware execution, reducing my own mean-time-to-detect from untracked to under 4 minutes."',
    ],
    checklist: [
      'Lab description names the actual tools/platforms used',
      'States a specific scenario, not just "practiced skills"',
      'Includes an outcome or metric, even a self-measured one',
      'Write-up or repo link included if available',
      'Lab content is recent (updated within the last few months)',
    ],
    tags: ['home-lab', 'resume', 'portfolio', 'proof-of-skill'],
  },
  {
    id: 'linkedin/security-headline-and-ctf',
    title: 'LinkedIn Headline & CTF Showcase',
    category: 'linkedin',
    professionId: 'cybersecurity',
    overview:
      'Security recruiters search LinkedIn for certification names and specific tools as often as job titles. Your headline and featured section should make your domain and proof-of-skill searchable in five seconds.',
    guides: [
      'Include your target role and 2-3 tools/certs in the headline — not just "Cybersecurity Enthusiast"',
      'Use the Featured section to pin your best CTF write-up, home-lab post, or certification badge',
      'Post short technical breakdowns of CTF challenges you solved — this builds a visible track record',
      'Join and stay active in 2-3 security-focused LinkedIn/Discord communities relevant to your target domain',
      'Add your certifications directly to the Licenses & Certifications section, not just the headline',
    ],
    templates: [
      'Aspiring SOC Analyst | Security+ | SIEM & Log Analysis | Home Lab Builder',
      'Junior Penetration Tester | OSCP in progress | HackTheBox Top 5% | Web App Security',
      'GRC / Security Analyst | NIST CSF | ISO 27001 | Risk Assessment',
    ],
    examples: [
      'Before: "Cybersecurity student passionate about security" → low recruiter search visibility.\nAfter: "SOC Analyst (Security+) | Splunk | Sysmon | Detection Engineering" → appears in recruiter searches for those exact terms.',
    ],
    checklist: [
      'Headline includes target role and named tools/certs, not generic buzzwords',
      'At least one CTF write-up or lab project pinned in Featured',
      'Certifications added to the Licenses & Certifications section',
      'Active in at least one relevant security community',
      'Headline under 120 characters',
    ],
    tags: ['linkedin', 'headline', 'ctf', 'certifications', 'visibility'],
  },
  {
    id: 'applications/clearance-and-portfolio-prep',
    title: 'Applying With a Clearance Requirement',
    category: 'applications',
    professionId: 'cybersecurity',
    overview:
      'Many cybersecurity roles — especially government and defense contractor postings — require or prefer an active security clearance. Understanding the process and being upfront about your status avoids wasted applications and sets correct expectations early.',
    guides: [
      'Learn the clearance levels: Secret, Top Secret (TS), TS/SCI, TS/SCI with polygraph',
      'Understand the process order: SF-86 form → background investigation → adjudication → issuance',
      'Know rough timelines: Secret ~3-6 months, TS ~6-18 months, TS/SCI ~12-24 months — plan applications accordingly',
      'If you don\\u2019t hold a clearance, target "clearance sponsorship available" or public-sector-adjacent roles first',
      'Be transparent on applications about clearance status — misrepresenting it wastes everyone\\u2019s time and can disqualify you permanently',
      'While waiting on clearance processing, keep building portfolio evidence (home lab, CTFs) — it strengthens the eventual interview',
    ],
    templates: [
      'Application note: "I do not currently hold a security clearance but am eligible and willing to undergo the process. I understand this typically requires several months and am prepared for that timeline."',
    ],
    examples: [
      'Candidate applied broadly to cleared roles without a clearance and got auto-rejected by ATS filters for "active TS required." Pivoted to "clearance sponsorship available" postings and public-sector-adjacent private companies instead — got interviews within weeks.',
    ],
    checklist: [
      'Correctly identified the clearance level required for target roles',
      'Understand SF-86 disclosure requirements (foreign contacts, financial history, etc.)',
      'Have a realistic timeline expectation for the process',
      'Filtered applications by "sponsorship available" if starting without a clearance',
      'Prepared an honest, concise note on clearance status for applications that ask',
    ],
    tags: ['clearance', 'applications', 'government', 'timeline'],
  },
  {
    id: 'applications/ctf-and-portfolio-tracking',
    title: 'Tracking CTF Scores & Portfolio Applications',
    category: 'applications',
    professionId: 'cybersecurity',
    overview:
      'In security, your CTF ranking and home-lab portfolio function like a work-sample test recruiters can verify. Track and present them the same way you would track job applications — deliberately, not as an afterthought.',
    guides: [
      'Keep a running log of platforms used (TryHackMe, HackTheBox, PentesterLab), rank, and machines solved',
      'Write a short public write-up for your best 3-5 solved machines or challenges',
      'Link your CTF profile and write-up repo directly in every application where a portfolio field exists',
      'Tailor which write-ups you highlight to the role — offensive roles want exploitation write-ups, SOC roles want detection/analysis write-ups',
      'Track applications the same way: company, role, date applied, status, follow-up date',
    ],
    templates: [
      'Portfolio line for applications: "CTF profile: HackTheBox (Top 5%, 45 machines) — github.com/[you]/ctf-writeups"',
      'Application tracker columns: Company | Role | Date Applied | Portfolio Version Sent | Status | Follow-up Date',
    ],
    examples: [
      'Candidate tailored which 3 write-ups to link per application (offensive write-ups for pentest roles, detection write-ups for SOC roles) instead of sending the same generic profile link everywhere — got noticeably higher response rate.',
    ],
    checklist: [
      'CTF platform, rank, and machine count documented and current',
      'At least 3 solved-challenge write-ups published',
      'Portfolio link included in every application with a relevant field',
      'Write-ups selected match the target role\\u2019s domain (offense vs. defense)',
      'Application tracker kept up to date with follow-up dates',
    ],
    tags: ['ctf', 'portfolio', 'applications', 'tracking'],
  },
  {
    id: 'interview/technical-fundamentals-siem-linux',
    title: 'Technical Interview Guide: Linux, Networking & SIEM',
    category: 'interviews',
    professionId: 'cybersecurity',
    overview:
      'Entry-level security interviews lean heavily on fundamentals: can you navigate Linux under pressure, explain networking basics, and read SIEM output? Interviewers are checking for practical fluency, not memorized definitions.',
    guides: [
      'Practice explaining what a command does before you type it — narrating builds interviewer confidence',
      'Know the core forensics commands cold: process/connection listing, log searching, persistence checks',
      'Be ready to write or read a basic SIEM detection query, even a simplified pseudo-query',
      'Explain the OSI model in terms of where common security tools operate (firewall = layer 3/4, WAF = layer 7)',
      'Walk through the incident response lifecycle by name and in order — interviewers often ask this directly',
    ],
    templates: [
      'Linux forensics quick reference:\\nps aux | grep <process> — find a running process\\nnetstat -tulpn / ss -tulpn — list listening ports\\nlsof -i :<port> — see what\\u2019s using a port\\nfind / -perm -4000 -type f 2>/dev/null — find SUID binaries\\ngrep "Failed password" /var/log/auth.log — failed login attempts\\nlast -f /var/log/wtmp — login history\\ncrontab -l — scheduled jobs (common persistence spot)',
      'SIEM detection logic (pseudo-query, adapt to the platform you\\u2019re asked about):\\nBrute force: count failed-logon events (EventCode 4625) grouped by source IP, alert above a threshold\\nBeaconing: count distinct destination IPs per source IP over time; a low, steady count over long windows suggests C2 beaconing\\nData exfiltration: sum outbound bytes per source IP; alert on unusual spikes',
      'Incident response lifecycle, in order: Preparation → Detection → Containment (short-term isolate, then long-term segment) → Eradication → Recovery → Lessons Learned. Always name all six when asked "walk me through your IR process."',
    ],
    examples: [
      'Question: "How would you find a suspicious process on Linux?"\\nStrong answer: "I\\u2019d start with `ps aux` to see running processes, then `netstat -tulpn` or `ss -tulpn` for anything listening unexpectedly, cross-reference with `lsof` on suspicious ports, and check `/var/log/auth.log` for related failed logins."',
      'Question: "What\\u2019s the difference between IDS and IPS?"\\nStrong answer: "An IDS monitors and alerts on suspicious traffic; an IPS sits inline and can actively block it. IPS trades a small latency/false-positive risk for the ability to stop an attack in real time."',
    ],
    checklist: [
      'Can name and explain 5+ Linux forensics commands from memory',
      'Can describe at least 2 detection logic patterns (brute force, beaconing, exfiltration) in plain language',
      'Can recite the 6-stage IR lifecycle in order',
      'Practiced narrating a command\\u2019s purpose before running it',
      'Comfortable mapping common tools to OSI layers',
    ],
    tags: ['interview', 'technical', 'linux', 'siem', 'incident-response', 'fundamentals'],
  },
  {
    id: 'interview/mitre-attack-scenario-prep',
    title: 'MITRE ATT&CK & Scenario-Based Interview Prep',
    category: 'interviews',
    professionId: 'cybersecurity',
    overview:
      'Scenario questions ("walk me through how you\\u2019d investigate this alert") are where most candidates lose points — not from lack of knowledge, but from an unstructured answer. Framing your answer around MITRE ATT&CK tactics gives interviewers a structure they immediately recognize.',
    guides: [
      'Learn the ATT&CK tactic categories in order: Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Lateral Movement, Exfiltration',
      'For any scenario question, first state which stage of the attack chain you think you\\u2019re looking at',
      'Then describe what evidence you\\u2019d gather before concluding anything — avoid jumping straight to a verdict',
      'Reference specific technique IDs only if you\\u2019re confident in them; a correct tactic name matters more than a memorized ID',
      'Close scenario answers by naming the containment step you\\u2019d take next',
    ],
    templates: [
      'ATT&CK tactic quick map: Initial Access (phishing, exploiting public-facing apps) → Execution (scripting/command interpreters) → Persistence (scheduled tasks, registry run keys) → Privilege Escalation (valid account abuse, process injection) → Defense Evasion (log/indicator removal) → Credential Access (credential dumping, ticket theft) → Lateral Movement (remote services, admin shares) → Exfiltration (over C2 channel or web service).',
      'Scenario answer structure: "Based on [evidence], this looks like [tactic stage]. Before concluding, I\\u2019d check [specific log/artifact]. If confirmed, my first containment step would be [isolate host / disable account / block IP]."',
    ],
    examples: [
      'Question: "You see a spike in outbound traffic on port 443 to an unfamiliar IP. What do you do?"\\nStrong answer: "That pattern could suggest exfiltration or C2 beaconing. I\\u2019d check the process making the connection, look at DNS logs for the destination, and check if the volume is unusual for that host\\u2019s baseline. If it\\u2019s confirmed suspicious, I\\u2019d isolate the host from the network first, then investigate further."',
    ],
    checklist: [
      'Can name all 8 core ATT&CK tactic stages in order',
      'Structures scenario answers as: identify stage → gather evidence → propose containment',
      'Avoids jumping to a conclusion before mentioning what evidence supports it',
      'Comfortable saying "I\\u2019d need to check X before concluding" rather than guessing',
      'Practiced at least 3 scenario questions out loud',
    ],
    tags: ['interview', 'mitre', 'att&ck', 'scenario', 'incident-response'],
  },
  {
    id: 'interview/behavioral-security-mindset',
    title: 'Behavioral Interviews: Demonstrating a Security Mindset',
    category: 'interviews',
    professionId: 'cybersecurity',
    overview:
      'Security behavioral questions probe for judgment under ambiguity and integrity under pressure more than in most tech interviews — because the job routinely involves access to sensitive systems and high-stakes decisions made with incomplete information.',
    guides: [
      'Prepare a story that shows you escalating or reporting something rather than acting alone on a security concern',
      'Prepare a story about a mistake you caught (in your own work or a lab exercise) and how you responded',
      'Use STAR (Situation, Task, Action, Result) just like any behavioral answer — security interviewers still expect that structure',
      'Be ready to discuss ethics directly: how you\\u2019d handle finding a vulnerability, or being asked to do something outside scope',
      'Avoid implying you\\u2019ve ever accessed systems or data without authorization, even in a learning context — frame all hands-on experience as lab/CTF/authorized work',
    ],
    templates: [
      'S: While testing a lab environment for a CTF, I found what looked like a real, unrelated exposed service outside the scope of the challenge.\\nT: I needed to decide whether to investigate further or report it.\\nA: I stopped immediately, did not interact with the out-of-scope system, and reported the finding to the platform\\u2019s support team.\\nR: They confirmed and fixed a real misconfiguration; I received an acknowledgment for responsible disclosure.',
    ],
    examples: [
      'Weak: "I would just fix it myself since I know how."\\nStrong: "Even if I\\u2019m confident in the fix, I\\u2019d report it through the proper channel first — unauthorized changes, even well-intentioned ones, undermine trust and audit trails."',
    ],
    checklist: [
      'Prepared 1 story about reporting/escalating rather than acting unilaterally',
      'Prepared 1 story about catching or correcting a mistake',
      'All lab/practice stories are framed as authorized (CTF, home lab, coursework)',
      'Practiced a clear answer for "what would you do if asked to do something outside your authorization?"',
      'Stories follow STAR structure and stay under 2 minutes spoken',
    ],
    tags: ['interview', 'behavioral', 'ethics', 'star', 'security-mindset'],
  },
  {
    id: 'offer/certifications-and-clearance-timeline',
    title: 'Certifications & Clearance Timing Around an Offer',
    category: 'offer',
    professionId: 'cybersecurity',
    overview:
      'Cybersecurity offers often come with conditions unusual outside the field: a required certification within a set window, or an offer contingent on clearance adjudication. Understanding these conditions before accepting prevents surprises.',
    guides: [
      'Ask directly whether the offer is contingent on a certification, background check, or clearance outcome',
      'If a cert is required post-hire (e.g. Security+ for a DoD 8570-compliant role), ask about the deadline and whether the employer covers exam cost',
      'If clearance is in process, clarify what your role/pay looks like while waiting (some employers start you in a non-cleared role temporarily)',
      'Get any contingency and its consequences in writing, not just verbally',
      'Factor cert exam costs and study time into your decision if you\\u2019re paying out of pocket',
    ],
    templates: [
      'Clarifying question to ask before accepting: "Is this offer contingent on my Security+ certification or clearance outcome? If so, what is the timeline, and what happens if it takes longer than expected?"',
    ],
    examples: [
      'Candidate accepted an offer assuming clearance would clear in 2 months; it took 9. Because they had clarified in advance that they\\u2019d be placed in an interim non-cleared analyst role during that time, there was no financial gap.',
    ],
    checklist: [
      'Confirmed whether the offer is contingent on certification, clearance, or background check',
      'Understand what happens (pay, role) during any waiting period',
      'Got contingency terms in writing',
      'Clarified who pays for required certification exams',
      'Realistic about clearance timelines before accepting a start date',
    ],
    tags: ['offer', 'certifications', 'clearance', 'contingency'],
  },
  {
    id: 'offer/security-toolkit-and-transition',
    title: 'Setting Up Your Security Toolkit Before Day One',
    category: 'offer',
    professionId: 'cybersecurity',
    overview:
      'Unlike many entry-level tech roles, security roles often expect you to be productive with specific tooling (SIEM, EDR, ticketing) almost immediately. A short focused prep window between accepting and starting pays off in first-week confidence.',
    guides: [
      'Ask your new team what SIEM/EDR/ticketing tools they use so you can review documentation beforehand',
      'Refresh your home lab to mirror the general category of tools you\\u2019ll use (even if not the exact vendor)',
      'Review your target role\\u2019s common alert types (phishing, brute force, malware) one more time',
      'Prepare your resignation letter and give appropriate notice at your current job, if applicable',
      'Set expectations with yourself: the first 30-60 days are about learning the environment, not proving mastery',
    ],
    templates: [
      'Pre-start prep checklist: (1) review vendor docs for team\\u2019s SIEM platform, (2) refresh home-lab detection scenarios, (3) re-read MITRE ATT&CK tactic list, (4) confirm start date logistics and required equipment/VPN setup, (5) submit resignation with standard 2-week notice if applicable.',
    ],
    examples: [
      'New SOC analyst spent one weekend reviewing their new employer\\u2019s SIEM platform\\u2019s public documentation before day one — was able to follow along in onboarding training instead of learning the interface from scratch under time pressure.',
    ],
    checklist: [
      'Asked which specific tools the team uses day-to-day',
      'Reviewed public documentation for at least the SIEM/EDR platform named',
      'Refreshed home lab or notes on core alert types',
      'Resignation/notice handled professionally if coming from another role',
      'Realistic expectations set for a learning-focused first month',
    ],
    tags: ['offer', 'onboarding', 'toolkit', 'transition'],
  },
  {
    id: 'communication/security-jargon-for-non-security-interviewers',
    title: 'Explaining Security Concepts to Non-Security Interviewers',
    category: 'communication',
    professionId: 'cybersecurity',
    overview:
      'Some interviewers for security-adjacent roles (hiring managers, HR, cross-functional panels) won\\u2019t have deep technical background. Being able to explain what you do in plain language — without dumbing it down — is a distinct, learnable skill.',
    guides: [
      'Lead with the business impact before the technical detail: what risk does this reduce, not just what tool does it use',
      'Use one concrete analogy per concept, then offer to go deeper if they want (don\\u2019t force it)',
      'Avoid strings of acronyms in a row — spell out the first use of any acronym',
      'Check in mid-explanation: "Should I go more technical, or is this the right level?"',
      'Practice a 30-second and a 2-minute version of your elevator pitch for what you do',
    ],
    templates: [
      '30-second version: "I help find and fix weaknesses before attackers do — like a building inspector checking for unlocked doors, except for computer systems."',
      '2-minute version, when asked to expand: adds the specific method (e.g. "I monitor system logs for unusual login patterns, similar to a security guard reviewing camera footage, but for network traffic") and one concrete example outcome.',
    ],
    examples: [
      'Weak: "I do SIEM correlation and threat hunting using MITRE ATT&CK TTPs."\\nStrong (to a non-technical interviewer): "I look for patterns in system activity logs that suggest someone\\u2019s trying to break in, using a framework that catalogs known attacker behaviors, so I know what to look for."',
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
    id: 'body_language/soc-analyst-composure',
    title: 'Projecting Composure in High-Pressure Security Interviews',
    category: 'body_language',
    professionId: 'cybersecurity',
    overview:
      'Security interviews frequently include timed or high-pressure scenario questions designed to see how you behave under stress — because that\u2019s exactly what an incident looks like on the job. How you carry yourself while thinking matters as much as your final answer.',
    guides: [
      'When given a scenario, pause deliberately for 2-3 seconds before speaking — rushing signals panic, not urgency',
      'Keep your posture upright and hands visible even when thinking through a hard technical scenario',
      'If you don\\u2019t know an answer, say so calmly and pivot to what you would do to find out — don\\u2019t freeze or over-apologize',
      'For timed practical exercises (if given), narrate your process steadily rather than going silent while typing',
      'On video calls, keep your camera framing steady; don\\u2019t look away for long stretches when checking notes',
    ],
    templates: [
      'Composure script for a stumped moment: "I haven\\u2019t seen that exact scenario before. Here\\u2019s how I\\u2019d approach figuring it out: [state your investigation steps calmly]." Said steadily, this reads as competence, not failure.',
    ],
    examples: [
      'Candidate was given a live log excerpt and asked to spot the anomaly. Rather than going silent, they narrated: "I\\u2019m scanning for repeated failed logins first, then I\\u2019ll check for unusual process names." This calm narration was rated highly even though they took the full time allotted.',
    ],
    checklist: [
      'Practiced pausing 2-3 seconds before answering scenario questions',
      'Maintains upright, open posture during technical questions',
      'Has a calm scripted response for "I don\\u2019t know, but here\\u2019s how I\\u2019d find out"',
      'Practiced narrating thought process during any live/practical exercise',
      'Camera framing and eye contact stable during video interviews',
    ],
    tags: ['body_language', 'composure', 'pressure', 'interview'],
  },
  {
    id: 'confidence/imposter-syndrome-in-security',
    title: 'Managing Imposter Syndrome Entering Security',
    category: 'confidence',
    professionId: 'cybersecurity',
    overview:
      'Cybersecurity has an unusually visible, vocal expert community online, which makes newcomers feel behind by comparison. This is a mindset problem, not a skills gap — most working analysts started with far less than they now assume is "the baseline."',
    guides: [
      'Remind yourself that job postings list "nice to have" skills as if they\\u2019re required — you don\\u2019t need every listed tool to be a strong candidate',
      'Compare yourself to where you started, not to specialists years into their career on social media',
      'Keep a running list of concrete things you\\u2019ve done (labs, CTFs, certs) to counter the vague feeling of "not enough"',
      'Before interviews, review that concrete list instead of scrolling security social media, which tends to amplify comparison',
      'Reframe not knowing an answer as normal and expected at entry level, not as evidence you don\\u2019t belong',
    ],
    templates: [
      'Pre-interview reframe: "I don\\u2019t need to know everything a 10-year analyst knows. I need to show I can think clearly, learn fast, and act responsibly with access I\\u2019m given. That\\u2019s what this interview is actually testing."',
    ],
    examples: [
      'Candidate felt behind seeing advanced red-team content on social media, despite having a solid home lab and Security+ cert appropriate for the entry-level SOC roles they were applying to. Reviewing their own concrete accomplishment list before interviews reduced pre-interview anxiety significantly.',
    ],
    checklist: [
      'Keeps a written list of concrete accomplishments (labs, CTFs, certs) to review before interviews',
      'Avoids comparing entry-level readiness to senior practitioners\\u2019 public content right before interviews',
      'Has a reframe ready for "I don\\u2019t know" moments that treats them as normal, not disqualifying',
      'Targets roles matching current level rather than assuming senior-level knowledge is required',
      'Reviewed accomplishment list within 24 hours of each interview',
    ],
    tags: ['confidence', 'imposter-syndrome', 'mindset', 'entry-level'],
  },
];
