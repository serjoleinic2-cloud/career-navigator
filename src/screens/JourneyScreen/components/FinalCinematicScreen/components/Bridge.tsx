interface FinalBridgeProps {
  fromCenterY: number;
  toCenterY: number;
  centerX: number;
  progress: number;
  accent: string;
  accentB: string;
  cameraScale: number;
}

export function FinalBridge({ fromCenterY, toCenterY, centerX, progress, accent, accentB, cameraScale }: FinalBridgeProps) {
  if (progress <= 0) return null;

  const totalLen = fromCenterY - toCenterY;
  const drawnLen = totalLen * progress;
  const trailTop = fromCenterY - drawnLen;
  const trailBot = fromCenterY;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      <defs>
        <linearGradient id={`bridge-grad-${accent}`} x1="0" y1={trailBot} x2="0" y2={trailTop}>
          <stop offset="0%" stopColor={accent} stopOpacity="0.67" />
          <stop offset="100%" stopColor={accentB} stopOpacity="0.67" />
        </linearGradient>
      </defs>
      <line
        x1={centerX}
        y1={trailBot}
        x2={centerX}
        y2={trailTop}
        stroke={`url(#bridge-grad-${accent})`}
        strokeWidth={18 * cameraScale}
        strokeLinecap="round"
        opacity={0.35}
        filter="url(#glow)"
      />
      <line
        x1={centerX}
        y1={trailBot}
        x2={centerX}
        y2={trailTop}
        stroke={accent}
        strokeWidth={6 * cameraScale}
        strokeLinecap="round"
        opacity={0.7}
      />
      <line
        x1={centerX}
        y1={trailBot}
        x2={centerX}
        y2={trailTop}
        stroke="#ffffff"
        strokeWidth={2 * cameraScale}
        strokeLinecap="round"
        opacity={1}
      />
    </svg>
  );
}
