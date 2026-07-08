import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseVoiceRecorderReturn {
  isRecording: boolean;
  isSupported: boolean;
  audioBlob: Blob | null;
  recordingDuration: number;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  resetRecording: () => void;
  streamRef: React.MutableRefObject<MediaStream | null>;
}

export function useVoiceRecorder(maxDurationMs: number = 60000): UseVoiceRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const isSupported = !!(navigator.mediaDevices && typeof MediaRecorder !== 'undefined');

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    clearTimer();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsRecording(false);
  }, [clearTimer]);

  const startRecording = useCallback(async () => {
    if (!isSupported) throw new Error('Recording is not supported in this browser.');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : '';

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : {});
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      setAudioBlob(null);
      setRecordingDuration(0);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType || 'audio/webm' });
        setAudioBlob(blob);
        chunksRef.current = [];
      };

      recorder.start();
      setIsRecording(true);

      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setRecordingDuration(Math.floor(elapsed / 1000));
        if (elapsed >= maxDurationMs) {
          stopRecording();
        }
      }, 1000);
    } catch (err) {
      throw new Error('Microphone access denied or unavailable.');
    }
  }, [isSupported, maxDurationMs, stopRecording]);

  const resetRecording = useCallback(() => {
    setAudioBlob(null);
    setRecordingDuration(0);
    chunksRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearTimer();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [clearTimer]);

  return {
    isRecording,
    isSupported,
    audioBlob,
    recordingDuration,
    startRecording,
    stopRecording,
    resetRecording,
    streamRef,
  };
}
