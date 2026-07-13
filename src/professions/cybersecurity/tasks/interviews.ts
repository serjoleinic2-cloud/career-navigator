import type { TaskContent } from '@/core/task_content';

export const INTERVIEW_TASKS: Record<string, TaskContent[]> = {
  'interview-prep': [
    {
      id: 'cy-ip-stories',
      title: 'Build Interview Story Bank',
      objective: 'Prepare 6-8 security stories using STAR format.',
      instructions: [
        'Write stories covering: incident response, vulnerability discovery, tool implementation, team collaboration.',
        'Each story follows STAR: Situation, Task, Action, Result.',
        'Include specific tools and metrics.',
        'Practice telling each story in under 2 minutes.',
      ],
      completionCriteria: [
        '6-8 stories documented',
        'Each follows STAR format',
        'Stories are under 2 minutes each',
      ],
      estimatedMinutes: 60,
      difficulty: 3,
      tips: [
        'Include at least one story about a mistake you learned from.',
        'Practice with a friend or record yourself.',
        'Use action verbs: detected, contained, eradicated, recovered.',
      ],
      expectedOutcome: 'A story bank ready for any security interview.',
    },
  ],
  'networking-deep-dive': [
    {
      id: 'cy-nd-fundamentals',
      title: 'Master Networking Fundamentals',
      objective: 'Review and practice core networking concepts for security interviews.',
      instructions: [
        'Review OSI model layers and their functions.',
        'Understand TCP vs UDP, HTTP vs HTTPS, DNS resolution.',
        'Practice explaining packet flow from client to server.',
        'Document common network attacks and defenses.',
      ],
      completionCriteria: [
        'OSI model fully understood',
        'TCP/IP, DNS, HTTP explained clearly',
        'Common attacks and defenses documented',
      ],
      estimatedMinutes: 45,
      difficulty: 2,
      tips: [
        'Use Wireshark to capture and analyze real traffic.',
        'Practice explaining concepts without jargon.',
        'Know common ports: 80, 443, 22, 53, 3389.',
      ],
      expectedOutcome: 'Solid networking fundamentals ready for interviews.',
    },
  ],
  'linux-administration': [
    {
      id: 'cy-la-practice',
      title: 'Practice Linux Security Tasks',
      objective: 'Master essential Linux commands for security work.',
      instructions: [
        'Practice: grep, awk, sed, find, ps, top, netstat, ss.',
        'Learn log analysis with journalctl and /var/log.',
        'Understand file permissions and user management.',
        'Write basic Bash scripts for automation.',
      ],
      completionCriteria: [
        'Common commands used from memory',
        'Log files can be parsed and analyzed',
        'Basic Bash scripts written',
      ],
      estimatedMinutes: 60,
      difficulty: 2,
      tips: [
        'Use OverTheWire Bandit for practice.',
        'Set up a Linux VM and use it daily.',
        'Practice parsing /var/log/auth.log for failed SSH attempts.',
      ],
      expectedOutcome: 'Linux proficiency ready for security interviews.',
    },
  ],
  'python-security': [
    {
      id: 'cy-ps-scripts',
      title: 'Build Security Python Scripts',
      objective: 'Create 3 Python scripts for common security tasks.',
      instructions: [
        'Write a log parser that extracts suspicious IPs.',
        'Create a port scanner using sockets.',
        'Build an API client for a threat intelligence feed.',
        'Document each script with usage examples.',
      ],
      completionCriteria: [
        '3 Python scripts functional',
        'Each solves a real security problem',
        'Scripts are documented and shareable',
      ],
      estimatedMinutes: 90,
      difficulty: 3,
      tips: [
        'Start with log parsing — it is the most common task.',
        'Use requests library for API interaction.',
        'Include error handling and logging.',
      ],
      expectedOutcome: 'Python scripts ready for your portfolio and interviews.',
    },
  ],
  'siem-analysis': [
    {
      id: 'cy-sa-practice',
      title: 'Practice SIEM Operations',
      objective: 'Gain hands-on experience with SIEM platforms.',
      instructions: [
        'Set up Splunk Free or ELK Stack in your lab.',
        'Ingest sample logs: Windows Event, Sysmon, firewall.',
        'Write 5 detection rules for common attacks.',
        'Practice triaging alerts and creating reports.',
      ],
      completionCriteria: [
        'SIEM deployed and operational',
        'Logs being ingested',
        '5 detection rules written and tested',
      ],
      estimatedMinutes: 120,
      difficulty: 3,
      tips: [
        'Splunk has free training and a free tier (500MB/day).',
        'ELK Stack is open source and highly customizable.',
        'Focus on: brute force, lateral movement, data exfiltration.',
      ],
      expectedOutcome: 'Practical SIEM experience ready for interviews.',
    },
  ],
  'incident-response-scenario': [
    {
      id: 'cy-irscenarios',
      title: 'Practice IR Scenarios',
      objective: 'Master 5 common incident response scenarios.',
      instructions: [
        'Practice: phishing, malware, data exfiltration, insider threat, ransomware.',
        'For each, follow: Detection, Containment, Eradication, Recovery, Lessons Learned.',
        'Explain your thought process out loud.',
        'Document your approach for each scenario.',
      ],
      completionCriteria: [
        '5 scenarios practiced',
        'Each follows the IR lifecycle',
        'Thought process documented',
      ],
      estimatedMinutes: 75,
      difficulty: 3,
      tips: [
        'Always start with: "What is the scope of the incident?"',
        'Communication is as important as technical skills.',
        'Mention escalation procedures and stakeholder notification.',
      ],
      expectedOutcome: 'IR scenario responses ready for any security interview.',
    },
  ],
  'threat-hunting-basics': [
    {
      id: 'cy-th-fundamentals',
      title: 'Learn Threat Hunting Fundamentals',
      objective: 'Understand MITRE ATT&CK and hypothesis-driven hunting.',
      instructions: [
        'Study the MITRE ATT&CK framework.',
        'Learn common detection techniques.',
        'Practice writing hunt hypotheses.',
        'Use public datasets for practice.',
      ],
      completionCriteria: [
        'MITRE ATT&CK framework understood',
        '3 hunt hypotheses written',
        'Practice with at least one dataset',
      ],
      estimatedMinutes: 60,
      difficulty: 3,
      tips: [
        'Start with common techniques: T1059 (Command Execution), T1053 (Scheduled Tasks).',
        'Security Onion has built-in hunt capabilities.',
        'Write hypotheses as: "If [technique], then [evidence] in [log source]".',
      ],
      expectedOutcome: 'Threat hunting fundamentals ready for interviews.',
    },
  ],
  'on-site-prep': [
    {
      id: 'cy-os-prepare',
      title: 'Prepare for On-Site Interview',
      objective: 'Prepare materials and questions for your on-site interview.',
      instructions: [
        'Research each interviewer on LinkedIn.',
        'Prepare 1-2 questions for each interviewer.',
        'Review the job description and company security stack.',
        'Prepare your elevator pitch and IR stories.',
      ],
      completionCriteria: [
        'Interviewers researched',
        'Questions prepared for each',
        'Elevator pitch polished',
        'IR stories practiced',
      ],
      estimatedMinutes: 45,
      difficulty: 1,
      tips: [
        'Ask about their security tools and processes.',
        'Show genuine interest in their challenges.',
        'Bring a notebook and take notes.',
      ],
      expectedOutcome: 'A well-prepared on-site interview strategy.',
    },
  ],
  'red-team-blue-team': [
    {
      id: 'cy-rbbt-direction',
      title: 'Define Your Security Direction',
      objective: 'Clarify whether you prefer Red Team or Blue Team work.',
      instructions: [
        'Research Red Team roles: pen testing, exploit dev, vulnerability research.',
        'Research Blue Team roles: SOC, IR, threat hunting, detection engineering.',
        'Assess your interests and strengths.',
        'Write a statement explaining your preference.',
      ],
      completionCriteria: [
        'Red and Blue roles understood',
        'Personal preference identified',
        'Preference statement written',
      ],
      estimatedMinutes: 30,
      difficulty: 1,
      tips: [
        'Both directions are equally valuable.',
        'Purple Team combines both — consider it too.',
        'Your preference should align with your resume positioning.',
      ],
      expectedOutcome: 'A clear career direction statement for interviews.',
    },
  ],
  'interview-followup': [
    {
      id: 'cy-fu-templates',
      title: 'Create Follow-Up Templates',
      objective: 'Prepare thank-you email templates for different interview scenarios.',
      instructions: [
        'Write a template for phone screen follow-up.',
        'Write a template for technical interview follow-up.',
        'Write a template for on-site follow-up.',
        'Personalize each with specific details.',
      ],
      completionCriteria: [
        '3 follow-up templates created',
        'Each personalized with interview details',
        'Templates ready to send',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Send within 24 hours.',
        'Reference a specific technical discussion.',
        'Reiterate your interest and value proposition.',
      ],
      expectedOutcome: 'Professional follow-up templates ready for any interview.',
    },
  ],
};
