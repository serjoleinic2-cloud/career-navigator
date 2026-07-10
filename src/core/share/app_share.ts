import { Share } from '@capacitor/share';
import { APP_SHARE_TEXT, APP_SHARE_URL } from '@/content/legal_content';

// SPEC (Share App.txt, 2026-07-11): "Share App" in Settings used to call
// nativeShare() from core/share/share_service.ts, which shares the
// user's live progress (profession + days elapsed) via the web
// navigator.share() fallback. Per spec this action must ONLY recommend
// the app itself — fixed promotional text + Play Store link, never
// progress, JSON, CSV, screenshots, or any other debug/user data — and
// must go through the native Capacitor Share plugin (one tap, system
// share sheet, no custom dialog or clipboard screen).
export async function shareApp(): Promise<void> {
  await Share.share({
    title: 'Career Navigator',
    text: APP_SHARE_TEXT,
    url: APP_SHARE_URL,
    dialogTitle: 'Share Career Navigator',
  });
}

export { APP_SHARE_URL };
