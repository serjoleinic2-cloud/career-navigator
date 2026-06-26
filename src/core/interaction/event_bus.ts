// COMPATIBILITY ADAPTER — interaction/event_bus.ts
// Proxies all calls to canonical system_event_bus.ts
// BACKWARD COMPATIBILITY ONLY — do not use in new code

import { subscribe as systemSubscribe, emit as systemEmit } from '../events/system_event_bus';
import type { SystemEventType } from '../events/system_event_bus';

export type InteractionEventType =
  | 'onTaskCompleted'
  | 'onSkillUpgraded'
  | 'onChapterCompleted'
  | 'onReadinessChanged'
  | 'onConfidenceChanged';

type Handler = (payload: unknown) => void;

const typeMap: Record<InteractionEventType, SystemEventType> = {
  onTaskCompleted: 'TASK_COMPLETED',
  onSkillUpgraded: 'NODE_CHANGED',
  onChapterCompleted: 'CHAPTER_CHANGED',
  onReadinessChanged: 'SCORE_UPDATED',
  onConfidenceChanged: 'CONFIDENCE_CHANGED',
};

export function subscribe(type: InteractionEventType, handler: Handler): () => void {
  return systemSubscribe(typeMap[type], (event) => {
    handler(event.payload);
  });
}

export function emit(type: InteractionEventType, payload: unknown): void {
  systemEmit(typeMap[type], payload as Record<string, unknown>);
}

export function clearAllListeners(): void {
  // No-op: system_event_bus manages all listeners
}
