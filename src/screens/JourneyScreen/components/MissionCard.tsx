import { Icon } from '@/components/Icon/Icon';
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
        <span><Icon name="clock" size={14} /> {task.estimatedMinutes} min</span>
        <span>Difficulty: {Array.from({ length: 5 }, (_, i) => (
          <Icon key={i} name="star" size={12} color={i < Math.round(task.difficulty) ? '#ffd700' : '#555'} />
        ))}</span>
      </div>
      <PrimaryButton onClick={onStart}>Start Mission</PrimaryButton>
    </GlassCard>
  );
}
