# Career Navigator — System Truth

> **⚠️ Этот файл описывал раннюю итерацию архитектуры (v0.6,
> "Skill State Machine", 4 таба, iOS-светлая тема) и был устаревшим.**
> Реальный код ушёл далеко вперёд: `src/core/skill_nodes.ts` из старой
> схемы вообще не существует (заменён на `chapters.ts` /
> `chapter_engine.ts` + профессии в `src/professions/`), а
> `src/core/skill_state.ts` в актуальном дереве не связан с описанной
> здесь 7-статусной схемой. Актуальный источник истины — три файла в
> корне репозитория: `CAREER_NAVIGATOR_MASTER_CHECKPOINT.md`,
> `PROJECT_STATUS.md`, `CORE_MAP.md`. Ниже — исправленное содержание,
> сверенное с текущим кодом (`src/App.tsx`,
> `src/professions/software_engineer/`, `PROJECT_STATUS.md`,
> `CORE_MAP.md`) по состоянию на 2026-07-07.

## Product Definition

Мобильное приложение (React + TypeScript + Vite + Capacitor, Android) —
сюжетная игра о профессиональном развитии: пользователь проходит главы
(chapters) через профессиональные "миры" (сейчас реализован Software
Engineer), а не заполняет чек-листы. Полная философия — в
`CAREER_NAVIGATOR_MASTER_CHECKPOINT.md`.

## Architecture

Единый источник состояния — Runtime (`src/core/runtime/runtime_controller.ts`,
`runtime_store.ts`), а не отдельная "Skill State Machine" из старой схемы.
Прогресс организован по главам (`chapters.ts`, `chapter_engine.ts`), а
не по 7 состояниям skill-нод. Профессия Software Engineer регистрируется
через `src/professions/software_engineer/module.ts`
(`profession_auto_loader.ts` подключает его в рантайме). Второй,
неиспользуемый файл `profession.ts` в той же папке — мёртвый код (см.
запись от 2026-07-07 "(3)" в `PROJECT_STATUS.md" — два расходящихся
определения профессии, баг с пустой главой Offer Preparation).

Полный актуальный список используемых файлов `src/core` — в
`CORE_MAP.md` (сгенерирован по реальному графу импортов через `madge`,
а не собран вручную, как раньше).

## Runtime Mode

Остаётся офлайн/детерминированным: без ИИ в рантайме, без динамической
генерации, без внешних API-вызовов — это по-прежнему верно и
подтверждено текущим кодом.

## Current UI Layer (5 вкладок, см. `+Window_functional.md`)

- **Journey** — главный экран (бывший World): WorldRenderer + JourneyHUD,
  текущая глава/миссии/прогресс.
- **Playbook** — справочник (категории → записи → детали).
- **Notes** — заметки, привязанные к миссии.
- **World** — новая вкладка, карта пройденного пути (сейчас заглушка,
  `WorldMapScreen`).
- **Profile** — "паспорт путешественника" + кнопка Share Progress внутри
  (отдельного экрана Share больше нет).

Навигация — единый `BottomNav` на уровне `App.tsx`, а не отдельный
компонент внутри Journey-экрана, как было в старой схеме.

## Current Development Phase

Stabilization (см. `PROJECT_STATUS.md`) — фазы World Design / Motion
Polish / Art Production ещё не начаты.

## Next Tasks (актуальные, из PROJECT_STATUS.md)

- Разобраться с дублирующим мёртвым кодом (`profession.ts` vs
  `module.ts` для Software Engineer).
- Вычистить неиспользуемые файлы `src/core` с `used_by=0` (раздел
  "Известные проблемы" в `PROJECT_STATUS.md`).
- Заменить эмодзи-иконки на SVG.
- Фазы World Design / Motion Polish / Art Production ещё впереди.
