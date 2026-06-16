# CAREER_NAVIGATOR_TECH_SPEC

Version: 1.0

This document defines the full technical architecture, data models, storage strategy, state management, navigation logic, and offline-first implementation approach for Career Navigator.

---

# 1. SYSTEM OVERVIEW

The application is:

* Fully Offline-First
* No backend required for core functionality
* No user accounts
* No cloud dependency
* Local data persistence only

All user progress, scores, tasks, and history are stored on-device.

---

# 2. TECH STACK (RECOMMENDED)

## Mobile Framework

React Native OR Flutter (recommended: Flutter for UI consistency)

---

## Local Storage

Primary:

* SQLite (structured data)

Alternative:

* Hive (Flutter lightweight option)

---

## State Management

* Riverpod (Flutter)
  OR
* Bloc (Flutter)
  OR
* Redux Toolkit (React Native)

Recommended: Riverpod (clean + scalable)

---

## Audio Recording (Interview Trainer)

* Native Audio APIs
* Local file storage
* No cloud upload

---

## File Storage

* Local app sandbox
* Audio files stored as local paths

---

# 3. CORE ARCHITECTURE

## Modules

1. Onboarding Module
2. Career Engine Module
3. Journey Module
4. Task System Module
5. Interview Trainer Module
6. Playbook Module
7. Progress Tracking Module
8. Monetization Module

---

# 4. DATA MODEL OVERVIEW

All data is stored locally.

---

# 5. USER MODEL

```json
UserProfile
```

Fields:

* user_id: string (generated locally)
* profession: string
* current_stage: string
* confidence_score: int (1–10)
* career_score: int (0–100)
* created_at: timestamp

---

# 6. ONBOARDING DATA MODEL

```json
OnboardingState
```

Fields:

* employment_status: string
* emotional_state: string
* applications_count: string range
* interviews_count: string range
* profession_target: string
* confidence_level: int
* fears: list<string>

---

# 7. CAREER JOURNEY MODEL

```json
CareerJourney
```

Fields:

* journey_id: string
* profession: string
* total_days: int (30–60)
* current_day: int
* current_chapter: int
* status: enum (not_started, active, completed)

---

# 8. CHAPTER MODEL

```json
Chapter
```

Fields:

* chapter_id: string
* title: string
* order: int
* status: enum (locked, active, completed)
* progress_percent: int

---

Chapters:

1. Resume Foundation
2. Professional Positioning
3. Applications
4. Interview Preparation
5. Interview Practice
6. Offer Readiness

---

# 9. TASK MODEL

```json
Task
```

Fields:

* task_id: string
* chapter_id: string
* title: string
* description: string
* type: enum (learning, action, reflection, practice)
* status: enum (locked, available, completed, skipped)
* estimated_time: int (minutes)
* created_at: timestamp

---

# 10. TASK COMPLETION MODEL

```json
TaskCompletion
```

Fields:

* task_id: string
* completed_at: timestamp
* user_notes: string
* difficulty_rating: int (1–5)

---

# 11. NOTES MODEL

```json
Note
```

Fields:

* note_id: string
* task_id: string
* content: string
* created_at: timestamp

---

# 12. CAREER SCORE ENGINE

```json
CareerScore
```

Fields:

* total_score: int (0–100)

Breakdown:

* resume_score: int (0–20)
* positioning_score: int (0–15)
* applications_score: int (0–20)
* interview_preparation_score: int (0–20)
* interview_practice_score: int (0–15)
* consistency_score: int (0–10)

---

# 13. CONFIDENCE MODEL

```json
ConfidenceScore
```

Fields:

* value: int (1–10)
* source: enum (onboarding, self_assessment, interview_session)

---

# 14. SELF ASSESSMENT MODEL

```json
SelfAssessment
```

Fields:

* chapter_id: string
* user_score: int (1–10)
* system_estimate: int (1–10)
* gap: int
* recommendation: string

---

# 15. GAP ANALYSIS ENGINE

Logic:

gap = abs(user_score - system_estimate)

---

## Output Rules:

If user_score > system_estimate:

→ overconfidence detected

If user_score < system_estimate:

→ underconfidence detected

If equal:

→ balanced state

---

# 16. INTERVIEW TRAINER MODEL

```json
InterviewSession
```

Fields:

* session_id: string
* question_id: string
* audio_file_path: string
* duration_seconds: int
* playback_completed: boolean
* self_rating: int (1–10)

---

# 17. QUESTION MODEL

```json
InterviewQuestion
```

Fields:

* question_id: string
* text: string
* category: string
* difficulty: int (1–5)
* expected_structure: string
* common_mistakes: list<string>

---

# 18. AUDIO SYSTEM

## Recording Flow

1. Start recording
2. Store audio locally
3. Save file path in InterviewSession
4. Enable playback
5. Proceed to self evaluation

---

## File Format

* .m4a (recommended)
* or .wav (higher quality, larger size)

---

ANIMATION SYSTEM

All navigation and state changes must use controlled motion transitions.

---

Transition Types:

1. Journey Movement Transition
- used when moving between tasks
- duration: 400–800ms
- easing: smooth deceleration

2. Focus Shift Transition
- used when changing active task
- duration: 300–500ms

3. Modal Entry Transition
- used for interview trainer / notes
- duration: 250–400ms

---

No instant UI changes allowed for primary flows.
---
JOURNEY CAMERA SYSTEM

The Journey screen behaves like a vertical camera system.

---

Rules:

- The "camera" always centers on current task node
- Movement is animated, not instant
- Past tasks scroll upward smoothly
- Future tasks scroll downward into view

---

Behavior:

On task completion:
- camera shifts downward to next node
- completed node transitions into "past state"

On task opening:
- focus zoom effect on selected node

---

No free scroll dominance allowed.
User movement is guided, not fully free.
---
STATE TRANSITION RULES

Every state change must have a motion equivalent.

---

Examples:

Task Completed:
→ fade + downward camera shift

Chapter Completed:
→ slow zoom out + milestone transition

New Day:
→ gentle vertical reset alignment

Interview Session Start:
→ modal-like spatial focus transition

---

Rule:
No state change is allowed without visual motion feedback.
---
ATMOSPHERE LAYER

The UI is layered over an abstract background space.

---

Rules:

- background is non-informational
- no charts or dense UI in background
- atmosphere supports emotional tone of progress
- subtle gradient shifts reflect progress stages

---

Progression Feel:

Early stage → light fog / uncertainty tone
Mid stage → structured clarity
Late stage → bright stable composition

---
# 24. MONETIZATION LAYER (TECH)

## Paywall Trigger Points:

* chapter unlock
* interview trainer access
* advanced analytics access

---

## Access Control:

```json
FeatureAccess
```

Fields:

* feature_name: string
* is_locked: boolean

---

# 25. SECURITY MODEL

Since offline:

* no authentication required
* no user data transmission
* no server-side validation

---

# 26. SCALABILITY DESIGN

Future expansions:

* new professions added as JSON modules
* new chapters injected into CareerJourney model
* Interview questions extended via dataset updates

---

# 27. FAILURE HANDLING

If data corruption occurs:

* reset only affected module
* preserve UserProfile if possible

---

# 28. CORE DESIGN RULE

The system must always prioritize:

ACTION OVER CONTENT

If a decision exists between:

* showing information
* or moving user forward

→ always move user forward

---

# FINAL ARCHITECTURE SUMMARY

Career Navigator is:

* Local-first mobile system
* Rule-based progression engine
* Structured task-driven journey
* Interview simulation system
* Psychological readiness tracker
* Offline career transformation tool

---
Там ты фиксируешь реализацию:

animation system
transition rules
motion timing
scroll behavior