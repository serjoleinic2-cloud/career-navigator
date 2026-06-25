export type PremiumTelemetry = {
  lockedViews: number;
  upgradeClicks: number;
  blockedAttempts: number;
  conversionPoints: number;
  events: TelemetryEvent[];
};

export type TelemetryEvent = {
  type: 'locked_view' | 'upgrade_click' | 'blocked_attempt' | 'conversion';
  timestamp: number;
  professionId: string;
  chapterId?: string;
  nodeId?: string;
};

export function createPremiumTelemetry(): PremiumTelemetry {
  return {
    lockedViews: 0,
    upgradeClicks: 0,
    blockedAttempts: 0,
    conversionPoints: 0,
    events: [],
  };
}

export function recordLockedView(
  telemetry: PremiumTelemetry,
  professionId: string,
  chapterId?: string
): PremiumTelemetry {
  return {
    ...telemetry,
    lockedViews: telemetry.lockedViews + 1,
    events: [
      ...telemetry.events,
      { type: 'locked_view', timestamp: Date.now(), professionId, chapterId },
    ],
  };
}

export function recordUpgradeClick(
  telemetry: PremiumTelemetry,
  professionId: string
): PremiumTelemetry {
  return {
    ...telemetry,
    upgradeClicks: telemetry.upgradeClicks + 1,
    events: [
      ...telemetry.events,
      { type: 'upgrade_click', timestamp: Date.now(), professionId },
    ],
  };
}

export function recordBlockedAttempt(
  telemetry: PremiumTelemetry,
  professionId: string,
  chapterId: string,
  nodeId?: string
): PremiumTelemetry {
  return {
    ...telemetry,
    blockedAttempts: telemetry.blockedAttempts + 1,
    events: [
      ...telemetry.events,
      { type: 'blocked_attempt', timestamp: Date.now(), professionId, chapterId, nodeId },
    ],
  };
}

export function recordConversion(
  telemetry: PremiumTelemetry,
  professionId: string
): PremiumTelemetry {
  return {
    ...telemetry,
    conversionPoints: telemetry.conversionPoints + 1,
    events: [
      ...telemetry.events,
      { type: 'conversion', timestamp: Date.now(), professionId },
    ],
  };
}
