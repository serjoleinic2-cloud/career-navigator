const throttleMap = new Map<string, number>();
const THROTTLE_MS = 100;

export function throttleEvent(eventType: string, fn: () => void): boolean {
  const now = Date.now();
  const last = throttleMap.get(eventType) ?? 0;

  if (now - last < THROTTLE_MS) {
    return false;
  }

  throttleMap.set(eventType, now);
  fn();
  return true;
}

export function isThrottled(eventType: string): boolean {
  const now = Date.now();
  const last = throttleMap.get(eventType) ?? 0;
  return now - last < THROTTLE_MS;
}

export function clearThrottle(eventType: string): void {
  throttleMap.delete(eventType);
}

export function clearAllThrottles(): void {
  throttleMap.clear();
}
