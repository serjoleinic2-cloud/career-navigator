import { useRef } from 'react';
import type { ShareModel } from '@/core/share/share_model';
import './ShareCard.css';

interface ShareCardProps {
  model: ShareModel;
  options?: { hideScores?: boolean; hideProfession?: boolean; hideProgress?: boolean; hideQuote?: boolean };
}

export function ShareCard({ model, options }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="share-card"
      style={{
        background: `linear-gradient(135deg, ${model.themeColor}22 0%, ${model.themeColor}44 100%)`,
        borderColor: model.themeColor,
      }}
    >
      {!options?.hideProfession && (
        <div className="share-profession">{model.profession}</div>
      )}

      {!options?.hideProgress && (
        <div className="share-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(model.completedSkills / model.totalSkills) * 100}%`,
                background: model.themeColor,
              }}
            />
          </div>
          <span>{model.completedSkills}/{model.totalSkills} skills</span>
        </div>
      )}

      {!options?.hideScores && (
        <div className="share-scores">
          <div className="score">
            <span className="score-label">Readiness</span>
            <span className="score-value">{model.readinessScore}%</span>
          </div>
          <div className="score">
            <span className="score-label">Confidence</span>
            <span className="score-value">{model.confidenceScore}%</span>
          </div>
        </div>
      )}

      <div className="share-chapter">{model.currentChapter}</div>

      {!options?.hideQuote && (
        <div className="share-quote">"{model.quote}"</div>
      )}

      <div className="share-brand">Career Navigator</div>
    </div>
  );
}
