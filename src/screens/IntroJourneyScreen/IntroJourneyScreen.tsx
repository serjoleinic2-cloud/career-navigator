import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useWorldCssStyle } from '@/core/world/useWorldCssStyle';
import { Icon } from '@/components/Icon/Icon';
import type { IconName } from '@/components/Icon/Icon';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getProfession } from '@/professions/profession_registry';
import './IntroJourneyScreen.css';

interface IntroJourneyScreenProps {
  onComplete: () => void;
}

// Fallback icon per chapter id when a chapter's own icon isn't known.
// Kept intentionally small/generic — this is just for the intro animation,
// not the source of truth for chapter art (see Chapter.artFilename for that).
const CHAPTER_ICON: Record<string, IconName> = {
  resume: 'resume',
  linkedin: 'linkedin',
  applications: 'applications',
  interviews: 'interviews',
  interview_prep: 'interviews',
  interview_practice: 'interviews',
  offer_preparation: 'target',
  offer_prep: 'target',
  offer: 'trophy',
};

export const IntroJourneyScreen: React.FC<IntroJourneyScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [canSkip, setCanSkip] = useState(false);
  const worldStyle = useWorldCssStyle();

  // BUGFIX (2026-07-13): this screen used to hardcode "Software Engineer",
  // the skill/mission counts, and a fixed 5-island list — so every profession's
  // very first animation showed Software Engineer's name and numbers
  // regardless of what was actually selected during onboarding. Now it reads
  // the active profession from runtime and its registered module.
  const professionId = getRuntimeState()?.professionId || 'software_engineer';
  const profession = getProfession(professionId);

  const professionTitle = profession?.title || 'SkillTrue';
  const skillCount = profession?.skillGraph.length ?? 0;
  const missionCount = useMemo(
    () => profession?.skillGraph.reduce((sum, node) => sum + (node.tasks?.length || 0), 0) ?? 0,
    [profession]
  );
  const chapters = profession?.chapters || [];
  const firstChapter = chapters[0];

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setPhase(1), 1500));   // "Your journey begins"
    timers.push(setTimeout(() => setPhase(2), 3000));   // Profession name
    timers.push(setTimeout(() => setPhase(3), 4500));   // Stats
    timers.push(setTimeout(() => setPhase(4), 6000));   // Map appears
    timers.push(setTimeout(() => setPhase(5), 8000));   // Islands visible
    timers.push(setTimeout(() => setPhase(6), 10000));  // First island glows
    timers.push(setTimeout(() => setPhase(7), 12000));  // "Your first destination"
    timers.push(setTimeout(() => setCanSkip(true), 3000)); // Can skip after 3s

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleBegin = useCallback(() => {
    setPhase(8); // Camera zoom to first island, overlay fades out (WorldRenderer stays mounted beneath)
    setTimeout(onComplete, 1500);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    if (canSkip) {
      setPhase(8);
      setTimeout(onComplete, 500);
    }
  }, [canSkip, onComplete]);

  return (
    <div className="intro-screen" style={worldStyle} onClick={handleSkip}>
      <div className={`intro-overlay-content ${phase >= 8 ? 'leaving' : ''}`}>
      {/* Ambient sky: parting clouds + floating particles — always present, reacts to phase */}
      <div className="intro-sky">
        <div className={`intro-cloud intro-cloud--left ${phase >= 4 ? 'parted' : ''}`} />
        <div className={`intro-cloud intro-cloud--right ${phase >= 4 ? 'parted' : ''}`} />
        <div className="intro-particles">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="intro-particle"
              style={{
                left: `${(i * 37) % 100}%`,
                animationDelay: `${(i * 0.6) % 6}s`,
                animationDuration: `${6 + (i % 5)}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Phase 0: Dark screen, light appears */}
      <div className={`intro-light ${phase >= 0 ? 'visible' : ''}`} />

      {/* Phase 1: Title — visible only before the map takes over */}
      <div className={`intro-text intro-title ${phase >= 1 && phase < 4 ? 'visible' : ''}`}>
        Your journey begins.
      </div>

      {/* Phase 2: Profession */}
      <div className={`intro-text intro-profession ${phase >= 2 && phase < 4 ? 'visible' : ''}`}>
        {professionTitle}
      </div>

      {/* Phase 3: Stats — fade out as soon as the map starts appearing so the
          numbers never sit on top of the islands (was: stayed forever). */}
      <div className={`intro-stats ${phase >= 3 && phase < 4 ? 'visible' : ''}`}>
        <div className="stat-item">
          <span className="stat-number">{skillCount}</span>
          <span className="stat-label">Skills</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{missionCount}</span>
          <span className="stat-label">Missions</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">1</span>
          <span className="stat-label">Career</span>
        </div>
      </div>

      {/* Phase 4-7: Map with islands — camera "rises" into view */}
      <div className={`intro-map ${phase >= 4 ? 'visible' : ''} ${phase >= 5 ? 'camera-risen' : ''}`}>
        <div className="map-container">
          {chapters.map((chapter, index) => (
            <React.Fragment key={chapter.id}>
              {index === 0 ? (
                <div className={`island resume-island ${phase >= 5 ? 'revealed' : ''} ${phase >= 6 ? 'glowing' : ''} ${phase >= 8 ? 'zoomed' : ''}`}>
                  <div className="island-body">
                    <span className="island-icon"><Icon name={CHAPTER_ICON[chapter.id] || 'island'} /></span>
                    <span className="island-name">{chapter.title}</span>
                  </div>
                </div>
              ) : (
                <div className="island">
                  <div className="island-body">
                    <span className="island-icon"><Icon name={CHAPTER_ICON[chapter.id] || 'island'} /></span>
                    <span className="island-name">{chapter.title}</span>
                  </div>
                </div>
              )}
              {index < chapters.length - 1 && (
                <div className={`path-line ${index === 0 && phase >= 6 ? 'lit' : ''}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Phase 7: Destination label + Begin button */}
      <div className={`intro-destination ${phase >= 7 ? 'visible' : ''}`}>
        <div className="destination-label">Your first destination</div>
        <div className="destination-name">{firstChapter?.title || 'Resume'}</div>
        <button className="intro-begin-btn" onClick={(e) => { e.stopPropagation(); handleBegin(); }}>
          Begin your journey
        </button>
      </div>

      {/* Skip hint */}
      {canSkip && phase < 7 && (
        <div className="skip-hint">Tap to skip</div>
      )}
      </div>
    </div>
  );
};
