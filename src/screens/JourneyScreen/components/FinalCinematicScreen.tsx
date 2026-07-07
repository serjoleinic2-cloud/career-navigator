import { useMemo, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getWorldThemeOrDefault, getChapterAccent } from '@/core/world/world_theme';
import './FinalCinematicScreen.css';

export interface CinematicChapter {
  id: string;
  title: string;
  completed: boolean;
}

interface FinalCinematicScreenProps {
  professionId: string;
  chapters: CinematicChapter[];
  onComplete: () => void;
}

const CHAPTER_ART_FILENAME: Record<string, string> = {
  resume: 'island-resume.png',
  linkedin: 'island-linkedin.png',
  applications: 'island-applications.png',
  interviews: 'island-interview.png',
  offer_preparation: 'island-offer.png',
  offer: 'island-offer.png',
};

const ISLAND_DISTANCE = 180;
const VIEWPORT_HEIGHT = 800;

export function FinalCinematicScreen({ professionId, chapters, onComplete }: FinalCinematicScreenProps) {
  const [phase, setPhase] = useState<'fade-in' | 'rising' | 'zoom-out' | 'light-beam' | 'done'>('fade-in');
  const [visibleIslands, setVisibleIslands] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const theme = useMemo(() => getWorldThemeOrDefault(professionId), [professionId]);

  const islands = useMemo(() => {
    const items = chapters.map((ch) => {
      const chId = ch.id.toLowerCase();
      const fileName = CHAPTER_ART_FILENAME[chId];
      return {
        id: ch.id,
        title: ch.title,
        completed: ch.completed,
        artSrc: fileName ? `art/${professionId}/${fileName}` : '',
        accent: getChapterAccent(theme, chId),
      };
    });
    items.push({
      id: 'city',
      title: theme.endLabel,
      completed: true,
      artSrc: '',
      accent: theme.celebration.gradientTo || '#FFD700',
    });
    return items;
  }, [chapters, professionId, theme]);

  const totalHeight = islands.length * ISLAND_DISTANCE + 200;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('rising'), 1000);
    const t2 = setTimeout(() => setPhase('zoom-out'), 7000);
    const t3 = setTimeout(() => setPhase('light-beam'), 9000);
    const t4 = setTimeout(() => {
      setPhase('done');
    }, 11000);
    const t5 = setTimeout(() => {
      onComplete();
    }, 12000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  useEffect(() => {
    if (phase !== 'rising') return;
    const intervals = islands.map((_, i) =>
      setTimeout(() => setVisibleIslands(prev => Math.max(prev, i + 1)), i * 1500)
    );
    return () => intervals.forEach(clearTimeout);
  }, [phase, islands.length]);

  const cameraTranslate = phase === 'fade-in' ? 0
    : phase === 'rising' ? Math.min((Date.now() - 1000) * 0.03, totalHeight - VIEWPORT_HEIGHT)
    : totalHeight - VIEWPORT_HEIGHT;

  return createPortal(
    <div
      className="cinematic-overlay"
      ref={containerRef}
      style={{
        opacity: phase === 'done' ? 0 : 1,
        transition: 'opacity 1s ease',
        transitionDelay: phase === 'done' ? '0s' : '0s',
      }}
    >
      <div className="cinematic-hud-fade" style={{ opacity: phase === 'fade-in' ? 1 : 0 }} />

      <svg className="cinematic-light-beam" viewBox="0 0 100 1200" preserveAspectRatio="xMidYMax meet">
        <line
          x1={50} y1={1200} x2={50} y2={0}
          stroke="white"
          strokeWidth={3}
          filter="url(#beamBlur)"
          strokeDasharray={1200}
          strokeDashoffset={phase === 'light-beam' ? 0 : 1200}
          style={{ transition: phase === 'light-beam' ? 'stroke-dashoffset 2s ease-in-out' : 'none' }}
        />
        <defs>
          <filter id="beamBlur">
            <feGaussianBlur stdDeviation={4} />
          </filter>
        </defs>
      </svg>

      <div
        className="cinematic-camera"
        style={{
          transform: `translateY(${-cameraTranslate}px)${phase === 'zoom-out' || phase === 'light-beam' || phase === 'done' ? ' scale(0.5)' : ''}`,
          transition: phase === 'zoom-out' ? 'transform 2s ease-in-out' : 'none',
        }}
      >
        <div className="cinematic-islands-column">
          {islands.map((isl, i) => {
            const isCity = isl.id === 'city';
            const revealed = visibleIslands > i;
            return (
              <div key={isl.id} className="cinematic-island-pair">
                {i < islands.length - 1 && (
                  <svg className="cinematic-bridge" width="80" height={ISLAND_DISTANCE} viewBox="0 0 80 180">
                    <path
                      d={`M ${isCity ? 40 : 20} 0 Q 40 ${ISLAND_DISTANCE / 2} ${isCity ? 40 : 60} ${ISLAND_DISTANCE}`}
                      stroke={theme.palette.primary}
                      strokeWidth={4}
                      strokeDasharray="8 4"
                      fill="none"
                      opacity={revealed ? 1 : 0}
                      style={{
                        transition: 'opacity 0.3s ease',
                        strokeDashoffset: revealed ? 0 : 340,
                        transitionProperty: 'opacity',
                      }}
                    />
                  </svg>
                )}
                <div
                  className={`cinematic-island-wrap ${revealed ? 'cinematic-island-revealed' : ''}`}
                  style={{
                    '--island-accent': isl.accent,
                    animationDelay: `${i * 1.5}s`,
                    opacity: revealed ? 1 : 0,
                    transition: 'opacity 0.6s ease',
                  } as React.CSSProperties}
                >
                  {isCity ? (
                    <div className="cinematic-city-icon">
                      <span style={{ fontSize: 52, lineHeight: 1 }}>🏙️</span>
                    </div>
                  ) : (
                    <img
                      className="cinematic-island-img"
                      src={isl.artSrc}
                      alt={isl.title}
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.style.display = 'none';
                        const next = img.nextElementSibling;
                        if (next) (next as HTMLElement).style.display = 'flex';
                      }}
                    />
                  )}
                  <div className="cinematic-island-fallback" style={{ display: 'none' }}>
                    <span style={{ fontSize: 32 }}>{isl.title[0]}</span>
                  </div>
                  <div
                    className="cinematic-island-flash"
                    style={{
                      opacity: phase === 'light-beam' ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                      transitionDelay: phase === 'light-beam' ? `${(islands.length - 1 - i) * 0.3}s` : '0s',
                    }}
                  />
                  <span className="cinematic-island-label">{isl.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {phase === 'done' && (
        <div className="cinematic-journey-complete-label">
          <h1>JOURNEY COMPLETE</h1>
        </div>
      )}
    </div>,
    document.body
  );
}
