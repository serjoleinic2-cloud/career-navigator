import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { getWorldThemeOrDefault, getChapterAccent } from '@/core/world/world_theme';
import { emit } from '@/core/events/system_event_bus';
import './FinalCinematicScreen.css';

export interface CinematicChapter {
  id: string;
  title: string;
  completed: boolean;
}

interface FinalCinematicScreenProps {
  professionId: string;
  chapters: CinematicChapter[];
  onComplete: () => void;
}

const CHAPTER_ART: Record<string, string> = {
  resume: 'island-resume.png',
  linkedin: 'island-linkedin.png',
  applications: 'island-applications.png',
  interviews: 'island-interview.png',
  offer_preparation: 'island-offer.png',
  offer: 'island-offer.png',
};

// Virtual layout constants (px in world space)
const ISLAND_SPACING = 240;  // distance between island centres
// ISLAND_W = 160 (island card width, matches CSS .fc-slot width)
const ISLAND_H = 120;
const HUD_FADE_MS = 900;
const BRIDGE_MS = 1900;
const BRIDGE_PAUSE_MS = 350;
const ZOOM_MS = 2400;
const CROSSFADE_MS = 1300;

type Phase = 'hud-fade' | 'building' | 'zoom-out' | 'crossfade' | 'hero';

export function FinalCinematicScreen({ professionId, chapters, onComplete }: FinalCinematicScreenProps) {
  const theme = useMemo(() => getWorldThemeOrDefault(professionId), [professionId]);

  /**
   * Islands array — index 0 = Resume (first chapter, sits at the BOTTOM of the world).
   * In DOM we position them top-to-bottom, so island[0] has the largest `top` value.
   */
  const islands = useMemo(() => chapters.map((ch) => {
    const id = ch.id.toLowerCase();
    const file = CHAPTER_ART[id];
    return {
      id: ch.id,
      title: ch.title,
      artSrc: file ? `/art/${professionId}/${file}` : '',
      accent: getChapterAccent(theme, id),
    };
  }), [chapters, professionId, theme]);

  const N = islands.length;

  // ── State ────────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>('hud-fade');
  const [bridgesDone, setBridgesDone]     = useState(0);   // fully completed bridges
  const [bridgeProg, setBridgeProg]       = useState(0);   // 0→1 for bridge currently drawing
  const [islandGlow, setIslandGlow]       = useState<boolean[]>(() => Array(N).fill(false));
  const [labelVis, setLabelVis]           = useState<boolean[]>(() => Array(N).fill(false));
  const [cameraY, setCameraY]             = useState(0);
  const [cameraScale, setCameraScale]     = useState(1);
  const [worldOpacity, setWorldOpacity]   = useState(1);
  const [heroLoaded, setHeroLoaded]       = useState(false);
  const [heroError, setHeroError]         = useState(false);

  const rafRef = useRef<number | null>(null);

  // ── Layout helpers ───────────────────────────────────────────────────────
  // island[i] (0=Resume=bottom) top edge in the column:
  //   column runs top→bottom; island[0] is at the bottom
  //   DOM top of island[i] = (N - 1 - i) * ISLAND_SPACING
  const islandTop = useCallback((i: number) => (N - 1 - i) * ISLAND_SPACING, [N]);
  const islandCY  = useCallback((i: number) => islandTop(i) + ISLAND_H / 2, [islandTop]);

  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

  // cameraY that centres island[i] on screen (with a given scale)
  const targetCamY = useCallback(
    (i: number, scale = 1) => vh / 2 - islandCY(i) * scale,
    [vh, islandCY]
  );

  // ── Phase 1: hud-fade ────────────────────────────────────────────────────
  useEffect(() => {
    setCameraY(targetCamY(0));

    // Light up island 0 immediately
    const t0 = setTimeout(() => {
      setIslandGlow(g => { const n = [...g]; n[0] = true; return n; });
      setLabelVis(v  => { const n = [...v]; n[0] = true; return n; });
    }, 200);

    const t1 = setTimeout(() => setPhase('building'), HUD_FADE_MS);
    return () => { clearTimeout(t0); clearTimeout(t1); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Phase 2: building — animate bridges one by one ───────────────────────
  const animateBridge = useCallback((idx: number) => {
    const fromY = targetCamY(idx);
    const toY   = targetCamY(idx + 1);
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / BRIDGE_MS, 1);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // ease-in-out
      setBridgeProg(t);
      setCameraY(fromY + (toY - fromY) * e);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Bridge complete
        setBridgesDone(d => d + 1);
        setBridgeProg(0);
        setIslandGlow(g => { const n = [...g]; n[idx + 1] = true; return n; });
        setLabelVis(v  => { const n = [...v]; n[idx + 1] = true; return n; });
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [targetCamY]);

  useEffect(() => {
    if (phase !== 'building') return;

    if (bridgesDone >= N - 1) {
      // All bridges done → zoom out
      const t = setTimeout(() => setPhase('zoom-out'), BRIDGE_PAUSE_MS + 400);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => animateBridge(bridgesDone), BRIDGE_PAUSE_MS);
    return () => {
      clearTimeout(t);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase, bridgesDone, N, animateBridge]);

  // ── Phase 3: zoom-out — scale down to show all islands ───────────────────
  useEffect(() => {
    if (phase !== 'zoom-out') return;

    const totalH = (N - 1) * ISLAND_SPACING + ISLAND_H;
    const targetScale = Math.min((vh * 0.75) / totalH, 0.5);
    const targetY     = vh / 2 - (totalH / 2) * targetScale;
    const startY      = cameraY;
    const startScale  = cameraScale;
    const start       = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / ZOOM_MS, 1);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setCameraScale(startScale + (targetScale - startScale) * e);
      setCameraY(startY + (targetY - startY) * e);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Hold for 700ms then crossfade
        const hold = setTimeout(() => setPhase('crossfade'), 700);
        return () => clearTimeout(hold);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ── Phase 4: crossfade — world fades to black, then hero appears ─────────
  useEffect(() => {
    if (phase !== 'crossfade') return;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / CROSSFADE_MS, 1);
      setWorldOpacity(1 - t);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase('hero');
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [phase]);

  // ── Render ───────────────────────────────────────────────────────────────
  const colHeight = (N - 1) * ISLAND_SPACING + ISLAND_H + 80;
  const heroSrc   = `/art/${professionId}/island_software_engineer.png`;

  return createPortal(
    <div className="fc-root">
      {/* ── World scene (visible during hud-fade / building / zoom-out / crossfade) ── */}
      {phase !== 'hero' && (
        <div className="fc-world" style={{ opacity: worldOpacity, transition: 'none' }}>
          {/* Blackout layer fades away during hud-fade */}
          <div
            className="fc-blackout"
            style={{
              opacity: phase === 'hud-fade' ? 1 : 0,
              transition: `opacity ${HUD_FADE_MS}ms ease`,
            }}
          />

          {/* Camera */}
          <div
            className="fc-camera"
            style={{ transform: `translateY(${cameraY}px) scale(${cameraScale})`, transformOrigin: '50% 0' }}
          >
            <div className="fc-col" style={{ height: colHeight }}>
              {islands.map((isl, i) => {
                const top    = islandTop(i);
                const glowing = islandGlow[i];
                const showLabel = labelVis[i];

                // Bridge from island[i] upward to island[i+1]
                // In DOM: island[i+1] has a smaller top value (higher on screen)
                // Bridge height = difference in top positions = ISLAND_SPACING
                const bridgeDrawn   = bridgesDone > i;
                const bridgeDrawing = phase === 'building' && bridgesDone === i;
                const bProg = bridgeDrawing ? bridgeProg : (bridgeDrawn ? 1 : 0);

                return (
                  <div key={isl.id} className="fc-slot" style={{ top }}>
                    {/* Bridge: positioned above the island, goes up ISLAND_SPACING px */}
                    {i < N - 1 && (
                      <svg
                        className="fc-bridge"
                        width="60"
                        height={ISLAND_SPACING}
                        viewBox={`0 0 60 ${ISLAND_SPACING}`}
                      >
                        <defs>
                          <linearGradient id={`fcg${i}`} x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%"   stopColor={isl.accent} stopOpacity="0.95" />
                            <stop offset="100%" stopColor={islands[i + 1]?.accent ?? isl.accent} stopOpacity="0.95" />
                          </linearGradient>
                          <filter id={`fcf${i}`} x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                          </filter>
                        </defs>
                        {/* Line drawn bottom→top as bProg increases */}
                        <line
                          x1="30" y1={ISLAND_SPACING}
                          x2="30" y2={ISLAND_SPACING * (1 - bProg)}
                          stroke={`url(#fcg${i})`}
                          strokeWidth="4"
                          strokeLinecap="round"
                          filter={`url(#fcf${i})`}
                        />
                        {/* Travelling dot */}
                        {bridgeDrawing && bProg > 0 && bProg < 0.98 && (
                          <circle
                            cx="30"
                            cy={ISLAND_SPACING * (1 - bProg)}
                            r="6"
                            fill={isl.accent}
                            filter={`url(#fcf${i})`}
                          />
                        )}
                      </svg>
                    )}

                    {/* Island */}
                    <div
                      className={`fc-island${glowing ? ' fc-island--lit' : ''}`}
                      style={{ '--acc': isl.accent, opacity: glowing ? 1 : 0.12 } as React.CSSProperties}
                    >
                      {isl.artSrc
                        ? <img className="fc-island-img" src={isl.artSrc} alt={isl.title}
                            onError={e => {
                              (e.currentTarget as HTMLImageElement).style.display = 'none';
                              const fb = e.currentTarget.nextSibling as HTMLElement | null;
                              if (fb) fb.style.display = 'flex';
                            }}
                          />
                        : null
                      }
                      <div className="fc-island-fallback" style={{ display: isl.artSrc ? 'none' : 'flex' }}>
                        {isl.title[0]}
                      </div>
                    </div>

                    {/* Label */}
                    <span
                      className="fc-label"
                      style={{
                        opacity: showLabel ? 1 : 0,
                        transform: showLabel ? 'translateX(0)' : 'translateX(10px)',
                        transition: 'opacity 0.45s ease, transform 0.45s ease',
                      }}
                    >
                      {isl.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Hero screen ── */}
      {phase === 'hero' && (
        <div className="fc-hero">
          {!heroError
            ? <img
                className="fc-hero-img"
                src={heroSrc}
                alt="Software Engineer"
                onLoad={() => setHeroLoaded(true)}
                onError={() => setHeroError(true)}
                style={{ opacity: heroLoaded ? 1 : 0, transition: 'opacity 1s ease' }}
              />
            : <div className="fc-hero-fallback">🏙️</div>
          }

          {/* Bottom gradient scrim */}
          <div className="fc-hero-scrim" />

          <div
            className="fc-hero-content"
            style={{
              opacity: heroLoaded || heroError ? 1 : 0,
              transition: 'opacity 1.1s ease 0.4s',
            }}
          >
            <p className="fc-hero-sub">Journey Complete</p>
            <h1 className="fc-hero-title">Software Engineer</h1>

            <div className="fc-hero-actions">
              <button
                className="fc-btn fc-btn--primary"
                onClick={() => { onComplete(); emit('START_INTERVIEW_TRAINER', {}); }}
              >
                Перейти к интервью
              </button>
              <button
                className="fc-btn fc-btn--ghost"
                onClick={() => { onComplete(); emit('RESET_JOURNEY', {}); }}
              >
                Выбрать новую профессию
              </button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
