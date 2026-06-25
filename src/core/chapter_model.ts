export type ChapterId =
  | 'resume'
  | 'linkedin'
  | 'applications'
  | 'interviews'
  | 'offer';

export type Chapter = {
  id: ChapterId;
  title: string;
  description: string;
  nodeIds: string[];
};
