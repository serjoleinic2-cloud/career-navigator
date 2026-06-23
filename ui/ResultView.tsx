import type { CareerOption } from '../engine/career_data';

interface ResultViewProps {
  career: CareerOption;
  steps: string[];
  onRestart: () => void;
}

export function ResultView({ career, steps, onRestart }: ResultViewProps) {
  return (
    <div>
      <h2>Your Career Path Ready</h2>
      <h3>{career.title}</h3>
      <ol>
        {steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
}
