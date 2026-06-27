import { useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { getState } from '@/core/runtime/runtime_store';
import { getUIState } from '@/core/ui_bridge/ui_bridge';
import { mapToShareModel } from '@/core/share/share_mapper';
import { shareText, copyText, nativeShare, shareImage } from '@/core/share/share_service';
import { exportJSON, exportCSV } from '@/core/export/export_service';
import { ShareCard } from '@/components/ShareCard/ShareCard';
import './ShareScreen.css';

export function ShareScreen({ onBack }: { onBack: () => void }) {
  const [options, setOptions] = useState({
    hideScores: false,
    hideProfession: false,
    hideProgress: false,
    hideQuote: false,
  });
  const [copied, setCopied] = useState(false);

  const runtime = getState();
  const ui = getUIState();
  const model = mapToShareModel(runtime, ui);

  const handleCopyText = useCallback(async () => {
    const text = shareText(model, options);
    await copyText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [model, options]);

  const handleShareImage = useCallback(async () => {
    const card = document.querySelector('.share-card') as HTMLElement;
    if (!card) return;

    try {
      const dataUrl = await toPng(card, { pixelRatio: 2 });
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      if ('share' in navigator) {
        await nativeShare(shareText(model, options), blob);
      } else {
        shareImage(blob);
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  }, [model, options]);

  const handleExportJSON = useCallback(() => {
    exportJSON();
  }, []);

  const handleExportCSV = useCallback(() => {
    exportCSV();
  }, []);

  return (
    <div className="share-screen">
      <button className="back-button" onClick={onBack}>← Back to Journey</button>
      <h1>Share Progress</h1>

      <div className="share-card-wrapper">
        <ShareCard model={model} options={options} />
      </div>

      <div className="privacy-options">
        <h3>Privacy Options</h3>
        {Object.entries(options).map(([key, value]) => (
          <label key={key} className="privacy-option">
            <input
              type="checkbox"
              checked={value}
              onChange={e => setOptions(prev => ({ ...prev, [key]: e.target.checked }))}
            />
            {key.replace('hide', 'Hide ').replace(/([A-Z])/g, ' $1')}
          </label>
        ))}
      </div>

      <div className="share-actions">
        <button onClick={handleCopyText}>
          {copied ? '✓ Copied!' : '📋 Copy Text'}
        </button>
        <button onClick={handleShareImage}>
          🖼 Share Image
        </button>
        <button onClick={handleExportJSON}>
          📄 Export JSON
        </button>
        <button onClick={handleExportCSV}>
          📊 Export CSV
        </button>
      </div>
    </div>
  );
}
