import { useState, useEffect, useCallback, useRef } from 'react';
import type { CSSProperties } from 'react';
import { getAllNotes, addNote, updateNote, deleteNote } from '@/core/user_data/notes/notes_controller';
import { getActiveProfessionId } from '@/core/profession_loader';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { subscribe } from '@/core/events/system_event_bus';
import type { Note } from '@/core/user_data/notes/note';
import './NotesScreen.css';

const CATEGORY_ORDER = ['resume', 'linkedin', 'interview', 'networking', 'salary'] as const;
const CATEGORY_LABELS: Record<string, string> = {
  resume: 'Resume',
  linkedin: 'LinkedIn',
  interview: 'Interview',
  networking: 'Networking',
  salary: 'Salary',
};
const CATEGORY_ICONS: Record<string, string> = {
  resume: '📄',
  linkedin: '🔗',
  interview: '🎤',
  networking: '🤝',
  salary: '💰',
};
const CATEGORY_COLORS: Record<string, string> = {
  resume: '#4A90D9',
  linkedin: '#7B68EE',
  interview: '#F6AD55',
  networking: '#48BB78',
  salary: '#FF6B6B',
};

export function NotesScreen({ style, onClose }: { style?: CSSProperties; onClose?: () => void }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [showNewNote, setShowNewNote] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const newNoteRef = useRef<HTMLTextAreaElement>(null);

  const refresh = useCallback(() => {
    setNotes(getAllNotes());
  }, []);

  useEffect(() => {
    refresh();
    const unsubCreated = subscribe('NOTE_CREATED', refresh);
    const unsubUpdated = subscribe('NOTE_UPDATED', refresh);
    const unsubDeleted = subscribe('NOTE_DELETED', refresh);
    return () => {
      unsubCreated();
      unsubUpdated();
      unsubDeleted();
    };
  }, [refresh]);

  useEffect(() => {
    if (showNewNote && newNoteRef.current) {
      newNoteRef.current.focus();
    }
  }, [showNewNote]);

  const filtered = searchQuery
    ? notes.filter(n => n.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : notes;

  const grouped = filtered.reduce<Record<string, Note[]>>((acc, note) => {
    const cat = note.chapterId || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(note);
    return acc;
  }, {});

  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a as any);
    const bi = CATEGORY_ORDER.indexOf(b as any);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  const visibleCategories = selectedCategory
    ? sortedCategories.filter(c => c === selectedCategory)
    : sortedCategories;

  const handleStartEdit = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const handleSaveEdit = () => {
    if (editingId) {
      updateNote(editingId, { content: editContent });
    }
    setEditingId(null);
    setEditContent('');
  };

  const handleSaveNewNote = () => {
    if (!newNoteContent.trim()) return;
    const professionId = getActiveProfessionId() || '';
    const runtime = getRuntimeState();
    addNote({
      professionId,
      chapterId: selectedCategory || runtime?.activeChapterId || '',
      nodeId: runtime?.activeNodeId || '',
      title: newNoteTitle.trim() || 'Untitled Note',
      content: newNoteContent.trim(),
    });
    setNewNoteContent('');
    setNewNoteTitle('');
    setShowNewNote(false);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm('Delete this note permanently? This cannot be undone.');
    if (!confirmed) return;
    deleteNote(id);
    if (editingId === id) {
      setEditingId(null);
      setEditContent('');
    }
  };

  const hasNotes = sortedCategories.length > 0 && sortedCategories.some(c => grouped[c].length > 0);

  if (!hasNotes && !showNewNote) {
    return (
      <div className="notes-screen" style={style}>
        <button className="notes-close-btn" onClick={onClose}>✕</button>
        <div className="notes-scroll">
          <h1 className="notes-title">My Journal</h1>
          <div className="notes-empty-state">
            <div className="notes-empty-icon">📝</div>
            <h2>No notes yet</h2>
            <p>Tap + to create your first note.</p>
          </div>
          <button className="notes-back-btn" onClick={onClose}>← Назад</button>
        </div>
        <button className="notes-fab" onClick={() => setShowNewNote(true)}>+</button>
      </div>
    );
  }

  return (
    <div className="notes-screen" style={style}>
      <button className="notes-close-btn" onClick={onClose}>✕</button>
      <div className="notes-scroll">
      <h1 className="notes-title">My Journal</h1>

      <input
        type="text"
        className="notes-search"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      {/* Category filter chips */}
      <div className="notes-categories">
        {CATEGORY_ORDER.map(cat => (
          <button
            key={cat}
            className={`notes-cat-chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            style={{
              '--chip-color': CATEGORY_COLORS[cat],
            } as React.CSSProperties}
          >
            {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* New note inline form — deliberately NOT a fixed bottom-sheet
         overlay. The existing edit-note form below never had keyboard
         overlap issues specifically because it's plain document flow
         inside .notes-scroll, letting the WebView's native
         focus-scroll-into-view behavior handle the keyboard correctly.
         Two rounds of viewport-math fixes on the old fixed drawer didn't
         fully resolve it on-device, so this adopts the same
         already-proven-safe pattern instead of fighting the keyboard. */}
      {showNewNote && (
        <div className="notes-card notes-new-form">
          <div className="notes-edit-form">
            <input
              className="notes-drawer-title"
              placeholder="Note title..."
              value={newNoteTitle}
              onChange={e => setNewNoteTitle(e.target.value)}
            />
            <textarea
              ref={newNoteRef}
              value={newNoteContent}
              onChange={e => setNewNoteContent(e.target.value)}
              placeholder="Write a new note..."
              rows={4}
            />
            <div className="notes-edit-actions">
              <button
                className="notes-save-btn"
                onClick={handleSaveNewNote}
                disabled={!newNoteContent.trim()}
              >
                Save
              </button>
              <button
                className="notes-cancel-btn"
                onClick={() => { setShowNewNote(false); setNewNoteContent(''); setNewNoteTitle(''); }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes grouped by category */}
      <div className="notes-groups">
        {!hasNotes && (
          <div className="notes-empty">
            <span className="notes-empty-icon">📝</span>
            <p>No notes yet.</p>
          </div>
        )}

        {visibleCategories.map(cat => (
          <div key={cat} className="notes-group">
            <div className="notes-group-header" style={{ color: CATEGORY_COLORS[cat] || '#888' }}>
              <span>{CATEGORY_ICONS[cat] || '📌'} {CATEGORY_LABELS[cat] || cat}</span>
              <span className="notes-group-count">{grouped[cat].length}</span>
            </div>

            {grouped[cat].map(note => (
              <div
                key={note.id}
                className={`notes-card ${editingId === note.id ? 'editing' : ''}`}
                style={{ '--note-color': CATEGORY_COLORS[cat] || '#888' } as React.CSSProperties}
              >
                <div className="notes-card-meta">
                  <span className="notes-card-date">
                    {new Date(note.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  {/* Explicit chapter label directly on the card — the
                      left color bar (see .notes-card border-left) and the
                      group header above already carry the same color, but
                      when notes are viewed in a flat/filtered list this is
                      the only in-card indicator of which chapter a note
                      belongs to. */}
                  <span className="notes-card-cat-label">
                    {CATEGORY_ICONS[cat] || '📌'} {CATEGORY_LABELS[cat] || cat}
                  </span>
                  <button
                    className="notes-card-delete"
                    onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }}
                  >
                    ✕
                  </button>
                </div>
                {note.title && <div className="notes-card-title">{note.title}</div>}

                {editingId === note.id ? (
                  <div className="notes-edit-form">
                    <textarea
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      rows={4}
                    />
                    <div className="notes-edit-actions">
                      <button className="notes-save-btn" onClick={handleSaveEdit}>Save</button>
                      <button className="notes-cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="notes-card-content"
                    onClick={() => handleStartEdit(note)}
                  >
                    {note.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button className="notes-back-btn" onClick={onClose}>← Назад</button>

      {/* New note floating button */}
      <button
        className="notes-fab"
        onClick={() => setShowNewNote(true)}
        aria-label="New note"
      >
        +
      </button>
      </div>{/* notes-scroll */}
    </div>
  );
}
