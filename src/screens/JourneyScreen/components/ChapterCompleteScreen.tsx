import { PrimaryButton } from '@/components/layout/PrimaryButton';
import { useWorldCssStyle } from '@/core/world/useWorldCssStyle';
import { useWorldConfettiColors } from '@/core/world/useWorldConfettiColors';

interface ChapterCompleteScreenProps {
  chapterId: string;
  chapterTitle: string;
  skillsCompleted: number;
  totalSkills: number;
  readinessDelta: number;
  confidenceDelta: number;
  onContinue: () => void;
}

export function ChapterCompleteScreen({
  chapterId,
  chapterTitle,
  skillsCompleted,
  totalSkills,
  readinessDelta,
  confidenceDelta,
  onContinue,
}: ChapterCompleteScreenProps) {
  const worldStyle = useWorldCssStyle(chapterId);
  const confettiColors = useWorldConfettiColors();

  return (
    <div className="chapter-complete-screen" style={worldStyle}>
      <div className="confetti-container">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="confetti-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              backgroundColor: confettiColors[i % confettiColors.length],
            }}
          />
        ))}
      </div>

      <div className="chapter-complete-light-rays">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="light-ray" style={{ transform: `rotate(${i * 45}deg)` }} />
        ))}
      </div>

      <div className="chapter-complete-content">
        <div className="chapter-complete-circle">
          <span className="chapter-complete-icon">🎉</span>
        </div>
        <h2 className="chapter-complete-heading">Chapter Complete</h2>
        <p className="chapter-complete-subtitle">{chapterTitle} Mastered</p>

        <div className="chapter-complete-stats">
          <div className="chapter-complete-stat">
            <span className="chapter-complete-stat-value">{skillsCompleted}/{totalSkills}</span>
            <span className="chapter-complete-stat-label">Skills completed</span>
          </div>
          <div className="chapter-complete-stat">
            <span className="chapter-complete-stat-value">+{readinessDelta}</span>
            <span className="chapter-complete-stat-label">Readiness</span>
          </div>
          <div className="chapter-complete-stat">
            <span className="chapter-complete-stat-value">+{confidenceDelta}</span>
            <span className="chapter-complete-stat-label">Confidence</span>
          </div>
        </div>

        <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
      </div>
    </div>
  );
}
