export type PlaybookCategory = 'resume' | 'linkedin' | 'interview' | 'salary' | 'networking';

export interface PlaybookEntry {
  id: string;
  title: string;
  category: PlaybookCategory;
  content: string;
  templates: string[];
  examples: string[];
  checklist: string[];
  tags: string[];
}

export interface PlaybookFilter {
  category?: PlaybookCategory;
  tag?: string;
  search?: string;
}
