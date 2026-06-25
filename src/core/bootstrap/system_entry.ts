import { initializeSystem } from './system_bootstrap';
import type { SystemContext } from './system_context';
import { isSystemReady } from './system_context';

export function startCareerNavigator(userId?: string): SystemContext {
  if (isSystemReady()) {
    throw new Error('System already initialized');
  }

  return initializeSystem({
    userId: userId ?? `user_${Date.now()}`,
  });
}

export function restartCareerNavigator(userId?: string): SystemContext {
  return initializeSystem({
    userId: userId ?? `user_${Date.now()}`,
  });
}
