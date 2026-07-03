import { useEffect } from 'react';
import { useWorldCssStyle } from '@/core/world/useWorldCssStyle';

interface BridgeRestoreScreenProps {
  fromChapterTitle: string;
  toChapterTitle: string;
  /** Called once the restore animation has finished playing. */
  onDone: () => void;
}

const RESTORE_DURATION_MS = 1600;

/**
 * BridgeRestoreScreen — transitional beat between "chapter complete" and
 * the camera rising into the next chapter (TASK: WORLD PROGRESSION REWORK,
 * step 4). Placeholder art: WorldRenderer doesn't paint real bridges yet
 * (see world_renderer.tsx — bridges/islands are debug-only until the
 * artist pipeline delivers real world art). This is a lightweight SVG
 * stand-in using the profession's theme accent, not final art.
 */
export function BridgeRestoreScreen({ fromChapterTitle, toChapterTitle, onDone }: BridgeRestoreScreenProps) {
  const worldStyle = useWorldCssStyle();

  useEffect(() => {
    const t = setTimeout(onDone, RESTORE_DURATION_MS);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="bridge-restore-screen" style={worldStyle}>
      <div className="bridge-restore-content">
        <svg className="bridge-restore-svg" viewBox="0 0 320 120" fill="none">
          <circle cx="30" cy="80" r="14" className="bridge-pillar" />
          <circle cx="290" cy="80" r="14" className="bridge-pillar" />
          <path
            className="bridge-path"
            d="M30 80 Q160 20 290 80"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {Array.from({ length: 7 }).map((_, i) => {
            const t = (i + 1) / 8;
            const x = 30 + (290 - 30) * t;
            const y = 80 - Math.sin(t * Math.PI) * 60;
            return (
              <rect
                key={i}
                className="bridge-plank"
                x={x - 3}
                y={y - 3}
                width="6"
                height="6"
                style={{ animationDelay: `${0.15 + i * 0.09}s` }}
              />
            );
          })}
        </svg>
        <p className="bridge-restore-label">
          <span className="bridge-restore-from">{fromChapterTitle}</span>
          <span className="bridge-restore-arrow">→</span>
          <span className="bridge-restore-to">{toChapterTitle}</span>
        </p>
      </div>
    </div>
  );
}
