export type ProfessionManifestEntry = {
  id: string;
  path: string;
  title: string;
  description: string;
};

export const PROFESSION_MANIFEST: ProfessionManifestEntry[] = [
  {
    id: 'software_engineer',
    path: './software_engineer',
    title: 'Software Engineer',
    description: 'Build a career in software development from resume to offer.',
  },
  {
    id: 'data_analyst',
    path: './data_analyst',
    title: 'Data Analyst',
    description: 'Master data analysis skills and land your first analyst role.',
  },
  {
    id: 'cybersecurity',
    path: './cybersecurity',
    title: 'Cybersecurity',
    description: 'Enter the cybersecurity field with hands-on preparation.',
  },
];

export function getManifestEntry(id: string): ProfessionManifestEntry | undefined {
  return PROFESSION_MANIFEST.find(e => e.id === id);
}

export function getAllManifestEntries(): ProfessionManifestEntry[] {
  return [...PROFESSION_MANIFEST];
}
