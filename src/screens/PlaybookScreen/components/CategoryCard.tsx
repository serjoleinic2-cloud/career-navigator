import { Icon } from '@/components/Icon/Icon';
import type { PlaybookCategory } from '@/core/playbook/playbook_types';

interface CategoryCardProps {
  id: PlaybookCategory;
  label: string;
  iconName: string;
  color: string;
  onClick: (id: PlaybookCategory) => void;
}

export function CategoryCard({ id, label, iconName, color, onClick }: CategoryCardProps) {
  return (
    <button
      className="playbook-category-card"
      onClick={() => onClick(id)}
      style={{ '--cat-color': color } as React.CSSProperties}
    >
      <span className="playbook-category-icon">
        <Icon name={iconName as any} size={28} color={color} />
      </span>
      <span className="playbook-category-label">{label}</span>
    </button>
  );
}
