import { useState, useEffect } from 'react';
import { getActiveProfession } from '@/core/profession_loader';
import { Icon } from '@/components/Icon/Icon';
import { getCurrentPremiumState } from '@/core/premium/premium_state';
import { shareApp } from '@/core/share/app_share';
import { APP_ABOUT } from '@/content/legal_content';
import { PrivacyPolicyScreen } from '@/screens/PrivacyPolicyScreen/PrivacyPolicyScreen';
import { PaywallScreen } from '@/screens/PaywallScreen/PaywallScreen';
import type { PremiumState } from '@/core/premium/premium_state';
import { getNotificationSettings, setNotificationsEnabled as persistNotificationsEnabled, setReminderTime as setReminderTimePersist } from '@/core/notifications/notification_service';
import { createBackup, restoreBackupFromFile } from '@/core/export/backup_service';
import { restorePurchases as restorePurchasesFromStore } from '@/core/premium/billing_service';
import { subscribe } from '@/core/events/system_event_bus';
import './SettingsScreen.css';

<<<<<<< HEAD
const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0';
const APP_BUILD = import.meta.env.VITE_APP_BUILD || '9';
=======
const APP_VERSION = '3.1';
const APP_BUILD = '7';
>>>>>>> aa5fca6c0bfa404ecf7b20366e1d44b50331182e

interface SettingsScreenProps {
  onClose: () => void;
}

export function SettingsScreen({ onClose }: SettingsScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    () => getNotificationSettings().enabled
  );
  const [reminderTime, setReminderTime] = useState(
    () => getNotificationSettings().reminderTime
  );
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [backupStatus, setBackupStatus] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [restoreStatus, setRestoreStatus] = useState<string | null>(null);
  const [restoring, setRestoring] = useState(false);
  const [, setTick] = useState(0);

  const prof = getActiveProfession();
  const premium: PremiumState = getCurrentPremiumState(
    prof?.id || 'software_engineer',
    prof?.chapters?.length || 8
  );

  useEffect(() => {
    // billing_service emits STATE_UPDATED after a purchase/restore is
    // confirmed by Google Play — re-render so the Premium card reflects
    // the fresh entitlement without requiring the user to reopen Settings.
    return subscribe('STATE_UPDATED', () => setTick(t => t + 1));
  }, []);

  const handleShareApp = async () => {
    try {
      await shareApp();
    } catch {
      // silently fail (e.g. user dismissed the share sheet)
    }
  };

  const handleToggleNotifications = async () => {
    const next = !notificationsEnabled;
    setNotificationsEnabled(next);
    await persistNotificationsEnabled(next);
  };

  const handleTimeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setReminderTime(time);
    await setReminderTimePersist(time);
  };

  const handleBackup = async () => {
    setBackupStatus(null);
    try {
      await createBackup();
      setBackupStatus('Backup saved.');
    } catch (e) {
      console.warn('[settings] backup failed:', e);
      setBackupStatus('Backup failed.');
    }
  };

  const handleRestore = async () => {
    setBackupStatus(null);
    try {
      await restoreBackupFromFile();
      setBackupStatus('Restored — reloading...');
      setTimeout(() => window.location.reload(), 600);
    } catch (e) {
      console.warn('[settings] restore failed:', e);
      setBackupStatus('Restore failed or cancelled.');
    }
  };

  const handleRestorePurchases = async () => {
    setRestoreStatus(null);
    setRestoring(true);
    try {
      const result = await restorePurchasesFromStore();
      setRestoreStatus(result.ok ? 'Purchases restored.' : (result.error ?? 'Restore failed.'));
    } finally {
      setRestoring(false);
    }
  };

  return (
    <div className="settings-screen">
      <div className="settings-header">
        <button className="settings-close-btn" onClick={onClose} aria-label="Close settings">
          <Icon name="close" size={16} />
        </button>
        <h2 className="settings-title">Settings</h2>
      </div>

      <div className="settings-scroll">
        <div className="settings-sections">
          <section className="settings-section">
            <h3 className="settings-section-title">Notifications</h3>
            <p className="settings-section-desc">
              Stay motivated on your career journey with helpful reminders.
            </p>
            <div className="settings-row">
              <span className="settings-row-label">Enable notifications</span>
              <button
                className={`settings-toggle ${notificationsEnabled ? 'active' : ''}`}
                onClick={handleToggleNotifications}
                aria-label="Toggle notifications"
              >
                <div className="settings-toggle-thumb" />
              </button>
            </div>
            {notificationsEnabled && (
              <div className="settings-row settings-row--time">
                <span className="settings-row-label">Reminder time</span>
                <input
                  type="time"
                  className="settings-time-input"
                  value={reminderTime}
                  onChange={handleTimeChange}
                />
              </div>
            )}
            {notificationsEnabled && (
              <p className="settings-row-hint">
                Daily at {reminderTime} — if today's mission isn't done yet.
              </p>
            )}
          </section>

          <section className="settings-section">
            <h3 className="settings-section-title">Premium</h3>
            <div className="settings-premium-card">
              <div className="settings-premium-header">
                <Icon name="star" size={20} color="#FFD060" />
                <span>{premium.isUnlocked ? `${prof?.title ?? 'This profession'} — Unlocked` : 'SkillTrue'}</span>
              </div>
              <p className="settings-premium-desc">
                {premium.isUnlocked
                  ? 'You have full access to this profession — all chapters, Interview Trainer, and Playbook.'
                  : 'The first 3 chapters of every profession are free. Unlock the rest, or get all 5 professions for less per profession.'}
              </p>
              <ul className="settings-premium-features">
                <li>Unlock all chapters ({premium.totalChapters} total)</li>
                <li>Advanced interview simulations</li>
                <li>Detailed progress analytics</li>
              </ul>
              {!premium.isUnlocked && (
                <button className="settings-upgrade-btn" onClick={() => setShowPaywall(true)}>
                  Upgrade to Premium
                </button>
              )}
              <button
                className="settings-action-btn"
                onClick={handleRestorePurchases}
                disabled={restoring}
              >
                <Icon name="refresh" size={16} /> {restoring ? 'Restoring…' : 'Restore Purchases'}
              </button>
              {restoreStatus && <p className="settings-privacy-text">{restoreStatus}</p>}
            </div>
          </section>

          <section className="settings-section">
            <h3 className="settings-section-title">Backup</h3>
            <button className="settings-action-btn" onClick={handleBackup}>
              <Icon name="refresh" size={16} /> Create Backup
            </button>
          </section>

          <section className="settings-section">
            <h3 className="settings-section-title">Restore</h3>
            <button className="settings-action-btn" onClick={handleRestore}>
              <Icon name="refresh" size={16} /> Restore Backup
            </button>
            {backupStatus && <p className="settings-privacy-text">{backupStatus}</p>}
          </section>

          <section className="settings-section">
            <h3 className="settings-section-title">Privacy</h3>
            <p className="settings-privacy-text">
              Your data stays on your device. No cloud, no tracking.
            </p>
            <a
              className="settings-privacy-link"
              href="#"
              onClick={e => { e.preventDefault(); setShowPrivacyPolicy(true); }}
            >
              Read our Privacy Policy
            </a>
          </section>

          <section className="settings-section">
            <h3 className="settings-section-title">About</h3>
            <div className="settings-about-info">
              <div className="settings-about-row">
                <span>Version</span>
                <span>{APP_VERSION}</span>
              </div>
              <div className="settings-about-row">
                <span>Build</span>
                <span>{APP_BUILD}</span>
              </div>
            </div>
            <p className="settings-about-desc">{APP_ABOUT.description}</p>
          </section>

          <section className="settings-section">
            <h3 className="settings-section-title">Share App</h3>
            <button className="settings-action-btn primary" onClick={handleShareApp}>
              <Icon name="share" size={16} /> Share App
            </button>
          </section>
        </div>
      </div>

      <button className="settings-back" onClick={onClose}>← Back</button>

      {showPrivacyPolicy && (
        <PrivacyPolicyScreen onClose={() => setShowPrivacyPolicy(false)} />
      )}
      {showPaywall && (
        <PaywallScreen
          professionId={prof?.id || 'software_engineer'}
          onClose={() => setShowPaywall(false)}
          onPurchased={() => setShowPaywall(false)}
        />
      )}
    </div>
  );
}
