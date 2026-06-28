import { GlassCard } from '@/components/layout/GlassCard';
import { PrimaryButton } from '@/components/layout/PrimaryButton';
import './MissionFlow.css';

interface MissionFlowProps {
  instructions: string[];
  activeStep: number;
  totalSteps: number;
  onStepComplete: () => void;
}

export function MissionFlow({ instructions, activeStep, totalSteps, onStepComplete }: MissionFlowProps) {
  return (
    <div className="mission-flow">
      <div className="mission-flow-progress">
        <span className="mission-flow-progress-text">{activeStep + 1} / {totalSteps}</span>
        <div className="mission-flow-progress-bar">
          <div
            className="mission-flow-progress-fill"
            style={{ width: `${((activeStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {instructions.map((instruction, index) => (
        <div
          key={index}
          className={`mission-flow-step ${index === activeStep ? 'active' : index < activeStep ? 'done' : ''}`}
          style={{
            opacity: index <= activeStep ? 1 : 0,
            transform: index <= activeStep ? 'translateY(0)' : 'translateY(20px)',
            pointerEvents: index === activeStep ? 'auto' : 'none',
          }}
        >
          <GlassCard className="mission-flow-step-card">
            <span className="mission-flow-step-number">Step {index + 1}</span>
            <p className="mission-flow-step-text">{instruction}</p>
            {index === activeStep && (
              <PrimaryButton onClick={onStepComplete}>
                {index === totalSteps - 1 ? 'Finish' : 'Done'}
              </PrimaryButton>
            )}
          </GlassCard>
        </div>
      ))}
    </div>
  );
}
