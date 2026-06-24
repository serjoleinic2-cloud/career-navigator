import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { WorldDebugMode } from '@/world/WorldDebugMode';
import { mapCareerToLevels } from '@/world/careerToWorld';
import { GoalCard } from '@/components/GoalCard/GoalCard';
import { JourneyNodeView } from '@/components/JourneyNodeView/JourneyNodeView';
import { buildJourney } from '@/core/career_engine_v2';
import { getVisibleNodes } from '@/core/focus_controller';
import { useProgressStore } from '@/store/progressStore';
import { developerNodes } from '@/data/developerPath';
import type { JourneyNode as CoreJourneyNode } from '@/core/career_journey_model';
import type { JourneyNode } from '@/types';
import './JourneyScreen.css';

const DEBUG_MODE = true;

const profile = { profession: 'Software Engineer', experience: 'junior' as const };

function toGoalCardNode(node: CoreJourneyNode | undefined): JourneyNode | null {
  if (!node) return null;
  return {
    id: node.id,
    chapter_id: node.chapter,
    title: node.title,
    description: `${node.chapter} — Day ${node.dayIndex}`,
    type: 'action',
    status: 'available',
    estimated_time: (node.tasks?.length || 1) * 30,
    position: { x: 0, y: 0 },
    environment: 'code-tower',
    tasks: node.tasks || [],
    icon: 'target',
    created_at: new Date().toISOString(),
  };
}

export function JourneyScreen() {
  const currentNodeId = useProgressStore((s) => s.currentNodeId);
  const completedNodeIds = useProgressStore((s) => s.completedNodeIds);
  const completeNode = useProgressStore((s) => s.completeNode);
  const setCurrentNode = useProgressStore((s) => s.setCurrentNode);
  const unlockNode = useProgressStore((s) => s.unlockNode);

  const [showDebug, setShowDebug] = useState(DEBUG_MODE);

  const currentNode = developerNodes.find(n => n.id === currentNodeId) || null;
  const completedCount = completedNodeIds.length;

  const worldLevels = useMemo(() => {
    const steps = developerNodes.map((n) => n.title);
    return mapCareerToLevels(steps);
  }, []);

  const handleGoalAction = () => {
    if (!currentNode) return;
    const nextIndex = developerNodes.findIndex(n => n.id === currentNode.id) + 1;
    if (nextIndex < developerNodes.length) {
      completeNode(currentNode.id);
      setCurrentNode(developerNodes[nextIndex].id);
      unlockNode(developerNodes[nextIndex].id);
    } else {
      completeNode(currentNode.id);
    }
  };

  const journey = useMemo(() => buildJourney(profile), []);
  const allNodes = useMemo(() => journey.chapters.flatMap(c => c.nodes), [journey]);
  const { done, active, future } = useMemo(() => getVisibleNodes(allNodes, journey.currentDay), [allNodes, journey.currentDay]);

  const goalCardNode = toGoalCardNode(active ?? undefined);

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
          <div className="journey-timeline">
            <div className="journey-timeline__done">
              {done.map(node => (
                <JourneyNodeView key={node.id} {...node} isFocused={false} />
              ))}
            </div>

            <div className="journey-timeline__active">
              {active && (
                <JourneyNodeView {...active} isFocused={true} />
              )}
            </div>

            <div className="journey-timeline__future">
              {future.map(node => (
                <JourneyNodeView key={node.id} {...node} isFocused={false} />
              ))}
            </div>
          </div>

          <GoalCard
            node={goalCardNode}
            completedCount={done.length}
            totalCount={allNodes.length}
            onAction={handleGoalAction}
          />
        </>
      )}
    </div>
  );
}
