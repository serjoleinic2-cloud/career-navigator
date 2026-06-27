import { useState, useEffect, useCallback } from 'react';
import { getAllNotes, updateNote, deleteNote } from '@/core/user_data/notes/notes_controller';
import { subscribe } from '@/core/events/system_event_bus';
import type { Note } from '@/core/user_data/notes/note';
import './NotesScreen.css';

export function NotesScreen({ onBack }: { onBack: () => void }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

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

  const handleDelete = (id: string) => {
    deleteNote(id);
    if (editingId === id) {
      setEditingId(null);
      setEditContent('');
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

      <div className="notes-list">
        {filtered.length === 0 && (
          <p className="empty-state">
            {searchQuery ? 'No notes match your search.' : 'No notes yet. Add notes from the task detail screen.'}
          </p>
        )}
        {filtered.map(note => (
          <div key={note.id} className="note-card">
            <div className="note-meta">
              <span className="note-node">{note.nodeId}</span>
              {note.taskId && <span className="note-task">{note.taskId}</span>}
              <span className="note-date">
                {new Date(note.updatedAt).toLocaleDateString()}
              </span>
            </div>

            {editingId === note.id ? (
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
                {note.content}
              </div>
            )}

            <button
              className="note-delete"
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
