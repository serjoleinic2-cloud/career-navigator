export type ChapterId =
  | 'resume'
  | 'linkedin'
  | 'applications'
  | 'interview_prep'
  | 'interview_practice'
  | 'offer_prep'
  | 'interviews'
  | 'offer_preparation'
  | 'offer';

export type Chapter = {
  id: ChapterId;
  title: string;
  description: string;
  nodeIds: string[];
  /**
   * Filename of the floating island art for this chapter, resolved as
   * `/art/${professionId}/${artFilename}`. Single source of truth —
   * do NOT duplicate chapter->filename maps in UI components
   * (see ChapterHub.tsx / FinalCinematicScreen history for why that broke).
   * Omit if art isn't ready yet; UI falls back to a placeholder icon.
   */
  artFilename?: string;
};
