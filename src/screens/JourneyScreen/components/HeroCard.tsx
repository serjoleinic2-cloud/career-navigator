import { GlassCard } from '@/components/layout/GlassCard';
import { ProgressRing } from '@/components/layout/ProgressRing';
import { PrimaryButton } from '@/components/layout/PrimaryButton';
import './HeroCard.css';

interface HeroCardProps {
  chapterTitle: string;
  skillName: string;
  taskProgress: string;
  readinessScore: number;
  confidenceScore: number;
  hasActiveTask: boolean;
  onAction: () => void;
}

export function HeroCard({ chapterTitle, skillName, taskProgress, readinessScore, confidenceScore, hasActiveTask, onAction }: HeroCardProps) {
  return (
    <GlassCard className="hero-card">
      <div className="hero-card-top">
        <div className="hero-card-info">
          <span className="hero-card-chapter">{chapterTitle}</span>
          <h2 className="hero-card-skill">{skillName}</h2>
          <span className="hero-card-progress">{taskProgress}</span>
        </div>
        <ProgressRing progress={readinessScore} size={72} strokeColor="#FF6B6B" />
      </div>
      <div className="hero-card-scores">
        <div className="hero-card-score">
          <span className="hero-card-score-value">{readinessScore}%</span>
          <span className="hero-card-score-label">Readiness</span>
        </div>
        <div className="hero-card-score">
          <span className="hero-card-score-value">{confidenceScore}%</span>
          <span className="hero-card-score-label">Confidence</span>
        </div>
      </div>
      <PrimaryButton onClick={onAction}>
        {hasActiveTask ? 'Continue' : 'Start Task'}
      </PrimaryButton>
    </GlassCard>
  );
}
