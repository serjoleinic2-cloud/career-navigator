import type { SkillNode } from '@/core/skill_state';

const CHAPTER_ACCENT: Record<string, string> = {
  resume: '#4A90D9',
  linkedin: '#7B68EE',
  applications: '#F6AD55',
  interview: '#4A5568',
  offer: '#48BB78',
};

const DEFAULT_ACCENT = '#4A90D9';

export type NodeVisualState = 'completed' | 'current' | 'unlocked' | 'locked';

interface PathNodeProps {
  node: SkillNode;
  visualState: NodeVisualState;
  onSelect: (nodeId: string) => void;
}

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function PathNode({ node, visualState, onSelect }: PathNodeProps) {
  const accentColor = CHAPTER_ACCENT[node.domain?.toLowerCase()] || DEFAULT_ACCENT;

  const handleClick = () => {
    if (visualState === 'locked') return;
    onSelect(node.id);
  };

  const isCompleted = visualState === 'completed';
  const isCurrent = visualState === 'current';
  const isUnlocked = visualState === 'unlocked';
  const isLocked = visualState === 'locked';

  return (
    <div
      className={`path-node path-node--${visualState}`}
      onClick={handleClick}
      role="button"
      tabIndex={isLocked ? -1 : 0}
      aria-label={`${node.skill} - ${visualState}`}
    >
      <div className="path-node-connector">
        <div className="path-node-line" />
      </div>

      <div
        className="path-node-circle"
        style={{
          '--node-accent': isCurrent || isCompleted ? accentColor : undefined,
        } as React.CSSProperties}
      >
        {isCompleted && (
          <svg className="checkmark-icon" viewBox="0 0 24 24" width="24" height="24">
            <path d="M6 12l4 4 8-8" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {isCurrent && (
          <span className="current-dot" />
        )}
        {isUnlocked && (
          <span className="unlocked-dot" />
        )}
        {isLocked && (
          <svg className="lock-icon" viewBox="0 0 24 24" width="16" height="16">
            <rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor" opacity="0.5" />
            <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
          </svg>
        )}
      </div>

      {isCurrent && (
        <div className="current-node-glow" style={{ background: accentColor }} />
      )}

      <div className="path-node-label">
        <span className="path-node-skill">{node.skill}</span>
        <span className="path-node-time">{formatTime(node.estimatedMinutes)}</span>
      </div>
    </div>
  );
}
