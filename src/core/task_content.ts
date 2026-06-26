export interface TaskContent {
  id: string;
  title: string;
  objective: string;
  instructions: string[];
  completionCriteria: string[];
  estimatedMinutes: number;
  difficulty: number;
  tips: string[];
  expectedOutcome: string;
}
