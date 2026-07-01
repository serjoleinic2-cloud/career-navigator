# Career Navigator — Structure

```
D:\career-navigator/
│
├── .gitignore                         — Исключения git: node_modules, dist, логи, редакторы
├── capacitor.config.ts                — Capacitor (нативный мобильный) конфиг
├── eslint.config.js                   — ESLint flat config (TypeScript, React hooks, React Refresh)
├── index.html                         — Входной HTML Vite: Inter font, viewport, корневой монтах
├── package.json                       — React 18, Zustand, Framer Motion, Capacitor, Vite
├── postcss.config.js                  — PostCSS: Tailwind CSS + Autoprefixer
├── tailwind.config.js                 — Tailwind тема: цвета void/glow/node, анимации float/pulse-glow
├── tsconfig.json                      — Корневой TS: ES2020, path alias @/* → src/*
├── tsconfig.app.json                  — App TS: ES2023, JSX react-jsx, strict
├── tsconfig.node.json                 — Node TS для Vite config
├── vite.config.ts                     — Vite: React plugin, path alias @/ → src/
│
├── structura.md                       — Этот файл: дерево проекта с описаниями
│
└── src/
    ├── main.tsx                       — Точка входа: регистрация профессий, рендер App
    ├── App.tsx                        — Корневой компонент: роутинг (world/playbook/notes/share/debug), default = WorldRendererScreen
    ├── App.css                        — Легаси стили Vite (почти не используется)
    ├── index.css                      — Tailwind layers: glass-panel, glow, atmosphere, hide-scrollbar
    │
    ├── assets/
    │   ├── hero.png                   — Изображение (плейсхолдер)
    │   ├── react.svg                  — Лого React
    │   └── vite.svg                   — Лого Vite
    │
    ├── styles/
    │   ├── animations.css             — CSS keyframe анимации: float, pulse-glow, shimmer, fade, slide
    │   ├── core.css                   — CSS reset и базовая типографика
    │   ├── layout.css                 — Стили лейаута: app shell, flex/grid, секции
    │   └── theme.css                  — CSS custom properties: цвета, градиенты, тени, радиусы
    │
    ├── components/
    │   ├── layout/                    — Переиспользуемые UI-компоненты
    │   │   ├── AppShell.tsx           — Главный shell: TopBar + контент + BottomNavigation
    │   │   ├── BottomNavigation.tsx   — Таб-навигация снизу (journey, playbook, notes, share)
    │   │   ├── BottomNavigation.css
    │   │   ├── GlassCard.tsx          — Glass-morphism карточка с backdrop-filter
    │   │   ├── GlassCard.css
    │   │   ├── IconButton.tsx         — Кнопка-иконка с aria-label
    │   │   ├── IconButton.css
    │   │   ├── PrimaryButton.tsx      — Основная action-кнопка
    │   │   ├── PrimaryButton.css
    │   │   ├── ProgressRing.tsx       — SVG кольцо прогресса с подписью
    │   │   ├── ProgressRing.css
    │   │   ├── TopBar.tsx             — Верхняя панель: назад, заголовок, action
    │   │   └── TopBar.css
    │   │
    │   ├── BottomNav/                 — Навигация с Framer Motion анимацией
    │   │   └── BottomNav.tsx          — Анимированные табы (journey, tasks, progress, profile)
    │   ├── FloatingOrb/               — Анимированная светящаяся сфера
    │   │   ├── FloatingOrb.tsx        — Режимы: idle/moving/arrived, уровни интенсивности
    │   │   ├── FloatingOrb.css
    │   │   └── index.ts
    │   ├── GoalCard/                  — Карточка цели (легаси)
    │   │   ├── GoalCard.tsx           — Прогресс, время, кнопка действия
    │   │   ├── GoalCard.css
    │   │   └── index.ts
    │   ├── JourneyBottomNav/          — Навигация внутри journey экрана
    │   │   ├── JourneyBottomNav.tsx   — Кнопки advance/back
    │   │   └── JourneyBottomNav.css
    │   ├── JourneyFocusPanel/         — Фокус-панель активной ноды
    │   │   ├── JourneyFocusPanel.tsx  — Глава, состояние, описание
    │   │   └── JourneyFocusPanel.css
    │   ├── JourneyHeader/             — Заголовок journey
    │   │   ├── JourneyHeader.tsx      — Название главы, readiness/confidence badge
    │   │   └── JourneyHeader.css
    │   ├── JourneyNodeView/           — Список нод вертикально
    │   │   ├── JourneyNodeView.tsx    — active/completed/locked состояния
    │   │   └── JourneyNodeView.css
    │   ├── JourneyPath/               — Интерактивный путь с главами
    │   │   ├── JourneyPath.tsx        — Скролл-путь с тематическими нодами
    │   │   ├── JourneyPath.css
    │   │   └── theme.ts              — Цвета глав: Resume=синий, LinkedIn=пурпурный и т.д.
    │   ├── JourneyTimeline/           — Горизонтальный таймлайн
    │   │   ├── JourneyTimeline.tsx    — Кликабельные ноды
    │   │   └── JourneyTimeline.css
    │   ├── JourneyVisualLayer/        — Визуальный слой с позиционированными нодами
    │   │   ├── JourneyVisualLayer.tsx — glow/active/completed/locked
    │   │   └── JourneyVisualLayer.css
    │   ├── PathNode/                  — Визуальная карточка ноды навыка
    │   │   ├── PathNode.tsx           — Иконка, цвет состояния, click handler
    │   │   ├── PathNode.css
    │   │   └── index.ts
    │   └── ShareCard/                 — Карточка для шэринга прогресса
    │       ├── ShareCard.tsx          — Скриншот через html-to-image
    │       └── ShareCard.css
    │
    ├── core/                          — Ядро: вся бизнес-логика
    │   ├── index.ts                   — Реэкспорт API ядра: skill_engine как единый источник, WorldRendererScreen как main screen
    │   │
    │   ├── runtime/                   — Управление состоянием рантайма
    │   │   ├── index.ts
    │   │   ├── journey_runtime.ts     — JourneyRuntimeState type + initializeJourneyRuntime
    │   │   ├── runtime_controller.ts  — Центральный контроллер: startJourney, setActiveNode, submitTask
    │   │   ├── runtime_engine.ts      — Обработчик RuntimeEvent через reducer
    │   │   ├── runtime_events.ts      — События рантайма: initialized, node-changed, chapter-advanced
    │   │   ├── runtime_initializer.ts — Инициализация рантайма из onboarding
    │   │   ├── runtime_reducer.ts     — Pure reducer: событие → новое UnifiedRuntimeState
    │   │   ├── runtime_resolver.ts    — Резолвинг контекста: профессия, текущая/следующая нода
    │   │   ├── runtime_selector.ts    — Селекторы: getCurrentNode, getNextNode, getProgressSnapshot
    │   │   ├── runtime_selector_final.ts — Оптимизированные селекторы для UI
    │   │   ├── runtime_store.ts       — In-memory store: get/set/update/reset UnifiedRuntimeState
    │   │   ├── runtime_sync.ts        — Синхронизация runtime с engine: readiness, gap, chapter progress
    │   │   └── unified_runtime_state.ts — UnifiedRuntimeState type (полное состояние приложения)
    │   │
    │   ├── events/                    — Шина событий
    │   │   ├── index.ts
    │   │   └── system_event_bus.ts    — Глобальная pub/sub шина (26+ типов, включая MISSION_SUBMIT)
    │   │
    │   ├── export/                    — Экспорт данных
    │   │   └── export_service.ts      — Экспорт состояния в JSON
    │   │
    │   ├── gap/                       — Баррель-реэкспорт gap_engine
    │   │   └── index.ts               — Реэкспорт типов и функций gap_engine
    │   │
    │   ├── onboarding/                — Онбординг пользователя
    │   │   ├── index.ts
    │   │   ├── onboarding_engine.ts   — Построение OnboardingState из ввода, расчёт readiness/confidence
    │   │   ├── onboarding_flow.ts     — Многошаговый flow (situation, emotion, goals...)
    │   │   ├── onboarding_mapper.ts   — Маппинг онбординга в параметры journey
    │   │   ├── onboarding_state.ts    — OnboardingState типы
    │   │   ├── onboarding_validation.ts
    │   │   └── profession_selector.ts — Рекомендация профессии
    │   │
    │   ├── ui_bridge/                 — Мост runtime → UI
    │   │   ├── index.ts
    │   │   ├── ui_bridge.ts           — getUIState(): вычисляет UI_State из runtime
    │   │   ├── ui_navigation.ts       — Навигация: next/prev nodeId из runtime
    │   │   ├── ui_node_adapter.ts     — SkillState → UI node state (completed/active/locked)
    │   │   ├── ui_render_contract.ts  — UI типы: UI_Node, UI_State, UI_NavigationState
    │   │   └── ui_state_mapper.ts     — JourneyRuntimeState → полный UI_State
    │   │
    │   ├── task/                      — Задачи и выполнение
    │   │   ├── index.ts
    │   │   ├── task_content_engine.ts — Библиотека определений задач (~684 строки)
    │   │   └── task_execution_engine.ts — Жизненный цикл задачи: begin, submit, complete, fail
    │   │
    │   ├── attempt/                   — Попытки выполнения задач
    │   │   ├── index.ts
    │   │   └── attempt_engine.ts      — Старт, завершение, оценка попытки
    │   │
    │   ├── bootstrap/                 — Инициализация системы
    │   │   ├── index.ts
    │   │   ├── init.ts               — createCareerNavigator, регистрация профессий
    │   │   ├── system_bootstrap.ts    — Полная инициализация: профессия, runtime, UI, sync
    │   │   ├── system_context.ts      — Глобальный контекст: runtime, profession, UI, world
    │   │   └── system_entry.ts        — Точки входа: start/restart CareerNavigator
    │   │
    │   ├── bridge/                    — Мосты синхронизации
    │   │   ├── index.ts
    │   │   ├── ui_runtime_bridge.ts   — Runtime → UI_State, маппинг нод и уровней
    │   │   └── world_runtime_bridge.ts — Runtime → WorldState, 3D визуалы, камера
    │   │
    │   ├── interaction/               — Обработка действий пользователя
    │   │   ├── index.ts
    │   │   ├── interaction_engine.ts  — Точка входа: action → progression cycle
    │   │   ├── interaction_types.ts   — Типы: InteractionAction, FeedbackEvent, RewardResult
    │   │   ├── progression_loop.ts    — Цикл: transition → feedback → rewards
    │   │   ├── state_transition_engine.ts — Action → UserAction → skill state machine
    │   │   ├── reward_system.ts       — Streak-система: прогресс-всплески, бусты уверенности
    │   │   ├── feedback_engine.ts     — Генерация feedback после переходов состояний
    │   │   ├── task_cycle.ts          — Адаптация результата задачи к сложности
    │   │   └── event_bus.ts          — Backward-compat адаптер к system_event_bus.ts
    │   │
    │   ├── learning/                  — Обучающий движок
    │   │   ├── index.ts
    │   │   ├── learning_engine.ts    — Полный движок: attempt → feedback → notification
    │   │   ├── learning_pipeline.ts  — Сквозной пайплайн: attempt → difficulty → reinforce → gap
    │   │   ├── loop_execution_engine.ts — Выполнение цикла обучения
    │   │   ├── loop_gap_connector.ts  — Связь обучения с gap analysis
    │   │   ├── reinforcement_engine.ts — Обновление confidence, momentum, streak
    │   │   ├── difficulty_adapter.ts  — Адаптация сложности по успеху/неудаче
    │   │   └── learning_loop_model.ts — Типы: TaskResult, LearningLoop, TaskState
    │   │
    │   ├── memory/                    — Память / журнал записей
    │   │   ├── index.ts
    │   │   ├── memory_engine.ts       — CRUD: add, query by node/chapter, insights
    │   │   ├── memory_insights_engine.ts — Инсайты: повторяющиеся ошибки, сильные/слабые зоны
    │   │   ├── memory_mapper.ts       — Feedback → memory entry (insight/mistake/note)
    │   │   ├── memory_state.ts        — MemoryEntry, MemoryStore типы
    │   │   ├── memory_rules.ts        — Константы: макс записей, теги, пороги паттернов
    │   │   ├── chapter_memory_view.ts — Сводка записей по главе
    │   │   └── node_memory_linker.ts  — Привязка записей к нодам
    │   │
    │   ├── persistence/              — Сохранение в localStorage
    │   │   ├── runtime_persistence.ts — load/save runtime с версионированием
    │   │   └── storage.ts            — Generic localStorage KV store
    │   │
    │   ├── playbook/                  — Справочник (playbook)
    │   │   ├── index.ts
    │   │   ├── playbook_data.ts       — Статический контент: resume, interview, salary
    │   │   └── playbook_types.ts      — PlaybookCategory, PlaybookEntry, PlaybookFilter
    │   │
    │   ├── mobile/                    — Мобильная адаптация
    │   │   ├── index.ts
    │   │   ├── mobile_layout_adapter.ts — Определение размера экрана, safe areas
    │   │   └── touch_interaction_layer.ts — Жесты: tap, swipe, long-press
    │   │
    │   ├── performance/               — Оптимизация производительности
    │   │   ├── index.ts
    │   │   ├── event_throttle.ts      — Троттлинг событий
    │   │   ├── memoized_selectors.ts  — Мемоизированные селекторы
    │   │   ├── render_scheduler.ts    — Приоритетный планировщик рендера
    │   │   ├── state_diff_engine.ts   — Diff между снимками состояния
    │   │   ├── ui_render_optimizer.ts — Оптимизация UI рендера
    │   │   └── world_render_optimizer.ts — Оптимизация world рендера
    │   │
    │   ├── premium/                   — Премиум-доступ
    │   │   ├── index.ts
    │   │   ├── premium_engine.ts      — Проверка доступа
    │   │   ├── premium_gate.ts        — Гейт: free_limit / premium_required / allowed
    │   │   ├── premium_state.ts       — PremiumState + FREE_CHAPTER_LIMIT = 3
    │   │   ├── premium_profession_limits.ts — Лимиты функций
    │   │   ├── premium_unlock_flow.ts — Разблокировка премиума
    │   │   ├── premium_warning_engine.ts — Предупреждения о премиум-контенте
    │   │   └── premium_telemetry.ts   — Трекинг событий премиума
    │   │
    │   ├── social/                    — Социальные функции
    │   │   ├── index.ts
    │   │   ├── export_engine.ts       — Экспорт JSON (FRZ_2.2)
    │   │   ├── import_engine.ts       — Импорт JSON с валидацией
    │   │   ├── share_card_engine.ts   — Данные для карточки шэринга
    │   │   ├── share_formats.ts       — Форматы: image_card, text_summary, json_export
    │   │   ├── share_gate.ts          — Когда показывать предложение поделиться
    │   │   ├── share_state_builder.ts — Построение share state из runtime
    │   │   ├── share_text_generator.ts — Генерация текста из шаблонов
    │   │   └── viral_metrics_engine.ts — Трекинг: share count, exports
    │   │
    │   ├── share/                     — Шэринг
    │   │   ├── share_mapper.ts        — Runtime → ShareModel
    │   │   ├── share_model.ts         — ShareModel type
    │   │   └── share_service.ts      — Копирование, нативный share, download
    │   │
    │   ├── stability/                 — Стабильность системы
    │   │   ├── index.ts
    │   │   ├── fallback_state_manager.ts — История состояний (max 10) для отката
    │   │   └── system_guard.ts        — Валидация целостности runtime
    │   │
    │   ├── state_engine/              — Управление карьерным состоянием
    │   │   ├── index.ts
    │   │   ├── career_state.ts        — CareerState enum (EXPLORING → ... → READY)
    │   │   └── state_transition_rules.ts — Правила переходов с guards
    │   │
    │   ├── scoring/                   — Расчёт очков
    │   │   ├── index.ts
    │   │   └── career_score.ts        — Взвешенный карьерный счёт
    │   │
    │   ├── voice/                     — Голосовой интервью-тренажёр
    │   │   ├── index.ts
    │   │   ├── stt_engine.ts          — Speech-to-text (заглушка)
    │   │   ├── tts_engine.ts          — Text-to-speech
    │   │   ├── answer_analysis_engine.ts — Анализ ответов: clarity, STAR, filler words
    │   │   ├── confidence_impact_engine.ts — Обновление confidence из анализа
    │   │   ├── feedback_generator.ts  — Генерация фидбека
    │   │   ├── interview_loop.ts      — Цикл вопроса: speak → listen → analyze → feedback
    │   │   ├── interview_state_machine.ts — Состояния: start, asking, recording, analyzing, feedback
    │   │   ├── stress_simulation.ts   — Стресс-режим: ускорение, перебивания
    │   │   └── voice_session_model.ts — VoiceSession type
    │   │
    │   ├── user_data/notes/           — Заметки пользователя
    │   │   ├── note.ts                — Note interface
    │   │   ├── notes_controller.ts    — CRUD с событийной шиной
    │   │   ├── notes_persistence.ts   — Сохранение в localStorage
    │   │   └── notes_store.ts         — In-memory store
    │   │
    │   ├── chapter_engine.ts          — Прогресс глав: процент, завершение, текущая/следующая
    │   ├── chapter_model.ts           — Chapter и ChapterId типы
    │   ├── chapter_view_model.ts      — View model главы
    │   ├── chapters.ts                — Константа CHAPTER_ORDER
    │   ├── confidence_engine.ts       — Расчёт confidence из success rate, интервью, стресса
    │   ├── readiness_engine.ts        — Расчёт readiness вектора и score
    │   ├── skill_engine.ts            — Единый источник правды: state accessors + applyMissionResult (внутр.) + подписка на MISSION_SUBMIT
    │   ├── skill_state.ts             — SkillNode interface, SkillState type
    │   ├── task_content.ts            — TaskContent interface
    │   ├── rules.ts                   — Константы правил системы
    │   ├── advice_engine.ts           — Генерация советов из SkillNode
    │   ├── depth_mapper.ts            — Позиция в flow → визуальная глубина
    │   ├── flow_mapper.ts             — Построение flow map нод относительно активной
    │   ├── focus_gravity.ts           — Вес фокуса (1/0.5/0.2) по позиции в flow
    │   ├── focus_snap_controller.ts   — Скролл к активной ноде
    │   ├── gap_engine.ts              — Анализ разрывов: восприятие vs система
    │   ├── journey_adapter.ts         — SkillNode → VisualNode с UI state и flow
    │   ├── journey_orchestrator.ts    — Оркестрация journey UI: адаптация → рендер
    │   ├── orchestrator.ts            — Активная нода, переходы, советы
    │   ├── readiness_dashboard.ts     — Построение дашборда: score, gap, навыки
    │   ├── visual_flow.ts             — FlowPosition тип (past/active/future)
    │   ├── visual_node_renderer.ts    — VisualNode → RenderNode с depth/scale/opacity
    │   ├── profession_bootstrap.ts    — Валидация и регистрация модулей
    │   ├── profession_contract.ts     — ProfessionModule type
    │   ├── profession_loader.ts       — Загрузчик профессий, доступ к активной
    │   ├── profession_metadata.ts     — Метаданные профессий
    │   └── profession_validation.ts   — Валидация структуры модуля
    │
    ├── professions/                   — Модули профессий
    │   ├── index.ts
    │   ├── base_profession_module.ts  — BaseProfessionModule interface
    │   ├── profession_auto_loader.ts  — Автозагрузчик (SE модуль)
    │   ├── profession_registry.ts     — Реестр: register, get, getDefault
    │   ├── profession_service.ts      — Сервис активной профессии
    │   ├── loader/
    │   │   ├── profession_loader.ts   — Асинхронный загрузчик
    │   │   └── profession_manifest.ts — Манифест профессий
    │   └── software_engineer/         — Профессия "Software Engineer"
    │       ├── index.ts
    │       ├── module.ts              — Сборка модуля: chapter + graph + premium
    │       ├── profession.ts          — SOFTWARE_ENGINEER_PROFESSION
    │       ├── chapters.ts            — 5 глав: resume, linkedin, applications, interviews, offer
    │       ├── skill_nodes.ts         — Полный граф навыков (~1173 строки)
    │       ├── styles.css             — Стили профессии
    │       └── tasks/
    │           ├── index.ts           — Реэкспорт всех задач
    │           ├── resume.ts          — Задачи главы Resume (~477 строк)
    │           ├── linkedin.ts        — Задачи главы LinkedIn (~451 строка)
    │           ├── applications.ts    — Задачи главы Applications (~500 строк)
    │           ├── interviews.ts      — Задачи главы Interviews (~725 строк)
    │           └── offer.ts           — Задачи главы Offer (~435 строк)
    │
    ├── screens/                       — Экраны приложения
    │   ├── JourneyScreen/            — Экран путешествия (debug fallback)
    │   │   ├── index.ts
    │   │   ├── JourneyScreen.tsx      — Основной экран путешествия
    │   │   ├── JourneyScreenDebug.tsx — Debug-версия: список нод, открыть миссию (без бизнес-логики)
    │   │   ├── JourneyScreen.css
    │   │   ├── components/
    │   │   │   ├── BackgroundLayer.tsx     — Фоновый цвет по главе
    │   │   │   ├── ChapterHub.tsx          — Карточки глав
    │   │   │   ├── ChapterCompleteScreen.tsx — Завершение главы
    │   │   │   ├── JourneyCompleteScreen.tsx — Завершение всего пути
    │   │   │   ├── JourneyHeader.tsx       — Заголовок: глава, readiness
    │   │   │   ├── JourneyBottomNav.tsx    — Нижняя навигация
    │   │   │   ├── JourneyPath.tsx         — Скролл-путь (заменён на ChapterHub)
    │   │   │   ├── JourneyPath.css
    │   │   │   ├── PathNode.tsx            — Нода пути (устарело)
    │   │   │   ├── SkillNodeCard.tsx       — Карточка навыка с цветом главы
    │   │   │   ├── FloatingMissionCard.tsx — Всплывающая карточка миссии (устарело)
    │   │   │   ├── CollapsibleSidebar.tsx  — Сайдбар с советами
    │   │   │   ├── CollapsibleSidebar.css
    │   │   │   ├── MissionCard.tsx         — Карточка миссии (устарело)
    │   │   │   ├── MissionCard.css
    │   │   │   ├── MissionFlow.tsx         — Flow миссии (устарело)
    │   │   │   ├── MissionFlow.css
    │   │   │   ├── MissionReview.tsx       — Обзор миссии (устарело)
    │   │   │   ├── MissionReview.css
    │   │   │   ├── HelpBar.tsx             — Панель помощи
    │   │   │   ├── HelpBar.css
    │   │   │   ├── HeroCard.tsx            — Герой-карточка (устарело)
    │   │   │   ├── HeroCard.css
    │   │   │   ├── ResultCard.tsx          — Результат задачи (устарело)
    │   │   │   └── ResultCard.css
    │   │   └── hooks/
    │   │       ├── useCamera.ts           — Камера: pan/zoom
    │   │       └── useChapterHub.ts       — Навигация hub/chapter/complete
    │   │
    │   ├── MissionScreen/             — Экран выполнения миссии
    │   │   ├── index.ts
    │   │   ├── MissionScreen.tsx      — Interaction layer: emit('MISSION_SUBMIT'), только сбор ввода
    │   │   ├── MissionScreen.css
    │   │   ├── components/            — Старые компоненты (не используются)
    │   │   │   ├── MissionCard.tsx    — (устарело)
    │   │   │   ├── StepScreen.tsx     — (устарело)
    │   │   │   ├── ChecklistItem.tsx  — (устарело)
    │   │   │   ├── MissionProgress.tsx — (устарело)
    │   │   │   └── SuccessScreen.tsx  — (устарело)
    │   │   └── hooks/
    │   │       └── useMissionSteps.ts — (устарело)
    │   │
    │   ├── OnboardingScreen/          — Онбординг (7 страниц, книга)
    │   │   ├── OnboardingScreen.tsx
    │   │   └── OnboardingScreen.css
    │   │
    │   ├── IntroJourneyScreen/        — Киноинтро (8-12 сек)
    │   │   ├── IntroJourneyScreen.tsx
    │   │   └── IntroJourneyScreen.css
    │   │
    │   ├── PlaybookScreen/            — Справочник (книга с перелистыванием)
    │   │   ├── PlaybookScreen.tsx
    │   │   └── PlaybookScreen.css
    │   │
    │   ├── NotesScreen/               — Журнал заметок с категориями
    │   │   ├── NotesScreen.tsx
    │   │   └── NotesScreen.css
    │   │
    │   ├── ShareScreen/               — Шэринг (карточка 1080×1080, экспорт)
    │   │   ├── ShareScreen.tsx
    │   │   └── ShareScreen.css
    │   │
    │   ├── DashboardScreen/           — Дашборд (легаси)
    │   │   ├── DashboardScreen.tsx
    │   │   └── DashboardScreen.css
    │   │
    │   ├── GapAnalysisScreen/         — Gap анализ (легаси)
    │   │   ├── GapAnalysisScreen.tsx
    │   │   └── GapAnalysisScreen.css
    │   │
    │   └── InterviewTrainer/          — Тренажёр интервью (легаси)
    │       ├── InterviewTrainerScreen.tsx
    │       └── InterviewTrainer.css
    │
    ├── hooks/                         — React хуки
    │   ├── useJourneyCamera.ts        — Плавный скролл к активной ноде
    │   └── useScrollToCurrent.ts      — Алиас useJourneyCamera
    │
    ├── world/                         — Визуальный мир / 3D
    │   ├── index.ts
    │   ├── types.ts                   — LevelStatus, VisualTheme, CareerLevel, PathSegment
    │   ├── visual_world_contract.ts   — WorldNodeVisual, WorldState, WorldTimeOfDay
    │   ├── visual_world_engine.ts     — WorldState из career state
    │   ├── world_builder.ts           — UI nodes → world visuals (position, glow)
    │   ├── world_renderer.tsx         — Рендер кадра + WorldRendererScreen (главный экран по умолчанию)
    │   ├── world_scene.ts             — Создание/обновление сцены
    │   ├── world_zone_mapper.ts       — Career state → visual zones (plains/foothills/summit)
    │   ├── journey_node.ts            — JourneyNode: task/checkpoint/lock
    │   ├── careerToWorld.ts           — Career step → CareerLevel
    │   ├── WorldState.ts              — WorldState interface + initial state
    │   ├── WorldFlowConnector.ts      — Career option → world state
    │   ├── EnvironmentGenerator.tsx   — React: окружение (градиенты) под уровень
    │   ├── LevelRenderer.tsx          — React: карточка уровня с glow
    │   ├── progressStore.ts           — Zustand store прогресса мира
    │   ├── useWorldProgression.ts     — Hook: move to next level
    │   ├── camera/
    │   │   └── world_camera_controller.ts — 3D камера: create, focus, update
    │   ├── effects/
    │   │   ├── fog_system.ts          — Туман: opacity, color, offset, speed
    │   │   └── glow_system.ts         — Glow: интенсивность, пульсация, цвет
    │   └── gap/
    │       └── gap_visual_layer.ts    — Визуальный gap: blur, flicker, path dimming
    │
    └── voice/                         — Голос (внешний)
        └── tts.ts                     — Browser SpeechSynthesis wrapper
```
