import { useEffect, useRef } from 'react';

interface WaveformProps {
  isRecording: boolean;
  analyserRef: React.RefObject<AnalyserNode | null>;
}

export function Waveform({ isRecording, analyserRef }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    if (!isRecording) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.clientWidth || 320;
    canvas.height = canvas.clientHeight || 80;

    const analyser = analyserRef.current;
    const bufferLength = analyser ? analyser.frequencyBinCount : 0;
    const dataArray = analyser ? new Uint8Array(bufferLength) : null;

    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
        const barW = canvas.width / bufferLength;
        for (let i = 0; i < bufferLength; i++) {
          const barH = (dataArray[i] / 255) * canvas.height;
          const x = i * barW;
          const y = canvas.height - barH;
          const g = ctx.createLinearGradient(x, canvas.height, x, y);
          g.addColorStop(0, '#0A1A3A');
          g.addColorStop(0.5, '#1E3A5F');
          g.addColorStop(1, '#00F0FF');
          ctx.fillStyle = g;
          ctx.fillRect(x, y, barW - 1, barH);
        }
      }
    };
    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isRecording, analyserRef]);

  if (!isRecording) {
    return (
      <div className="interview-waveform">
        <div className="waveform-idle" />
      </div>
    );
  }

  return (
    <div className="interview-waveform">
      <canvas ref={canvasRef} />
    </div>
  );
}
