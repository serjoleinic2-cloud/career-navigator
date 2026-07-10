/**
 * Local notifications — MVP scope (see Settings.txt):
 * only the "Daily Mission Reminder" is implemented. The other reminder
 * types described in Settings.txt (Interview Practice / Come Back /
 * Milestone) are intentionally NOT scheduled yet — they depend on
 * features (Interview Trainer usage tracking, app-open tracking, chapter
 * milestones) this service doesn't have hooks into yet. Wiring them in
 * later just means adding more `scheduleX()` functions alongside this one
 * and calling them from the same places (see notes at the bottom).
 *
 * Behavior implemented:
 * - User toggles "Enable notifications" in Settings.
 * - If enabled, once a day (default 19:00 local time) the app reminds the
 *   user to do today's mission — but only if today's mission hasn't
 *   already been completed.
 * - If the toggle is off, no local notifications are shown at all.
 *
 * Capacitor's LocalNotifications API can't evaluate "has the user done
 * today's mission yet" at delivery time — a scheduled notification just
 * fires. So instead of a naive daily-repeating notification, this module
 * always schedules a single one-off notification for the *next* relevant
 * 19:00, and reschedules it (cancel + re-schedule) every time a mission
 * is completed or the app starts. That keeps the only pending
 * notification, at any moment, correct for "today's mission still not
 * done."
 */
import { LocalNotifications } from '@capacitor/local-notifications';
import { load, save } from '../persistence/storage';

const REMINDER_NOTIFICATION_ID = 1001;
const SETTINGS_KEY = 'career-navigator.notifications.v1';
const SETTINGS_VERSION = 1;

interface NotificationSettings {
  enabled: boolean;
  /** 24h "HH:mm", local time. Default matches the MVP spec: 19:00. */
  reminderTime: string;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: false,
  reminderTime: '19:00',
};

const opts = { key: SETTINGS_KEY, version: SETTINGS_VERSION };

export function getNotificationSettings(): NotificationSettings {
  return load<NotificationSettings>(opts) ?? DEFAULT_SETTINGS;
}

function saveSettings(settings: NotificationSettings): void {
  save<NotificationSettings>(opts, settings);
}

// ─── "today's mission already done" tracking ──────────────────────────
// Deliberately separate from the runtime/nodeStates schema — this is a
// tiny, standalone "last day a task was completed" marker, not part of
// journey progress.
const LAST_COMPLETED_KEY = 'career-navigator.lastMissionCompletedDate.v1';

function todayString(d = new Date()): string {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export function markMissionCompletedToday(): void {
  localStorage.setItem(LAST_COMPLETED_KEY, todayString());
  // A mission was just finished — the pending reminder (if any) is either
  // no longer needed today, or needs to move to tomorrow. Recompute it.
  void rescheduleReminder();
}

function missionCompletedToday(): boolean {
  return localStorage.getItem(LAST_COMPLETED_KEY) === todayString();
}

// ─── permission + scheduling ───────────────────────────────────────────

async function ensurePermission(): Promise<boolean> {
  try {
    const current = await LocalNotifications.checkPermissions();
    if (current.display === 'granted') return true;
    const requested = await LocalNotifications.requestPermissions();
    return requested.display === 'granted';
  } catch (e) {
    // Not running on a platform with the native plugin (e.g. plain web
    // preview) — fail silently, notifications just won't fire there.
    console.warn('[notifications] permission check failed:', e);
    return false;
  }
}

function nextReminderDate(reminderTime: string, from = new Date()): Date {
  const [h, m] = reminderTime.split(':').map(Number);
  const next = new Date(from);
  next.setHours(h, m, 0, 0);
  if (next.getTime() <= from.getTime() || missionCompletedToday()) {
    // Today's slot already passed, or today's mission is already done —
    // either way the next relevant reminder is tomorrow.
    next.setDate(next.getDate() + 1);
    next.setHours(h, m, 0, 0);
  }
  return next;
}

async function cancelReminder(): Promise<void> {
  try {
    await LocalNotifications.cancel({ notifications: [{ id: REMINDER_NOTIFICATION_ID }] });
  } catch (e) {
    console.warn('[notifications] cancel failed:', e);
  }
}

export async function rescheduleReminder(): Promise<void> {
  const settings = getNotificationSettings();
  await cancelReminder();
  if (!settings.enabled) return;

  const granted = await ensurePermission();
  if (!granted) return;

  const fireAt = nextReminderDate(settings.reminderTime);
  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: REMINDER_NOTIFICATION_ID,
          title: "Ready for today's mission?",
          body: 'Continue your journey.',
          schedule: { at: fireAt },
        },
      ],
    });
  } catch (e) {
    console.warn('[notifications] schedule failed:', e);
  }
}

export async function setNotificationsEnabled(enabled: boolean): Promise<void> {
  const settings = getNotificationSettings();
  saveSettings({ ...settings, enabled });
  if (enabled) {
    await rescheduleReminder();
  } else {
    await cancelReminder();
  }
}

export async function setReminderTime(reminderTime: string): Promise<void> {
  const settings = getNotificationSettings();
  saveSettings({ ...settings, reminderTime });
  if (settings.enabled) {
    await rescheduleReminder();
  }
}

/** Call once on app start so a stale/missed reminder gets corrected. */
export async function initNotifications(): Promise<void> {
  const settings = getNotificationSettings();
  if (settings.enabled) {
    await rescheduleReminder();
  }
}

// Future reminder types from Settings.txt, once their trigger data exists:
//   scheduleInterviewPracticeReminder() — needs "last interview practice" timestamp
//   scheduleComeBackReminder()          — needs "last app open" timestamp + 3-5 day check
//   scheduleMilestoneReminder()         — fire once, immediately, when a chapter completes
// Each would follow the same pattern: its own notification id, its own
// cancel/schedule pair, called from setNotificationsEnabled/rescheduleReminder.
