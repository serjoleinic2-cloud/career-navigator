export type ViralMetrics = {
  sharesCount: number;
  exportsCount: number;
  topSharedChapter: string | null;
  averageReadinessAtShare: number;
  shareHistory: ShareEvent[];
};

export type ShareEvent = {
  timestamp: number;
  chapterId: string;
  readinessScore: number;
  format: string;
};

export function createViralMetrics(): ViralMetrics {
  return {
    sharesCount: 0,
    exportsCount: 0,
    topSharedChapter: null,
    averageReadinessAtShare: 0,
    shareHistory: [],
  };
}

export function recordShare(
  metrics: ViralMetrics,
  chapterId: string,
  readinessScore: number,
  format: string
): ViralMetrics {
  const newEvent: ShareEvent = {
    timestamp: Date.now(),
    chapterId,
    readinessScore,
    format,
  };

  const newHistory = [...metrics.shareHistory, newEvent];
  const totalReadiness = newHistory.reduce((sum, e) => sum + e.readinessScore, 0);

  const chapterCounts = new Map<string, number>();
  for (const event of newHistory) {
    chapterCounts.set(event.chapterId, (chapterCounts.get(event.chapterId) ?? 0) + 1);
  }
  const topSharedChapter = Array.from(chapterCounts.entries())
    .sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  return {
    ...metrics,
    sharesCount: metrics.sharesCount + 1,
    shareHistory: newHistory,
    topSharedChapter,
    averageReadinessAtShare: Math.round(totalReadiness / newHistory.length),
  };
}

export function recordExport(metrics: ViralMetrics): ViralMetrics {
  return {
    ...metrics,
    exportsCount: metrics.exportsCount + 1,
  };
}
