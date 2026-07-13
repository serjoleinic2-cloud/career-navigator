import type { TaskContent } from '@/core/task_content';

export const LINKEDIN_TASKS: Record<string, TaskContent[]> = {
  'headline-authority': [
    {
      id: 'cyber-hl-write-headline',
      title: 'Write Your Security Headline',
      objective: 'Create a keyword-rich LinkedIn headline that attracts security recruiters.',
      instructions: [
        'Search "SOC Analyst" or "Penetration Tester" on LinkedIn. Note top headline patterns.',
        'Draft: "[Role] | [Specialization] | [Certification] | [Clearance if applicable]"',
        'Keep under 120 characters.',
        'Remove emojis, "seeking", and "open to work".'
      ],
      completionCriteria: [
        'Headline contains specific role: SOC Analyst, Security Engineer, or Penetration Tester.',
        'At least one certification or clearance mentioned.',
        'Under 120 characters.'
      ],
      estimatedMinutes: 15,
      difficulty: 1,
      tips: [
        'Mirror the exact job title from your target postings.',
        'Include clearance if held: "TS/SCI eligible" or "Secret cleared".',
        'Update monthly to stay active in search results.'
      ],
      expectedOutcome: 'A headline that appears in recruiter searches for security roles.',
    },
  ],
  'about-section': [
    {
      id: 'cyber-as-write-about',
      title: 'Write Your Security About Section',
      objective: 'Create a compelling LinkedIn About section for cybersecurity roles.',
      instructions: [
        'Paragraph 1: Who you are and what you defend (2 sentences).',
        'Paragraph 2: One specific incident or discovery with metric (3 sentences).',
        'Paragraph 3: What you are looking for and clearance status (2 sentences).',
        'Keep total under 300 words.'
      ],
      completionCriteria: [
        'Three clear paragraphs.',
        'At least one security metric included.',
        'Ends with clearance status and call to action.'
      ],
      estimatedMinutes: 25,
      difficulty: 2,
      tips: [
        'Use first person: "I defend networks..." not "[Name] is a..."',
        'Include a specific incident: "I detected and contained a phishing campaign targeting 200 users."',
        'Mention target clearance or domain: "Seeking TS/SCI eligible roles in threat intelligence."'
      ],
      expectedOutcome: 'An About section that converts profile views into connection requests from CISOs.',
    },
  ],
  'network-connections': [
    {
      id: 'cyber-nc-send-requests',
      title: 'Send 5 Security Connection Requests',
      objective: 'Build your cybersecurity network with personalized connection requests.',
      instructions: [
        'Find 5 SOC managers, threat hunters, or security recruiters at target companies.',
        'Write a personalized note: "I enjoyed your post on [breach analysis/CTF/tool]. Would love to connect."',
        'Send requests. Track responses in a spreadsheet.',
        'Follow up with a thank-you message if accepted.'
      ],
      completionCriteria: [
        '5 personalized requests sent.',
        'Notes reference specific security posts or shared interests.',
        'At least 2 accepted within 1 week.'
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Do not ask for a job in the first message. Build rapport first.',
        'Comment on breach analyses or CTF writeups before connecting.',
        'Target cleared defense contractors if you hold clearance.'
      ],
      expectedOutcome: '5 new connections in cybersecurity who can provide referrals or insights.',
    },
  ],
  'ctf-writeups': [
    {
      id: 'cyber-cw-write-ctf',
      title: 'Write Your First CTF Writeup',
      objective: 'Publish a CTF writeup that showcases your offensive and defensive skills.',
      instructions: [
        'Pick one CTF challenge you solved: TryHackMe, HackTheBox, VulnHub.',
        'Outline: Challenge, Reconnaissance, Exploitation, Privilege Escalation, Lessons Learned.',
        'Include screenshots, code snippets, and mitigation advice.',
        'Publish on LinkedIn, Medium, or GitHub.'
      ],
      completionCriteria: [
        'Writeup published on public platform.',
        'All stages documented: recon, exploit, privesc, lessons.',
        'Mitigation advice included: how to prevent this attack.'
      ],
      estimatedMinutes: 60,
      difficulty: 3,
      tips: [
        'Start with an easy box: TryHackMe "Blue" or "Kenobi".',
        'Include both offensive (how I broke in) and defensive (how to block).',
        'Tag #CTF #Cybersecurity #TryHackMe for visibility.'
      ],
      expectedOutcome: 'A CTF writeup that serves as a portfolio piece and attracts recruiter attention.',
    },
  ],
  'security-blog': [
    {
      id: 'cyber-sb-write-article',
      title: 'Write Your First Security Article',
      objective: 'Publish a security analysis article that demonstrates thought leadership.',
      instructions: [
        'Pick a recent breach or vulnerability: CVE analysis, ransomware attack, supply chain compromise.',
        'Outline: What happened, technical analysis, impact, mitigation, lessons for defenders.',
        'Write 600-800 words. Include IOCs and MITRE ATT&CK mappings.',
        'Publish on LinkedIn or Medium.'
      ],
      completionCriteria: [
        'Article published on public platform.',
        '600-800 words with technical depth.',
        'MITRE ATT&CK technique IDs included.'
      ],
      estimatedMinutes: 90,
      difficulty: 3,
      tips: [
        'Use resources: CISA alerts, BleepingComputer, Krebs on Security.',
        'Map to MITRE ATT&CK: "Initial Access: T1566 (Phishing), Persistence: T1053 (Scheduled Task)."',
        'End with actionable advice: "Defenders should monitor for..."'
      ],
      expectedOutcome: 'A security article that proves you can analyze threats and communicate findings.',
    },
  ],
  'certifications-display': [
    {
      id: 'cyber-cd-add-certs',
      title: 'Add Security Certifications to LinkedIn',
      objective: 'Display your cybersecurity certifications prominently on LinkedIn.',
      instructions: [
        'Add Security+, CEH, CISSP, or equivalent to Licenses & Certifications.',
        'Include credential ID and verification URL.',
        'Complete LinkedIn Skills Assessments for Cybersecurity and Python.',
        'Request endorsements for SIEM, Incident Response, and Vulnerability Assessment.'
      ],
      completionCriteria: [
        'At least 2 certifications added with URLs.',
        'Skills assessments completed for Cybersecurity.',
        '3+ endorsements requested.'
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'If no certifications yet, add "In Progress" with expected completion date.',
        'CISSP requires 5 years experience. Security+ is entry-level. CEH is offensive-focused.',
        'Endorse colleagues first — reciprocity increases response rates.'
      ],
      expectedOutcome: 'A certifications section that validates your security skills to employers.',
    },
  ],
};