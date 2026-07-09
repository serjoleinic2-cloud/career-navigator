interface FinalIslandProps {
  title: string;
  artSrc: string;
  accent: string;
  glowing: boolean;
  islandWidth: number;
  style: React.CSSProperties;
}

export function FinalIsland({ title, artSrc, accent, glowing, islandWidth, style }: FinalIslandProps) {
  return (
    <div className="fc-slot" style={{ ...style, width: islandWidth }}>
      <div
        className={`fc-island${glowing ? ' fc-island--lit' : ''}`}
        style={{ '--acc': accent, opacity: glowing ? 1 : 0.08 } as React.CSSProperties}
      >
        {artSrc ? (
          <img
            className="fc-island-img"
            src={artSrc}
            alt={title}
            onError={e => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              const fb = e.currentTarget.nextSibling as HTMLElement | null;
              if (fb) fb.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="fc-island-fallback" style={{ display: artSrc ? 'none' : 'flex' }}>
          {title[0]}
        </div>
      </div>
    </div>
  );
}
