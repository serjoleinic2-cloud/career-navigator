import { motion } from 'framer-motion';
import type { PathSegment } from './types';

interface VerticalPathProps {
  segments: PathSegment[];
  currentLevel: number;
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

export function VerticalPath({ segments, currentLevel }: VerticalPathProps) {
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

      {segments.map((seg) => {
        const color = seg.status === 'current'
          ? COLOR_AMBER
          : seg.status === 'completed'
            ? COLOR_CYAN
            : COLOR_DIM;

        const d = buildPath(seg.from, seg.to);
        const isCurrent = seg.status === 'current' && seg.to === currentLevel;
        const filterId = isCurrent ? 'url(#glow-amber)' : seg.status === 'completed' ? 'url(#glow-cyan)' : undefined;

        return (
          <motion.path
            key={`${seg.from}-${seg.to}`}
            d={d}
            stroke={color}
            strokeWidth={PATH_WIDTH}
            fill="none"
            strokeLinecap="round"
            filter={filterId}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        );
      })}
    </svg>
  );
}
