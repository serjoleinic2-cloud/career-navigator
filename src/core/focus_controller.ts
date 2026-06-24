import type { JourneyNode } from './career_journey_model';

export function getFocusedNode(nodes: JourneyNode[], currentDay: number): JourneyNode | undefined {
  return nodes.find(n => n.dayIndex === currentDay);
}

export function getVisibleNodes(nodes: JourneyNode[], currentDay: number): {
  done: JourneyNode[];
  active: JourneyNode | undefined;
  future: JourneyNode[];
} {
  const done = nodes.filter(n => n.dayIndex < currentDay);
  const active = nodes.find(n => n.dayIndex === currentDay);
  const future = nodes.filter(n => n.dayIndex > currentDay);
  return { done, active, future };
}
