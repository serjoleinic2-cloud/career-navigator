import { useState, useCallback, useMemo } from 'react';
import { IconButton } from '@/components/layout/IconButton';
import { loadTaskForNode, createTaskFromDefinition, submitTask } from '@/core/runtime/runtime_controller';
import type { TaskContent } from '@/core/task_content';
import type { TaskResult } from '@/core/task/task_execution_engine';
import { MissionCard } from './components/MissionCard';
import { StepScreen } from './components/StepScreen';
import { SuccessScreen } from './components/SuccessScreen';
import { useMissionSteps } from './hooks/useMissionSteps';
import './MissionScreen.css';

const CHAPTER_BG: Record<string, string> = {
  resume: '#0a1628',
  linkedin: '#1a0a2e',
  applications: '#2a1408',
  interview: '#0d1117',
  offer: '#0a1f14',
};

const DEFAULT_BG = '#071320';

interface MissionScreenProps {
  task: TaskContent;
  nodeId: string;
  chapterDomain?: string;
  chapterTitle?: string;
  onBack: () => void;
  onContinue: () => void;
}

type MissionPhase = 'card' | 'step' | 'success';

export function MissionScreen({ task, nodeId, chapterDomain, chapterTitle, onBack, onContinue }: MissionScreenProps) {
  const [phase, setPhase] = useState<MissionPhase>('card');
  const [taskResult, setTaskResult] = useState<TaskResult | null>(null);
  const [checkedMap, setCheckedMap] = useState<Record<number, boolean[]>>({});

  const steps = task.instructions;
  const criteria = task.completionCriteria;

  const criteriaPerStep = useMemo(() => {
    if (steps.length === 0 || criteria.length === 0) return steps.map(() => [] as string[]);
    const base = Math.ceil(criteria.length / steps.length);
    const result: string[][] = [];
    let ci = 0;
    for (let i = 0; i < steps.length; i++) {
      const end = i === steps.length - 1 ? criteria.length : ci + base;
      result.push(criteria.slice(ci, end));
      ci = end;
    }
    return result;
  }, [steps, criteria]);

  const { currentStep, totalSteps, nextStep, prevStep, isLastStep, progress } =
    useMissionSteps(steps.length);

  const bgColor = useMemo(() => {
    if (!chapterDomain) return DEFAULT_BG;
    return CHAPTER_BG[chapterDomain.toLowerCase()] || DEFAULT_BG;
  }, [chapterDomain]);

  const getCheckedItems = useCallback((stepIdx: number): boolean[] => {
    return checkedMap[stepIdx] ?? criteriaPerStep[stepIdx]?.map(() => false) ?? [];
  }, [checkedMap, criteriaPerStep]);

  const handleToggleItem = useCallback((stepIdx: number, itemIdx: number) => {
    setCheckedMap(prev => {
      const current = [...(prev[stepIdx] ?? criteriaPerStep[stepIdx]?.map(() => false) ?? [])];
      current[itemIdx] = !current[itemIdx];
      return { ...prev, [stepIdx]: current };
    });
  }, [criteriaPerStep]);

  const handleStart = useCallback(() => {
    setPhase('step');
  }, []);

  const handleDone = useCallback(() => {
    if (isLastStep) {
      const definition = loadTaskForNode(nodeId);
      if (definition) {
        createTaskFromDefinition(definition);
      }
      try {
        const result = submitTask({ taskId: task.id, completed: true });
        setTaskResult(result);
      } catch (err) {
        console.error('[MissionScreen] submitTask failed:', err);
      }
      setPhase('success');
    } else {
      nextStep();
    }
  }, [isLastStep, nextStep, nodeId, task.id]);

  return (
    <div className="mission-screen" style={{ backgroundColor: bgColor }}>
      <header className="mission-header">
        <IconButton icon="←" label="Back" size={40} onClick={onBack} />
        <div className="mission-header-info">
          <span className="mission-header-chapter">{chapterTitle || 'Mission'}</span>
          <span className="mission-header-task">{task.title}</span>
        </div>
      </header>

      {phase === 'card' && (
        <div className="mission-body">
          <MissionCard task={task} onStart={handleStart} />
        </div>
      )}

      {phase === 'step' && steps.length > 0 && (
        <div className="mission-body">
          <StepScreen
            key={currentStep}
            stepIndex={currentStep}
            totalSteps={totalSteps}
            instruction={steps[currentStep]}
            criteria={criteriaPerStep[currentStep]}
            checkedItems={getCheckedItems(currentStep)}
            onToggleItem={(i) => handleToggleItem(currentStep, i)}
            onDone={handleDone}
            onPrevious={prevStep}
            progress={progress}
          />
        </div>
      )}

      {phase === 'success' && (
        <SuccessScreen result={taskResult} onContinue={onContinue} />
      )}
    </div>
  );
}
