import type { SkillNode } from './skill_state';
import { transition } from './skill_engine';
import type { UserAction } from './skill_engine';

export type OrchestratorState = {
  activeNodeId: string;
  nodes: Record<string, SkillNode>;
};

export function getActiveNode(state: OrchestratorState): SkillNode {
  const node = state.nodes[state.activeNodeId];
  if (!node) throw new Error(`Active node ${state.activeNodeId} not found`);
  return node;
}

export function moveToNextState(
  state: OrchestratorState,
  action: UserAction
): OrchestratorState {
  const active = getActiveNode(state);
  const updatedNode = transition(active, action);

  return {
    ...state,
    nodes: {
      ...state.nodes,
      [updatedNode.id]: updatedNode,
    },
  };
}

export function setActiveNode(
  state: OrchestratorState,
  nodeId: string
): OrchestratorState {
  if (!state.nodes[nodeId]) {
    throw new Error(`Node ${nodeId} not found`);
  }
  return {
    ...state,
    activeNodeId: nodeId,
  };
}

export function canAdvance(node: SkillNode): boolean {
  return node.state !== 'confidence';
}

export function getNodeById(
  state: OrchestratorState,
  id: string
): SkillNode | undefined {
  return state.nodes[id];
}

export function getAllNodes(state: OrchestratorState): SkillNode[] {
  return Object.values(state.nodes);
}
