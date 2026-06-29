import type { SkillNode } from './skill_state';
import { STATE_FLOW } from './skill_state';
import { submitTask, getRuntimeState } from './runtime/runtime_controller';
import type { JourneyRuntimeState } from './runtime/journey_runtime';

export type UserAction = 'tap_primary' | 'tap_secondary';

export type MissionResult = {
  text?: string;
  checked?: number[];
  score?: number;
};

export function transition(node: SkillNode, action: UserAction): SkillNode {
  if (action !== 'tap_primary') return node;
  if (!node.nextState) return node;

  return {
    ...node,
    state: node.nextState,
    nextState: STATE_FLOW[node.nextState] ?? null,
  };
}

export function canTransition(node: SkillNode): boolean {
  return node.nextState !== null;
}

export function getCurrentAdvice(node: SkillNode): string | undefined {
  return node.advice[node.state];
}

export function getNextAdvice(node: SkillNode): string | null | undefined {
  if (!node.nextState) return null;
  return node.advice[node.nextState];
}

/* ── Unified state accessors (single source of truth) ── */

export function getCareerState(): JourneyRuntimeState | null {
  return getRuntimeState();
}

export function getConfidenceScore(): number {
  return getRuntimeState()?.confidenceScore ?? 0;
}

export function getReadiness(): number {
  return getRuntimeState()?.readinessScore ?? 0;
}

export function getNodeStates(): Record<string, SkillNode> {
  return getRuntimeState()?.nodeStates ?? {};
}

export function getActiveNodeId(): string {
  return getRuntimeState()?.activeNodeId ?? '';
}

export function applyMissionResult(result: MissionResult) {
  return submitTask(result);
}
