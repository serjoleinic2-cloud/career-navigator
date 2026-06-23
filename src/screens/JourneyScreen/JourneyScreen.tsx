import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { JourneyMap } from '@/components/JourneyMap/JourneyMap';
import { GoalCard } from '@/components/GoalCard/GoalCard';
import { useProgressStore } from '@/store/progressStore';
import { developerNodes, getNodeById, getNextNode } from '@/data/developerPath';
import type { JourneyNode } from '@/types';
import './JourneyScreen.css';

export function JourneyScreen() {
  const [error, setError] = useState<string | null>(null);
  const currentNodeId = useProgressStore((s) => s.currentNodeId);
  const completedNodeIds = useProgressStore((s) => s.completedNodeIds);
  const completeNode = useProgressStore((s) => s.completeNode);
  const setCurrentNode = useProgressStore((s) => s.setCurrentNode);
  const unlockNode = useProgressStore((s) => s.unlockNode);

  const currentNode = getNodeById(currentNodeId || '') || null;
  const completedCount = completedNodeIds.length;
  const totalCount = developerNodes.length;

  const handleNodePress = useCallback((node: JourneyNode) => {
    console.log('Node pressed:', node.title);
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

  if (error) return <div style={{ color: 'red', padding: 20 }}>Render error: {error}</div>;

  let content: JSX.Element | null;
  try {
    content = (
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
              <span className="journey-screen__badge-text">{completedCount}</span>
            </div>
          </div>
        </motion.header>

        <div className="journey-screen__map">
          <JourneyMap onNodePress={handleNodePress} />
        </div>

        <GoalCard
          node={currentNode}
          completedCount={completedCount}
          totalCount={totalCount}
          onAction={handleGoalAction}
        />
      </div>
    );
  } catch (e) {
    setError(String(e));
    content = null;
  }

  return content || <div style={{ color: 'red', padding: 20 }}>Render error: {error}</div>;
}
