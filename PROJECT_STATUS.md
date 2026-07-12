# PROJECT_STATUS.md — Career Navigator

> **Живой документ. ОБЯЗАТЕЛЬНОЕ ПРАВИЛО, а не пожелание.**
> Любой ИИ-агент (Claude/ChatGPT/OpenCode/Kimi, в любом аккаунте), закончив
> работу с кодом/дизайном/архитектурой, **обязан** дописать запись в секцию
> "История изменений" внизу этого файла — дата, кто, что сделано, что теперь
> работает иначе. Не переписывать историю задним числом — только дописывать
> вниз, актуальное состояние держать вверху.
>
> Это единственная общая память между сессиями и аккаунтами: разные ИИ не
> видят чужую историю чата друг друга. Если запись не сделана — следующий
> агент будет заново диагностировать уже решённый баг с нуля (это уже
> случалось, см. запись от 2026-07-03 про Review-экран).
>
> **Это правило обеспечено технически, а не только текстом:** в репозитории
> есть git pre-commit hook (`.githooks/pre-commit`), который блокирует коммит,
> если изменены файлы кода, но не изменён этот файл. Подключить его один раз
> на новый клон/сессию:
> ```
> git config core.hooksPath .githooks
> ```
> Если у агента нет доступа к настройке git hooks (например, работа идёт не
> через git напрямую) — правило всё равно действует, просто без автоматической
> проверки, и агент должен соблюдать его вручную.

**Последнее обновление:** 2026-07-11
**Обновил:** OpenCode (сессия — md audit: README, ARCHITECTURE_SNAPSHOT, structura, INTERVIEW_TRAINER, WORLD_LAYOUT_GUIDE, +Window_functional)
**Последний коммит на момент записи:** будет создан этой сессией (main, до неё см. историю ниже)

---

## CURRENT DEVELOPMENT PHASE

```
☑ Stabilization
☑ Interview Trainer MVP
☐ World Design
☐ Motion Polish
☐ Art Production
```

Никто (ни ChatGPT, ни Claude, ни Kimi, ни OpenCode) не даёт задания из
следующей фазы, пока текущая явно не отмечена как завершённая в этом файле.

---

## 🔴 Главное правило проекта (нарушается чаще всего)

**Тёмный фон → светлый текст. Светлый фон → тёмный текст. Всегда.**
Это не стилистическое пожелание, а причина половины багов "текст не видно" в истории проекта. Перед коммитом любого экрана — проверить контраст вручную (открыть на телефоне, не только "выглядит нормально в коде").

Второе обязательное правило UI: **в каждом экране с текстовым контентом** должны быть:
- кнопка **✕** (закрыть) — в правом верхнем углу;
- кнопка **"← Назад"** — внизу, после контента.

---

## ✅ Что сейчас работает (проверено сборкой на коммите `8505a2f`)

- **World tab** — показывает WorldRenderer (арт/камера/атмосфера) + JourneyHUD поверх него. **С этой сессии:** HUD показывает только ОДНУ карточку — активную главу; списка из карточек всех глав больше нет (см. запись двенадцатой сессии). Клик по узлу → миссия.
- **Playbook** — категории → записи → детали. Во всех трёх видах есть ✕ и "← Назад". Тёмная тема, контраст в порядке.
- **Notes** — добавление/редактирование/удаление заметок работает (это не заглушка). ✕ теперь реально закрывает экран (раньше писал в `window.location.hash`, который никто не читал — крестик не работал).
- **Mission screen** — теперь имеет ✕ и "← Назад" (раньше не было ни того, ни другого — выйти из миссии можно было только завершив её).
- **Нижняя навигация** — единая, на уровне `App.tsx`, 5 вкладок: Journey (бывший World — миссии/острова/HUD), Playbook, Notes, World (новая — заглушка карты путешествия, пока пустая), Profile (новая — паспорт путешественника + Share Progress внутри). Дизайн glow/индикатор сохранён.
- `npx tsc --noEmit` и `npx vite build` проходят чисто.

## 🟡 Известные проблемы / не проверено вживую

- Огромное количество файлов в `src/core` (см. `CORE_MAP.md`) с `used_by=0` — то есть не подключены ни к чему. Это следы нескольких параллельных архитектурных итераций (видно по истории коммитов: `Feature Milestone #2`, `WORLD 1.0`, `WORLD LAYOUT SYSTEM v1.0`, дальше десятки `update`). Часть — это честный "задел на будущее" (voice/interview, premium, social/share), часть — просто мёртвый код. Не удалялось автоматически: сначала нужна ручная сверка (см. `CORE_MAP.md`).
- В репозитории были случаи, когда `git push` с одного аккаунта откатывал/расходился с работой другого (Claude/ChatGPT/OpenCode работали параллельно над одним `main` без единого контролирующего процесса). Из-за этого баг-репорты пользователя иногда описывают сборку, которой уже нет в HEAD. **Правило на будущее: перед тем как чинить баг "на глаз", сначала `git pull`/`git log origin/main` и смотреть реальный текущий код, а не то, что тестировалось на телефоне 10 минут назад.**
- ~~Иконки везде — эмодзи~~ **(исправлено 2026-07-09)** — все декоративные эмодзи в JSX заменены на `<Icon>`, 30 файлов изменено. Не тронуты: (а) функциональные UI-символы (← → ▶ ☰), (б) эмодзи в plain-строках (не JSX — core service файлы), (в) эмодзи без SVG-аналога (⚠, ✏️, ✎, 🚀, 🔊, 🖼, 🧪, 💪, 📅, 🎓). Полный список новых иконок: `book`, `lock`, `party`, `clock`, `lightbulb`, `refresh`, `close`, `check`, `settings`, `mail`, `person`, `briefcase` — 29 доступных SVG-иконок в `Icon.tsx`.
- World в "production" режиме не рисует наглядные острова/мосты на канвасе (это уже сознательное решение — see `world_renderer.tsx` комментарии), они появятся с артом. До этого клики по картам глав обеспечивает `ChapterHub`/`JourneyHUD`, а не canvas.

## 🔵 Критические баги (на момент записи — нет открытых P0)

Если появляется критический баг (не открывается экран, теряются данные пользователя, краш при старте) — писать сюда с датой и не убирать, пока не закрыт.

---

## История изменений (снизу — новее)

### 2026-07-11 — Claude (5 задач: Offer island, World titles, portrait lock, notifications, onboarding design)

**1. Баг: через Next кнопку на главе Offer нет острова (картинки)**

**Root cause:** `handleGoToNextChapter` в `JourneyHUD.tsx` вызывал `advanceChapter()`,
которая ищет текущую главу через `runtimeState.activeNodeId`. После
`devCompleteAllExceptLastTask()` `activeNodeId` указывает на последний узел главы
Offer — поэтому `advanceChapter()` всегда считала текущей главой Offer и кидала
`"No next chapter available"` при нажатии Next на любой предыдущей главе.
В результате кнопка Next ничего не делала, пользователь оставался на Resume,
и дойти до Offer через цепочку Next было невозможно.

**Fix:** `handleGoToNextChapter` теперь вызывает `setActiveChapter(nextChapter.id)`
вместо `advanceChapter()`. `setActiveChapter` просто переключает вид на нужную
главу без мутации прогресса — именно это нужно для Back/Next навигации по
просмотру глав.

**Files:** `src/screens/JourneyScreen/JourneyHUD.tsx`

**2. World — названия глав над прогресс-бейджем**

Добавлен `<div className="world-island-title">` в `Island.tsx` с таблицей
`CHAPTER_TITLES` (Resume / LinkedIn / Applications / Interviews / Offer Prep / Offer).
Цвет — акцентный цвет главы, uppercase, glow через text-shadow.
CSS правило `.world-island-title` добавлено в `WorldMapScreen.css`.

**Files:** `src/screens/WorldMapScreen/components/Island.tsx`,
`src/screens/WorldMapScreen/WorldMapScreen.css`

**3. Запрет поворота экрана в горизонтальный режим**

`android:screenOrientation="portrait"` добавлен в `<activity>` в `AndroidManifest.xml`.
Требует Clean + Rebuild в Android Studio (манифест кэшируется).

**4. Пуш-уведомления — подключены к реальному триггеру завершения миссии**

`notification_service.ts` уже был написан (предыдущая сессия), `initNotifications()`
уже вызывался в `App.tsx`. Недоставало:
- `markMissionCompletedToday()` теперь вызывается в `MissionScreen.tsx` при
  `payload.advanced === true` (реальное продвижение узла) — перепланирует
  уведомление на завтра.
- `POST_NOTIFICATIONS` permission (Android 13+) добавлен в `AndroidManifest.xml`.
- `RECEIVE_BOOT_COMPLETED` permission добавлен для переплани\ровки после перезагрузки.

Переключатель «Enable notifications» в Settings уже работал — теперь вся цепочка
замкнута.

**Files:** `src/screens/MissionScreen/MissionScreen.tsx`,
`android/app/src/main/AndroidManifest.xml`

**5. Онбординг — дизайн-перфекционизм**

Полный переписыв `OnboardingScreen.tsx` + `OnboardingScreen.css`:
- Welcome: ambient glow-орбы, floating island с ring-эффектом, stat-row
  (6 Chapters / 41 Missions / 1 Offer), gradient title
- Profession screen: Step badge, иконки к карточкам профессий, статус «Soon»
- Fear screen: 2-колоночный grid карточек с иконками, compact layout
- Privacy: inline checkbox без modal-паттерна
- Кнопка Start засвечивается зелёным когда Privacy отмечена
- Progress dots: active + done состояния
- Анимации: slideIn/fadeIn, floatSlow, glowPulse, ringPulse

**Files:** `src/screens/OnboardingScreen/OnboardingScreen.tsx`,
`src/screens/OnboardingScreen/OnboardingScreen.css`

**Verified:** все файлы запушены. `tsc --noEmit` и `vite build` нужно
прогнать на стороне Serj перед деплоем (нет node_modules в этом окружении).

**Не проверено вживую** — нужно:
(а) Test → Next по главам — дойти до Offer, убедиться что остров PNG виден;
(б) World tab — убедиться что под каждым островом есть название главы;
(в) повернуть телефон — приложение не должно уходить в landscape;
(г) в Settings включить Notifications — пройти миссию — на следующий
день должно прийти уведомление «Ready for today's mission?»;
(д) запустить онбординг (New Journey) и убедиться что все 3 экрана
выглядят красиво, анимации не рвутся.


### 2026-07-08 — OpenCode (Задания 70–72: Save timeout fix, Capacitor localStorage fallback)

**Serj's report:** First chapter, first task — "Save timeout - please try again".

**Root cause:** saveRuntime debounce (100ms) + MissionScreen timeout (5s) = race
condition. First save delayed, timeout fires first.

**Fixes:**
1. Removed debounce from `saveRuntime` — synchronous save with try/catch.
2. Removed 5s timeout from `MissionScreen` — no false timeout.
3. Added error logging in `save()` — catches real failures and throws.
4. Added memory fallback (`memoryStore`) in `storage.ts` — if localStorage
   is blocked in Capacitor WebView, data stays in memory.
5. Added `console.log` for `runtimeState` keys and JSON stringify check in
   `startJourney()` to detect circular references.

**Files:** `src/core/runtime/runtime_controller.ts`,
`src/core/persistence/storage.ts`,
`src/screens/MissionScreen/MissionScreen.tsx`,
`PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Not verified on-device** — needs retest without cache clear.

### 2026-07-08 — OpenCode (Задания 66–69: New Journey reset, saveRuntime debounce, localStorage safety)

**Serj's report:** After "New Journey" → select profession → long saving,
cancel by timeout. Cleared cache — works.

**Root cause:** `resetJourney()` not fully clearing runtime state + old
persistence data conflicting with new profession. `saveRuntime` possibly
called in loop or localStorage corrupted.

**Fixes:**
1. `resetJourney()` — full runtime state reset via `createEmptyRuntime()` +
   `clearNotes()` + `clearAll()`. Keeps `professionId`. Doesn't clear
   interview sessions or other professions.
2. `switchProfession()` — complete reset + `window.location.reload()`.
3. `saveRuntime()` — added 100ms debounce in `runtime_controller.ts` to
   prevent infinite save loops from rapid React re-renders.
4. `save()` in `storage.ts` — added 4MB size check + try/catch error
   handling with automatic key cleanup on failure.
5. `clearAllPersistence()` — debug helper for manual cache clearing.
6. `App.tsx` RESET_JOURNEY handler — now uses `resetJourney()` instead of
   inlined `clearRuntime()` + `clearAll()`.

**Files:** `src/core/runtime/runtime_controller.ts`,
`src/core/persistence/storage.ts`, `src/persistence/runtime_persistence.ts`,
`src/App.tsx`, `PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` — чисто.

### 2026-07-08 — OpenCode (Задания 55–56: Interview Trainer fixes + TTS + avatar)

**Serj's reports:**

1. **Waveform infinite after re-record (step 9).**
   Root cause: old raf not cancelled, new raf叠加. Fixed: cancelAnimationFrame
   + clearRect + reset fallback state on startRecording and stopRecording.

2. **After 60s auto-stop — button changes to Record, can't play.**
   Root cause: auto-stop via setInterval could race with onstop callback.
   Fixed: added dedicated useEffect with setTimeout for auto-stop, ensures
   onstop fires and blob is created before any state transitions.

3. **Progress 2/10 hidden under close button.**
   Fixed: moved to separate `.interview-progress` element positioned
   `position: fixed; left: 16px`, close button stays `right: 16px`.

4. **TTS — question spoken aloud in PREPARE phase.**
   New: `speakQuestion()` uses SpeechSynthesisUtterance to read question.
   Auto-starts recording after TTS finishes (or 6s fallback timeout).
   "Skip TTS →" button for users who don't want to listen.

5. **Interviewer avatar image.**
   New: `<img src="/art/interview_man.png">` between question label and
   question text in PREPARE phase. `onError` hides the image if not found.
   Path: `public/art/interview_man.png` (Serj to add the asset).

**Files:** `src/screens/InterviewTrainerScreen/InterviewTrainerScreen.tsx`,
`src/screens/InterviewTrainerScreen/InterviewTrainerScreen.css`,
`src/screens/InterviewTrainerScreen/hooks/useVoiceRecorder.ts`,
`PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.

### 2026-07-08 — OpenCode (Задания 44–46: Interview Trainer close button fix + Exit button)

**Serj's report:** Tapping ✕ in Interview Trainer does nothing. Cannot exit.

**Root cause:** `handleClose()` emitted `CLOSE_INTERVIEW_TRAINER` event but nobody
subscribed to it. App.tsx already passed `onClose` prop but `handleClose` ignored it.

**Fixes:**
1. `handleClose` now calls `onClose()` first; falls back to
   `emit('CLOSE_INTERVIEW_TRAINER')` if `onClose` is undefined.
2. App.tsx — added `subscribe('CLOSE_INTERVIEW_TRAINER')` handler as fallback safety net.
3. CSS — `.interview-trainer-close` z-index bumped to 100, `pointer-events: auto`,
   `top` uses `safe-area-inset-top`.
4. Added "← Exit Interview" button at bottom of the trainer body (consistent with the
   "← Назад" pattern used across all other screens).

**Files:** `src/screens/InterviewTrainerScreen/InterviewTrainerScreen.tsx`,
`src/screens/InterviewTrainerScreen/InterviewTrainerScreen.css`,
`src/App.tsx`, `PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.

### 2026-07-08 — OpenCode (Задания 40–43: Interview Results Screen, waveform gradient, results-before-cinematic flow)

**Serj's reports:**

1. **After Interview Trainer — no results table, jumps to animation.**
   Expected: summary with scores and recommendations.
   Fixed: added `InterviewResultsScreen` between Trainer and Journey flow.
   Shows metrics table (Structure, Clarity, Confidence, No Fillers, No Pauses,
   Overall) with score %, star ratings, and per-metric recommendations with
   Playbook links for weak areas. "TRY AGAIN" (orange) resets the trainer;
   "RETURN TO JOURNEY" (ghost) emits `INTERVIEW_SESSION_COMPLETE` and navigates.

2. **Waveform black, needs gradient.**
   Fixed: canvas `linearGradient(0, canvas.height, 0, 0)` — purple `#7B2D8E`
   bottom → neon cyan `#00F0FF` top. CSS fallback: `background: linear-gradient(to top, #7B2D8E, #00F0FF)`.

**Flow:** Interview Trainer (10 questions) → "Finish Session" →
`InterviewResultsScreen` → "TRY AGAIN" (retry) / "RETURN TO JOURNEY"
(→ `INTERVIEW_SESSION_COMPLETE` event → App.tsx navigates to `'journey'` →
JourneyHUD shows FinalCinematicScreen if all chapters complete).

**Files:** `src/screens/InterviewTrainerScreen/InterviewResultsScreen.tsx` (new),
`src/screens/InterviewTrainerScreen/InterviewResultsScreen.css` (new),
`src/screens/InterviewTrainerScreen/InterviewTrainerScreen.tsx`,
`src/screens/InterviewTrainerScreen/InterviewTrainerScreen.css`,
`PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.

### 2026-07-07 — OpenCode (Задания 37–39: Notes filters synced to 6 real chapters, 'Other' fallback)

**Serj's report:** Notes filters showed Resume, LinkedIn, Interview, Networking,
Salary. But actual chapters are: Resume, LinkedIn, Applications, Interviews,
Offer Preparation, Offer. Notes from Applications, Offer Preparation, Offer
landed in a raw `chapterId` group (e.g. "offer_preparation") with no icon/label,
and notes from Interviews didn't match the old "interview" filter key.

**Fixes:**
1. `CATEGORY_ORDER` updated to match the 6 real chapter IDs from
   `chapters.ts`: `resume`, `linkedin`, `applications`, `interviews`,
   `offer_preparation`, `offer`.
2. `CATEGORY_LABELS`, `CATEGORY_ICONS`, `CATEGORY_COLORS` updated accordingly
   (Offer Prep → 📋 #9F7AEA, Offer → 💼 #FF6B6B, etc.).
3. Grouping logic now maps any `chapterId` not in `CATEGORY_ORDER` to `'other'`
   (📌 #888), shown at the bottom with label "Other" — handles legacy/buggy notes.
4. MissionScreen already uses `runtimeState.activeChapterId` which matches
   chapters.ts IDs — no change needed.

**Files:** `src/screens/NotesScreen/NotesScreen.tsx`, `PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.

### 2026-07-07 — OpenCode (Задания 34–36: Offer infinite Saving Progress fix, last-chapter cinematic, fastForwardJourney)

**Serj's device testing report:**

**Bug:** Tapping Continue in Offer mission shows "Saving Progress" spinner
indefinitely. Journey never completes, no cinematic, no "You Did It".

**Root causes found and fixed:**

1. **MissionScreen.tsx** — No safety timeout on the 'completing' state. If
   `MISSION_RESULT` event never fires (e.g. `skill_engine.ts` guard blocked by
   stale `isProcessingMission`, or an uncaught path in `submitTask()`), the
   spinner shows forever. Added a 5s `useEffect` timeout that resets to
   `taskView='active'` with an error message.

2. **JourneyHUD.tsx** — `handleMissionComplete()` for the last chapter
   (no next chapter) fell through without calling `startCinematic()`. The
   `allNodesCompleted` useEffect *should* catch it on the next render, but
   if `showMission` closes and the component re-renders while `phase` is
   still `'active'`, there's a flash of empty fragment (`<></>`) before the
   cinematic starts. Added an explicit `else { startCinematic(); }` branch
   in the chapter-just-completed handler when no next chapter exists.

3. **fastForwardJourney()** — Already correctly sets all fields from
   previous session (all nodes `'confidence'`, all chapters 100%,
   `activeChapterId` last chapter, `activeNodeId` last node,
   `readinessScore: 100`, `confidenceScore: 1`,
   `totalMinutesInvested` computed from all node tasks,
   `journeyStartedAt` preserved). No change needed.

**Files:** `src/screens/MissionScreen/MissionScreen.tsx`,
`src/screens/JourneyScreen/JourneyHUD.tsx`, `PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Not verified on-device** — needs retest with fastForwardJourney + manual Offer completion.

### 2026-07-07 — OpenCode (Задания 27–33: notes profession-filter, totalMinutesInvested, JourneyCompleteScreen hours)

**Сделано (Задания 27–33):**

1. **notes_store.ts / notes_controller.ts** — добавлены `getNotesByProfession(professionId)` (фильтр по `professionId`) и `getAllNotes()` (alias для `getNotes()`).
2. **NotesScreen.tsx** — добавлен проп `professionId`, `refresh()` использует `getNotesByProfession()`. Пустой стейт изменён с "No notes yet" на "No notes for this journey yet".
3. **App.tsx** — в `case 'notes'` передаётся `professionId={getRuntimeState()?.professionId || 'software_engineer'}`.
4. **runtime_controller.ts** — `submitTask()`: при `enrichedResult.success` добавляет `activeTaskDefinition.estimatedDuration` к `runtimeState.totalMinutesInvested`. `fastForwardJourney()`: теперь устанавливает `totalMinutesInvested` (сумма `estimatedMinutes` всех узлов) и `journeyStartedAt` (если не был установлен ранее).
5. **JourneyHUD.tsx** — `hoursInvested` в `JourneyCompleteScreen` изменён с `{0}` на `{Math.round((runtime?.totalMinutesInvested ?? 0) / 60)}`.

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.

**Files:** `src/core/runtime/runtime_controller.ts`, `src/core/user_data/notes/notes_store.ts`, `src/core/user_data/notes/notes_controller.ts`, `src/screens/NotesScreen/NotesScreen.tsx`, `src/App.tsx`, `src/screens/JourneyScreen/JourneyHUD.tsx`, `PROJECT_STATUS.md`

### 2026-07-06 — Claude (unified chapter tracking — fixed 0/7, duplicate Chapter Complete screen, missing Offer Preparation)

**Serj's bug reports and root causes:**

1. **"Chapter progress 0/7" shown right when a chapter finishes.** Not a
   checkbox issue. `submitTask()` (`runtime_controller.ts`) already flips
   `runtimeState.activeChapterId` to the *next* chapter the instant the
   last node completes — before `TaskCompleteScreen` renders. `MissionScreen`
   was looking up the chapter to display via that same `activeChapterId`,
   so it resolved to the next (all-locked, 0-done) chapter instead of the
   one just finished. Fixed: `MissionScreen` now finds the chapter by
   which chapter's `nodeIds` actually contains the just-completed
   `activeNodeId` (stable — `activeNodeId` doesn't change until the user
   taps Continue), falling back to `activeChapterId` only if that lookup
   fails.

2. **"Coming next" only showed a task preview mid-chapter, never a
   chapter name when a chapter completed.** `TaskCompleteScreen` now takes
   a `nextChapterTitle` prop (computed via `getNextChapter` in
   `MissionScreen`) and shows a "COMING NEXT — <Chapter Title>" card on
   the chapter-complete screen, instead of nothing.

3. **Reward badges were bare emoji + number** (⭐ +3, 📈 +10, ❤️ +8%) with
   no visual sense of scale and only a one-word label. Replaced with
   small `ProgressRing` diagrams (XP / Readiness / Confidence), each
   showing the delta as a filled ring against a realistic reference max
   (see `XP_REFERENCE_MAX` / `READINESS_REFERENCE_MAX` /
   `CONFIDENCE_REFERENCE_MAX` in `TaskCompleteScreen.tsx`) plus its name
   underneath. `ProgressRing` gained a `centerText` prop for this (small
   rings need compact custom center text like "+3", not a full percent).

4. **Duplicate "Chapter Complete" screen right after the first one**
   (e.g. "Interview Mastered" appearing twice with the same stats).
   Root cause: `JourneyHUD` kept its own second, parallel chapter-tracking
   system — grouping nodes by their `domain` string (e.g. `'Interviews'`,
   `'Offer Preparation'`, capitalized, as authored in `skill_nodes.ts`)
   instead of the canonical chapter list in `chapters.ts` (ids like
   `'interviews'`, `'offer_preparation'`, lowercase/underscored, which
   `submitTask`/`advanceChapter`/`chapter_engine`/`MissionScreen` all use).
   The casing mismatch meant the "already celebrated this chapter" ref
   check (`prevChapterCompletedRef`) never matched, so the old
   `ChapterCompleteScreen` (a second celebration screen, separate from
   `TaskCompleteScreen`'s own chapter-complete view) could fire again for
   a chapter already handled — showing genuinely duplicate stats to the
   user. Fixed at the root: `JourneyHUD`'s `chapters` list is now built
   directly from `getActiveChapters()` (chapters.ts), same source as
   everywhere else, eliminating the second bookkeeping system entirely.
   `ChapterCompleteScreen` is retired (no longer imported/rendered) since
   `TaskCompleteScreen` already shows the same celebration content — the
   Journey view now goes straight to the bridge animation once a chapter
   completes, no duplicate stats screen.

5. **"Offer Preparation" chapter never appeared to the user.** Same root
   cause as #4: because the celebration ref-check could fail to match
   (id-casing mismatch), a chapter-complete could re-trigger
   `advanceChapter()` a second time for the same transition, which — if
   it landed while an id mismatch made the guard think the "Interviews"
   completion hadn't been handled yet — could advance the chapter twice
   in a row (`interviews → offer_preparation → offer`) before the user
   ever saw the `offer_preparation` chapter's HUD card. Unifying chapter
   tracking (fix #4) removes the double-fire, so `offer_preparation`
   (3 nodes: salary negotiation, offer review, resignation letter) now
   shows normally between Interviews and Offer.

**Also fixed while unifying chapter tracking (cosmetic):**
`ChapterHub.tsx`'s `CHAPTER_ART_FILENAME` map had a stray key
`'offer preparation'` (space) that could never match the real chapter id
`offer_preparation` (underscore) — corrected.

**Files:** `src/screens/MissionScreen/MissionScreen.tsx`,
`src/screens/MissionScreen/TaskCompleteScreen.tsx`,
`src/screens/MissionScreen/TaskCompleteScreen.css`,
`src/screens/JourneyScreen/JourneyHUD.tsx`,
`src/screens/JourneyScreen/components/ChapterHub.tsx`,
`src/components/layout/ProgressRing.tsx`,
`src/components/layout/ProgressRing.css`, `PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` and `npx vite build` both pass clean.
Not yet verified on a physical device this session — please retest all
five items on-device and report back if anything still looks off.


**Journey tab fixes:**
- `world_art.ts`: registered `worldImageUrl: '/art/software_engineer/journey.png'`.
  Place your background image at **`public/art/software_engineer/journey.png`**
  (recommended: 1080×2340px portrait PNG). Until the file is placed, WorldRenderer
  falls back to the theme gradient (light sky blue → cream — defined in `world.ts`).
- `world_renderer.tsx`: added `imgError` state + `onError` on the `<img>` so a
  missing `journey.png` gracefully falls back to the gradient instead of broken-image.
- `JourneyScreen.css`: all Journey HUD text changed to neon cyan `#00e5e0` (same color
  as the bottom nav active indicator). Added `backdrop-filter: blur` dark glass backdrop
  to `.island-label-row` and `.island-missions` so text is readable on any background
  image (including the intended light-sky world art in `world.ts`).

**Playbook "Apply to Current Task" UX:**
- Added an inline explanation banner inside the Checklist accordion:
  *"Use these checkboxes while working on your current mission. Tick items as you
  complete them — then tap Apply & Return to Mission to go back."*
- Button text changed to "Apply & Return to Mission ›" — clearer about what happens.
- Button now shows "✓ Returning to mission..." confirmation for 1.1s before navigating,
  so the user knows the action happened (previously it silently called `onClose()` with
  zero feedback and no explanation, which caused the confusion).
- NOTE: nothing is persisted when Apply is tapped — the Playbook is a reference/
  knowledge tool, not a form. Checklist checkboxes are local UI helpers only.

**Files:** `world_art.ts`, `world_renderer.tsx`, `JourneyScreen.css`,
`PlaybookScreen.tsx`, `PlaybookScreen.css`, `PROJECT_STATUS.md`

### 2026-07-06 — Claude (Journey screen empty — two root-cause fixes)

**Symptoms reported by Serj:** Journey tab appears completely empty on device.

**Root cause 1 (PRIMARY) — dark text on dark background (CSS):**
`JourneyScreen.css` had `.island-label-title { color: #1a1a2e }`,
`.mission-row-title { color: #1a1a2e }`, `.mission-row-meta / -done { color: #555570 }`,
and `border rgba(0,0,0,…)` dividers. The Journey HUD is intentionally transparent
(WorldRenderer canvas is the background — dark world art). Near-black text on a dark
canvas = invisible. The "главное правило" (dark bg → light text) was violated directly
in CSS. Fixed: all those dark-on-dark values replaced with `#f0f0f5` / `rgba(240,240,245,…)`.

**Root cause 2 (SECONDARY) — `initializeRuntime` missing `setActiveProfession`:**
`App.tsx` calls `initializeRuntime(saved)` for returning users (cold start with
saved state). That function only set `runtimeState` but never called
`setActiveProfession(saved.professionId)`, so `profession_loader.activeState`
stayed `null`. First tap on any mission node → `getActiveChapters()` throws
`'No active profession set'` → ErrorBoundary or silent crash → nothing advances.
Fixed: `initializeRuntime` now calls `setActiveProfession` with a try/catch
(same guard pattern as `startJourney`).

**Files changed:** `src/screens/JourneyScreen/JourneyScreen.css`,
`src/core/runtime/runtime_controller.ts`, `PROJECT_STATUS.md`

### 2026-07-05 — Claude (реструктуризация нижнего меню на 5 вкладок — +Window_functional.md)

Задача от Serj/ChatGPT (`+Window_functional.md`): перейти с 4 вкладок
(World, Playbook, Notes, Share) на 5 (Journey, Playbook, Notes, World,
Profile), где старый экран World (WorldRenderer+JourneyHUD, рабочий экран
с миссиями) переименовывается в Journey, а новый World — это будущая
иллюстрированная карта путешествия (пока пустая заглушка — так и
попросили: "экран World новый там будет карта мира с нанесенными
отметками, но ты пока его пустым оставь"). Share перестаёт быть отдельной
вкладкой и переезжает в Profile как кнопка-действие ("Share Progress").

**Сделано:**
- `src/components/BottomNav/BottomNav.tsx` — 5 табов вместо 4, в порядке
  Journey → Playbook → Notes → World → Profile, иконки:
  Compass/BookOpen/StickyNote/Map/User (`lucide-react`, уже был в проекте).
- `src/App.tsx` — тип `Screen` расширен до 5 значений. Старый `'world'`
  (WorldRenderer+JourneyHUD) переименован в `'journey'` — рендерится тот
  же самый JSX, просто под новым именем таба (не пересобирался). `'share'`
  как отдельный `case` убран из свитча экранов.
- `src/screens/WorldMapScreen/` (новый) — заглушка нового World-таба:
  иконка + текст "The Map... being drawn". **Сознательно оставлен пустым**
  по прямому указанию — никакой карты/маркеров/canvas здесь ещё нет,
  чтобы не городить временный UI, который потом придётся выкидывать.
- `src/screens/ProfileScreen/` (новый) — "паспорт путешественника":
  уровень/аватар/название профессии, полоса общего прогресса Journey %;
  сетка из 5 метрик (Career Score, Confidence, Readiness, Consistency,
  Interview Readiness); Achievements (6 бейджей, честно посчитанных из
  реального прогресса, не рандом); Visited Islands (список глав с ✓/□ и
  %); Statistics (skills completed, дней в пути, текущая глава); кнопка
  "Share Progress", открывающая `ShareScreen` оверлеем; шестерёнка
  настроек в углу.
  **Важно:** `Career Score` считается через уже существовавший, но нигде
  не использовавшийся `calculateCareerScore()` (`core/scoring/
  career_score.ts`) на реальных `chapterProgress`/`confidenceScore`.
  `Consistency` и `Interview Readiness` — не отдельные поля в runtime (их
  там нет), а честно объявленные в коде производные величины (Consistency
  = среднее % по всем главам, Interview Readiness = % главы Interviews),
  а не выдуманные цифры — см. комментарий в файле.
- `src/screens/ShareScreen/ShareScreen.tsx` — добавлен опциональный
  `onClose` с ✕ (верх) и "← Назад" (низ), т.к. Share теперь открывается
  как под-экран поверх Profile, а не постоянная вкладка — по главному UI
  правилу проекта каждый такой экран обязан иметь оба элемента.
- Шестерёнка настроек в Profile открывает **заглушку**-список (Language,
  Theme, Notifications, Backup, Restore, Privacy, About, Developer Mode) —
  без реальной функциональности, честно помечено комментарием в коде.
  Реализация каждого пункта — отдельная задача (i18n, тема, права на
  уведомления, backup/restore уже есть в Moodos и может быть перенесён).

**Проверено:**
- `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
- `madge` от `src/main.tsx` — оба новых файла (`ProfileScreen.tsx`,
  `WorldMapScreen.tsx`) подтверждённо достижимы, не мёртвый код.
- Контраст текста проверен по коду (тёмный фон `#0b0e14` → светлый текст
  `#f0f0f5` везде в новых файлах, по правилу проекта).

**Не проверено вживую на устройстве** — нужно: открыть приложение, увидеть
5 вкладок в новом порядке; убедиться, что старый рабочий экран (миссии,
острова, HUD) остался ровно тем же под именем Journey; открыть новый
World — увидеть пустую заглушку без ошибок; открыть Profile — проверить,
что все цифры совпадают с реальным прогрессом (не 0/NaN), нажать
"Share Progress" → открывается карточка шэринга с рабочим ✕/Назад;
нажать шестерёнку → видно список настроек (не активны, это ожидаемо).

**Не сделано в этой сессии (сознательно, вне периметра задачи):**
- Сама карта мира (арт/маркеры/тап по острову) для нового World-таба —
  ждёт художественных материалов, как и было указано.
- Настоящая функциональность настроек (язык/тема/уведомления/backup) —
  только заглушка-список.
- Привязка заметок к конкретной миссии внутри Notes UI (`Resume →
  Positioning Clarity → Мои заметки`, как описано в `+Window_functional.md`
  разделе 3) — это отдельная переработка `NotesScreen.tsx` (сейчас группа
  только по главе, не по узлу/миссии); не входило в этот конкретный запрос,
  можно сделать отдельной сессией, если нужно.

### 2026-07-05 — Claude (LinkedIn шаг 11 не проходился + заметки миссий не сохранялись в Notes)

Пользователь переписал `+Window_functional.md` (описание финальной 5-вкладочной
структуры Journey/Playbook/Notes/World/Profile — это concept-документ на
будущее, не задача этой сессии) и сообщил два конкретных бага:

1. **LinkedIn, узел `linkedin-optimization` (11-й узел по счёту от начала
   маршрута) — заполнено всё, но "Complete Mission" всегда даёт "Not quite
   there yet".**
   **Найдено:** это единственная во всём `TASK_LIBRARY` задача типа
   `MULTIPLE_CHOICE` (`task-linkedin-quiz`, `validationType.correct: 'b'`).
   `MissionScreen.tsx` не имеет и никогда не имело UI выбора варианта
   ответа — для любого типа задачи рендерится один и тот же
   textarea/чеклист/звёзды и отправляется `{ text, checked, score }`.
   Хуже: `VALIDATION_RULES.MULTIPLE_CHOICE` в `task_execution_engine.ts`
   даже не сверял payload с `validationType.correct` — просто делал
   `String(payload)` (весь объект) и сравнивал с литералом `'correct'`,
   что никогда не совпадает → `quality` максимум `0.7`, порог успеха
   `0.8` физически недостижим. Узел не мог продвинуться ни при каком
   вводе пользователя.
   **Исправлено:** `task_content_engine.ts` — `task-linkedin-quiz`
   переведена на `type: 'TEXT_TASK'` (паттерн, который уже использует
   каждый другой узел в проекте), `validationType` → `min_length: 40`,
   текст задания переписан на открытый вопрос вместо вариантов ответа.
2. **Заметки, которые пишутся в поле "Your Notes" на каждом шаге миссии,
   не попадают в Notes.**
   **Найдено:** текст из `textarea` в `MissionScreen` использовался
   только как payload для `submitTask()` (grading) и нигде не сохранялся
   — `addNote()` вызывался исключительно вручную из `NotesScreen.tsx`,
   когда пользователь сам создаёт заметку через `+`. Заметки миссий
   физически никогда не писались в `notes_store`.
   **Исправлено:** `MissionScreen.tsx`, `handleSubmit()` — при каждой
   отправке миссии с непустым текстом теперь вызывается `addNote()` с
   `chapterId: runtimeState.activeChapterId`, `nodeId: activeNodeId`,
   `taskId: activeTask.id`, `title: activeTask.title` — теми же полями,
   по которым `NotesScreen.tsx` уже группирует заметки по категориям
   (`CATEGORY_ORDER`/`grouped by chapterId`), так что заметка автоматически
   попадает в свою категорию (Resume/LinkedIn/итд), как и было задумано в
   модели `Note` (`chapterId`/`nodeId`/`taskId` там были всегда, просто
   не заполнялись из миссий). Повторная отправка той же миссии (после
   "Try Again") обновляет уже существующую заметку по `taskId`
   (`getNotesByTask` + `updateNote`) вместо создания дубликата на каждую
   попытку.

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
### 2026-07-09 — OpenCode (глобальная замена эмодзи → SVG-иконки через Icon компонент)

**Задача:** заменить все декоративные эмодзи в JSX на `<Icon>` компонент с SVG-иконками.

**Что сделано:**
1. **Icon.tsx** расширен с 17 до 29 иконок: добавлены `book`, `lock`, `party`, `clock`, `lightbulb`, `refresh`, `close`, `check`, `settings`, `mail`, `person`, `briefcase` (Feather-style SVG).
2. **30 файлов изменены** через 6 параллельных батч-агентов, ~100+ эмодзи заменены:
   - **Навигация:** BottomNavigation (🧭→map, 📖→book, 📝→resume, 🌍→map, 👤→person), JourneyBottomNav (🗺→map, ⭐→star, 📊→chart, 👤→person), JourneyPath (🔒→lock, ✓→check, 🧑→person), HelpBar (💡→lightbulb, 📖→book), FloatingMissionCard (✕→close, ★→star), MissionCard (⏱→clock, ★☆→star)
   - **JourneyScreen:** JourneyCompleteScreen (✓→check), ChapterCompleteScreen (🎉→party), FinalCinematicScreen (🏙️→city), ResultCard (🎉→party), MissionReview (✓→check)
   - **Экраны:** DashboardScreen (🎉→party), IntroJourneyScreen (📄→resume, 💼→briefcase, 📨→mail, 🎤→microphone, 🏆→trophy), PlaybookScreen (✕→close, 📚→book), NotesScreen (✕→close, 📝→resume)
   - **Mission:** MissionScreen (✕→close, ☑️/✓→check, 📖→book, ★→star), TaskCompleteScreen (🏆→trophy, 🎉→party, 🗺️→map, 🕐→clock, 📋→resume), MissionCard (🎯→target), SuccessScreen (⭐→star, ✓→check)
   - **Онбординг/Профиль/Шэринг:** OnboardingScreen (🧭→map, ✓→check, 💼→briefcase, ⭐→star, 🎯→target, ⚙️→settings), ProfileScreen (✕→close, ⚙️→settings, 🧭→map, 🔒→lock, 🔗→linkedin), ShareScreen (✕→close, 🧭→map, 📋→resume, 📄→resume, 📊→chart)
   - **Interview:** InterviewTrainerScreen (🎤→microphone, ⏱️→clock, ✕→close, 🔄→refresh), InterviewResultsScreen (★☆→star, 📖→book, 🎉→party, 📈→chart), InterviewTrainer (🔁→refresh, ✓→check, 🎉→party)
3. **BottomNavigation** и **JourneyBottomNav**: данные изменены с `icon: '🧭'` на `icon: 'map'`, рендеринг через `<Icon name={tab.icon} />`.
4. **IconButton** (`src/components/layout/IconButton.tsx`): проп `icon` расширен до `ReactNode` для передачи `<Icon>`.

**Не тронуты:**
- Функциональные UI-символы (← → ▶ ▼ ▲ ☰)
- Эмодзи в plain-строках (core service файлы: `task_content_engine.ts`, `share_service.ts`)
- Эмодзи без SVG-аналога (⚠, ✏️, ✎, 🚀, 🔊, 🖼, 🧪, 💪, 📅, 🎓, ○, □)
- Уровень рендеринга WorldRenderer (`LevelRenderer.tsx` — данные, не JSX)

**Verified:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто (0 ошибок).

**Не проверено вживую на устройстве** — нужно: (а) открыть
`linkedin-optimization`, написать заметку 40+ символов, убедиться, что
узел проходит и открывается `profile-photo`; (б) пройти любую миссию,
затем открыть Notes → убедиться, что заметка появилась под правильной
категорией главы.

### 2026-07-04 — Claude (двадцать третья сессия — MissionScreen показывал "Mission Complete!" даже когда узел не продвинулся)

После фикса персистентности (сессия 22) пользователь сообщил: проценты
теперь сохраняются, но перехода на второе задание всё ещё нет — после
прохождения первого задания счётчик должен показывать "Resume 1/7", а
показывает "0/7".

**Найдено:** это не откат состояния, а маскировка результата в UI.
`task_execution_engine.ts` даёт узлу реально продвинуться (`state` →
`confidence`) только при оценке `success` (quality ≥ 0.8, для TEXT_TASK —
это ≥40 символов заметки). При оценке `partial` или `fail` узел остаётся
на месте — и по замыслу двадцать первой сессии это теперь правильно не
даёт прогресс главы (`chapterProgress` начисляется только если
`skillTransition.changed`). Но `MissionScreen.tsx` при ЛЮБОЙ не-error
оценке от `MISSION_RESULT` показывал один и тот же экран "Mission
Complete!" с кнопкой "Continue Journey" — пользователь не мог отличить
реальный успех от partial/fail и не понимал, почему счётчик не растёт и
следующий узел не открывается: он был уверен, что первое задание пройдено.

**Исправлено:**
- `src/core/skill_engine.ts` — `MISSION_RESULT` теперь несёт не только
  `success`, но и `advanced` (реальный `skillTransition.changed`),
  `feedback` и `recommendation` из уже посчитанного `TaskResult`.
- `src/screens/MissionScreen/MissionScreen.tsx` — добавлено состояние
  `retry`, отдельное от `completed`. Экран "Mission Complete!" показывается
  только если `advanced === true`. Иначе — экран "Not quite there yet" с
  текстом фидбэка/рекомендации от grading-движка (тот же текст, что уже
  считался, но раньше нигде не показывался) и кнопкой "Try Again",
  возвращающей к тому же заданию для повторной попытки — а не иллюзией
  прогресса через "Continue Journey".
- `MissionScreen.css` — стили для нового состояния (тёмный фон → светлый
  текст, как требует главное правило проекта).

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Не проверено вживую на устройстве** — нужно написать короткую заметку
(<40 символов) и увидеть экран "Not quite there yet" вместо ложного
"Mission Complete!", затем дописать заметку до порога и убедиться, что
появляется настоящий успех, узел продвигается, счётчик показывает 1/7 и
открывается `achievement-framing`.

### 2026-07-04 — Claude (двадцать вторая сессия — корневая причина: submitTask не сохранял runtime)

Пользователь сообщил, что после фикса из предыдущей сессии
`achievement-framing` всё ещё не открывается, и дополнительно — что при
перезапуске приложения проценты прогресса обнуляются. Это оказалась одна
и та же причина.

**Найдено:** `submitTask()` в `src/core/runtime/runtime_controller.ts` —
единственная точка входа, через которую проходит завершение миссии
(`skill_engine.ts` → `submitTask`) — обновляет `nodeStates`,
`confidenceScore`, `readinessScore`, `chapterProgress` только в
module-level переменной `runtimeState`, но **никогда не вызывает
`saveRuntime()`**. В отличие от неё, `setActiveNode`, `advanceChapter`,
`advanceNode`, `startJourney` — сохраняют. В результате: любое
продвижение узла (например, `positioning-clarity` → `awareness` на
`achievement-framing`) существовало только в памяти текущей сессии
приложения; при следующей загрузке `App.tsx` вызывает `loadRuntime()` и
получает последний реально сохранённый снимок — который не включает
последнюю(-ие) пройденную(-ые) миссию(и). Отсюда оба симптома: "проценты
обнуляются" и "следующий узел не открывается" (он и правда не был
разблокирован в сохранённых данных).

**Исправлено:** добавлен вызов `saveRuntime(runtimeState)` в конце
`submitTask()`, после применения результата задания и до всех проверок
завершения главы/путешествия.

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Не проверено вживую на устройстве** — нужно пройти миссию, закрыть
приложение полностью (не просто свернуть) и открыть заново, убедиться,
что прогресс и разблокированный узел сохранились.

### 2026-07-04 — Claude (двадцать первая сессия — прогресс-баг / обязательная заметка / achievement-framing)

Пользователь сообщил три связанных симптома:
1. При повторном прохождении одной и той же миссии (например, Resume)
   проценты прогресса главы складываются, а не отражают фактическое
   состояние.
2. Complete Mission можно нажать, не написав заметку — достаточно отметить
   чекбокс или поставить звезду.
3. После Continue Journey не активируется следующий узел ("Achievement
   Framing" — это реальный узел `achievement-framing` в главе Resume,
   идущий сразу после `positioning-clarity`, а не отдельная фича
   геймификации, как можно было подумать по названию).

**Найдено и исправлено (все три — проявления одной причинно-следственной цепочки):**

- `src/core/runtime/runtime_controller.ts`, `submitTask()` — `chapterProgress`
  прибавлялся на `chapterProgressDelta` при КАЖДОМ сабмите миссии,
  независимо от того, продвинулся ли узел реально (`skillTransition.changed`).
  Теперь прибавляется только если состояние узла действительно изменилось.
- `src/core/task/task_execution_engine.ts`, `TEXT_TASK` валидатор — пустая
  заметка раньше засчитывалась как `partial` (quality 0.5, +5% прогресса,
  +0.05 confidence). Теперь пустая заметка — явный `fail` (0, без
  продвижения узла).
- `src/screens/MissionScreen/MissionScreen.tsx` — `canSubmit` раньше
  включался чекбоксом ИЛИ звездой ИЛИ текстом (любое одно из трёх).
  Теперь требуется именно текст заметки; чеклист и звёзды — как и было
  задумано в подсказке под textarea — остаются необязательным
  самоконтролем поверх заметки, а не заменой ей.
- `src/screens/JourneyScreen/JourneyHUD.tsx`, `handleNodeSelect()` — узел
  в состоянии `confidence`/`execution` (уже пройден) можно было открыть
  повторно и пересдать его миссию. Это и было прямой причиной симптома
  №3: пользователь физически пересдавал `positioning-clarity` снова и
  снова (набирая проценты по багу №1) вместо перехода на реально
  разблокированный `achievement-framing`. Теперь клик по завершённому
  узлу показывает тост "This step is already complete." вместо повторного
  открытия миссии.

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Не проверено вживую на устройстве** — нужно пройти Resume-главу заново
на телефоне и убедиться, что после `positioning-clarity` открывается
именно `achievement-framing`, а не тот же узел, и что % главы больше не
растёт при попытке повторного тапа по пройденному узлу.

### 2026-07-04 — Claude (двадцатая сессия — задание.txt проверка)

Задача: перечитать `задание.txt` (WORLD SCREEN REDESIGN — экран World не
должен ощущаться как "экран внутри экрана", один вертикальный скролл,
никаких вложенных scroll-контейнеров) и проверить, полностью ли требования
выполнены в текущем `HEAD`.

**Проверено по каждому пункту задания:**
- World занимает весь экран, `WorldRenderer` рендерится в `App.tsx` на
  `position: fixed; inset: 0` под всем остальным — фон мира на 100% экрана.
- `JourneyHUD` (`.journey-hud`) прозрачный, накладывается поверх мира,
  `pointer-events` включены только у его прямых детей — карточки не
  перекрывают мир видимым контейнером.
- HUD показывает только одну активную главу (`ChapterHub` принимает
  `chapter: ChapterData | null`, не список) — уже сделано в двенадцатой
  сессии, всё ещё так.
- `.journey-screen` — единственная область скролла экрана World
  (`height: 100vh; overflow-y: auto`), вложенных `overflow-y:auto` внутри
  неё в живом дереве компонентов нет: `.journey-world` (обёртка камеры)
  использует `overflow-y: visible`, у используемого `JourneyPath.css`
  (`src/screens/JourneyScreen/components/`) никакого своего скролла нет.
  `.journey-complete-overlay` внутри неё — `position: fixed`, то есть не
  участвует в потоке/скролле родителя, это отдельный full-screen оверлей,
  а не "контейнер в контейнере".

**Найдено и исправлено — мёртвый CSS от старой list-архитектуры:**
`.journey-scroll` / `.journey-mission-cards` / `.journey-mission-card` в
`JourneyScreen.css` использовались только `src/components/JourneyPath/
JourneyPath.tsx` — компонентом, который проверен через `madge` от
`src/main.tsx` и подтверждённо недостижим (мёртвый код, не тот
`JourneyPath`, что реально используется — используется
`src/screens/JourneyScreen/components/JourneyPath.tsx`, у него свой
`JourneyPath.css` без скролла). Удалены все три правила из
`JourneyScreen.css`.

**Проверено:**
- `npx tsc --noEmit` — чисто.
- `npx vite build` — чисто (`dist/assets/index-*.css` собирается без ошибок).
- **Не проверено вживую на телефоне** — изменение только CSS-чистка мёртвых
  правил, поведения экрана не меняет (эти классы нигде не рендерились в
  живом дереве), поэтому визуальной регрессии не ожидается, но финальная
  визуальная проверка на устройстве — как всегда, дело следующего живого
  прогона.

**Честный статус по 10 пунктам `задание.txt` (по коду, не по живому
устройству — не выдавать это за полное закрытие задания):**

1. Screen Ownership (нет белого контейнера/своего скролла) — ✅ по коду.
2. World Owns The Screen (фон мира 100%, HUD поверх) — ✅ по коду.
3. Camera Scroll (скролл ощущается как движение камеры, а не список) —
   🟡 частично. Камера двигается (`useCamera`) при переходе между главами
   (celebrate→bridge→advance), но обычный жест скролла внутри
   `.journey-screen` — это штатный браузерный `overflow-y:auto`, а не
   camera-driven прокрутка на каждый свайп. Буквально пункт 3 ("при
   вертикальном движении пользователь должен ощущать перемещение камеры")
   не реализован как непрерывный эффект — только как разовая анимация
   между главами.
4. Active Island Layout (одна активная глава) — ✅ по коду.
5. Mission Cards как часть острова, не отдельного контейнера — ✅ по
   структуре компонентов, **не проверено визуально**.
6. Vertical Composition (Sky→Environment→Island→Cards→SafeArea→Nav) —
   🟡 не проверялось в этой сессии — это про арт/композицию
   `WorldRenderer`, вне периметра CSS-чистки, которую делала эта сессия.
7. Safe Area (nav не перекрывает последнюю карточку) — 🟡 есть
   `padding-bottom: calc(24px + env(safe-area-inset-bottom) + 80px)` в
   `.journey-world` — похоже на попытку решения, но **не проверено на
   реальном устройстве**, что последняя карточка полностью видна.
8. Scrolling (один вертикальный scroll, без nested scroll) — ✅ по коду,
   подтверждено в этой сессии (убран последний мёртвый CSS-остаток).
9. Remove Temporary UI (мёртвый CSS от старого списка) — ✅ сделано в
   этой сессии.
10. Acceptance Criteria — совокупно зависит от пунктов 3, 6, 7, которые
    **не подтверждены живым тестом на устройстве**.

**Вывод: закрыто уверенно — пункты 1, 2, 4, 5, 8, 9. Требуют живой
проверки на устройстве (и, возможно, доработки) — пункты 3, 6, 7, 10.**
Следующая сессия/Product Owner должны явно решить: (а) реализовывать ли
непрерывный camera-scroll эффект (пункт 3) как отдельную архитектурную
задачу, а не CSS-патч — задание прямо это запрещает ("Не исправлять это
CSS-костылями"); (б) проверить на телефоне safe-area под последней
карточкой (пункт 7) и вертикальную композицию (пункт 6) визуально, не
по коду.

### 2026-07-04 — Claude (девятнадцатая сессия)

Пользователь сообщил: после завершения главы переход к следующей не
происходит.

**Контекст решения из восемнадцатой сессии оказался неокончательным.**
Восемнадцатая сессия зафиксировала: «лестницу [5 успешных попыток на узел]
оставляем как есть». Позже, в отдельном диалоге, пользователь пересмотрел
это решение и попросил перейти на модель **"1 успешная попытка = узел
пройден"** — потому что вторая попытка на том же задании выглядит
идентично первой (нет видимого прогресса) и воспринимается как баг, а не
как фича. Это более новое и окончательное решение (подтверждено
пользователем явно в этой сессии, переспросил перед пушем, чтобы не
перезаписать сознательный выбор из записи №18 вслепую).

**Найдено: сам факт "не завершилось" был прямым следствием того, что
переход на модель "1 попытка" не был доведён до конца.** `STATE_FLOW`
(`src/core/skill_state.ts`) всё ещё вёл узел через полную лестницу
`awareness → understanding → application → readiness → execution →
confidence`. Хуже: даже если бы `STATE_FLOW` поменяли, это было бы
недостаточно — оказалось, что `nextState` при разблокировке узла
устанавливается **не динамически через `STATE_FLOW`, а захардкожен
`'understanding'`** сразу в трёх местах и один раз в статичных данных
профессии. Плюс — в `runtime_controller.ts` жила **отдельная
задублированная копия** той же карты переходов (`getNextState()`),
не синхронизированная с `src/core/skill_state.ts` (ровно то дублирование
систем, от которого предостерегает `CORE_MAP.md`). В сумме: последний узел
главы физически не мог дойти до `confidence` за 1 попытку, `isChapterCompleted()`
всегда возвращал `false`, и `JourneyHUD` никогда не запускал
celebrate → bridge → `advanceChapter()`.

**Исправлено (5 мест, все переведены на модель "1 успех = confidence"):**
- `src/core/skill_state.ts` — `STATE_FLOW`: `awareness`/`understanding`/
  `application`/`readiness`/`execution` теперь все ведут напрямую в
  `confidence` вместо пошаговой лестницы. Промежуточные значения остаются
  в типе `SkillState` только для текстов советов (`node.advice[state]`).
- `src/core/runtime/runtime_controller.ts` — удалена задублированная
  локальная `getNextState()`, теперь везде импортируется и используется
  единый `STATE_FLOW` из `skill_state.ts`. Два места, где разблокировка
  узла хардкодила `nextState: 'understanding'` (симметричная разблокировка
  следующего узла в главе и `advanceChapter()`), теперь ставят
  `nextState: 'confidence'`.
- `src/core/runtime/journey_runtime.ts` — разблокировка входного узла
  профессии при старте: тот же хардкод `'understanding'` → `'confidence'`.
- `src/professions/software_engineer/skill_nodes.ts` — узел
  `headline-authority` (единственный в статичных данных, у которого
  `state` изначально `'awareness'`, а не `'locked'`) — та же правка.

`npx tsc --noEmit` — чисто (одна попутная правка: убран более не нужный
импорт `SkillState` в `runtime_controller.ts`).

**Не проверено вживую на телефоне.** Проверить: пройти любой узел одной
успешной попыткой (развёрнутый ответ 40+ символов) → узел должен сразу
получить `confidence`, следующий узел в главе — разблокироваться и стать
активным; на последнем узле главы должен запуститься экран
"Chapter Complete" → bridge-анимация → переход в следующую главу с её
первым узлом уже разблокированным и активным.

### 2026-07-04 — Claude (восемнадцатая сессия)

Пользователь после предыдущего фикса сообщил: "Mission Complete" появляется,
но кнопка "Continue Journey" **проваливается под нижнее меню** (нажать
невозможно), а если всё же нажать — попадаешь в общий World, где **следующее
задание не активируется**.

**Баг 1 — кнопка под нижним меню (подтверждён и исправлен).**
`MissionScreen.css` уже содержал корректный отступ под плавающий `BottomNav`
(`calc(32px + 80px + safe-area)`) в базовом правиле `.mission-bottom`, но
**медиа-запрос `@media (max-width: 480px)`** (это покрывает практически ЛЮБОЙ
реальный телефон) переопределял его обратно на плоские `24px`, полностью
убирая защитный отступ именно там, где он важнее всего. Исправлено: мобильный
медиа-запрос теперь тоже учитывает высоту `BottomNav`.

**Баг 2 — следующий узел не "активируется" (подтверждён и исправлен).**
Когда фикс из прошлой сессии разблокировал следующий узел в главе
(`state: locked → awareness`), он не переключал `runtimeState.activeNodeId`
на этот узел — в отличие от `advanceChapter()` (переход между главами),
который делает оба действия разом. Из-за этого в мире "текущим" оставался
уже пройденный узел, и по новому узлу нужно было тапнуть дважды: первый тап
только фокусировал камеру, второй — открывал миссию. Выглядело это как
"не активируется". Исправлено симметрично: разблокировка следующего узла
теперь сразу переключает и `activeNodeId`.

**Баг 3 — куда более серьёзный, найден при повторной проверке (подтверждён
и исправлен): текстовые и self-assessment задания оценивались не по тому,
что реально ввёл пользователь.** `MissionScreen` отправляет в
`submitTask()` объединённый объект `{ text, checked, score }`, а
`VALIDATION_RULES.TEXT_TASK` в `task_execution_engine.ts` делал
`String(payload)` на **весь этот объект**, получая литеральную строку
`"[object Object]"` — оценка текста НЕ ЗАВИСЕЛА от того, что реально
написал пользователь, сколько бы он ни печатал. Аналогично
`SELF_ASSESSMENT`: `Number(payload)` на объект = `NaN` → всегда дефолтный
балл 3/5, звёзды самооценки на результат не влияли. Подтверждено
скриптовым прогоном реального кода: даже развёрнутый 150-символьный ответ
раньше давал `success: false`. Исправлено: оба валидатора теперь достают
нужное поле (`.text` / `.score`) из объекта, с обратной совместимостью для
других мест кода, которые уже передают "сырую" строку/число напрямую
(`InterviewTrainerScreen.tsx` — там своя, отдельная и пока не связанная с
этим, проблема с полем `.text`, за рамками текущей задачи).

**Дизайн-вопрос, поднятый и решённый с пользователем:** чтобы узел дошёл
до состояния `confidence` (и разблокировал следующий), нужно **5 успешных
попыток подряд** на одном и том же задании (лестница
`awareness → understanding → application → readiness → execution →
confidence`, `src/core/skill_state.ts`). При этом заголовок в
`MissionScreen` ("Day N") реализован как счётчик узлов в состоянии
`confidence`/`execution` — то есть в другом месте кода уже заложена модель
"один узел = один день", что противоречит 5-шаговой лестнице. Пользователь
решил: **лестницу оставляем как есть**, но интерфейс сейчас не объяснял,
от чего зависит переход (самооценка? чек-лист?) — из-за бага №3 это было
буквально непонятно, так как ни чек-лист, ни звёзды на результат не влияли
вообще для текстовых заданий. Добавлена честная подсказка под полем
заметки: живой счётчик символов до порога полного балла (40 символов) и
явное пояснение, что чек-лист/звёзды не влияют на прогресс по этому типу
задания. Файлы: `MissionScreen.tsx`, `MissionScreen.css`.

`npx tsc --noEmit` / `npx vite build` — чисто. Все три бага подтверждены
скриптовыми прогонами реального кода (`tsx repro*.ts`, скрипты не
коммитились — временные, для диагностики), не только чтением кода.

**Не проверено вживую на телефоне.** Проверить: пройти positioning-clarity
5 раз подряд развёрнутым ответом (40+ символов) → на 5-й раз должен
разблокироваться и стать активным следующий узел главы (achievement-framing),
кнопка Continue Journey должна быть полностью видна и нажимаема на реальном
экране, не под нижним меню.


### 2026-07-04 — Claude (семнадцатая сессия)

**Найдена настоящая причина "Something went wrong" на Complete Mission**
(предыдущие сессии проверяли "нет ли брошенного исключения" — его
действительно нет, но это была не та гипотеза).

**Причина:** `src/core/skill_engine.ts` эмитит
`MISSION_RESULT { success: result.success ?? false }`, где
`result.success` — это `true` **только** если внутренний движок оценки
(`task_execution_engine.ts`, `VALIDATION_RULES.TEXT_TASK`) посчитал текст
"качественным" (для текстовых задач: `text.length / 50 >= 0.8`, то есть
**от 40 символов**). Любой более короткий, но совершенно нормальный ответ
пользователя оценивается как `'partial'` → `success: false` — это
**легитимный бизнес-исход** (задача обработана, просто не идеально), а НЕ
ошибка. Но `MissionScreen.tsx` трактовал **любой** `success: false` как
фатальный сбой: показывал "Something went wrong. Try again." и не переводил
`taskView` в `'completed'` → кнопка "Continue Journey" не появлялась →
перехода дальше не было. Подтверждено скриптовым прогоном реального кода
(`tsx`, не гипотеза): текст "Backend engineer with 5 years experience"
(42 символа, вполне нормальный ответ) → `success: false`, `score: 50`,
никакого исключения не бросается.

**Исправлено:** `MissionScreen.tsx` — обработчик `MISSION_RESULT` теперь
показывает ошибку **только** если пришло реальное поле `error` (то есть
действительно было брошено исключение в `skill_engine.ts`, `catch` ветка).
Если `error` нет — независимо от `success: true/false` — считаем миссию
обработанной и переводим в `taskView: 'completed'`, чтобы пользователь мог
продолжить. Заодно проброшен реальный текст ошибки в UI на случай, если
`error` всё же придёт (`Something went wrong. Try again. (детали)`) — чтобы
больше не приходилось гадать вслепую, если возникнет настоящее исключение.

`npx tsc --noEmit` / `npx vite build` — чисто.

**Известное следствие, не баг:** при коротком ответе (< 40 символов) узел
не продвинется по skill-state (`awareness → confidence` не произойдёт,
т.к. это требует `'success'`, а не `'partial'`) — это ожидаемое поведение
дизайна (нужно ответить более развёрнуто, чтобы получить полный прогресс),
не путать с тем багом, который был исправлен здесь.

**Не проверено вживую на телефоне.**


### 2026-07-04 — Claude (шестнадцатая сессия)

**Баг:** в Notes удалённая заметка визуально оставалась на экране —
исчезала только после выхода и повторного входа в Notes.

**Причина (классический React antipattern — мутация состояния в обход
setState):** `notes_store.ts` хранил заметки в одном module-level массиве
и `getNotes()` возвращал **одну и ту же ссылку** на этот массив при каждом
вызове (не копию). `notes_controller.ts` — `addNote`/`updateNote`/
`deleteNote` — мутировали этот массив на месте (`push`, `splice`,
присваивание по индексу) вместо создания нового массива. `NotesScreen.tsx`
хранит список в React state и обновляет его через
`refresh = () => setNotes(getAllNotes())` по событию `NOTE_DELETED`.
Поскольку `getAllNotes()` возвращал **тот же самый объект-ссылку**, что уже
лежал в state компонента (просто мутированный на месте), React через
`Object.is`-сравнение видел "тот же объект" и **пропускал ре-рендер**,
хотя содержимое массива уже изменилось. Ре-рендер происходил только при
размонтировании/повторном монтировании `NotesScreen` (выход и вход) —
тогда `useState([])` инициализировался заново и `refresh()` при монтировании
уже получал видимо "новый" (на деле тот же, но React в этот момент не
сравнивает с чем-то старым) массив.

**Исправлено:** `src/core/user_data/notes/notes_controller.ts` —
`addNote`/`updateNote`/`deleteNote` переписаны на иммутабельные операции
(`[...arr, x]` / `.map()` / `.filter()`), каждая теперь создаёт новый
массив-объект при любом изменении. Дополнительно в
`src/core/user_data/notes/notes_store.ts` — `getNotes()` теперь возвращает
`[...notes]` (копию), а не прямую ссылку на внутренний массив — защита от
повторения той же ошибки, если кто-то ещё в коде мутирует результат
`getNotes()` напрямую.

`npx tsc --noEmit` / `npx vite build` — чисто.

**Не проверено вживую на телефоне.** Проверить: Notes → создать заметку →
удалить → заметка должна исчезнуть немедленно, без выхода из экрана.


### 2026-07-04 — Claude (пятнадцатая сессия)

Пользователь сообщил два симптома на узле Positioning Clarity:

**1. Невидимый текст в поле заметки — подтверждено и исправлено.**
`.task-textarea` в `MissionScreen.css` не имел собственного `color`. Всё
приложение задаёт глобально `body { color: white }` (тёмная тема,
`src/index.css`), а карточка миссии светлая (`background: #f8f9fa`) —
получался белый текст на светлом фоне, невидимый при вводе. Добавлен
`color: #2d3436` и `::placeholder { color: #b2bec3 }` в
`src/screens/MissionScreen/MissionScreen.css`.

**2. "Something went wrong" на Complete Mission — код перепроверен,
не воспроизведён в текущей версии репо.** Написал и прогнал скрипт,
дословно симулирующий реальный флоу пользователя (регистрация профессии
через `profession_auto_loader`, `startJourney`, `loadTaskForNode` +
`createTaskFromDefinition` как теперь делает `MissionScreen` после
фикса из четырнадцатой сессии, затем `submitTask` с реальным payload) —
submit прошёл чисто, без исключения, на коммите `84157df`+. Это значит,
причина скорее всего не в коде, а в том, что **dev-сервер (`npm run dev`)
не был полностью перезапущен** после `git pull` — модуль
`runtime_controller.ts` хранит состояние (`activeTask`, `runtimeState`)
на уровне переменных модуля, а не в React state, и такие singleton-модули
не всегда переживают Vite HMR корректно: возможна ситуация, когда часть
модулей "горячо" заменяется, а часть — нет, и в памяти остаётся смесь
старой и новой логики.

**Пользователю передано:** полностью остановить и заново запустить
`npm run dev` (не просто обновить страницу в браузере) перед повторной
проверкой обоих багов.

**Если после чистого перезапуска "Something went wrong" всё ещё
воспроизводится** — это будет означать, что гипотеза про HMR неверна и
есть третья, ещё не найденная причина. В таком случае следующему агенту
нужно: (а) добавить временный `console.error` в перехват `catch (err)` в
`src/core/skill_engine.ts` (`MISSION_SUBMIT` handler) вместо
`String(err)`, чтобы увидеть реальный стек в консоли браузера — сейчас
эта деталь нигде не выводится в UI и гасится; (б) проверить порядок
эффектов в `MissionScreen.tsx`, если баг проявляется именно на ПОВТОРНОЙ
попытке в рамках одной сессии, а не на первой.


### 2026-07-04 — Claude (четырнадцатая сессия)

**Критический баг:** на узле "Positioning Clarity" (World tab), нажатие
"Complete Mission" всегда выдавало "Something went wrong. Try again." —
миссию нельзя было пройти вообще.

**Причина:** `MissionScreen` рендерился для активного узла, но нигде — ни
сам экран, ни `JourneyHUD` — не вызывал `loadTaskForNode`/
`createTaskFromDefinition` для старта задачи. Модуль `runtime_controller.ts`
хранит `activeTask` как приватную переменную уровня модуля; она оставалась
`null`. По нажатию Complete Mission `submitTask()` (в `runtime_controller.ts`)
бросает `throw new Error('No active task')`, если `activeTask` не установлен
— это перехватывается в `skill_engine.ts` (`MISSION_SUBMIT` handler) и
превращается в `MISSION_RESULT { success: false, error }`, которое
`MissionScreen.tsx` показывает как "Something went wrong. Try again."
**Это не редкий баг — он гарантированно воспроизводится на любой первой
попытке пройти любую миссию**, поскольку задача никогда не стартовала.

Исправлено: `MissionScreen.tsx` теперь при монтировании/смене
`activeNodeId` явно вызывает `loadTaskForNode(activeNodeId)` →
`createTaskFromDefinition(definition)`, если для этого узла ещё нет
активной задачи (`getActiveTask()?.nodeId !== activeNodeId`) — тот же
паттерн, что уже использовался в legacy-пути `advanceNode()` в том же
файле. Файлы: `src/screens/MissionScreen/MissionScreen.tsx`.

`npx tsc --noEmit` / `npx vite build` — чисто.

**Не проверено вживую на телефоне** — фикс сделан по анализу кода (путь
"submit без предварительного start"), не воспроизводился локально пошагово
через UI в этой сессии из-за ограничений окружения. Следующий шаг —
пользователь проверяет на устройстве: открыть World → Positioning Clarity →
пройти задачу до конца → Complete Mission. Если ошибка всё ещё
воспроизводится — прислать точный текст любой ошибки в консоли/logcat,
не только сообщение на экране, так как "Something went wrong" — это общий
catch-all, реальная причина может быть другой (см. `error: String(err)`
в `MISSION_RESULT`, эта деталь никуда не выводится в UI, только гасится).


### 2026-07-04 — Claude (тринадцатая сессия — Stabilization Sprint Final)

Задача от ChatGPT (`задание.txt`): закрыть фазу Stabilization. Правило
задачи: никаких новых фич, рефакторинга, редизайна, изменений архитектуры —
только довести существующее до рабочего состояния.

**Расхождение с реальным кодом (зафиксировано с пользователем перед стартом):**
`задание.txt` требовал 5 вкладок нижней навигации (Journey, World, Playbook,
Notes, Profile). В реальном коде их 4: **World, Playbook, Notes, Share**.
Пользователь подтвердил: это не баг, а устаревший текст задачи. Journey —
не отдельный экран, он часть World (JourneyHUD поверх WorldRenderer, см.
двенадцатую сессию). Profile в MVP не нужен (появится позже вместе со
статистикой/достижениями/аккаунтом). **Текущая навигация MVP — источник
истины, не чек-лист.** Дальше по чек-листу пункты, завязанные на Journey/
Profile как отдельные вкладки, интерпретировались применительно к реальным
4 вкладкам.

**Найден и исправлен реальный баг (пункт чек-листа "every scroll works" /
"no clipped content"):** `ShareScreen.css` — `.share-screen` не имел
собственного скролл-контейнера (`min-height: 100%` без `overflow-y: auto`),
в отличие от Playbook/Notes, у которых есть отдельный внутренний
скролл-контейнер. На малых экранах карточка (aspect-ratio 1, до 400px) +
4 кнопки экспорта могли не поместиться по высоте и обрезаться внешним
`overflow: hidden` из `App.tsx`, без возможности прокрутить. Добавлено
`height: 100%; overflow-y: auto; -webkit-overflow-scrolling: touch;` —
тот же паттерн, что уже используется в Playbook/Notes.

**Найден и исправлен более серьёзный баг прогресс-движка** (был
задокументирован как известная нерешённая проблема в записи двенадцатой
сессии, напрямую блокировал пункт 10 чек-листа — тест полного флоу
Resume→Bridge→LinkedIn): узлы внутри одной главы (кроме первого)
создаются со `state: 'locked'` и нигде не разблокировались при прохождении
предыдущего узла — `submitTask()`/`applyTaskResultToRuntime()` продвигали
skill-state только самого пройденного узла, следующий узел в той же главе
оставался недостижим через UI навсегда. Добавлена симметричная
разблокировка: когда узел достигает `state: 'confidence'`, движок ищет
следующий `nodeId` в `chapter.nodeIds` (порядок из
`professions/software_engineer/chapters.ts`) и, если он `locked`,
переводит его в `awareness` — тот же паттерн, что уже применялся для
entry-узла маршрута (`journey_runtime.ts`) и для первого узла новой главы
(`advanceChapter()`). Файл: `src/core/runtime/runtime_controller.ts`
(`applyTaskResultToRuntime`).

**Проверено по остальным пунктам чек-листа:**
- Кнопки/интерактивные элементы (Playbook, Notes, MissionScreen,
  BottomNav) — все имеют `onClick`, dead UI не найдено.
- ✕/"← Назад" — присутствуют в Playbook, Notes, MissionScreen. Share и
  World — это сами вкладки нижней навигации (не стек поверх других
  экранов), отдельного ✕/Назад не требуют, как и раньше не требовали.
- `npx tsc --noEmit` — чисто.
- `npx vite build` — чисто.
- Граф импортов не проверялся повторно в этой сессии (не менялась
  структура модулей, только логика внутри существующих файлов).

**Не проверено вживую на телефоне** — как и во всех предыдущих сессиях,
фикс прогресс-движка и скролла в Share нужно визуально подтвердить на
реальном устройстве, прежде чем считать Stabilization окончательно
закрытым на практике (не только по коду/сборке).

**Статус фазы:** согласно `задание.txt`, все 10 пунктов чек-листа
адресованы на уровне кода/сборки → фаза `Stabilization` отмечена
закрытой (`☑`) в шапке этого файла, следующая — `World Design`. Пока
пользователь не подтвердит на устройстве — считать это "готово по коду",
не "подтверждено в проде".


### 2026-07-03 — Claude (одиннадцатая сессия)

Задача: почистить мёртвый код в `src/core` (был отдельно поднят в `CORE_MAP.md`
как известная проблема — десятки файлов от прошлых архитектурных итераций).

**Важно для следующего агента:** предыдущая версия `CORE_MAP.md` определяла
"живость" файла грубым `grep` по прямым путям импорта — этот метод не видит
транзитивные импорты через `index.ts`-барели и мог давать ложные "used_by=0".
В этой сессии вместо grep использован реальный граф импортов от точки входа
приложения (`src/main.tsx`), построенный инструментом `madge` — то есть каждый
файл в списке "живых" подтверждённо участвует в сборке, а не просто где-то
формально импортируется.

- Построен полный граф зависимостей от `src/main.tsx` (`madge --json`).
- Сопоставлен со всеми файлами `src/core` (было 158 файлов).
- Найдено 70 файлов, недостижимых из точки входа (не импортируются, прямо или
  транзитивно, ни одним живым модулем) — целиком директории `attempt/`,
  `memory/`, `mobile/`, `onboarding/`, `performance/`, `stability/`, большая
  часть `interaction/`, `runtime/`, `social/`, `premium/`, плюс россыпь
  одиночных файлов (`chapter_view_model.ts`, `readiness_dashboard.ts` и т.д.)
  и все "пустые" `index.ts`-барели, которые сами никуда не подключены.
- Проверено: перед удалением — что в `src` нет динамических `import()` по
  строковым путям внутрь `core` (единственный найденный dynamic import в
  проекте — `professions/loader/profession_loader.ts`, не относится к `core`).
- Все 70 файлов физически удалены, пустые директории после них — тоже.
- После удаления: `npx tsc --noEmit` — чисто; `npx vite build` — чисто,
  итоговый бандл (`dist/assets/index-*.js`) побайтово идентичен сборке до
  чистки — подтверждает, что удалённый код действительно нигде не участвовал
  даже косвенно (не только "не импортируется явно", но и не влияет на бандл).
- `CORE_MAP.md` полностью перегенерирован: теперь отражает только 89
  реально живых файлов `src/core`, метод генерации задокументирован в шапке
  файла.
- Осталось 89 живых файлов в `src/core` (было 158) — сокращение почти вдвое.
  Директории `voice/` и `premium/` частично живы (не всё в них мёртвое, как
  предполагала прошлая заметка) — там осталось по несколько подключённых
  файлов, не вся директория целиком.
- **Не тронуто:** `src/screens`, `src/components`, `src/world`,
  `src/professions` — задача касалась только `src/core`, в остальных папках
  мёртвый код (если есть) не проверялся и не удалялся в этой сессии.

### 2026-07-03 — Claude
- Восстановлена связка WorldRenderer + JourneyHUD на вкладке World (была отключена).
- Убран мёртвый `JourneyScreenDebug.tsx` и дублирующий `JourneyBottomNav` (второй роутер через `window.location.hash`, никем не читавшийся).
- Починен ✕ в Notes (раньше не работал).
- Добавлены обязательные ✕/"← Назад" в Playbook (все под-виды), Notes, Mission screen.
- Починены невидимые неактивные иконки нижнего меню (были `text-black` на тёмном стекле).
- Восстановлен "красивый" дизайн нижнего меню (glow-эффект + анимированный индикатор активной вкладки), случайно упрощённый в одной из предыдущих правок.
- Созданы `CORE_MAP.md` и этот файл.

### 2026-07-03 — Claude (вторая сессия, другой аккаунт GitHub, коммит `f673c0d`)

**Важно для следующего агента:** в предыдущей сессии (другой чат/аккаунт) уже была
верно диагностирована причина наложения текста на экране Review (`.intro-text`/
`.intro-stats` — `position: absolute` без `top/left`), а также обсуждался редизайн
нижнего меню и карточек глав — но тот фикс **не был закоммичен**, в `git log`
его не было. Если где-то всплывёт старое обсуждение этой же проблемы —
она уже решена начиная с `f673c0d`, не нужно чинить повторно "на глаз".

Что сделано в этой сессии:

- **Review-экран (`IntroJourneyScreen`)**: исправлено наложение `Software Engineer`
  поверх цифр `38/142/1`. Причина — `.intro-text` (title/profession) и `.intro-stats`
  были `position: absolute` без `top/left`, из-за чего браузер клал их друг на друга
  в одной точке внутри `.intro-overlay-content`. Переведены в обычный flex-поток
  с отступами (`margin-bottom`), анимации opacity/translateY сохранены.
- **Нижнее меню (`BottomNav.tsx`)**: убран тёмный градиент-"занавес" над баром
  (давал эффект похоронной тени). Меню теперь — плавающая скруглённая стеклянная
  капсула (`rounded-full`, мягкая тень + едва заметное свечение), с отступом от
  низа экрана, а не панель во всю ширину. Контраст неактивных иконок/подписей
  поднят с `white/30` до `white/45`.
- **Карточки глав (`.chapter-island` в `JourneyScreen.css`)**: вместо плоского
  серого `rgba(18,22,30,0.62)` — акцентный (по цвету темы главы) радиальный
  градиент + линейный тёмный фон, светящаяся тонкая линия по верхнему краю,
  многослойная тень, усиление свечения на hover. `.island-emblema` (кружок
  иконки) получил акцентное радиальное свечение вместо плоской серой заливки.
- **Шапка вкладки World (`.journey-header`)**: была полностью `background: transparent`,
  из-за чего светлый текст (`#f0f0f5` / `--text-secondary`) мог теряться на светлых
  участках арта мира под ним ("текст светлый на светлом фоне"). Добавлена мягкая
  scrim-подложка (вертикальный градиент, не панель) — текст читается независимо
  от яркости арта.
- Проверено: `npx tsc --noEmit` и `npx vite build` проходят чисто.
- Не проверено вживую на телефоне (только сборка) — при следующем баг-репорте
  сначала визуально сверить, что фикс действительно отрендерился так, как задумано,
  а не просто "похоже похожее описание бага".

### 2026-07-03 — Claude (третья сессия, тот же коммит-поток)

Добавлен механизм, который **технически** не даёт агенту забыть обновить этот
файл (раньше это было только текстовой просьбой в шапке):

- Создан `.githooks/pre-commit` — git-хук, который блокирует коммит, если
  изменены файлы кода/контента, но не изменён `PROJECT_STATUS.md`. Игнорирует
  сам `PROJECT_STATUS.md`, `CORE_MAP.md`, `CAREER_NAVIGATOR_MASTER_CHECKPOINT.md`,
  `.gitignore`, `package-lock.json` (правки только в них не считаются
  "содержательным изменением"). Обходится через `git commit --no-verify` для
  реально тривиальных правок.
- Хук не подключается автоматически при клоне (git hooks не версионируются
  по умолчанию) — нужно один раз выполнить `git config core.hooksPath .githooks`.
  Эта команда прописана в `CAREER_NAVIGATOR_MASTER_CHECKPOINT.md` как
  обязательный первый шаг сессии.
- Ограничение: хук работает только если агент коммитит через `git` из этого
  клона с настроенным `core.hooksPath`. Если агент правит файлы через GitHub
  API/веб-интерфейс напрямую (без локального git commit) — хук не сработает,
  это по-прежнему остаётся на дисциплине агента.
- Протестировано вручную: коммит с изменением `src/index.css` без изменения
  `PROJECT_STATUS.md` был заблокирован (см. вывод хука), после чего откатан.

### 2026-07-03 — Claude (четвёртая сессия)

- **Кнопка "Complete Mission" уходила под нижнее меню** (репортилось на примере
  Resume). Причина: `MissionScreen` — обычный `100vh`-экран в потоке страницы
  (не `position: fixed` с высоким `z-index`, как Playbook/Notes), а `BottomNav`
  всегда `position: fixed; z-index: 50` поверх всего. Кнопка в `.mission-bottom`
  упиралась в самый низ вьюпорта и частично пряталась под плавающую капсулу меню.
  Добавлен нижний зазор `calc(32px + 80px + env(safe-area-inset-bottom))` —
  80px здесь совпадает с уже существующей в проекте конвенцией
  (`.journey-mission-container`, `.start-mission-btn` в `JourneyScreen.css`
  используют то же значение), так что стандарт теперь единый.
  Файл: `src/screens/MissionScreen/MissionScreen.css` (`.mission-bottom`).
- Проверил на всякий случай Playbook/Notes — там `position: fixed; inset: 0;
  z-index: 100`, то есть они физически рендерятся ПОВЕРХ `BottomNav`
  (z-index 50), перекрытия кнопок нет, трогать не пришлось.
- `StepScreen.tsx` и `MissionReview.tsx` — мёртвый код (нигде не импортируются),
  их `Complete Mission`/`I'm Done` в реальности не показываются пользователю;
  не трогал, чтобы не тратить время не по задаче (см. CORE_MAP.md, used_by=0).

### 2026-07-03 — Claude (пятая сессия)

Два независимых бага, оба воспроизводились на вкладке World при листании глав
(репортилось: видно ~2.5 карточки, Resume/LinkedIn, дальше не пролистать;
карточки по-прежнему выглядели плоско-серыми даже после пересборки/`cap sync`).

- **Не было скролла списка глав.** `.journey-screen` был `min-height: 100vh`
  (не `height`), поэтому блок просто растягивался по контенту (выше вьюпорта)
  вместо того, чтобы стать контейнером с внутренним скроллом — `overflow-y: auto`
  на нём был фактически бесполезен, так как внутри него самого ничего не
  переполнялось. Всё, что не влезало в первый экран, обрезал внешний
  wrapper в `App.tsx` (`overflow: hidden`, жёсткий `100vh`), у которого
  своего скролла нет. Исправлено: `.journey-screen { height: 100vh }` —
  теперь это настоящий скролл-контейнер, все карточки глав (Resume, LinkedIn,
  Applications, Interview, Offer) доступны свайпом.
- **Карточки всё ещё выглядели серыми после фикса из прошлой сессии.**
  Вероятная причина: в `.chapter-island`/`.island-emblema` использовался
  `color-mix()` (CSS-функция, стабильна начиная с Chrome/WebView ~111). Если
  System WebView на устройстве старее — браузер **отбрасывает всё правило
  `background`/`border`/`box-shadow` целиком** там, где встретился
  неподдерживаемый `color-mix()`, и карточка остаётся без заливки — визуально
  снова "серая/пустая". Добавлен фоллбэк: перед каждым `color-mix()`-значением
  теперь идёт обычное `rgba()`-значение (тот же файл, `JourneyScreen.css`).
  Старые WebView получат статичный сине-фиолетовый акцент вместо
  per-chapter акцентного цвета, современные — полную версию с `color-mix()`.
- Файлы: `src/screens/JourneyScreen/JourneyScreen.css`
  (`.journey-screen`, `.chapter-island`, `.chapter-island::before`,
  `.chapter-island:hover`, `.island-emblema`).
- `npx tsc --noEmit` и `npx vite build` проходят чисто. Не проверено вживую —
  после пуша нужен полный цикл `npm run build && npx cap sync android` +
  Clean/Rebuild в Android Studio (см. запись выше про Capacitor pipeline).

### 2026-07-03 — Claude (шестая сессия)

После пятой сессии пользователь всё ещё видел серые карточки. Причина
оказалась не в отсутствии заливки (это чинил color-mix-фоллбэк), а в том,
что интенсивность акцента (16–24% прозрачности) была слишком слабой —
на тёмном фоне телефона это визуально читается как "просто тёмно-серый",
даже если технически там есть лёгкий синий/фиолетовый оттенок.

- Поднял интенсивность акцента в `.chapter-island`/`.island-emblema`
  примерно в 2–2.5 раза (16%→42%, 22%→55%, 20%→35% и т.д. — см. diff в
  `JourneyScreen.css`), обновил и rgba-фоллбэки, и color-mix-версии
  синхронно. Верхняя светящаяся кромка стала толще (1px→2px) и непрозрачнее
  (opacity 0.8→1). Теперь цвет должен читаться однозначно, а не "может быть
  чуть-чуть не серый".
- Способ проверки, что фикс реально дошёл до устройства (для следующего
  агента, если жалоба повторится): после `npm run build` найти файл
  `dist/assets/index-*.css` и сделать `grep "42%,transparent"` — если
  строка находится, свежий CSS собрался; если нет — проблема не в дизайне,
  а в том, что сборка/пуш/pull не долетели до этой правки. Дальше сверить,
  что тот же CSS реально попал в `android/app/src/main/assets/public` после
  `npx cap sync android` (тем же grep по файлу в этой папке).

### 2026-07-03 — Claude (седьмая сессия)

**Важно для следующего агента:** предыдущая сессия (другой чат/аккаунт) уже
верно диагностировала баг — но диагностика **не была запушена** (осталась
только в чате, в `git log origin/main` её не было на момент старта этой
сессии). Если увидите похожее обсуждение клавиатуры ещё раз — сверьтесь
сначала с `git log`, возможно, это уже сделано начиная с этого коммита.

**Баг:** при создании заметки (Notes) клавиатура перекрывала кнопку Save;
после сворачивания клавиатуры поле ввода и заголовок "слипались" и
съезжали вниз, кнопка Save оказывалась под нижним меню.

**Причина:** в `android/app/src/main/AndroidManifest.xml` у `<activity>`
не был задан `android:windowSoftInputMode`. Без него Android WebView по
умолчанию не сжимает видимую область при появлении клавиатуры — контент
"наезжает"/дёргается вместо аккуратного resize.

Исправлено:
- `AndroidManifest.xml`: добавлен `android:windowSoftInputMode="adjustResize"`
  на `<activity android:name=".MainActivity">`.
- `NotesScreen.css` (`.notes-drawer`): подстраховка на уровне CSS —
  `max-height: 80vh; overflow-y: auto` + `display:flex;flex-direction:column`,
  чтобы даже при нестандартном поведении клавиатуры на конкретных
  устройствах шторка ограничивала себя по высоте и скроллилась сама,
  а не выталкивала Save за пределы экрана.
- Форма редактирования существующей заметки (инлайн в списке, не отдельная
  шторка) риску не подвержена — она часть обычного скролла `.notes-scroll`
  внутри `position:fixed` контейнера `.notes-screen`, а не отдельный
  fixed-оверлей; манифест-фикс закрывает и её.
- `npx tsc --noEmit` и `npx vite build` проходят чисто.
- **Не проверено вживую** — правка нативного слоя (`AndroidManifest.xml`)
  требует полного цикла: `npx vite build` → `npx cap sync android` →
  **Clean Project + Rebuild Project в Android Studio** (не просто Run —
  манифест кэшируется агрессивнее, чем JS/CSS).

### 2026-07-03 — Claude (восьмая сессия)

Пользователь сообщил после фикса из седьмой сессии: кнопка Save в Notes
всё ещё "под меню". **Важно для следующего агента:** это может означать
одно из двух — либо (а) на устройстве не был сделан полный цикл
Clean Project + Rebuild Project в Android Studio после правки
`AndroidManifest.xml` (манифест кэшируется агрессивнее JS/CSS, простой
Run может не подхватить `windowSoftInputMode`), либо (б) сам
`adjustResize` на конкретном WebView/устройстве всё равно не резайзит
видимую область корректно (известная практика: не все прошивки/версии
WebView одинаково честно это делают).

Не дожидаясь, чтобы разбираться, какой из двух случаев произошёл —
добавлена независимая JS-подстраховка, не полагающаяся на нативный
resize вообще:

- `NotesScreen.tsx`: подписка на `window.visualViewport.resize`/`scroll`
  (API, широко поддерживаемый в Android WebView) — отслеживает РЕАЛЬНУЮ
  видимую высоту экрана (за вычетом клавиатуры), независимо от того,
  честно ли WebView прислал `adjustResize`.
- `.notes-drawer-overlay` и `.notes-drawer` получают эту высоту напрямую
  через inline `style` (`height`/`maxHeight`), а не полагаются только на
  `100vh`/`inset:0`, которые могут указывать на полный layout-viewport
  (за клавиатурой) даже при включённом `adjustResize` на некоторых
  WebView.
- Если `visualViewport` недоступен (очень старый WebView) — код тихо
  ничего не делает (`if (!vv) return`), откатываясь на прежнее поведение
  (CSS `max-height:80vh` из прошлой сессии всё ещё на месте как второй
  уровень подстраховки).
- `npx tsc --noEmit` / `npx vite build` чисто.
- **Не проверено вживую.** Если жалоба повторится и после этого фикса —
  сначала уточнить у пользователя, был ли выполнен полный
  Clean+Rebuild цикл, прежде чем копать глубже; возможно, дело всё ещё
  просто в кэше сборки, а не в коде.

### 2026-07-03 — Claude (девятая сессия)

После восьмой сессии (JS-фикс через `visualViewport`) пользователь
подтвердил: проблема осталась **в обеих фазах** — и пока клавиатура
открыта (кнопка "приклеена" к клавиатуре, не видна/не нажимается), и
после её закрытия (проваливается под нижнее меню). Два фикса подряд
(манифест + JS-измерение viewport) не решили проблему до конца — это
сигнал, что дело не в измерении высоты, а в самой модели позиционирования.

**Ключевое наблюдение:** у формы редактирования УЖЕ существующей заметки
(инлайн в списке, обычный document flow) этой проблемы никогда не было —
её отдельно проверяли ещё в седьмой сессии. Разница — та форма не
`position: fixed`, а обычный элемент в скроллящемся потоке страницы,
и браузер/WebView сам корректно скроллит фокусный инпут в видимую область.

**Решение:** вместо очередной попытки подогнать fixed bottom-sheet
(`.notes-drawer-overlay`) под клавиатуру — убрал его полностью. Форма
новой заметки теперь рендерится **inline**, в начале списка внутри
`.notes-scroll`, тем же паттерном, что и форма редактирования (обёрнута
в `.notes-edit-form`, использует те же `.notes-save-btn`/`.notes-cancel-btn`).
Никакой `position:fixed`, никакого ручного измерения viewport — просто
обычный скроллящийся контент, как везде в проекте.

- Удалены классы `.notes-drawer-overlay`, `.notes-drawer`,
  `.notes-drawer-actions`, `.notes-drawer-cancel`, `.notes-drawer-save`,
  `.notes-drawer-save:disabled`, keyframes `notesOverlayIn`/`notesDrawerUp`
  — мёртвый CSS после перехода на inline-форму.
- `.notes-drawer-title` (стиль инпута заголовка) оставлен и переиспользован.
- Удалён JS-код `visualViewport` из восьмой сессии — с inline-формой он
  больше не нужен.
- Добавлен `.notes-new-form` (акцентная рамка/фон), чтобы форма новой
  заметки визуально выделялась в списке.
- `npx tsc --noEmit` / `npx vite build` чисто.
- **Не проверено вживую.** Если проблема каким-то образом всё ещё
  повторится — это будет означать, что баг не в позиционировании формы
  вообще, а в чём-то более общем (например, в самом WebView/клавиатуре
  на конкретной модели устройства) — тогда нужен скриншот/видео момента
  бага, гадать по описанию дальше не продуктивно (см. предыдущий ответ
  пользователю с этой просьбой).

### 2026-07-03 — Claude (десятая сессия)

Пользователь: крестик удаления заметки "не работает", и нужен вопрос-
подтверждение перед необратимым удалением.

- Добавлен `window.confirm(...)` перед вызовом `deleteNote()` — простой,
  надёжный нативный диалог (сознательно не кастомный modal: после серии
  багов с fixed-оверлеями в этой же сессии — см. записи выше про Notes
  keyboard — native `confirm()` не подвержен тем же рискам вообще).
- На кнопку `.notes-card-delete` добавлен `e.stopPropagation()` (защита
  на случай конфликта с родительскими onClick, хотя структурно конфликта
  не нашёл) и `min-width: 44px` (был только `min-height`, тач-таргет по
  ширине мог быть уже — вероятная причина "не работает" — не всегда
  попадали пальцем).
- `npx tsc --noEmit` / `npx vite build` чисто.
- **Не проверено вживую.**

Отдельно поднят вопрос: **приложение полностью на английском**, пользователь
ожидает локализацию. Это НЕ было сделано в рамках этой сессии — целиком
переводить UI без явного решения (какой язык, i18n-система или просто
текстовые правки, все экраны сразу или поэтапно) не стал, чтобы не наделать
масштабных правок вслепую. Следующий агент/сессия — дождаться ответа
пользователя на этот счёт, прежде чем начинать перевод.

### 2026-07-03 — Claude (двенадцатая сессия — World Progression Rework)

Задача от ChatGPT (архитектор проекта), после чтения `+Идея и этапы.txt`:

> 1. World HUD показывает только текущую активную главу.
> 2. Будущие главы отображаются только как объекты мира.
> 3. Карточки заблокированных глав убрать.
> 4. После завершения главы: анимация восстановления моста → плавный
>    подъём камеры → открытие следующей карточки.
> 5. Никаких списков из 5 карточек. Игрок всегда работает только с одной
>    главой.

**Реализовано:**

- `ChapterHub.tsx` переписан: раньше маппил ВСЕ главы (`chapters.map`) и
  рендерил карточку на каждую (включая заблокированные, с fog-оверлеем).
  Теперь принимает единственный `chapter: ChapterData | null` (только
  активная) и рендерит ровно одну карточку, всегда "развёрнутую" — узлы
  видны сразу, без отдельного клика для входа в главу. Пропали
  `onChapterSelect`, `island-locked`, `island-hidden`, `island-fog` в JSX
  (сами CSS-классы оставлены в файле — сейчас не используются, но не
  удалялись, т.к. вне периметра этой задачи; можно почистить отдельно).
- `useChapterHub.ts` переписан с нуля: раньше был `hub/chapter/chapterComplete`
  view-стейт под ручной выбор главы из списка — это больше не нужно, выбор
  главы теперь не ручной (глава всегда одна — активная). Новый API — простая
  фазовая машина `'active' | 'celebrate' | 'bridge'`.
- Новый компонент `BridgeRestoreScreen.tsx` — анимация "восстановления моста"
  между текущей и следующей главой (SVG: два "пилона", дуга моста рисуется
  через `stroke-dashoffset`, "доски" моста появляются по очереди). Это
  **не финальный арт** — WorldRenderer пока не рисует настоящие мосты
  (см. комментарии в `world_renderer.tsx`, ждёт художника), поэтому это
  осознанная лёгкая SVG-заглушка с акцентным цветом текущей темы профессии,
  а не попытка притвориться финальным визуалом.
- `JourneyHUD.tsx`: добавлен эффект, который следит за завершением активной
  главы (`chapter.isCompleted`, все узлы в состоянии `confidence`) и — если
  есть следующая глава — запускает последовательность:
  `ChapterCompleteScreen` (уже существовал, теперь реально вызывается) →
  по клику Continue → `BridgeRestoreScreen` (~1.6s) → `camera.moveUp()`
  (существующий хук `useCamera`, ранее не был подключён к этому потоку) →
  `advanceChapter()` (существующая функция в `runtime_controller.ts`,
  **ранее нигде не вызывалась в приложении** — была полностью мёртвым
  кодом с точки зрения UI, хотя логически написана верно) → `zoomOut()` →
  назад в фазу `'active'` с новой активной главой.

**Важный побочный фикс, без которого пункт 4 физически не мог работать:**

`advanceChapter()` до этой сессии переводил `activeNodeId` на первый узел
следующей главы, но НЕ снимал с этого узла реальный `SkillState` — а все
узлы, кроме самого первого entry-узла всего маршрута, изначально создаются
со `state: 'locked'` (см. `professions/software_engineer/skill_nodes.ts`).
Клик по узлу проверяет именно это поле (`handleNodeSelect` в `JourneyHUD.tsx`)
и блокирует locked-узлы тостом "Complete previous tasks…" — то есть даже
после перехода в новую "активную" главу игрок не смог бы взаимодействовать
с её первым узлом. Добавлена разблокировка первого узла новой главы
(`state: 'locked' → 'awareness'`) — тот же паттерн, что уже использовался
для entry-узла всего маршрута в `journey_runtime.ts`.

**Известная, не тронутая в этой сессии проблема (обнаружена, не исправлена):**

Узлы ВНУТРИ одной главы (кроме самого первого во всём маршруте) также
создаются со `state: 'locked'` и **нигде в коде не разблокируются** при
переходе от узла к узлу внутри главы — `submitTask()` только продвигает
skill-state конкретного узла по цепочке `locked→awareness→…→confidence`,
но не трогает состояние следующего узла. Это значит: на практике сейчас
реально пройти можно только первый узел любой главы (кроме случаев с
одним узлом в главе), остальные узлы главы недостижимы через UI. Это
предшествующая, более глубокая проблема движка прогресса, выходящая за
рамки текущей задачи (которая была про HUD/анимацию, а не про весь
node-progression engine) — **следующая сессия должна решить, чинить ли
это** (симметричный фикс — разблокировать следующий узел внутри той же
главы при достижении `execution`/`confidence` текущим, в `submitTask()`/
`applyTaskResultToRuntime()` в `runtime_controller.ts`).

**Проверено:**
- `npx tsc --noEmit` — чисто.
- `npx vite build` — чисто.
- Граф импортов (`madge` от `src/main.tsx`) — новые файлы (`BridgeRestoreScreen.tsx`,
  переписанные `ChapterHub.tsx`/`useChapterHub.ts`) подтверждённо достижимы.
- **Не проверено вживую на телефоне** — вся последовательность
  celebrate→bridge→advance завязана на CSS-анимации/таймауты, стоит
  визуально сверить тайминги (не рвётся ли, не мелькает ли) на реальном
  устройстве, не только по коду.

### 2026-07-04 — Claude (сессия — картинки островов не грузились для главы Interviews)

Пользователь добавил PNG-арт для всех глав software_engineer в
`public/art/software_engineer/`, но глава Interviews в `ChapterHub`
всё равно показывала иконку-плейсхолдер вместо картинки.

**Найдено:** `ChapterHub.tsx` строил путь к файлу как
`island-${chapter.id}.png`, где `chapter.id` для этой главы — `interviews`
(множественное число, см. `src/professions/software_engineer/chapters.ts`).
Реальный файл художника называется `island-interview.png` (единственное
число) — путь никогда не совпадал, `<img>` всегда падал в `onError` →
плейсхолдер. Заодно у главы `offer_preparation` файла арта нет вообще
(только `island-offer.png` для отдельной главы `offer`) — это не баг, а
ожидаемое отсутствие ассета, `onError`-плейсхолдер и так корректно
подхватывал этот случай.

**Исправлено:** `src/screens/JourneyScreen/components/ChapterHub.tsx` —
угадывание имени файла по `chapter.id` заменено на явный словарь
`CHAPTER_ART_FILENAME` (resume/linkedin/applications/interviews→interview/
offer). Для глав без записи в словаре (`offer_preparation`) `<img>` теперь
вообще не рендерится — сразу показывается иконка-плейсхолдер, без лишнего
запроса и console-warning об ошибке загрузки. Убран отладочный
`console.log` с логированием chapter.id/artSrc на каждый рендер.

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Не проверено вживую на устройстве** — нужно открыть главу Interviews и
убедиться, что теперь показывается `island-interview.png`, а не
плейсхолдер-иконка 🎤.

### 2026-07-04 — Claude (сессия — регрессия с картинками островов + чёрный экран между переходами)

Пользователь сообщил два новых симптома после предыдущей сессии этого же
дня: (1) картинки-острова, которые были вместо эмодзи, снова пропали для
ВСЕХ глав, не только Interviews; (2) между переходами (после завершения
миссии, при открытии второго шага) экран становится чёрным, и переход на
следующий шаг происходит только после сворачивания и разворачивания
приложения.

**Найдено (1) — моя же регрессия из прошлой записи:** `CHAPTER_ART_FILENAME`
я проиндексировал строчными ключами (`resume`, `interviews`, ...), но
`ChapterHub` в реальности вызывается из `JourneyHUD.tsx` с `chapter.id`,
который равен `node.domain` **в исходном регистре** —
`'Resume' | 'Interviews' | 'Linkedin' | 'Offer' | 'Offer Preparation'`
(см. `src/professions/software_engineer/skill_nodes.ts`). Без
`.toLowerCase()` перед поиском в словаре — вообще ни одна глава не находила
файл, все скатывались на иконку-плейсхолдер. (Все соседние функции типа
`getChapterAccent`/`getChapterBackground` в `world_theme.ts` уже делают
`.toLowerCase()` перед похожим поиском — стоило свериться с ними сразу.)

**Исправлено (1):** `ChapterHub.tsx` — `CHAPTER_ART_FILENAME[chapter.id.toLowerCase()]`.

**По (2) — чёрный экран:** не смог однозначно диагностировать без логов с
устройства — весь код перехода (`JourneyHUD` `handleMissionComplete`,
`useChapterHub`, `submitTask`) выглядит логически корректным после фиксов
сессий 22-23, явных null-разыменований не найдено. Рабочая гипотеза:
необработанное исключение где-то в дереве рендера (React размонтирует всё
дерево без единого сообщения об ошибке при краше) — WorldRenderer рисует
тёмный фон/градиент позади всего интерфейса, поэтому крашнувшийся HUD
поверх него неотличим от "просто чёрного экрана". Сворачивание/разворачивание
в Capacitor может перезагружать WebView и тем самым "чинить" симптом, на
самом деле пряча крах, а не устраняя его.

**Сделано:** добавлен `src/components/ErrorBoundary/ErrorBoundary.tsx`,
подключён в `App.tsx` вокруг всего приложения (`AppInner`). Теперь любой
падающий рендер вместо тишины покажет реальный текст ошибки + component
stack и кнопку "Перезагрузить". Это диагностический шаг: нужно
воспроизвести чёрный экран ещё раз и прислать точный текст ошибки
(скриншот/копипаст), чтобы найти и убрать настоящую причину, а не гадать
вслепую.

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Не проверено вживую** — нужно воспроизвести баг и посмотреть, что теперь
показывает ErrorBoundary вместо чёрного экрана.

### 2026-07-05 — Claude (найдена настоящая причина чёрного экрана: RangeError "Invalid array length")

Пользователь воспроизвёл баг с новым `ErrorBoundary` из прошлой сессии —
экран открытия второго шага (achievement-framing) теперь честно показал
текст ошибки вместо тишины: **"Invalid array length"**. Это сразу дало
точный диагноз вместо гадания.

**Найдено:** `MissionScreen.tsx` строит рейтинг сложности через
`Array(activeTask.difficulty).fill('●')`. `new Array(n)` в JS кидает
`RangeError: Invalid array length`, если `n` — не целое неотрицательное
число. В `src/professions/software_engineer/skill_nodes.ts` часть
`TaskContent.difficulty` были дробными (`1.3`, `1.5`, `2.5` и т.п.) —
осталось от какого-то предыдущего черновика/генерации контента.
`MissionScreen` показывает только `activeNode.tasks[0]` — первое задание
узла achievement-framing (`task-resume-achievement-1`) имело
`difficulty: 1.5` → экран падал мгновенно при открытии, ещё до того как
пользователь успевал увидеть хоть что-то. Отсюда и "чёрный экран именно
на втором шаге", и почему первый шаг (positioning-clarity, difficulty
`1.0` — целое) работал нормально.

**Исправлено:**
- `MissionScreen.tsx` — сложность теперь считается через
  `difficultyLevel = Math.min(5, Math.max(1, Math.round(activeTask.difficulty || 1)))`
  перед построением `Array(...)`. Это защита на будущее от любых
  некорректных значений в контенте, а не только от уже найденных.
- `skill_nodes.ts` — все дробные `difficulty` (19 мест, у задач и у узлов)
  округлены до целых 1-5 скриптом, значения не переписывались вручную
  "на глаз" — только `Math.round`, зажатый в 1-5.
- `ChapterHub.tsx` — добавлена запись `'offer preparation': 'island-offer.png'`
  в словарь арта (пользователь подтвердил: `island-offer.png` — это и
  есть арт для Offer Preparation). Временно тот же файл используется и
  для главы `offer` — отдельного арта для неё пока нет.

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Не проверено вживую** — нужно пересобрать и открыть achievement-framing
(и остальные шаги), убедиться, что миссия открывается без ошибки, а
плашка сложности показывает разумное количество точек (1-5).

### 2026-07-05 — Claude (нечитаемый текст на экране результата миссии — светлый на светлом)

Пользователь на 5-м шаге (resume-review, "Score Your Resume Across 5
Dimensions") не мог понять, что означает текст после отправки миссии
("High confidence is... Move to LinkedIn...").

**Найдено:** `.mission-screen` — светлый фон (`#f5f0eb`), карточка/подвал —
белые. Но `.mission-outcome-feedback` был цвета `#e6e6e6`, а
`.mission-outcome-recommendation` — `#b3b3b3`: это почти белый текст на
белом/светлом фоне, физически нечитаемый. Именно этот текст показывает
feedback/recommendation движка после отправки задания (см. фикс
двадцать третьей сессии) — то есть ключевое сообщение "твой результат
принят, что дальше" не было видно вообще, не только на 5-м шаге, а на
любой миссии, где эти классы использовались.

**Исправлено:** `MissionScreen.css` — `.mission-outcome-feedback` →
`#2d3436` (тот же тёмный цвет, что и остальной основной текст на этом
экране), `.mission-outcome-recommendation` → `#636e72` (тот же
приглушённый, но читаемый серый, что и `.task-description`).

**Проверено:** `npx vite build` — чисто.
**Не проверено вживую** — нужно пройти любую миссию до конца и убедиться,
что текст результата (что засчиталось и что рекомендуется дальше) виден
и читаем.

### 2026-07-05 — Claude (найден системный баг: узлы после 4-го в каждой главе не могли завершиться)

Пользователь спросил: "как глава пройдена если ещё Professional Summary
шаг и Skills inventory?" — правильно заметив, что `task-resume-review`
писал "Resume chapter complete!" после всего 4-го из 7 узлов главы Resume.

**Найдено — гораздо серьёзнее, чем неверный текст:** `TASK_LIBRARY` в
`task_content_engine.ts` была написана, когда в каждой главе было ровно
4 узла, и никогда не обновлялась при добавлении новых узлов. Реальная
нехватка `TaskDefinition`:
- `resume`: нет `resume-ats`, `resume-summary`, `resume-skills` (3 из 7)
- `linkedin`: нет `profile-photo`, `featured-content`, `recommendations` (3 из 7)
- `applications`: нет `company-research`, `application-tailoring`, `portfolio-submission`, `referral-strategy` (4 из 8)
- `interviews`: нет `behavioral-prep`, `system-design-prep`, `on-site-prep`, `phone-screen`, `interview-followup`, `presentation-prep` (6 из 10)
- `offer`: нет `equity-evaluation`, `start-transition` (2 из 6)
- `offer_preparation` — покрыта полностью, без проблем.

Итого 21 узел без своего `TaskDefinition`. Механизм поломки —
`loadTaskForNode()` возвращал `null` для таких узлов **не обновляя**
`activeTaskDefinition`; `submitTask()` при этом не проверяет, что
`activeTask.nodeId` совпадает с узлом, который сейчас реально открыт —
только что оба поля не `null`. Итог: открыв, например, `resume-ats` (узел
без определения) и нажав "Complete Mission", система на самом деле
пересчитывала **предыдущий** загруженный узел (например, уже завершённый
`resume-review`) — который уже на максимальном состоянии, поэтому
`skillTransition.changed` всегда `false`. `resume-ats` физически не мог
продвинуться ни при каком количестве попыток, без единой видимой ошибки.
Это, скорее всего, и есть первопричина ощущения "застревания" на поздних
узлах глав, независимо от предыдущих фиксов сохранения runtime.

**Исправлено:**
- `task_content_engine.ts` — убраны 3 ложных "chapter complete!" сообщения
  (`resume-review`→ теперь ссылается на ATS Optimization; `linkedin
  quiz`→ на Profile Photo; `application-volume`→ на Company Research;
  `interview-mindset`→ на Behavioral Preparation), так как ни один из этих
  узлов на самом деле не последний в своей главе.
- `runtime_controller.ts` — добавлена `buildFallbackTaskDefinition(nodeId)`:
  строит полноценный `TaskDefinition` на лету из уже написанного
  `TaskContent` узла (`node.tasks[0]` — title/objective/difficulty), когда
  для узла нет записи в `TASK_LIBRARY`. Рекомендация "что дальше" считается
  динамически по реальной позиции узла в `chapter.nodeIds` — следующий
  узел той же главы, либо (если это правда последний узел) следующая
  глава, а не захардкоженная строка. `loadTaskForNode()` теперь всегда
  возвращает определение, привязанное к правильному `nodeId`, для любого
  узла с непустым `tasks`.

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Не проверено вживую** — нужно пройти resume-ats, resume-summary,
resume-skills (и в идеале ещё несколько ранее "непокрытых" узлов в других
главах) и убедиться, что каждый реально продвигается и глава Resume
доходит до 7/7, а не застревает на 4-м узле.


### 2026-07-05 — Claude (новый полноэкранный TaskCompleteScreen после каждой миссии)

Задача от Serj (референс `obrazets.png`): точная копия экрана "🎉 TASK
COMPLETED! Great work!" с фото-фоном (пользователь вставит сам), должна
появляться сразу после прохождения задания (по нажатию Continue Journey
на старой inline-панели "Mission Complete!"), с сохранением уже
используемого конфетти-салюта (`ChapterCompleteScreen`'а).

**Сделано:**
- `src/screens/MissionScreen/TaskCompleteScreen.tsx` (новый) — полноэкранный
  компонент: фото-фон (слот `backgroundImage`, с тёмным градиентным
  фоллбэком до прихода реального фото — см. комментарий в файле), конфетти
  (переиспользованы существующие классы `.confetti-container`/
  `.confetti-particle` и хук `useWorldConfettiColors` из
  `ChapterCompleteScreen`, новой системы конфетти не создавалось), кольцо
  прогресса (переиспользован существующий компонент `ProgressRing` из
  `src/components/layout/`), 3 карточки наград (XP/Readiness/Confidence),
  карточка статистики (Tasks Completed / Readiness Score / Confidence
  Score), кнопка Continue Journey, карточка "Coming next" со следующим
  заданием главы.
- `src/screens/MissionScreen/TaskCompleteScreen.css` (новый) — стили по
  референсу: тёмная фотография+scrim, оранжевая кнопка-пилюля, светлый
  текст на тёмном фоне (по главному правилу контраста проекта).
- `MissionScreen.tsx` — при `taskView === 'completed'` теперь полностью
  заменяет экран миссии на `TaskCompleteScreen` (было: маленькая inline-
  панель "Mission Complete!" внизу карточки). Данные для экрана считаются
  из реального runtime, не хардкожены:
  - `tasksCompleted`/`totalTasks` — по количеству узлов текущей главы
    (`chapter.nodeIds`) в состоянии `confidence`/`execution`.
  - `nextTask` — следующий `nodeId` в `chapter.nodeIds` после активного,
    его `title`/`estimatedMinutes` берутся из `node.tasks[0]` (тот же
    паттерн, что уже используется для текущего задания). Если следующего
    узла в главе нет (последний узел) — карточка "Coming next" просто не
    рендерится (`nextTask: null`).
  - `readinessScore`/`confidenceScore` — напрямую из `runtimeState`
    (confidence домножен на 100, т.к. хранится как 0-1).
  - `skillProgressPercent` — процент прогресса текущей главы
    (`runtimeState.chapterProgress[chapterId]`).
  - `xpGained` — производная величина, честно посчитанная по формуле из
    readiness/confidence дельт (`readinessDelta*3 + confidenceDelta*2`,
    минимум 5), т.к. в контенте заданий (`task_content_engine.ts` rewards)
    нет отдельного поля XP — не выдумывалась случайным числом.
- `src/core/skill_engine.ts` — `MISSION_RESULT` событие расширено полями
  `readinessDelta`, `confidenceDelta`, `skillProgressPercent` (раньше UI
  не имел доступа к реальным дельтам награды конкретного задания, только
  к `advanced`/`feedback`/`recommendation`).

**Проверено:**
- `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
- `madge` от `src/main.tsx` не резолвит path-алиасы `@/...` без
  дополнительного конфига (в графе нет даже самого `MissionScreen.tsx`,
  хотя он точно живой) — это ограничение тулинга в этой сессии, не повод
  считать новый файл неподключённым; подключённость подтверждена успешной
  сборкой `vite build`, которая физически не прошла бы, если бы импорт
  был битым.

**Не проверено вживую на устройстве** — нужно пройти любую миссию и
убедиться: (а) вместо мелкой панели "Mission Complete!" открывается
полноэкранный TaskCompleteScreen с конфетти; (б) кольцо прогресса, цифры
XP/Readiness/Confidence и карточка "Coming next" совпадают с реальным
состоянием; (в) на последнем узле главы карточка "Coming next" корректно
не показывается; (г) после вставки реального фото-фона (когда появится
арт) — проверить контраст текста поверх фото.

**Не сделано в этой сессии (сознательно, вне периметра задачи):**
- Реальное фото-фона — оставлен слот `backgroundImage`, ждёт материалов от
  Serj, как и было указано ("фото фон предусмотри, я сам вставлю").
- Экран `ChapterCompleteScreen` (для завершения всей главы, не одного
  задания) не тронут — задание касалось именно пер-таскового экрана
  результата, а не финала главы; это два разных, теперь визуально похожих,
  но не объединённых экрана.

### 2026-07-05 — Claude (4 бага: TaskCompleteScreen под нижним меню, переполнение в Notes, отсутствие индикации главы в заметках, дыры в Playbook)

Serj заметил при живом тестировании: (1) `TaskCompleteScreen` при
прокрутке вниз — нижняя часть уходит под плавающее нижнее меню; (2) в
Notes текст заметки в один нескроллящийся ряд вылезает за границы
карточки; (3) на карточках заметок нет никакого визуального признака,
к какой главе они относятся; (4) запрошена проверка Playbook на
соответствие `+Window_functional.md` ("любое задание имеет кнопку Learn
more, которая открывает нужную страницу Playbook"; категории Resume/
LinkedIn/Interview/Salary/Communication/STAR/Body language/Mistakes).

**Найдено и исправлено:**

1. **`TaskCompleteScreen` под нав-баром.** Причина — не CSS-опечатка, а
   стекинг-контекст: в `App.tsx` каждая вкладка (включая активную)
   рендерится в обёртке с инлайновым `transform: translateX(...)`
   (`translateX(0)` для активной). Любое значение `transform`, включая
   `translateX(0)`, делает элемент containing block для потомков с
   `position: fixed` — поэтому `inset: 0`/`z-index: 200` у
   `TaskCompleteScreen` переставали быть относительно реального вьюпорта,
   а сама обёртка (без явного z-index) проигрывала `BottomNav`
   (`z-index: 100`) в родительском стекинг-контексте. Исправлено:
   `TaskCompleteScreen.tsx` теперь рендерится через `createPortal` прямо
   в `document.body`, минуя всю цепочку трансформированных предков —
   как настоящее модальное окно. Заодно `TaskCompleteScreen.css`
   уплотнён (меньше паддингов/шрифтов у баннера, колец, наград, карточки
   статистики, кнопки) по просьбе "сделать компактнее и эстетичнее".

2. **Notes — переполнение текста.** `.notes-card-content` использовал
   `white-space: pre-wrap` без `overflow-wrap`, поэтому длинный кусок
   текста без пробелов (ссылка, склеенное слово) не переносился и вылезал
   за карточку. Добавлены `overflow-wrap: anywhere` + `word-break:
   break-word`, плюс `.notes-card` теперь `min-width: 0; max-width: 100%;
   overflow: hidden` — типовой fix для переполнения текста во
   flex-контейнерах.

3. **Notes — нет индикации главы.** Группировка по главам уже была (цвет
   в заголовке группы), но на самой карточке — никакого признака. Теперь
   у каждой `.notes-card` левая цветная полоса (`border-left`, цвет главы
   через `--note-color`) и явный текстовый чип с иконкой+названием главы
   в шапке карточки (`.notes-card-cat-label`) — видно даже если заметки
   листаются вне группировки.

4. **Playbook — дыры в категориях + отсутствующая кнопка Learn more.**
   `playbook_data.ts` уже содержал написанные статьи для категорий
   `communication`, `body_language`, `mistakes`, `confidence`, `remote`,
   но сетка категорий в `PlaybookScreen.tsx` показывала только 5 из 10 —
   остальные были физически недостижимы из UI (мёртвый контент). Добавлены
   недостающие плитки. Отдельно обнаружено: кнопки "Learn more" не было
   вообще нигде в коде, хотя `+Window_functional.md` требует её на каждом
   задании. Добавлено:
   - `task_learn_more` кнопка в `MissionScreen.tsx` (под заголовком
     задания) — эмитит `OPEN_PLAYBOOK` с категорией, посчитанной по
     `activeChapterId` через новую таблицу
     `CHAPTER_TO_PLAYBOOK_CATEGORY`.
   - Новый тип события `OPEN_PLAYBOOK` в `system_event_bus.ts`.
   - `App.tsx` подписывается на `OPEN_PLAYBOOK`, переключает таб на
     `playbook` и прокидывает категорию как `initialCategory` в
     `PlaybookScreen`.
   - `PlaybookScreen.tsx` принимает `initialCategory` /
     `onConsumeInitialCategory` — при наличии сразу открывает список
     статей нужной категории вместо грид-меню, и сбрасывает deep-link
     после использования, чтобы ручное переключение вкладок его не
     повторяло.

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Не проверено вживую** — нужно: (а) пройти миссию до конца, проскроллить
`TaskCompleteScreen` вниз, убедиться что он весь поверх нав-бара; (б)
создать заметку с длинной ссылкой без пробелов, убедиться что она не
вылезает; (в) визуально сверить цветные чипы на карточках заметок разных
глав; (г) открыть Playbook и убедиться что все 10 категорий кликабельны
и показывают контент; (д) нажать "Learn more" на активном задании и
убедиться что открывается правильная категория Playbook.

### 2026-07-05 — Claude (заметки не загружались при старте + два непонятных % в шапке миссии)

Serj сообщил: (1) в главе Interviews шапка миссии показывает "100% 100%" — непонятно
что это и почему уже 100% на предпоследнем шаге; (2) заметки из миссий
перестали появляться в Notes (остались только старые пару штук, новые не приходят).

**Баг 1 — заметки не приходят (корневая причина найдена):**
`notes_store.ts` инициализируется как `let notes: Note[] = []` при каждом холодном
старте. `loadNotes()` в `notes_persistence.ts` была написана и правильно читает данные
из localStorage — но никогда не вызывалась нигде в приложении. `saveNotes()` работала
корректно, поэтому старые заметки (сделанные в предыдущих сессиях до фикса из
сессии 2026-07-05 про "LinkedIn шаг 11") реально лежат в storage — просто при
старте в память не загружались. При первом `addNote()` в новой сессии `getNotes()`
возвращал пустой массив → `setNotes([...[], новая_заметка])` — все предыдущие
заметки перезаписывались одной новой. Именно поэтому "осталось пару а новые не
приходят" — те пара были из предыдущего холодного запуска, когда они успели
добавиться до первого новой сессии.

**Исправлено:** `App.tsx` — в стартовый `useEffect` добавлен `loadNotes()` /
`setNotes()` вызов до `loadRuntime()`. Теперь все ранее сохранённые заметки
восстанавливаются в памяти при старте, и новые `addNote()` корректно
дописываются к реальному списку.

**Баг 2 — "100% 100%" в шапке, непонятно что за проценты:**
Это НЕ процент прогресса текущей главы Interviews. Это два глобальных
running-total счётчика за всё путешествие:
- **Readiness (0-100)** — общая готовность к рынку труда, накапливается с каждой
  пройденной миссией во всех главах. К главе Interviews, когда пройдены Resume +
  LinkedIn + Applications (3 главы * ~7 узлов * ~5 readinessDelta за успех =
  суммарно может легко перевалить за 100 до clamp).
- **Confidence (0-100%)** — аналогично, глобальный.

То есть 100% 100% у пользователя, прошедшего первые 3-4 главы — абсолютно
ожидаемое поведение, не баг. Но UI никак это не объяснял: два безымянных зелёных/
синих бейджа с одинаковым значением 100% выглядели как "процент прохождения текущей
главы" и смотрелись как баг.

**Исправлено:** `MissionScreen.tsx` — добавлены микро-лейблы "Ready" и "Conf"
внутри бейджей (9px, uppercase). `MissionScreen.css` — бейджи переведены в
`flex-column`, добавлен стиль `.score-badge-label`. Tooltip (`title`) с полным
объяснением для тех, кто задержит палец. Теперь сразу видно: это два разных
показателя, а не прогресс текущей главы.

**Проверено:** `npx vite build` — чисто.
**Не проверено вживую** — нужно: (а) после перезапуска убедиться что старые
заметки снова видны в Notes; (б) написать заметку в любой миссии, выйти,
перезапустить — заметка должна остаться; (в) визуально проверить что "Ready 100%"
и "Conf 100%" в шапке читаются понятнее чем раньше.

### 2026-07-05 — Claude (4 бага: Apply button мёртвый, Journey пустой, два экрана после миссии, 100/100 в статистике)

Serj сообщил четыре бага по результатам живого тестирования:

1. **Playbook → Body Language → Checklist → "Apply to Current Task" не работает** — кнопка была без `onClick`, нажатие ничего не делало. Исправлено: добавлен `onClick={onClose}` — кнопка закрывает Playbook и возвращает в Journey (к активной миссии), тот же эффект что и ← Назад, только с семантикой "применяю к заданию".

2. **Journey — пустое окно** — `JourneyHUD` делал ранний `return` с текстом "No active node" когда `getActiveNode()` возвращал null (например при первом запуске до инициализации runtime). Исправлено: ранний return только если нет ни node, ни runtime — показывает "Loading..." вместо голого белого экрана, и не обрывает рендер ChapterHub.

3. **Два экрана подряд после завершения главы** — `TaskCompleteScreen` (после миссии) + `ChapterCompleteScreen` (после главы) показывались последовательно — пользователь видел два celebration-экрана один за другим. Исправлено: `ChapterCompleteScreen` больше не показывается как отдельный шаг. Вместо него `TaskCompleteScreen` расширен пропом `isChapterComplete`: если это последний узел главы, экран показывает "🏆 CHAPTER COMPLETE!" баннер, меняет кнопку на "Next Chapter 🗺️" и скрывает "Coming next" карточку. `handleMissionComplete` в `JourneyHUD` теперь определяет завершение главы и вызывает `advanceChapter()` напрямую (через 300ms), минуя celebrate-фазу — чтобы следующий остров разблокировался без ещё одного экрана-перехода.

4. **100/100 в статистике TaskCompleteScreen — не информативно** — stats-card с `Readiness Score: 100/100` и `Confidence Score: 100/100` была бесполезна после нескольких пройденных глав (глобальные накопленные значения достигают cap). Убрана из `TaskCompleteScreen`. Заменена прогресс-баром главы (`X / N steps`, честное число завершённых узлов из общего), который реально показывает накопление к 100%. Карточки наград оставлены как дельты (`+N Readiness`, `+N% Confidence`) — это единственные числа с "спортивным" нарастанием.

**Проверено:** `npx vite build` — чисто.
**Не проверено вживую** — нужно: (а) нажать "Apply to Current Task" в Playbook — должен открыться Journey; (б) открыть Journey сразу после запуска — не должен быть пустым; (в) пройти последний узел главы — должен показаться TaskCompleteScreen с "🏆 CHAPTER COMPLETE!", нажать "Next Chapter" — следующая глава должна разблокироваться (НЕ должен появляться второй ChapterCompleteScreen после); (г) в наградах — проверить что показываются дельты (+X), а не 100/100.

### 2026-07-05 — Claude (Journey всё ещё пустой после завершения главы — найдена и исправлена вторая, более глубокая причина)

Предыдущее исправление (early return "Loading..." вместо "No active node") устраняло пустой экран только при первом запуске, но не решало реальный кейс: **Journey оставался пустым/залипшим после завершения главы**, потому что `ChapterHub` получал `chapter={null}`, когда ни одна глава не помечалась `isActive`.

Найдены и исправлены два взаимосвязанных бага в `advanceChapter()` (`runtime_controller.ts`) и `handleMissionComplete()` (`JourneyHUD.tsx`):

1. **`advanceChapter()` не обновлял `activeChapterId`.** Функция переключала `activeNodeId` на первый узел следующей главы, но `runtimeState.activeChapterId` оставался старым (обновлялся только внутри `submitTask()` через `getCurrentChapter()`). Runtime и UI расходились в том, какая глава активна.

2. **Регистронесовпадение `domain` vs `chapter.id`.** В `handleMissionComplete()` узлы группировались по `n.domain` (например, `'Resume'` — с большой буквы, как задано в `skill_nodes.ts`), а поиск активной группы шёл по ключу `rt.activeChapterId` (например, `'resume'` — с маленькой буквы, id главы из `chapters.ts`). Регистр никогда не совпадал → `activeChapterNodes` всегда был `undefined` → `chapterJustCompleted` всегда `false` → `advanceChapter()` из `handleMissionComplete` никогда не вызывался. Пользователь дожимал последний узел главы, а Journey оставался на старой (уже полностью пройденной) главе без перехода — что выглядело как "пустое окно/зависание".

**Исправлено:**
- `runtime_controller.ts` → `advanceChapter()` теперь пишет `activeChapterId: next.id` вместе с `activeNodeId`.
- `JourneyHUD.tsx` → `handleMissionComplete()` больше не строит `domainMap` по `node.domain`. Вместо этого текущая глава ищется через `getActiveChapters()` и `chapter.nodeIds.includes(rt.activeNodeId)` — тот же источник истины, что использует `advanceChapter()`/`getCurrentChapter()` в `chapter_engine.ts`. Устраняет рассинхронизацию casing между `domain` и `chapter.id` целиком, а не точечно.

**Проверено:** `npx tsc --noEmit` — чисто (0 ошибок).
**Не проверено вживую** — нужно: пройти все узлы главы до конца → должен показаться TaskCompleteScreen с "🏆 CHAPTER COMPLETE!" → после перехода следующая глава должна отрисоваться в Journey (не пустой экран), `ChapterHub` должен получить реальный `chapter`, а не `null`.

Commit: `e2e95ee` в `main`.

### 2026-07-06 — Claude (World tab gets its own background image)

**Serj's report:** in the World tab, the background is the Journey chapter's
art, dimmed by a scrim — not its own image.

**Root cause:** `WorldRenderer` (Journey's art/camera engine) stays
permanently mounted underneath every tab (see `App.tsx`), by design. The
World tab (`WorldMapScreen.tsx`) had no opaque background of its own — just
`radial-gradient(ellipse at 50% 30%, rgba(60, 80, 120, 0.25) 0%, rgba(8, 12,
20, 0.95) 70%)`, which is only 25% opaque at its center. So the Journey art
underneath showed through there, darkened by that same gradient.

**Fix:** `WorldMapScreen` now renders its own fully opaque background image,
covering the whole screen (with an `onError` fallback to a solid gradient
if the file is missing — same pattern as `ChapterHub`/`WorldRenderer`'s
island-art handling), so nothing from Journey can bleed through. The
placeholder text now sits on a small blurred scrim card instead of a
full-screen one, so the new image stays visible everywhere else.

**PLACE THE IMAGE AT:** `public/art/software_engineer/world.png`
(recommended 1080×2340px portrait PNG — it's cropped/covered to fill the
screen, not stretched). Until the file is placed, falls back to a solid
dark gradient (no broken-image icon).

**Files:** `src/screens/WorldMapScreen/WorldMapScreen.tsx`,
`src/screens/WorldMapScreen/WorldMapScreen.css`, `PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` and `npx vite build` pass clean. Not
verified on-device this session — please drop `world.png` in the path
above and check on your phone.

### 2026-07-07 — Claude (Offer Preparation blank-screen race fix, per-chapter Readiness, reward diagram explanations)

**Serj's reports this session:**
1. Reaching the Offer Preparation chapter shows a blank screen.
2. Readiness sitting at 100% for every chapter after the 2nd is not
   informative — it should reflect the *current* chapter.
3. The reward diagrams on the chapter-complete screen have no
   explanation of what they mean.

**1. Blank screen on Offer Preparation — likely root cause found and
removed.** `JourneyHUD.handleMissionComplete` had its own direct
`advanceChapter()` call on a bare `setTimeout(…, 300)`, completely
separate from the *other* mechanism that already existed for the same
purpose (the `activeChapter.isCompleted` `useEffect` → `startBridge` →
`handleBridgeDone` → `advanceChapter`). Two independent call sites able
to advance the same runtime is exactly the bug class that made "Offer
Preparation" disappear before (see 2026-07-06 entry above) — if the
timeout fired after `activeNodeId` had already moved on, "current
chapter" could resolve against a stale/advanced id and either skip a
whole chapter or leave `activeChapterIndex` at -1. `ChapterHub` renders
`null` for a null chapter, i.e. a fully blank Journey screen with no
console error, matching exactly what Serj described. Fixed: removed
the direct `advanceChapter()` call from `handleMissionComplete`
entirely. There is now exactly **one** place in the app that ever calls
`advanceChapter()` — `handleBridgeDone`. `handleMissionComplete` now
only marks the chapter as celebrated (`prevChapterCompletedRef`) and
calls `startBridge()`, same as the effect-driven path, so the bridge
animation always plays and the runtime is only ever mutated from one
place.

**2. Readiness now shown per-chapter, not as a lifetime cumulative
number.** `runtime.readinessScore` is a single value that only ever
adds `readinessDelta` per completed task, clamped 0-100, for the whole
journey — it hits 100% around chapter 2-3 and then stays pinned there
forever, telling the user nothing about their readiness for the
chapter in front of them. The Journey HUD header now computes
`chapterReadinessScore` fresh every render from the *active chapter's
own nodes* (`calculateReadiness(activeChapter.nodes)` — same formula
used elsewhere, averaging each node's skill-state value 0-100), so it
starts low at the start of each new chapter and climbs as that
chapter's own nodes are completed. `runtime.readinessScore` (the
lifetime cumulative number) is untouched and still used for the
end-of-journey `JourneyCompleteScreen` summary, where a lifetime score
is the correct thing to show.

**3. Chapter-complete reward diagrams now explain themselves.**
`TaskCompleteScreen` already had a name under each ring ("Experience
(XP)", "Readiness", "Confidence") but no explanation of what the ring
fill or the number actually represents. Added: a one-line intro above
the three reward rings ("What you gained from this mission — each ring
shows how much of a typical mission's reward you earned"), a one-line
meaning caption under each individual reward label (e.g. Readiness →
"How prepared you are for this chapter's topic"), and a caption under
the big CHAPTER PROGRESS ring ("% of this chapter's steps completed so
far").

**Files:** `src/screens/JourneyScreen/JourneyHUD.tsx`,
`src/screens/MissionScreen/TaskCompleteScreen.tsx`,
`src/screens/MissionScreen/TaskCompleteScreen.css`, `PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` and `npx vite build` both pass clean.
Not yet verified on a physical device this session — please retest
progressing into Offer Preparation, check the Readiness number resets
at the start of each chapter, and check the new captions on the
chapter-complete screen, then report back.

### 2026-07-07 (2) — Claude (captions weren't visible on-device; premium status check)

**Why the captions weren't visible:** `TaskCompleteScreen.css` had a
`@media (max-width: 380px)` rule that `display: none`'d the reward
labels/captions entirely on narrow screens. Since this is an Android
app, the physical device is almost certainly under that width, so not
just the new explanation captions but the pre-existing reward labels
("Experience (XP)" etc.) were already invisible on-device before this
session too. Changed that breakpoint to shrink the font instead of
hiding the text, for all four caption classes.

**Premium gating — confirmed already fully off, nothing to disable.**
Checked every call site of `getUIState()` (the only place `checkAccess`
against `PremiumState` can run): `JourneyHUD`, `ShareScreen`, and
`export_service` all call it as `getUIState()` with no argument. Inside
`mapRuntimeToUI`, when `premiumState` is `undefined` the access check
short-circuits to `{ allowed: true }` for every chapter. So although
`SOFTWARE_ENGINEER_PROFESSION.premiumConfig` declares `freeChapters: 3`,
nothing in the current app actually constructs a `PremiumState` or
passes it in anywhere — the config is inert. All chapters are already
unlocked for testing as-is; no change was needed or made here. When
real purchases are wired in later, that will mean building a
`PremiumState` (via `createPremiumState`) from actual purchase status
and threading it into those three `getUIState()` call sites.

**Files:** `src/screens/MissionScreen/TaskCompleteScreen.css`,
`PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` and `npx vite build` pass clean.

### 2026-07-07 (3) — Claude (ACTUAL root cause of Offer Preparation empty screen found and fixed)

**Serj reported the Offer Preparation screen was still empty** ("no steps/
tasks shown") even after the previous session's race-condition fix. That
fix was a real improvement but not the actual cause — reproduced the bug
headlessly (wrote a throwaway simulation script that registers the
profession and steps through chapters/tasks exactly like the app does)
and found the real bug:

**There are two separate, near-identical "profession module" definitions
for Software Engineer**, and they had drifted out of sync:
- `src/professions/software_engineer/profession.ts` exports
  `SOFTWARE_ENGINEER_PROFESSION`, built from `ALL_SKILL_NODES` (which
  correctly includes `OFFER_PREPARATION_SKILL_NODES`) — **but this export
  is dead code**, only re-exported from `index.ts` and never registered
  or consumed anywhere in the app. Grepped every file; nothing imports it.
- `src/professions/software_engineer/module.ts` exports
  `SoftwareEngineerModule` — **this is the one actually used**, registered
  by `profession_auto_loader.ts` at real app startup. Its `skillGraph` is
  hand-built as its own spread list
  (`...RESUME_SKILL_NODES, ...LINKEDIN_SKILL_NODES, ...APPLICATION_SKILL_NODES,
  ...INTERVIEW_SKILL_NODES, ...OFFER_SKILL_NODES`) instead of importing
  `ALL_SKILL_NODES`, and **it simply never had
  `...OFFER_PREPARATION_SKILL_NODES` added to it** — presumably missed
  when that chapter was added to `chapters.ts`/`skill_nodes.ts`.

The practical effect: the *chapter definition* for `offer_preparation`
(`salary_negotiation`, `offer_review`, `resignation_letter`) existed and
was wired correctly everywhere else, but those three node ids never
existed in the running app's actual `skillGraph` / `nodeStates` at all.
So when a player's `activeNodeId` advanced into that chapter, `ChapterHub`
built its node list as `chapter.nodeIds.map(id => nodeStates[id]).filter(
Boolean)` — all three lookups came back `undefined`, got filtered out,
and the chapter rendered with zero mission cards: exactly "no steps/tasks
shown". Confirmed with the simulation: before the fix, `offer_preparation
nodes found: 0 / 3`; after adding the missing spread, `3 / 3`.

**Fix:** added `OFFER_PREPARATION_SKILL_NODES` to `module.ts`'s
`skillGraph` array (one line + one import), so it matches `ALL_SKILL_NODES`.

**Note for future sessions:** `profession.ts` (`SOFTWARE_ENGINEER_PROFESSION`)
is unused dead code that happened to be *correct* while `module.ts` (the
one that actually runs) was *wrong* — having two divergent definitions of
the same profession is itself the underlying design problem, not just
this one missing chapter. Worth eventually deleting `profession.ts` and
making `module.ts` the single source of truth (or vice versa), so this
class of "looks right in one file, wrong in the file that's actually
used" bug can't happen again silently.

**Files:** `src/professions/software_engineer/module.ts`, `PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` and `npx vite build` pass clean. Also
verified headlessly end-to-end (temporary simulation script, not
committed) that all 6 chapters now report their full node count in
`nodeStates`, including `offer_preparation: 3/3`. Please retest on-device
— progress through Interviews into Offer Preparation and confirm the
three mission cards (salary negotiation, offer review, resignation
letter) now show up.

### 2026-07-07 (4) — Claude (docs-only: fixed outdated `core/*_v0.6` architecture docs)

Compared `core/TRUTH_v0.6.md`, `core/PROJECT_SNAPSHOT_v0.6.md`,
`core/SESSION_START_v0.6.md`, `core/MASTER_LOADER_v0.6.txt` against the
actual current code (`src/App.tsx`,
`src/professions/software_engineer/`, `CORE_MAP.md`, this file). All
four described a superseded early architecture ("Skill State Machine",
7 states, `src/core/skill_nodes.ts`, 4-tab nav, iOS light theme) that no
longer exists in the codebase (`skill_nodes.ts` doesn't exist; nav is
now 5 tabs per `+Window_functional.md`; progress is chapter-based via
`chapters.ts`/`chapter_engine.ts`; state lives in
`runtime_controller.ts`/`runtime_store.ts`).

**Fix:** rewrote `core/TRUTH_v0.6.md` to match the real architecture
(chapters, professions module, Runtime, 5-tab nav, current
Stabilization phase, real next-tasks). Added warning headers to
`PROJECT_SNAPSHOT_v0.6.md` (kept as v0.6-era archive, not updated
further), `SESSION_START_v0.6.md` (redirected to
`CAREER_NAVIGATOR_MASTER_CHECKPOINT.md`/`PROJECT_STATUS.md`/`CORE_MAP.md`
as the real entry point) and `MASTER_LOADER_v0.6.txt` (flagged as
archive). No code changed.

**Files:** `core/TRUTH_v0.6.md`, `core/PROJECT_SNAPSHOT_v0.6.md`,
`core/SESSION_START_v0.6.md`, `core/MASTER_LOADER_v0.6.txt`,
`PROJECT_STATUS.md`

### 2026-07-06 — Kimi | Фикс визуальных ассетов:
- island-resume.png: путь теперь case-insensitive (`toLowerCase()`)
- journey.png: синхронизация в `android/app/src/main/assets/public/art/`
- ChapterHub.css: эффект парения `island-float` (3.5s, ±10px)

### 2026-07-02 — Kimi | Фикс BottomNav: labels теперь `text-black` (были невидимы `text-white/30`)

### 2026-07-07 (5) — Claude (Interview Trainer MVP + FinalCinematic + JourneyComplete)

**Задание 10 — Cinematic + JourneyComplete:**
- `FinalCinematicScreen.tsx` + `.css` — 12s profession-agnostic animation: 6 island PNGs + city emoji, SVG bridges, light beam, camera translateY/scale, "JOURNEY COMPLETE" title.
- `JourneyCompleteScreen.tsx` + `.css` — rewritten with "BEGIN INTERVIEW CHALLENGE" (emits `START_INTERVIEW_TRAINER`), "NEW JOURNEY" (emits `RESET_JOURNEY`), Share icon.
- `useChapterHub.ts` — added `'cinematic' | 'complete'` phases.
- `JourneyHUD.tsx` — connected last-chapter-done → cinematic → journey-complete flow.
- `system_event_bus.ts` — added `START_INTERVIEW_TRAINER`, `OPEN_SHARE`, `RESET_JOURNEY`, `INTERVIEW_SESSION_COMPLETE`.
- `App.tsx` — added `'interview'` Screen type + handlers for `START_INTERVIEW_TRAINER` / `RESET_JOURNEY` / `INTERVIEW_SESSION_COMPLETE`.

**Задание 11 — Interview Trainer MVP:**
- `src/core/interview/interview_result.ts` — types with `// TODO: unify with voice/ module` note.
- `src/core/interview/interview_store.ts` — module-level store with `addSession`, `getLatestSession`, `updateSession`.
- `src/core/interview/interview_persistence.ts` — localStorage persistence (Blob excluded, only metadata).
- `src/screens/InterviewTrainerScreen/hooks/useVoiceRecorder.ts` — MediaRecorder hook with `getUserMedia`, `audio/webm`, auto-stop at 60s, `isSupported` check.
- `InterviewTrainerScreen.tsx` + `.css` — 3 phases (Prepare/Record/Review), 10 hardcoded questions, waveform canvas, 5-item self-assessment checklist, feedback via `generateFeedback` + `generateScoreBreakdown` (mapped from booleans via `selfAssessmentToAnswerAnalysis`).
- Edge cases: no microphone → error + "Open Settings", unsupported → textarea fallback, `visibilitychange` auto-stop with toast, empty recording → "Try Again", Re-record button.
- Dev button: "Test → Interview" in JourneyHUD when `import.meta.env.DEV`.

**Задание 12 (partial) — madge:**
- `npx madge --circular src/main.tsx` — found 2 pre-existing circular deps (not from these changes):
  1. `core/skill_engine.ts > core/runtime/runtime_controller.ts`
  2. `core/skill_engine.ts > core/runtime/runtime_controller.ts > core/task/task_content_engine.ts > core/task/task_execution_engine.ts`
- These are pre-existing architecture patterns, not introduced by the Interview Trainer.

**Файлы (созданы):**
- `src/screens/JourneyScreen/components/FinalCinematicScreen.tsx`
- `src/screens/JourneyScreen/components/FinalCinematicScreen.css`
- `src/screens/JourneyScreen/components/JourneyCompleteScreen.css`
- `src/core/interview/interview_result.ts`
- `src/core/interview/interview_store.ts`
- `src/core/interview/interview_persistence.ts`
- `src/screens/InterviewTrainerScreen/InterviewTrainerScreen.tsx`
- `src/screens/InterviewTrainerScreen/InterviewTrainerScreen.css`
- `src/screens/InterviewTrainerScreen/hooks/useVoiceRecorder.ts`
- `src/vite-env.d.ts`

**Файлы (изменены):**
- `src/screens/JourneyScreen/components/ChapterHub.css` — island-float animation
- `src/screens/JourneyScreen/components/JourneyCompleteScreen.tsx` — full rewrite
- `src/screens/JourneyScreen/hooks/useChapterHub.ts` — added cinematic/complete phases
- `src/screens/JourneyScreen/JourneyHUD.tsx` — connected FinalCinematic + JourneyComplete + dev button
- `src/core/events/system_event_bus.ts` — added START_INTERVIEW_TRAINER, OPEN_SHARE, RESET_JOURNEY, INTERVIEW_SESSION_COMPLETE
- `src/App.tsx` — added 'interview' Screen, handlers for START_INTERVIEW_TRAINER/RESET_JOURNEY/INTERVIEW_SESSION_COMPLETE
- `src/screens/JourneyScreen/components/ChapterHub.tsx` — import ChapterHub.css
- `src/screens/JourneyScreen/JourneyScreen.css` — dev-interview-btn styles
- `PROJECT_STATUS.md` — resolved git conflict markers, added this entry

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Не проверено вживую** — нужно: (а) пройти все главы → cinematic → journey complete → "BEGIN INTERVIEW CHALLENGE"; (б) пройти интервью-сессию (recording, self-assessment, feedback); (в) проверить edge cases (no mic, minimize, empty recording).

### 2026-07-07 (6) — Claude (Задания 13-17: test script, world dir, permissions, audit, docs)

**Задание 13 — Test script:**
- `scripts/test-interview-trainer.ts` — headless прогон с 3 mock-сессиями (все true, частично, все false).
- `interview_store.ts` — добавлена `calculateInterviewReadiness()` — средний score по всем сессиям.
- Проверена сериализация/десериализация localStorage (полифилл для Node.js).
- **Результат:**
  ```
  Session #1: 10 questions, avg score 5.0/5
  Session #2: 5 questions, avg score 3.6/5
  Session #3: 3 questions, avg score 0.0/5
  Overall Readiness: ★★★★☆ (3.8/5)
  Persistence: OK (3 sessions saved and loaded)
  AudioBlob stripping: OK
  ```

**Задание 14 — World design:**
- Создана `src/professions/software_engineer/world/` (theme.ts, layout.ts, art.ts, camera.json).
- `theme.ts` — регистрирует WorldTheme через `registerWorldTheme()` (цвета Code Archipelago).
- `layout.ts` — регистрирует WorldLayout — 6 островов + 5 мостов + camera anchors.
- `art.ts` — регистрирует WorldArtConfig (путь к `journey.png`, размер 1080×2340).
- `camera.json` — пустой плейсхолдер для художника.
- `src/professions/software_engineer/interview/questions.ts` — вынесены `SOFTWARE_ENGINEER_INTERVIEW_QUESTIONS` (10 вопросов).
- `InterviewTrainerScreen.tsx` — теперь импортирует вопросы оттуда вместо хардкода.
- `module.ts` и `index.ts` — импорты переведены на `./world/theme`/`./world/art`/`./world/layout`.
- Старые файлы (`world.ts`, `world_art.ts`, `world_layout.ts`) оставлены для обратной совместимости (не импортируются).

**Задание 15 — Capacitor permissions:**
- `AndroidManifest.xml` — добавлены `RECORD_AUDIO` и `MODIFY_AUDIO_SETTINGS`.
- iOS: добавить `NSMicrophoneUsageDescription` в `Info.plist` перед TestFlight.

**Задание 16 — Bundle audit:**
- `npx vite build` — 1979 modules, 600.38 KB JS (gzip 190.77 KB), 91.96 KB CSS.
- Рост относительно предыдущей сессии: +0.05 KB JS gzip, +0.07 KB CSS gzip — незначительно.
- MediaRecorder — нативный API, не добавляет вес.
- Waveform canvas — лёгкий.
- voice/ модуль уже был в бандле (добавлен в Задании 11), tree-shakeable.
- **Вывод:** рост < 50 KB, приемлемо для MVP.

**Задание 17 — Documentation:**
- `docs/INTERVIEW_TRAINER.md` — архитектура, файлы, flow, известные ограничения, следующие шаги.

**Файлы (созданы):**
- `scripts/test-interview-trainer.ts`
- `src/professions/software_engineer/world/theme.ts`
- `src/professions/software_engineer/world/art.ts`
- `src/professions/software_engineer/world/layout.ts`
- `src/professions/software_engineer/world/camera.json`
- `src/professions/software_engineer/interview/questions.ts`
- `docs/INTERVIEW_TRAINER.md`

**Файлы (изменены):**
- `src/core/interview/interview_store.ts` — added `calculateInterviewReadiness()`
- `src/screens/InterviewTrainerScreen/InterviewTrainerScreen.tsx` — import questions from new location
- `src/professions/software_engineer/module.ts` — imports → `./world/theme`/`./world/art`/`./world/layout`
- `src/professions/software_engineer/index.ts` — import → `./world/theme`
- `android/app/src/main/AndroidManifest.xml` — +RECORD_AUDIO, +MODIFY_AUDIO_SETTINGS
- `PROJECT_STATUS.md` — this entry

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто, `npx tsx scripts/test-interview-trainer.ts` — чисто (ожидаемый вывод).

### 2026-07-07 — Claude (Interview Trainer UI polish — 4 fixes)

**Serj's reports from device testing:**

1. **Interview Review screen — data formatting broken.**
   Values shown as "4000%" (40× overflow), labels concatenated without spaces
   ("Clarity: 4000%Structure: Use STAR"). Fixed: `selfAssessmentToAnswerAnalysis`
   now returns 0-1 values (was 0-100), so `generateScoreBreakdown` math is
   correct. Entire feedback section rewritten to star-rating format per spec.

2. **Interview Trainer close button — no progress warning.**
   Tapping ✕ immediately closed the screen, losing session progress.
   Fixed: new `handleClose` checks `questionIndex > 0 || recordingDuration > 0`,
   shows native `confirm()` dialog if progress exists. Emits new
   `CLOSE_INTERVIEW_TRAINER` event. Added to `system_event_bus.ts`.

3. **JourneyCompleteScreen — "New Journey" button under BottomNav.**
   Button not reachable on 720px devices. Fixed: padding-bottom →
   `calc(24px + env(safe-area-inset-bottom) + 80px)`, subtitle margin 28→12px,
   stats grid gap 10→8px, timeline margin 28→16px. All content fits without
   scrolling on 720px screens.

4. **WorldMapScreen — placeholder text visible over world art.**
   "The Map... being drawn" card overlaid the actual world background.
   Fixed: removed `.world-map-placeholder` and all content inside it.
   Screen now shows only background image + `onError` fallback to gradient.
   World speaks for itself.

**Файлы (изменены):**
- `src/screens/InterviewTrainerScreen/InterviewTrainerScreen.tsx` — fixed
  selfAssessmentToAnswerAnalysis (0-1 scale), added handleClose with confirm(),
  rewritten review section with star ratings + STAR checklist
- `src/screens/InterviewTrainerScreen/InterviewTrainerScreen.css` — added
  .review-metrics, .review-metric, .review-star-checklist styles
- `src/core/events/system_event_bus.ts` — added CLOSE_INTERVIEW_TRAINER
- `src/screens/JourneyScreen/components/JourneyCompleteScreen.css` — safe
  area padding, compact spacing
- `src/screens/WorldMapScreen/WorldMapScreen.tsx` — removed placeholder content
- `src/screens/WorldMapScreen/WorldMapScreen.css` — cleaned up styles
- `PROJECT_STATUS.md` — this entry

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Не проверено вживую** — нужен ретест после следующей сборки Serj'ом.

### 2026-07-08 — OpenCode (Задания 47–50: waveform gradient, real AudioContext analyser, CSS fallback animation)

**Serj's task (17.txt):** Fix waveform gradient colors (dark blue → neon cyan), add real AudioContext analyser for waveform animation, add CSS fallback animation when Web Audio API fails.

**Changes:**

1. **Real AudioContext analyser for waveform** — `handleStartRecord` now creates `AudioContext` + `AnalyserNode` from the `MediaStream` (via exposed `streamRef` in `useVoiceRecorder`). The analyser is connected to `createMediaStreamSource(stream)` but NOT to `audioContext.destination` (avoids feedback/blocking on mobile). Canvas draw loop uses `analyser.getByteFrequencyData()` instead of `Math.random()`.

2. **Waveform gradient fix** — Canvas gradient changed from `#7B2D8E → #00F0FF` (purple → cyan) to `#0A1A3A → #1E3A5F → #00F0FF` (dark blue → mid blue → neon cyan). CSS `background` on `.interview-trainer-waveform` updated to match.

3. **CSS fallback animation** — Added `.waveform-fallback` (flex row, same gradient background as real waveform) and `.waveform-fallback-bar` (20 animated bars, each with staggered `animationDelay`). Keyframes `waveformPulse` drives bar heights and opacity in a 1.2s cycle (12% → 70% → 30% → 90%).

4. **Fallback detection** — When analyser exists but returns all-zero data after 500ms, `useFallbackWaveform(true)` is set and CSS animation renders instead of canvas.

**Files:**
- `src/screens/InterviewTrainerScreen/hooks/useVoiceRecorder.ts` — exposed `streamRef` in return type/value
- `src/screens/InterviewTrainerScreen/InterviewTrainerScreen.tsx` — analyser refs, fallback state, real waveform draw, conditional canvas/fallback render
- `src/screens/InterviewTrainerScreen/InterviewTrainerScreen.css` — gradient update, `.waveform-fallback`, `.waveform-fallback-bar`, `@keyframes waveformPulse`
- `PROJECT_STATUS.md` — this entry

**Verified:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.

### 2026-07-08 — OpenCode (Задания 51–54: Interview Trainer profession-agnostic, Playbook analysis)

**Serj's task (18.txt):**

- **Задание 51 — Interview Questions profession-agnostic:**
  Created `src/core/interview/interview_question_loader.ts` — a `QUESTION_MAP` registry (`Record<string, string[]>`) with `getInterviewQuestions(professionId)` that returns questions for the given profession, falling back to `software_engineer` if the profession has no dedicated question set.
  Updated `InterviewTrainerScreen.tsx`: replaced the hardcoded `import { SOFTWARE_ENGINEER_INTERVIEW_QUESTIONS }` with `getInterviewQuestions(getRuntimeState()?.professionId || 'software_engineer')`, used throughout (question display, count badge, session creation). Session now stores the real `professionId` from runtime instead of the hardcoded string.

- **Задание 52 — Interview Results filter by profession:**
  Added `getSessionsByProfession(professionId)` to `interview_store.ts` (`sessions.filter(s => s.professionId === professionId)`).
  Changed `InterviewResultsScreen` prop from `session: InterviewSession` to `professionId: string` — metrics now aggregate across ALL sessions for that profession, showing "X questions across Y sessions" in the header.

- **Задание 53 — Playbook profession-agnostic analysis:**
  Playbook categories (resume, linkedin, interview, salary, communication, body_language, mistakes, confidence, remote) are **universal** — common interview skills valid for any profession. Content inside categories (e.g. "Technical Interview" vs "Data Case Study") may become profession-specific in v2. **No code change needed now.**

- **Задание 54 — PROJECT_STATUS.md:** this entry.

**Files:**
- `src/core/interview/interview_question_loader.ts` (new)
- `src/core/interview/interview_store.ts` — added `getSessionsByProfession()`
- `src/screens/InterviewTrainerScreen/InterviewResultsScreen.tsx` — changed prop from `session` to `professionId`
- `src/screens/InterviewTrainerScreen/InterviewTrainerScreen.tsx` — dynamic question loading, runtime professionId
- `PROJECT_STATUS.md` — this entry

**Verified:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.

### 2026-07-08 — Claude (баг: "Saving progress..." зависает навечно после Test → New Journey)

**Симптом (от Serj):** нажимаешь 🧪 Test в настройках (перекидывает на последнюю главу), потом New Journey → правильно попадаешь на выбор профессии → выбираешь профессию → в первой же главе на первом задании после Complete Mission экран зависает на "Saving progress..." надолго, пройти профессию заново не получается.

**Причина:** `resetRuntime()` (`src/core/runtime/runtime_controller.ts`) и обработчик события `RESET_JOURNEY` в `src/App.tsx` (срабатывает при New Journey) оба вызывали `clearAll()` из `system_event_bus.ts` — а это **полностью очищает Map слушателей всей шины событий**, а не только "рантайм"-подписки.

Проблема в том, что `skill_engine.ts` подписывается на `MISSION_SUBMIT` **один раз на уровне модуля** (`subscribe('MISSION_SUBMIT', ...)` вызывается один раз при первом импорте модуля и никогда повторно) — так же как и все подписки в `App.tsx` через `useEffect` с пустым deps-массивом (App не перемонтируется). После первого `clearAll()` эти подписки исчезают навсегда и никто их заново не регистрирует.

Итог: после New Journey `MissionScreen` эмитит `MISSION_SUBMIT`, но слушателя `skill_engine.ts` уже нет в Map → `MISSION_RESULT` никогда не приходит → интерфейс висит на "Saving progress..." до 5-секундного safety timeout (`Save timeout — please try again.`), и по факту прогресс никогда не сохраняется, потому что submitTask() вообще не вызывается. Заодно ломались и другие App-level подписки (OPEN_PLAYBOOK, START_INTERVIEW_TRAINER, сам RESET_JOURNEY и т.д.) — то есть баг был шире, чем просто первая миссия.

**Почему баг не проявлялся раньше:** до первого New Journey/Reset за сессию `clearAll()` ни разу не вызывался, так что все подписки из первого прохождения профессии работали нормально — баг проявляется только после первого сброса/повторного прохождения.

**Исправление:** убран вызов `clearAll()` из `resetRuntime()` и из `RESET_JOURNEY`-обработчика в `App.tsx`. Сброс рантайма должен очищать только состояние (`runtimeState`, `activeTask`, `clearRuntime()` в persistence), а не шину событий целиком — экраны и так сами отписываются через cleanup-функции `useEffect`, шина событий не должна "обнуляться" между профессиями.

**Files:**
- `src/core/runtime/runtime_controller.ts` — `resetRuntime()` больше не вызывает `clearAll()`, убран неиспользуемый импорт `clearAll`
- `src/App.tsx` — обработчик `RESET_JOURNEY` больше не вызывает `clearAll()`, убран неиспользуемый импорт
- `PROJECT_STATUS.md` — this entry

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Не проверено вживую** — нужен ретест на телефоне: Test → New Journey → выбрать профессию → пройти первое задание, убедиться что "Saving progress..." не зависает и Mission Complete показывается сразу.

### 2026-07-08 — Claude (полный переписыв FinalCinematicScreen по сценарию)

**Задача от Serj:** старая анимация была кривой. Полностью переписана по
точному сценарию:

**Фаза 1 — hud-fade (0.9s):**
Интерфейс плавно исчезает (чёрный overlay уходит), камера фиксируется
на первом острове (Resume — нижний). Resume подсвечивается (glow), всплывает
название.

**Фаза 2 — building:**
- Мост строится снизу вверх через rAF (`strokeDashoffset` → 0)
- Путешествующая точка-огонёк движется по мосту
- По прибытии к следующему острову: тот загорается (glow-анимация) + всплывает название
- Камера плавно перемещается вверх синхронно с мостом (ease-in-out через rAF, не CSS)
- Острова расположены снизу вверх (Resume внизу, Offer наверху) — камера начинает снизу
- Цикл повторяется для каждой пары островов (N-1 мостов)

**Фаза 3 — zoom-out (2.4s):**
Камера отдаляется (scale уменьшается через rAF), все острова видны целиком.

**Фаза 4 — crossfade (1.3s):**
Мир плавно гаснет в чёрный.

**Фаза 5 — hero:**
- `island_software_engineer.png` на весь экран (object-fit: cover)
- Остров парит (CSS float animation 4.5s)
- Gradient scrim снизу для читаемости
- Кнопка «Перейти к интервью» → emits `START_INTERVIEW_TRAINER`
- Кнопка «Выбрать новую профессию» → emits `RESET_JOURNEY`
- Если файл отсутствует — fallback 🏙️ emoji

**Технически:**
- Все камерные анимации через `requestAnimationFrame`, не CSS transitions
- Мост: `<line>` SVG с `strokeDashoffset` для построения снизу вверх
- Positional layout: island[0]=Resume имеет наибольший `top` в колонке
  (снизу), island[N-1]=Offer — наименьший (сверху)
- Bridge позиционируется через `position: absolute; bottom: 120px` (= ISLAND_H)
  внутри слота острова
- `npx tsc --noEmit` — чисто, `npx vite build` — чисто (в клоне проекта)

**Файлы:**
- `src/screens/JourneyScreen/components/FinalCinematicScreen.tsx` — полный переписыв
- `src/screens/JourneyScreen/components/FinalCinematicScreen.css` — полный переписыв
- `PROJECT_STATUS.md` — эта запись

**Не проверено вживую** — нужно пройти все главы до конца и убедиться:
(а) все 5 фаз анимации проходят без артефактов;
(б) мост строится плавно от каждого острова к следующему, камера следует;
(в) zoom-out показывает все острова;
(г) hero-экран показывает `island_software_engineer.png` с кнопками;
(д) кнопки работают и ведут в нужные экраны.

### 2026-07-08 — Claude (резолв merge-конфликта App.tsx + runtime_controller.ts)

**Симптом:** `npm run build` падал с `Unexpected "<<"` в `src/App.tsx:78`
и в `src/core/runtime/runtime_controller.ts` — git-конфликт слияния не был
разрешён перед пушем.

**Конфликты:**

1. `src/App.tsx` — конфликт в `subscribe('RESET_JOURNEY', ...)`:
   HEAD звал `resetJourney()`, ветка звала `clearRuntime()`.
   **Оставлен `resetJourney()`** — правильная функция (уже содержит
   `clearRuntime()` + запись в persistence), `clearAll()` убран согласно
   фиксу 2026-07-08.

2. `src/core/runtime/runtime_controller.ts` — конфликт в imports:
   HEAD импортировал `clearAll` из event bus, ветка — нет.
   **Убран `clearAll` из импортов**. Заодно убран `clearAll()` из тела
   `resetJourney()` — он там тоже оставался (HEAD), вызывая тот же баг
   «Saving progress... зависает» после New Journey (см. запись выше).
   `clearNotes` и обёртка `saveRuntime` оставлены.

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.

**Файлы:** `src/App.tsx`, `src/core/runtime/runtime_controller.ts`,
`PROJECT_STATUS.md`

### 2026-07-09 — Claude (сессия — FinalCinematicScreen: Tron-стиль мостов)

- FinalCinematicScreen.tsx + .css: убран чёрный фон-рамка вокруг островов (background/border/border-radius → transparent/none)
- Острова увеличены до 90vw (были 200px), ISLAND_H 120→260, ISLAND_SPACING 240→380
- Мост переработан: двойная неоновая трасса (glow + core) в стиле Трон, бегущая искра (diamond с крестом) вместо шарика
- fc-root получает фон из /1_fon_end_anim.png (файл добавить вручную)
- Mobile media query обновлён под новые размеры

**Файлы:** `src/screens/JourneyScreen/components/FinalCinematicScreen.tsx`,
`src/screens/JourneyScreen/components/FinalCinematicScreen.css`,
`PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Не проверено вживую** — нужно: (а) проверить что острова без чёрных карточек парят на фоне анимации; (б) мосты рисуются неоновым путём с искрой; (в) проверить мобильные размеры.

### 2026-07-09 — Claude (Задания 73–76: FinalCinematic — refs instead of state for bridge animation)

**Serj's report:** Final animation shows only one island in center, no bridges, no camera movement.

**Root cause:** `activeBridge` state + `useEffect` cleanup race condition. `setActiveBridge()` triggers effect cleanup → `cancelAnimationFrame` kills newly started bridge animation in same tick. Bridge never builds, camera never moves.

**Fix:**
- Removed `activeBridge` state — replaced with `activeBridgeRef` (useRef) to avoid state-driven re-render cycles
- Bridge sequencing via `setTimeout` chain in a single effect (no `bridgesDone`/`activeBridge` in deps)
- All timeouts tracked in array for proper cleanup on unmount
- Camera position tracked via `camYRef` with minimal render updates
- Fixed zoom-out effect: `return () => clearTimeout(hold)` was inside rAF callback (return value ignored, timeout leak) — now stored in timeouts array and cleaned up properly

**Island order check (Задание 74):** `islandTop(i) = (N-1-i) * ISLAND_SPACING` — i=0 (Resume) at bottom (max top), i=N-1 (Offer) at top (top=0). Camera starts at `targetCamY(0)` centering Resume. Correct.

**Final island fullscreen (Задание 75):** Already implemented as hero-phase — `island_${professionId}.png` with buttons. No changes needed.

**Files:** `src/screens/JourneyScreen/components/FinalCinematicScreen.tsx`,
`PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Not verified on-device** — needs retest.

### 2026-07-09 — Claude (Задание 77: Golden door particles in hero screen)

- Added 15 golden floating particles that emit from the "doors" area (lower-center) during hero phase
- Particles use CSS `@keyframes particleFly` (2s loop) with staggered `animationDelay`
- Each particle: gold radial gradient, fly upward 80px while scaling down, blur 0.5px
- Positions deterministic from index (no `Math.random()` jitter on re-render)
- Particles render inside `.final-island-container` overlay above the hero image

**Files:** `src/screens/JourneyScreen/components/FinalCinematicScreen.tsx`,
`src/screens/JourneyScreen/components/FinalCinematicScreen.css`,
`PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Not verified on-device** — needs visual check: golden sparkles rising from door area on hero screen.

### 2026-07-09 — OpenCode (Задание 78: Islands +50%, WorldRenderer as background)

**Islands +50%:**
- Added `transform: scale(1.5); transform-origin: center bottom;` to `.fc-island-img` in CSS
- Islands visually grow 50% larger from the bottom of each slot while layout/bridge positions stay correct
- Canvas bridges still connect to slot centers; the scaled islands overlap bridges slightly for a more impressive look

**WorldRenderer as background:**
- Removed `url('/1_fon_end_anim.png')` background from `.fc-root` — now transparent
- WorldRenderer (permanently mounted at z-index 0 in App.tsx) shows through as the cinematic background
- `.fc-blackout` (fades from #05080f to transparent during hud-fade) provides smooth transition from black to WorldRenderer
- `.fc-hero` keeps its `background: #05080f` — hero overlay remains solid for text/button readability

**Files:** `src/screens/JourneyScreen/components/FinalCinematicScreen.css`,
`PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Not verified on-device** — needs visual check: (a) islands 50% bigger with no distortion; (b) WorldRenderer visible behind the cinematic instead of the static background image.

### 2026-07-09 — OpenCode (Задание 80: Particles exactly in doors)

**Fix — gold particle positions now in pixels relative to fixed-size PNG container:**
- `.final-island-container` changed from `position: absolute; inset: 0` to a fixed-size centered wrapper (`width: min(400px, 90vw); height: 975px; top: 50%; left: 50%; transform: translate(-50%, -50%)`)
- Hero image inside uses class `.fc-island-png` with `object-fit: contain` (was `object-fit: cover` fullscreen)
- Removed old `.fc-hero-img` class (replaced by `.fc-island-png` inside container)
- Particles: 20 instead of 15, pixel coordinates (`bottom: 558-710px`, `left: 75-325px`) matching door area of PNG
- Particle CSS: 4px (was 3px), 2.5s flight (was 2s), +120px upward (was 80px), added `box-shadow: 0 0 6px 2px rgba(255,215,0,0.4)`, updated gradient stops

**Files:** `src/screens/JourneyScreen/components/FinalCinematicScreen.tsx`,
`src/screens/JourneyScreen/components/FinalCinematicScreen.css`,
`PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Not verified on-device** — needs visual check: golden particles rising from exact door area (bottom 558-710px) of the hero island PNG.

### 2026-07-09 — OpenCode (Задание 82: Float on container, particles move with PNG)

**Fix — moved `fc-hero-float` animation from `.fc-island-png` (img) to `.final-island-container` (wrapper):**
- Container now floats as one unit — particles move together with the hero image
- Merged `translate(-50%, -50%)` centering into the keyframes to avoid transform conflict
- `.fc-island-png` has no animation, only `object-fit: contain`

**Files:** `src/screens/JourneyScreen/components/FinalCinematicScreen.css`,
`PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Not verified on-device** — particles should drift together with the floating island.

### 2026-07-09 — OpenCode (Задание 83: Remove labels, add cursor sparks)

**1. Island labels removed:**
- Removed `labelVis` state, all `setLabelVis()` calls, and `.fc-label` span from TSX
- Removed `.fc-label` CSS rules (desktop + mobile media query)
- Each island slot now has only the PNG + fallback, no text label next to it

**2. Bridge cursor with CSS-only spark particles:**
- Added `.fc-cursor` — 12px glowing cyan dot with `box-shadow: 0 0 20px 8px rgba(0,229,224,0.6)`, positioned at the bridge tip via `cursorRef` in the rAF tick
- `::before` / `::after` pseudo-elements generate gold spark particles that fly outward (—15/15px X, —10/—8px Y) with `@keyframes sparkTrail` (1s loop, staggered delays 0s / 0.3s)
- Cursor position recalculated each frame from `islandCY(idx) * camScale + camY` to stay locked to the bridge tip during camera movement

**Files:** `src/screens/JourneyScreen/components/FinalCinematicScreen.tsx`,
`src/screens/JourneyScreen/components/FinalCinematicScreen.css`,
`PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Not verified on-device** — check: (a) no island labels visible; (b) cyan cursor dot with gold sparks flies along each bridge during building phase.

### 2026-07-09 — OpenCode (Задание 85: Fullscreen hero image, particles in viewport %)

**Hero image reverted to fullscreen:**
- Removed fixed-size `.final-island-container` (400×975px) approach from Задание 80/82
- Restored `.fc-hero-img` — `position: absolute; inset: 0; object-fit: cover; object-position: center 25%` fills the entire hero screen
- Float animation back on the img (not container), keyframes simplified to `scale(1) translateY(0)` / `scale(1.02) translateY(-10px)` without centering offset

**Particles in viewport % (aligned to door region):**
- Particles now positioned in `%` of viewport instead of fixed pixels
- Horizontal: `centerX 50% ± 125px` converted to vw via `(125 / window.innerWidth) * 100`
- Vertical: door region approximated as `bottom: 82-98%` (25% object-position offset + 57-73% door position in PNG)
- Removed `.fc-island-png` / `.final-island-container` CSS rules; `.door-particles` is now a simple fullscreen overlay (`position: absolute; inset: 0; z-index: 2`)

**Files:** `src/screens/JourneyScreen/components/FinalCinematicScreen.tsx`,
`src/screens/JourneyScreen/components/FinalCinematicScreen.css`,
`PROJECT_STATUS.md`

**Verified:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Not verified on-device** — check particles align with door region of the fullscreen hero image at different screen sizes.

### 2026-07-09 — OpenCode (Задание 86: Частицы поверх картинки, упрощение позиций)

**Упрощены позиции частиц:**
- Убрана сложная конвертация `(125 / vw) * 100` — теперь `left: 45-55%` (центр ±5%)
- Вертикаль: `bottom: 20-35%` вместо `25 + 57 + Math.random() * 16`
- `.final-island-container` уже был удалён в Задании 85 — код уже соответствовал требуемой структуре
- Единственное изменение: упрощение расчёта позиций в TSX (убран `centerX`/`spreadVw`/`bottomPct`, прямые проценты в `style`)

**Файлы:** `src/screens/JourneyScreen/components/FinalCinematicScreen.tsx`,
`PROJECT_STATUS.md`

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.

### 2026-07-09 — OpenCode (Задание 88: Фон world.png)

**Добавлен бэкграунд world.png обратно:**
- В Задании 78 фон был убран (`.fc-root` стал transparent для WorldRenderer)
- Теперь добавлен profession-специфичный `world.png` через инлайн-стиль: `url('/art/${professionId}/world.png') center center / cover no-repeat, #05080f`
- Фоллбэк `#05080f` если файл отсутствует

**Файлы:** `src/screens/JourneyScreen/components/FinalCinematicScreen.tsx`,
`PROJECT_STATUS.md`

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.

### 2026-07-09 — OpenCode (Задание 94: WorldMapScreen — 7 островов зигзагом)

**Полный переписыв WorldMapScreen:**
- Вместо пустого экрана с фоном — 7 островов зигзагом снизу вверх:
  - resume (center, 0%), linkedin (left, 15%), applications (right, 30%)
  - interviews (left, 45%), offer_preparation (right, 60%), offer (left, 75%)
  - city-профессии (center, 90%)
- Каждый остров: PNG (или fallback 🏝️), прогресс-индикатор `X%`, подсветка акцентным цветом
- Заблокированные главы: `opacity: 0.4; grayscale(0.8)`
- Кликабельные: `cursor: pointer; drop-shadow(accent)`, вызывают `onChapterSelect`
- Город профессии: `island_${professionId}.png`, 150% размер, иконка 🏙️
- Все острова с `@keyframes island-float` (translateY -10px, 3.5s)
- Сохранён проп `style` для совместимости с `App.tsx`

**Файлы:** `src/screens/WorldMapScreen/WorldMapScreen.tsx` (переписан),
`src/screens/WorldMapScreen/WorldMapScreen.css` (переписан),
`PROJECT_STATUS.md`

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Не проверено вживую** — нужен визуальный осмотр: острова по спирали/зигзагу, прогресс, кликабельность.

### 2026-07-09 — OpenCode (Задание 100+101: SVG иконки + WorldMapScreen с иконками)

**Задание 100 — SVG иконки:**
- Создан `src/components/Icon/Icon.tsx` — 17 SVG-иконок (resume, linkedin, applications, interviews, offer, communication, body_language, confidence, trophy, microphone, city, island, map, medal, chart, target, star)
- Feather-style: `stroke`, `strokeWidth=2`, `round` caps, `drop-shadow(0 0 4px $color)` через inline style
- Принимает `name`, `size` (default 24), `color` (default #00e5e0)

**Задание 101 — WorldMapScreen переписан с Icon:**
- Импортирует `Icon` вместо эмодзи для fallback-островов и city
- Позиции зигзага сдвинуты (0→5%, 15→18%, 30→31%, 45→44%, 60→57%, 75→70%, 90→83%)
- `isUnlocked`: глава открыта если предыдущая на 100%, иначе `opacity: 0.35; grayscale(0.9)`
- `getProgress` получает `completed/total` через `getActiveChapters()` + `nodeStates`
- `.world-island-float` — 100×100px контейнер с `island-float` анимацией
- Город: `<Icon name="city" color="#FFD700" />` вместо 🏙️
- Fallback острова: `<Icon name="island" size={48} color={accent} />` вместо 🏝️

**Файлы:** `src/components/Icon/Icon.tsx` (новый),
`src/screens/WorldMapScreen/WorldMapScreen.tsx` (переписан),
`src/screens/WorldMapScreen/WorldMapScreen.css` (переписан),
`PROJECT_STATUS.md`

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.
**Не проверено вживую** — нужна проверка: (а) иконки рендерятся корректно; (б) WorldMapScreen с новыми позициями и isUnlocked.

### 2026-07-09 — OpenCode (Задание 103: Все фиксы пачкой)

**PlaybookScreen.tsx:**
- CATEGORIES: `icon: string` → `iconName: string` (эмодзи → имя иконки)
- Рендер: `<Icon name={cat.iconName} size={28} color={cat.color} />`
- `← Назад` → `← Back` (4 места)

**NotesScreen.tsx:**
- Удалён `CATEGORY_ICONS` (мапа эмодзи), вместо него `<Icon name={cat} size={20} color={CATEGORY_COLORS[cat]} />`
- `← Назад` → `← Back` (2 места)

**InterviewTrainerScreen.tsx:**
- Импортирован `Icon`, `🎤` → `<Icon name="microphone" size={64} color="#00e5e0" />`
- `🔄 Переписать` → `🔄 Re-record`, `Далее →` → `Next →`, `← Exit Interview` → `← Exit`

**WorldMapScreen.css:**
- Убрано свечение `.world-island--unlocked` (drop-shadow) и `.world-island--city`
- `.world-island-float` расширен 100→140px

**WorldMapScreen.tsx:**
- Позиции подняты на 10% (bottom: 5→15%, 18→26%, 31→37%, 44→48%, 57→59%, 70→70%, 83→81%)

**ChapterHub.css:**
- Добавлен `.island-art-wrapper` (200×200px, `overflow: visible`, flex center)

**Файлы:** `src/screens/PlaybookScreen/PlaybookScreen.tsx`,
`src/screens/NotesScreen/NotesScreen.tsx`,
`src/screens/InterviewTrainerScreen/InterviewTrainerScreen.tsx`,
`src/screens/WorldMapScreen/WorldMapScreen.tsx`,
`src/screens/WorldMapScreen/WorldMapScreen.css`,
`src/screens/JourneyScreen/components/ChapterHub.css`,
`PROJECT_STATUS.md`

**Проверено:** `npx tsc --noEmit` — чисто, `npx vite build` — чисто.

### 2026-07-09 — Claude (World map: разблокировка островов по факту начала главы)

**useIslandPositions.ts:**
- Раскладка островов (3 слева/3 справа вертикально, прогресс-бейдж с внутренней стороны) уже соответствовала ТЗ — багом не была.
- Пофикшена логика `unlocked`: раньше остров открывался только когда **предыдущая** глава была на 100%. Теперь остров активен, если: это первая глава, ИЛИ у неё уже есть собственный прогресс > 0, ИЛИ это `activeChapterId`, ИЛИ предыдущая глава завершена (fallback).

**Файлы:** `src/screens/WorldMapScreen/hooks/useIslandPositions.ts`, `PROJECT_STATUS.md`

**Проверено:** `npx tsc --noEmit` — чисто (по затронутым файлам).
**Не проверено вживую** — нужна проверка на устройстве: тап по острову сразу после старта его главы (до завершения) должен вести в главу.


### 2026-07-09 — Claude (Review overflow, World zigzag→columns, Chapter Complete visuals)

**OnboardingScreen (Review screen overflow):**
- `.onboarding-timeline` / `.onboarding-sub` had **zero CSS rules** — the icon+text+subtext inside the "Journey Length" review card had no layout, causing it to overflow past the screen edge.
- Added flex-column layout for `.onboarding-timeline`, made its card span the full grid width (`.review-item--wide`), added `overflow-wrap`/`word-break` safety on all review cards.
- Mission count was hardcoded as "38" — actual count (`SoftwareEngineerModule.skillGraph.length`) is 41. Replaced hardcoded number with a live import from the profession module so it can't drift again.

**WorldMapScreen (island layout):**
- `ISLAND_POSITIONS` alternated left/right per chapter (zigzag path). Changed to grouped columns: chapters 1–3 stack vertically on the left, chapters 4–6 stack vertically on the right, hero/city island on top — per spec. Progress-badge placement (inner edge of each column) was already correct, untouched.

**TaskCompleteScreen (chapter-complete banner + button):**
- `.chapter-complete-banner` had a green pill background behind the trophy icon + "CHAPTER COMPLETE!" text — removed the background/border, kept only the green text/icon tint.
- `.task-complete-banner` had no flex alignment, so the icon and text weren't vertically centered as a row — made it `inline-flex` with `align-items:center`.
- Trophy icon now explicitly colored `#00b894` (matches the label) instead of the default cyan.
- "Next Chapter →" button's map icon now explicit `color="#fff"` instead of the default cyan/glow, so it doesn't read as a stray green icon on the orange button.

**Файлы:** `src/screens/OnboardingScreen/OnboardingScreen.tsx`, `src/screens/OnboardingScreen/OnboardingScreen.css`, `src/screens/WorldMapScreen/hooks/useIslandPositions.ts`, `src/screens/MissionScreen/TaskCompleteScreen.tsx`, `src/screens/MissionScreen/TaskCompleteScreen.css`, `PROJECT_STATUS.md`

**Проверено:** `npx tsc --noEmit` — чисто (кроме pre-existing baseUrl deprecation warning, не связано).
**Не проверено вживую** — нужна проверка на устройстве: (а) Review-экран онбординга не улетает за экран и показывает 41 Missions; (б) World: 3 острова слева колонкой, 3 справа колонкой, hero сверху; (в) экран Chapter Complete — трофей без зелёной плашки, кнопка Next Chapter без лишней иконки-глюка.


### 2026-07-09 — Claude (World: columns weren't vertically balanced)

**useIslandPositions.ts:**
- Audited for leftover/dead code per Serj's suspicion — found none; `WorldMapScreen.css`/`Island.tsx`/`useIslandPositions.ts` are the only files touching `.world-island*`, no stale duplicates.
- Real bug: previous commit's "grouped columns" fix confined the left column to the bottom half of the screen (8–40%) and the right column to the top half (52–84%) — so left looked stuck at the bottom, right looked stuck near the top/center, exactly as reported. Rewrote so both columns share the same full vertical range (10–82%, 3 evenly spaced rows each) via a small `columnPosition()` helper instead of hand-picked percentages.

**WorldMapScreen.css:**
- Island size was a fixed 120px; switched to `clamp(110px, 30vmin, 190px)` so islands scale up proportionally with screen size instead of a fixed pixel size. Row spacing is already percentage-based (proportional to screen height) via the helper above.

**Файлы:** `src/screens/WorldMapScreen/hooks/useIslandPositions.ts`, `src/screens/WorldMapScreen/WorldMapScreen.css`, `PROJECT_STATUS.md`

**Проверено:** `npx tsc --noEmit` — чисто.
**Не проверено вживую** — нужна проверка на устройстве: левая и правая колонки должны визуально занимать одинаковую высоту экрана (не одна внизу, другая вверху), острова заметно крупнее.


### 2026-07-09 — Claude (World: off-screen islands, badge overlap, nav clipping, hero placement)

**WorldMapScreen.css:**
- `left: 10%` / `right: 10%` were fixed percentages that didn't account for the island's own width — once islands got bigger (previous commit), the left column clipped off the left edge of the screen, and the right column's large size made it visually crowd toward center. Fixed with a single `--island-size` CSS var (now +15%: `clamp(126px, 34vmin, 218px)`) used both for the float wrapper's size AND for `left`/`right: calc(var(--island-size) / 2 + 10px)` — the anchor point always accounts for the island's own half-width, so it can never clip off either edge, at any viewport size.
- The two lowest islands rendered underneath the floating bottom-nav pill (72px tall, 16px from edge). Added `padding-bottom: calc(72px + 16px + 24px + env(safe-area-inset-bottom))` on `.world-islands`, which — since percentage `bottom` on an absolutely-positioned child resolves against the parent's padding box — shifts every row up by that fixed clearance regardless of screen height.

**useIslandPositions.ts:**
- Row spacing tightened (24–62% range, 19% step vs. previous 36% step) per request to reduce distance between islands.
- Left/right rows are now staggered by half a row-step. Previously same-height left/right islands both push their progress badges toward the screen's horizontal center, so at the same height the two badges collided. Staggering keeps every badge at a distinct height.
- Hero/city island moved to `bottom: 100%` (anchor at the very top edge), so — combined with the existing `translate(-50%, 50%)` — roughly half of it now pokes up past the top of the screen, per request.

**Файлы:** `src/screens/WorldMapScreen/WorldMapScreen.css`, `src/screens/WorldMapScreen/hooks/useIslandPositions.ts`, `PROJECT_STATUS.md`

**Проверено:** `npx tsc --noEmit` — чисто.
**Не проверено вживую** — нужна проверка на устройстве: острова не обрезаются по бокам, прогресс-бейджи не перекрываются, нижние 2 острова не под меню, hero-остров сверху выглядывает наполовину.


### 2026-07-09 — Claude (World: hero island was clipped — that was a bug report, not a request)

Misread the previous message: "главный остров ... наполовину за верх экрана" was Serj reporting a bug (hero island half-invisible off the top edge), not requesting that look. Reverted:

- `CITY_POSITION.bottom`: `100%` → `88%`, so the hero island now sits fully inside the visible screen, just above the highest regular island.
- Added `padding-top: calc(var(--island-size)/2 + 24px + env(safe-area-inset-top))` to `.world-islands`, mirroring the existing bottom-nav clearance padding, so the hero island can't clip the top edge on short viewports either.

**Файлы:** `src/screens/WorldMapScreen/hooks/useIslandPositions.ts`, `src/screens/WorldMapScreen/WorldMapScreen.css`, `PROJECT_STATUS.md`

**Проверено:** `npx tsc --noEmit` — чисто.
**Не проверено вживую.**


### 2026-07-09 — Claude (World: switched to CSS Grid, per Serj's explicit design)

Root cause of the repeated left/right/overlap bugs finally found: `src/screens/WorldMapScreen/index.tsx` had **never actually been touched** in any of the previous sessions — I kept editing `useIslandPositions.ts` and `WorldMapScreen.css` assuming an absolute-position (`bottom`/`left`/`right`) layout, but `index.tsx` (present in the repo since before this thread started) was already expecting a completely different, incompatible shape (`position.row` for a CSS grid) that never existed on `IslandPosition`. My CSS classes and the component's actual markup were out of sync the whole time — that's the "мусор" Serj suspected.

Rebuilt per Serj's explicit spec — 7 containers, CSS Grid:
- `.world-grid`: `grid-template-columns: 1fr 1fr`, `grid-template-rows: 1.15fr 1fr 1fr 1fr` (hero row + 3 rows × 2 cols). All sizing is `fr`/`vmin`-based so it scales proportionally with screen size automatically — no manual percent/calc positioning left anywhere.
- `.world-cell--hero` spans both columns (row 1) and holds the hero/city island.
- Each `.world-cell` is a flex box that centers its one island — this is what "centers" every island inside its container.
- `useIslandPositions.ts`: `IslandPosition` is now `{ side, row }` — chapters 1-3 → left column rows 2-4, chapters 4-6 → right column rows 2-4, hero → row 1.
- Deleted `Bridge.tsx` (the old zigzag-path connector lines) — no longer meaningful with a grid layout and wasn't imported by `index.tsx` anyway.
- Progress badge is now simply below the island icon (centered), not offset to the left/right — removes the source of the earlier badge-collision bugs entirely.

**Файлы:** `src/screens/WorldMapScreen/index.tsx`, `src/screens/WorldMapScreen/WorldMapScreen.css`, `src/screens/WorldMapScreen/hooks/useIslandPositions.ts`, `src/screens/WorldMapScreen/components/Island.tsx`, `src/screens/WorldMapScreen/components/Bridge.tsx` (deleted), `PROJECT_STATUS.md`

**Проверено:** `npx tsc --noEmit` — чисто. `vite build` не запускался (в этой песочнице нет node_modules — окружение, не связано с кодом); нужно прогнать `npm run build` на вашей стороне перед тем как считать это финально проверенным.
**Не проверено вживую.**

---

### 2026-07-11 — OpenCode (md audit: README, ARCHITECTURE_SNAPSHOT, structura, INTERVIEW_TRAINER, WORLD_LAYOUT_GUIDE, +Window_functional)

- Переписан `README.md` (описание проекта, стек, структура, команды, ключевые доки)
- Обновлён `ARCHITECTURE_SNAPSHOT.md` (текущее дерево файлов, экраны, ядро, навигация, event bus, onboarding state)
- Обновлён `structura.md` (относительные пути, добавлены InterviewTrainerScreen/, core/interview/, core/notifications/, core/voice/)
- Обновлён `docs/INTERVIEW_TRAINER.md` (текущая архитектура с голосовыми модулями)
- `WORLD_LAYOUT_GUIDE.md` — проверено на соответствие `world_layout.ts` (<30% расхождение), добавлена дата `2026-07-11`
- `+Window_functional.md` — проверено на соответствие `BottomNavigation.tsx`, добавлена дата `2026-07-11`

**Файлы:** `README.md`, `ARCHITECTURE_SNAPSHOT.md`, `structura.md`, `docs/INTERVIEW_TRAINER.md`, `WORLD_LAYOUT_GUIDE.md`, `+Window_functional.md`, `PROJECT_STATUS.md`

**Проверено:** `npx tsc --noEmit` — чисто. Не проверено вживую.

---

### 2026-07-11 — Claude (двадцать первая сессия — два бага World экрана)

**Баг 1: подписи и прогресс нижних островов скрыты за BottomNav в World.**

Причина 1 (padding): `.world-grid` имел `padding-bottom: calc(80px + env(safe-area-inset-bottom))`, но BottomNav реально занимает `bottom: 0; pb-6 (24px) + ~56px контент = ~80px от низа экрана` — итого нижние острова попадали ровно под навигацию. Увеличено до `calc(112px + env(safe-area-inset-bottom, 0px))` — 112px = 80px BottomNav + 32px зазор (стандарт проекта из MissionScreen) — с запасом на `translateY(-8px)` float-анимации.

Причина 2 (overflow): `.world-map-screen` имеет `overflow: hidden`. `.world-cell` и `.world-island` не имели `overflow: visible`, из-за чего `island-art-img` (143% от родителя) и float-анимация могли обрезаться границами ячейки грида. Добавлен `overflow: visible` на `.world-cell` и `.world-island`.

**Файлы:** `src/screens/WorldMapScreen/WorldMapScreen.css`

---

**Баг 2: парящий остров не рендерится в главе Offer при навигации через кнопку Next.**

Причина (stale DOM inline styles): `ChapterHub.tsx` мутирует DOM напрямую через `img.style.display = 'none'` и `fallback.style.display = 'flex'` в `onLoad`/`onError` колбэках (не через React state). При смене `chapter` без ремонтирования компонента React сохраняет тот же DOM-элемент `<div className="island-art-slot">` и просто меняет `img.src`. Inline стили от предыдущей главы остаются: например, если Interviews успешно загрузил img (`placeholder.style.display = 'none'`), потом при переходе в Offer `src` меняется, `onLoad`/`onError` срабатывают для нового src — но если DOM-мутация от предыдущей главы вывела `img.style.display = 'none'` (из `onError` Interviews) и `placeholder.style.display = 'flex'`, эти состояния могут не совпадать с ожидаемыми начальными значениями нового `chapter.id`. Итог: пустой слот вместо острова.

Исправлено: добавлен `key={chapter.id}` на `<div className="island-art-slot">`. При каждой смене главы React полностью пересоздаёт слот с чистым DOM — никаких остаточных inline-стилей.

**Файлы:** `src/screens/JourneyScreen/components/ChapterHub.tsx`

---

`npx tsc --noEmit` — предупреждение про устаревший `baseUrl` (существующее, не новое), ошибок нет. `npx vite build` — чисто (630.79 kB gzip 199.87 kB).

**Не проверено вживую на телефоне.** Проверить: (1) открыть World → прокрутить вниз — подписи и прогресс нижних островов должны быть видны над BottomNav. (2) Journey → глава Interviews → пройти все узлы → кнопка Next → Next → дойти до Offer — парящий остров Offer должен отрисоваться.

---

### 2026-07-12 — Claude (баг: остров не отображается в главе Offer Preparation)

**Баг: заходишь в Journey, глава Offer Preparation — парящий остров (`island-offer-preparation.png`) не показывается, вместо него плейсхолдер-иконка.**

Причина: опечатка в маппинге имени файла арта на chapter.id — ключ `offer_preparation` указывал на `'offer-preparation.png'` (без префикса `island-`), в то время как реальный файл в `public/art/software_engineer/` называется `island-offer-preparation.png` (как и у всех остальных глав, все они имеют префикс `island-`). `<img src>` уходил в 404, срабатывал `onError`, картинка скрывалась и показывался плейсхолдер. Это не тот же баг, что в предыдущей записи (там про stale DOM/key remount) — файл 404 существовал всегда независимо от remount-фикса.

Исправлено в двух местах, где был один и тот же неверный маппинг:
- `src/screens/JourneyScreen/components/ChapterHub.tsx` — `CHAPTER_ART_FILENAME['offer_preparation']` → `'island-offer-preparation.png'`
- `src/screens/JourneyScreen/components/FinalCinematicScreen/index.tsx` — `CHAPTER_ART['offer_preparation']` → `'island-offer-preparation.png'` (тот же паттерн бага, на будущее, не проверялся вживую отдельно)

**Файлы:** `src/screens/JourneyScreen/components/ChapterHub.tsx`, `src/screens/JourneyScreen/components/FinalCinematicScreen/index.tsx`, `PROJECT_STATUS.md`

**Проверено:** `npx tsc --noEmit` — только предсуществующая ошибка `notification_service.ts:190` (unused `chapterId`, не связана с этим фиксом). `npx vite build` — чисто.
**Не проверено вживую на телефоне.**
