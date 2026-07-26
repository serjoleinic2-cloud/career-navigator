/**
 * Backup / Restore — dumps the app's entire local state (all
 * `career-navigator.*` localStorage keys — runtime progress, notes,
 * interview history, notification settings, etc.) to a single JSON file
 * the user saves wherever they like, and restores from that file later.
 *
 * Deliberately generic: it doesn't know or care about the shape of any
 * individual key's data. New persisted features automatically get
 * included in backups for free as long as they keep using the existing
 * `career-navigator.` key prefix (see storage.ts / runtime_persistence.ts
 * / notes_persistence.ts / interview_persistence.ts / notification_service.ts).
 *
 * BUGFIX (2026-07-11): "Create Backup" always failed on the Android build.
 * The old implementation only knew two tricks — `showSaveFilePicker`
 * (a desktop-browser-only API, doesn't exist in an Android WebView) and a
 * plain `<a download>` blob link (Android WebView has no Downloads
 * integration for blob: URLs, so the click silently does nothing / throws).
 * Neither path can ever succeed inside the packaged app, which is why the
 * user only ever saw "Backup failed."
 *
 * Fix: on native platforms, write the JSON to the app's cache dir via
 * @capacitor/filesystem and hand it to the native share sheet via
 * @capacitor/share (same plugin + one-tap system dialog already used by
 * "Share App" in app_share.ts) — the OS share sheet is what lets the user
 * pick *where* the file goes (Drive, Files, email, etc.), exactly like a
 * normal Android "export" action. The old File System Access API / blob
 * download path is kept as-is for the plain desktop-browser build.
 */
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import { ENTITLEMENTS_KEY } from '../premium/entitlements';

const KEY_PREFIX = 'career-navigator.';
const BACKUP_FORMAT_VERSION = 1;

// BUGFIX/HARDENING (2026-07-13): entitlements (какие профессии куплены)
// must NEVER travel through a shared progress backup/export file. Serj
// flagged that loading someone else's save could otherwise "unlock" a
// profession the local user never bought. entitlements live under the same
// 'career-navigator.' prefix as everything else (so they persist normally
// across app restarts), but are explicitly excluded from both the export
// dump and the restore write-back below. See core/premium/entitlements.ts
// for the full rationale.
const EXCLUDED_FROM_BACKUP = new Set<string>([ENTITLEMENTS_KEY]);

interface BackupFile {
  format: 'career-navigator-backup';
  version: number;
  exportedAt: string;
  data: Record<string, string>;
}

function collectAppData(): Record<string, string> {
  const data: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(KEY_PREFIX) && !EXCLUDED_FROM_BACKUP.has(key)) {
      const value = localStorage.getItem(key);
      if (value !== null) data[key] = value;
    }
  }
  return data;
}

function buildBackupFile(): BackupFile {
  return {
    format: 'career-navigator-backup',
    version: BACKUP_FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    data: collectAppData(),
  };
}

/**
 * Saves a backup file.
 * - Native (Android/iOS): writes the JSON into the app's cache directory,
 *   then opens the native share sheet on it, so the user picks the
 *   destination (Drive, Files, email, etc.) themselves — this is the
 *   "export" flow, same mechanism as "Share App".
 * - Plain web: uses the File System Access API ("Save As" dialog) where
 *   available, falling back to a normal browser download.
 */
export async function createBackup(): Promise<void> {
  const backup = buildBackupFile();
  const json = JSON.stringify(backup, null, 2);
  const filename = `career-navigator-backup-${new Date().toISOString().slice(0, 10)}.json`;

  if (Capacitor.isNativePlatform()) {
    const written = await Filesystem.writeFile({
      path: filename,
      data: json,
      directory: Directory.Cache,
      encoding: Encoding.UTF8,
    });
    await Share.share({
      title: 'SkillTrue Backup',
      text: 'SkillTrue progress backup',
      files: [written.uri],
      dialogTitle: 'Save backup to…',
    });
    return;
  }

  const w = window as any;
  if (typeof w.showSaveFilePicker === 'function') {
    try {
      const handle = await w.showSaveFilePicker({
        suggestedName: filename,
        types: [{ description: 'SkillTrue Backup', accept: { 'application/json': ['.json'] } }],
      });
      const writable = await handle.createWritable();
      await writable.write(json);
      await writable.close();
      return;
    } catch (e) {
      // User cancelled the picker, or API failed — fall through to the
      // plain-download fallback below rather than erroring out.
      if ((e as any)?.name === 'AbortError') throw e;
      console.warn('[backup] showSaveFilePicker failed, falling back to download:', e);
    }
  }

  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function isBackupFile(data: unknown): data is BackupFile {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  return d.format === 'career-navigator-backup' && typeof d.data === 'object' && d.data !== null;
}

async function readFileAsText(): Promise<string> {
  const w = window as any;
  if (typeof w.showOpenFilePicker === 'function') {
    const [handle] = await w.showOpenFilePicker({
      types: [{ description: 'SkillTrue Backup', accept: { 'application/json': ['.json'] } }],
      multiple: false,
    });
    const file = await handle.getFile();
    return await file.text();
  }

  // Fallback: hidden <input type="file"> for browsers without the File
  // System Access API.
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ''));
      reader.onerror = () => reject(reader.error ?? new Error('File read failed'));
      reader.readAsText(file);
    };
    // If the user dismisses the native picker with no selection, no
    // 'change' event fires and this promise would hang forever; give it
    // a reasonable timeout instead.
    input.click();
  });
}

/** Restores all `career-navigator.*` keys from a user-picked backup file. */
export async function restoreBackupFromFile(): Promise<void> {
  const text = await readFileAsText();
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('Selected file is not valid JSON.');
  }
  if (!isBackupFile(parsed)) {
    throw new Error('Selected file is not a SkillTrue backup.');
  }

  // Clear existing app keys first so a restore from an older/smaller
  // backup doesn't leave stray keys the backup didn't know about.
  // entitlements are deliberately spared: a restore of someone else's
  // progress must not wipe this device's own purchase record either.
  const existingKeys = Object.keys(localStorage).filter(
    k => k.startsWith(KEY_PREFIX) && !EXCLUDED_FROM_BACKUP.has(k)
  );
  for (const key of existingKeys) localStorage.removeItem(key);

  for (const [key, value] of Object.entries(parsed.data)) {
    if (key.startsWith(KEY_PREFIX) && !EXCLUDED_FROM_BACKUP.has(key)) {
      localStorage.setItem(key, value);
    }
  }
}
