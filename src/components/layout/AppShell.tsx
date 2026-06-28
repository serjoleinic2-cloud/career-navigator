import type { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { BottomNavigation } from './BottomNavigation';
import '../../styles/layout.css';
import '../../styles/theme.css';
import '../../styles/animations.css';

interface AppShellProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  children: ReactNode;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function AppShell({ title, showBack, onBack, children, activeTab, onTabChange }: AppShellProps) {
  return (
    <div className="app-shell">
      <TopBar title={title} showBack={showBack} onBack={onBack} />
      <main className="app-shell-content">{children}</main>
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
