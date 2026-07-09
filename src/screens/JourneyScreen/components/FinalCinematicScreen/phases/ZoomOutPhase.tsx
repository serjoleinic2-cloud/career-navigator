import { FinalIsland } from '../components/Island';

interface IslandData {
  id: string;
  title: string;
  artSrc: string;
  accent: string;
}

interface ZoomOutPhaseProps {
  islands: IslandData[];
  islandGlow: boolean[];
  islandTop: (i: number) => number;
  islandWidth: number;
  cameraY: number;
  cameraScale: number;
  colHeight: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  worldOpacity: number;
}

export function ZoomOutPhase({
  islands,
  islandGlow,
  islandTop,
  islandWidth,
  cameraY,
  cameraScale,
  colHeight,
  canvasRef,
  worldOpacity,
}: ZoomOutPhaseProps) {
  return (
    <div className="fc-world" style={{ opacity: worldOpacity }}>
      <canvas
        ref={canvasRef}
        className="fc-bridge-canvas"
      />

      <div
        className="fc-camera"
        style={{
          transform: `translateY(${cameraY}px) scale(${cameraScale})`,
          transformOrigin: '50% 0',
        }}
      >
        <div className="fc-col" style={{ height: colHeight }}>
          {islands.map((isl, i) => (
            <FinalIsland
              key={isl.id}
              title={isl.title}
              artSrc={isl.artSrc}
              accent={isl.accent}
              glowing={islandGlow[i]}
              islandWidth={islandWidth}
              style={{ top: islandTop(i) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
