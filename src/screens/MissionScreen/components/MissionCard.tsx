import { GlassCard } from '@/components/layout/GlassCard';
import { PrimaryButton } from '@/components/layout/PrimaryButton';
import { Icon } from '@/components/Icon/Icon';
import type { TaskContent } from '@/core/task_content';

interface MissionCardProps {
  task: TaskContent;
  onStart: () => void;
}

const DIFFICULTY_MAP: Record<number, string> = {
  1: 'Easy',
  2: 'Easy',
  3: 'Medium',
  4: 'Hard',
  5: 'Hard',
};

export function MissionCard({ task, onStart }: MissionCardProps) {
  const difficultyLabel = DIFFICULTY_MAP[task.difficulty] || 'Easy';

  return (
    <div className="mission-card-wrapper">
      <GlassCard className="mission-card-glass">
        <div className="mission-card-emoji"><Icon name="target" /></div>
        <h2 className="mission-card-heading">Mission</h2>
        <h3 className="mission-card-title">{task.title}</h3>

        <div className="mission-card-section">
          <span className="mission-card-label">Objective</span>
          <p className="mission-card-objective">{task.objective}</p>
        </div>

        <div className="mission-card-meta">
          <div className="mission-card-meta-item">
            <span className="mission-card-meta-label">Duration</span>
            <span className="mission-card-meta-value">{task.estimatedMinutes} minutes</span>
          </div>
          <div className="mission-card-meta-item">
            <span className="mission-card-meta-label">Difficulty</span>
            <span className="mission-card-meta-value">{difficultyLabel}</span>
          </div>
        </div>

        <PrimaryButton onClick={onStart}>Start Mission</PrimaryButton>
      </GlassCard>
    </div>
  );
}
