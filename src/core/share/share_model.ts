export interface ShareModel {
  profession: string;
  completedSkills: number;
  totalSkills: number;
  readinessScore: number;
  confidenceScore: number;
  currentChapter: string;
  quote: string;
  themeColor: string;
}

export interface ShareOptions {
  hideScores?: boolean;
  hideProfession?: boolean;
  hideProgress?: boolean;
  hideQuote?: boolean;
}
