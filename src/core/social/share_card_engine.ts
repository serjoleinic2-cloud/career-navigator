import type { ShareState } from './share_state_builder';

export type ShareMetric = {
  label: string;
  value: string;
  color: string;
};

export type ShareBadge = {
  text: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
};

export type ShareProgressBar = {
  label: string;
  percent: number;
  color: string;
};

export type ShareCardLayout = {
  title: string;
  subtitle: string;
  metrics: ShareMetric[];
  badges: ShareBadge[];
  progressBars: ShareProgressBar[];
};

export function generateShareCard(state: ShareState): ShareCardLayout {
  const metrics: ShareMetric[] = [
    { label: 'Readiness', value: `${state.readinessScore}%`, color: '#7c5cff' },
    { label: 'Confidence', value: `${state.confidenceScore}%`, color: '#4ade80' },
  ];

  const badges: ShareBadge[] = [];
  if (state.completedChapters.length >= 1) {
    badges.push({ text: 'First Chapter', icon: 'star', tier: 'bronze' });
  }
  if (state.completedChapters.length >= 3) {
    badges.push({ text: 'Halfway', icon: 'trophy', tier: 'silver' });
  }
  if (state.confidenceScore >= 80) {
    badges.push({ text: 'Confident', icon: 'crown', tier: 'gold' });
  }
  if (state.readinessScore >= 90) {
    badges.push({ text: 'Ready', icon: 'diamond', tier: 'platinum' });
  }

  const progressBars: ShareProgressBar[] = [
    { label: 'Overall Readiness', percent: state.readinessScore, color: '#7c5cff' },
    { label: 'Confidence Level', percent: state.confidenceScore, color: '#4ade80' },
  ];

  return {
    title: `${state.professionTitle} Journey`,
    subtitle: `Chapter: ${state.currentChapter}`,
    metrics,
    badges,
    progressBars,
  };
}
