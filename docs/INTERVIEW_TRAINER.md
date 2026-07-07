# Interview Trainer — MVP v1.0

## Architecture
- InterviewTrainerScreen — 3 phases: Prepare → Record → Review
- useVoiceRecorder — MediaRecorder hook
- interview_store — localStorage persistence
- system_event_bus — integration with App.tsx

## Files
- src/screens/InterviewTrainerScreen/
- src/core/interview/
- src/professions/software_engineer/interview/questions.ts

## Flow
1. User completes Journey → FinalCinematicScreen → JourneyCompleteScreen
2. Presses "Begin Interview Challenge" → START_INTERVIEW_TRAINER event
3. App.tsx switches to InterviewTrainerScreen
4. 10 questions in sequence: Prepare (5s) → Record (60s) → Review (self-assessment)
5. Finish Session → INTERVIEW_SESSION_COMPLETE → return to Journey

## Known Limitations
- TTS (question read-aloud) — not implemented, text only
- STT (speech recognition) — not implemented
- Audio is not persisted (Blob is not serializable)
- Waveform — simplified canvas, not real FFT analysis

## Next Steps
- [ ] TTS via Web Speech API
- [ ] STT via Web Speech API
- [ ] Save audio to IndexedDB
- [ ] Real FFT waveform
- [ ] AI-powered voice feedback analysis
