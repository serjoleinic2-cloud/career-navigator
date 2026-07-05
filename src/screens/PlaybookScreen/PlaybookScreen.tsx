import { useState, useEffect } from 'react';
import { getPlaybookByCategory } from '@/core/playbook/playbook_data';
import type { PlaybookEntry, PlaybookCategory } from '@/core/playbook/playbook_types';
import type { CSSProperties } from 'react';
import './PlaybookScreen.css';

// BUGFIX (2026-07-05): playbook_data.ts already has written entries for
// 'communication' (Strong vs Weak Phrases), 'body_language' (Body
// Language in Interviews), 'mistakes' (Common Interview Mistakes),
// 'confidence' (Managing Interview Anxiety) and 'remote' (Remote
// Interview Guide) — but this grid only ever listed 5 categories, so
// those entries were permanently unreachable from the UI (dead content).
// Per +Window_functional.md's required category list (Resume, LinkedIn,
// Interview, Salary, Communication, Body language, Mistakes — STAR lives
// inside Interview, not its own tile) plus the two extra categories that
// already have real content, every category with entries now has a tile.
const CATEGORIES: { id: PlaybookCategory; label: string; icon: string; color: string }[] = [
  { id: 'resume', label: 'Resume', icon: '📄', color: '#4A90D9' },
  { id: 'linkedin', label: 'LinkedIn', icon: '🔗', color: '#7B68EE' },
  { id: 'interview', label: 'Interview', icon: '🎤', color: '#F6AD55' },
  { id: 'networking', label: 'Networking', icon: '🤝', color: '#48BB78' },
  { id: 'salary', label: 'Salary', icon: '💰', color: '#FF6B6B' },
  { id: 'communication', label: 'Communication', icon: '💬', color: '#4FD1C5' },
  { id: 'body_language', label: 'Body Language', icon: '🧍', color: '#ED8936' },
  { id: 'mistakes', label: 'Mistakes', icon: '⚠️', color: '#E53E3E' },
  { id: 'confidence', label: 'Confidence', icon: '💪', color: '#D69E2E' },
  { id: 'remote', label: 'Remote', icon: '🖥️', color: '#38B2AC' },
];

interface Props {
  style?: CSSProperties;
  onClose?: () => void;
  /** Category to jump straight into, set via a mission's "Learn more"
   * button (OPEN_PLAYBOOK event, wired in App.tsx). Null/undefined means
   * open on the normal category grid. */
  initialCategory?: PlaybookCategory | null;
  /** Called once the deep-link has been applied, so App.tsx can clear it
   * and a later manual tab switch doesn't re-trigger the same jump. */
  onConsumeInitialCategory?: () => void;
}

export function PlaybookScreen({ style, onClose, initialCategory, onConsumeInitialCategory }: Props) {
  const [view, setView] = useState<'categories' | 'entries' | 'entry'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<PlaybookCategory | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<PlaybookEntry | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
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
      setExpandedSections({ guide: true });
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
      setExpandedSections({});
      setFlipping(false);
    }, 250);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
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
    return (
      <div className="playbook-screen" style={style}>
        <button className="playbook-close-btn" onClick={onClose}>✕</button>
        <div className="playbook-scroll">
          <h2 className="playbook-entry-title">{selectedEntry.title}</h2>
          <span className="playbook-entry-cat">{selectedEntry.category}</span>

          <div className="playbook-entry-sections">
            <AccordionSection
              title="Guide"
              sectionKey="guide"
              isOpen={!!expandedSections['guide']}
              onToggle={toggleSection}
            >
              <div className="playbook-entry-content">
                {selectedEntry.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </AccordionSection>

            {selectedEntry.templates.length > 0 && (
              <AccordionSection
                title="Templates"
                sectionKey="templates"
                isOpen={!!expandedSections['templates']}
                onToggle={toggleSection}
              >
                <div className="playbook-templates">
                  {selectedEntry.templates.map((template, i) => (
                    <div key={i} className="playbook-template-card">
                      <pre>{template}</pre>
                      <button
                        className="playbook-copy-btn"
                        onClick={() => navigator.clipboard.writeText(template)}
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
              </AccordionSection>
            )}

            {selectedEntry.examples.length > 0 && (
              <AccordionSection
                title="Examples"
                sectionKey="examples"
                isOpen={!!expandedSections['examples']}
                onToggle={toggleSection}
              >
                <div className="playbook-examples">
                  {selectedEntry.examples.map((example, i) => (
                    <div key={i} className="playbook-example-card">
                      <p>{example}</p>
                    </div>
                  ))}
                </div>
              </AccordionSection>
            )}

            {selectedEntry.checklist.length > 0 && (
              <AccordionSection
                title="Checklist"
                sectionKey="checklist"
                isOpen={!!expandedSections['checklist']}
                onToggle={toggleSection}
              >
                <ul className="playbook-checklist">
                  {selectedEntry.checklist.map((item, i) => (
                    <li key={i}>
                      <input type="checkbox" id={`check-${i}`} />
                      <label htmlFor={`check-${i}`}>{item}</label>
                    </li>
                  ))}
                </ul>
              </AccordionSection>
            )}
          </div>

          <button className="playbook-apply-btn" onClick={onClose}>Apply to Current Task</button>
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
                <p>{entry.content.slice(0, 100)}...</p>
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

function AccordionSection({
  title,
  sectionKey,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  sectionKey: string;
  isOpen: boolean;
  onToggle: (key: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="playbook-accordion">
      <button
        className="playbook-accordion-header"
        onClick={() => onToggle(sectionKey)}
      >
        <span>{title}</span>
        <span className={`playbook-accordion-arrow ${isOpen ? 'open' : ''}`}>▾</span>
      </button>
      <div className={`playbook-accordion-body ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
}
