import './GapAnalysisScreen.css';

interface Props {
  chapterTitle: string;
  userScore: number;
  systemScore: number;
  gaps: string[];
  onContinue: () => void;
}

export function GapAnalysisScreen({ chapterTitle, userScore, systemScore, gaps, onContinue }: Props) {
  const diff = userScore - systemScore;
  const overconfident = diff > 2;
  const underconfident = diff < -2;
  const aligned = !overconfident && !underconfident;

  return (
    <div className="gap-screen">
      <div className="gap-header">
        <h2>{chapterTitle}</h2>
        <p className="gap-subtitle">Chapter Complete — Self Assessment</p>
      </div>

      <div className="gap-scores">
        <div className="gap-score-card user">
          <span className="gap-score-label">Your score</span>
          <span className="gap-score-value">{userScore}<span className="gap-score-max">/10</span></span>
        </div>
        <div className="gap-divider">vs</div>
        <div className="gap-score-card system">
          <span className="gap-score-label">System score</span>
          <span className="gap-score-value">{systemScore}<span className="gap-score-max">/10</span></span>
        </div>
      </div>

      <div className={`gap-verdict ${overconfident ? 'over' : underconfident ? 'under' : 'aligned'}`}>
        {overconfident && (
          <>
            <h3>You may be overestimating</h3>
            <p>Your self-assessment is significantly higher than your activity suggests. This can lead to under-preparation before interviews.</p>
          </>
        )}
        {underconfident && (
          <>
            <h3>You may be underestimating yourself</h3>
            <p>Your completed work shows more readiness than your self-score suggests. Confidence is part of interview performance.</p>
          </>
        )}
        {aligned && (
          <>
            <h3>Good self-awareness</h3>
            <p>Your self-assessment aligns well with your actual progress. This calibration is a strong signal of interview readiness.</p>
          </>
        )}
      </div>

      {gaps.length > 0 && (
        <div className="gap-list">
          <h4>Possible blind spots</h4>
          {gaps.map((gap, i) => (
            <div key={i} className="gap-item">
              <span className="gap-icon">⚠</span>
              <span>{gap}</span>
            </div>
          ))}
        </div>
      )}

      <button className="gap-continue-btn" onClick={onContinue}>
        Continue Journey →
      </button>
    </div>
  );
}
