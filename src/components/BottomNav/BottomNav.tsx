import { motion } from 'framer-motion';
import { Map, ListTodo, BarChart3, User } from 'lucide-react';
import { useProgressStore } from '@/store/progressStore';
import type { TabId } from '@/types';

const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string; size?: number | string }> }[] = [
  { id: 'journey', label: 'Journey', icon: Map },
  { id: 'tasks', label: 'Tasks', icon: ListTodo },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const activeTab = useProgressStore((s) => s.activeTab);
  const setActiveTab = useProgressStore((s) => s.setActiveTab);

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.5 }}
    >
      <div
        className="absolute bottom-full left-0 right-0 h-12 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 100%)',
        }}
      />

      <div className="glass-panel border-t border-white/[0.04] px-2 pb-6 pt-2">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <motion.button
                key={tab.id}
                className="relative flex flex-col items-center gap-1 py-1.5 px-4 min-w-[64px]"
                onClick={() => setActiveTab(tab.id)}
                whileTap={{ scale: 0.92 }}
              >
                <div className="relative">
                  <Icon
                    size={22}
                    className={`transition-colors duration-300 ${
                      isActive ? 'text-glow-cyan' : 'text-white/30'
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      className="absolute -inset-2 rounded-full bg-glow-cyan/10"
                      layoutId="navGlow"
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors duration-300 ${
                    isActive ? 'text-glow-cyan' : 'text-white/30'
                  }`}
                >
                  {tab.label}
                </span>

                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-glow-cyan"
                    layoutId="navIndicator"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
