export type ProfessionMeta = {
  id: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
  premium: boolean;
};

/**
 * "Coming soon" catalog for professions not yet built as a module
 * (see src/professions/profession_auto_loader.ts for the actual registration
 * of live professions). Keep `id` values here in sync with the commented-out
 * imports in profession_auto_loader.ts so onboarding and registration agree
 * once a profession module is actually added.
 */
export function getProfessionCatalog(): ProfessionMeta[] {
  return [
    {
      id: 'software_engineer',
      title: 'Software Engineer',
      description: 'Build a career in software development from resume to offer.',
      icon: '💻',
      enabled: true,
      premium: false,
    },
    {
      id: 'data_analyst',
      title: 'Data Analyst',
      description: 'Turn data into decisions and build a career in analytics.',
      icon: '📊',
      enabled: true,
      premium: false,
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      description: 'Protect systems and data as a security professional.',
      icon: '🛡️',
      enabled: false,
      premium: true,
    },
    {
      id: 'digital_marketing',
      title: 'Digital Marketing',
      description: 'Drive growth through digital channels and campaigns.',
      icon: '📣',
      enabled: false,
      premium: true,
    },
    {
      id: 'customer_support',
      title: 'Customer Support',
      description: 'Deliver exceptional support experiences and build customer trust.',
      icon: '🎧',
      enabled: false,
      premium: true,
    },
  ];
}
