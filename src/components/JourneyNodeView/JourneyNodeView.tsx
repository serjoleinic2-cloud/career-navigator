import './JourneyNodeView.css';

interface JourneyNodeViewProps {
  id: string;
  chapter: string;
  title: string;
  status: 'done' | 'active' | 'locked';
  tasks?: string[];
  isFocused?: boolean;
}

export function JourneyNodeView({ chapter, title, status, tasks, isFocused }: JourneyNodeViewProps) {
  return (
    <div className={`journey-node journey-node--${status} ${isFocused ? 'journey-node--focused' : ''}`}>
      <div className="journey-node__chapter">{chapter}</div>
      <div className="journey-node__title">{title}</div>
      {status === 'active' && tasks && (
        <div className="journey-node__tasks">
          {tasks.map(t => <div key={t} className="journey-node__task">{t}</div>)}
        </div>
      )}
    </div>
  );
}
