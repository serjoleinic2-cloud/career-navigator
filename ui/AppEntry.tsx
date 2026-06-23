import { useState } from 'react';
import { runGoalFlow, selectCareer } from '../flows/flow_main';
import type { FlowState } from '../flows/flow_main';
import { ResultView } from './ResultView';

export function AppEntry() {
  const [goal, setGoal] = useState('');
  const [flow, setFlow] = useState<FlowState | null>(null);
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    if (!goal.trim()) return;
    setFlow(runGoalFlow(goal));
    setStarted(true);
  };

  const handleSelect = (optionId: string) => {
    if (!flow) return;
    setFlow(selectCareer(flow, optionId));
  };

  const handleRestart = () => {
    setGoal('');
    setFlow(null);
    setStarted(false);
  };

  if (!started) {
    return (
      <div>
        <h1>Career Navigator</h1>
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Кем хочу стать?"
        />
        <button onClick={handleStart}>Start</button>
      </div>
    );
  }

  if (flow?.selectedOption) {
    return (
      <ResultView
        career={flow.selectedOption}
        steps={flow.steps}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div>
      <h2>Выберите карьерный путь</h2>
      {flow?.options.map((opt) => (
        <button key={opt.id} onClick={() => handleSelect(opt.id)}>
          {opt.title}
        </button>
      ))}
    </div>
  );
}
