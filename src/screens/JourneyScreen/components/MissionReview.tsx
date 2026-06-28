import { GlassCard } from '@/components/layout/GlassCard';
import { PrimaryButton } from '@/components/layout/PrimaryButton';
import './MissionReview.css';

interface MissionReviewProps {
  onComplete: () => void;
}

const CHECKLIST = [
  'Objective completed',
  'Evidence prepared',
  'Completion Criteria satisfied',
];

export function MissionReview({ onComplete }: MissionReviewProps) {
  return (
    <GlassCard className="mission-review">
      <h3 className="mission-review-title">Review</h3>
      <ul className="mission-review-checklist">
        {CHECKLIST.map((item, i) => (
          <li key={i} className="mission-review-item">✓ {item}</li>
        ))}
      </ul>
      <PrimaryButton onClick={onComplete}>Complete Mission</PrimaryButton>
    </GlassCard>
  );
}
