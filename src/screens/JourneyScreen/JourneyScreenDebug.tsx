import type { CSSProperties } from 'react';

export function JourneyScreenDebug({ style }: { style?: CSSProperties }) {
  return (
    <div style={{ ...style, background: '#0a0a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 14 }}>
      Debug View
    </div>
  );
}
