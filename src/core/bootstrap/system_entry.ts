import { initializeSystem } from './system_bootstrap';
import type { SystemContext } from './system_context';
import { isSystemReady } from './system_context';

export function startSkillTrue(userId?: string): SystemContext {
  if (isSystemReady()) {
    // Already initialized — safe to ignore on HMR
    return initializeSystem({ userId: userId ?? `user_${Date.now()}` });
  }
  return initializeSystem({ userId: userId ?? `user_${Date.now()}` });
}

export function restartSkillTrue(userId?: string): SystemContext {
  return initializeSystem({ userId: userId ?? `user_${Date.now()}` });
}
