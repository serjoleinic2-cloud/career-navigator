import type { SkillNode } from '@/core/skill_state';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getActiveProfessionId } from '@/core/profession_loader';
import { getWorldThemeOrDefault, getChapterAccent } from '@/core/world/world_theme';
import { SkillNodeCard, type NodeCardState } from './SkillNodeCard';
import './ChapterHub.css';

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
  /** Filename of the island art (e.g. 'island-resume.png'), sourced from
   * the profession's chapters.ts — single source of truth, see chapter_model.ts. */
  artFilename?: string;
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

  const professionId = getRuntimeState()?.professionId ?? getActiveProfessionId() ?? 'software_engineer';
  const worldTheme = getWorldThemeOrDefault(professionId);
  const accent = getChapterAccent(worldTheme, chapter.id);
  const artSrc = chapter.artFilename ? `art/${professionId}/${chapter.artFilename}` : '';

  return (
    <div
      className="chapter-hub chapter-hub-single"
      style={{ '--island-accent': accent } as React.CSSProperties}
    >
      {/* === ISLAND ART SLOT ===
          Арт острова. Файл: public/art/<professionId>/<artFilename>.
          artFilename задаётся в chapters.ts профессии (единственный источник
          правды — раньше дублировался в ChapterHub и FinalCinematicScreen
          отдельными хардкод-мапами, что и вызывало баги с несовпадением имён).
          Размер: 280×200px, PNG с прозрачным фоном.
          Если файла нет — автоматически показывается иконка-плейсхолдер.
          BUGFIX (2026-07-11): key={chapter.id} обязателен. onLoad/onError
          мутируют DOM через img.style.display/fallback.style.display напрямую
          (не через React state), поэтому при смене chapter без ремонтирования
          эти inline-стили от предыдущей главы остаются в DOM — например, если
          Interviews скрыл placeholder через onLoad, при переходе в Offer
          placeholder остаётся скрытым, и парящий остров Offer не появляется,
          даже если файл есть. key={chapter.id} гарантирует, что при каждой
          смене главы React полностью пересоздаёт весь слот с чистым DOM. */}
      <div key={chapter.id} className="island-art-slot">
        <div className="island-art-glow" style={{ background: accent }} />
        {artSrc && (
          <img
            className="island-art-img"
            src={artSrc}
            alt={chapter.title}
            onLoad={(e) => {
              const fallback = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = 'none';
            }}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              console.warn('[ChapterHub] island art not found:', img.src);
              img.style.display = 'none';
              const fallback = img.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        )}
        <div className="island-art-placeholder" style={{ display: artSrc ? 'none' : 'flex' }}>
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
