import { GlassCard } from '@/components/layout/GlassCard';
import { PrimaryButton } from '@/components/layout/PrimaryButton';
import type { TaskResult } from '@/core/task/task_execution_engine';
import './ResultCard.css';

interface ResultCardProps {
  result: TaskResult;
  onContinue: () => void;
}

export function ResultCard({ result, onContinue }: ResultCardProps) {
  return (
    <GlassCard className="result-card">
      <div className="result-card-icon">🎉</div>
      <h3 className="result-card-title">Mission Complete</h3>

      <div className="result-card-stats">
        {result.readinessDelta !== undefined && (
          <div className="result-card-stat">
            <span className="result-card-stat-value">+{result.readinessDelta}</span>
            <span className="result-card-stat-label">Readiness</span>
          </div>
        )}
        {result.confidenceDelta !== undefined && (
          <div className="result-card-stat">
            <span className="result-card-stat-value">+{Math.round(result.confidenceDelta * 100)}%</span>
            <span className="result-card-stat-label">Confidence</span>
          </div>
        )}
        <div className="result-card-stat">
          <span className="result-card-stat-value">+100</span>
          <span className="result-card-stat-label">XP</span>
        </div>
      </div>

      <p className="result-card-unlock">Unlocked: Next Mission</p>

      <PrimaryButton onClick={onContinue}>Continue Journey</PrimaryButton>
    </GlassCard>
  );
}
