import { Icon } from '@/components/Icon/Icon';
import { emit } from '@/core/events/system_event_bus';
import { FinalParticles } from '../components/Particles';
import { getProfession } from '@/professions/profession_registry';

interface HeroPhaseProps {
  professionId: string;
  heroLoaded: boolean;
  heroError: boolean;
  onComplete: () => void;
  /** Called when user chooses "Choose New Profession" — signals JourneyHUD
   * to exitReview() and tear down reviewMode before the journey resets,
   * so the next journey starts from a clean phase='active' state. */
  onReset: () => void;
  onHeroLoad: () => void;
  onHeroError: () => void;
}

export function HeroPhase({ professionId, heroLoaded, heroError, onComplete, onReset, onHeroLoad, onHeroError }: HeroPhaseProps) {
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
              // BUGFIX (2026-07-16): this used to call restartFromChapter('resume'),
              // which wipes ALL chapters back to 'locked' — 'resume' is chapters[0]
              // in CHAPTER_ORDER (chapters.ts), so restartFromChapter('resume')
              // resets the entire journey to 0%, duplicating "Choose New Profession"
              // below but without letting the user pick a new profession first.
              // What this button is actually meant to do (per the label and the
              // product intent — revisit finished chapters, see what wasn't done
              // well) is already implemented as reviewMode: onComplete() calls
              // finishCinematic(), which sets phase='complete' and reviewMode=true,
              // letting the user browse back through already-completed chapters
              // via the Back/Next nav in JourneyHUD — with zero progress lost.
              onComplete();
            }}
          >
            Review Journey
          </button>
          <button
            className="fc-btn fc-btn--ghost"
            onClick={() => {
              // Full reset: exitReview() first so phase/reviewMode are clean,
              // then RESET_JOURNEY tears down the runtime and returns to onboarding.
              onReset();
              emit('RESET_JOURNEY', {});
            }}
          >
            Choose New Profession
          </button>
        </div>
      </div>
    </div>
  );
}
