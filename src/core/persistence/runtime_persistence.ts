import type { JourneyRuntimeState } from '../runtime/journey_runtime';
import { load, save, remove, exists } from './storage';

const STORAGE_KEY = 'career-navigator.runtime.v1';
const CURRENT_VERSION = 1;

const opts = { key: STORAGE_KEY, version: CURRENT_VERSION };

function isValidRuntime(data: unknown): data is JourneyRuntimeState {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.professionId === 'string' &&
    typeof d.activeNodeId === 'string' &&
    typeof d.confidenceScore === 'number' &&
    typeof d.readinessScore === 'number' &&
    d.nodeStates !== null &&
    typeof d.nodeStates === 'object' &&
    d.chapterProgress !== null &&
    typeof d.chapterProgress === 'object'
  );
}

export function loadRuntime(): JourneyRuntimeState | null {
  const data = load<unknown>(opts);
  if (!isValidRuntime(data)) return null;
  return data;
}

export function saveRuntime(runtime: JourneyRuntimeState): void {
  save<JourneyRuntimeState>(opts, runtime);
}

export function clearRuntime(): void {
  remove(STORAGE_KEY);
}

export function hasRuntime(): boolean {
  return exists(STORAGE_KEY);
}
