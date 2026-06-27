import type { JourneyRuntimeState } from '../runtime/journey_runtime';
import { load, save, remove, exists } from './storage';

const STORAGE_KEY = 'career-navigator.runtime.v1';
const CURRENT_VERSION = 1;

const opts = { key: STORAGE_KEY, version: CURRENT_VERSION };

export function loadRuntime(): JourneyRuntimeState | null {
  return load<JourneyRuntimeState>(opts);
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
