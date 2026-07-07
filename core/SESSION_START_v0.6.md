# Session Start

> **⚠️ Устарело.** Эта инструкция указывала на `core/TRUTH_v0.6.md` и
> `core/PROJECT_SNAPSHOT_v0.6.md` как на источник архитектуры — оба
> описывали раннюю итерацию (v0.6), уже не совпадающую с кодом.
> `TRUTH_v0.6.md` исправлен 2026-07-07 и сверен с текущим кодом;
> `PROJECT_SNAPSHOT_v0.6.md` оставлен как архив и не обновляется.
> Актуальный вход в проект для нового агента — три файла в корне
> репозитория: `CAREER_NAVIGATOR_MASTER_CHECKPOINT.md`,
> `PROJECT_STATUS.md`, `CORE_MAP.md` (см. шапку самого
> `CAREER_NAVIGATOR_MASTER_CHECKPOINT.md`).

## Step 1: Read Architecture
- CAREER_NAVIGATOR_MASTER_CHECKPOINT.md (корень репозитория)
- PROJECT_STATUS.md (корень репозитория)
- CORE_MAP.md (корень репозитория)
- core/TRUTH_v0.6.md (исправлен, актуален как сверка со старой схемой)

## Step 2: Read Governance
- core/FRZ_RULES.md
- core/FRZ_VERSION.json
- core/SYSTEM_CONTROL.json

## Step 3: Read Active Loader
- core/MASTER_LOADER_v0.6.txt

## Step 4: Continue Development
- Check allowed_changes in SYSTEM_CONTROL.json
- Do not modify frozen core without unfreeze
- Update PROJECT_SNAPSHOT_v0.6.md after significant changes
