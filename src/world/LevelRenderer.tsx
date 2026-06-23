import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingOrb } from '@/components/FloatingOrb';
import type { CareerLevel } from './types';

interface LevelRendererProps {
  level: CareerLevel;
  isCurrent: boolean;
  onPress?: () => void;
  onExpand?: () => void;
  onHover?: (isHovering: boolean) => void;
}

const statusConfig = {
  completed: {
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/5',
    glow: 'node-glow-completed',
    icon: '✓',
    iconColor: '#00e5e0',
  },
  current: {
    border: 'border-amber-500/40',
    bg: 'bg-amber-500/5',
    glow: 'node-glow-current',
    icon: null,
    iconColor: '#f59e0b',
  },
  locked: {
    border: 'border-white/5',
    bg: 'bg-white/[0.02]',
    glow: '',
    icon: '🔒',
    iconColor: '#4a4a6a',
  },
};

export function LevelRenderer({ level, isCurrent, onPress, onExpand, onHover }: LevelRendererProps) {
  const [expanded, setExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const cfg = statusConfig[level.status];

  const handleClick = () => {
    if (level.status === 'locked') {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }
    setExpanded(!expanded);
    onExpand?.();
    onPress?.();
  };

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`glass-panel rounded-2xl p-4 w-[180px] relative ${cfg.border} ${cfg.bg} ${cfg.glow} ${level.status !== 'locked' ? 'cursor-pointer' : 'cursor-default'}`}
          onClick={handleClick}
          onHoverStart={() => onHover?.(true)}
          onHoverEnd={() => onHover?.(false)}
          whileHover={level.status !== 'locked' ? { scale: 1.02 } : undefined}
          data-level-index={level.index}
        >
          {level.status === 'current' && isCurrent && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <FloatingOrb size={28} intensity="high" />
            </div>
          )}

          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-white/40 font-mono">LVL {level.index + 1}</span>
            {cfg.icon && (
              <span style={{ color: cfg.iconColor, fontSize: 14 }}>{cfg.icon}</span>
            )}
          </div>

          <h3 className="text-sm font-semibold text-white/90 leading-tight">
            {level.title}
          </h3>

          {level.description && (
            <p className="text-xs text-white/40 mt-1">{level.description}</p>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50"
          >
            Complete previous level to unlock
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expanded && (level.status === 'current' || level.status === 'completed') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 w-[220px] glass-panel rounded-xl p-3 overflow-hidden"
          >
            <p className="text-xs text-white/60 mb-2">{level.outcome}</p>

            {level.skillsRequired.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {level.skillsRequired.map((skill) => (
                  <span key={skill} className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-white/50 border border-white/5">
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between text-[10px] text-white/40">
              <span>~{level.estimatedHours}h estimated</span>
            </div>

            {level.resources.length > 0 && (
              <div className="mt-2 pt-2 border-t border-white/5">
                <p className="text-[10px] text-white/30 mb-1">Resources:</p>
                {level.resources.map((r) => (
                  <span key={r} className="block text-[10px] text-white/40">{r}</span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
