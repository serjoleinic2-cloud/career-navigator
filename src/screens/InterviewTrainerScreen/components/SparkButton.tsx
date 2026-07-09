interface SparkButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'record' | 'stop';
}

export function SparkButton({ label, onClick, variant = 'record' }: SparkButtonProps) {
  const className = variant === 'stop' ? 'interview-stop-btn' : 'interview-record-btn';
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}
