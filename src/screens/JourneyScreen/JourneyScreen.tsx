import { useState, useMemo } from 'react';
import { RESUME_SKILL_NODES, LINKEDIN_SKILL_NODES } from '@/core/skill_nodes';
import { JourneyHeader } from '@/components/JourneyHeader/JourneyHeader';
import { JourneyTimeline } from '@/components/JourneyTimeline/JourneyTimeline';
import { JourneyNodeView } from '@/components/JourneyNodeView/JourneyNodeView';
import { JourneyFocusPanel } from '@/components/JourneyFocusPanel/JourneyFocusPanel';
import { JourneyBottomNav } from '@/components/JourneyBottomNav/JourneyBottomNav';
import './JourneyScreen.css';

export function JourneyScreen() {
  const [activeNodeId, setActiveNodeId] = useState('positioning-clarity');

  const allNodes = useMemo(() => [
    ...RESUME_SKILL_NODES,
    ...LINKEDIN_SKILL_NODES,
  ], []);

  const activeNode = useMemo(() =>
    allNodes.find(n => n.id === activeNodeId),
    [allNodes, activeNodeId]
  );

  const handleStateAdvance = (nodeId: string, newState: string) => {
    if (newState === 'confidence') {
      const currentIndex = allNodes.findIndex(n => n.id === nodeId);
      const nextNode = allNodes[currentIndex + 1];
      if (nextNode) {
        setActiveNodeId(nextNode.id);
      }
    }
  };

  return (
    <div className="journey-screen">
      <JourneyHeader />

      <div className="journey-viewport">
        <JourneyTimeline>
          {allNodes.map(node => (
            <JourneyNodeView
              key={node.id}
              node={node}
              isActive={node.id === activeNodeId}
            />
          ))}
        </JourneyTimeline>

        {activeNode && (
          <JourneyFocusPanel
            node={activeNode}
            onStateAdvance={handleStateAdvance}
          />
        )}
      </div>

      <JourneyBottomNav />
    </div>
  );
}
