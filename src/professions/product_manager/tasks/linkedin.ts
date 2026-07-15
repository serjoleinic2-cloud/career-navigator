import type { TaskContent } from '@/core/task_content';

export const LINKEDIN_TASKS: Record<string, TaskContent[]> = {
  'headline-authority': [
    {
      id: 'pm-la-write-headline',
      title: 'Write 3 PM LinkedIn Headlines',
      objective: 'Create keyword-rich headlines that appear in PM recruiter searches.',
      instructions: [
        'Write 3 headline variations combining: role + domain + differentiator.',
        'Example: "Product Manager | B2B SaaS | Growth & Retention | Ex-Stripe".',
        'Check each is under 220 characters (LinkedIn limit).',
        'Post the best one and monitor profile view changes over 7 days.',
      ],
      completionCriteria: [
        '3 headline options written',
        'Best headline published on LinkedIn',
        'Headline contains "Product Manager" and one domain keyword',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Search "Product Manager [your domain]" on LinkedIn. Note how top results phrase their headline.',
        'Company alumni signals work: "Ex-Google PM" boosts credibility even at early career.',
        'Avoid generic: "Passionate about building products" tells recruiters nothing.',
      ],
      expectedOutcome: 'A LinkedIn headline that appears consistently in PM recruiter search results.',
    },
  ],
  'about-section': [
    {
      id: 'pm-as-write-about',
      title: 'Write Your PM LinkedIn About Section',
      objective: 'Craft a 200-word About that tells your PM story and attracts recruiters.',
      instructions: [
        'Open with a hook: one specific user problem you love solving.',
        'Add 2 sentences of product context: domain, users, and metrics you moved.',
        'Add 1 sentence on your product philosophy or approach.',
        'Close with a clear signal: open to new PM roles or "DM me about product leadership".',
      ],
      completionCriteria: [
        'About section is 150-250 words',
        'Mentions a specific user problem and one metric',
        'Ends with a clear call to action for recruiters',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'The first 2 lines show before "see more" — make them the strongest.',
        'Avoid lists of tools in the About — that belongs in Skills section.',
        'Read it aloud: if it sounds like a corporate bio, rewrite it as a person talking.',
      ],
      expectedOutcome: 'A LinkedIn About that converts profile views into recruiter outreach.',
    },
  ],
  'network-connections': [
    {
      id: 'pm-nc-connect-pms',
      title: 'Connect with 10 Product Professionals',
      objective: 'Expand your PM network strategically to surface referral opportunities.',
      instructions: [
        'Identify 5 PMs at companies you want to work at.',
        'Identify 3 CPOs or VP Products in your target domain.',
        'Identify 2 PM-focused recruiters at agencies or in-house teams.',
        'Send each a personalized 2-sentence connection request with context.',
      ],
      completionCriteria: [
        '10 connection requests sent with personalized notes',
        'Notes reference a specific product they worked on or a shared interest',
        'Zero generic "I would like to add you to my network" requests',
      ],
      estimatedMinutes: 30,
      difficulty: 1,
      tips: [
        'Reference something specific: "I loved reading your post about your 0-to-1 launch."',
        'Connect after engaging with their content — they recognize your name.',
        'Never ask for a referral in the first message. Build first, ask later.',
      ],
      expectedOutcome: 'An expanded PM network that creates referral pathways to target companies.',
    },
  ],
  'linkedin-optimization': [
    {
      id: 'pm-lo-complete-profile',
      title: 'Complete Your LinkedIn Profile to 90%+',
      objective: 'Maximize your profile completeness to rank higher in PM recruiter searches.',
      instructions: [
        'Check LinkedIn profile completeness meter. Note missing sections.',
        'Add all PM-relevant skills: Product Roadmap, A/B Testing, User Research, OKRs, Jira, Figma.',
        'Request endorsements from 3 former colleagues for top PM skills.',
        'Add at least one media item to the Featured section.',
      ],
      completionCriteria: [
        'Profile completeness is 90% or higher',
        'At least 10 PM skills listed, top 3 have 5+ endorsements',
        'Featured section has at least 1 item',
      ],
      estimatedMinutes: 40,
      difficulty: 1,
      tips: [
        'Endorsements for "Product Management" and "Product Roadmaps" carry the most signal.',
        'Add certifications if you have any: PSPO, CPO certification, etc.',
        'Turn on "Open to Work" (visible to recruiters only) if you are actively searching.',
      ],
      expectedOutcome: 'A fully optimized PM profile that ranks higher in recruiter searches.',
    },
  ],
  'profile-photo': [
    {
      id: 'pm-pp-update-photo',
      title: 'Update Your LinkedIn Profile Photo',
      objective: 'Replace or verify you have a professional, trust-building PM headshot.',
      instructions: [
        'Evaluate your current photo: is it high-resolution, recent, and professional?',
        'If not, use Portrait mode on a modern phone against a plain wall.',
        'Dress business casual or match the culture of your target companies.',
        'Upload and check it looks professional at thumbnail size.',
      ],
      completionCriteria: [
        'Photo is high-resolution (not pixelated)',
        'Face takes up 60%+ of the frame',
        'Background is clean and not distracting',
      ],
      estimatedMinutes: 20,
      difficulty: 1,
      tips: [
        'Natural light near a window beats any ring light for headshots.',
        'Slight smile with eye contact signals approachability — important for PM roles.',
        'No logos, team photos, or conference lanyards visible.',
      ],
      expectedOutcome: 'A professional photo that builds trust before a recruiter reads a single word.',
    },
  ],
  'featured-content': [
    {
      id: 'pm-fc-publish-case-study',
      title: 'Add a PM Case Study to Featured',
      objective: 'Make your best product work the first thing hiring managers see on your profile.',
      instructions: [
        'Choose your best PM case study, teardown, or product essay.',
        'Ensure it is publicly accessible and has a clean URL.',
        'Add it to LinkedIn Featured with a clear title and 1-sentence description.',
        'Test the link from a private browser to confirm it is publicly viewable.',
      ],
      completionCriteria: [
        'Featured section has at least 1 PM case study or writing sample',
        'Link opens correctly from a logged-out browser',
        'Title clearly describes the product problem addressed',
      ],
      estimatedMinutes: 30,
      difficulty: 2,
      tips: [
        'A Notion page with good formatting converts better than a raw Google Doc.',
        'Add a cover image to the Featured item — it shows as a visual card.',
        'Product teardowns (analyzing a competitor or a product you admire) also work well here.',
      ],
      expectedOutcome: 'A Featured section that instantly proves your PM thinking before any interview.',
    },
  ],
  'recommendations': [
    {
      id: 'pm-rec-request-3',
      title: 'Request 3 LinkedIn Recommendations',
      objective: 'Get specific, product-focused recommendations from people who saw your work.',
      instructions: [
        'Identify 3 people: 1 manager, 1 engineer you worked with, 1 designer or stakeholder.',
        'Message each with context: what project you worked on together and what to highlight.',
        'Provide a template they can customize: "X drove the [feature] launch that achieved [Y]."',
        'Give them a 2-week deadline and offer to write one for them first.',
      ],
      completionCriteria: [
        '3 recommendation requests sent with specific guidance',
        'Each request mentions a specific product or project to reference',
        'You offered to write a recommendation in return',
      ],
      estimatedMinutes: 25,
      difficulty: 1,
      tips: [
        'The most powerful PM recommendation mentions a specific decision you made and its outcome.',
        'Recommendations from engineers carry high weight — they know how PMs really operate.',
        'Give recommendations first: reciprocity dramatically increases response rate.',
      ],
      expectedOutcome: '2-3 powerful LinkedIn recommendations that prove cross-functional PM leadership.',
    },
  ],
};
