import type { ReactNode } from 'react';
import './JourneyTimeline.css';

interface JourneyTimelineProps {
  children: ReactNode;
}

export function JourneyTimeline({ children }: JourneyTimelineProps) {
  return (
    <div className="journey-timeline">
      {children}
      <div className="journey-timeline__scroll-hint">
        <span className="journey-timeline__scroll-arrow">↓</span>
        <span className="journey-timeline__scroll-text">Scroll for more</span>
      </div>
    </div>
  );
}
