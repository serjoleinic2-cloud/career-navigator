import { useState } from 'react';
import { GlassCard } from '@/components/layout/GlassCard';
import './CollapsibleSidebar.css';

interface CollapsibleSidebarProps {
  advice: Record<string, string>;
  signals: string[];
  nodeId: string;
}

type SectionKey = 'advice' | 'signals' | 'notes';

export function CollapsibleSidebar({ advice, signals }: CollapsibleSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    advice: false,
    signals: false,
    notes: false,
  });

  const toggle = (key: SectionKey) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="collapsible-sidebar">
      {/* Advice */}
      <GlassCard className="sidebar-section">
        <button className="sidebar-toggle" onClick={() => toggle('advice')}>
          <span>Advice</span>
          <span className="sidebar-arrow">{openSections.advice ? '▼' : '▶'}</span>
        </button>
        {openSections.advice && (
          <div className="sidebar-content">
            {Object.entries(advice).map(([key, text]) => (
              text ? (
                <div key={key} className="sidebar-advice-item">
                  <strong className="sidebar-advice-key">{key}</strong>
                  <p className="sidebar-advice-text">{text}</p>
                </div>
              ) : null
            ))}
          </div>
        )}
      </GlassCard>

      {/* Signals */}
      <GlassCard className="sidebar-section">
        <button className="sidebar-toggle" onClick={() => toggle('signals')}>
          <span>Signals (Mastery Criteria)</span>
          <span className="sidebar-arrow">{openSections.signals ? '▼' : '▶'}</span>
        </button>
        {openSections.signals && (
          <div className="sidebar-content">
            <ul className="sidebar-signals-list">
              {signals.map((signal, i) => (
                <li key={i} className="sidebar-signal-item">{signal}</li>
              ))}
            </ul>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
