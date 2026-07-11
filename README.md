# Career Navigator

Offline-first mobile career guidance app. React 18 + TypeScript + Vite + Capacitor.

## Stack
- React 18, Zustand, Framer Motion
- Capacitor (Android build)
- LocalStorage / IndexedDB persistence
- Web Speech API (TTS/STT planned)

## Structure
- `src/screens/` — UI screens
- `src/core/` — business logic, state, events
- `src/components/` — shared UI components
- `src/world/` — game world renderer (canvas)
- `src/professions/` — profession-specific content

## Scripts
- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run android` — Capacitor open Android Studio

## Key Docs
- `PROJECT_STATUS.md` — live changelog (mandatory update after every session)
- `CORE_MAP.md` — verified file map of `src/core/`
- `+Window_functional.md` — tab structure & screen design decisions
