import type { Note } from './note';

let notes: Note[] = [];

export function getNotes(): Note[] {
  return notes;
}

export function setNotes(data: Note[]): void {
  notes = data;
}

export function getNotesByNode(nodeId: string): Note[] {
  return notes.filter(n => n.nodeId === nodeId);
}

export function getNotesByTask(taskId: string): Note[] {
  return notes.filter(n => n.taskId === taskId);
}

export function getNoteById(id: string): Note | undefined {
  return notes.find(n => n.id === id);
}
