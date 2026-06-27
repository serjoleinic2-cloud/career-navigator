type SpeakOptions = {
  rate?: number;
  pitch?: number;
  volume?: number;
  voiceName?: string;
};

export function speak(text: string, options?: SpeakOptions): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  if (options?.rate !== undefined) utterance.rate = options.rate;
  if (options?.pitch !== undefined) utterance.pitch = options.pitch;
  if (options?.volume !== undefined) utterance.volume = options.volume;

  if (options?.voiceName) {
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.name === options.voiceName);
    if (voice) utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stop(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
}

export function isSpeaking(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return window.speechSynthesis.speaking;
}


