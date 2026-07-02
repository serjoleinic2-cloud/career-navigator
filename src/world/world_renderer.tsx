import React, { useEffect, useRef, useState } from 'react';
import type { WorldState } from './visual_world_contract';
import { buildWorldStateFromRuntime } from './world_builder';
import { createCamera, focusOnNode, updateCamera } from './camera/world_camera_controller';
import type { JourneyRuntimeState } from '../core/runtime/journey_runtime';
import { getRuntimeState } from '../core/runtime/runtime_controller';
import { getActiveProfessionId } from '../core/profession_loader';
import { getWorldThemeOrDefault } from '../core/world/world_theme';
import { subscribe } from '../core/events/system_event_bus';

interface WorldRendererProps {
  runtimeState?: JourneyRuntimeState;
}

export const WorldRenderer: React.FC<WorldRendererProps> = ({ runtimeState: runtimeStateProp }) => {
  const runtimeState = runtimeStateProp ?? getRuntimeState();
  const professionId = runtimeState?.professionId ?? getActiveProfessionId() ?? 'default';
  const theme = getWorldThemeOrDefault(professionId);
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
    const activeNode = newState.nodes.find(n => n.status === 'active');
    if (activeNode) {
      cameraRef.current = focusOnNode(cameraRef.current, activeNode.x, activeNode.y);
    }
  }, [runtimeState?.activeNodeId, runtimeState?.activeChapterId]);

  // Subscribe to events
  useEffect(() => {
    const unsubNodeChanged = subscribe('NODE_CHANGED', () => {
      if (!runtimeState) return;
      const newState = buildWorldStateFromRuntime(runtimeState);
      setWorldState(newState);
      const activeNode = newState.nodes.find(n => n.status === 'active');
      if (activeNode) {
        cameraRef.current = focusOnNode(cameraRef.current, activeNode.x, activeNode.y);
      }
    });

    const unsubMissionResult = subscribe('MISSION_RESULT', (event) => {
      const payload = event.payload as { success: boolean };
      if (payload.success && runtimeState) {
        const newState = buildWorldStateFromRuntime(runtimeState);
        setWorldState(newState);
        const activeNode = newState.nodes.find(n => n.status === 'active');
        if (activeNode) {
          cameraRef.current = focusOnNode(cameraRef.current, activeNode.x, activeNode.y);
        }
      }
    });

    return () => {
      unsubNodeChanged();
      unsubMissionResult();
    };
  }, [runtimeState]);

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      cameraRef.current = updateCamera(cameraRef.current);
      const cam = cameraRef.current;

      // Resize canvas to match display size
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

      // Draw connections
      ctx.strokeStyle = `rgba(${theme.palette.glowRGB}, 0.3)`;
      ctx.lineWidth = 2;
      worldState.connections.forEach(conn => {
        const from = worldState.nodes.find(n => n.id === conn.from);
        const to = worldState.nodes.find(n => n.id === conn.to);
        if (from && to) {
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.stroke();
        }
      });

      // Draw nodes
      worldState.nodes.forEach(node => {
        ctx.globalAlpha = node.opacity;

        if (node.glowIntensity > 0) {
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, 30 * node.scale
          );
          gradient.addColorStop(0, `rgba(${theme.palette.glowRGB}, ${node.glowIntensity})`);
          gradient.addColorStop(1, `rgba(${theme.palette.glowRGB}, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 30 * node.scale, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = node.status === 'active' ? theme.palette.nodeCurrent :
                        node.status === 'completed' ? theme.palette.nodeCompleted : theme.palette.nodeLocked;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 15 * node.scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = Object.values(theme.chapterBackgrounds)[0] ?? '#1a2333';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y - 25 * node.scale);
      });

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [worldState, theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        background: `linear-gradient(180deg, ${theme.palette.backgroundFrom} 0%, ${theme.palette.backgroundTo} 100%)`,
      }}
    />
  );
};
