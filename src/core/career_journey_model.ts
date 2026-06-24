export type Chapter = 'Resume' | 'LinkedIn' | 'Applications' | 'Interview' | 'Offer';

export type NodeStatus = 'done' | 'active' | 'locked';

export interface JourneyNode {
  id: string;
  chapter: Chapter;
  title: string;
  status: NodeStatus;
  tasks: string[];
  notes?: string[];
  dayIndex: number;
}

export interface JourneyChapter {
  chapter: Chapter;
  nodes: JourneyNode[];
}

export interface CareerJourney {
  chapters: JourneyChapter[];
  currentDay: number;
  totalDays: number;
}
