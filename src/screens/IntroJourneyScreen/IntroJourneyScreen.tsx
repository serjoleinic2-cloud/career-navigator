import React, { useState, useEffect, useCallback } from 'react';
import './IntroJourneyScreen.css';

interface IntroJourneyScreenProps {
  onComplete: () => void;
}

export const IntroJourneyScreen: React.FC<IntroJourneyScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setPhase(1), 1500));   // "Your journey begins"
    timers.push(setTimeout(() => setPhase(2), 3000));   // "Software Engineer"
    timers.push(setTimeout(() => setPhase(3), 4500));   // "38 Skills, 142 Missions, 1 Career"
    timers.push(setTimeout(() => setPhase(4), 6000));   // Map appears
    timers.push(setTimeout(() => setPhase(5), 8000));   // Islands visible
    timers.push(setTimeout(() => setPhase(6), 10000));  // Resume glows
    timers.push(setTimeout(() => setPhase(7), 12000));  // "Your first destination"
    timers.push(setTimeout(() => setCanSkip(true), 3000)); // Can skip after 3s

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleBegin = useCallback(() => {
    setPhase(8); // Camera zoom to Resume
    setTimeout(onComplete, 1500);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    if (canSkip) {
      setPhase(8);
      setTimeout(onComplete, 500);
    }
  }, [canSkip, onComplete]);

  return (
    <div className="intro-screen" onClick={handleSkip}>
      {/* Phase 0: Dark screen, light appears */}
      <div className={`intro-light ${phase >= 0 ? 'visible' : ''}`} />

      {/* Phase 1: Title */}
      <div className={`intro-text intro-title ${phase >= 1 ? 'visible' : ''}`}>
        Your journey begins.
      </div>

      {/* Phase 2: Profession */}
      <div className={`intro-text intro-profession ${phase >= 2 ? 'visible' : ''}`}>
        Software Engineer
      </div>

      {/* Phase 3: Stats */}
      <div className={`intro-stats ${phase >= 3 ? 'visible' : ''}`}>
        <div className="stat-item">
          <span className="stat-number">38</span>
          <span className="stat-label">Skills</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">142</span>
          <span className="stat-label">Missions</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">1</span>
          <span className="stat-label">Career</span>
        </div>
      </div>

      {/* Phase 4-7: Map with islands */}
      <div className={`intro-map ${phase >= 4 ? 'visible' : ''}`}>
        <div className="map-container">
          {/* Resume Island */}
          <div className={`island resume-island ${phase >= 6 ? 'glowing' : ''} ${phase >= 8 ? 'zoomed' : ''}`}>
            <div className="island-body">
              <span className="island-icon">📄</span>
              <span className="island-name">Resume</span>
            </div>
          </div>

          {/* Path line */}
          <div className="path-line" />

          {/* LinkedIn Island */}
          <div className="island linkedin-island">
            <div className="island-body">
              <span className="island-icon">💼</span>
              <span className="island-name">LinkedIn</span>
            </div>
          </div>

          <div className="path-line" />

          {/* Applications Island */}
          <div className="island applications-island">
            <div className="island-body">
              <span className="island-icon">📨</span>
              <span className="island-name">Applications</span>
            </div>
          </div>

          <div className="path-line" />

          {/* Interview Island */}
          <div className="island interview-island">
            <div className="island-body">
              <span className="island-icon">🎤</span>
              <span className="island-name">Interview</span>
            </div>
          </div>

          <div className="path-line" />

          {/* Offer Island */}
          <div className="island offer-island">
            <div className="island-body">
              <span className="island-icon">🏆</span>
              <span className="island-name">Offer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 7: Destination label + Begin button */}
      <div className={`intro-destination ${phase >= 7 ? 'visible' : ''}`}>
        <div className="destination-label">Your first destination</div>
        <div className="destination-name">Resume</div>
        <button className="intro-begin-btn" onClick={(e) => { e.stopPropagation(); handleBegin(); }}>
          Begin
        </button>
      </div>

      {/* Skip hint */}
      {canSkip && phase < 7 && (
        <div className="skip-hint">Tap to skip</div>
      )}
    </div>
  );
};
