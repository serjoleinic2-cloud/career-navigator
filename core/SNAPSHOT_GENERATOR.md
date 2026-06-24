SNAPSHOT GENERATOR RULES
🎯 PURPOSE

This file defines how to generate a consistent project snapshot after each development stage.

📌 WHEN TO UPDATE SNAPSHOT

Update snapshot after:

adding new system layer
completing FRZ phase
modifying engine
changing world system
UI integration update
⚙️ OUTPUT FILE

Always generate:

/core/PROJECT_SNAPSHOT_vX.md
🧱 SNAPSHOT STRUCTURE

Must always include:

1. PROJECT TYPE

What the system is (1–2 lines)

2. CORE ENGINE
functions
data source
deterministic rules
3. FLOWS
main user journey
steps order
4. WORLD SYSTEM
visual concept
layout (left / right / center)
components list
5. DATA MAPPING
how engine maps to world
step → level logic
6. SYSTEM STATE
version
mode (OFFLINE / RAW / FROZEN)
AI usage (TRUE/FALSE)
7. CURRENT STATUS
what is working now
what is missing
8. NEXT TASKS
3–6 next FRZ tasks
🔒 RULES
no marketing text
no explanation fluff
only factual system state
must be consistent across versions
⚙️ 3. ПРОЦЕСС (ОЧЕНЬ ВАЖНО)

После каждого этапа ты делаешь:

STEP 1

OpenCode updates system

STEP 2

Generate snapshot:

/core/PROJECT_SNAPSHOT_vX.md
STEP 3

Increment version:

v0.3 → v0.4 → v0.5