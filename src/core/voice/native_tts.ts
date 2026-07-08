import { TextToSpeech } from '@capacitor-community/text-to-speech';

export async function speakMale(text: string): Promise<void> {
  try {
    await TextToSpeech.speak({
      text,
      lang: 'en-US',
      rate: 0.85,
      pitch: 0.7,
      volume: 1.0,
    });
  } catch (e) {
    console.error('TTS error:', e);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  }
}

export async function speak(text: string): Promise<void> {
  try {
    await TextToSpeech.speak({
      text,
      lang: 'en-US',
      rate: 0.9,
      pitch: 1.0,
      volume: 1.0,
    });
  } catch (e) {
    console.error('TTS error:', e);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }
}

export async function stop(): Promise<void> {
  try {
    await TextToSpeech.stop();
  } catch {
    window.speechSynthesis?.cancel();
  }
}

export async function isAvailable(): Promise<boolean> {
  try {
    return true;
  } catch {
    return 'speechSynthesis' in window;
  }
}
