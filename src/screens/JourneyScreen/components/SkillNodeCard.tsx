import type { SkillNode } from '@/core/skill_state';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getActiveProfessionId } from '@/core/profession_loader';
import { getWorldThemeOrDefault, getChapterAccent } from '@/core/world/world_theme';

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

export function SkillNodeCard({ node, state, index: _index, progress, onSelect }: SkillNodeCardProps) {
  const worldTheme = getWorldThemeOrDefault(getRuntimeState()?.professionId ?? getActiveProfessionId() ?? 'default');
  const accentColor = getChapterAccent(worldTheme, node.domain ?? '');

  return (
    <div
      className={`mission-row mission-row--${state}`}
      onClick={() => state !== 'locked' && onSelect(node.id)}
      role="button"
      tabIndex={state === 'locked' ? -1 : 0}
      style={{ '--card-accent': accentColor } as React.CSSProperties}
    >
      {/* Акцентная полоска слева у активной задачи */}
      {state === 'current' && (
        <div className="mission-row-bar" style={{ background: accentColor }} />
      )}

      {/* Иконка состояния */}
      <div className="mission-row-status">
        {state === 'completed' && (
          <svg viewBox="0 0 20 20" width="18" height="18">
            <circle cx="10" cy="10" r="9" fill={accentColor} opacity="0.15" />
            <path d="M6 10l3 3 5-5" stroke={accentColor} strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        )}
        {state === 'current' && (
          <div className="mission-row-pulse" style={{ borderColor: accentColor }}>
            <div className="mission-row-pulse-dot" style={{ background: accentColor }} />
          </div>
        )}
        {state === 'locked' && (
          <svg viewBox="0 0 20 20" width="18" height="18" style={{ opacity: 0.25 }}>
            <rect x="4" y="9" width="12" height="9" rx="2" fill="currentColor" />
            <path d="M7 9V6.5a3 3 0 016 0V9" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        )}
      </div>

      {/* Текст */}
      <div className="mission-row-info">
        <span className="mission-row-title">{node.skill}</span>
        <span className="mission-row-meta">
          {node.estimatedMinutes} min · {DIFFICULTY_MAP[node.difficulty] || 'Easy'}
        </span>
      </div>

      {/* Действие */}
      {state !== 'locked' && (
        <div className="mission-row-action">
          {state === 'completed'
            ? (
              <span className="mission-row-done">
                Done
                {progress > 0 && (
                  <span className="mission-row-pct"> · {Math.round(progress)}%</span>
                )}
              </span>
            )
            : <span className="mission-row-go" style={{ color: accentColor }}>Start ›</span>
          }
        </div>
      )}

      {/* Прогресс-бар под активной строкой */}
      {state === 'current' && (
        <div className="mission-row-progress">
          <div
            className="mission-row-progress-fill"
            style={{ width: `${Math.min(progress, 100)}%`, background: accentColor }}
          />
        </div>
      )}
    </div>
  );
}
