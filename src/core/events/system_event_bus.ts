export type SystemEventType =
  | 'SYSTEM_BOOTED'
  | 'PROFESSION_LOADED'
  | 'STATE_UPDATED'
  | 'NODE_CHANGED'
  | 'CHAPTER_CHANGED'
  | 'WORLD_UPDATED'
  | 'UI_REFRESH'
  | 'TASK_COMPLETED'
  | 'TASK_FAILED'
  | 'STATE_CHANGED'
  | 'SCORE_UPDATED'
  | 'CONFIDENCE_CHANGED'
  | 'CHAPTER_UNLOCKED'
  | 'GAP_UPDATED'
  | 'LEARNING_FEEDBACK'
  | 'ATTEMPT_STARTED'
  | 'ATTEMPT_COMPLETED'
  | 'SKILL_PROGRESS'
  | 'TASK_STARTED'
  | 'TASK_ABORTED'
  | 'READINESS_CHANGED'
  | 'JOURNEY_COMPLETED'
  | 'NOTE_CREATED'
  | 'NOTE_UPDATED'
  | 'NOTE_DELETED'
  | 'MISSION_SUBMIT';

export type SystemEvent = {
  type: SystemEventType;
  payload: Record<string, unknown>;
  timestamp: number;
};

const listeners = new Map<SystemEventType, Set<(event: SystemEvent) => void>>();

export function subscribe(
  type: SystemEventType,
  callback: (event: SystemEvent) => void
): () => void {
  if (!listeners.has(type)) {
    listeners.set(type, new Set());
  }
  listeners.get(type)!.add(callback);

  return () => {
    listeners.get(type)?.delete(callback);
  };
}

export function emit(type: SystemEventType, payload: Record<string, unknown> = {}): void {
  const event: SystemEvent = {
    type,
    payload,
    timestamp: Date.now(),
  };

  listeners.get(type)?.forEach(callback => callback(event));
}

export function emitAll(types: SystemEventType[], payload: Record<string, unknown> = {}): void {
  for (const type of types) {
    emit(type, payload);
  }
}

export function clearAll(): void {
  listeners.clear();
}
