import type { Note } from './note';
import { load, save, remove, exists } from '../../persistence/storage';

const STORAGE_KEY = 'career-navigator.notes.v1';
const CURRENT_VERSION = 1;

const opts = { key: STORAGE_KEY, version: CURRENT_VERSION };

export function loadNotes(): Note[] | null {
  return load<Note[]>(opts);
}

export function saveNotes(data: Note[]): void {
  save<Note[]>(opts, data);
}

export function clearNotes(): void {
  remove(STORAGE_KEY);
}

export function hasNotes(): boolean {
  return exists(STORAGE_KEY);
}
