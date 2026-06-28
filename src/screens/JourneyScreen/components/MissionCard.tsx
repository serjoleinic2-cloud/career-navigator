import { GlassCard } from '@/components/layout/GlassCard';
import { PrimaryButton } from '@/components/layout/PrimaryButton';
import type { TaskContent } from '@/core/task_content';
import './MissionCard.css';

interface MissionCardProps {
  task: TaskContent;
  onStart: () => void;
}

export function MissionCard({ task, onStart }: MissionCardProps) {
  return (
    <GlassCard className="mission-card">
      <h3 className="mission-card-title">Today's Mission</h3>
      <h4 className="mission-card-task">{task.title}</h4>
      <p className="mission-card-objective">{task.objective}</p>
      <div className="mission-card-meta">
        <span>⏱ {task.estimatedMinutes} min</span>
        <span>Difficulty: {'★'.repeat(Math.round(task.difficulty))}{'☆'.repeat(5 - Math.round(task.difficulty))}</span>
      </div>
      <PrimaryButton onClick={onStart}>Start Mission</PrimaryButton>
    </GlassCard>
  );
}
