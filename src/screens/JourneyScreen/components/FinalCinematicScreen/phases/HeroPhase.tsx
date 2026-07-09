import { Icon } from '@/components/Icon/Icon';
import { emit } from '@/core/events/system_event_bus';
import { FinalParticles } from '../components/Particles';

interface HeroPhaseProps {
  professionId: string;
  heroLoaded: boolean;
  heroError: boolean;
  onComplete: () => void;
  onHeroLoad: () => void;
  onHeroError: () => void;
}

export function HeroPhase({ professionId, heroLoaded, heroError, onComplete, onHeroLoad, onHeroError }: HeroPhaseProps) {
  const heroSrc = `/art/${professionId}/island_${professionId}.png`;

  return (
    <div className="fc-hero">
      {!heroError ? (
        <>
          <img
            className="fc-hero-img"
            src={heroSrc}
            alt={professionId}
            onLoad={onHeroLoad}
            onError={onHeroError}
            style={{ opacity: heroLoaded ? 1 : 0, transition: 'opacity 1s ease' }}
          />
          {heroLoaded && <FinalParticles visible={true} />}
        </>
      ) : (
        <div className="fc-hero-fallback"><Icon name="city" size={48} /></div>
      )}

      <div className="fc-hero-scrim" />

      <div
        className="fc-hero-content"
        style={{
          opacity: heroLoaded || heroError ? 1 : 0,
          transition: 'opacity 1.1s ease 0.4s',
        }}
      >
        <p className="fc-hero-sub">Journey Complete</p>
        <h1 className="fc-hero-title">Software Engineer</h1>

        <div className="fc-hero-actions">
          <button
            className="fc-btn fc-btn--primary"
            onClick={() => { onComplete(); emit('START_INTERVIEW_TRAINER', {}); }}
          >
            Перейти к интервью
          </button>
          <button
            className="fc-btn fc-btn--ghost"
            onClick={() => { onComplete(); emit('RESET_JOURNEY', {}); }}
          >
            Выбрать новую профессию
          </button>
        </div>
      </div>
    </div>
  );
}
