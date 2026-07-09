

interface JourneyHeaderProps {
  chapterTitle: string;
  nodeIndex: number;
  totalNodes: number;
  readinessScore: number;
}

export function JourneyHeader({
  chapterTitle,
  nodeIndex,
  totalNodes,
  readinessScore,
}: JourneyHeaderProps) {
  return (
    <header className="journey-header">
      <div className="journey-header-left">
        <span className="journey-header-title">{chapterTitle || 'Journey'}</span>
        <span className="journey-header-position">Node {nodeIndex} of {totalNodes}</span>
      </div>
      <div className="journey-header-right">
        <div className="journey-header-readiness">
          <span className="readiness-label">Readiness</span>
          <span className="readiness-value">{readinessScore}%</span>
        </div>
        <div className="readiness-bar-track">
          <div
            className="readiness-bar-fill"
            style={{ width: `${readinessScore}%` }}
          />
        </div>
      </div>
    </header>
  );
}
