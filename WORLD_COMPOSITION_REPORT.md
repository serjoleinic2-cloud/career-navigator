# WORLD COMPOSITION REPORT

## Old Architecture Issues

1. JourneyScreen calculated worldTheme directly — violated single responsibility
2. JourneyScreen calculated progressRatio — duplicated logic in multiple places
3. WorldBackdrop received `theme` + `progressRatio` — tight coupling
4. No unified `WorldRenderConfig` — scattered data across components
5. No atmosphere/lighting/camera config in theme system

## New Data Flow
professionId + runtimeState → world_composer → WorldRenderConfig
↓
JourneyScreen consumes ──────→ WorldRenderConfig
↓
WorldBackdrop renders ───────→ WorldRenderConfig.backdrop
WorldRenderer renders ─────────→ WorldRenderConfig.palette + geometry
CameraController uses ─────────→ WorldRenderConfig.camera

## Module Boundaries

| Module | Responsibility |
|--------|---------------|
| world_composer | Assemble final render config from theme + state |
| world_theme | Define profession themes (palette + geometry) |
| JourneyScreen | Consume WorldRenderConfig, pass to children |
| WorldBackdrop | Render backdrop from config |
| WorldRenderer | Render world nodes from config |

## Risks

- WorldBackdrop.tsx API change — all callers must update
- JourneyScreen.tsx reduced but still complex
- Runtime state dependency in composer — may cause stale renders

## Migration Notes

- Old: `<WorldBackdrop theme={worldTheme} progressRatio={progressRatio} />`
- New: `<WorldBackdrop config={worldRenderConfig} />`
- worldTheme.ts stays unchanged — composer consumes it
