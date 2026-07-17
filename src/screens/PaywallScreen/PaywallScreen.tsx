import { useState } from 'react';
import { Icon } from '@/components/Icon/Icon';
import { getProfession } from '@/professions/profession_registry';
import {
  buyProfession,
  buyAllProfessionsBundle,
  getDisplayPrice,
} from '@/core/premium/billing_service';
import {
  BUNDLE_PRODUCT_ID,
  getProductIdForProfession,
  getBundleSavingsUsd,
} from '@/core/premium/billing_products';
import './PaywallScreen.css';

interface PaywallScreenProps {
  professionId: string;
  onClose: () => void;
  /** Вызывается после успешной покупки (approved) — экран сам не знает,
   * когда billing подтвердит покупку, поэтому просто закрывается; UI
   * обновится сам через событие STATE_UPDATED, эмитимое billing_service. */
  onPurchased?: () => void;
}

export function PaywallScreen({ professionId, onClose, onPurchased }: PaywallScreenProps) {
  const [busy, setBusy] = useState<'single' | 'bundle' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const profession = getProfession(professionId);
  const professionTitle = profession?.title ?? 'this profession';
  const singleProductId = getProductIdForProfession(professionId);

  const handleBuySingle = async () => {
    setError(null);
    setBusy('single');
    try {
      const result = await buyProfession(professionId);
      if (!result.ok) {
        setError(result.error ?? 'Purchase failed.');
      } else {
        onPurchased?.();
      }
    } finally {
      setBusy(null);
    }
  };

  const handleBuyBundle = async () => {
    setError(null);
    setBusy('bundle');
    try {
      const result = await buyAllProfessionsBundle();
      if (!result.ok) {
        setError(result.error ?? 'Purchase failed.');
      } else {
        onPurchased?.();
      }
    } finally {
      setBusy(null);
    }
  };

  const savings = getBundleSavingsUsd();

  return (
    <div className="paywall-screen">
      <div className="paywall-header">
        <button className="paywall-close-btn" onClick={onClose} aria-label="Close">
          <Icon name="close" size={16} />
        </button>
      </div>

      <div className="paywall-scroll">
        <div className="paywall-hero">
          <Icon name="star" size={32} color="#FFD060" />
          <h2 className="paywall-title">Continue your {professionTitle} journey</h2>
          <p className="paywall-subtitle">
            You've completed the free chapters. Unlock the rest of this profession —
            or get all 5 professions for less per profession.
          </p>
        </div>

        <div className="paywall-options">
          <div className="paywall-card">
            <div className="paywall-card-header">
              <span className="paywall-card-title">{professionTitle}</span>
              <span className="paywall-card-price">
                {singleProductId ? getDisplayPrice(singleProductId) : '$9.99'}
              </span>
            </div>
            <p className="paywall-card-desc">
              Unlock every chapter, mission, and Playbook page for this profession.
            </p>
            <button
              className="paywall-buy-btn"
              onClick={handleBuySingle}
              disabled={busy !== null}
            >
              {busy === 'single' ? 'Processing…' : `Unlock ${professionTitle}`}
            </button>
          </div>

          <div className="paywall-card paywall-card--featured">
            <div className="paywall-badge">Best value — save ${savings.toFixed(2)}</div>
            <div className="paywall-card-header">
              <span className="paywall-card-title">All 5 professions</span>
              <span className="paywall-card-price">{getDisplayPrice(BUNDLE_PRODUCT_ID)}</span>
            </div>
            <p className="paywall-card-desc">
              Just $4.99 per profession. Unlock Software Engineer, Data Analyst,
              Cybersecurity, AI/ML Engineer, and Product Manager — all of them, forever.
            </p>
            <button
              className="paywall-buy-btn paywall-buy-btn--featured"
              onClick={handleBuyBundle}
              disabled={busy !== null}
            >
              {busy === 'bundle' ? 'Processing…' : 'Unlock all 5 professions'}
            </button>
          </div>
        </div>

        {error && <p className="paywall-error">{error}</p>}

        <p className="paywall-footnote">
          One-time purchase, not a subscription. Prices shown in your local currency
          via Google Play once available. Already purchased on another device? Restore
          your purchases from Settings.
        </p>
      </div>
    </div>
  );
}
