import { useState, useEffect } from 'react';
import { getPlaybookByCategory } from '@/core/playbook/playbook_data';
import type { PlaybookEntry, PlaybookCategory } from '@/core/playbook/playbook_types';
import type { CSSProperties } from 'react';
import './PlaybookScreen.css';

const CATEGORIES: { id: PlaybookCategory; label: string; icon: string; color: string }[] = [
  { id: 'resume', label: 'Resume', icon: '📄', color: '#4A90D9' },
  { id: 'linkedin', label: 'LinkedIn', icon: '🔗', color: '#7B68EE' },
  { id: 'applications', label: 'Applications', icon: '📨', color: '#48BB78' },
  { id: 'interviews', label: 'Interviews', icon: '🎤', color: '#F6AD55' },
  { id: 'offer', label: 'Offer', icon: '💼', color: '#FF6B6B' },
  { id: 'communication', label: 'Communication', icon: '💬', color: '#4FD1C5' },
  { id: 'body_language', label: 'Body Language', icon: '🧍', color: '#ED8936' },
  { id: 'confidence', label: 'Confidence', icon: '💪', color: '#D69E2E' },
];

interface Props {
  style?: CSSProperties;
  onClose?: () => void;
  initialCategory?: PlaybookCategory | null;
  onConsumeInitialCategory?: () => void;
}

export function PlaybookScreen({ style, onClose, initialCategory, onConsumeInitialCategory }: Props) {
  const [view, setView] = useState<'categories' | 'entries' | 'entry'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<PlaybookCategory | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<PlaybookEntry | null>(null);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setView('entries');
      onConsumeInitialCategory?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory]);

  const openCategory = (cat: PlaybookCategory) => {
    setFlipping(true);
    setTimeout(() => {
      setSelectedCategory(cat);
      setView('entries');
      setFlipping(false);
    }, 250);
  };

  const openEntry = (entry: PlaybookEntry) => {
    setFlipping(true);
    setTimeout(() => {
      setSelectedEntry(entry);
      setView('entry');
      setFlipping(false);
    }, 250);
  };

  const goBack = () => {
    setFlipping(true);
    setTimeout(() => {
      if (view === 'entry') {
        setSelectedEntry(null);
        setView('entries');
      } else {
        setSelectedCategory(null);
        setView('categories');
      }
      setFlipping(false);
    }, 250);
  };

  const categories = CATEGORIES;
  const hasContent = categories.length > 0 && (!view.startsWith('entry') || selectedEntry);

  if (!hasContent) {
    return (
      <div className="playbook-screen" style={style}>
        <button className="playbook-close-btn" onClick={onClose}>✕</button>
        <div className="playbook-scroll">
          <h1 className="playbook-main-title">Playbook</h1>
          <p className="playbook-subtitle">Your career knowledge base</p>
          <div className="playbook-empty-state">
            <div className="playbook-empty-icon">📚</div>
            <h2>No content yet</h2>
            <p>Complete missions to unlock playbook entries.</p>
          </div>
          <button className="playbook-back-btn" onClick={onClose}>← Назад</button>
        </div>
      </div>
    );
  }

  if (flipping) {
    return (
      <div className="playbook-flip-overlay">
        <div className="playbook-flip-page" />
      </div>
    );
  }

  if (view === 'entry' && selectedEntry) {
    const e = selectedEntry;
    return (
      <div className="playbook-screen" style={style}>
        <button className="playbook-close-btn" onClick={onClose}>✕</button>
        <div className="playbook-scroll">
          <h2 className="playbook-entry-title">{e.title}</h2>
          <span className="playbook-entry-cat">{e.category}</span>

          <div className="playbook-entry-sections">
            <section>
              <h3>Overview</h3>
              <p>{e.overview}</p>
            </section>

            <section>
              <h3>Guides</h3>
              <ul>{e.guides.map(g => <li key={g}>{g}</li>)}</ul>
            </section>

            {e.templates.length > 0 && (
              <section>
                <h3>Templates</h3>
                {e.templates.map((t, i) => (
                  <pre key={i}>{t}</pre>
                ))}
              </section>
            )}

            {e.examples.length > 0 && (
              <section>
                <h3>Examples</h3>
                {e.examples.map((ex, i) => (
                  <pre key={i}>{ex}</pre>
                ))}
              </section>
            )}

            {e.checklist.length > 0 && (
              <section>
                <h3>Checklist</h3>
                <ul>{e.checklist.map(c => <li key={c}>{c}</li>)}</ul>
              </section>
            )}
          </div>

          <button className="playbook-back-btn" onClick={goBack}>← Назад</button>
        </div>
      </div>
    );
  }

  if (view === 'entries' && selectedCategory) {
    const entries = getPlaybookByCategory(selectedCategory);
    return (
      <div className="playbook-screen" style={style}>
        <button className="playbook-close-btn" onClick={onClose}>✕</button>
        <div className="playbook-scroll">

          <h2 className="playbook-entries-title">
            {CATEGORIES.find(c => c.id === selectedCategory)?.label}
          </h2>

          <div className="playbook-entries-list">
            {entries.map(entry => (
              <button
                key={entry.id}
                className="playbook-entry-card"
                onClick={() => openEntry(entry)}
              >
                <h3>{entry.title}</h3>
                <p>{entry.overview.slice(0, 100)}...</p>
                <div className="playbook-entry-tags">
                  {entry.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="playbook-tag">#{tag}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <button className="playbook-back-btn" onClick={goBack}>← Назад</button>
        </div>
      </div>
    );
  }

  return (
    <div className="playbook-screen" style={style}>
      <button className="playbook-close-btn" onClick={onClose}>✕</button>
      <div className="playbook-scroll">
        <h1 className="playbook-main-title">Playbook</h1>
        <p className="playbook-subtitle">Deep knowledge, templates, and strategies</p>

        <div className="playbook-categories-grid">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className="playbook-category-card"
              onClick={() => openCategory(cat.id)}
              style={{ '--cat-color': cat.color } as React.CSSProperties}
            >
              <span className="playbook-category-icon">{cat.icon}</span>
              <span className="playbook-category-label">{cat.label}</span>
            </button>
          ))}
        </div>

        <button className="playbook-back-btn" onClick={onClose}>← Назад</button>
      </div>
    </div>
  );
}
