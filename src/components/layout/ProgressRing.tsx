import './ProgressRing.css';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeColor?: string;
  label?: string;
}

export function ProgressRing({ progress, size = 120, strokeColor = '#FF6B6B', label }: ProgressRingProps) {
  const strokeWidth = size >= 80 ? 8 : 4;
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (progress / 100) * c;

  return (
    <div className="progress-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="progress-ring-fill"
        />
      </svg>
      {label && size >= 80 && (
        <div className="progress-ring-label">
          <span className="progress-ring-percent">{progress}%</span>
          <span className="progress-ring-text">{label}</span>
        </div>
      )}
    </div>
  );
}
