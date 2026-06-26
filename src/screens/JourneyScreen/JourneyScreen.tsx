import { useState, useEffect, useCallback } from 'react';
import { getUIState, getNavigation } from '@/core/ui_bridge/ui_bridge';
import { setActiveNode, advanceNode } from '@/core/runtime/runtime_controller';
import { snapToActiveNode } from '@/core/focus_snap_controller';
import { JourneyVisualLayer } from '@/components/JourneyVisualLayer/JourneyVisualLayer';
import { JourneyPath } from '@/components/JourneyPath/JourneyPath';
import { JourneyHeader } from '@/components/JourneyHeader/JourneyHeader';
import { JourneyBottomNav } from '@/components/JourneyBottomNav/JourneyBottomNav';
import { subscribe } from '@/core/events/system_event_bus';
import './JourneyScreen.css';

export function JourneyScreen() {
  const [, setTick] = useState(0);
  const refresh = useCallback(() => setTick(t => t + 1), []);

  const ui = getUIState();
  const nav = getNavigation();

  useEffect(() => {
    snapToActiveNode(ui.activeNodeId);
  }, [ui.activeNodeId]);

  useEffect(() => {
    const unsubs = [
      subscribe('TASK_COMPLETED', refresh),
      subscribe('STATE_CHANGED', refresh),
      subscribe('SCORE_UPDATED', refresh),
      subscribe('CONFIDENCE_CHANGED', refresh),
      subscribe('UI_REFRESH', refresh),
    ];
    return () => unsubs.forEach(u => u());
  }, [refresh]);

  const handleNodeSelect = (nodeId: string) => {
    setActiveNode(nodeId);
  };

  const handleAdvance = () => {
    advanceNode('tap_primary');
  };

  return (
    <div className="journey-screen">
      <JourneyHeader
        chapterTitle={ui.currentChapterTitle}
        readiness={ui.readinessBadge}
        confidence={ui.confidenceBadge}
      />
      <JourneyPath nodes={ui.nodes} />
      <JourneyVisualLayer nodes={ui.nodes} />
      <JourneyBottomNav
        activeNodeId={ui.activeNodeId}
        onNodeSelect={handleNodeSelect}
        onAdvance={handleAdvance}
        hasNext={nav.hasNext}
        hasPrevious={nav.hasPrevious}
      />
    </div>
  );
}
