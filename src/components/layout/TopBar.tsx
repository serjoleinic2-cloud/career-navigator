import type { ReactNode } from 'react';
import { IconButton } from './IconButton';
import './TopBar.css';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: ReactNode;
}

export function TopBar({ title, showBack, onBack, rightAction }: TopBarProps) {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <IconButton
          icon={showBack ? '←' : '☰'}
          label={showBack ? 'Back' : 'Menu'}
          onClick={showBack ? onBack : undefined}
        />
      </div>
      <h1 className="top-bar-title">{title}</h1>
      <div className="top-bar-right">
        {rightAction}
      </div>
    </div>
  );
}
