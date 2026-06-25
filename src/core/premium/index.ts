export type { PremiumState, UnlockType } from './premium_state';
export { createPremiumState, FREE_CHAPTER_LIMIT } from './premium_state';

export type { AccessLevel } from './premium_engine';
export {
  isChapterLocked,
  isNodeLocked,
  getAccessLevel,
  getRemainingLockedContent,
  getChapterIndex,
} from './premium_engine';

export type { AccessCheckResult } from './premium_gate';
export { checkAccess, checkNodeAccess } from './premium_gate';

export type { UnlockResult } from './premium_unlock_flow';
export { unlockProfession, canUnlock } from './premium_unlock_flow';

export type { PremiumWarning } from './premium_warning_engine';
export { getPremiumWarning, getChapterLockWarning } from './premium_warning_engine';

export type { PremiumFeature } from './premium_profession_limits';
export {
  PREMIUM_FEATURES,
  FREE_FEATURES,
  FEATURE_LIMITS,
  isFeatureAvailable,
  FREE_CHAPTER_IDS,
  PREMIUM_CHAPTER_IDS,
  isChapterFree,
  isChapterPremium,
} from './premium_profession_limits';

export type { PremiumTelemetry, TelemetryEvent } from './premium_telemetry';
export {
  createPremiumTelemetry,
  recordLockedView,
  recordUpgradeClick,
  recordBlockedAttempt,
  recordConversion,
} from './premium_telemetry';
