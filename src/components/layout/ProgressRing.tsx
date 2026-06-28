import './ProgressRing.css';

interface ProgressRingProps {
  percent: number;
  size?: 'big' | 'mini';
  strokeColor?: string;
  label?: string;
}

export function ProgressRing({ percent, size = 'big', strokeColor = '#FF6B6B', label }: ProgressRingProps) {
  const dim = size === 'big' ? 120 : 40;
  const strokeWidth = size === 'big' ? 8 : 4;
  const r = (dim - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <div className={`progress-ring progress-ring-${size}`}>
      <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`}>
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${dim / 2} ${dim / 2})`}
          className="progress-ring-fill"
        />
      </svg>
      {label && size === 'big' && (
        <div className="progress-ring-label">
          <span className="progress-ring-percent">{percent}%</span>
          <span className="progress-ring-text">{label}</span>
        </div>
      )}
    </div>
  );
}
