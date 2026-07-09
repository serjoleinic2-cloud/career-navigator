import { RefObject } from 'react';
import { Icon } from '@/components/Icon/Icon';
import { ProgressIndicator } from './components/ProgressIndicator';

const ASSESSMENT_ITEMS = [
  { key: 'structure', label: 'Structure' },
  { key: 'confidence', label: 'Confidence' },
  { key: 'noFillers', label: 'No Fillers' },
  { key: 'noPauses', label: 'No Long Pauses' },
  { key: 'clearConclusion', label: 'Clear Conclusion' },
] as const;

interface ReviewPhaseProps {
  questionIndex: number;
  totalQuestions: number;
  currentQuestion: string;
  audioBlob: Blob | null;
  audioUrl: string;
  currentResultId: string;
  selfAssessment: Record<string, boolean>;
  onToggleAssessment: (key: string) => void;
  onReRecord: () => void;
  onNextQuestion: () => void;
  onClose: () => void;
  audioRef: RefObject<HTMLAudioElement>;
}

export function ReviewPhase({
  questionIndex,
  totalQuestions,
  currentQuestion,
  audioBlob,
  audioUrl,
  currentResultId,
  selfAssessment,
  onToggleAssessment,
  onReRecord,
  onNextQuestion,
  onClose,
  audioRef,
}: ReviewPhaseProps) {
  return (
    <div className="interview-review-phase">
      <div className="interview-header">
        <ProgressIndicator current={questionIndex + 1} total={totalQuestions} />
        <button onClick={onClose}><Icon name="close" size={16} /></button>
      </div>

      <p className="interview-question">{currentQuestion}</p>

      {audioBlob && (
        <audio
          key={currentResultId}
          ref={audioRef}
          controls
          src={audioUrl}
          className="interview-audio-player"
        />
      )}

      <hr />

      <h3>Самооценка</h3>
      {ASSESSMENT_ITEMS.map(item => (
        <label key={item.key} className="interview-check">
          <input
            type="checkbox"
            checked={selfAssessment[item.key] || false}
            onChange={() => onToggleAssessment(item.key)}
          />
          {item.label}
        </label>
      ))}

      <hr />

      <div className="interview-actions">
        <button onClick={onReRecord}><Icon name="refresh" size={14} /> Re-record</button>
        <button onClick={onNextQuestion}>Next →</button>
      </div>
    </div>
  );
}
