import { motion } from 'framer-motion';
import type { PathSegment } from './types';

interface VerticalPathProps {
  segments: PathSegment[];
  currentLevel: number;
  segmentStates?: ('completed' | 'active' | 'locked')[];
}

const SEGMENT_HEIGHT = 200;
const PATH_WIDTH = 4;
const SVG_PADDING = 50;
const COLOR_CYAN = '#00e5e0';
const COLOR_AMBER = '#f59e0b';
const COLOR_DIM = '#2a2a4a';

function buildPath(from: number, to: number): string {
  const y1 = from * SEGMENT_HEIGHT + SVG_PADDING;
  const y2 = to * SEGMENT_HEIGHT + SVG_PADDING;
  const cx = 60;
  return `M ${cx} ${y1} C ${cx + 30} ${(y1 + y2) / 2}, ${cx - 30} ${(y1 + y2) / 2}, ${cx} ${y2}`;
}

export function VerticalPath({ segments, currentLevel, segmentStates }: VerticalPathProps) {
  const height = segments.length * SEGMENT_HEIGHT + SVG_PADDING * 2;

  return (
    <svg
      width="120"
      height={height}
      viewBox={`0 0 120 ${height}`}
      style={{ flexShrink: 0 }}
    >
      <defs>
        <filter id="glow-cyan">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={COLOR_CYAN} floodOpacity="0.6" />
        </filter>
        <filter id="glow-amber">
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={COLOR_AMBER} floodOpacity="0.8" />
        </filter>
      </defs>

      {segments.map((seg, i) => {
        const state = segmentStates?.[i];
        const color = state === 'completed'
          ? COLOR_CYAN
          : state === 'active'
            ? COLOR_AMBER
            : state === 'locked'
              ? COLOR_DIM
              : seg.status === 'current'
                ? COLOR_AMBER
                : seg.status === 'completed'
                  ? COLOR_CYAN
                  : COLOR_DIM;

        const strokeWidth = state === 'completed'
          ? 3
          : state === 'active'
            ? 4
            : state === 'locked'
              ? 2
              : PATH_WIDTH;

        const d = buildPath(seg.from, seg.to);
        const isActive = state === 'active' || (seg.status === 'current' && seg.to === currentLevel);

        const filterId = state === 'completed'
          ? 'url(#glow-cyan)'
          : isActive
            ? 'url(#glow-amber)'
            : undefined;

        return (
          <motion.path
            key={`${seg.from}-${seg.to}`}
            d={d}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            filter={filterId}
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: 1,
              ...(isActive ? { opacity: [0.7, 1, 0.7] } : {}),
            }}
            transition={{
              duration: 1.2,
              ease: 'easeInOut',
              ...(isActive ? { opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' } } : {}),
            }}
          />
        );
      })}
    </svg>
  );
}
