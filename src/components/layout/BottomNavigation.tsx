import { Icon, type IconName } from '../Icon/Icon';
import './BottomNavigation.css';

interface Tab {
  id: string;
  icon: IconName;
  label: string;
}

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TABS: Tab[] = [
  { id: 'journey', icon: 'map', label: 'Journey' },
  { id: 'playbook', icon: 'book', label: 'Playbook' },
  { id: 'notes', icon: 'resume', label: 'Notes' },
  { id: 'world', icon: 'map', label: 'World' },
  { id: 'profile', icon: 'person', label: 'Profile' },
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
            <span className="bottom-nav-new-icon"><Icon name={tab.icon} size={20} /></span>
            <span className="bottom-nav-new-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
