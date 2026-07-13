import type { TaskContent } from '@/core/task_content';

export const RESUME_TASKS: Record<string, TaskContent[]> = {
  'positioning-clarity': [
    {
      id: 'cyber-pc-define-role',
      title: 'Define Your Security Role',
      objective: 'Create one precise positioning statement for your cybersecurity job search.',
      instructions: [
        'Open five current cybersecurity job postings: SOC Analyst, Security Engineer, Penetration Tester.',
        'Identify common tools: Splunk, Wireshark, Metasploit, Nessus, CrowdStrike, etc.',
        'Write one sentence: "I am a [level] [role] specializing in [domain: blue team/red team/GRC/cloud]."',
        'Remove vague words like "passionate", "interested", or "cybersecurity enthusiast".'
      ],
      completionCriteria: [
        'Statement is under 20 words.',
        'Specific role is named: SOC Analyst, Security Engineer, or Penetration Tester.',
        'Domain is specified: blue team, red team, GRC, cloud security, or threat intelligence.'
      ],
      estimatedMinutes: 15,
      difficulty: 1,
      tips: [
        'Mirror job posting language exactly: "SOC Analyst Tier 1" not "security analyst".',
        'Avoid "entry-level" if you have home lab or CTF experience.',
        'Focus on defensive or offensive specialization, not both.'
      ],
      expectedOutcome: 'A clear positioning statement that guides your entire security job search.',
    },
  ],
  'cyber-skills-matrix': [
    {
      id: 'cyber-sm-build-matrix',
      title: 'Build Your Security Skills Matrix',
      objective: 'Create a honest, detailed skills matrix for your security resume.',
      instructions: [
        'List defensive tools: SIEM (Splunk, QRadar), IDS/IPS (Snort, Suricata), EDR (CrowdStrike, SentinelOne).',
        'List offensive tools: Metasploit, Burp Suite, Nmap, Nessus, BloodHound.',
        'List frameworks: NIST CSF, MITRE ATT&CK, OWASP Top 10, CIS Controls.',
        'Rate each 1-5: 1 = tutorial, 3 = lab-used, 5 = production or CTF.'
      ],
      completionCriteria: [
        'Minimum 5 defensive and 3 offensive tools listed.',
        'Every tool has a lab, CTF, or work example.',
        'No inflated ratings (be honest about production vs lab experience).'
      ],
      estimatedMinutes: 25,
      difficulty: 2,
      tips: [
        'Include scripting: Python, PowerShell, Bash — automation is key in security.',
        'Add cloud security: AWS Security Hub, Azure Sentinel, GCP Security Command Center.',
        'Soft skills do not belong in a technical matrix.'
      ],
      expectedOutcome: 'A credible skills matrix that passes recruiter screening and interview deep-dives.',
    },
  ],
  'resume-structure': [
    {
      id: 'cyber-rs-reformat-bullet',
      title: 'Reformat One Security Bullet',
      objective: 'Transform a weak bullet into a STAR-method incident-driven statement.',
      instructions: [
        'Pick your weakest resume bullet.',
        'Identify: Situation (alert type), Task (your responsibility), Action (tools used), Result (impact).',
        'Add a security metric: incidents contained, vulnerabilities found, time reduced.',
        'Lead with the result, then the tool, then the action.'
      ],
      completionCriteria: [
        'Bullet starts with a security metric.',
        'Tool is explicitly named: Splunk, Wireshark, Metasploit.',
        'Business outcome is clear: prevented breach, reduced dwell time, passed audit.'
      ],
      estimatedMinutes: 15,
      difficulty: 2,
      tips: [
        'Before: "Monitored SIEM alerts." After: "Detected and contained 3 phishing campaigns using Splunk, reducing dwell time by 60%."',
        'Use active verbs: detected, contained, eradicated, hardened, exploited.',
        'One strong bullet beats three weak ones.'
      ],
      expectedOutcome: 'A resume bullet that proves security impact, not just activity.',
    },
  ],
  'home-lab-showcase': [
    {
      id: 'cyber-hls-document-lab',
      title: 'Document Your Home Lab',
      objective: 'Create a README for your home lab that recruiters can evaluate.',
      instructions: [
        'Draw network topology: firewall, SIEM, vulnerable machines, attacker machine.',
        'List all tools and versions: pfSense 2.6, Splunk 9.0, Kali 2023, Metasploitable 3.',
        'Document one attack scenario: reconnaissance, exploitation, persistence, detection.',
        'Include screenshots of SIEM alerts and firewall rules.'
      ],
      completionCriteria: [
        'README has network diagram.',
        'One full attack scenario documented.',
        'Screenshots of detection and response included.'
      ],
      estimatedMinutes: 45,
      difficulty: 3,
      tips: [
        'Use draw.io for network diagrams. Export as PNG.',
        'Include detection logic: "Splunk alert fires when 3 failed logins from foreign IP."',
        'Show defense, not just offense: how you blocked the attack.'
      ],
      expectedOutcome: 'A home lab README that proves hands-on security experience.',
    },
  ],
  'incident-response-stories': [
    {
      id: 'cyber-irs-write-stories',
      title: 'Write Three Incident Stories',
      objective: 'Transform experience bullets into incident response narratives.',
      instructions: [
        'Pick 3 security incidents you handled (work, lab, or CTF).',
        'Format: Alert → Investigation → Containment → Eradication → Lessons Learned.',
        'Quantify: time to detect, time to contain, cost prevented, systems affected.',
        'Write one paragraph per incident, under 100 words.'
      ],
      completionCriteria: [
        'All 3 stories follow IR lifecycle.',
        'Each has at least one metric.',
        'Written in plain English, not jargon.'
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Use the NIST SP 800-61 framework: Preparation, Detection, Analysis, Containment, Eradication, Recovery.',
        'If no real incidents, use CTF challenges or lab scenarios.',
        'Focus on your decisions, not just tools used.'
      ],
      expectedOutcome: 'Three incident stories that prove you can handle pressure and protect assets.',
    },
  ],
  'resume-ats': [
    {
      id: 'cyber-ats-parse-test',
      title: 'Test ATS Parsing for Security',
      objective: 'Ensure your resume parses correctly by government and defense ATS.',
      instructions: [
        'Copy your resume into a plain text editor (Notepad).',
        'Check: correct order, no garbled text, dates readable, clearance level visible.',
        'Compare against a security job description: highlight keyword matches.',
        'Fix any formatting: tables, columns, headers, images.'
      ],
      completionCriteria: [
        'Plain text version is readable and ordered correctly.',
        'Keywords from target job appear naturally: SIEM, IDS, NIST, MITRE ATT&CK.',
        'Clearance level is visible if applicable: Secret, Top Secret, TS/SCI.'
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Government ATS (USAJOBS, ClearanceJobs) are stricter than corporate.',
        'Use standard headings: Clearance, Certifications, Experience, Skills, Education.',
        'Save as PDF with selectable text. Avoid scanned images.'
      ],
      expectedOutcome: 'An ATS-friendly resume that reaches security recruiters and government systems.',
    },
  ],
};