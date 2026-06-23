# RAW Rules

- Сборка: `npm run build` (tsc + vite)
- Android APK: `./gradlew assembleDebug` из `/android`
- Sync: `npx cap sync android`
- Никаких изменений в build-процесс без FRZ_UNFREEZE

# FREEZE Rules

- FRZ_VERSION.json определяет состояние: `freeze_status: true/false`
- При `freeze: true` — никаких изменений в `/core`, `/engine`, `/flows`
- Изменения только в `/ui`, `/tools`, `/src` (если не затрагивают логику)

# CLAUDE Rules

- Рефакторинг только по задачам из .txt файлов
- Запрещено: оптимизация кода, удаление старого, улучшение архитектуры без задачи
- Разрешено: создание новых файлов по структуре, заглушки

# Versioning Rules

- Версия в FRZ_VERSION.json
- Формат: v0.1, v0.2, etc.
- PHASE 2 = Minimum Working Flow
- PHASE 3 = Control Layer

Система всегда работает, даже если логика неправильная или это заглушка — система должна быть запускаемой.
