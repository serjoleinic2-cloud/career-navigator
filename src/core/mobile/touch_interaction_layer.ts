export type TouchGesture = 'tap' | 'swipe_left' | 'swipe_right' | 'swipe_up' | 'swipe_down' | 'long_press';

export type TouchHandler = {
  onTap?: (targetId: string) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onLongPress?: (targetId: string) => void;
};

let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
const SWIPE_THRESHOLD = 50;
const LONG_PRESS_MS = 500;

export function attachTouchHandlers(
  element: HTMLElement,
  handlers: TouchHandler
): () => void {
  const onTouchStart = (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
  };

  const onTouchEnd = (e: TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    const dt = Date.now() - touchStartTime;
    const targetId = (e.target as HTMLElement).id || '';

    if (dt >= LONG_PRESS_MS && Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      handlers.onLongPress?.(targetId);
      return;
    }

    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) handlers.onSwipeRight?.();
      else handlers.onSwipeLeft?.();
      return;
    }

    if (Math.abs(dy) > SWIPE_THRESHOLD && Math.abs(dy) > Math.abs(dx)) {
      if (dy > 0) handlers.onSwipeDown?.();
      else handlers.onSwipeUp?.();
      return;
    }

    handlers.onTap?.(targetId);
  };

  element.addEventListener('touchstart', onTouchStart, { passive: true });
  element.addEventListener('touchend', onTouchEnd);

  return () => {
    element.removeEventListener('touchstart', onTouchStart);
    element.removeEventListener('touchend', onTouchEnd);
  };
}
