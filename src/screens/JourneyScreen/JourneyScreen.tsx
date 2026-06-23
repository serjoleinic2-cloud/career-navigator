import { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { WorldRenderer, mapCareerToLevels } from '@/world';
import { GoalCard } from '@/components/GoalCard/GoalCard';
import { useWorldProgressStore } from '@/world/progressStore';
import { CAREER_DATA } from '../../../engine/career_data';
import type { JourneyNode } from '@/types';
import './JourneyScreen.css';

export function JourneyScreen() {
  const currentLevel = useWorldProgressStore((s) => s.currentLevel);
  const completedLevels = useWorldProgressStore((s) => s.completedLevels);
  const completeLevel = useWorldProgressStore((s) => s.completeLevel);
  const setCurrentLevel = useWorldProgressStore((s) => s.setCurrentLevel);

  const levels = useMemo(() => mapCareerToLevels(CAREER_DATA[0].steps), []);

  const handleLevelPress = useCallback((index: number) => {
    setCurrentLevel(index);
  }, [setCurrentLevel]);

  const handleCompleteLevel = useCallback(() => {
    completeLevel(currentLevel);
  }, [completeLevel, currentLevel]);

  const currentLevelData = levels[currentLevel];

  return (
    <div className="journey-screen">
      <div className="journey-screen__atmosphere-top" />

      <motion.header
        className="journey-screen__header"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="journey-screen__header-inner">
          <div>
            <h1 className="journey-screen__title">Your Journey</h1>
            <p className="journey-screen__subtitle">Software Developer Path</p>
          </div>

          <div className="journey-screen__badge">
            <span className="journey-screen__badge-text">{completedLevels.length}</span>
          </div>
        </div>
      </motion.header>

      <div className="journey-screen__map">
        <WorldRenderer
          levels={levels}
          currentLevel={currentLevel}
          onLevelPress={handleLevelPress}
        />
      </div>

      <GoalCard
        node={
          currentLevelData
            ? ({
                id: String(currentLevelData.index),
                title: currentLevelData.title,
                description: currentLevelData.outcome,
                estimated_time: currentLevelData.estimatedHours * 60,
                tasks: currentLevelData.skillsRequired,
              } as unknown as JourneyNode)
            : null
        }
        completedCount={completedLevels.length}
        totalCount={levels.length}
        onAction={handleCompleteLevel}
      />
    </div>
  );
}
