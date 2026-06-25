import type { FlowPosition } from './visual_flow';

export function getNodeDepth(flowPosition: FlowPosition): number {
  switch (flowPosition) {
    case 'active': return 1;
    case 'past': return 0.6;
    case 'future': return 0.3;
    default: return 0.3;
  }
}
