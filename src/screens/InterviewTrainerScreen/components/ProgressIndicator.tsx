interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return <span>{current}/{total} Interview Challenge</span>;
}
