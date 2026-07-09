import type { IslandPosition } from '../hooks/useIslandPositions';

interface IslandBridgeProps {
  from: IslandPosition;
  to: IslandPosition;
}

export function IslandBridge({ from, to }: IslandBridgeProps) {
  const fromPct = parseFloat(from.bottom);
  const toPct = parseFloat(to.bottom);
  const midBottom = ((fromPct + toPct) / 2).toFixed(1);

  return (
    <div
      className="world-island-bridge"
      style={{
        left: '50%',
        bottom: `${midBottom}%`,
        height: `${Math.abs(fromPct - toPct)}%`,
      }}
    />
  );
}
