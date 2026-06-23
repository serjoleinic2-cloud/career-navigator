import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Clock, CheckCircle2, Zap } from 'lucide-react';
import type { JourneyNode } from '@/types';

interface GoalCardProps {
  node: JourneyNode | null;
  completedCount: number;
  totalCount: number;
  onAction?: () => void;
}

export function GoalCard({ node, completedCount, totalCount, onAction }: GoalCardProps) {
  if (!node) return null;

  const progress = (completedCount / totalCount) * 100;
  const isCompleted = completedCount >= totalCount;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={node.id}
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 120, opacity: 0 }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 220,
          mass: 0.8,
        }}
        className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-8 pt-3"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(10,10,15,0.97) 0%, rgba(10,10,15,0.85) 40%, rgba(10,10,15,0.4) 70%, transparent 100%)',
          }}
        />

        <div className="relative max-w-md mx-auto">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex-1 h-0.5 bg-void-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00e5e0, #a855f7)',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <span className="text-[10px] text-white/30 font-medium whitespace-nowrap tabular-nums">
              {completedCount}/{totalCount}
            </span>
          </div>

          <motion.div
            className="glass-panel rounded-2xl p-4 glow-border cursor-pointer"
            onClick={onAction}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start gap-3.5">
              <motion.div
                className={`
                  w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                  ${isCompleted ? 'bg-glow-cyan/15' : 'bg-glow-amber/15'}
                `}
                animate={!isCompleted ? {
                  boxShadow: [
                    '0 0 0px rgba(245,158,11,0)',
                    '0 0 15px rgba(245,158,11,0.2)',
                    '0 0 0px rgba(245,158,11,0)',
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isCompleted ? (
                  <CheckCircle2 size={20} className="text-glow-cyan" />
                ) : (
                  <Zap size={20} className="text-glow-amber" />
                )}
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold text-white truncate">
                    {isCompleted ? 'Journey Complete' : node.title}
                  </h2>
                  <ChevronRight size={16} className="text-white/20 flex-shrink-0" />
                </div>

                <p className="text-xs text-white/40 mt-1 leading-relaxed line-clamp-2">
                  {isCompleted
                    ? 'You have reached the Offer Castle. Your journey is complete.'
                    : node.description}
                </p>

                {!isCompleted && (
                  <div className="flex items-center gap-4 mt-2.5">
                    <span className="text-[10px] text-white/25 flex items-center gap-1">
                      <Clock size={10} />
                      {Math.round(node.estimated_time / 60)}h
                    </span>
                    <span className="text-[10px] text-white/25">
                      {node.tasks.length} tasks
                    </span>
                  </div>
                )}
              </div>
            </div>

            {!isCompleted && node.tasks.length > 0 && (
              <motion.div
                className="mt-3 pt-3 border-t border-white/[0.04]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-[11px] text-glow-amber/70 font-medium">
                  Next: {node.tasks[0]}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
