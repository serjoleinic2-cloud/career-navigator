interface MissionProgressProps {
  progress: number;
}

export function MissionProgress({ progress }: MissionProgressProps) {
  return (
    <div className="mission-progress">
      <div className="mission-progress-header">
        <span className="mission-progress-label">Mission Progress</span>
        <span className="mission-progress-percent">{Math.round(progress)}%</span>
      </div>
      <div className="mission-progress-track">
        <div
          className="mission-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
