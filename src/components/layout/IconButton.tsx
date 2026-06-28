import type { ButtonHTMLAttributes } from 'react';
import './IconButton.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label: string;
}

export function IconButton({ icon, label, className = '', ...rest }: IconButtonProps) {
  return (
    <button className={`icon-button ${className}`} aria-label={label} {...rest}>
      <span className="icon-button-icon">{icon}</span>
    </button>
  );
}
