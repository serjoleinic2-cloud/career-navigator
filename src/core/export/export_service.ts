import { getState } from '../runtime/runtime_store';
import { getUIState } from '../ui_bridge/ui_bridge';
import { mapToShareModel } from '../share/share_mapper';

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportJSON(): void {
  const runtime = getState();
  const ui = getUIState();
  const model = mapToShareModel(runtime, ui);

  const data = {
    exportedAt: new Date().toISOString(),
    career: model,
    runtime: {
      completedNodes: runtime.completedNodes,
      currentNodeId: runtime.currentNodeId,
      activeProfessionId: runtime.activeProfessionId,
    },
    scores: {
      readiness: runtime.readinessScore,
      confidence: runtime.confidenceScore,
    },
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  downloadBlob(blob, `career-navigator-${Date.now()}.json`);
}

export function exportCSV(): void {
  const runtime = getState();
  const ui = getUIState();

  const headers = ['Date', 'Chapter', 'Skill', 'Task', 'Result', 'Duration', 'Status'];
  const rows: string[] = [headers.join(',')];

  rows.push([
    new Date().toISOString(),
    ui.currentChapterTitle,
    runtime.currentNodeId || 'N/A',
    'N/A',
    'N/A',
    'N/A',
    'completed',
  ].join(','));

  const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
  downloadBlob(blob, `career-progress-${Date.now()}.csv`);
}

export function exportPDF(): void {
  console.warn('PDF export not yet implemented');
}
