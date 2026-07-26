// src/core/export/export_service.ts
// Multi-profession export for ShareScreen (JSON / CSV).
//
// BUGFIX (2026-07-14):
//   PROFESSION_PREFIX был 'career-navigator.runtime.v' — неверно.
//   Реальный ключ runtime_persistence.ts: 'career-navigator.runtime.<professionId>.v1'
//   Из-за несовпадения startsWith() никогда не находил ни одного ключа,
//   exportJSON() всегда отдавал { professions: {} }.
//   Исправлено: PREFIX = 'career-navigator.runtime.' + regex для извлечения professionId.
//
//   Также убраны saveBackupToStorage / loadBackupFromStorage / clearBackup —
//   дублировали backup_service.ts (который уже используется в Settings).
//   exportCSV() реализован вместо заглушки.

const RUNTIME_PREFIX = 'career-navigator.runtime.';
// Формат ключа: career-navigator.runtime.<professionId>.v1
const RUNTIME_KEY_RE = /^career-navigator\.runtime\.(.+)\.v\d+$/;

interface ProfessionExportEntry {
  professionId: string;
  completedNodes: number;
  activeNodeId: string;
  readinessScore: number;
  confidenceScore: number;
}

function getAllRuntimeKeys(): string[] {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(RUNTIME_PREFIX)) {
      keys.push(k);
    }
  }
  return keys;
}

function parseProfessionId(key: string): string | null {
  const match = RUNTIME_KEY_RE.exec(key);
  return match ? match[1] : null;
}

function loadProfessionRaw(key: string): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    // storage.ts оборачивает данные в { version, savedAt, data }
    const data = parsed.data ?? parsed;
    return typeof data === 'object' && data !== null ? (data as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

function collectProfessions(): ProfessionExportEntry[] {
  const result: ProfessionExportEntry[] = [];
  for (const key of getAllRuntimeKeys()) {
    const professionId = parseProfessionId(key);
    if (!professionId) continue;
    const data = loadProfessionRaw(key);
    if (!data) continue;

    const nodeStates = (data.nodeStates ?? {}) as Record<string, { state?: string }>;
    const completedNodes = Object.values(nodeStates).filter(
      n => n?.state === 'confidence' || n?.state === 'execution'
    ).length;

    result.push({
      professionId,
      completedNodes,
      activeNodeId: typeof data.activeNodeId === 'string' ? data.activeNodeId : '',
      readinessScore: typeof data.readinessScore === 'number' ? data.readinessScore : 0,
      confidenceScore: typeof data.confidenceScore === 'number'
        ? Math.round(data.confidenceScore * 100)
        : 0,
    });
  }
  return result;
}

function getActiveProfessionId(): string {
  try {
    return localStorage.getItem('career-navigator.activeProfessionId.v1') ?? '';
  } catch {
    return '';
  }
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Экспортирует прогресс всех профессий в JSON. */
export function exportJSON(): void {
  const professions = collectProfessions();
  const activeProfessionId = getActiveProfessionId();

  const payload = {
    exportedAt: new Date().toISOString(),
    activeProfessionId,
    professions,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  downloadBlob(blob, `skilltrue-export-${Date.now()}.json`);
}

/** Экспортирует прогресс всех профессий в CSV. Одна строка = одна профессия. */
export function exportCSV(): void {
  const professions = collectProfessions();
  const activeProfessionId = getActiveProfessionId();
  const exportedAt = new Date().toISOString();

  const headers = ['Profession', 'Active', 'CompletedNodes', 'CurrentNode', 'Readiness%', 'Confidence%', 'ExportedAt'];
  const rows: string[] = [headers.join(',')];

  if (professions.length === 0) {
    rows.push(['N/A', 'N/A', '0', 'N/A', '0', '0', exportedAt].join(','));
  } else {
    for (const p of professions) {
      rows.push([
        p.professionId,
        p.professionId === activeProfessionId ? 'yes' : 'no',
        String(p.completedNodes),
        p.activeNodeId || 'N/A',
        String(p.readinessScore),
        String(p.confidenceScore),
        exportedAt,
      ].join(','));
    }
  }

  const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
  downloadBlob(blob, `career-progress-export-${Date.now()}.csv`);
}

export function exportPDF(): void {
  console.warn('PDF export not yet implemented');
}
