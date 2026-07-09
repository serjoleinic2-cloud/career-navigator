import { Icon, type IconName } from '@/components/Icon/Icon';

interface Tab {
  id: string;
  icon: IconName;
  label: string;
}

const TABS: Tab[] = [
  { id: 'journey', icon: 'map', label: 'Journey' },
  { id: 'playbook', icon: 'book', label: 'Playbook' },
  { id: 'notes', icon: 'resume', label: 'Notes' },
  { id: 'profile', icon: 'person', label: 'Profile' },
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
          <span className="bottom-nav-icon"><Icon name={tab.icon} size={20} /></span>
          <span className="bottom-nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
