interface FinalCursorProps {
  x: number;
  y: number;
  visible: boolean;
}

export function FinalCursor({ x, y, visible }: FinalCursorProps) {
  if (!visible) return null;

  return (
    <div
      className="fc-cursor"
      style={{
        left: x,
        top: y,
      }}
    />
  );
}
