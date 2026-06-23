import { motion } from 'framer-motion';
import type { CareerLevel } from './types';

interface WorldDebugModeProps {
  levels: CareerLevel[];
  currentLevel: number;
  completedLevels: number[];
  onToggle?: () => void;
}

const LEVEL_HEIGHT = 200;
const PLATFORM_WIDTH = 180;
const ENV_WIDTH = 80;
const CANVAS_WIDTH = 600;

function buildPathD(levels: CareerLevel[]): string {
  const points = levels.map((l) => {
    const y = l.index * LEVEL_HEIGHT + 100;
    return { x: CANVAS_WIDTH / 2, y };
  });

  return points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const cy = (prev.y + p.y) / 2;
      return `C ${prev.x + 40} ${cy}, ${p.x - 40} ${cy}, ${p.x} ${p.y}`;
    })
    .join(' ');
}

export function WorldDebugMode({ levels, currentLevel, completedLevels, onToggle }: WorldDebugModeProps) {
  const totalHeight = levels.length * LEVEL_HEIGHT + 200;

  const isCompleted = (index: number) => completedLevels.includes(index);
  const isCurrent = (index: number) => index === currentLevel;

  const dotColor = (index: number) => {
    if (isCurrent(index)) return '#f59e0b';
    if (isCompleted(index)) return '#00e5e0';
    return '#2a2a4a';
  };

  const dotRadius = (index: number) => {
    if (isCurrent(index)) return 12;
    if (isCompleted(index)) return 8;
    return 6;
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        height: '100vh',
        background: '#0a0a0f',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          transform: `scale(${typeof window !== 'undefined' ? Math.min(1, window.innerHeight / totalHeight) : 0.5})`,
          transformOrigin: 'top center',
          width: CANVAS_WIDTH,
          height: totalHeight,
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <svg
          width={CANVAS_WIDTH}
          height={totalHeight}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
          {levels.map((_, i) => (
            <line
              key={`grid-${i}`}
              x1={0}
              y1={i * LEVEL_HEIGHT}
              x2={CANVAS_WIDTH}
              y2={i * LEVEL_HEIGHT}
              stroke="#ffffff08"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          ))}

          <path d={buildPathD(levels)} fill="none" stroke="#00e5e080" strokeWidth={2} />
        </svg>

        {levels.map((level) => {
          const yPos = level.index * LEVEL_HEIGHT + 100;
          const xOffset = level.index % 2 === 0 ? -20 : 20;
          const cx = CANVAS_WIDTH / 2;
          const dr = dotRadius(level.index);

          return (
            <div key={level.index}>
              <div
                style={{
                  position: 'absolute',
                  left: cx - PLATFORM_WIDTH / 2 + xOffset,
                  top: yPos - 20,
                  width: PLATFORM_WIDTH,
                  height: 40,
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: isCurrent(level.index)
                    ? 'rgba(245,158,11,0.1)'
                    : isCompleted(level.index)
                      ? 'rgba(0,229,224,0.05)'
                      : 'rgba(255,255,255,0.02)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
                  {level.title}
                </span>
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: cx + (level.index % 2 === 0 ? -90 : 90),
                  top: yPos - 10,
                  width: ENV_WIDTH,
                  height: 20,
                  borderRadius: 4,
                  background: 'rgba(0,229,224,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 8,
                  color: 'rgba(0,229,224,0.6)',
                }}
              >
                L: {level.leftEnvironment}
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: cx + PLATFORM_WIDTH / 2 + xOffset + 10,
                  top: yPos - 10,
                  width: ENV_WIDTH,
                  height: 20,
                  borderRadius: 4,
                  background: 'rgba(168,85,247,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 8,
                  color: 'rgba(168,85,247,0.6)',
                }}
              >
                R: {level.rightEnvironment}
              </div>

              {isCurrent(level.index) && (
                <motion.div
                  style={{
                    position: 'absolute',
                    left: cx - dr,
                    top: yPos - dr,
                    width: dr * 2,
                    height: dr * 2,
                    borderRadius: '50%',
                    background: '#f59e0b',
                    boxShadow: '0 0 12px rgba(245,158,11,0.6)',
                  }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              {!isCurrent(level.index) && (
                <div
                  style={{
                    position: 'absolute',
                    left: cx - dr,
                    top: yPos - dr,
                    width: dr * 2,
                    height: dr * 2,
                    borderRadius: '50%',
                    background: dotColor(level.index),
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={onToggle}
        style={{
          position: 'fixed',
          top: 12,
          right: 12,
          width: 40,
          height: 40,
          borderRadius: 12,
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.6)',
          fontSize: 10,
          fontWeight: 600,
          cursor: 'pointer',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        DEBUG
      </button>
    </div>
  );
}
