interface Tab {
  id: string;
  icon: string;
  label: string;
}

const TABS: Tab[] = [
  { id: 'journey', icon: '🧭', label: 'Journey' },
  { id: 'playbook', icon: '📖', label: 'Playbook' },
  { id: 'notes', icon: '📝', label: 'Notes' },
  { id: 'profile', icon: '👤', label: 'Profile' },
];

interface JourneyBottomNavProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function JourneyBottomNav({ activeTab, onTabChange }: JourneyBottomNavProps) {
  return (
    <nav className="journey-bottom-nav">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`bottom-nav-tab ${activeTab === tab.id ? 'bottom-nav-tab--active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          aria-label={tab.label}
        >
          <span className="bottom-nav-icon">{tab.icon}</span>
          <span className="bottom-nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
