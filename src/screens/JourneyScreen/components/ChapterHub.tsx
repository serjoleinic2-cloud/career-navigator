import type { SkillNode } from '@/core/skill_state';
import { SkillNodeCard, type NodeCardState } from './SkillNodeCard';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getWorldThemeOrDefault, getChapterAccent } from '@/core/world/world_theme';

interface ChapterData {
  id: string;
  title: string;
  icon: string;
  nodes: SkillNode[];
  completedCount: number;
  totalCount: number;
  isActive: boolean;
  isLocked: boolean;
  isCompleted: boolean;
}

interface ChapterHubProps {
  chapters: ChapterData[];
  activeNodeId: string | null;
  selectedChapter: string | null;
  onChapterSelect: (chapterId: string) => void;
  onNodeSelect: (nodeId: string) => void;
}

function getNodeCardState(node: SkillNode, activeNodeId: string | null): NodeCardState {
  if (node.id === activeNodeId) return 'current';
  if (node.state === 'confidence' || node.state === 'execution') return 'completed';
  return 'locked';
}

export function ChapterHub({
  chapters,
  activeNodeId,
  selectedChapter,
  onChapterSelect,
  onNodeSelect,
}: ChapterHubProps) {
  const hubDismissed = selectedChapter !== null;
  const worldTheme = getWorldThemeOrDefault(getRuntimeState()?.professionId ?? 'default');

  return (
    <div className="chapter-hub">
      {chapters.map(chapter => {
        const isExpanded = chapter.id === selectedChapter;
        const isHidden = hubDismissed && !isExpanded;

        return (
          <div
            key={chapter.id}
            className={`chapter-island ${chapter.isCompleted ? 'island-completed' : ''} ${chapter.isActive ? 'island-active' : ''} ${chapter.isLocked ? 'island-locked' : ''} ${isExpanded ? 'island-expanded' : ''} ${isHidden ? 'island-hidden' : ''}`}
            onClick={() => !chapter.isLocked && onChapterSelect(chapter.id)}
            role="button"
            tabIndex={chapter.isLocked ? -1 : 0}
            style={{ '--island-accent': getChapterAccent(worldTheme, chapter.id) } as React.CSSProperties}
          >
            <div className="island-content">
              <div className="island-emblema">
                {chapter.isCompleted ? (
                  <div className="island-complete-badge">
                    <svg viewBox="0 0 24 24" width="32" height="32">
                      <path d="M6 12l4 4 8-8" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ) : (
                  <span className="island-icon">{chapter.icon}</span>
                )}
              </div>
              <h3 className="island-title">{chapter.title}</h3>
              <span className="island-count">{chapter.completedCount}/{chapter.totalCount} skills</span>

              {(chapter.isCompleted || chapter.isActive) && (
                <div className="island-glow" style={{ background: getChapterAccent(worldTheme, chapter.id) }} />
              )}

              {chapter.isLocked && (
                <div className="island-fog">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor" />
                    <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              )}
            </div>

            {/* Expanded node cards */}
            {isExpanded && (
              <div className="chapter-nodes-container">
                <div className="chapter-nodes-path">
                  <svg className="nodes-path-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      d="M50 0 Q80 25 50 50 Q20 75 50 100"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="6 4"
                    />
                  </svg>
                </div>
                {chapter.nodes.map((skillNode, idx) => {
                  const taskProgress = 0;
                  return (
                    <SkillNodeCard
                      key={skillNode.id}
                      node={skillNode}
                      state={getNodeCardState(skillNode, activeNodeId)}
                      index={idx}
                      progress={taskProgress}
                      onSelect={onNodeSelect}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export type { ChapterData };
