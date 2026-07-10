import { Icon } from '@/components/Icon/Icon';
import {
  PRIVACY_POLICY_SECTIONS,
  PRIVACY_POLICY_EFFECTIVE_DATE,
  PRIVACY_POLICY_LAST_UPDATED,
  PRIVACY_POLICY_CLOSING,
} from '@/content/legal_content';
import './PrivacyPolicyScreen.css';

interface PrivacyPolicyScreenProps {
  onClose: () => void;
}

export function PrivacyPolicyScreen({ onClose }: PrivacyPolicyScreenProps) {
  return (
    <div className="privacy-policy-screen">
      <div className="privacy-policy-header">
        <button className="privacy-policy-close-btn" onClick={onClose} aria-label="Close Privacy Policy">
          <Icon name="close" size={16} />
        </button>
        <h2 className="privacy-policy-title">Privacy Policy</h2>
      </div>

      <div className="privacy-policy-scroll">
        <p className="privacy-policy-meta">Effective Date: {PRIVACY_POLICY_EFFECTIVE_DATE}</p>
        <p className="privacy-policy-meta">Last Updated: {PRIVACY_POLICY_LAST_UPDATED}</p>

        {PRIVACY_POLICY_SECTIONS.map(section => (
          <section key={section.heading} className="privacy-policy-section">
            <h3 className="privacy-policy-heading">{section.heading}</h3>
            {section.body?.map((line, i) => (
              <p key={i} className="privacy-policy-body">{line}</p>
            ))}
            {section.bullets && (
              <ul className="privacy-policy-bullets">
                {section.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
            {section.table && (
              <div className="privacy-policy-table">
                <div className="privacy-policy-table-row privacy-policy-table-head">
                  <span>Data Type</span>
                  <span>Purpose</span>
                  <span>Storage</span>
                </div>
                {section.table.rows.map((row, i) => (
                  <div key={i} className="privacy-policy-table-row">
                    <span>{row[0]}</span>
                    <span>{row[1]}</span>
                    <span>{row[2]}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        <p className="privacy-policy-closing">{PRIVACY_POLICY_CLOSING}</p>
      </div>

      <button className="privacy-policy-back" onClick={onClose}>← Back</button>
    </div>
  );
}
