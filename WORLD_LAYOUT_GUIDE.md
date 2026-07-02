# WORLD LAYOUT GUIDE

This document explains the **World Layout System** (`src/core/world/world_layout.ts`) —
the spatial language that turns an artist-created world image into a
navigable game world. It draws nothing itself. It is metadata that
tells the camera where to go and tells the renderer where interaction
lives on top of the art.

Related contracts:
- `src/core/world/world_theme.ts` — palette/atmosphere per profession.
- `src/core/world/world_art_contract.ts` — the artist's `world.png` per profession.
- `src/core/world/world_layout.ts` — **this guide** — islands, bridges, camera anchors, bounds.

---

## Terminology

From this point on, use the game-world vocabulary, not the graph vocabulary:

| Old (graph) | New (world)   |
|---|---|
| Node | Island |
| Edge | Bridge |
| Chapter | Landmark grouping |
| Mission | Place |
| Completed | Restored |
| Locked | Hidden |

Thinking in "nodes and edges" produces a graph. Thinking in "islands and
bridges" produces a world. Use the new terms in new code, comments,
commit messages, and conversation.

---

## How artists position islands

1. Compose the full vertical scene for a profession's world (concept art,
   Monument Valley-inspired) — this becomes `world.png` (see
   `world_art_contract.ts`). Note the image's pixel dimensions.
2. For each landmark in the art (an island, gate, temple, tower, etc.),
   note its **pixel position** in the image. That becomes `x, y` on an
   `IslandLayout`.
3. Decide the island's `landmarkType` — this is meaning, not decoration:

   ```
   START    — where the player's journey begins
   ISLAND   — a standard chapter landmark
   GATE     — a checkpoint / threshold moment
   TEMPLE   — a landmark that deserves ceremony (e.g. interview prep)
   TOWER    — a landmark that implies height/achievement
   LIBRARY  — a landmark about knowledge/reference material
   PORTAL   — a transition into a very different visual zone
   SUMMIT   — the final destination (e.g. the offer)
   ```

4. For each bridge between two islands, decide a `bridgeType` (`stone`,
   `rope`, `light`, `crystal`) and an `animationProfile`:
   - `growIn` — the bridge physically grows into place as the previous
     landmark is restored (dramatic, use for major progress beats).
   - `illuminate` — the bridge already exists in the art but is dark/dim
     until restored, then lights up (subtler, use for minor steps).
   - `none` — static, no animation (e.g. the permanently-open starting
     bridge).

None of this requires touching code — an artist (or ChatGPT image
generation + manual refinement, per the current pipeline) can describe
these values in plain terms and a programmer transcribes them into a
`world_layout.ts` file for that profession.

---

## How programmers attach gameplay

A profession's layout lives at `src/professions/<profession>/world_layout.ts`
and is registered once via `registerWorldLayout(...)` — see
`software_engineer/world_layout.ts` for a concrete (currently
placeholder-positioned) example.

```ts
registerWorldLayout({
  professionId: 'software_engineer',
  bounds: { minX: -300, maxX: 300, minY: -150, maxY: 1100 },
  islands: [ /* IslandLayout[] */ ],
  bridges: [ /* BridgeLayout[] */ ],
  anchors: [ /* CameraAnchor[] */ ],
});
```

Each `IslandLayout.chapterId` must match a real chapter `id` from that
profession's `chapters.ts` — this is the seam between the spatial world
and the existing progress/runtime system. The renderer resolves
"which island is active" by matching the runtime's active chapter to an
island with that `chapterId`.

Each `IslandLayout.interactionRadius` should generally be **larger**
than `visualRadius` — a small painted island still deserves a
comfortable tap target. `visualRadius` only matters for the debug-mode
placeholder circle; once real art exists, tap targets are invisible
overlays positioned by `x`, `y`, `interactionRadius` alone.

---

## How the camera behaves

**The camera never moves to raw coordinates.** It always moves to a
predefined `CameraAnchor`. This is deliberate: an artist composing a
scene needs to know exactly what will be visible when the camera
arrives, which is only possible if "where the camera goes" is a fixed,
authored list — not wherever an island happens to sit.

```ts
export type CameraAnchor = {
  id: string;
  x: number;
  y: number;
  zoom: number;
  easing: 'linear' | 'easeInOut' | 'easeOutCubic' | 'cinematic';
  cinematicOffset?: { x: number; y: number };
};
```

- Every `IslandLayout` names its preferred anchor via `cameraAnchorId`.
  Use `getAnchorForIsland(layout, islandId)` to resolve it — never read
  an island's `x`/`y` directly to move the camera.
- `cinematicOffset` is an optional one-time offset applied only the
  **first** time the camera arrives at that anchor (e.g. a slow pan-down
  into the world before settling). Repeat visits go straight to
  `x, y, zoom`. Callers decide first-visit vs. repeat — the anchor
  itself doesn't track visit history.
- `bounds` (TASK 4) defines the world's full extent. Every camera target
  is clamped into `bounds` before being applied, so the camera can never
  expose empty canvas beyond the painted art — even for worlds much
  taller than the screen (a world can be 6+ screens tall; the camera
  just can't wander past its top or bottom).

`world_renderer.tsx` demonstrates the full path today: it resolves the
active island's chapter to an anchor (falling back to raw-coordinate
focus only if no `WorldLayout` is registered for that profession yet),
then clamps the result to `bounds`.

---

## Debug vs. Production

`WorldRenderer` accepts `mode: 'debug' | 'production'` (default
`'production'`). In development, append `?debugWorld=1` to the URL to
see the circles/lines/labels placeholder. Production users never see
this — once art exists, `mode='production'` shows only the artwork,
particles, and (invisible) interaction hit-areas.

---

## How future professions create new worlds

To add a new profession's world, create three files under
`src/professions/<profession>/`:

1. `world.ts` — `WorldTheme` (palette/atmosphere). See existing example.
2. `world_art.ts` — `WorldArtConfig` (the `world.png` once it exists;
   omit `worldImageUrl` until it does, and the theme's gradient is used
   as a placeholder).
3. `world_layout.ts` — `WorldLayout` per this guide: islands, bridges,
   anchors, bounds — one island per chapter (or more, if a chapter spans
   multiple landmarks) matched by `chapterId`.

Import all three as side effects from that profession's `module.ts`
(the file actually loaded by the app's bootstrap chain — not `index.ts`).
No screen or renderer code needs to change for a new profession; the
composition engine reads whatever is registered for the active
`professionId`.
