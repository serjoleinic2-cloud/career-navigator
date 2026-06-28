import { useState, useEffect, useCallback } from 'react';
import { getAllNotes, addNote, updateNote, deleteNote } from '@/core/user_data/notes/notes_controller';
import { getActiveProfessionId } from '@/core/profession_loader';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { subscribe } from '@/core/events/system_event_bus';
import type { Note } from '@/core/user_data/notes/note';
import './NotesScreen.css';

export function NotesScreen({ onBack }: { onBack: () => void }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

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

  const filtered = searchQuery
    ? notes.filter(n => n.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : notes;

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

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleSaveNewNote = () => {
    if (!newNoteContent.trim()) return;
    const professionId = getActiveProfessionId() || '';
    const runtime = getRuntimeState();
    addNote({
      professionId,
      chapterId: runtime?.activeChapterId || '',
      nodeId: runtime?.activeNodeId || '',
      content: newNoteContent.trim(),
    });
    setNewNoteContent('');
    setToast('Note saved');
  };

  const handleDelete = (id: string) => {
    setConfirmDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (confirmDeleteId) {
      deleteNote(confirmDeleteId);
      if (editingId === confirmDeleteId) {
        setEditingId(null);
        setEditContent('');
      }
      setConfirmDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const getNodeColor = (nodeId: string): string => {
    const rt = getRuntimeState();
    const node = rt?.nodeStates[nodeId];
    if (!node) return '#888';
    switch (node.state) {
      case 'locked': return '#808080';
      case 'awareness': return '#FFD700';
      case 'understanding': return '#FF8C00';
      case 'application': return '#4A90D9';
      case 'readiness': return '#9B59B6';
      case 'execution': return '#2ECC71';
      case 'confidence': return '#008080';
      default: return '#888';
    }
  };

  return (
    <div className="notes-screen">
      <button className="back-button" onClick={onBack}>← Back to Journey</button>

      <h1>Notes</h1>
      <p className="subtitle">{notes.length} note{notes.length !== 1 ? 's' : ''}</p>

      <input
        type="text"
        className="search-input"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      {/* New Note Form */}
      <div className="new-note-form">
        <textarea
          value={newNoteContent}
          onChange={e => setNewNoteContent(e.target.value)}
          placeholder="Write a new note..."
          rows={3}
        />
        <button
          className="save-note-btn"
          onClick={handleSaveNewNote}
          disabled={!newNoteContent.trim()}
        >
          Save Note
        </button>
      </div>

      {/* Saved Notes */}
      <div className="notes-list">
        {filtered.length === 0 && (
          <p className="empty-state">
            {searchQuery ? 'No notes match your search.' : 'No notes yet. Write your first note below.'}
          </p>
        )}
        {filtered.map(note => (
          <div key={note.id} className="note-card">
            <div className="stage-dot" style={{ backgroundColor: getNodeColor(note.nodeId) }} />
            <button
              className="note-delete"
              onClick={() => handleDelete(note.id)}
            >
              ×
            </button>
            <div className="note-meta">
              <span className="note-date">
                {new Date(note.updatedAt).toLocaleDateString()}
              </span>
            </div>

            {confirmDeleteId === note.id ? (
              <div className="confirm-delete">
                <span>Delete forever?</span>
                <button className="confirm-yes" onClick={handleConfirmDelete}>Yes</button>
                <button className="confirm-no" onClick={handleCancelDelete}>No</button>
              </div>
            ) : editingId === note.id ? (
              <div className="note-edit">
                <textarea
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  rows={4}
                />
                <div className="note-edit-actions">
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div
                className="note-content"
                onClick={() => handleStartEdit(note)}
              >
                {note.content.length > 30 ? note.content.slice(0, 30) + '...' : note.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Toast */}
      {toast && <div className="note-toast">{toast}</div>}
    </div>
  );
}
