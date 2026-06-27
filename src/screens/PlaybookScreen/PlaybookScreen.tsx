import { useState, useEffect } from 'react';
import { PLAYBOOK, getPlaybookByCategory, searchPlaybook } from '@/core/playbook/playbook_data';
import type { PlaybookEntry, PlaybookCategory } from '@/core/playbook/playbook_types';
import './PlaybookScreen.css';

const CATEGORIES: { id: PlaybookCategory; label: string }[] = [
  { id: 'resume', label: 'Resume' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'interview', label: 'Interview' },
  { id: 'salary', label: 'Salary' },
  { id: 'networking', label: 'Networking' },
];

export function PlaybookScreen({ onBack }: { onBack: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<PlaybookCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<PlaybookEntry | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('playbook_selected_entry');
    if (stored) {
      try {
        const entry = JSON.parse(stored) as PlaybookEntry;
        setSelectedEntry(entry);
        localStorage.removeItem('playbook_selected_entry');
      } catch {
        // ignore
      }
    }
  }, []);

  const filteredEntries = selectedCategory
    ? getPlaybookByCategory(selectedCategory)
    : searchQuery
    ? searchPlaybook(searchQuery)
    : PLAYBOOK;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (selectedEntry) {
    return (
      <div className="playbook-screen">
        <button className="back-button" onClick={() => setSelectedEntry(null)}>
          ← Back to Playbook
        </button>

        <div className="entry-detail">
          <span className="entry-category">{selectedEntry.category}</span>
          <h2>{selectedEntry.title}</h2>

          <div className="entry-section">
            <h3>Guide</h3>
            <div className="entry-content">
              {selectedEntry.content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {selectedEntry.templates.length > 0 && (
            <div className="entry-section">
              <h3>Templates</h3>
              <div className="entry-templates">
                {selectedEntry.templates.map((template, i) => (
                  <div key={i} className="template-card">
                    <pre>{template}</pre>
                    <button onClick={() => handleCopy(template)}>Copy</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedEntry.examples.length > 0 && (
            <div className="entry-section">
              <h3>Examples</h3>
              <div className="entry-examples">
                {selectedEntry.examples.map((example, i) => (
                  <div key={i} className="example-card">
                    <p>{example}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedEntry.checklist.length > 0 && (
            <div className="entry-section">
              <h3>Checklist</h3>
              <ul className="entry-checklist">
                {selectedEntry.checklist.map((item, i) => (
                  <li key={i}>
                    <input type="checkbox" id={`check-${i}`} />
                    <label htmlFor={`check-${i}`}>{item}</label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="entry-tags">
            {selectedEntry.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="playbook-screen">
      <button className="back-button" onClick={onBack}>← Back to Journey</button>

      <h1>Playbook</h1>
      <p className="subtitle">Deep knowledge, templates, and strategies</p>

      <input
        type="text"
        className="search-input"
        placeholder="Search playbook..."
        value={searchQuery}
        onChange={e => { setSearchQuery(e.target.value); setSelectedCategory(null); }}
      />

      <div className="categories">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`category-button ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(selectedCategory === cat.id ? null : cat.id);
              setSearchQuery('');
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="entries-list">
        {filteredEntries.map(entry => (
          <div
            key={entry.id}
            className="entry-card"
            onClick={() => setSelectedEntry(entry)}
          >
            <span className="entry-category-tag">{entry.category}</span>
            <h3>{entry.title}</h3>
            <p>{entry.content.slice(0, 120)}...</p>
            <div className="entry-tags-preview">
              {entry.tags.slice(0, 3).map(tag => (
                <span key={tag} className="tag-small">#{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
