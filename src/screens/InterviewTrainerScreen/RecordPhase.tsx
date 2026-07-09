import { RefObject } from 'react';
import { InterviewerAvatar } from './components/InterviewerAvatar';
import { Waveform } from './components/Waveform';
import { ProgressIndicator } from './components/ProgressIndicator';
import { SparkButton } from './components/SparkButton';
import { Icon } from '@/components/Icon/Icon';

interface RecordPhaseProps {
  questionIndex: number;
  totalQuestions: number;
  currentQuestion: string;
  isRecording: boolean;
  recordingDuration: number;
  onStartRecord: () => void;
  onStopRecord: () => void;
  onClose: () => void;
  onSpeakQuestion: (text: string) => void;
  analyserRef: RefObject<AnalyserNode | null>;
  professionId: string;
}

export function RecordPhase({
  questionIndex,
  totalQuestions,
  currentQuestion,
  isRecording,
  recordingDuration,
  onStartRecord,
  onStopRecord,
  onClose,
  onSpeakQuestion,
  analyserRef,
  professionId,
}: RecordPhaseProps) {
  return (
    <div className="interview-record-phase">
      <div className="interview-header">
        <ProgressIndicator current={questionIndex + 1} total={totalQuestions} />
        <button onClick={onClose}><Icon name="close" size={16} /></button>
      </div>

      <InterviewerAvatar professionId={professionId} />

      <p className="interview-question">{currentQuestion}</p>

      <button className="interview-tts" onClick={() => onSpeakQuestion(currentQuestion)}>▶</button>

      <Waveform isRecording={isRecording} analyserRef={analyserRef} />

      <span className="interview-timer">{recordingDuration}s / 60s</span>

      {!isRecording ? (
        <SparkButton label="● Record" onClick={onStartRecord} variant="record" />
      ) : (
        <SparkButton label="■ Stop" onClick={onStopRecord} variant="stop" />
      )}
    </div>
  );
}
