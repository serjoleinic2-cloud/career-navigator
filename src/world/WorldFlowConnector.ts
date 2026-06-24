import { getCareerSteps } from '../../engine/career_engine_stub';
import type { WorldState } from './WorldState';
import { initialWorldState } from './WorldState';

export function onStepSelected(optionIndex: number): { steps: string[]; worldState: WorldState } {
  const steps = getCareerSteps(String(optionIndex));
  const worldState = { ...initialWorldState };
  return { steps, worldState };
}
