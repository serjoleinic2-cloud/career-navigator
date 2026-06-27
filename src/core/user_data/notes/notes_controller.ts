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
  const all = getNotes();
  all.push(note);
  setNotes(all);
  saveNotes(all);
  emit('NOTE_CREATED', { note });
  return note;
}

export function updateNote(id: string, updates: Partial<Pick<Note, 'content'>>): Note | null {
  const all = getNotes();
  const idx = all.findIndex(n => n.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...updates, updatedAt: Date.now() };
  setNotes(all);
  saveNotes(all);
  emit('NOTE_UPDATED', { note: all[idx] });
  return all[idx];
}

export function deleteNote(id: string): boolean {
  const all = getNotes();
  const idx = all.findIndex(n => n.id === id);
  if (idx === -1) return false;
  const removed = all.splice(idx, 1)[0];
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
