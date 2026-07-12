import { useState, useEffect } from 'react';
import { getPlaybookByCategory } from '@/core/playbook/playbook_data';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getActiveProfessionId } from '@/core/profession_loader';
import type { PlaybookEntry, PlaybookCategory } from '@/core/playbook/playbook_types';
import type { CSSProperties } from 'react';
import { Icon } from '@/components/Icon/Icon';
import { CategoryCard } from './components/CategoryCard';
import { EntryCard } from './components/EntryCard';
import { SectionView } from './components/SectionView';
import './PlaybookScreen.css';

const CATEGORIES: { id: PlaybookCategory; label: string; iconName: string; color: string }[] = [
  { id: 'resume', label: 'Resume', iconName: 'resume', color: '#4A90D9' },
  { id: 'linkedin', label: 'LinkedIn', iconName: 'linkedin', color: '#7B68EE' },
  { id: 'applications', label: 'Applications', iconName: 'applications', color: '#48BB78' },
  { id: 'interviews', label: 'Interviews', iconName: 'interviews', color: '#F6AD55' },
  { id: 'offer', label: 'Offer', iconName: 'offer', color: '#FF6B6B' },
  { id: 'communication', label: 'Communication', iconName: 'communication', color: '#4FD1C5' },
  { id: 'body_language', label: 'Body Language', iconName: 'body_language', color: '#ED8936' },
  { id: 'confidence', label: 'Confidence', iconName: 'confidence', color: '#D69E2E' },
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
  }, [initialCategory, onConsumeInitialCategory]);

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
        <button className="playbook-close-btn" onClick={onClose}><Icon name="close" size={16} /></button>
        <div className="playbook-scroll">
          <h1 className="playbook-main-title">Playbook</h1>
          <p className="playbook-subtitle">Your career knowledge base</p>
          <div className="playbook-empty-state">
            <div className="playbook-empty-icon"><Icon name="book" /></div>
            <h2>No content yet</h2>
            <p>Complete missions to unlock playbook entries.</p>
          </div>
          <button className="playbook-back-btn" onClick={onClose}>← Back</button>
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
        <button className="playbook-close-btn" onClick={onClose}><Icon name="close" size={16} /></button>
        <div className="playbook-scroll">
          <SectionView entry={selectedEntry} onBack={goBack} />
        </div>
      </div>
    );
  }

  if (view === 'entries' && selectedCategory) {
    const professionId = getRuntimeState()?.professionId ?? getActiveProfessionId() ?? 'software_engineer';
    const entries = getPlaybookByCategory(selectedCategory, professionId);
    return (
      <div className="playbook-screen" style={style}>
        <button className="playbook-close-btn" onClick={onClose}><Icon name="close" size={16} /></button>
        <div className="playbook-scroll">
          <h2 className="playbook-entries-title">
            {CATEGORIES.find(c => c.id === selectedCategory)?.label}
          </h2>
          <div className="playbook-entries-list">
            {entries.map(entry => (
              <EntryCard key={entry.id} entry={entry} onClick={openEntry} />
            ))}
          </div>
          <button className="playbook-back-btn" onClick={goBack}>← Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="playbook-screen" style={style}>
      <button className="playbook-close-btn" onClick={onClose}><Icon name="close" size={16} /></button>
      <div className="playbook-scroll">
        <h1 className="playbook-main-title">Playbook</h1>
        <p className="playbook-subtitle">Deep knowledge, templates, and strategies</p>
        <div className="playbook-categories-grid">
          {CATEGORIES.map(cat => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              label={cat.label}
              iconName={cat.iconName}
              color={cat.color}
              onClick={openCategory}
            />
          ))}
        </div>
        <button className="playbook-back-btn" onClick={onClose}>← Back</button>
      </div>
    </div>
  );
}
