import type { SkillNode } from '@/core/skill_state';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getActiveProfessionId } from '@/core/profession_loader';
import { getWorldThemeOrDefault, getChapterAccent } from '@/core/world/world_theme';
import { SkillNodeCard, type NodeCardState } from './SkillNodeCard';

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
  /**
   * The single chapter currently being worked on. WORLD PROGRESSION REWORK:
   * the HUD never shows a list of chapter cards — only the active one.
   * Past and future chapters exist purely as world objects in
   * WorldRenderer (see src/world/world_renderer.tsx), not as HUD cards.
   */
  chapter: ChapterData | null;
  activeNodeId: string | null;
  onNodeSelect: (nodeId: string) => void;
}

function getNodeCardState(node: SkillNode, activeNodeId: string | null): NodeCardState {
  if (node.id === activeNodeId) return 'current';
  if (node.state === 'confidence' || node.state === 'execution') return 'completed';
  return 'locked';
}

export function ChapterHub({ chapter, activeNodeId, onNodeSelect }: ChapterHubProps) {
  if (!chapter) return null;

  const worldTheme = getWorldThemeOrDefault(getRuntimeState()?.professionId ?? getActiveProfessionId() ?? 'default');

  return (
    <div className="chapter-hub chapter-hub-single">
      <div
        key={chapter.id}
        className="chapter-island island-active island-expanded"
        style={{ '--island-accent': getChapterAccent(worldTheme, chapter.id) } as React.CSSProperties}
      >
        <div className="island-content">
          <div className="island-emblema">
            <span className="island-icon">{chapter.icon}</span>
          </div>
          <h3 className="island-title">{chapter.title}</h3>
          <span className="island-count">{chapter.completedCount}/{chapter.totalCount} skills</span>
          <div className="island-glow" style={{ background: getChapterAccent(worldTheme, chapter.id) }} />
        </div>

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
          {chapter.nodes.map((skillNode, idx) => (
            <SkillNodeCard
              key={skillNode.id}
              node={skillNode}
              state={getNodeCardState(skillNode, activeNodeId)}
              index={idx}
              progress={0}
              onSelect={onNodeSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export type { ChapterData };
