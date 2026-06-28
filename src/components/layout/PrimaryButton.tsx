import type { ButtonHTMLAttributes } from 'react';
import './PrimaryButton.css';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export function PrimaryButton({ children, className = '', ...rest }: PrimaryButtonProps) {
  return (
    <button className={`primary-button ${className}`} {...rest}>
      {children}
    </button>
  );
}
