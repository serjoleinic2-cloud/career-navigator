import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { getWorldThemeOrDefault, getChapterAccent } from '@/core/world/world_theme';
import { FadeOutPhase } from './phases/FadeOutPhase';
import { BuildingPhase } from './phases/BuildingPhase';
import { ZoomOutPhase } from './phases/ZoomOutPhase';
import { HeroPhase } from './phases/HeroPhase';
import './FinalCinematicScreen.css';

export interface CinematicChapter {
  id: string;
  title: string;
  completed: boolean;
  /** Sourced from the profession's chapters.ts (single source of truth). */
  artFilename?: string;
}

interface FinalCinematicScreenProps {
  professionId: string;
  chapters: CinematicChapter[];
  onComplete: () => void;
}

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
    const id = ch.id.toLowerCase();
    return {
      id:     ch.id,
      title:  ch.title,
      artSrc: ch.artFilename ? `/art/${professionId}/${ch.artFilename}` : '',
      accent: getChapterAccent(theme, id),
    };
  }), [chapters, professionId, theme]);

  const N = islands.length;

  const activeBridgeRef = useRef(-1);
  const bridgeRafRef = useRef(0);
  const camYRef = useRef(0);
  const camScaleRef = useRef(1);

  const [phase,        setPhase]        = useState<Phase>('hud-fade');
  const [bridges,      setBridges]      = useState<BridgeState[]>(() =>
    Array(Math.max(N - 1, 0)).fill(null).map(() => ({ progress: 0, done: false }))
  );
  const [islandGlow,   setIslandGlow]   = useState<boolean[]>(() => Array(N).fill(false));
  const [cameraY,      setCameraY]      = useState(0);
  const [cameraScale,  setCameraScale]  = useState(1);
  const [worldOpacity, setWorldOpacity] = useState(1);
  const [heroLoaded,   setHeroLoaded]   = useState(false);
  const [heroError,    setHeroError]    = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const vw = typeof window !== 'undefined' ? window.innerWidth  : 390;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 844;
  const ISLAND_W = Math.min(vw * ISLAND_W_VW, 440);

  const islandTop = useCallback((i: number) => (N - 1 - i) * ISLAND_SPACING, [N]);
  const islandCX  = useCallback(() => vw / 2, [vw]);
  const islandCY  = useCallback((i: number) => islandTop(i) + ISLAND_H / 2, [islandTop]);

  const targetCamY = useCallback(
    (i: number, scale = 1) => vh / 2 - islandCY(i) * scale,
    [vh, islandCY]
  );

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
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = vw;
    canvas.height = vh;
  }, [vw, vh]);

  useEffect(() => {
    drawBridges();
  }, [drawBridges]);

  useEffect(() => {
    const startY = targetCamY(0);
    camYRef.current = startY;
    setCameraY(startY);

    const t0 = setTimeout(() => {
      setIslandGlow(g => { const n = [...g]; n[0] = true; return n; });
    }, 200);

    const t1 = setTimeout(() => setPhase('building'), HUD_FADE_MS);
    return () => { clearTimeout(t0); clearTimeout(t1); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      if (cursorRef.current && t < 1) {
        const fromCY = islandCY(idx) * camScaleRef.current + newCamY;
        const toCY   = islandCY(idx + 1) * camScaleRef.current + newCamY;
        const totalLen = fromCY - toCY;
        const drawnLen = totalLen * t;
        const sparkY = fromCY - drawnLen;
        cursorRef.current.style.left = `${islandCX()}px`;
        cursorRef.current.style.top = `${sparkY}px`;
      }

      if (t < 1) {
        bridgeRafRef.current = requestAnimationFrame(tick);
      } else {
        setBridges(prev => {
          const next = [...prev];
          next[idx] = { progress: 1, done: true };
          return next;
        });
        setIslandGlow(g => { const n = [...g]; n[idx + 1] = true; return n; });
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

  useEffect(() => {
    if (phase !== 'zoom-out') return;

    const totalH      = (N - 1) * ISLAND_SPACING + ISLAND_H;
    const targetScale = Math.min((vh * 0.72) / totalH, 0.45);
    const targetY     = vh / 2 - (totalH / 2) * targetScale;
    const startY      = cameraY;
    const startScale  = cameraScale;
    const start       = performance.now();

    const timeouts: number[] = [];

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
    bridgeRafRef.current = requestAnimationFrame(tick);
    return () => { timeouts.forEach(clearTimeout); cancelAnimationFrame(bridgeRafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

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

  const colHeight = (N - 1) * ISLAND_SPACING + ISLAND_H + 120;

  return createPortal(
    <div
      className="fc-root"
      style={{
        background: `url('/art/${professionId}/world.jpg') center center / cover no-repeat, #05080f`,
      }}
    >
      {phase === 'hud-fade' && (
        <div className="fc-world">
          <FadeOutPhase />
          <BuildingPhase
            islands={islands}
            islandGlow={islandGlow}
            islandTop={islandTop}
            islandWidth={ISLAND_W}
            cameraY={cameraY}
            cameraScale={cameraScale}
            colHeight={colHeight}
            canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>}
            cursorRef={cursorRef as React.RefObject<HTMLDivElement>}
            cursorVisible={false}
            worldOpacity={1}
          />
        </div>
      )}

      {phase === 'building' && (
        <BuildingPhase
          islands={islands}
          islandGlow={islandGlow}
          islandTop={islandTop}
          islandWidth={ISLAND_W}
          cameraY={cameraY}
          cameraScale={cameraScale}
          colHeight={colHeight}
          canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>}
          cursorRef={cursorRef as React.RefObject<HTMLDivElement>}
          cursorVisible={true}
          worldOpacity={1}
        />
      )}

      {phase === 'zoom-out' && (
        <ZoomOutPhase
          islands={islands}
          islandGlow={islandGlow}
          islandTop={islandTop}
          islandWidth={ISLAND_W}
          cameraY={cameraY}
          cameraScale={cameraScale}
          colHeight={colHeight}
          canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>}
          worldOpacity={1}
        />
      )}

      {phase === 'crossfade' && (
        <ZoomOutPhase
          islands={islands}
          islandGlow={islandGlow}
          islandTop={islandTop}
          islandWidth={ISLAND_W}
          cameraY={cameraY}
          cameraScale={cameraScale}
          colHeight={colHeight}
          canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>}
          worldOpacity={worldOpacity}
        />
      )}

      {phase === 'hero' && (
        <HeroPhase
          professionId={professionId}
          heroLoaded={heroLoaded}
          heroError={heroError}
          onComplete={onComplete}
          onHeroLoad={() => setHeroLoaded(true)}
          onHeroError={() => setHeroError(true)}
        />
      )}
    </div>,
    document.body
  );
}
