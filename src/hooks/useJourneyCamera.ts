import { useEffect, useRef, useCallback, useState } from 'react';

interface UseJourneyCameraOptions {
  containerRef: React.RefObject<HTMLElement>;
  currentId: string | null;
  behavior?: ScrollBehavior;
  delay?: number;
}

export function useJourneyCamera({
  containerRef,
  currentId,
  behavior = 'smooth',
  delay = 600,
}: UseJourneyCameraOptions) {
  const hasInitialized = useRef(false);
  const currentIdRef = useRef(currentId);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToCurrent = useCallback(() => {
    if (!containerRef.current || !currentId) return;

    const container = containerRef.current;
    const targetElement = container.querySelector(
      `[data-node-id="${currentId}"]`
    );

    if (!targetElement) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    const targetCenter = targetRect.top + targetRect.height / 2 - containerRect.top;
    const containerCenter = containerRect.height / 2;
    const scrollTop = container.scrollTop + targetCenter - containerCenter;

    const clampedScroll = Math.max(0, scrollTop);

    setIsScrolling(true);
    container.scrollTo({
      top: clampedScroll,
      behavior: hasInitialized.current ? behavior : 'auto',
    });

    const scrollTimeout = setTimeout(() => {
      setIsScrolling(false);
    }, 800);

    hasInitialized.current = true;

    return () => clearTimeout(scrollTimeout);
  }, [containerRef, currentId, behavior]);

  useEffect(() => {
    if (currentId !== currentIdRef.current) {
      hasInitialized.current = false;
      currentIdRef.current = currentId;
    }

    const timer = setTimeout(() => {
      scrollToCurrent();
    }, delay);

    return () => clearTimeout(timer);
  }, [currentId, scrollToCurrent, delay]);

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        hasInitialized.current = false;
        scrollToCurrent();
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [scrollToCurrent]);

  useEffect(() => {
    const handleOrientation = () => {
      hasInitialized.current = false;
      setTimeout(() => scrollToCurrent(), 400);
    };

    window.addEventListener('orientationchange', handleOrientation);
    return () => window.removeEventListener('orientationchange', handleOrientation);
  }, [scrollToCurrent]);

  return { scrollToCurrent, isScrolling };
}
