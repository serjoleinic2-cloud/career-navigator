import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PathNode } from '@/components/PathNode/PathNode';
import { FloatingOrb } from '@/components/FloatingOrb/FloatingOrb';
import { useJourneyCamera } from '@/hooks/useJourneyCamera';
import { useProgressStore } from '@/store/progressStore';
import { developerNodes } from '@/data/developerPath';
import type { JourneyNode } from '@/types';

interface JourneyMapProps {
  onNodePress?: (node: JourneyNode) => void;
}

export function JourneyMap({ onNodePress }: JourneyMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentNodeId = useProgressStore((s) => s.currentNodeId);
  const completedNodeIds = useProgressStore((s) => s.completedNodeIds);
  const getNodeStatus = useProgressStore((s) => s.getNodeStatus);

  const { isScrolling } = useJourneyCamera({
    containerRef,
    currentId: currentNodeId,
    behavior: 'smooth',
    delay: 500,
  });

  const pathD = useMemo(() => {
    if (developerNodes.length < 2) return '';

    const points = developerNodes.map((node) => ({
      x: node.position.x,
      y: node.position.y * 200 + 80 + 8,
    }));

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midY = (prev.y + curr.y) / 2;
      d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
    }

    return d;
  }, []);

  const completedCount = completedNodeIds.length;
  const pathProgress = Math.min(1, completedCount / (developerNodes.length - 1));

  const decorations = useMemo(() => {
    const items = [];

    for (let i = 0; i < 5; i++) {
      items.push({
        type: 'tower' as const,
        x: 3 + Math.random() * 12,
        y: i * 350 + 20,
        height: 100 + Math.random() * 100,
        width: 16 + Math.random() * 12,
      });
    }

    for (let i = 0; i < 4; i++) {
      items.push({
        type: 'building' as const,
        x: 82 + Math.random() * 13,
        y: i * 400 + 80,
        height: 50 + Math.random() * 50,
        width: 35 + Math.random() * 25,
      });
    }

    for (let i = 0; i < 15; i++) {
      items.push({
        type: 'particle' as const,
        x: Math.random() * 100,
        y: Math.random() * 2200,
        size: 1.5 + Math.random() * 3,
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 4,
      });
    }

    return items;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-y-auto hide-scrollbar"
      style={{ scrollBehavior: 'smooth' }}
    >
      <div
        className="relative w-full"
        style={{ height: `${developerNodes.length * 200 + 500}px` }}
      >
        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            pathProgress < 0.33 ? 'atmosphere-early' :
            pathProgress < 0.66 ? 'atmosphere-mid' : 'atmosphere-late'
          }`}
        />

        {decorations.map((dec, i) => {
          if (dec.type === 'tower') {
            return (
              <div
                key={`tower-${i}`}
                className="absolute"
                style={{
                  left: `${dec.x}%`,
                  top: dec.y,
                  width: dec.width,
                  height: dec.height,
                  borderRadius: '3px 3px 0 0',
                  background: 'linear-gradient(180deg, rgba(0,229,224,0.06) 0%, rgba(0,229,224,0.02) 40%, transparent 100%)',
                  opacity: 0.25,
                }}
              />
            );
          }

          if (dec.type === 'building') {
            return (
              <div
                key={`building-${i}`}
                className="absolute"
                style={{
                  left: `${dec.x}%`,
                  top: dec.y,
                  width: dec.width,
                  height: dec.height,
                  borderRadius: '2px',
                  background: 'linear-gradient(180deg, rgba(168,85,247,0.05) 0%, rgba(168,85,247,0.02) 40%, transparent 100%)',
                  opacity: 0.2,
                }}
              />
            );
          }

          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${dec.x}%`,
                top: dec.y,
                width: dec.size,
                height: dec.size,
                background: 'rgba(0, 229, 224, 0.25)',
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.15, 0.5, 0.15],
              }}
              transition={{
                duration: dec.duration,
                repeat: Infinity,
                delay: dec.delay,
                ease: 'easeInOut',
              }}
            />
          );
        })}

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox={`0 0 100 ${developerNodes.length * 200 + 500}`}
        >
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 229, 224, 0.35)" />
              <stop offset="50%" stopColor="rgba(0, 229, 224, 0.18)" />
              <stop offset="100%" stopColor="rgba(0, 229, 224, 0.05)" />
            </linearGradient>

            <filter id="pathGlow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <path
            d={pathD}
            fill="none"
            stroke="rgba(0, 229, 224, 0.06)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <motion.path
            d={pathD}
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#pathGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: pathProgress }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />

          <motion.path
            d={pathD}
            fill="none"
            stroke="rgba(0, 229, 224, 0.1)"
            strokeWidth="7"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: pathProgress }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />
        </svg>

        {developerNodes.map((node, index) => {
          const status = getNodeStatus(node.id);

          return (
            <PathNode
              key={node.id}
              node={node}
              status={status}
              index={index}
              totalNodes={developerNodes.length}
              onPress={onNodePress}
            />
          );
        })}

        {currentNodeId && !isScrolling && (
          <FloatingOrbAtNode nodeId={currentNodeId} />
        )}

        <div className="absolute bottom-0 left-0 right-0 h-56" />
      </div>
    </div>
  );
}

function FloatingOrbAtNode({ nodeId }: { nodeId: string }) {
  const node = developerNodes.find((n) => n.id === nodeId);
  if (!node) return null;

  return (
    <motion.div
      className="absolute pointer-events-none z-20"
      style={{
        left: `${node.position.x}%`,
        top: `${node.position.y * 200 + 80}px`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        damping: 18,
        stiffness: 180,
        delay: 0.6,
      }}
    >
      <FloatingOrb size={42} intensity="high" />
    </motion.div>
  );
}
