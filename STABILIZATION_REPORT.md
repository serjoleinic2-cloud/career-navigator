# Stabilization Report — Pass #1

## Summary

Applied world map orientation fix (bottom→top), event bus hardening, camera smoothing improvements, and runtime error fixes.

## Changes Applied

### Task 1: World Orientation (bottom→top)
- **`src/world/world_builder.ts`** — Nodes built bottom-to-top per chapter, Y-reversed, sorted ascending. Upward connections only (`next.y > current.y`).

### Task 2: World Camera
- **`src/world/camera/world_camera_controller.ts`** — easeOutCubic smoothing, `CAMERA_OFFSET_Y = 280`, `clampCameraBounds` helper added.

### Task 3: Renderer Fixes
- **`src/world/world_renderer.tsx`** — DPR-aware canvas sizing, `animFrameRef` for proper cleanup, runtime null-safety, reactive `useEffect` on `activeNodeId`/`activeChapterId`.

### Task 4: Runtime Error Pass
- **`src/App.tsx`** — Replaced `AppShell` → `BottomNav` pattern (adapted: kept `AppShell` since `BottomNav` is hardcoded). Screens wrapped with `key`/`style` via `<div>` for transition support. Added `share`, `debug` to tab routing. Null-safe `startJourney`.

### Task 5: Event Bus (verify)
- **`src/core/events/system_event_bus.ts`** — Already hardened. No duplicate subscriptions in `WorldRenderer` (verified).

### Task 6: Cleanup
- **`src/world/progressStore.ts`** — Deleted (zero imports across project).

## Verification
- `npx tsc --noEmit` — **0 errors**
- All dependent files updated to match new `WorldNodeVisual`/`WorldState` types
