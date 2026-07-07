import type { Note } from './note';
import { getNotes, setNotes } from './notes_store';
import { saveNotes } from './notes_persistence';
import { emit } from '@/core/events/system_event_bus';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function addNote(data: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Note {
  const now = Date.now();
  const note: Note = {
    ...data,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  const all = [...getNotes(), note];
  setNotes(all);
  saveNotes(all);
  emit('NOTE_CREATED', { note });
  return note;
}

export function updateNote(id: string, updates: Partial<Pick<Note, 'content'>>): Note | null {
  const existing = getNotes();
  const idx = existing.findIndex(n => n.id === id);
  if (idx === -1) return null;
  const updated: Note = { ...existing[idx], ...updates, updatedAt: Date.now() };
  const all = existing.map(n => (n.id === id ? updated : n));
  setNotes(all);
  saveNotes(all);
  emit('NOTE_UPDATED', { note: updated });
  return updated;
}

export function deleteNote(id: string): boolean {
  const existing = getNotes();
  const removed = existing.find(n => n.id === id);
  if (!removed) return false;
  const all = existing.filter(n => n.id !== id);
  setNotes(all);
  saveNotes(all);
  emit('NOTE_DELETED', { noteId: id, note: removed });
  return true;
}

export function getNotesByNode(nodeId: string): Note[] {
  return getNotes().filter(n => n.nodeId === nodeId);
}

export function getNotesByTask(taskId: string): Note[] {
  return getNotes().filter(n => n.taskId === taskId);
}

export function getAllNotes(): Note[] {
  return getNotes();
}

export function getNotesByProfession(professionId: string): Note[] {
  return getNotes().filter(n => n.professionId === professionId);
}
