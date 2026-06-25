import { RESUME_SKILL_NODES, LINKEDIN_SKILL_NODES } from '../skill_nodes';
import type { OrchestratorState } from '../orchestrator';

export function initCareerNavigator(): OrchestratorState {
  const allNodes = [
    ...RESUME_SKILL_NODES,
    ...LINKEDIN_SKILL_NODES,
  ];

  return {
    activeNodeId: allNodes[0].id,
    nodes: Object.fromEntries(allNodes.map(n => [n.id, n])),
  };
}

export function isAppReady(state: OrchestratorState): boolean {
  return Object.keys(state.nodes).length > 0 && state.activeNodeId !== '';
}
