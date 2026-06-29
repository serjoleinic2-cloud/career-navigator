import type { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { BottomNavigation } from './BottomNavigation';

interface AppShellProps {
  children: ReactNode;
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  rightAction?: ReactNode;
}

export function AppShell({
  children,
  title,
  showBack,
  onBack,
  activeTab,
  onTabChange,
  rightAction,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <TopBar
        title={title}
        showBack={showBack}
        onBack={onBack}
        rightAction={rightAction}
      />
      <main className="app-shell-content">
        {children}
      </main>
      {onTabChange && activeTab && (
        <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
      )}
    </div>
  );
}
