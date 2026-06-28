import './BottomNavigation.css';

interface Tab {
  id: string;
  icon: string;
  label: string;
}

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TABS: Tab[] = [
  { id: 'journey', icon: '🧭', label: 'Journey' },
  { id: 'playbook', icon: '📖', label: 'Playbook' },
  { id: 'notes', icon: '📝', label: 'Notes' },
  { id: 'world', icon: '🌍', label: 'World' },
  { id: 'profile', icon: '👤', label: 'Profile' },
];

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="bottom-nav-new">
      {TABS.map(tab => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            className={`bottom-nav-new-item ${isActive ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            aria-label={tab.label}
          >
            <span className="bottom-nav-new-icon">{tab.icon}</span>
            <span className="bottom-nav-new-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
