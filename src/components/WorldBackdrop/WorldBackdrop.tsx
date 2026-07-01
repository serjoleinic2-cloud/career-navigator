import { motion } from 'framer-motion';
import type { WorldTheme } from '@/core/world/world_theme';

interface WorldBackdropProps {
  theme: WorldTheme;
  progressRatio: number; // 0..1
}

export function WorldBackdrop({ theme, progressRatio }: WorldBackdropProps) {
  const { palette } = theme;
  const clampedProgress = Math.min(1, Math.max(0, progressRatio));
  const platforms = [0, 1, 2, 3, 4];

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{
        background: `linear-gradient(180deg, ${palette.backgroundFrom} 0%, ${palette.backgroundTo} 100%)`,
      }}
    >
      {/* мягкое солнечное пятно, следующее за прогрессом */}
      <motion.div
        className="absolute left-1/2 w-[160vw] h-[50vh] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(${palette.glowRGB}, 0.25) 0%, transparent 70%)`,
          x: '-50%',
        }}
        animate={{ top: `${(1 - clampedProgress) * 70}%` }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* лёгкая дымка у горизонта для глубины */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${palette.backgroundTo} 90%)`,
          opacity: 0.6,
        }}
      />

      <svg
        viewBox="0 0 400 800"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 w-full h-full"
      >
        {platforms.map((i) => {
          const y = 760 - i * 150;
          const width = 90 - i * 6;
          const isPast = i / platforms.length < clampedProgress;
          const fill = isPast ? palette.primary : palette.nodeLocked;

          return (
            <g key={i} opacity={isPast ? 0.85 : 0.5}>
              {/* мягкая тень платформы */}
              <ellipse
                cx={200}
                cy={y + 34}
                rx={width * 0.7}
                ry={10}
                fill="#00000022"
              />
              {/* сама изометрическая платформа — светлая, объёмная */}
              <polygon
                points={`
                  ${200 - width},${y}
                  ${200 + width},${y}
                  ${200 + width - 20},${y + 22}
                  ${200 - width + 20},${y + 22}
                `}
                fill="#ffffff"
                fillOpacity={0.85}
                stroke={fill}
                strokeOpacity={0.5}
                strokeWidth={1.5}
              />
              {/* тонкая цветная кромка сверху — акцент профессии */}
              <polygon
                points={`
                  ${200 - width},${y}
                  ${200 + width},${y}
                  ${200 + width - 8},${y + 6}
                  ${200 - width + 8},${y + 6}
                `}
                fill={fill}
                fillOpacity={0.35}
              />
              {/* опора, парящая в воздухе */}
              <line
                x1={200} y1={y + 22} x2={200} y2={y + 60}
                stroke={palette.secondary}
                strokeOpacity={0.25}
                strokeWidth={1}
                strokeDasharray="2 4"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
