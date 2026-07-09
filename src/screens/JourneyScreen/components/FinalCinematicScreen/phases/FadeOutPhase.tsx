export function FadeOutPhase() {
  return (
    <div
      className="fc-blackout"
      style={{
        opacity: 1,
        transition: 'opacity 900ms ease',
      }}
    />
  );
}
