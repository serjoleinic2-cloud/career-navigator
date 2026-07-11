import { useState } from 'react';
import { getActiveProfession } from '@/core/profession_loader';
import { Icon } from '@/components/Icon/Icon';
import { createPremiumState } from '@/core/premium/premium_state';
import { shareApp } from '@/core/share/app_share';
import { APP_ABOUT } from '@/content/legal_content';
import { PrivacyPolicyScreen } from '@/screens/PrivacyPolicyScreen/PrivacyPolicyScreen';
import type { PremiumState } from '@/core/premium/premium_state';
import { getNotificationSettings, setNotificationsEnabled as persistNotificationsEnabled, setReminderTime as setReminderTimePersist } from '@/core/notifications/notification_service';
import { createBackup, restoreBackupFromFile } from '@/core/export/backup_service';
import { devCompleteAllExceptLastTask } from '@/core/runtime/runtime_controller';
import './SettingsScreen.css';

const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';
const APP_BUILD = import.meta.env.VITE_APP_BUILD || '1';

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
  const [premium] = useState<PremiumState>(() => {
    const prof = getActiveProfession();
    return createPremiumState(prof?.id || 'software_engineer', prof?.chapters?.length || 8, 'free');
  });

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

  const handleTest = () => {
    try {
      devCompleteAllExceptLastTask();
    } catch (e) {
      console.warn('[settings] Test failed:', e);
      return;
    }
    window.location.reload();
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
                <span>{premium.isUnlocked ? 'Premium' : 'Free'}</span>
              </div>
              <p className="settings-premium-desc">
                Unlock all professions, Interview Trainer, and advanced analytics.
              </p>
              <ul className="settings-premium-features">
                <li>Unlock all chapters ({premium.totalChapters} total)</li>
                <li>Advanced interview simulations</li>
                <li>Detailed progress analytics</li>
                <li>Priority support</li>
              </ul>
              {!premium.isUnlocked && (
                <button className="settings-upgrade-btn" onClick={() => {}}>
                  Upgrade to Premium
                </button>
              )}
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

          <section className="settings-section">
            <h3 className="settings-section-title">Test</h3>
            <p className="settings-privacy-text">
              Completes every chapter except the very last task, so you can
              finish that one yourself and see what happens next.
            </p>
            <button className="settings-action-btn" onClick={handleTest}>
              <Icon name="refresh" size={16} /> Test
            </button>
          </section>
        </div>
      </div>

      <button className="settings-back" onClick={onClose}>← Back</button>

      {showPrivacyPolicy && (
        <PrivacyPolicyScreen onClose={() => setShowPrivacyPolicy(false)} />
      )}
    </div>
  );
}
