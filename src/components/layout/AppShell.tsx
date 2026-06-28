import type { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { BottomNavigation } from './BottomNavigation';
import '../../styles/layout.css';
import '../../styles/theme.css';
import '../../styles/animations.css';

interface AppShellProps {
  title: string;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onBack?: () => void;
  rightIcon?: string;
  rightLabel?: string;
  onRightClick?: () => void;
  children: ReactNode;
}

export function AppShell({
  title,
  activeTab,
  onTabChange,
  onBack,
  rightIcon,
  rightLabel,
  onRightClick,
  children,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <TopBar
        title={title}
        onLeftClick={onBack}
        rightIcon={rightIcon}
        rightLabel={rightLabel}
        onRightClick={onRightClick}
      />
      <main className="app-shell-content">
        {children}
      </main>
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
