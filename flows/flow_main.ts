// FRZ v0.2 - SINGLE FLOW LOCKED

import { getCareerOptions, getCareerSteps, type CareerStep } from '../engine/career_engine_stub';
import type { CareerOption } from '../engine/career_engine_stub';

export interface FlowResult {
  goal: string;
  options: CareerOption[];
  steps: Record<string, CareerStep[]>;
}

export function runGoalFlow(goal: string): FlowResult {
  const options = getCareerOptions();
  const steps: Record<string, CareerStep[]> = {};
  for (const opt of options) {
    steps[opt.id] = getCareerSteps(opt.id);
  }
  return { goal, options, steps };
}
