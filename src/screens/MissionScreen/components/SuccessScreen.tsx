import { PrimaryButton } from '@/components/layout/PrimaryButton';
import { Icon } from '@/components/Icon/Icon';
import type { TaskResult } from '@/core/task/task_execution_engine';

interface SuccessScreenProps {
  result: TaskResult | null;
  onContinue: () => void;
}

export function SuccessScreen({ result, onContinue }: SuccessScreenProps) {
  const readinessDelta = result?.readinessDelta ?? 0;
  const confidenceDelta = result?.confidenceDelta ?? 0;

  return (
    <div className="success-screen">
      <div className="success-screen-content">
        <div className="success-icon"><Icon name="star" /></div>
        <h1 className="success-title">Mission Complete</h1>

        <div className="success-stats">
          <div className="success-stat">
            <span className="success-stat-value">+{readinessDelta}</span>
            <span className="success-stat-label">Readiness</span>
          </div>
          <div className="success-stat">
            <span className="success-stat-value">+{Math.round(confidenceDelta * 100)}%</span>
            <span className="success-stat-label">Confidence</span>
          </div>
          <div className="success-stat">
            <span className="success-stat-value"><Icon name="check" size={14} /></span>
            <span className="success-stat-label">Node mastered</span>
          </div>
        </div>

        <div className="success-action">
          <PrimaryButton onClick={onContinue}>Continue Journey</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
