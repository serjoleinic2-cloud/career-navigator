import type { ReactNode } from 'react';
import { IconButton } from './IconButton';
import './TopBar.css';

interface TopBarProps {
  title: string;
  leftIcon?: string;
  leftLabel?: string;
  onLeftClick?: () => void;
  rightIcon?: string;
  rightLabel?: string;
  onRightClick?: () => void;
  children?: ReactNode;
}

export function TopBar({
  title,
  leftIcon = '←',
  leftLabel = 'Back',
  onLeftClick,
  rightIcon,
  rightLabel = 'Settings',
  onRightClick,
  children,
}: TopBarProps) {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        {onLeftClick && (
          <IconButton icon={leftIcon} label={leftLabel} onClick={onLeftClick} />
        )}
      </div>
      <h1 className="top-bar-title">{title}</h1>
      <div className="top-bar-right">
        {children}
        {onRightClick && rightIcon && (
          <IconButton icon={rightIcon} label={rightLabel} onClick={onRightClick} />
        )}
      </div>
    </div>
  );
}
