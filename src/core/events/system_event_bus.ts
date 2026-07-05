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
  | 'MISSION_SUBMIT'
  | 'MISSION_RESULT'
  | 'OPEN_PLAYBOOK';

export type SystemEvent = {
  type: SystemEventType;
  payload: Record<string, unknown>;
  timestamp: number;
};

const listeners = new Map<SystemEventType, Set<(event: SystemEvent) => void>>();

function getListenerSet(type: SystemEventType): Set<(event: SystemEvent) => void> {
  if (!listeners.has(type)) {
    listeners.set(type, new Set());
  }
  return listeners.get(type)!;
}

export function subscribe(
  type: SystemEventType,
  callback: (event: SystemEvent) => void
): () => void {
  const set = getListenerSet(type);
  if (set.has(callback)) {
    return () => unsubscribe(type, callback);
  }
  set.add(callback);
  return () => unsubscribe(type, callback);
}

export function unsubscribe(
  type: SystemEventType,
  callback: (event: SystemEvent) => void
): void {
  const set = listeners.get(type);
  if (!set) return;
  set.delete(callback);
  if (set.size === 0) {
    listeners.delete(type);
  }
}

export function once(
  type: SystemEventType,
  callback: (event: SystemEvent) => void
): () => void {
  let fired = false;
  const wrapper = (event: SystemEvent) => {
    if (fired) return;
    fired = true;
    unsubscribe(type, wrapper);
    callback(event);
  };
  return subscribe(type, wrapper);
}

export function emit(type: SystemEventType, payload: Record<string, unknown> = {}): void {
  const set = listeners.get(type);
  if (!set || set.size === 0) return;

  const event: SystemEvent = {
    type,
    payload,
    timestamp: Date.now(),
  };

  set.forEach(callback => callback(event));
}

export function emitAll(types: SystemEventType[], payload: Record<string, unknown> = {}): void {
  for (const type of types) {
    emit(type, payload);
  }
}

export function clearAll(): void {
  listeners.clear();
}

export function getListenerCount(type: SystemEventType): number {
  return listeners.get(type)?.size ?? 0;
}
