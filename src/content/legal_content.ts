// Content sourced from the project's About.txt / Privacy Policy.txt / Share App.txt
// spec docs. Kept as a single source of truth so Settings, Onboarding, and the
// Privacy Policy screen never drift out of sync with each other.

export const APP_ABOUT = {
  tagline: 'Your personal guide to career readiness.',
  description:
    'Build confidence, complete practical missions, prepare for interviews, and track your progress — all in one private, offline-first app.',
  footer:
    'Career Navigator helps you stay focused on what matters most: becoming ready for your next opportunity.',
};

export interface PrivacyPolicySection {
  heading: string;
  body?: string[];
  bullets?: string[];
  table?: { rows: [string, string, string][] };
}

export const PRIVACY_POLICY_EFFECTIVE_DATE = 'July 11, 2026';
export const PRIVACY_POLICY_LAST_UPDATED = 'July 11, 2026';

export const PRIVACY_POLICY_SECTIONS: PrivacyPolicySection[] = [
  {
    heading: '1. Introduction',
    body: [
      'Career Navigator ("we", "our", or "the App") is an offline career preparation and interview training application. This Privacy Policy explains how we handle your information.',
    ],
  },
  {
    heading: '2. Information We Do Not Collect',
    body: ['Career Navigator is designed with privacy as a core principle. We do not collect:'],
    bullets: [
      'Personal identification information (name, email, address)',
      'Account credentials',
      'Location data',
      'Device identifiers',
      'Usage analytics',
      'Crash reports',
      'Any data transmitted to external servers',
    ],
  },
  {
    heading: '3. Information Stored Locally',
    body: ['All data created by you is stored exclusively on your device:'],
    table: {
      rows: [
        ['Journey progress', 'Track your career preparation steps', 'Local device'],
        ['Notes', 'Your personal reflections per chapter', 'Local device'],
        ['Interview recordings', 'Voice practice sessions (optional)', 'Local device'],
        ['Self-assessment scores', 'Track interview readiness', 'Local device'],
        ['Settings', 'App preferences', 'Local device'],
      ],
    },
  },
  {
    heading: '4. Voice Recording',
    body: ["The Interview Trainer feature uses your device's microphone:"],
    bullets: [
      'Recordings are processed locally',
      'Audio data is not transmitted to any server',
      'Recordings are not permanently stored unless you explicitly save them',
      'You may delete recordings at any time',
    ],
  },
  {
    heading: '5. Third-Party Services',
    body: ['Career Navigator does not integrate with:'],
    bullets: [
      'Analytics platforms (Google Analytics, Firebase, etc.)',
      'Advertising networks',
      'Social media SDKs',
      'Cloud storage services',
      'AI/ML APIs',
    ],
  },
  {
    heading: '6. Data Security',
    body: ['Since all data is local:'],
    bullets: [
      'Your data is as secure as your device',
      'We recommend enabling device encryption',
      "App data is protected by your device's operating system sandbox",
    ],
  },
  {
    heading: "7. Children's Privacy",
    body: [
      'Career Navigator is not intended for users under 16 years of age. We do not knowingly collect any information from children.',
    ],
  },
  {
    heading: '8. Changes to This Policy',
    body: [
      "We may update this Privacy Policy. Changes will be reflected in the App's Settings screen and the effective date will be updated.",
    ],
  },
  {
    heading: '9. Contact Us',
    body: ['For questions about this Privacy Policy:', 'Email: privacy@careernavigator.app'],
  },
  {
    heading: '10. Your Rights',
    body: ['You have the right to:'],
    bullets: [
      'Access: All your data is visible within the App',
      'Delete: Clear all data via Settings → Privacy → Delete All Data',
      'Export: Backup your data locally via Settings → Backup',
      'Opt-out: Uninstall the App to remove all associated data',
    ],
  },
];

export const PRIVACY_POLICY_CLOSING =
  'By using Career Navigator, you acknowledge that you understand and agree to this Privacy Policy.';

// Share App — recommend the app to other people. Per spec: fixed promotional
// text only, never progress/JSON/CSV/debug data.
export const APP_SHARE_URL =
  'https://play.google.com/store/apps/details?id=com.careernavigator.app';

export const APP_SHARE_TEXT =
  "I'm using Career Navigator to prepare for job interviews and build my career with step-by-step missions.\n\n" +
  `Download it on Google Play:\n${APP_SHARE_URL}`;
