import type { ButtonHTMLAttributes } from 'react';
import './IconButton.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label: string;
  size?: number;
}

export function IconButton({ icon, label, size = 56, className = '', style, ...rest }: IconButtonProps) {
  return (
    <button
      className={`icon-button ${className}`}
      aria-label={label}
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      <span className="icon-button-icon">{icon}</span>
    </button>
  );
}
