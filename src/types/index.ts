export type ChapterStatus = 'locked' | 'active' | 'completed';
export type TaskStatus = 'locked' | 'available' | 'completed' | 'skipped';
export type TaskType = 'learning' | 'action' | 'reflection' | 'practice';
export type JourneyStatus = 'not_started' | 'active' | 'completed';

export interface Chapter {
  chapter_id: string;
  title: string;
  order: number;
  status: ChapterStatus;
  progress_percent: number;
  nodes: JourneyNode[];
}

export interface JourneyNode {
  id: string;
  chapter_id: string;
  title: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
  estimated_time: number;
  position: { x: number; y: number };
  environment: EnvironmentType;
  tasks: string[];
  icon: string;
  created_at: string;
}

export type EnvironmentType = 
  | 'code-tower' 
  | 'server-building' 
  | 'terminal-station' 
  | 'project-lab' 
  | 'portfolio-district' 
  | 'interview-tower' 
  | 'offer-castle';

export interface CareerJourney {
  journey_id: string;
  profession: string;
  total_days: number;
  current_day: number;
  current_chapter: number;
  status: JourneyStatus;
  chapters: Chapter[];
}

export interface CareerScore {
  total_score: number;
  resume_score: number;
  positioning_score: number;
  applications_score: number;
  interview_preparation_score: number;
  interview_practice_score: number;
  consistency_score: number;
}

export interface ConfidenceScore {
  value: number;
  source: 'onboarding' | 'self_assessment' | 'interview_session';
}

export interface SelfAssessment {
  chapter_id: string;
  user_score: number;
  system_estimate: number;
  gap: number;
  recommendation: string;
}

export interface Note {
  note_id: string;
  task_id: string;
  content: string;
  created_at: string;
}

export interface TaskCompletion {
  task_id: string;
  completed_at: string;
  user_notes: string;
  difficulty_rating: number;
}

export interface ProgressState {
  currentNodeId: string | null;
  completedNodeIds: string[];
  unlockedNodeIds: string[];
  journeyStarted: boolean;
  journeyCompleted: boolean;
  careerScore: CareerScore;
  confidenceScore: ConfidenceScore | null;
  currentDay: number;
}

export type TabId = 'journey' | 'tasks' | 'progress' | 'profile';

export interface GoalCardData {
  title: string;
  description: string;
  progress: number;
  nextAction: string;
  category: string;
}