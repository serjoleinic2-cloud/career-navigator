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
  resume:           'island-resume.png',
  linkedin:         'island-linkedin.png',
  applications:     'island-applications.png',
  interviews:       'island-interview.png',
  offer_preparation:'island-offer.png',
  offer:            'island-offer.png',
};

const ISLAND_SPACING = 420;
const ISLAND_H       = 280;
const ISLAND_W_VW    = 0.88;

const HUD_FADE_MS    = 900;
const BRIDGE_MS      = 2200;
const BRIDGE_PAUSE_MS= 300;
const ZOOM_MS        = 2400;
const CROSSFADE_MS   = 1300;

type Phase = 'hud-fade' | 'building' | 'zoom-out' | 'crossfade' | 'hero';

interface BridgeState {
  progress: number;
  done: boolean;
}

export function FinalCinematicScreen({ professionId, chapters, onComplete }: FinalCinematicScreenProps) {
  const theme = useMemo(() => getWorldThemeOrDefault(professionId), [professionId]);

  const islands = useMemo(() => chapters.map((ch) => {
    const id   = ch.id.toLowerCase();
    const file = CHAPTER_ART[id];
    return {
      id:     ch.id,
      title:  ch.title,
      artSrc: file ? `/art/${professionId}/${file}` : '',
      accent: getChapterAccent(theme, id),
    };
  }), [chapters, professionId, theme]);

  const N = islands.length;

  // ── Animation refs (avoid state-driven race conditions) ──
  const activeBridgeRef = useRef(-1);
  const bridgeRafRef = useRef(0);
  const camYRef = useRef(0);
  const camScaleRef = useRef(1);

  // ── State (only for rendering) ──
  const [phase,        setPhase]        = useState<Phase>('hud-fade');
  const [bridges,      setBridges]      = useState<BridgeState[]>(() =>
    Array(Math.max(N - 1, 0)).fill(null).map(() => ({ progress: 0, done: false }))
  );
  const [islandGlow,   setIslandGlow]   = useState<boolean[]>(() => Array(N).fill(false));
  const [labelVis,     setLabelVis]     = useState<boolean[]>(() => Array(N).fill(false));
  const [cameraY,      setCameraY]      = useState(0);
  const [cameraScale,  setCameraScale]  = useState(1);
  const [worldOpacity, setWorldOpacity] = useState(1);
  const [heroLoaded,   setHeroLoaded]   = useState(false);
  const [heroError,    setHeroError]    = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Viewport ──
  const vw = typeof window !== 'undefined' ? window.innerWidth  : 390;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 844;
  const ISLAND_W = Math.min(vw * ISLAND_W_VW, 440);

  // ── Layout helpers ──
  const islandTop = useCallback((i: number) => (N - 1 - i) * ISLAND_SPACING, [N]);
  const islandCX  = useCallback(() => vw / 2, [vw]);
  const islandCY  = useCallback((i: number) => islandTop(i) + ISLAND_H / 2, [islandTop]);

  const targetCamY = useCallback(
    (i: number, scale = 1) => vh / 2 - islandCY(i) * scale,
    [vh, islandCY]
  );

  // ── Draw bridges on canvas ──
  const drawBridges = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bridges.forEach((b, i) => {
      if (b.progress <= 0) return;

      const fromCY = islandCY(i)     * cameraScale + cameraY;
      const toCY   = islandCY(i + 1) * cameraScale + cameraY;
      const cx     = islandCX();

      const totalLen  = fromCY - toCY;
      const drawnLen  = totalLen * b.progress;
      const trailTop  = fromCY - drawnLen;
      const trailBot  = fromCY;

      const accent = islands[i].accent     || '#00e5e0';
      const accentB = islands[i + 1]?.accent || accent;

      const grad1 = ctx.createLinearGradient(cx, trailBot, cx, trailTop);
      grad1.addColorStop(0, accent   + 'AA');
      grad1.addColorStop(1, accentB  + 'AA');

      ctx.save();
      ctx.strokeStyle = grad1;
      ctx.lineWidth   = 18 * cameraScale;
      ctx.lineCap     = 'round';
      ctx.shadowColor = accent;
      ctx.shadowBlur  = 28;
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.moveTo(cx, trailBot);
      ctx.lineTo(cx, trailTop);
      ctx.stroke();
      ctx.restore();

      const grad2 = ctx.createLinearGradient(cx, trailBot, cx, trailTop);
      grad2.addColorStop(0, accent);
      grad2.addColorStop(1, accentB);

      ctx.save();
      ctx.strokeStyle = grad2;
      ctx.lineWidth   = 6 * cameraScale;
      ctx.lineCap     = 'round';
      ctx.shadowColor = accent;
      ctx.shadowBlur  = 16;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.moveTo(cx, trailBot);
      ctx.lineTo(cx, trailTop);
      ctx.stroke();
      ctx.restore();

      const grad3 = ctx.createLinearGradient(cx, trailBot, cx, trailTop);
      grad3.addColorStop(0, accent);
      grad3.addColorStop(1, accentB);

      ctx.save();
      ctx.strokeStyle = grad3;
      ctx.lineWidth   = 2 * cameraScale;
      ctx.lineCap     = 'round';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur  = 8;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(cx, trailBot);
      ctx.lineTo(cx, trailTop);
      ctx.stroke();
      ctx.restore();

      if (!b.done && b.progress > 0.01 && b.progress < 0.99) {
        const sparkY = trailTop;
        const r = 5 * cameraScale;

        ctx.save();
        ctx.shadowColor = accent;
        ctx.shadowBlur  = 30;

        ctx.globalAlpha = 0.4;
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(cx, sparkY, r * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(cx, sparkY, r * 1.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
        ctx.fillStyle   = '#ffffff';
        ctx.shadowBlur  = 12;
        ctx.shadowColor = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, sparkY, r * 0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = accent;
        ctx.lineWidth   = 1.5 * cameraScale;
        ctx.globalAlpha = 0.5;
        ctx.shadowBlur  = 12;
        ctx.beginPath();
        ctx.moveTo(cx - 18 * cameraScale, sparkY);
        ctx.lineTo(cx + 18 * cameraScale, sparkY);
        ctx.stroke();

        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.moveTo(cx, sparkY - 22 * cameraScale);
        ctx.lineTo(cx, sparkY + 8 * cameraScale);
        ctx.stroke();

        ctx.restore();
      }
    });
  }, [bridges, cameraY, cameraScale, islandCY, islandCX, islands]);

  useEffect(() => {
    drawBridges();
  }, [drawBridges]);

  // ── Phase 1: hud-fade ──
  useEffect(() => {
    const startY = targetCamY(0);
    camYRef.current = startY;
    setCameraY(startY);

    const t0 = setTimeout(() => {
      setIslandGlow(g => { const n = [...g]; n[0] = true; return n; });
      setLabelVis(v  => { const n = [...v]; n[0] = true; return n; });
    }, 200);

    const t1 = setTimeout(() => setPhase('building'), HUD_FADE_MS);
    return () => { clearTimeout(t0); clearTimeout(t1); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Phase 2: building — setTimeout chain, no state-driven effects ──
  const animateBridge = useCallback((idx: number) => {
    if (idx >= N - 1) return;

    activeBridgeRef.current = idx;
    const fromCamY = targetCamY(idx);
    const toCamY   = targetCamY(idx + 1);
    const start    = performance.now();

    const tick = (now: number) => {
      const raw = (now - start) / BRIDGE_MS;
      const t   = Math.min(raw, 1);
      const e   = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const newCamY = fromCamY + (toCamY - fromCamY) * e;
      camYRef.current = newCamY;
      setCameraY(newCamY);

      setBridges(prev => {
        const next = [...prev];
        next[idx] = { progress: t, done: false };
        return next;
      });

      if (t < 1) {
        bridgeRafRef.current = requestAnimationFrame(tick);
      } else {
        setBridges(prev => {
          const next = [...prev];
          next[idx] = { progress: 1, done: true };
          return next;
        });
        setIslandGlow(g => { const n = [...g]; n[idx + 1] = true; return n; });
        setLabelVis(v  => { const n = [...v]; n[idx + 1] = true; return n; });
      }
    };
    bridgeRafRef.current = requestAnimationFrame(tick);
  }, [N, targetCamY]);

  useEffect(() => {
    if (phase !== 'building') return;

    let bridgeIndex = 0;
    const totalBridges = N - 1;
    const timeouts: number[] = [];

    const buildNext = () => {
      if (bridgeIndex >= totalBridges) {
        const t = window.setTimeout(() => setPhase('zoom-out'), BRIDGE_PAUSE_MS + 500);
        timeouts.push(t);
        return;
      }
      animateBridge(bridgeIndex);
      bridgeIndex++;
      const t = window.setTimeout(buildNext, BRIDGE_MS + BRIDGE_PAUSE_MS + 200);
      timeouts.push(t);
    };

    const startTimeout = window.setTimeout(buildNext, BRIDGE_PAUSE_MS);
    timeouts.push(startTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
      cancelAnimationFrame(bridgeRafRef.current);
    };
  }, [phase, N, animateBridge]);

  // ── Phase 3: zoom-out ──
  useEffect(() => {
    if (phase !== 'zoom-out') return;

    const totalH      = (N - 1) * ISLAND_SPACING + ISLAND_H;
    const targetScale = Math.min((vh * 0.72) / totalH, 0.45);
    const targetY     = vh / 2 - (totalH / 2) * targetScale;
    const startY      = cameraY;
    const startScale  = cameraScale;
    const start       = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / ZOOM_MS, 1);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const s = startScale + (targetScale - startScale) * e;
      const y = startY    + (targetY    - startY)    * e;
      camYRef.current = y;
      camScaleRef.current = s;
      setCameraScale(s);
      setCameraY(y);

      if (t < 1) {
        bridgeRafRef.current = requestAnimationFrame(tick);
      } else {
        const hold = window.setTimeout(() => setPhase('crossfade'), 800);
        timeouts.push(hold);
      }
    };
    const timeouts: number[] = [];
    bridgeRafRef.current = requestAnimationFrame(tick);
    return () => { timeouts.forEach(clearTimeout); cancelAnimationFrame(bridgeRafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ── Phase 4: crossfade ──
  useEffect(() => {
    if (phase !== 'crossfade') return;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / CROSSFADE_MS, 1);
      setWorldOpacity(1 - t);
      if (t < 1) {
        bridgeRafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase('hero');
      }
    };
    bridgeRafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(bridgeRafRef.current); };
  }, [phase]);

  // ── Render ──
  const colHeight = (N - 1) * ISLAND_SPACING + ISLAND_H + 120;
  const heroSrc   = `/art/${professionId}/island_${professionId}.png`;

  return createPortal(
    <div className="fc-root">

      {phase !== 'hero' && (
        <div className="fc-world" style={{ opacity: worldOpacity }}>

          <div
            className="fc-blackout"
            style={{
              opacity: phase === 'hud-fade' ? 1 : 0,
              transition: `opacity ${HUD_FADE_MS}ms ease`,
            }}
          />

          <canvas
            ref={canvasRef}
            className="fc-bridge-canvas"
            width={vw}
            height={vh}
          />

          <div
            className="fc-camera"
            style={{
              transform: `translateY(${cameraY}px) scale(${cameraScale})`,
              transformOrigin: '50% 0',
            }}
          >
            <div className="fc-col" style={{ height: colHeight }}>
              {islands.map((isl, i) => {
                const top       = islandTop(i);
                const glowing   = islandGlow[i];
                const showLabel = labelVis[i];

                return (
                  <div key={isl.id} className="fc-slot" style={{ top, width: ISLAND_W }}>

                    <div
                      className={`fc-island${glowing ? ' fc-island--lit' : ''}`}
                      style={{ '--acc': isl.accent, opacity: glowing ? 1 : 0.08 } as React.CSSProperties}
                    >
                      {isl.artSrc ? (
                        <img
                          className="fc-island-img"
                          src={isl.artSrc}
                          alt={isl.title}
                          onError={e => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                            const fb = e.currentTarget.nextSibling as HTMLElement | null;
                            if (fb) fb.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="fc-island-fallback" style={{ display: isl.artSrc ? 'none' : 'flex' }}>
                        {isl.title[0]}
                      </div>
                    </div>

                    <span
                      className="fc-label"
                      style={{
                        opacity:   showLabel ? 1 : 0,
                        transform: showLabel ? 'translateX(0)' : 'translateX(12px)',
                        transition: 'opacity 0.5s ease, transform 0.5s ease',
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

      {phase === 'hero' && (
        <div className="fc-hero">
          {!heroError ? (
            <div className="final-island-container">
              <img
                className="fc-hero-img"
                src={heroSrc}
                alt={professionId}
                onLoad={() => setHeroLoaded(true)}
                onError={() => setHeroError(true)}
                style={{ opacity: heroLoaded ? 1 : 0, transition: 'opacity 1s ease' }}
              />
              {heroLoaded && (
                <div className="door-particles">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="gold-particle"
                      style={{
                        animationDelay: `${i * 0.3}s`,
                        left: `${45 + ((i * 0.7) % 10)}%`,
                        bottom: `${20 + ((i * 1.2) % 15)}%`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="fc-hero-fallback">🏙️</div>
          )}

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
