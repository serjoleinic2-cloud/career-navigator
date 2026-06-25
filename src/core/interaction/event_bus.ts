export type InteractionEventType =
  | 'onTaskCompleted'
  | 'onSkillUpgraded'
  | 'onChapterCompleted'
  | 'onReadinessChanged'
  | 'onConfidenceChanged';

type Handler = (payload: unknown) => void;

const listeners = new Map<InteractionEventType, Set<Handler>>();

export function subscribe(type: InteractionEventType, handler: Handler): () => void {
  if (!listeners.has(type)) {
    listeners.set(type, new Set());
  }
  listeners.get(type)!.add(handler);

  return () => {
    const set = listeners.get(type);
    if (set) {
      set.delete(handler);
      if (set.size === 0) {
        listeners.delete(type);
      }
    }
  };
}

export function emit(type: InteractionEventType, payload: unknown): void {
  const set = listeners.get(type);
  if (!set) return;
  for (const handler of set) {
    handler(payload);
  }
}

export function clearAllListeners(): void {
  listeners.clear();
}
