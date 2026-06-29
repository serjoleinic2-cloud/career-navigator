import { getUIState } from '@/core/ui_bridge/ui_bridge';
import { getCareerState } from '@/core/skill_engine';
import { buildWorldFromUI } from './world_builder';
import { EnvironmentGenerator } from './EnvironmentGenerator';
import { LevelRenderer } from './LevelRenderer';
import type { CareerLevel } from './types';
import type { WorldState } from './visual_world_contract';
import type { CameraState } from './camera/world_camera_controller';
import { calculateGlow, getGlowColor } from './effects/glow_system';
import { getCameraTransform } from './camera/world_camera_controller';

export type RenderFrame = {
  nodes: RenderedNode[];
  cameraTransform: string;
  fogIntensity: number;
  timeOfDay: string;
};

export type RenderedNode = {
  id: string;
  transform: string;
  glow: number;
  glowColor: string;
  size: number;
  opacity: number;
};

export function renderWorld(
  worldState: WorldState,
  camera: CameraState,
  time: number
): RenderFrame {
  const nodes: RenderedNode[] = worldState.nodes.map(node => {
    const glow = calculateGlow(node, time);
    const glowColor = getGlowColor(node);

    const isoX = node.position3D.x - node.position3D.z;
    const isoY = node.position3D.y + (node.position3D.x + node.position3D.z) * 0.5;

    return {
      id: node.id,
      transform: `translate(${isoX}px, ${isoY}px)`,
      glow,
      glowColor,
      size: node.isActive ? 24 : node.isCompleted ? 18 : 14,
      opacity: node.isLocked ? 0.4 : 1,
    };
  });

  return {
    nodes,
    cameraTransform: getCameraTransform(camera),
    fogIntensity: worldState.fogIntensity,
    timeOfDay: worldState.timeOfDay,
  };
}

export function WorldRendererScreen(): JSX.Element {
  const uiState = getUIState();

  const worldNodes = buildWorldFromUI(uiState.nodes);
  const careerState = getCareerState();
  const completedCount = Object.values(careerState?.nodeStates ?? {}).filter(
    n => n.state === 'confidence' || n.state === 'execution'
  ).length;
  const totalCount = Object.values(careerState?.nodeStates ?? {}).length;

  const levels: CareerLevel[] = worldNodes.map((wn, i) => ({
    index: i,
    title: uiState.nodes[i]?.title ?? `Skill ${i + 1}`,
    description: '',
    status: wn.isCompleted ? 'completed' : wn.isActive ? 'current' : 'locked',
    theme: 'learning',
    leftEnvironment: 'skill-lab',
    rightEnvironment: 'startup-office',
    skillsRequired: [],
    outcome: '',
    estimatedHours: 0,
    resources: [],
  }));

  return (
    <div className="min-h-screen bg-[#050a1a] text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#071320] to-[#050a1a]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-cyan-900/10 to-transparent" />
      </div>

      <header className="relative z-10 px-6 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white/90 tracking-tight">Career Navigator</h1>
            <p className="text-sm text-white/40 mt-1">
              {completedCount} / {totalCount} skills completed
            </p>
          </div>
          <div className="flex gap-3 text-sm">
            <div className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              {Math.round(careerState?.readinessScore ?? 0)}%
            </div>
            <div className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
              {Math.round((careerState?.confidenceScore ?? 0) * 100)}%
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-4 pb-32">
        <div className="relative">
          {levels.map((level, i) => (
            <div key={i} className="relative flex items-center justify-center py-3">
              <EnvironmentGenerator
                side="left"
                environmentType={level.leftEnvironment}
                levelIndex={i}
              />
              <div className="flex-1 flex justify-center">
                <LevelRenderer
                  level={level}
                  isCurrent={level.status === 'current'}
                />
              </div>
              <EnvironmentGenerator
                side="right"
                environmentType={level.rightEnvironment}
                levelIndex={i}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
