import { Icon } from '@/components/Icon/Icon';
import type { SkillNode } from '@/core/skill_state';
import { PrimaryButton } from '@/components/layout/PrimaryButton';

interface FloatingMissionCardProps {
  node: SkillNode;
  onContinue: () => void;
  onClose: () => void;
}

export function FloatingMissionCard({ node, onContinue, onClose }: FloatingMissionCardProps) {
  const taskCount = node.tasks?.length || 0;
  const difficultyStars = node.difficulty || 1;

  return (
    <div className="floating-mission-card-overlay" onClick={onClose}>
      <div className="floating-mission-card" onClick={e => e.stopPropagation()}>
        <button className="mission-card-close" onClick={onClose} aria-label="Close">
          <Icon name="close" size={16} />
        </button>

        <div className="mission-card-header">
          <span className="mission-card-domain">{node.domain}</span>
          <h3 className="mission-card-title">{node.skill}</h3>
        </div>

        <div className="mission-card-body">
          <div className="mission-card-row">
            <span className="mission-card-label">Tasks</span>
            <span className="mission-card-value">{taskCount} task{taskCount !== 1 ? 's' : ''}</span>
          </div>
          <div className="mission-card-row">
            <span className="mission-card-label">Estimated time</span>
            <span className="mission-card-value">{node.estimatedMinutes} min</span>
          </div>
          <div className="mission-card-row">
            <span className="mission-card-label">Difficulty</span>
            <span className="mission-card-stars">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={`star ${i < difficultyStars ? 'star--filled' : ''}`}>
                  <Icon name="star" size={12} />
                </span>
              ))}
            </span>
          </div>
        </div>

        <PrimaryButton onClick={onContinue}>
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
}
