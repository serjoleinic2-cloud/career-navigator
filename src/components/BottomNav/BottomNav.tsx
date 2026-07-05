import { motion } from 'framer-motion';
import { Compass, BookOpen, StickyNote, Map, User } from 'lucide-react';

// Per +Window_functional.md: 5 tabs, Journey first (was "World" — the
// working screen with WorldRenderer+JourneyHUD, renamed here since a new,
// different "World" screen now exists — the illustrated travel map).
// Share is no longer its own tab; it moved into Profile as an action.
type TabId = 'journey' | 'playbook' | 'notes' | 'world' | 'profile';

const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string; size?: number | string }> }[] = [
  { id: 'journey', label: 'Journey', icon: Compass },
  { id: 'playbook', label: 'Playbook', icon: BookOpen },
  { id: 'notes', label: 'Notes', icon: StickyNote },
  { id: 'world', label: 'World', icon: Map },
  { id: 'profile', label: 'Profile', icon: User },
];

interface BottomNavProps {
  currentTab: TabId;
  onTabChange: (tabId: string) => void;
}

export function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-6 pointer-events-none"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.5 }}
    >
      <div
        className="pointer-events-auto w-full max-w-md rounded-full border border-white/[0.08] px-2 py-2"
        style={{
          background: 'rgba(22, 26, 36, 0.55)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(255,255,255,0.03) inset, 0 1px 0 rgba(255,255,255,0.06) inset',
        }}
      >
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === currentTab;

            return (
              <motion.button
                key={tab.id}
                className="relative flex flex-col items-center gap-1 py-1.5 px-2 min-w-[56px]"
                whileTap={{ scale: 0.92 }}
                onClick={() => onTabChange(tab.id)}
              >
                <div className="relative">
                  <Icon
                    size={22}
                    className={`transition-colors duration-300 ${
                      isActive ? 'text-glow-cyan' : 'text-white/45'
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
                <span className={`text-[10px] font-medium transition-colors duration-300 ${
                  isActive ? 'text-glow-cyan' : 'text-white/45'
                }`}>
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
