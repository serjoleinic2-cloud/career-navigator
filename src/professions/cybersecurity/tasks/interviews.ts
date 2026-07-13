import type { TaskContent } from '@/core/task_content';

export const INTERVIEW_TASKS: Record<string, TaskContent[]> = {
  'interview-prep': [
    {
      id: 'cyber-ip-pitch-practice',
      title: 'Practice Security Elevator Pitch',
      objective: 'Deliver a compelling 30-second introduction for cybersecurity roles.',
      instructions: [
        'Write your pitch: who you are, what you defend, what you want.',
        'Include one metric: incidents contained, vulnerabilities found, CTF rank.',
        'Practice aloud 10 times. Record yourself.',
        'Get feedback from a security professional.'
      ],
      completionCriteria: [
        'Pitch is under 30 seconds.',
        'Includes one security metric.',
        'Delivered confidently without notes.'
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Start with hook: "I defend networks from advanced persistent threats."',
        'End with ask: "I am seeking a SOC Analyst role with TS/SCI clearance."',
        'Practice in front of mirror. Energy matters.'
      ],
      expectedOutcome: 'A polished pitch that opens every security interview strong.',
    },
  ],
  'networking-deep-dive': [
    {
      id: 'cyber-nd-networking-lab',
      title: 'Build Networking Lab',
      objective: 'Master TCP/IP and packet analysis for technical interviews.',
      instructions: [
        'Set up 3 VMs: attacker, target, and sniffer.',
        'Capture traffic with Wireshark and tcpdump.',
        'Analyze: TCP handshake, DNS query, HTTP request, suspicious port scan.',
        'Document findings with screenshots.'
      ],
      completionCriteria: [
        '3 VMs configured and communicating.',
        '4 packet captures analyzed.',
        'Screenshots documented.'
      ],
      estimatedMinutes: 90,
      difficulty: 3,
      tips: [
        'Use VirtualBox or VMware. Create isolated network.',
        'Practice identifying anomalies: unusual ports, large packets, beaconing.',
        'Learn to read hex dumps for manual analysis.'
      ],
      expectedOutcome: 'Networking fluency that proves you understand what you defend.',
    },
  ],
  'linux-administration': [
    {
      id: 'cyber-la-harden-server',
      title: 'Harden a Linux Server',
      objective: 'Practice Linux hardening for defensive interview questions.',
      instructions: [
        'Install Ubuntu Server VM.',
        'Configure iptables: allow SSH, HTTP, HTTPS. Deny all else.',
        'Set up SELinux or AppArmor.',
        'Configure auditd logging and log rotation.'
      ],
      completionCriteria: [
        'Firewall configured with explicit rules.',
        'MAC (SELinux/AppArmor) enabled and tested.',
        'Audit logging configured and verified.'
      ],
      estimatedMinutes: 90,
      difficulty: 3,
      tips: [
        'Document every change. Interviewers ask: "Why this rule?"',
        'Test from attacker VM: can you bypass your own defenses?',
        'Practice common commands: ps, netstat, lsof, find, grep.'
      ],
      expectedOutcome: 'Linux hardening skills that impress defensive interviewers.',
    },
  ],
  'python-security': [
    {
      id: 'cyber-ps-write-scanner',
      title: 'Write a Port Scanner',
      objective: 'Build a Python tool for offensive interview scenarios.',
      instructions: [
        'Write a TCP connect scanner: input IP range and port range.',
        'Add SYN stealth scan option using scapy.',
        'Add banner grabbing for open ports.',
        'Add output to CSV for reporting.'
      ],
      completionCriteria: [
        'Scanner detects open ports on target VM.',
        'SYN scan works without full TCP handshake.',
        'Banner grabbing extracts service versions.',
        'CSV output is readable and sortable.'
      ],
      estimatedMinutes: 120,
      difficulty: 4,
      tips: [
        'Start simple: socket.connect(). Add features incrementally.',
        'Handle exceptions: timeouts, refused connections, host down.',
        'Add threading for speed. Interviewers love performance optimization.'
      ],
      expectedOutcome: 'A Python port scanner that proves scripting ability.',
    },
  ],
  'siem-analysis': [
    {
      id: 'cyber-sa-siem-lab',
      title: 'Build SIEM Detection Lab',
      objective: 'Master SIEM query writing and alert tuning.',
      instructions: [
        'Install Splunk Free or ELK Stack.',
        'Ingest logs: Windows Event, firewall, web server.',
        'Create 3 detection rules: brute force, malware beacon, privilege escalation.',
        'Tune false positives. Document detection logic.'
      ],
      completionCriteria: [
        'SIEM installed with 3 log sources.',
        '3 detection rules created and tested.',
        'False positives identified and tuned.'
      ],
      estimatedMinutes: 180,
      difficulty: 4,
      tips: [
        'Use Splunk SPL or KQL. Practice daily.',
        'Test rules against known bad traffic.',
        'Document: what this detects, why it matters, how to respond.'
      ],
      expectedOutcome: 'SIEM fluency that proves detection engineering skills.',
    },
  ],
  'incident-response-scenario': [
    {
      id: 'cyber-ir-tabletop-exercise',
      title: 'Lead a Tabletop Exercise',
      objective: 'Practice incident response under interview conditions.',
      instructions: [
        'Pick a scenario: ransomware, insider threat, or APT compromise.',
        'Assign roles: SOC analyst, IR lead, management, legal.',
        'Walk through: detection, containment, eradication, recovery, lessons learned.',
        'Document decisions and timeline.'
      ],
      completionCriteria: [
        'Scenario selected and roles assigned.',
        'Full IR lifecycle walked through.',
        'Decisions and timeline documented.'
      ],
      estimatedMinutes: 90,
      difficulty: 3,
      tips: [
        'Use NIST SP 800-61 as framework.',
        'Focus on communication: who do you notify and when?',
        'Practice explaining technical decisions to non-technical stakeholders.'
      ],
      expectedOutcome: 'IR scenario fluency that proves leadership under pressure.',
    },
  ],
  'threat-hunting-basics': [
    {
      id: 'cyber-th-hypothesis-hunt',
      title: 'Perform a Hypothesis-Driven Hunt',
      objective: 'Practice proactive threat hunting in your lab.',
      instructions: [
        'Pick a MITRE ATT&CK technique: T1053 Scheduled Task.',
        'Form hypothesis: "Adversary is using scheduled tasks for persistence."',
        'Search logs for evidence: task creation, modification, execution.',
        'Validate or disprove. Document findings.'
      ],
      completionCriteria: [
        'Hypothesis clearly stated.',
        'Search queries executed.',
        'Findings documented with evidence.'
      ],
      estimatedMinutes: 90,
      difficulty: 4,
      tips: [
        'Start with known bad: create a malicious scheduled task yourself.',
        'Use Sigma rules or YARA for detection.',
        'Document false positives: what looks suspicious but is legitimate?'
      ],
      expectedOutcome: 'Threat hunting skills that elevate you from alert responder to proactive defender.',
    },
  ],
  'on-site-prep': [
    {
      id: 'cyber-os-polygraph-prep',
      title: 'Prepare for Polygraph and Technical Rounds',
      objective: 'Plan for the unique challenges of cleared security interviews.',
      instructions: [
        'Research polygraph process: CI, lifestyle, full scope.',
        'Prepare honest, consistent answers for all questions.',
        'Practice technical whiteboarding: network diagrams, attack chains.',
        'Plan energy management: sleep, nutrition, breaks.'
      ],
      completionCriteria: [
        'Polygraph types researched.',
        'Technical whiteboard topics practiced.',
        'Logistics planned: transport, parking, arrival time.'
      ],
      estimatedMinutes: 60,
      difficulty: 2,
      tips: [
        'Polygraph: be honest, consistent, and calm. No surprises.',
        'Technical: practice drawing network diagrams from memory.',
        'Energy: cleared interviews can last 6+ hours. Pace yourself.'
      ],
      expectedOutcome: 'A calm, prepared performance across all cleared interview rounds.',
    },
  ],
  'red-team-blue-team': [
    {
      id: 'cyber-rtbt-lab-both-sides',
      title: 'Practice Both Red and Blue',
      objective: 'Demonstrate understanding of offensive and defensive perspectives.',
      instructions: [
        'Red team: attack a vulnerable machine. Document exploit chain.',
        'Blue team: detect the same attack in SIEM. Write detection rule.',
        'Purple team: explain how red and blue collaborate.',
        'Present both perspectives in 5 minutes.'
      ],
      completionCriteria: [
        'Attack executed and documented.',
        'Detection rule created and tested.',
        'Both perspectives presented clearly.'
      ],
      estimatedMinutes: 180,
      difficulty: 5,
      tips: [
        'Start with simple attack: brute force, then escalate.',
        'Detection: focus on behavioral indicators, not just IOCs.',
        'Purple team: communication is key. Red informs blue, blue improves defenses.'
      ],
      expectedOutcome: 'Purple team mindset that makes you rare and valuable.',
    },
  ],
  'interview-followup': [
    {
      id: 'cyber-if-send-thanks',
      title: 'Send Security Thank-You Emails',
      objective: 'Write thoughtful follow-ups that reinforce your candidacy.',
      instructions: [
        'Draft template thank-you email for security interviews.',
        'Personalize for each interviewer: reference specific technical discussion.',
        'Reiterate clearance status and interest.',
        'Send within 4 hours.'
      ],
      completionCriteria: [
        'Template drafted.',
        'Personalized for each interviewer.',
        'Sent within 4 hours.'
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Reference specific topic: "I enjoyed discussing the SIEM migration..."',
        'Reiterate interest: "I am excited about the opportunity to defend..."',
        'Mention clearance: "I am TS/SCI eligible and ready to begin clearance process."'
      ],
      expectedOutcome: 'Follow-up emails that keep you top of mind during deliberation.',
    },
  ],
};