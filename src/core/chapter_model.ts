export type ChapterId =
  | 'resume'
  | 'linkedin'
  | 'applications'
  | 'interview_prep'
  | 'interview_practice'
  | 'offer_prep'
  | 'interviews'
  | 'offer';

export type Chapter = {
  id: ChapterId;
  title: string;
  description: string;
  nodeIds: string[];
};
