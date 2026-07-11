# Interview Trainer

## Architecture

### Screens
- `src/screens/InterviewTrainerScreen/` — main trainer UI
  - `RecordPhase.tsx` — question display + voice recording
  - `ReviewPhase.tsx` — self-assessment after recording
  - `ResultsScreen.tsx` — session summary with scores
  - `InterviewResultsScreen.tsx` — detailed metrics + Playbook links

### Core modules
- `src/core/voice/` — voice engines
  - `stt_engine.ts` — Speech-to-text (not implemented)
  - `tts_engine.ts` — Text-to-speech via Web Speech API
  - `native_tts.ts` — Native TTS wrapper
  - `answer_analysis_engine.ts` — clarity, STAR, filler words analysis
  - `confidence_impact_engine.ts` — update confidence from analysis
  - `feedback_generator.ts` — generate feedback text
  - `interview_loop.ts` — question cycle: speak → listen → analyze → feedback
  - `interview_state_machine.ts` — states: start, asking, recording, analyzing, feedback
  - `stress_simulation.ts` — stress mode: speed up, interruptions
  - `voice_session_model.ts` — VoiceSession type

- `src/core/interview/` — interview data
  - `interview_persistence.ts` — save/load sessions
  - `interview_question_loader.ts` — load questions per profession
  - `interview_result.ts` — result calculation
  - `interview_store.ts` — in-memory store

### Data
- `src/professions/software_engineer/interview/questions.ts` — question bank

## Flow

```
Journey → START_INTERVIEW_TRAINER event
  → InterviewTrainerScreen (10 questions)
    → Prepare (5s countdown) → Record (60s) → Review (self-assessment)
  → Finish Session
  → INTERVIEW_SESSION_COMPLETE event
→ Journey
```

## Known Limitations
- TTS — implemented via Web Speech API, not all devices support it
- STT — not implemented (speech recognition)
- Audio is not persisted (Blob is not serializable)
- Waveform — simplified canvas, not real FFT analysis
