import React, { useEffect, useRef, useState } from 'react';
import type { WorldState } from './visual_world_contract';
import { buildWorldStateFromRuntime } from './world_builder';
import { createCamera, focusOnNode, updateCamera } from './camera/world_camera_controller';
import type { JourneyRuntimeState } from '../core/runtime/journey_runtime';
import { getRuntimeState } from '../core/runtime/runtime_controller';
import { subscribe } from '../core/events/system_event_bus';

interface WorldRendererProps {
  runtimeState?: JourneyRuntimeState;
}

export const WorldRenderer: React.FC<WorldRendererProps> = ({ runtimeState: runtimeStateProp }) => {
  const runtimeState = runtimeStateProp ?? getRuntimeState()!;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [worldState, setWorldState] = useState<WorldState>(() => 
    buildWorldStateFromRuntime(runtimeState)
  );
  const cameraRef = useRef(createCamera(worldState.camera));

  useEffect(() => {
    const unsubNodeChanged = subscribe('NODE_CHANGED', () => {
      const newState = buildWorldStateFromRuntime(runtimeState);
      setWorldState(newState);
      
      const activeNode = newState.nodes.find(n => n.status === 'active');
      if (activeNode) {
        cameraRef.current = focusOnNode(cameraRef.current, activeNode.x, activeNode.y);
      }
    });

    const unsubMissionResult = subscribe('MISSION_RESULT', (event) => {
      const payload = event.payload as { success: boolean };
      if (payload.success) {
        // Trigger upward camera movement after mission complete
        setTimeout(() => {
          const newState = buildWorldStateFromRuntime(runtimeState);
          setWorldState(newState);
          const activeNode = newState.nodes.find(n => n.status === 'active');
          if (activeNode) {
            cameraRef.current = focusOnNode(cameraRef.current, activeNode.x, activeNode.y);
          }
        }, 100);
      }
    });

    return () => {
      unsubNodeChanged();
      unsubMissionResult();
    };
  }, [runtimeState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      cameraRef.current = updateCamera(cameraRef.current);
      const cam = cameraRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2 - cam.x, canvas.height / 2 - cam.y);
      ctx.scale(cam.zoom, cam.zoom);

      // Draw connections (upward only)
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
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
        
        // Glow for active/completed
        if (node.glowIntensity > 0) {
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, 30 * node.scale
          );
          gradient.addColorStop(0, `rgba(100, 200, 255, ${node.glowIntensity})`);
          gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 30 * node.scale, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node body
        ctx.fillStyle = node.status === 'active' ? '#4ade80' : 
                        node.status === 'completed' ? '#60a5fa' : '#374151';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 15 * node.scale, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y - 25 * node.scale);
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [worldState]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ display: 'block', background: '#0f172a' }}
    />
  );
};
