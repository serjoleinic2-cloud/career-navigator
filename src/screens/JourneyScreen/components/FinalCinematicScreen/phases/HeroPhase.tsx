import { Icon } from '@/components/Icon/Icon';
import { emit } from '@/core/events/system_event_bus';
import { setActiveChapter } from '@/core/runtime/runtime_controller';
import { FinalParticles } from '../components/Particles';
import { getProfession } from '@/professions/profession_registry';

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
  // BUGFIX (2026-07-13): title was hardcoded as "Software Engineer" here,
  // so the final "Journey Complete" screen showed the wrong profession name
  // for every other profession (e.g. Data Analyst). Read the real title
  // from the registered profession module instead.
  const professionTitle = getProfession(professionId)?.title || professionId;

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
        <h1 className="fc-hero-title">{professionTitle}</h1>

        <div className="fc-hero-actions">
          <button
            className="fc-btn fc-btn--primary"
            onClick={() => { onComplete(); emit('START_INTERVIEW_TRAINER', {}); }}
          >
            Go to Interview
          </button>
          <button
            className="fc-btn fc-btn--ghost"
            onClick={() => {
              setActiveChapter('resume');
              onComplete();
            }}
          >
            Restart Journey
          </button>
          <button
            className="fc-btn fc-btn--ghost"
            onClick={() => { onComplete(); emit('RESET_JOURNEY', {}); }}
          >
            Choose New Profession
          </button>
        </div>
      </div>
    </div>
  );
}
