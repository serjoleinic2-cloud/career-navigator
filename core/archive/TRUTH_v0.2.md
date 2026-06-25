1. SYSTEM DEFINITION

Career Navigator — система карьерного планирования, основанная на:

Career Engine (ядро логики)
UX Flow (пользовательский сценарий)
Content Layer (подача информации)
Interview Trainer (подготовка к интервью)

2. CORE ARCHITECTURE

/engine → логика карьерных рекомендаций
/flows → пользовательские сценарии
/ui → интерфейс
/tools → вспомогательные функции
/core → истина системы + правила

3. CAREER ENGINE (CURRENT STATE)

version: stub
functions:
getCareerOptions(goal)
getCareerSteps(option)
output: 3 options × 5 steps

4. SYSTEM STATE

mode: RAW-STABLE
version: v0.2
engine_status: stub
freeze_status: TRUE (baseline locked)

5. RULE OF TRUTH

Любая новая логика должна проходить через новую версию системы.
Прямое изменение frozen ядра запрещено.

6. OFFLINE RULE (NEW CORE RULE)

Career Navigator работает полностью офлайн.
Вся логика предсказуема и основана на фиксированных правилах и данных.
AI не используется в runtime системы.
