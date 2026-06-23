import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { WorldDebugMode } from '@/world/WorldDebugMode';
import { mapCareerToLevels } from '@/world/careerToWorld';
import { GoalCard } from '@/components/GoalCard/GoalCard';
import { useProgressStore } from '@/store/progressStore';
import { developerNodes, getNodeById, getNextNode } from '@/data/developerPath';
import './JourneyScreen.css';

// TODO: set to false before release
const DEBUG_MODE = true;

export function JourneyScreen() {
  const currentNodeId = useProgressStore((s) => s.currentNodeId);
  const completedNodeIds = useProgressStore((s) => s.completedNodeIds);
  const completeNode = useProgressStore((s) => s.completeNode);
  const setCurrentNode = useProgressStore((s) => s.setCurrentNode);
  const unlockNode = useProgressStore((s) => s.unlockNode);

  const [showDebug, setShowDebug] = useState(DEBUG_MODE);

  const currentNode = getNodeById(currentNodeId || '') || null;
  const completedCount = completedNodeIds.length;
  const totalCount = developerNodes.length;

  const worldLevels = useMemo(() => {
    const steps = developerNodes.map((n) => n.title);
    return mapCareerToLevels(steps);
  }, []);

  const handleGoalAction = useCallback(() => {
    if (!currentNode) return;
    const nextNode = getNextNode(currentNode.id);
    if (nextNode) {
      completeNode(currentNode.id);
      setCurrentNode(nextNode.id);
      unlockNode(nextNode.id);
    } else {
      completeNode(currentNode.id);
    }
  }, [currentNode, completeNode, setCurrentNode, unlockNode]);

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

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => setShowDebug((p) => !p)}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                border: '1px solid rgba(0,229,224,0.3)',
                background: 'rgba(0,229,224,0.1)',
                color: '#00e5e0',
                fontSize: 10,
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: 1,
              }}
            >
              {showDebug ? 'DEBUG ON' : 'DEBUG OFF'}
            </button>

            <div className="journey-screen__badge">
              <span className="journey-screen__badge-text">{completedCount}</span>
            </div>
          </div>
        </div>
      </motion.header>

      {showDebug ? (
        <WorldDebugMode
          levels={worldLevels}
          currentLevel={completedCount}
          completedLevels={completedNodeIds.map((_, i) => i)}
        />
      ) : (
        <>
          <div className="journey-screen__map">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'rgba(255,255,255,0.3)',
                fontSize: 14,
              }}
            >
              WorldRenderer (scroll mode) — toggle DEBUG to see full map
            </div>
          </div>

          <GoalCard
            node={currentNode}
            completedCount={completedCount}
            totalCount={totalCount}
            onAction={handleGoalAction}
          />
        </>
      )}
    </div>
  );
}
