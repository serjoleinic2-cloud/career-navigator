import { useState, useMemo, useEffect } from 'react';
import { getActiveProfession, getActiveNodes } from '@/core/profession_loader';
import { getActiveNode, moveToNextState, setActiveNode, canAdvance } from '@/core/orchestrator';
import type { OrchestratorState } from '@/core/orchestrator';
import { buildJourneyViewModel } from '@/core/journey_adapter';
import { buildJourneyUI } from '@/core/journey_orchestrator';
import { snapToActiveNode } from '@/core/focus_snap_controller';
import { JourneyVisualLayer } from '@/components/JourneyVisualLayer/JourneyVisualLayer';
import { JourneyPath } from '@/components/JourneyPath/JourneyPath';
import { JourneyHeader } from '@/components/JourneyHeader/JourneyHeader';
import { JourneyBottomNav } from '@/components/JourneyBottomNav/JourneyBottomNav';
import './JourneyScreen.css';

export function JourneyScreen() {
  const profession = getActiveProfession();

  const [state, setState] = useState<OrchestratorState>({
    activeNodeId: profession.skillNodes[0]?.id ?? '',
    nodes: Object.fromEntries(profession.skillNodes.map(n => [n.id, n])),
  });

  const allNodes = useMemo(() => getActiveNodes(), []);

  const visualNodes = useMemo(() => {
    return buildJourneyViewModel(allNodes, state.activeNodeId);
  }, [allNodes, state.activeNodeId]);

  const renderNodes = useMemo(() => {
    return buildJourneyUI(allNodes);
  }, [allNodes]);

  const activeNode = useMemo(() => getActiveNode(state), [state]);

  useEffect(() => {
    snapToActiveNode(state.activeNodeId);
  }, [state.activeNodeId]);

  const handleNodeSelect = (nodeId: string) => {
    setState(prev => setActiveNode(prev, nodeId));
  };

  const handleAdvance = () => {
    if (!canAdvance(activeNode)) return;
    setState(prev => moveToNextState(prev, 'tap_primary'));
  };

  return (
    <div className="journey-screen">
      <JourneyHeader />
      <JourneyPath nodes={visualNodes} />
      <JourneyVisualLayer nodes={renderNodes} visualNodes={visualNodes} />
      <JourneyBottomNav
        activeNodeId={state.activeNodeId}
        onNodeSelect={handleNodeSelect}
      />
      <button className="advance-btn" onClick={handleAdvance}>
        Advance
      </button>
    </div>
  );
}
