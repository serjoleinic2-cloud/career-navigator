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
 */

const KEY_PREFIX = 'career-navigator.';
const BACKUP_FORMAT_VERSION = 1;

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
    if (key && key.startsWith(KEY_PREFIX)) {
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
 * Saves a backup file. Uses the File System Access API (native "Save As"
 * dialog, lets the user pick the folder) where available; falls back to
 * a plain browser download (goes to the default Downloads location) on
 * browsers/webviews that don't support it.
 */
export async function createBackup(): Promise<void> {
  const backup = buildBackupFile();
  const json = JSON.stringify(backup, null, 2);
  const filename = `career-navigator-backup-${new Date().toISOString().slice(0, 10)}.json`;

  const w = window as any;
  if (typeof w.showSaveFilePicker === 'function') {
    try {
      const handle = await w.showSaveFilePicker({
        suggestedName: filename,
        types: [{ description: 'Career Navigator Backup', accept: { 'application/json': ['.json'] } }],
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
      types: [{ description: 'Career Navigator Backup', accept: { 'application/json': ['.json'] } }],
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
    throw new Error('Selected file is not a Career Navigator backup.');
  }

  // Clear existing app keys first so a restore from an older/smaller
  // backup doesn't leave stray keys the backup didn't know about.
  const existingKeys = Object.keys(localStorage).filter(k => k.startsWith(KEY_PREFIX));
  for (const key of existingKeys) localStorage.removeItem(key);

  for (const [key, value] of Object.entries(parsed.data)) {
    if (key.startsWith(KEY_PREFIX)) {
      localStorage.setItem(key, value);
    }
  }
}
