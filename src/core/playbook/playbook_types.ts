export type PlaybookCategory =
  | 'resume'
  | 'linkedin'
  | 'applications'
  | 'interviews'
  | 'offer'
  | 'communication'
  | 'body_language'
  | 'confidence';

export interface PlaybookEntry {
  id: string;
  title: string;
  category: PlaybookCategory;
  overview: string;
  guides: string[];
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
