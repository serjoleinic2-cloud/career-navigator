import type { JourneyRuntimeState } from './journey_runtime';
import type { SyncResult } from './runtime_sync';

export type RuntimeEventType =
  | 'runtime:initialized'
  | 'runtime:node-changed'
  | 'runtime:chapter-advanced'
  | 'runtime:reset'
  | 'runtime:synced';

export type RuntimeEventPayloads = {
  'runtime:initialized': JourneyRuntimeState;
  'runtime:node-changed': { nodeId: string };
  'runtime:chapter-advanced': { chapterId: string };
  'runtime:reset': undefined;
  'runtime:synced': SyncResult;
};

export type RuntimeEvent<T extends RuntimeEventType = RuntimeEventType> = {
  type: T;
  payload: RuntimeEventPayloads[T];
};

type EventHandler<T extends RuntimeEventType = RuntimeEventType> = (
  event: RuntimeEvent<T>
) => void;

const listeners = new Map<RuntimeEventType, Set<EventHandler>>();

export function subscribeToEvent<T extends RuntimeEventType>(
  type: T,
  handler: EventHandler<T>
): () => void {
  if (!listeners.has(type)) {
    listeners.set(type, new Set());
  }
  (listeners.get(type) as Set<EventHandler>).add(handler as EventHandler);

  return () => {
    const set = listeners.get(type);
    if (set) {
      set.delete(handler as EventHandler);
      if (set.size === 0) {
        listeners.delete(type);
      }
    }
  };
}

export function emitEvent<T extends RuntimeEventType>(
  type: T,
  payload: RuntimeEventPayloads[T]
): void {
  const set = listeners.get(type);
  if (!set) return;
  const event: RuntimeEvent<T> = { type, payload } as RuntimeEvent<T>;
  for (const handler of set) {
    handler(event as RuntimeEvent);
  }
}

export function clearAllListeners(): void {
  listeners.clear();
}
