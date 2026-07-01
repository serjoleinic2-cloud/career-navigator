# CAREER_NAVIGATOR_UX_BIBLE

Version: 1.0

This document defines all screens, navigation flows, user actions, and interface behavior.

No additional screens should be added unless approved in the Product Bible.

---

# DESIGN PRINCIPLES

The application must feel:

* Simple
* Calm
* Focused
* Premium
* Easy to understand

The user should always know:

* Where they are
* What to do next
* How much progress they have made
* What remains ahead

---

# APPLICATION FLOW

FIRST LAUNCH

↓

Welcome Screen

↓

Onboarding

↓

Analysis

↓

Roadmap Creation

↓

Journey Screen

↓

Daily Usage Loop

---

# SCREEN 01

WELCOME

Purpose

Introduce the concept.

Layout

App Logo

Title

Subtitle

Primary Button

Action

Start My Journey

Navigation

Moves to Onboarding Screen 1

---

# SCREEN 02

ONBOARDING STEP 1

Purpose

Determine user's current situation.

Components

Title

Subtitle

Selectable Options

Continue Button

Requirement

User must select one option before continuing.

Navigation

Next → Onboarding Step 2

---

# SCREEN 03

ONBOARDING STEP 2

Purpose

Determine emotional state.

Components

Title

Subtitle

Options

Continue Button

Navigation

Next → Step 3

Back → Step 1

---

# SCREEN 04

ONBOARDING STEP 3

Purpose

Determine application activity.

Components

Options

Continue Button

Navigation

Next → Step 4

Back → Step 2

---

# SCREEN 05

ONBOARDING STEP 4

Purpose

Determine interview experience.

Components

Options

Continue Button

Navigation

Next → Step 5

Back → Step 3

---

# SCREEN 06

ONBOARDING STEP 5

Purpose

Select target profession.

Components

Available Professions

Coming Soon Professions

Continue Button

Navigation

Next → Step 6

Back → Step 4

---

# SCREEN 07

ONBOARDING STEP 6

Purpose

Determine confidence level.

Components

Slider 1–10

Continue Button

Navigation

Next → Step 7

Back → Step 5

---

# SCREEN 08

ONBOARDING STEP 7

Purpose

Identify main fears.

Components

Multiple Selection List

Build My Roadmap Button

Navigation

Next → Analysis Screen

Back → Step 6

---

# SCREEN 09

ANALYSIS

Purpose

Create perceived intelligence and personalization.

Behavior

Display rotating analysis messages.

Duration

3–5 seconds.

No user interaction.

Navigation

Automatically opens Career Readiness Report.

---

# SCREEN 10

CAREER READINESS REPORT

Purpose

Present starting assessment.

Components

Career Readiness Score

Strongest Area

Biggest Opportunity

Confidence Insight

Primary Button

Build My Journey

Navigation

Next → Roadmap Created

---

# SCREEN 11

ROADMAP CREATED

Purpose

Present completed route.

Components

Estimated Duration

Recommended Pace

Start Day 1 Button

Navigation

Next → Journey Screen

---

# SCREEN 12

JOURNEY

Purpose

Main application screen.

This is the most important screen in the entire product.

User should spend most time here.

---

Layout

Vertical Career Path

Current Step Centered

Completed Steps Above

Locked Steps Below

Progress Indicator

Current Day

Career Score

---

Actions

Open Current Task

Open Notes

Open Chapter

Scroll Journey

Share Progress

---

Navigation

Bottom Tab Bar

Journey

Tasks

Progress

Profile

---

# SCREEN 13

TASK DETAILS

Purpose

Display selected task.

Components

Task Title

Task Description

Helpful Tips

Complete Task Button

Notes Button

---

Actions

Mark Complete

Add Notes

Return To Journey

---

# SCREEN 14

NOTES

Purpose

Store personal observations.

Components

Text Field

Save Button

Date

Related Task

Behavior

Each note remains attached to its task.

---

# SCREEN 15

CHAPTER COMPLETION

Purpose

Celebrate progress.

Components

Chapter Name

Completion Message

Continue Button

Navigation

Next → Self Assessment

---

# SCREEN 16

SELF-ASSESSMENT

Purpose

Compare user confidence against system estimation.

Components

Question

How ready are you?

Slider 1–10

Submit Button

Navigation

Next → Gap Analysis

---

# SCREEN 17

GAP ANALYSIS

Purpose

Reveal blind spots.

Components

User Score

Path Estimate

Recommended Actions

Continue Button

Navigation

Next → Journey

---

# SCREEN 18

TASKS

Purpose

Display full roadmap.

Layout

Chapter List

Progress Per Chapter

Locked Chapters

Completed Chapters

Navigation

Accessible from Bottom Navigation

---

# SCREEN 19

PROGRESS

Purpose

Display statistics.

Components

Career Score

Confidence Score

Completed Tasks

Completed Chapters

Current Streak

Progress History

Navigation

Accessible from Bottom Navigation

---

# SCREEN 20

PROFILE

Purpose

Account-free settings area.

Components

Selected Profession

Current Journey

Premium Status

Settings

Privacy Information

Share App

Restore Purchase

Navigation

Accessible from Bottom Navigation

---

# SCREEN 21

INTERVIEW TRAINER

Purpose

Practice answering interview questions.

Components

Question

Audio Playback

Record Button

Playback Recording

Self Review

Submit Evaluation

Navigation

Accessible when Interview Chapter unlocks.

---

# SCREEN 22

VOICE RECORDING

Purpose

Record interview answer.

Components

Question

Recording Timer

Stop Button

Behavior

Recommended duration:

20–60 seconds.

Navigation

Recording Complete → Playback Screen

---

# SCREEN 23

PLAYBACK

Purpose

Listen to recorded answer.

Components

Audio Player

Replay Button

Continue Button

Navigation

Next → Self Review

---

# SCREEN 24

SELF REVIEW

Purpose

Evaluate own answer.

Components

Checklist

Confidence Rating

Submit Button

Navigation

Next → Recommendations

---

# SCREEN 25

RECOMMENDATIONS

Purpose

Provide guidance based on self-review.

Components

Strengths

Improvement Areas

Practice Again Button

Return To Journey Button

---

# SCREEN 26

PLAYBOOK

Purpose

Reference library.

Components

Communication

Interview Questions

Body Language

Confidence

Salary Negotiation

Professional Appearance

Navigation

Accessible from Profile and Interview Trainer.

---

# SCREEN 27

SHARE

Purpose

Encourage organic growth.

Components

Career Score

Current Day

Current Chapter

Generated Share Card

Share Button

Navigation

Return To Previous Screen

---

# SCREEN 28

PREMIUM

Purpose

Present upgrade offer.

Components

Premium Benefits

Monthly Option

Lifetime Option

Purchase Button

Restore Purchase

Close Button

Navigation

Return To Previous Screen

---

# BOTTOM NAVIGATION

Journey

Tasks

Progress

Profile

No additional tabs allowed.

---

# UX RULE

If a feature does not help the user move toward employment, it should not exist inside the application.

The journey remains the center of the product.

---
VISUAL & MOTION LANGUAGE

The application uses a Monument Valley inspired experience layer.

This is not a visual theme, but a spatial interaction system.

---

# CORE EXPERIENCE PRINCIPLES

- The UI is experienced as a space, not screens
- Navigation feels like movement through a path, not page transitions
- The user is always positioned in a "journey environment"

---

# JOURNEY SCREEN EXPERIENCE

The Journey screen is a vertical structured path that behaves like a world:

- The current task is always centered
- Completed tasks move above as "past path"
- Locked tasks appear below as "future path"
- The camera gently follows user progress

---

# MOTION RULES

- Transitions are slow, smooth, and intentional
- No instant screen changes
- Every state change feels like movement in space
- Scroll behaves like guided camera motion, not free scrolling

---

# FOCUS SYSTEM

Only one active focus exists at any time:

- current task node is visually emphasized
- all other elements fade into background
- user attention is always guided

---

# ATMOSPHERE

- minimal UI noise
- soft gradients or abstract background
- no heavy panels or dashboard feeling
- calm emotional pacing

---

# INTERACTION PHILOSOPHY

The app does not feel like an app.

It feels like navigating a structured journey environment.

---

# THEME COMPLIANCE CHECKLIST

Every profession is a self-contained world (see WORLD ARCHITECTURE / `WorldTheme`). A screen is only "done" if switching `src/professions/<profession>/world.ts` is enough to fully re-skin it — no `.tsx` or `.css` edits required.

## Single source of truth

- All color, gradient, glow, and shadow values used for atmosphere come from `WorldTheme` (`src/core/world/world_theme.ts`), never from a new hardcoded hex, a new tailwind color, or a new `:root` variable file.
- Screens read the theme through `useWorldCssStyle(chapterId?)` and apply it as `style={...}` on their root element. CSS then consumes it via `var(--w-*)` with a safe fallback: `var(--w-primary, #667eea)`.
- Confetti/sparkle color arrays come from `useWorldConfettiColors()`, not from an inline array literal.

## Before marking a screen "theme-compliant", check it for:

- [ ] Hardcoded colors (`#fff`, `rgb(...)`, named colors)
- [ ] Hardcoded gradients (`linear-gradient`, `radial-gradient` with literal stops)
- [ ] Hardcoded shadows (`box-shadow` with literal `rgba(...)`)
- [ ] Hardcoded glow/light effects (radial glows, light rays, sparkle animations)
- [ ] Hardcoded border colors
- [ ] Hardcoded background colors
- [ ] Opacity values that encode brand/atmosphere (not layout spacing)
- [ ] Any second `:root` block or duplicated accent map (`CHAPTER_ACCENT`-style objects copy-pasted across files)

## What stays local (not theme violations)

- Layout constants: spacing, radius, timing/duration, easing curves.
- Copy/content: profession name, stats, chapter titles.
- Icons/emoji used as content rather than atmosphere (flag for future `WorldTheme.icons` if this changes).

## Process

1. New cinematic/celebration screen → wire `useWorldCssStyle()` on the root element from the first draft, not as a retrofit.
2. New profession → add its `world.ts` (palette, `chapterAccents`, `chapterBackgrounds`, `celebration`) — zero screen edits.
3. If a screen needs a new semantic value (e.g. a "warning" color) that doesn't exist on `WorldTheme` yet, add it to the theme contract first, then consume it — never hardcode "just this once."
4. Periodically grep for legacy color literals (`#[0-9a-fA-F]{3,6}`, `rgba(`) inside screen `.css`/`.tsx` files outside of `world_theme.ts` itself — any hit is a candidate for the next audit.