import './JourneyBottomNav.css';

interface JourneyBottomNavProps {
  activeNodeId: string;
  onNodeSelect: (nodeId: string) => void;
  onAdvance: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function JourneyBottomNav({
  activeNodeId: _activeNodeId,
  onNodeSelect: _onNodeSelect,
  onAdvance,
  hasNext,
  hasPrevious: _hasPrevious,
}: JourneyBottomNavProps) {
  return (
    <nav className="journey-bottom-nav">
      <button
        className="journey-bottom-nav__advance"
        onClick={onAdvance}
        disabled={!hasNext}
      >
        Advance
      </button>
      <div className="journey-bottom-nav__tabs">
        <div className="journey-bottom-nav__item journey-bottom-nav__item--active">
          <span className="journey-bottom-nav__icon">🗺</span>
          <span className="journey-bottom-nav__label">Journey</span>
        </div>
        <div className="journey-bottom-nav__item">
          <span className="journey-bottom-nav__icon">⭐</span>
          <span className="journey-bottom-nav__label">Skills</span>
        </div>
        <div className="journey-bottom-nav__item">
          <span className="journey-bottom-nav__icon">📊</span>
          <span className="journey-bottom-nav__label">Progress</span>
        </div>
        <div className="journey-bottom-nav__item">
          <span className="journey-bottom-nav__icon">👤</span>
          <span className="journey-bottom-nav__label">Profile</span>
        </div>
      </div>
    </nav>
  );
}
