import { useMemo } from 'react';
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
  const journey = useMemo(() => buildJourney(profile), []);
  const currentDay = 1;
  const syncedJourney = useMemo(() => syncJourneyState(journey.chapters, currentDay), [journey, currentDay]);
  const focusedNode = useMemo(() => getFocusedNodeFromJourney(syncedJourney, currentDay), [syncedJourney, currentDay]);

  return (
    <div className="journey-screen">
      <JourneyHeader />

      <div className="journey-viewport">
        <JourneyTimeline>
          {syncedJourney.map((section) => (
            <JourneyChapter key={section.chapter} section={section} />
          ))}
        </JourneyTimeline>

        <JourneyFocusPanel node={focusedNode} />
      </div>

      <JourneyBottomNav />
    </div>
  );
}
