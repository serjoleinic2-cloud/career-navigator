import React, { useEffect, useRef, useState } from 'react';
import type { WorldState } from './visual_world_contract';
import { buildWorldStateFromRuntime } from './world_builder';
import { createCamera, focusOnNode, updateCamera } from './camera/world_camera_controller';
import type { JourneyRuntimeState } from '../core/runtime/journey_runtime';
import { getRuntimeState } from '../core/runtime/runtime_controller';
import { getActiveProfessionId } from '../core/profession_loader';
import { getWorldThemeOrDefault } from '../core/world/world_theme';
import { getWorldArtOrDefault } from '../core/world/world_art_contract';
import { subscribe } from '../core/events/system_event_bus';

/**
 * WorldRenderer — composition engine (WORLD ART PIPELINE v1.0).
 *
 * It does NOT draw architecture. It composites, in order:
 *   1. WorldImage layer  (artist art, or WorldTheme gradient fallback)
 *   2. Bridge overlay     (debug mode only — real art has bridges painted in)
 *   3. Island overlay     (debug mode only — real art has islands painted in)
 *   4. Particle layer     (ambient atmosphere, always visible)
 *   5. Camera             (pans/zooms the whole composition; explores,
 *                          never creates, the world)
 *
 * JourneyHUD (mission cards, header, nav) is a separate layer entirely,
 * mounted above this by App.tsx — not this component's concern.
 *
 * mode='debug'      — circles/lines/labels for development.
 * mode='production' — only art + particles; islands/bridges are invisible
 *                      hit-areas only (once click-to-navigate is wired).
 */

export type WorldRendererMode = 'debug' | 'production';

interface WorldRendererProps {
  runtimeState?: JourneyRuntimeState;
  mode?: WorldRendererMode;
}

const DEFAULT_ATMOSPHERE_PARTICLE_COUNT = 18;

export const WorldRenderer: React.FC<WorldRendererProps> = ({
  runtimeState: runtimeStateProp,
  mode = 'production',
}) => {
  const runtimeState = runtimeStateProp ?? getRuntimeState();
  const professionId = runtimeState?.professionId ?? getActiveProfessionId() ?? 'default';
  const theme = getWorldThemeOrDefault(professionId);
  const art = getWorldArtOrDefault(professionId);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [worldState, setWorldState] = useState<WorldState>(() =>
    runtimeState ? buildWorldStateFromRuntime(runtimeState) : { nodes: [], connections: [], camera: { x: 0, y: 0, zoom: 1 }, atmosphere: { timeOfDay: 'day', fogDensity: 0 } }
  );
  const cameraRef = useRef(createCamera(worldState.camera));
  const animFrameRef = useRef<number>(0);

  // Rebuild world state when runtime changes
  useEffect(() => {
    if (!runtimeState) return;
    const newState = buildWorldStateFromRuntime(runtimeState);
    setWorldState(newState);
    const activeIsland = newState.nodes.find(n => n.status === 'active');
    if (activeIsland) {
      cameraRef.current = focusOnNode(cameraRef.current, activeIsland.x, activeIsland.y);
    }
  }, [runtimeState?.activeNodeId, runtimeState?.activeChapterId]);

  // Subscribe to events
  useEffect(() => {
    const refreshAndFocus = () => {
      if (!runtimeState) return;
      const newState = buildWorldStateFromRuntime(runtimeState);
      setWorldState(newState);
      const activeIsland = newState.nodes.find(n => n.status === 'active');
      if (activeIsland) {
        cameraRef.current = focusOnNode(cameraRef.current, activeIsland.x, activeIsland.y);
      }
    };

    const unsubNodeChanged = subscribe('NODE_CHANGED', refreshAndFocus);
    const unsubMissionResult = subscribe('MISSION_RESULT', (event) => {
      const payload = event.payload as { success: boolean };
      if (payload.success) refreshAndFocus();
    });

    return () => {
      unsubNodeChanged();
      unsubMissionResult();
    };
  }, [runtimeState]);

  // Debug-mode canvas render loop: bridges + islands as circles/lines.
  // This is a development helper only — NOT the final visual style.
  // Camera math (pan/zoom) lives here too since it drives the WorldImage
  // and particle layers via cameraRef, read by the other effects below.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      cameraRef.current = updateCamera(cameraRef.current);

      if (mode === 'debug') {
        const cam = cameraRef.current;
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
          ctx.scale(dpr, dpr);
        }

        const width = rect.width;
        const height = rect.height;

        ctx.clearRect(0, 0, width, height);
        ctx.save();
        ctx.translate(width / 2 - cam.x, height / 2 - cam.y);
        ctx.scale(cam.zoom, cam.zoom);

        // Bridges (debug helper for what will be painted bridges in the art)
        ctx.strokeStyle = `rgba(${theme.palette.glowRGB}, 0.3)`;
        ctx.lineWidth = 2;
        worldState.connections.forEach(bridge => {
          const from = worldState.nodes.find(n => n.id === bridge.from);
          const to = worldState.nodes.find(n => n.id === bridge.to);
          if (from && to) {
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
          }
        });

        // Islands (debug helper for what will be painted islands in the art)
        worldState.nodes.forEach(island => {
          ctx.globalAlpha = island.opacity;

          if (island.glowIntensity > 0) {
            const gradient = ctx.createRadialGradient(
              island.x, island.y, 0,
              island.x, island.y, 30 * island.scale
            );
            gradient.addColorStop(0, `rgba(${theme.palette.glowRGB}, ${island.glowIntensity})`);
            gradient.addColorStop(1, `rgba(${theme.palette.glowRGB}, 0)`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(island.x, island.y, 30 * island.scale, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle = island.status === 'active' ? theme.palette.nodeCurrent :
                          island.status === 'completed' ? theme.palette.nodeCompleted : theme.palette.nodeLocked;
          ctx.beginPath();
          ctx.arc(island.x, island.y, 15 * island.scale, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = Object.values(theme.chapterBackgrounds)[0] ?? '#1a2333';
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(island.label, island.x, island.y - 25 * island.scale);
        });

        ctx.restore();
      } else {
        // Production mode: canvas exists only to keep the camera loop
        // alive for the particle layer; no debug drawing.
        const rect = canvas.getBoundingClientRect();
        if (canvas.width !== rect.width || canvas.height !== rect.height) {
          canvas.width = rect.width;
          canvas.height = rect.height;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [worldState, theme, mode]);

  const fallbackGradient = `linear-gradient(180deg, ${theme.palette.backgroundFrom} 0%, ${theme.palette.backgroundTo} 100%)`;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* 1. WorldImage layer — artist art, or gradient fallback until it exists */}
      {art.worldImageUrl ? (
        <img
          src={art.worldImageUrl}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: fallbackGradient }} />
      )}

      {/* 2-3. Bridge + Island overlays (debug mode) / hit-areas (production, canvas kept
         transparent — real interaction wiring is a follow-up, not gameplay scope here) */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: mode === 'debug' ? 'auto' : 'none',
        }}
      />

      {/* 4. Particle layer — ambient atmosphere, on in both modes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {Array.from({ length: DEFAULT_ATMOSPHERE_PARTICLE_COUNT }).map((_, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: `${(i * 53) % 100}%`,
              bottom: -10,
              width: 3,
              height: 3,
              borderRadius: '50%',
              background: theme.palette.primary,
              opacity: 0,
              animation: `worldParticleRise ${7 + (i % 5)}s ease-in-out ${(i * 0.7) % 7}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes worldParticleRise {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          15% { opacity: 0.6; }
          85% { opacity: 0.35; }
          100% { transform: translateY(-70vh) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
