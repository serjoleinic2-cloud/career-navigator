// src/core/export/export_service.ts
// Multi-profession backup/export. Replaces old single-profession exportJSON.

import { load, save, remove } from '../persistence/storage';

const BACKUP_VERSION = 1;
const BACKUP_KEY = 'career-navigator.backup.v1';
const PROFESSION_PREFIX = 'career-navigator.runtime.v';

interface BackupFile {
  version: number;
  exportedAt: string;
  professions: Record<string, unknown>;
  entitlements?: Record<string, boolean>;
}

function getAllProfessionKeys(): string[] {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(PROFESSION_PREFIX)) {
      keys.push(k);
    }
  }
  return keys;
}

function loadProfessionData(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed.data ?? parsed;
  } catch {
    return null;
  }
}

export function createBackup(): BackupFile {
  const professions: Record<string, unknown> = {};
  for (const key of getAllProfessionKeys()) {
    const professionId = key.replace(PROFESSION_PREFIX, '');
    const data = loadProfessionData(key);
    if (data) professions[professionId] = data;
  }

  return {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    professions,
  };
}

export function exportJSON(): void {
  const backup = createBackup();
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `career-navigator-backup-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportCSV(): void {
  console.warn('CSV export not yet implemented for multi-profession');
}

export function exportPDF(): void {
  console.warn('PDF export not yet implemented');
}

export function saveBackupToStorage(): void {
  const backup = createBackup();
  save({ key: BACKUP_KEY, version: BACKUP_VERSION }, backup);
}

export function loadBackupFromStorage(): BackupFile | null {
  return load<BackupFile>({ key: BACKUP_KEY, version: BACKUP_VERSION });
}

export function clearBackup(): void {
  remove(BACKUP_KEY);
}
