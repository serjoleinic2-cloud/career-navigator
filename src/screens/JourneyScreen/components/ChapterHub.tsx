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
  const accent = getChapterAccent(worldTheme, chapter.id);

  return (
    <div
      className="chapter-hub chapter-hub-single"
      style={{ '--island-accent': accent } as React.CSSProperties}
    >
      {/* === ISLAND ART SLOT ===
          Место под картинку острова от художника. Размер: 280×200px.
          Когда арт готов — передать PNG/WebP этого размера, заменить
          <div className="island-art-placeholder"> на <img src="..." />.
          Атмосферное свечение island-art-glow остаётся поверх арта. */}
      <div className="island-art-slot">
        <div className="island-art-glow" style={{ background: accent }} />
        <div className="island-art-placeholder">
          {/* TODO: заменить на <img src={worldImageUrl} alt={chapter.title} /> */}
          <span className="island-art-icon">{chapter.icon}</span>
        </div>
      </div>

      {/* === ISLAND LABEL — просто текст, без рамки/фона === */}
      <div className="island-label-row">
        <span className="island-label-title">{chapter.title}</span>
        <span className="island-label-count">{chapter.completedCount}/{chapter.totalCount}</span>
      </div>

      {/* === MISSION ROWS — плоские строки, разделены тонкой линией === */}
      <div className="island-missions">
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
  );
}

export type { ChapterData };
