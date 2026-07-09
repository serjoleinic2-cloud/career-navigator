import { useMemo } from 'react';
import { emit } from '@/core/events/system_event_bus';
import { getSessionsByProfession } from '@/core/interview/interview_store';
import { Icon } from '@/components/Icon/Icon';
import './InterviewResultsScreen.css';

interface ResultsScreenProps {
  professionId: string;
  onRetry: () => void;
  onComplete: () => void;
}

interface Metric {
  key: string;
  label: string;
  score: number;
  recommendation: string;
  playbookSection?: string;
}

function pct(value: number): number {
  return Math.round(value * 100);
}

function stars(score: number) {
  const filled = Math.round(score / 20);
  return (
    <>
      {Array.from({ length: filled }, (_, i) => (
        <Icon key={`f-${i}`} name="star" size={12} />
      ))}
      {Array.from({ length: 5 - filled }, (_, i) => (
        <Icon key={`e-${i}`} name="star" size={12} color="rgba(255,255,255,0.15)" />
      ))}
    </>
  );
}

function computeMetrics(professionId: string): { metrics: Metric[]; overall: Metric } {
  const sessions = getSessionsByProfession(professionId);
  const results = sessions.flatMap(s => s.results);
  const count = results.length || 1;

  const avgStructure = results.filter(r => r.selfAssessment.structure).length / count;
  const avgClarity = results.filter(r => r.selfAssessment.clearConclusion).length / count;
  const avgConfidence = results.filter(r => r.selfAssessment.confidence).length / count;
  const avgNoFillers = results.filter(r => r.selfAssessment.noFillers).length / count;
  const avgNoPauses = results.filter(r => r.selfAssessment.noPauses).length / count;

  const allScores = [avgClarity, avgStructure, avgConfidence, avgNoFillers, avgNoPauses];
  const overallScore = allScores.reduce((a, b) => a + b, 0) / allScores.length;

  const metrics: Metric[] = [
    {
      key: 'structure',
      label: 'Structure',
      score: pct(avgStructure),
      recommendation: avgStructure >= 0.8
        ? 'Great structure! Keep using STAR format.'
        : avgStructure >= 0.6
        ? 'Use STAR format. Review Playbook → Communication'
        : avgStructure >= 0.4
        ? 'Practice STAR format. Review Playbook → Communication'
        : 'Needs significant improvement. 3+ sessions recommended.',
      playbookSection: avgStructure < 0.8 ? 'Communication' : undefined,
    },
    {
      key: 'clarity',
      label: 'Clarity',
      score: pct(avgClarity),
      recommendation: avgClarity >= 0.8
        ? 'Clear and concise. Great job!'
        : avgClarity >= 0.6
        ? 'Slow down, avoid jargon. Review Playbook → Communication'
        : avgClarity >= 0.4
        ? 'Focus on clear messaging. Review Playbook → Communication'
        : 'Work on clarity. 3+ sessions recommended.',
      playbookSection: avgClarity < 0.8 ? 'Communication' : undefined,
    },
    {
      key: 'confidence',
      label: 'Confidence',
      score: pct(avgConfidence),
      recommendation: avgConfidence >= 0.8
        ? 'Great! Maintain eye contact for bonus.'
        : avgConfidence >= 0.6
        ? 'Build confidence with more practice. Review Playbook → Confidence'
        : avgConfidence >= 0.4
        ? 'Work on confident delivery. Review Playbook → Confidence'
        : 'Needs work. 3+ sessions recommended.',
      playbookSection: avgConfidence < 0.8 ? 'Confidence' : undefined,
    },
    {
      key: 'noFillers',
      label: 'No Fillers',
      score: pct(avgNoFillers),
      recommendation: avgNoFillers >= 0.8
        ? 'Minimal filler words. Excellent!'
        : avgNoFillers >= 0.6
        ? 'Practice pausing instead of "um". Review Playbook → Communication'
        : avgNoFillers >= 0.4
        ? 'Reduce filler words. Review Playbook → Communication'
        : 'Heavy filler word use. 3+ sessions recommended.',
      playbookSection: avgNoFillers < 0.8 ? 'Communication' : undefined,
    },
    {
      key: 'noPauses',
      label: 'No Long Pauses',
      score: pct(avgNoPauses),
      recommendation: avgNoPauses >= 0.8
        ? 'Great pacing!'
        : avgNoPauses >= 0.6
        ? 'Use silence as emphasis. Review Playbook → Interview Psychology'
        : avgNoPauses >= 0.4
        ? 'Practice smoother transitions. Review Playbook → Interview Psychology'
        : 'Long pauses need work. 3+ sessions recommended.',
      playbookSection: avgNoPauses < 0.8 ? 'Interview Psychology' : undefined,
    },
  ];

  const lowest = metrics.reduce((a, b) => a.score < b.score ? a : b, metrics[0]);
  const lowestTwo = [...metrics].sort((a, b) => a.score - b.score).slice(0, 2);

  let overallRec: string;
  if (overallScore > 0.8) {
    overallRec = 'Ready for real interview!';
  } else if (overallScore >= 0.6) {
    overallRec = `Focus on ${lowest.label}. 3 sessions recommended.`;
  } else {
    overallRec = `Focus on ${lowestTwo.map(m => m.label).join(' and ')}. 3+ sessions recommended.`;
  }

  const overall: Metric = {
    key: 'overall',
    label: 'Overall',
    score: pct(overallScore),
    recommendation: overallRec,
  };

  return { metrics, overall };
}

function getColor(score: number): string {
  if (score >= 80) return '#00e5e0';
  if (score >= 60) return '#f5b25c';
  if (score >= 40) return '#e84393';
  return '#FF6B6B';
}

export function ResultsScreen({ professionId, onRetry, onComplete }: ResultsScreenProps) {
  const sessions = getSessionsByProfession(professionId);
  const { metrics, overall } = useMemo(() => computeMetrics(professionId), [professionId]);
  const totalQuestions = sessions.reduce((sum, s) => sum + s.results.length, 0);

  return (
    <div className="interview-results-overlay">
      <div className="interview-results-bg" />

      <div className="interview-results-header">
        <span className="interview-results-title">Session Results</span>
        <span className="interview-results-subtitle">{totalQuestions} questions across {sessions.length} session{sessions.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="interview-results-scroll">
        <div className="interview-results-list">
          {metrics.map(m => (
            <div key={m.key} className="ir-card" style={{ '--ir-accent': getColor(m.score) } as React.CSSProperties}>
              <div className="ir-card-accent" />
              <div className="ir-card-body">
                <div className="ir-card-top">
                  <span className="ir-card-label">{m.label}</span>
                  <span className="ir-card-score">{m.score}%</span>
                </div>
                <div className="ir-card-stars">{stars(m.score)}</div>
                <p className="ir-card-rec">{m.recommendation}</p>
                {m.playbookSection && (
                  <button
                    className="ir-card-link"
                    onClick={() => emit('OPEN_PLAYBOOK', { category: m.playbookSection!.toLowerCase() })}
                  >
                    <Icon name="book" size={14} /> Review Playbook →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="ir-card ir-card-overall">
          <div className="ir-card-accent" />
          <div className="ir-card-body">
            <div className="ir-card-top">
              <span className="ir-card-label">Overall</span>
              <span className="ir-card-score">{overall.score}%</span>
            </div>
            <div className="ir-card-stars">{stars(overall.score)}</div>
            <p className="ir-card-rec">{overall.recommendation}</p>
          </div>
        </div>

        <div className="interview-results-hint">
          {overall.score >= 80
            ? <><Icon name="party" size={18} /> Excellent performance! You are ready for real interviews.</>
            : overall.score >= 60
            ? '💪 Good progress! A few more sessions will boost your readiness.'
            : <><Icon name="chart" size={18} /> Keep practicing! Consistent sessions build real confidence.</>}
        </div>

        <div className="interview-results-actions">
          <button className="ir-btn ir-btn-primary" onClick={onRetry}>
            TRY AGAIN
          </button>
          <button className="ir-btn ir-btn-ghost" onClick={onComplete}>
            RETURN TO JOURNEY
          </button>
        </div>
      </div>
    </div>
  );
}
