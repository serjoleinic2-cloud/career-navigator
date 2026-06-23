import { motion } from 'framer-motion';
import type { CareerLevel } from './types';

interface WorldDebugModeProps {
  levels: CareerLevel[];
  currentLevel: number;
  completedLevels: number[];
}

export function WorldDebugMode({ levels, currentLevel, completedLevels }: WorldDebugModeProps) {
  const totalHeight = levels.length * 200 + 200;
  const scale = Math.min(1, (window.innerHeight - 80) / totalHeight);

  const isCompleted = (idx: number) => completedLevels.includes(idx);
  const isCurrent = (idx: number) => idx === currentLevel;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0a0a0f',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Scale container to fit all levels */}
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          position: 'relative',
          width: 360,
          height: totalHeight,
        }}
      >
        {/* Background zones */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 120,
            height: '100%',
            background: 'linear-gradient(180deg, rgba(0,229,224,0.06) 0%, rgba(0,184,169,0.03) 100%)',
            borderRight: '1px dashed rgba(0,229,224,0.15)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 120,
            height: '100%',
            background: 'linear-gradient(180deg, rgba(168,85,247,0.06) 0%, rgba(184,41,221,0.03) 100%)',
            borderLeft: '1px dashed rgba(168,85,247,0.15)',
          }}
        />

        {/* Zone labels */}
        <div
          style={{
            position: 'absolute',
            left: 10,
            top: 20,
            fontSize: 10,
            color: 'rgba(0,229,224,0.4)',
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          Training World
        </div>
        <div
          style={{
            position: 'absolute',
            right: 10,
            top: 20,
            fontSize: 10,
            color: 'rgba(168,85,247,0.4)',
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          Industry World
        </div>

        {/* SVG Path */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <defs>
            <linearGradient id="debugPathGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,229,224,0.5)" />
              <stop offset="100%" stopColor="rgba(0,229,224,0.2)" />
            </linearGradient>
          </defs>
          <path
            d={levels
              .map((_, i) => {
                const x = 180;
                const y = i * 200 + 100;
                return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
              })
              .join(' ')}
            fill="none"
            stroke="url(#debugPathGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 8px rgba(0,229,224,0.3))' }}
          />
        </svg>

        {/* Levels */}
        {levels.map((level, index) => {
          const completed = isCompleted(index);
          const current = isCurrent(index);
          const locked = !completed && !current;

          const y = index * 200 + 100;
          const isLeft = index % 2 === 0;
          const cardX = isLeft ? 40 : 200;

          return (
            <div key={level.index}>
              {/* Environment block */}
              <div
                style={{
                  position: 'absolute',
                  left: isLeft ? 10 : 250,
                  top: y - 30,
                  width: 80,
                  height: 60,
                  borderRadius: 6,
                  background: isLeft
                    ? 'linear-gradient(180deg, rgba(0,229,224,0.12) 0%, transparent 100%)'
                    : 'linear-gradient(180deg, rgba(168,85,247,0.12) 0%, transparent 100%)',
                  opacity: locked ? 0.3 : 0.6,
                }}
              />

              {/* Path node dot */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: 180 - 6,
                  top: y - 6,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: current ? '#f59e0b' : completed ? '#00e5e0' : '#2a2a4a',
                  boxShadow: current
                    ? '0 0 20px rgba(245,158,11,0.6), 0 0 40px rgba(245,158,11,0.3)'
                    : completed
                    ? '0 0 12px rgba(0,229,224,0.4)'
                    : 'none',
                }}
                animate={
                  current
                    ? { scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Level card */}
              <div
                style={{
                  position: 'absolute',
                  left: cardX,
                  top: y - 25,
                  width: 120,
                  padding: '8px 10px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${current ? 'rgba(245,158,11,0.3)' : completed ? 'rgba(0,229,224,0.2)' : 'rgba(255,255,255,0.06)'}`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: current ? '#f59e0b' : completed ? '#00e5e0' : 'rgba(255,255,255,0.3)',
                    marginBottom: 2,
                  }}
                >
                  {index + 1}. {level.title}
                </div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)' }}>
                  {level.leftEnvironment} → {level.rightEnvironment}
                </div>
              </div>

              {/* Current level orb */}
              {current && (
                <motion.div
                  style={{
                    position: 'absolute',
                    left: 180 - 16,
                    top: y - 16,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)',
                  }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              )}
            </div>
          );
        })}

        {/* Legend */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 16,
            fontSize: 9,
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
            Current
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00e5e0', display: 'inline-block' }} />
            Completed
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2a2a4a', display: 'inline-block' }} />
            Locked
          </span>
        </div>
      </div>
    </div>
  );
}
