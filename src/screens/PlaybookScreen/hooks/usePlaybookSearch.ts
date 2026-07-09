import { useState, useMemo } from 'react';
import type { PlaybookEntry } from '@/core/playbook/playbook_types';

export function usePlaybookSearch(entries: PlaybookEntry[]) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return entries;
    const q = query.toLowerCase();
    return entries.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.overview.toLowerCase().includes(q) ||
      e.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [entries, query]);

  return { query, setQuery, filtered };
}
