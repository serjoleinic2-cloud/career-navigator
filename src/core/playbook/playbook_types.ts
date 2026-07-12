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
  /** Which profession this entry belongs to. All existing entries are
   * software_engineer content; a new profession needs its own entries here
   * (or in a separate file merged into PLAYBOOK) tagged with its id. */
  professionId: string;
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
