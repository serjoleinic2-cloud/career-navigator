import type { JourneyRuntimeState } from '../runtime/journey_runtime';
import { load, save, remove, exists } from './storage';

// HARDENING (2026-07-13): this used to store exactly ONE JourneyRuntimeState
// under a single global key, no matter how many professions the user owns.
// `switchProfession()` in runtime_controller.ts would just overwrite that
// one blob with an empty runtime for the new profession — so a user who
// owns 2+ professions and wants to make progress in each independently had
// no way to do that: switching to profession B silently deleted whatever
// progress existed in profession A. Storage is now keyed per profession
// (`career-navigator.runtime.<professionId>.v1`), with a small separate
// pointer key remembering which profession was last active (so a normal
// cold start still "just resumes" without the caller having to know which
// profession to ask for).
const LEGACY_STORAGE_KEY = 'career-navigator.runtime.v1';
const ACTIVE_PROFESSION_KEY = 'career-navigator.activeProfessionId.v1';
const CURRENT_VERSION = 1;

function keyFor(professionId: string): string {
  return `career-navigator.runtime.${professionId}.v1`;
}

function optsFor(professionId: string) {
  return { key: keyFor(professionId), version: CURRENT_VERSION };
}

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

function getLastActiveProfessionId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_PROFESSION_KEY);
  } catch {
    return null;
  }
}

function setLastActiveProfessionId(professionId: string): void {
  try {
    localStorage.setItem(ACTIVE_PROFESSION_KEY, professionId);
  } catch (e) {
    console.warn('[runtime_persistence] failed to persist active profession pointer:', e);
  }
}

/** Loads the runtime for a specific profession, or null if that profession
 * has never been started. Does not change which profession is "active". */
export function loadRuntimeForProfession(professionId: string): JourneyRuntimeState | null {
  const data = load<unknown>(optsFor(professionId));
  if (!isValidRuntime(data)) return null;
  return data;
}

export function hasRuntimeForProfession(professionId: string): boolean {
  return exists(keyFor(professionId));
}

/** Loads whichever profession's runtime was last active. On first load
 * after this migration, transparently migrates the old single-key blob
 * (if present) into the new per-profession scheme so existing users don't
 * lose progress. */
export function loadRuntime(): JourneyRuntimeState | null {
  const lastActiveId = getLastActiveProfessionId();
  if (lastActiveId) {
    const runtime = loadRuntimeForProfession(lastActiveId);
    if (runtime) return runtime;
  }

  // MIGRATION: no per-profession blob for the last-active pointer (or no
  // pointer at all) — fall back to the old single-key format. If found,
  // write it into the new per-profession key immediately so this is a
  // one-time migration, not a repeated fallback.
  const legacy = load<unknown>({ key: LEGACY_STORAGE_KEY, version: CURRENT_VERSION });
  if (isValidRuntime(legacy)) {
    save<JourneyRuntimeState>(optsFor(legacy.professionId), legacy);
    setLastActiveProfessionId(legacy.professionId);
    remove(LEGACY_STORAGE_KEY);
    return legacy;
  }

  return null;
}

/** Saves under this runtime's own profession key AND marks it as the
 * currently-active profession (so the next cold start resumes here). */
export function saveRuntime(runtime: JourneyRuntimeState): void {
  save<JourneyRuntimeState>(optsFor(runtime.professionId), runtime);
  setLastActiveProfessionId(runtime.professionId);
}

/** Clears only the currently-active profession's runtime (used by
 * "reset journey" style actions) — does NOT touch other professions'
 * saved progress. */
export function clearRuntime(): void {
  const lastActiveId = getLastActiveProfessionId();
  if (lastActiveId) remove(keyFor(lastActiveId));
  remove(LEGACY_STORAGE_KEY);
}

export function hasRuntime(): boolean {
  const lastActiveId = getLastActiveProfessionId();
  return !!lastActiveId && hasRuntimeForProfession(lastActiveId);
}
