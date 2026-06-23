// FRZ v0.3 — MVP LINEAR FLOW

import { getCareerOptions, getCareerSteps } from '../engine/career_engine_stub';
import type { CareerOption } from '../engine/career_engine_stub';

export interface FlowState {
  goal: string;
  options: CareerOption[];
  selectedOption: CareerOption | null;
  steps: string[];
}

export function runGoalFlow(goal: string): FlowState {
  const options = getCareerOptions();
  return { goal, options, selectedOption: null, steps: [] };
}

export function selectCareer(state: FlowState, optionId: string): FlowState {
  const option = state.options.find((o) => o.id === optionId) || null;
  const steps = option ? getCareerSteps(optionId) : [];
  return { ...state, selectedOption: option, steps };
}
