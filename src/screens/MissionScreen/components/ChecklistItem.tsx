import { useState, useCallback } from 'react';

interface ChecklistItemProps {
  label: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function ChecklistItem({ label, defaultChecked = false, onChange }: ChecklistItemProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = useCallback(() => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  }, [checked, onChange]);

  return (
    <button
      className={`checklist-item ${checked ? 'checklist-item--checked' : ''}`}
      onClick={handleToggle}
      aria-checked={checked}
      role="checkbox"
    >
      <span className="checklist-item-box">
        {checked && (
          <svg className="checklist-item-check" viewBox="0 0 24 24" width="16" height="16">
            <path d="M6 12l4 4 8-8" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="checklist-item-label">{label}</span>
    </button>
  );
}
