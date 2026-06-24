import { useState, useMemo, useCallback } from 'react';
import { buildJourney } from '@/core/career_engine_v2';
import { syncJourneyState, getFocusedNodeFromJourney } from '@/core/journey_state_controller';
import { JourneyHeader } from '@/components/JourneyHeader/JourneyHeader';
import { JourneyTimeline } from '@/components/JourneyTimeline/JourneyTimeline';
import { JourneyChapter } from '@/components/JourneyChapter/JourneyChapter';
import { JourneyFocusPanel } from '@/components/JourneyFocusPanel/JourneyFocusPanel';
import { JourneyBottomNav } from '@/components/JourneyBottomNav/JourneyBottomNav';
import './JourneyScreen.css';

const profile = { profession: 'Software Engineer', experience: 'junior' as const };

export function JourneyScreen() {
  const [currentDay, setCurrentDay] = useState(1);

  const journey = useMemo(() => buildJourney(profile), []);
  const syncedJourney = useMemo(() => syncJourneyState(journey.chapters, currentDay), [journey, currentDay]);

  const focusedNode = useMemo(() => {
    const node = getFocusedNodeFromJourney(syncedJourney, currentDay);
    if (!node) {
      console.warn('No focused node for day', currentDay);
      return syncedJourney[0]?.nodes[0];
    }
    return node;
  }, [syncedJourney, currentDay]);

  const handleAllTasksComplete = useCallback(() => {
    setCurrentDay(prev => prev + 1);
  }, []);

  return (
    <div className="journey-screen">
      <JourneyHeader />

      <div className="journey-viewport">
        <JourneyTimeline>
          {syncedJourney.map((section) => (
            <JourneyChapter key={section.chapter} section={section} />
          ))}
        </JourneyTimeline>

        <JourneyFocusPanel
          node={focusedNode}
          onAllTasksComplete={handleAllTasksComplete}
        />
      </div>

      <JourneyBottomNav />
    </div>
  );
}
