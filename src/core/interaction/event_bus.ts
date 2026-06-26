import { emit as systemEmit, subscribe as systemSubscribe } from '../events/system_event_bus';
import type { SystemEventType } from '../events/system_event_bus';

export type InteractionEventType =
  | 'onTaskCompleted'
  | 'onSkillUpgraded'
  | 'onChapterCompleted'
  | 'onReadinessChanged'
  | 'onConfidenceChanged';

const typeMap: Record<InteractionEventType, SystemEventType> = {
  onTaskCompleted: 'TASK_COMPLETED',
  onSkillUpgraded: 'STATE_UPDATED',
  onChapterCompleted: 'CHAPTER_CHANGED',
  onReadinessChanged: 'SCORE_UPDATED',
  onConfidenceChanged: 'CONFIDENCE_CHANGED',
};

type Handler = (payload: unknown) => void;

export function subscribe(type: InteractionEventType, handler: Handler): () => void {
  return systemSubscribe(typeMap[type], (event: any) => handler(event.payload));
}

export function emit(type: InteractionEventType, payload: unknown): void {
  systemEmit(typeMap[type], { data: payload });
}

export function clearAllListeners(): void {
}
