import type { ReactNode } from 'react';
import './JourneyTimeline.css';

interface JourneyTimelineProps {
  children: ReactNode;
}

export function JourneyTimeline({ children }: JourneyTimelineProps) {
  return (
    <div className="journey-timeline">
      {children}
    </div>
  );
}
