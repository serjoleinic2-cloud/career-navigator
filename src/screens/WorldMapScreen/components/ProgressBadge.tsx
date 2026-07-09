import { Icon } from '@/components/Icon/Icon';

interface ProgressBadgeProps {
  completed: number;
  total: number;
  isCity?: boolean;
}

export function ProgressBadge({ completed, total, isCity }: ProgressBadgeProps) {
  if (isCity) {
    return (
      <div className="world-island-progress">
        <Icon name="city" size={16} color="#FFD700" />
      </div>
    );
  }

  return (
    <div className="world-island-progress">
      <span>{completed}/{total}</span>
    </div>
  );
}
