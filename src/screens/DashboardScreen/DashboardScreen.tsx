import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { Icon } from '@/components/Icon/Icon';
import './DashboardScreen.css';

export function DashboardScreen({ onBack }: { onBack: () => void }) {
  const runtime = getRuntimeState();

  const careerScore = runtime?.readinessScore ?? 0;
  const confidenceScore = runtime ? Math.round(runtime.confidenceScore * 100) : 0;

  const nodes = runtime ? Object.values(runtime.nodeStates) : [];
  const totalNodes = nodes.length;

  const getDomainScore = (domain: string): number => {
    const domainNodes = nodes.filter(n => {
      const d = typeof n.domain === 'string' ? n.domain.toLowerCase() : '';
      return d === domain.toLowerCase();
    });
    if (domainNodes.length === 0) return 0;
    const completed = domainNodes.filter(n => n.state === 'confidence' || n.state === 'execution').length;
    return Math.round((completed / domainNodes.length) * 100);
  };

  const nextActionNode = nodes.find(n => n.state !== 'confidence' && n.state !== 'locked' && n.state !== 'execution');
  const completedCount = nodes.filter(n => n.state === 'confidence' || n.state === 'execution').length;

  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (careerScore / 100) * circumference;

  return (
    <div className="dashboard-screen">
      <button className="back-button" onClick={onBack}>← Back to Journey</button>
      <h1>Dashboard</h1>

      {/* Career Score */}
      <div className="dashboard-card score-card">
        <h3>Career Score</h3>
        <div className="circular-progress">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <circle
              cx="70" cy="70" r="60"
              fill="none"
              stroke="#FF6B6B"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 70 70)"
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>
          <div className="score-center">
            <span className="score-number">{careerScore}%</span>
            <span className="score-label">Readiness</span>
          </div>
        </div>
      </div>

      {/* Sub-scores */}
      <div className="dashboard-card subscores-card">
        <h3>Sub-scores</h3>
        <div className="subscore-row">
          <span className="subscore-label">Resume</span>
          <div className="subscore-bar-bg">
            <div className="subscore-bar-fill resume-fill" style={{ width: `${getDomainScore('Resume')}%` }} />
          </div>
          <span className="subscore-value">{getDomainScore('Resume')}%</span>
        </div>
        <div className="subscore-row">
          <span className="subscore-label">LinkedIn</span>
          <div className="subscore-bar-bg">
            <div className="subscore-bar-fill linkedin-fill" style={{ width: `${getDomainScore('Linkedin')}%` }} />
          </div>
          <span className="subscore-value">{getDomainScore('Linkedin')}%</span>
        </div>
        <div className="subscore-row">
          <span className="subscore-label">Applications</span>
          <div className="subscore-bar-bg">
            <div className="subscore-bar-fill apps-fill" style={{ width: `${getDomainScore('Applications')}%` }} />
          </div>
          <span className="subscore-value">{getDomainScore('Applications')}%</span>
        </div>
        <div className="subscore-row">
          <span className="subscore-label">Interviews</span>
          <div className="subscore-bar-bg">
            <div className="subscore-bar-fill interview-fill" style={{ width: `${getDomainScore('Interviews')}%` }} />
          </div>
          <span className="subscore-value">{getDomainScore('Interviews')}%</span>
        </div>
        <div className="subscore-row">
          <span className="subscore-label">Offer</span>
          <div className="subscore-bar-bg">
            <div className="subscore-bar-fill offer-fill" style={{ width: `${getDomainScore('Offer')}%` }} />
          </div>
          <span className="subscore-value">{getDomainScore('Offer')}%</span>
        </div>
      </div>

      {/* Next Action */}
      <div className="dashboard-card next-action-card">
        <h3>Next Action</h3>
        {nextActionNode ? (
          <div className="next-action-content">
            <p className="next-action-title">{nextActionNode.skill}</p>
            <p className="next-action-domain">{typeof nextActionNode.domain === 'string' ? nextActionNode.domain : 'General'}</p>
            <p className="next-action-state">{nextActionNode.state}</p>
          </div>
        ) : (
          <p className="next-action-empty">All tasks completed! <Icon name="party" /></p>
        )}
      </div>

      {/* Confidence Trend (sparkline) */}
      <div className="dashboard-card sparkline-card">
        <h3>Confidence Trend</h3>
        <div className="sparkline-container">
          <svg width="100%" height="60" viewBox="0 0 100 60" preserveAspectRatio="none">
            <polyline
              points={`0,${60 - (confidenceScore * 0.6)} ${25},${60 - Math.min(confidenceScore + 5, 100) * 0.6} ${50},${60 - Math.min(confidenceScore + 12, 100) * 0.6} ${75},${60 - Math.min(confidenceScore + 8, 100) * 0.6} 100,${60 - confidenceScore * 0.6}`}
              fill="none"
              stroke="#FF6B6B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="sparkline-labels">
          <span>Start</span>
          <span>Current: {confidenceScore}%</span>
        </div>
      </div>

      {/* Summary */}
      <div className="dashboard-card summary-card">
        <p>{completedCount} of {totalNodes} nodes completed</p>
        <p>Journey progress: {totalNodes > 0 ? Math.round((completedCount / totalNodes) * 100) : 0}%</p>
      </div>
    </div>
  );
}
