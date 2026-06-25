import type { FlowPosition } from './visual_flow';

export function getFocusWeight(flowPosition: FlowPosition): number {
  switch (flowPosition) {
    case 'active': return 1;
    case 'past': return 0.5;
    case 'future': return 0.2;
    default: return 0;
  }
}
