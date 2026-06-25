export enum CareerState {
  UNKNOWN = "unknown",
  EXPLORING = "exploring",
  PREPARING = "preparing",
  APPLYING = "applying",
  INTERVIEWING = "interviewing",
  NEGOTIATING = "negotiating",
  READY = "ready"
}

export const CAREER_STATE_ORDER: Record<CareerState, number> = {
  [CareerState.UNKNOWN]: 0,
  [CareerState.EXPLORING]: 1,
  [CareerState.PREPARING]: 2,
  [CareerState.APPLYING]: 3,
  [CareerState.INTERVIEWING]: 4,
  [CareerState.NEGOTIATING]: 5,
  [CareerState.READY]: 6,
};
