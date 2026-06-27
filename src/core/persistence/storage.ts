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
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    const snapshot: StorageSnapshot<T> = JSON.parse(raw);
    if (snapshot.version !== version) return null;
    return snapshot.data;
  } catch {
    return null;
  }
}

export function save<T>({ key, version }: StorageOptions, data: T): void {
  const snapshot: StorageSnapshot<T> = {
    version,
    savedAt: Date.now(),
    data,
  };
  localStorage.setItem(key, JSON.stringify(snapshot));
}

export function remove(key: string): void {
  localStorage.removeItem(key);
}

export function exists(key: string): boolean {
  return localStorage.getItem(key) !== null;
}
