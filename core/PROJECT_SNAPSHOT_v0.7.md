CAREER NAVIGATOR — PROJECT SNAPSHOT v0.7
🎯 PROJECT TYPE

Offline deterministic career readiness system with chapter-based progression, interview trainer, and world system.

🧱 CORE ENGINE

Functions:
- Runtime state machine (JourneyRuntimeState): nodeStates, chapterProgress, activeChapterId, activeNodeId
- Chapter engine: getCurrentChapter, getNextChapter, advanceChapter
- Skill engine: submitTask, applyTaskResultToRuntime (readinessDelta, confidenceDelta)
- Interview store: addSession, getSessions, calculateInterviewReadiness
- Persistence: runtime_persistence, interview_persistence (localStorage)

Data source:
- Profession modules (software_engineer/module.ts): chapters, skillGraph, entryNodeId
- task_content_engine: task definitions per node
- interview/questions.ts: 10 interview questions

Deterministic rules:
- Node states: locked → awareness → understanding → application → readiness → execution → confidence
- Chapter progress = completed nodes / total nodes
- Readiness = average of node skill-state values (0-100)
- Interview readiness = average self-assessment score across all sessions

FLOWS

Main user journey:
JourneyHUD → ChapterHub → select node → MissionScreen → TaskCompleteScreen → bridge → next chapter → FinalCinematicScreen → JourneyCompleteScreen → InterviewTrainerScreen

Step order:
1. Start journey → onboarding → ChapterHub shows first chapter
2. Tap node → MissionScreen with task content + Learn More button
3. Complete task → TaskCompleteScreen (rewards: XP, readiness, confidence)
4. Last node → bridge animation → advance to next chapter
5. All chapters done → FinalCinematicScreen (12s animation, 6 islands)
6. JourneyCompleteScreen → "BEGIN INTERVIEW CHALLENGE" or "NEW JOURNEY"
7. InterviewTrainerScreen: 3 phases (Prepare 5s → Record 60s → Review per question)
8. 10 questions → Finish Session → return to Journey

WORLD SYSTEM

Visual concept:
"The Code Archipelago" — 6 islands (resume, linkedin, applications, interviews, offer_preparation, offer) + city. Profession-specific theme registered via registerWorldTheme.

Layout:
- Islands stacked vertically, x=0, y=180*i spacing
- Bridges between consecutive islands
- Camera anchors per island, cinematic pan-in on first arrival
- Components: JourneyHeader, ChapterHub (island art + missions), BridgeRestoreScreen, FinalCinematicScreen, JourneyCompleteScreen, InterviewTrainerScreen
- Art: world_art.ts registers worldImageUrl, falls back to gradient

DATA MAPPING

Engine → World:
- Chapter → Island (visual grouping of nodes)
- Node → Mission (individual task)
- Chapter progress → Island glow intensity
- Advance chapter → Bridge build animation + camera rise
- Journey complete → Cinematic animation → Interview Trainer unlock

SYSTEM STATE

Version: v0.7
Mode: FROZEN
Engine status: interview_trainer
AI usage: false

CURRENT STATUS

Working:
- Runtime initialization, save/load, chapter progression
- 6 chapters with task content (resume, linkedin, applications, interviews, offer_preparation, offer)
- MissionScreen with task display, Learn More (→ Playbook), task submission
- TaskCompleteScreen with reward rings (XP, readiness, confidence) and explanations
- Chapter complete → bridge restore → next chapter (single advanceChapter path)
- Per-chapter readiness score in JourneyHUD
- FinalCinematicScreen (12s, 6 island PNGs + city, SVG bridges, light beam)
- JourneyCompleteScreen with stats, "BEGIN INTERVIEW CHALLENGE", "NEW JOURNEY"
- InterviewTrainerScreen (3 phases, 10 questions, self-assessment, voice recording, feedback)
- Edge cases: no mic → error screen, unsupported → textarea fallback, visibilitychange auto-stop
- Dev buttons: "Test → Interview", "Test: Complete Journey" (DEV only)
- World theme/layout/art registration per profession
- Interview persistence, calculateInterviewReadiness
- Android RECORD_AUDIO permission

Missing:
- Real world art (awaiting artist — public/art/software_engineer/journey.png)
- TTS for interview questions
- STT for speech recognition
- Audio persistence (IndexedDB)
- iOS NSMicrophoneUsageDescription (before TestFlight)
- Premium purchase integration (PremiumState not wired)
- Dual profession definition tech debt (profession.ts vs module.ts)

NEXT TASKS

1. World Design — profession-agnostic world builder with interactive islands
2. Motion Polish — camera animations, transitions, particle effects
3. Art Production — artist creates world.png and island PNGs
4. Interview Trainer v2 — TTS, STT, real FFT waveform, IndexedDB audio
5. Premium — wire PremiumState from actual purchase status
