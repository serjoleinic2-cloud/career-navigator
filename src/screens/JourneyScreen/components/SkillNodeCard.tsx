import type { SkillNode } from '@/core/skill_state';

const CHAPTER_ACCENT: Record<string, string> = {
  resume: '#4A90D9',
  linkedin: '#7B68EE',
  applications: '#F6AD55',
  interview: '#4A5568',
  offer: '#48BB78',
};

const DEFAULT_ACCENT = '#4A90D9';

const DIFFICULTY_MAP: Record<number, string> = {
  1: 'Easy',
  2: 'Easy',
  3: 'Medium',
  4: 'Hard',
  5: 'Hard',
};

export type NodeCardState = 'completed' | 'current' | 'locked';

interface SkillNodeCardProps {
  node: SkillNode;
  state: NodeCardState;
  index: number;
  progress: number;
  onSelect: (nodeId: string) => void;
}

export function SkillNodeCard({ node, state, index, progress, onSelect }: SkillNodeCardProps) {
  const accentColor = CHAPTER_ACCENT[node.domain?.toLowerCase()] || DEFAULT_ACCENT;
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`skill-node-card skill-node-card--${state} ${isLeft ? 'card-left' : 'card-right'}`}
      onClick={() => state !== 'locked' && onSelect(node.id)}
      role="button"
      tabIndex={state === 'locked' ? -1 : 0}
      style={{ '--card-accent': accentColor } as React.CSSProperties}
    >
      <div className="skill-node-card-body">
        {state === 'completed' && (
          <div className="skill-node-card-bar" style={{ background: accentColor }} />
        )}
        <div className="skill-node-card-content">
          <div className="skill-node-card-icon">🎯</div>
          <div className="skill-node-card-info">
            <span className="skill-node-card-title">{node.skill}</span>
            <span className="skill-node-card-meta">
              {node.estimatedMinutes} min · {DIFFICULTY_MAP[node.difficulty] || 'Easy'}
            </span>
          </div>
          <span className="skill-node-card-play">▶</span>
        </div>
        {state === 'current' && (
          <div className="skill-node-card-progress">
            <div className="skill-node-card-progress-track">
              <div
                className="skill-node-card-progress-fill"
                style={{ width: `${Math.min(progress, 100)}%`, background: accentColor }}
              />
            </div>
          </div>
        )}
        {state === 'completed' && (
          <div className="skill-node-card-check">✓</div>
        )}
        {state === 'locked' && (
          <div className="skill-node-card-lock">
            <svg viewBox="0 0 24 24" width="14" height="14">
              <rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor" />
              <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
