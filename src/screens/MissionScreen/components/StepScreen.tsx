import { PrimaryButton } from '@/components/layout/PrimaryButton';
import { IconButton } from '@/components/layout/IconButton';
import { ChecklistItem } from './ChecklistItem';
import { MissionProgress } from './MissionProgress';

interface StepScreenProps {
  stepIndex: number;
  totalSteps: number;
  instruction: string;
  criteria: string[];
  checkedItems: boolean[];
  onToggleItem: (index: number) => void;
  onDone: () => void;
  onPrevious: () => void;
  progress: number;
}

export function StepScreen({
  stepIndex,
  totalSteps,
  instruction,
  criteria,
  checkedItems,
  onToggleItem,
  onDone,
  onPrevious,
  progress,
}: StepScreenProps) {
  const allChecked = criteria.length === 0 || checkedItems.every(Boolean);

  return (
    <div className="step-screen" key={stepIndex}>
      <MissionProgress progress={progress} />

      <div className="step-screen-content">
        <span className="step-indicator">{stepIndex + 1} / {totalSteps}</span>
        <h2 className="step-title">STEP {stepIndex + 1}</h2>
        <p className="step-instruction">{instruction}</p>

        {criteria.length > 0 && (
          <div className="step-checklist">
            {criteria.map((criterion, i) => (
              <ChecklistItem
                key={i}
                label={criterion}
                defaultChecked={checkedItems[i]}
                onChange={() => onToggleItem(i)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="step-actions">
        {stepIndex > 0 && (
          <IconButton icon="←" label="Previous Step" size={48} onClick={onPrevious} />
        )}
        <PrimaryButton onClick={onDone} disabled={!allChecked}>
          {stepIndex === totalSteps - 1 ? 'Complete Mission' : "I'm Done"}
        </PrimaryButton>
      </div>
    </div>
  );
}
