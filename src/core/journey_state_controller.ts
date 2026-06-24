import type { JourneyChapter, JourneyNode } from './career_journey_model';

export function syncJourneyState(
  journey: JourneyChapter[],
  currentDay: number
): JourneyChapter[] {
  return journey.map((section) => ({
    ...section,
    nodes: section.nodes.map((node) => ({
      ...node,
      status:
        node.dayIndex < currentDay
          ? 'done'
          : node.dayIndex === currentDay
          ? 'active'
          : 'locked',
    })),
  }));
}

export function getFocusedNodeFromJourney(
  journey: JourneyChapter[],
  currentDay: number
): JourneyNode | undefined {
  return journey
    .flatMap((section) => section.nodes)
    .find((node) => node.dayIndex === currentDay);
}
