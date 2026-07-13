import type { TaskContent } from '@/core/task_content';

export const LINKEDIN_TASKS: Record<string, TaskContent[]> = {
  'headline-authority': [
    {
      id: 'cy-ha-variants',
      title: 'Write Security Headline Variants',
      objective: 'Create 5 alternative headlines for your LinkedIn profile.',
      instructions: [
        'Write 5 headlines combining: role + tools + value proposition.',
        'Ensure each fits within 220 characters.',
        'Include at least one certification or tool keyword.',
        'Remove "seeking", "open to work", and emojis.',
        'Ask a security professional which is clearest.',
      ],
      completionCriteria: [
        '5 headlines written',
        'Each fits LinkedIn character limit',
        'At least 3 contain security-specific keywords',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Example: "SOC Analyst | Splunk, Wireshark, Python | CompTIA Security+"',
        'Example: "Threat Hunter | MITRE ATT&CK | SIEM Detection Engineering"',
        'Avoid generic phrases like "Passionate about cybersecurity".',
      ],
      expectedOutcome: 'A keyword-rich headline ready for your profile.',
    },
  ],
  'about-section': [
    {
      id: 'cy-as-narrative',
      title: 'Write Your Security Narrative',
      objective: 'Create a compelling About section that showcases your security journey.',
      instructions: [
        'Write 200 words about your security focus.',
        'Mention specific tools and certifications.',
        'Include one concrete incident or discovery.',
        'End with clearance status and what you are looking for.',
      ],
      completionCriteria: [
        'About section is 150-200 words',
        'Mentions at least 3 security tools',
        'Includes one specific security achievement',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'Start with a hook: "I hunt threats before they become breaches."',
        'Include clearance status: "TS/SCI eligible" or "Secret clearance".',
        'End with a call to action.',
      ],
      expectedOutcome: 'A compelling About section ready for your profile.',
    },
  ],
  'network-connections': [
    {
      id: 'cy-nc-build',
      title: 'Build Security Network',
      objective: 'Connect with 20 security professionals this week.',
      instructions: [
        'Find 10 SOC analysts or security engineers.',
        'Find 5 security recruiters.',
        'Find 5 CISOs or security managers.',
        'Send personalized connection requests to each.',
      ],
      completionCriteria: [
        '20 connection requests sent',
        'Each request is personalized',
        'Requests target relevant security roles',
      ],
      estimatedMinutes: 35,
      difficulty: 1,
      tips: [
        'Mention shared interests, CTFs, or conferences.',
        'Comment on their posts before connecting.',
        'Attend BSides, DEF CON, or local security meetups.',
      ],
      expectedOutcome: 'A growing network of security professionals.',
    },
  ],
  'ctf-writeups': [
    {
      id: 'cy-cw-write',
      title: 'Publish CTF Write-ups',
      objective: 'Create and publish 3 CTF challenge write-ups.',
      instructions: [
        'Choose 3 CTF challenges where you performed well.',
        'Write detailed write-ups for each.',
        'Include tools used, methodology, and lessons learned.',
        'Publish on LinkedIn, Medium, or a personal blog.',
      ],
      completionCriteria: [
        '3 CTF write-ups published',
        'Each includes tools and methodology',
        'Published and linkable from profile',
      ],
      estimatedMinutes: 90,
      difficulty: 3,
      tips: [
        'Include screenshots, code snippets, and MITRE ATT&CK mappings.',
        'Tag with #CTF #Cybersecurity for visibility.',
        'Show both offensive and defensive perspectives.',
      ],
      expectedOutcome: 'Published CTF write-ups ready for LinkedIn.',
    },
  ],
  'security-blog': [
    {
      id: 'cy-sb-article',
      title: 'Write First Security Article',
      objective: 'Publish a security analysis article on LinkedIn or Medium.',
      instructions: [
        'Choose a recent breach or vulnerability.',
        'Write 500-800 words analyzing the incident.',
        'Include IOCs, MITRE ATT&CK mappings, and remediation steps.',
        'Publish and share in security groups.',
      ],
      completionCriteria: [
        'Article is published',
        '500-800 words',
        'Includes technical analysis and IOCs',
      ],
      estimatedMinutes: 60,
      difficulty: 2,
      tips: [
        'Use CVE numbers for credibility.',
        'Share your post in security communities.',
        'Keep it under 800 words for readability.',
      ],
      expectedOutcome: 'A published security article demonstrating expertise.',
    },
  ],
  'certifications-display': [
    {
      id: 'cy-cd-add',
      title: 'Display All Certifications',
      objective: 'Add all security certifications to your LinkedIn profile.',
      instructions: [
        'List all certifications you hold.',
        'Add credential IDs and verification URLs.',
        'Request skill endorsements for key security skills.',
        'Update your headline to include key certifications.',
      ],
      completionCriteria: [
        'All certifications listed with credential IDs',
        'At least 5 skill endorsements',
        'Headline includes certification acronym',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Security+ is the entry standard for blue team.',
        'CEH is valued for offensive roles.',
        'OSCP is highly respected for penetration testing.',
      ],
      expectedOutcome: 'A verified certifications section on your LinkedIn profile.',
    },
  ],
};
