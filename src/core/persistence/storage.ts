const memoryStore: Record<string, any> = {};

interface StorageOptions {
  key: string;
  version: number;
}

interface StorageSnapshot<T> {
  version: number;
  savedAt: number;
  data: T;
}

export function load<T>({ key, version }: StorageOptions): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const snapshot: StorageSnapshot<T> = JSON.parse(raw);
      if (snapshot.version === version) return snapshot.data;
    }
  } catch (e) {
    console.warn('[storage] localStorage load failed, using memory:', e);
  }
  return memoryStore[key] || null;
}

export function save<T>({ key, version }: StorageOptions, data: T): void {
  try {
    const serialized = JSON.stringify({ version, savedAt: Date.now(), data });
    if (serialized.length > 4 * 1024 * 1024) {
      console.error(`[storage] Data too large (${(serialized.length / 1024 / 1024).toFixed(1)}MB), clearing key "${key}"`);
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, serialized);
  } catch (e) {
    console.error('[storage] Save FAILED:', e, 'key:', key);
    console.warn('[storage] localStorage blocked, falling back to memory');
    memoryStore[key] = data;
  }
}

export function remove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn('[storage] localStorage removeItem failed:', e);
  }
  delete memoryStore[key];
}

export function exists(key: string): boolean {
  try {
    if (localStorage.getItem(key) !== null) return true;
  } catch (e) {
    console.warn('[storage] localStorage getItem failed:', e);
  }
  return key in memoryStore;
}
