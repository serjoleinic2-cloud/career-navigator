import './JourneyBottomNav.css';

interface JourneyBottomNavProps {
  activeNodeId: string;
  onNodeSelect: (nodeId: string) => void;
}

export function JourneyBottomNav({ activeNodeId: _activeNodeId, onNodeSelect: _onNodeSelect }: JourneyBottomNavProps) {
  return (
    <nav className="journey-bottom-nav">
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
    </nav>
  );
}
