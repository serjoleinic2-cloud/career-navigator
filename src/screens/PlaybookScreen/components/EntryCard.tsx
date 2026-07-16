import type { PlaybookEntry } from '@/core/playbook/playbook_types';

interface EntryCardProps {
  entry: PlaybookEntry;
  onClick: (entry: PlaybookEntry) => void;
}

export function EntryCard({ entry, onClick }: EntryCardProps) {
  return (
    <button
      className="playbook-entry-card"
      onClick={() => onClick(entry)}
    >
      <div className="playbook-entry-card-header">
        <h3>{entry.title}</h3>
        <span className="playbook-entry-tap-hint">Tap to open ›</span>
      </div>
      <p>{entry.overview.slice(0, 100)}…</p>
    </button>
  );
}
