import { useState, useEffect } from 'react';
import { getUIState, getNavigation } from '@/core/ui_bridge/ui_bridge';
import { setActiveNode, advanceNode } from '@/core/runtime/runtime_controller';
import { snapToActiveNode } from '@/core/focus_snap_controller';
import { JourneyVisualLayer } from '@/components/JourneyVisualLayer/JourneyVisualLayer';
import { JourneyPath } from '@/components/JourneyPath/JourneyPath';
import { JourneyHeader } from '@/components/JourneyHeader/JourneyHeader';
import { JourneyBottomNav } from '@/components/JourneyBottomNav/JourneyBottomNav';
import './JourneyScreen.css';

export function JourneyScreen() {
  const [, forceUpdate] = useState({});

  const ui = getUIState();
  const nav = getNavigation();

  useEffect(() => {
    snapToActiveNode(ui.activeNodeId);
  }, [ui.activeNodeId]);

  const handleNodeSelect = (nodeId: string) => {
    setActiveNode(nodeId);
    forceUpdate({});
  };

  const handleAdvance = () => {
    advanceNode('tap_primary');
    forceUpdate({});
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
