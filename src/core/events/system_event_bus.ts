export type SystemEventType =
  | 'SYSTEM_BOOTED'
  | 'PROFESSION_LOADED'
  | 'STATE_UPDATED'
  | 'NODE_CHANGED'
  | 'CHAPTER_CHANGED'
  | 'WORLD_UPDATED'
  | 'UI_REFRESH';

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
