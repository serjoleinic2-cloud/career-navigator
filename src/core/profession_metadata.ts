export type ProfessionMeta = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  premium: boolean;
};

export function getProfessionCatalog(): ProfessionMeta[] {
  return [
    {
      id: 'software_engineer',
      title: 'Software Engineer',
      description: 'Build a career in software development from resume to offer.',
      enabled: true,
      premium: false,
    },
    {
      id: 'data_analyst',
      title: 'Data Analyst',
      description: 'Turn data into decisions and build a career in analytics.',
      enabled: true,
      premium: false,
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      description: 'Protect systems and data as a security professional.',
      enabled: false,
      premium: true,
    },
    {
      id: 'digital_marketing',
      title: 'Digital Marketing',
      description: 'Drive growth through digital channels and campaigns.',
      enabled: false,
      premium: true,
    },
    {
      id: 'customer_support',
      title: 'Customer Support',
      description: 'Deliver exceptional support experiences and build customer trust.',
      enabled: false,
      premium: true,
    },
  ];
}
