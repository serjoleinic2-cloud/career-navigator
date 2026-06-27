export type PlaybookCategory =
  | 'resume'
  | 'interview'
  | 'salary'
  | 'linkedin'
  | 'networking'
  | 'communication'
  | 'body_language'
  | 'confidence'
  | 'remote'
  | 'appearance'
  | 'mistakes';

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
