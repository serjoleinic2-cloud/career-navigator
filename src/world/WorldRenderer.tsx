import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { VerticalPath } from './VerticalPath';
import { LevelRenderer } from './LevelRenderer';
import { EnvironmentGenerator } from './EnvironmentGenerator';
import { useJourneyCamera } from '@/hooks/useJourneyCamera';
import type { CareerLevel, PathSegment } from './types';

interface WorldRendererProps {
  levels: CareerLevel[];
  currentLevel: number;
  onLevelPress?: (index: number) => void;
}

const LEVEL_HEIGHT = 200;
const CONTAINER_PADDING = 500;

function buildSegments(levels: CareerLevel[], currentLevel: number): PathSegment[] {
  const segments: PathSegment[] = [];
  for (let i = 0; i < levels.length - 1; i++) {
    const from = levels[i];
    const to = levels[i + 1];
    let status: PathSegment['status'] = 'locked';
    if (to.index <= currentLevel) status = 'completed';
    else if (from.index === currentLevel) status = 'current';
    segments.push({ from: from.index, to: to.index, status });
  }
  return segments;
}

function atmosphereClass(levelIndex: number, total: number): string {
  const ratio = levelIndex / total;
  if (ratio < 0.3) return 'atmosphere-early';
  if (ratio < 0.7) return 'atmosphere-mid';
  return 'atmosphere-late';
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  duration: number;
  delay: number;
}

function generateParticles(count: number, totalHeight: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * totalHeight,
    size: 1 + Math.random() * 2,
    opacity: 0.1 + Math.random() * 0.2,
    color: Math.random() > 0.5 ? '#00e5e0' : '#f59e0b',
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 10,
  }));
}

export function WorldRenderer({ levels, currentLevel, onLevelPress }: WorldRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useJourneyCamera({
    containerRef,
    currentId: String(currentLevel),
    behavior: 'smooth',
    delay: 300,
  });

  const segments = buildSegments(levels, currentLevel);
  const containerHeight = levels.length * LEVEL_HEIGHT + CONTAINER_PADDING;
  const particles = useMemo(() => generateParticles(20, containerHeight), [containerHeight]);

  return (
    <div
      ref={containerRef}
      className="hide-scrollbar relative w-full overflow-y-auto"
      style={{ height: containerHeight, scrollSnapType: 'y proximity' }}
    >
      <div className="world-atmosphere relative" style={{ height: containerHeight }}>
        {levels.map((level, i) => (
          <div key={level.index} className={`absolute inset-0 ${atmosphereClass(i, levels.length)}`} />
        ))}

        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                opacity: p.opacity,
                left: `${p.x}%`,
                top: p.y,
              }}
              animate={{
                y: [p.y - 30, p.y + 30, p.y - 30],
                x: [`${p.x}%`, `${p.x + 5}%`, `${p.x}%`],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: p.delay,
              }}
            />
          ))}
        </div>

        <div
          className="sticky top-0 flex justify-center"
          style={{ paddingTop: CONTAINER_PADDING / 2 }}
        >
          <VerticalPath segments={segments} currentLevel={currentLevel} />
        </div>

        <div className="absolute inset-0">
          {levels.map((level) => {
            const yPos = level.index * LEVEL_HEIGHT + CONTAINER_PADDING / 2;
            const xOffset = level.index % 2 === 0 ? 40 : -40;

            return (
              <div
                key={level.index}
                className="scroll-snap-align-start"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div
                  className="relative flex justify-center"
                  style={{ transform: `translateY(${yPos}px) translateX(${xOffset}px)` }}
                  data-node-id={level.index}
                >
                  <LevelRenderer
                    level={level}
                    isCurrent={level.index === currentLevel}
                    onPress={() => onLevelPress?.(level.index)}
                  />
                </div>

                <EnvironmentGenerator
                  side="left"
                  environmentType={level.leftEnvironment}
                  levelIndex={level.index}
                />
                <EnvironmentGenerator
                  side="right"
                  environmentType={level.rightEnvironment}
                  levelIndex={level.index}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
