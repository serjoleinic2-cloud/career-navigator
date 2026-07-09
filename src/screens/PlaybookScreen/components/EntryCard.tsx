import type { PlaybookEntry } from '@/core/playbook/playbook_types';

interface EntryCardProps {
  entry: PlaybookEntry;
  onClick: (entry: PlaybookEntry) => void;
}

export function EntryCard({ entry, onClick }: EntryCardProps) {
  return (
    <button
      key={entry.id}
      className="playbook-entry-card"
      onClick={() => onClick(entry)}
    >
      <h3>{entry.title}</h3>
      <p>{entry.overview.slice(0, 100)}...</p>
      <div className="playbook-entry-tags">
        {entry.tags.slice(0, 3).map(tag => (
          <span key={tag} className="playbook-tag">#{tag}</span>
        ))}
      </div>
    </button>
  );
}
