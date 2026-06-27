import type { JourneyRuntimeState } from '../runtime/journey_runtime';

const STORAGE_KEY = 'career-navigator.runtime.v1';
const CURRENT_VERSION = 1;

interface PersistenceSnapshot {
  version: number;
  savedAt: number;
  runtime: JourneyRuntimeState;
}

export function loadRuntime(): JourneyRuntimeState | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const snapshot: PersistenceSnapshot = JSON.parse(raw);
    if (snapshot.version !== CURRENT_VERSION) {
      return null;
    }
    return snapshot.runtime;
  } catch {
    return null;
  }
}

export function saveRuntime(runtime: JourneyRuntimeState): void {
  const snapshot: PersistenceSnapshot = {
    version: CURRENT_VERSION,
    savedAt: Date.now(),
    runtime,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

export function clearRuntime(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasRuntime(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}
