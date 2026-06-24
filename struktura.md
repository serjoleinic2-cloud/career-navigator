# Структура проекта CareerNavigator (v0.6)

```
career-navigator/
|
|-- index.html
|-- package.json
|-- vite.config.ts
|-- tsconfig.json
|-- tsconfig.app.json
|-- tsconfig.node.json
|-- tailwind.config.js
|-- postcss.config.js
|-- eslint.config.js
|-- capacitor.config.ts
|-- strukura.md
|
|-- public/
|   |-- favicon.svg
|   +-- icons.svg
|
|-- src/
|   |-- main.tsx
|   |-- App.tsx
|   |-- App.css
|   |-- index.css
|   |
|   |-- assets/
|   |   |-- hero.png
|   |   |-- react.svg
|   |   +-- vite.svg
|   |
|   |-- types/
|   |   +-- index.ts
|   |
|   |-- store/
|   |   +-- progressStore.ts
|   |
|   |-- data/
|   |   +-- developerPath.ts
|   |
|   |-- hooks/
|   |   |-- useJourneyCamera.ts
|   |   +-- useScrollToCurrent.ts
|   |
|   |-- core/                   # Детерминированная логика
|   |   |-- skill_state.ts      # SkillNode, SkillState, STATE_FLOW
|   |   |-- skill_engine.ts     # transition, canTransition, getCurrentAdvice
|   |   |-- advice_engine.ts    # getAdvice, getStateDescription
|   |   |-- skill_nodes.ts      # RESUME_SKILL_NODES, LINKEDIN_SKILL_NODES
|   |   |-- node_engine.ts      # (старый, не используется)
|   |   |-- career_nodes.ts     # (старый, не используется)
|   |   |-- career_engine_v2.ts # (старый, не используется)
|   |   |-- career_journey_model.ts # (старый, не используется)
|   |   |-- focus_controller.ts # (старый, не используется)
|   |   |-- journey_state_controller.ts # (старый, не используется)
|   |   +-- bootstrap/
|   |       +-- init.ts
|   |
|   |-- world/                  # Визуальный слой (старый, не используется)
|   |   |-- index.ts
|   |   |-- types.ts
|   |   |-- WorldState.ts
|   |   |-- WorldFlowConnector.ts
|   |   |-- careerToWorld.ts
|   |   |-- useWorldProgression.ts
|   |   |-- progressStore.ts
|   |   |-- VerticalPath.tsx
|   |   |-- EnvironmentGenerator.tsx
|   |   +-- LevelRenderer.tsx
|   |
|   |-- components/
|   |   |                           # АКТИВНЫЕ (Skill State Machine)
|   |   |-- JourneyHeader/          # Шапка с заголовком
|   |   |   |-- JourneyHeader.tsx
|   |   |   +-- JourneyHeader.css
|   |   |
|   |   |-- JourneyTimeline/        # Скролл-лента с snap
|   |   |   |-- JourneyTimeline.tsx
|   |   |   +-- JourneyTimeline.css
|   |   |
|   |   |-- JourneyNodeView/        # Карточка узла (SkillNode + isActive)
|   |   |   |-- JourneyNodeView.tsx
|   |   |   +-- JourneyNodeView.css
|   |   |
|   |   |-- JourneyFocusPanel/      # Панель с состоянием/советом/сигналами
|   |   |   |-- JourneyFocusPanel.tsx
|   |   |   +-- JourneyFocusPanel.css
|   |   |
|   |   |-- JourneyBottomNav/       # Нижняя навигация (4 вкладки)
|   |   |   |-- JourneyBottomNav.tsx
|   |   |   +-- JourneyBottomNav.css
|   |   |
|   |   |-- LevelComplete/          # Оверлей завершения уровня
|   |   |   |-- LevelComplete.tsx
|   |   |   +-- LevelComplete.css
|   |   |
|   |   |                           # СТАРЫЕ (world-слой, не используются)
|   |   |-- FloatingOrb/
|   |   |   |-- FloatingOrb.tsx
|   |   |   |-- FloatingOrb.css
|   |   |   +-- index.ts
|   |   |
|   |   |-- PathNode/
|   |   |   |-- PathNode.tsx
|   |   |   |-- PathNode.css
|   |   |   +-- index.ts
|   |   |
|   |   |-- GoalCard/
|   |   |   |-- GoalCard.tsx
|   |   |   |-- GoalCard.css
|   |   |   +-- index.ts
|   |   |
|   |   |-- JourneyMap/
|   |   |   |-- JourneyMap.tsx
|   |   |   |-- JourneyMap.css
|   |   |   +-- index.ts
|   |   |
|   |   +-- BottomNav/
|   |       +-- BottomNav.tsx
|   |
|   +-- screens/
|       +-- JourneyScreen/
|           |-- JourneyScreen.tsx    # Главный экран (SkillNode + activeNodeId)
|           |-- JourneyScreen.css
|           +-- index.ts
|
|-- android/                 # Capacitor Android
|   |-- build.gradle
|   |-- settings.gradle
|   |-- gradle.properties
|   |-- local.properties
|   |-- variables.gradle
|   |-- gradlew
|   |-- gradlew.bat
|   |-- capacitor.settings.gradle
|   |-- gradle/wrapper/
|   |   |-- gradle-wrapper.jar
|   |   +-- gradle-wrapper.properties
|   |-- app/
|   |   |-- build.gradle
|   |   |-- capacitor.build.gradle
|   |   |-- proguard-rules.pro
|   |   +-- src/main/
|   |       |-- AndroidManifest.xml
|   |       |-- java/com/careernavigator/app/MainActivity.java
|   |       |-- res/drawable/
|   |       |-- res/layout/
|   |       |-- res/values/
|   |       |-- res/xml/
|   |       +-- res/mipmap-*/
|   |
|   +-- .gitignore
|
|-- dist/                   # Сборка Vite
|   |-- index.html
|   +-- assets/
|
|-- docs/                   # Документация (9 файлов)
|   |-- 1 CAREER_NAVIGATOR_MASTER_GUIDE.md
|   |-- 2 CAREER_NAVIGATOR_PRODUCT_BIBLE.md
|   |-- 3 CAREER_NAVIGATOR_UX_BIBLE.md
|   |-- 4 CAREER_NAVIGATOR_CAREER_ENGINE.md
|   |-- 5 CAREER_NAVIGATOR_CONTENT_BIBLE.md
|   |-- 6 CAREER_NAVIGATOR_INTERVIEW_TRAINER.md
|   |-- 7 CAREER_NAVIGATOR_PLAYBOOK.md
|   |-- 8 CAREER_NAVIGATOR_MONETIZATION.md
|   +-- 9 CAREER_NAVIGATOR_TECH_SPEC.md
|
|-- core/                   # Мета-управление проектом
|   |-- TRUTH.md
|   |-- TRUTH_v0.md
|   |-- TRUTH_v0.2.md
|   |-- FRZ_RULES.md
|   |-- FRZ_VERSION.json
|   |-- SYSTEM_CONTROL.json
|   |-- MVP_STATUS.md
|   |-- PROJECT_SNAPSHOT_v0.3.md
|   |-- SNAPSHOT_GENERATOR.md
|   |-- VERSION
|   |-- ++ MASTER LOADER.txt
|   +-- Читай!.txt
|
|-- engine/                 # Career Engine (логика подбора)
|   |-- career_engine_stub.ts
|   +-- career_data.ts
|
|-- flows/                  # Пользовательские сценарии
|   +-- flow_main.ts
|
|-- ui/                     # UI entry points
|   |-- AppEntry.tsx
|   |-- ResultView.tsx
|   +-- README.md
|
|-- tools/                  # Вспомогательные утилиты
|   +-- README.md
|
+-- strukura.md             # Этот файл
```

## Активная архитектура (v0.6)

```
JourneyScreen
  ├── JourneyHeader
  ├── JourneyTimeline
  │   └── JourneyNodeView[]  ← SkillNode + isActive
  ├── JourneyFocusPanel       ← состояние + совет + сигналы + кнопка
  └── JourneyBottomNav

skill_state.ts               SkillState (6 уровней), SkillNode, STATE_FLOW
skill_engine.ts              transition(), canTransition(), getCurrentAdvice()
advice_engine.ts             getStateDescription()
skill_nodes.ts               RESUME_SKILL_NODES + LINKEDIN_SKILL_NODES
```
