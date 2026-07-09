import { useState, useCallback, useRef } from 'react';
import type { CSSProperties } from 'react';
import { toPng } from 'html-to-image';
import { getState } from '@/core/runtime/runtime_store';
import { getUIState } from '@/core/ui_bridge/ui_bridge';
import { mapToShareModel } from '@/core/share/share_mapper';
import { copyText, nativeShare, shareImage } from '@/core/share/share_service';
import { exportJSON, exportCSV } from '@/core/export/export_service';
import type { ShareModel } from '@/core/share/share_model';
import { Icon } from '@/components/Icon/Icon';
import './ShareScreen.css';

export function ShareScreen({ style, onClose }: { style?: CSSProperties; onClose?: () => void }) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const runtime = getState();
  const ui = getUIState();
  const model: ShareModel = mapToShareModel(runtime, ui);

  const handleCopyText = useCallback(async () => {
    const text = buildShareText(model);
    await copyText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [model]);

  const handleShareImage = useCallback(async () => {
    const card = cardRef.current;
    if (!card) return;

    try {
      const dataUrl = await toPng(card, {
        pixelRatio: 2,
        width: 1080,
        height: 1080,
      });
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      if ('share' in navigator) {
        await nativeShare(buildShareText(model), blob);
      } else {
        shareImage(blob);
      }
    } catch {
      // fail silently
    }
  }, [model]);

  const handleExportJSON = useCallback(() => {
    exportJSON();
  }, []);

  const handleExportCSV = useCallback(() => {
    exportCSV();
  }, []);

  return (
    <div className="share-screen" style={style}>
      {onClose && <button className="share-close-btn" onClick={onClose} aria-label="Close"><Icon name="close" size={16} /></button>}
      {/* Share Card for display and export */}
      <div className="share-card-container" ref={cardRef}>
        <div
          className="share-card-bg"
          style={{
            background: `linear-gradient(160deg, ${model.themeColor}15 0%, ${model.themeColor}08 50%, #071320 100%)`,
          }}
        >
          {/* Emblem */}
          <div className="share-emblem">
            <div
              className="share-emblem-ring"
              style={{ borderColor: model.themeColor }}
            />
            <span className="share-emblem-icon"><Icon name="map" /></span>
          </div>

          <div className="share-profession-label">{model.profession}</div>
          <h1 className="share-heading">Journey</h1>

          <div className="share-stats">
            <div className="share-stat">
              <span className="share-stat-value">{model.readinessScore}%</span>
              <span className="share-stat-label">Readiness</span>
            </div>
            <div className="share-stat-divider" />
            <div className="share-stat">
              <span className="share-stat-value">{model.confidenceScore}%</span>
              <span className="share-stat-label">Confidence</span>
            </div>
          </div>

          <div className="share-skills">
            Skills Mastered: <strong>{model.completedSkills}</strong> / {model.totalSkills}
          </div>

          <div
            className="share-chapter-badge"
            style={{
              background: `${model.themeColor}22`,
              borderColor: `${model.themeColor}44`,
              color: model.themeColor,
            }}
          >
            Current Chapter: {model.currentChapter}
          </div>

          <div className="share-quote">"{model.quote}"</div>

          <div className="share-brand">Career Navigator</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="share-actions">
        <button className="share-action-btn primary" onClick={handleShareImage}>
          🖼 Share Image
        </button>
        <button className="share-action-btn" onClick={handleCopyText}>
          {copied ? <><Icon name="check" /> Copied!</> : <><Icon name="resume" /> Copy Text</>}
        </button>
        <button className="share-action-btn" onClick={handleExportJSON}>
          <Icon name="resume" /> Export JSON
        </button>
        <button className="share-action-btn" onClick={handleExportCSV}>
          <Icon name="chart" /> Export CSV
        </button>
      </div>

      {onClose && <button className="share-back-btn" onClick={onClose}>← Назад</button>}
    </div>
  );
}

function buildShareText(model: ShareModel): string {
  return [
    `🧭 Career Navigator`,
    `${model.profession}`,
    `Readiness: ${model.readinessScore}%`,
    `Confidence: ${model.confidenceScore}%`,
    `Skills: ${model.completedSkills}/${model.totalSkills}`,
    `Chapter: ${model.currentChapter}`,
    ``,
    `"${model.quote}"`,
  ].join('\n');
}
