import { Icon } from '@/components/Icon/Icon';
import { IconButton } from '@/components/layout/IconButton';
import { GlassCard } from '@/components/layout/GlassCard';
import './HelpBar.css';

interface HelpBarProps {
  tips: string[];
  showHint: boolean;
  onToggleHint: () => void;
  onOpenPlaybook: () => void;
}

export function HelpBar({ tips, showHint, onToggleHint, onOpenPlaybook }: HelpBarProps) {
  return (
    <div className="help-bar">
      <IconButton icon={<Icon name="lightbulb" size={24} />} label="Need Hint" onClick={onToggleHint} size={48} />
      <IconButton icon={<Icon name="book" size={24} />} label="Open Playbook" onClick={onOpenPlaybook} size={48} />

      {showHint && tips.length > 0 && (
        <GlassCard className="help-bar-hint">
          <h4 className="help-bar-hint-title">Tips</h4>
          <ul className="help-bar-hint-list">
            {tips.map((tip, i) => (
              <li key={i} className="help-bar-hint-item">{tip}</li>
            ))}
          </ul>
        </GlassCard>
      )}
    </div>
  );
}
