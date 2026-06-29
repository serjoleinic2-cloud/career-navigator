import { IconButton } from '@/components/layout/IconButton';

interface JourneyHeaderProps {
  chapterTitle: string;
  nodeIndex: number;
  totalNodes: number;
  readinessScore: number;
  onSettings?: () => void;
}

export function JourneyHeader({
  chapterTitle,
  nodeIndex,
  totalNodes,
  readinessScore,
  onSettings,
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
        <IconButton
          icon="⚙️"
          label="Settings"
          size={40}
          onClick={onSettings}
        />
      </div>
    </header>
  );
}
