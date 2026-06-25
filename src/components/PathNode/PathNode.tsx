import { motion } from 'framer-motion';
import {
  GitBranch, Github, Code, Layout, FileText, Linkedin,
  MessageCircle, Terminal, Send, Trophy, Lock
} from 'lucide-react';
interface LegacyNode {
  id: string;
  title: string;
  icon: string;
  position: { x: number; y: number };
  estimated_time: number;
  tasks: string[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number | string }>> = {
  GitBranch, Github, Code, Layout, FileText, Linkedin,
  MessageCircle, Terminal, Send, Trophy,
};

interface PathNodeProps {
  node: LegacyNode;
  status: 'completed' | 'current' | 'locked';
  index: number;
  totalNodes: number;
  onPress?: (node: LegacyNode) => void;
}

export function PathNode({ node, status, index, totalNodes, onPress }: PathNodeProps) {
  const IconComponent = iconMap[node.icon] || Code;
  const isLeft = node.position.x < 50;
  const nodeOffset = isLeft ? '-translate-x-[125%]' : 'translate-x-[125%]';

  const statusConfig = {
    completed: {
      bg: 'bg-glow-cyan/10',
      border: 'border-glow-cyan/30',
      iconColor: 'text-glow-cyan',
      glow: 'node-glow-completed',
      ring: 'ring-1 ring-glow-cyan/20',
      label: 'text-glow-cyan',
      dot: 'bg-glow-cyan',
      opacity: 1,
    },
    current: {
      bg: 'bg-glow-amber/10',
      border: 'border-glow-amber/40',
      iconColor: 'text-glow-amber',
      glow: 'node-glow-current',
      ring: 'ring-1 ring-glow-amber/30',
      label: 'text-glow-amber',
      dot: 'bg-glow-amber',
      opacity: 1,
    },
    locked: {
      bg: 'bg-void-700/30',
      border: 'border-void-600/30',
      iconColor: 'text-void-500',
      glow: '',
      ring: '',
      label: 'text-void-500',
      dot: 'bg-void-600',
      opacity: 0.5,
    },
  };

  const config = statusConfig[status];
  const progress = (index / totalNodes) * 100;

  const atmosphereClass = progress < 33 ? 'atmosphere-early' : progress < 66 ? 'atmosphere-mid' : 'atmosphere-late';

  return (
    <motion.div
      data-node-id={node.id}
      className={`absolute flex items-center justify-center ${atmosphereClass}`}
      style={{
        left: `${node.position.x}%`,
        top: `${node.position.y * 200 + 80}px`,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: config.opacity, scale: 1 }}
      transition={{
        delay: index * 0.12,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="relative z-10">
        <motion.div
          className={`
            w-4 h-4 rounded-full ${config.dot}
            ${status === 'current' ? 'animate-pulse-glow' : ''}
          `}
          animate={status === 'current' ? {
            scale: [1, 1.4, 1],
            boxShadow: [
              '0 0 10px rgba(245,158,11,0.3)',
              '0 0 25px rgba(245,158,11,0.6)',
              '0 0 10px rgba(245,158,11,0.3)',
            ],
          } : {}}
          transition={status === 'current' ? {
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          } : {}}
        />

        {status === 'current' && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border border-glow-amber/20"
              animate={{ scale: [1, 2.8], opacity: [0.5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-glow-amber/15"
              animate={{ scale: [1, 3.5], opacity: [0.3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
            />
          </>
        )}
      </div>

      <motion.div
        className={`
          absolute ${nodeOffset} top-1/2 -translate-y-1/2
          w-44 glass-panel rounded-2xl p-3.5
          border ${config.border} ${config.bg}
          ${config.glow} ${config.ring}
          transition-all duration-500
          ${status !== 'locked' ? 'cursor-pointer' : 'pointer-events-none'}
        `}
        onClick={() => status !== 'locked' && onPress?.(node)}
        whileHover={status !== 'locked' ? { scale: 1.04, y: -2 } : {}}
        whileTap={status !== 'locked' ? { scale: 0.97 } : {}}
      >
        <div className="flex items-center gap-3">
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
            ${status === 'locked' ? 'bg-void-800/80' : 'bg-white/[0.04]'}
          `}>
            {status === 'locked' ? (
              <Lock size={16} className="text-void-500" />
            ) : (
              <IconComponent size={18} className={config.iconColor} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className={`text-sm font-semibold truncate ${config.label}`}>
              {node.title}
            </h3>
            <p className="text-[10px] text-white/30 mt-0.5">
              {status === 'completed' ? 'Completed' :
               status === 'current' ? `~${Math.round(node.estimated_time / 60)}h` : 'Locked'}
            </p>
          </div>
        </div>

        {status === 'current' && (
          <div className="mt-2.5 h-0.5 bg-void-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-glow-amber rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '30%' }}
              transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
            />
          </div>
        )}

        {status === 'completed' && (
          <motion.div
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-glow-cyan flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 15 }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5.5L4 7.5L8 3" stroke="#0a0a0f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
