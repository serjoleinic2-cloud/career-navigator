/**
 * Local notifications — full implementation per Settings.txt:
 * 1. Daily Mission Reminder (MVP) — if today's mission not done
 * 2. Interview Practice Reminder — if no practice in 3 days
 * 3. Come Back Reminder — if app not opened in 3 days
 * 4. Milestone Reminder — immediate, when chapter completes
 *
 * Each reminder type has its own notification ID and scheduling logic.
 * All are cancelled/rescheduled together when settings change.
 */
import { LocalNotifications } from '@capacitor/local-notifications';
import { load, save } from '../persistence/storage';

const DAILY_MISSION_ID = 1001;
const INTERVIEW_PRACTICE_ID = 1002;
const COME_BACK_ID = 1003;
const MILESTONE_ID = 1004;

const SETTINGS_KEY = 'career-navigator.notifications.v1';
const SETTINGS_VERSION = 1;

interface NotificationSettings {
  enabled: boolean;
  reminderTime: string;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: false,
  reminderTime: '19:00',
};

const opts = { key: SETTINGS_KEY, version: SETTINGS_VERSION };

// ─── Tracking keys ───────────────────────────────────────────────────
const LAST_COMPLETED_KEY = 'career-navigator.lastMissionCompletedDate.v1';
const LAST_APP_OPEN_KEY = 'career-navigator.lastAppOpenDate.v1';
const LAST_INTERVIEW_PRACTICE_KEY = 'career-navigator.lastInterviewPracticeDate.v1';
const LAST_MILESTONE_CHAPTER_KEY = 'career-navigator.lastMilestoneChapter.v1';

// ─── Settings ─────────────────────────────────────────────────────────
export function getNotificationSettings(): NotificationSettings {
  return load<NotificationSettings>(opts) ?? DEFAULT_SETTINGS;
}

function saveSettings(settings: NotificationSettings): void {
  save<NotificationSettings>(opts, settings);
}

// ─── Date helpers ───────────────────────────────────────────────────
function todayString(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function daysSince(dateStr: string | null): number {
  if (!dateStr) return 999;
  const then = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - then.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// ─── Mission tracking ───────────────────────────────────────────────
export function markMissionCompletedToday(): void {
  localStorage.setItem(LAST_COMPLETED_KEY, todayString());
  void rescheduleAll();
}

function missionCompletedToday(): boolean {
  return localStorage.getItem(LAST_COMPLETED_KEY) === todayString();
}

// ─── App open tracking ──────────────────────────────────────────────
export function markAppOpenedToday(): void {
  localStorage.setItem(LAST_APP_OPEN_KEY, todayString());
  void rescheduleAll();
}

// ─── Interview practice tracking ─────────────────────────────────────
export function markInterviewPracticeToday(): void {
  localStorage.setItem(LAST_INTERVIEW_PRACTICE_KEY, todayString());
  void rescheduleAll();
}

// ─── Milestone tracking ─────────────────────────────────────────────
export function markChapterCompleted(chapterId: string): void {
  const last = localStorage.getItem(LAST_MILESTONE_CHAPTER_KEY);
  if (last === chapterId) return; // already notified for this chapter
  localStorage.setItem(LAST_MILESTONE_CHAPTER_KEY, chapterId);
  void scheduleMilestoneImmediate(chapterId);
}

// ─── Permission ───────────────────────────────────────────────────────
async function ensurePermission(): Promise<boolean> {
  try {
    const current = await LocalNotifications.checkPermissions();
    if (current.display === 'granted') return true;
    const requested = await LocalNotifications.requestPermissions();
    return requested.display === 'granted';
  } catch (e) {
    console.warn('[notifications] permission check failed:', e);
    return false;
  }
}

// ─── Cancel all ───────────────────────────────────────────────────────
async function cancelAll(): Promise<void> {
  try {
    await LocalNotifications.cancel({
      notifications: [
        { id: DAILY_MISSION_ID },
        { id: INTERVIEW_PRACTICE_ID },
        { id: COME_BACK_ID },
        { id: MILESTONE_ID },
      ],
    });
  } catch (e) {
    console.warn('[notifications] cancel failed:', e);
  }
}

// ─── Daily Mission Reminder ─────────────────────────────────────────
function nextDailyMissionDate(reminderTime: string, from = new Date()): Date {
  const [h, m] = reminderTime.split(':').map(Number);
  const next = new Date(from);
  next.setHours(h, m, 0, 0);
  if (next.getTime() <= from.getTime() || missionCompletedToday()) {
    next.setDate(next.getDate() + 1);
    next.setHours(h, m, 0, 0);
  }
  return next;
}

async function scheduleDailyMission(settings: NotificationSettings): Promise<void> {
  const fireAt = nextDailyMissionDate(settings.reminderTime);
  await LocalNotifications.schedule({
    notifications: [{
      id: DAILY_MISSION_ID,
      title: "Ready for today's mission?",
      body: 'Continue your journey.',
      schedule: { at: fireAt },
    }],
  });
}

// ─── Interview Practice Reminder ────────────────────────────────────
async function scheduleInterviewPractice(settings: NotificationSettings): Promise<void> {
  const days = daysSince(localStorage.getItem(LAST_INTERVIEW_PRACTICE_KEY));
  if (days < 3) return; // practiced recently

  const [h, m] = settings.reminderTime.split(':').map(Number);
  const next = new Date();
  next.setHours(h, m, 0, 0);
  if (next.getTime() <= Date.now()) {
    next.setDate(next.getDate() + 1);
  }

  await LocalNotifications.schedule({
    notifications: [{
      id: INTERVIEW_PRACTICE_ID,
      title: "Time to practice today's interview",
      body: "You're getting closer to your offer.",
      schedule: { at: next },
    }],
  });
}

// ─── Come Back Reminder ───────────────────────────────────────────────
async function scheduleComeBack(settings: NotificationSettings): Promise<void> {
  const days = daysSince(localStorage.getItem(LAST_APP_OPEN_KEY));
  if (days < 3) return; // opened recently

  const [h, m] = settings.reminderTime.split(':').map(Number);
  const next = new Date();
  next.setHours(h, m, 0, 0);
  if (next.getTime() <= Date.now()) {
    next.setDate(next.getDate() + 1);
  }

  await LocalNotifications.schedule({
    notifications: [{
      id: COME_BACK_ID,
      title: 'Continue your journey',
      body: 'Your next mission is waiting.',
      schedule: { at: next },
    }],
  });
}

// ─── Milestone Reminder (immediate) ───────────────────────────────────
async function scheduleMilestoneImmediate(_chapterId: string): Promise<void> {
  const settings = getNotificationSettings();
  if (!settings.enabled) return;
  const granted = await ensurePermission();
  if (!granted) return;

  await LocalNotifications.schedule({
    notifications: [{
      id: MILESTONE_ID,
      title: 'Chapter completed!',
      body: 'Ready for the next one?',
      schedule: { at: new Date(Date.now() + 1000) }, // 1s delay so user sees it after screen transition
    }],
  });
}

// ─── Master reschedule ────────────────────────────────────────────────
export async function rescheduleAll(): Promise<void> {
  const settings = getNotificationSettings();
  await cancelAll();
  if (!settings.enabled) return;

  const granted = await ensurePermission();
  if (!granted) return;

  await scheduleDailyMission(settings);
  await scheduleInterviewPractice(settings);
  await scheduleComeBack(settings);
}

// ─── Public API ───────────────────────────────────────────────────────
export async function setNotificationsEnabled(enabled: boolean): Promise<void> {
  const settings = getNotificationSettings();
  saveSettings({ ...settings, enabled });
  await rescheduleAll();
}

export async function setReminderTime(reminderTime: string): Promise<void> {
  const settings = getNotificationSettings();
  saveSettings({ ...settings, reminderTime });
  if (settings.enabled) {
    await rescheduleAll();
  }
}

/** Call once on app start. */
export async function initNotifications(): Promise<void> {
  markAppOpenedToday();
  await rescheduleAll();
}

// Legacy alias for backward compatibility
export const rescheduleReminder = rescheduleAll;
