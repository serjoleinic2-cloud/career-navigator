# Структура проекта CareerNavigator

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
|-- README.md
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
|   |-- core/
|   |   +-- bootstrap/
|   |       +-- init.ts
|   |
|   |-- hooks/
|   |   |-- useJourneyCamera.ts
|   |   +-- useScrollToCurrent.ts
|   |
|   |-- components/
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
|           |-- JourneyScreen.tsx
|           |-- JourneyScreen.css
|           +-- index.ts
|
|-- android/
|   |-- build.gradle
|   |-- settings.gradle
|   |-- gradle.properties
|   |-- local.properties
|   |-- variables.gradle
|   |-- gradlew
|   |-- gradlew.bat
|   |-- capacitor.settings.gradle
|   |
|   |-- gradle/wrapper/
|   |   |-- gradle-wrapper.jar
|   |   +-- gradle-wrapper.properties
|   |
|   |-- app/
|   |   |-- build.gradle
|   |   |-- capacitor.build.gradle
|   |   |-- proguard-rules.pro
|   |   |
|   |   +-- src/
|   |       |-- main/
|   |       |   |-- AndroidManifest.xml
|   |       |   |-- java/com/careernavigator/app/MainActivity.java
|   |       |   +-- res/
|   |       |       |-- drawable/
|   |       |       |-- layout/
|   |       |       |-- values/
|   |       |       |-- xml/
|   |       |       +-- mipmap-*/
|   |       |
|   |       |-- test/
|   |       +-- androidTest/
|   |
|   +-- .gitignore
|
|-- dist/              # Сборка Vite (web)
|   |-- index.html
|   +-- assets/
|
|-- docs/              # Документация
|   +-- 1..9 CAREER_NAVIGATOR_*.md
|
+-- struktura.md       # Этот файл
```
