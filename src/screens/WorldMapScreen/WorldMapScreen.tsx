import { useState, type CSSProperties } from 'react';
import './WorldMapScreen.css';

// WORLD (per +Window_functional.md): "Это НЕ рабочий экран. Это карта
// путешествия." — a full illustrated map of every island the user has
// visited/will visit (Resume → LinkedIn → Applications → Interview →
// Offer), tappable to revisit Notes/Playbook for that chapter. This is a
// deliberate placeholder: no map camera/interaction exists yet, so this
// screen intentionally stays a static image + text rather than faking a
// version of it with temporary UI. Do not build list-of-cards logic here —
// that's what the old World tab (now "Journey") already does; this
// screen's whole point is to be visually different (a real illustrated
// map), not a second list.
//
// BUGFIX (2026-07-06): this screen used to have no background image of
// its own, only a mostly-transparent gradient (`rgba(60,80,120,0.25)` at
// its center). `WorldRenderer` (the Journey art/camera engine) stays
// permanently mounted underneath every tab (see App.tsx), so with no
// opaque background here, the Journey chapter's art bled through, dimmed
// by that gradient — Serj saw a darkened Journey background instead of a
// World-specific one. Fixed: a real, fully opaque background image now
// covers this screen, so nothing from Journey shows through.
//
// PLACE YOUR IMAGE AT: public/art/software_engineer/world.png
// Recommended: 1080×2340px portrait PNG (or larger — it's covered/cropped
// to fill the screen, not stretched). Until the file exists, this screen
// falls back to a solid dark gradient so it never shows a broken-image
// icon.
const WORLD_MAP_IMAGE = '/art/software_engineer/world.png';

export function WorldMapScreen({ style }: { style?: CSSProperties }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="world-map-screen" style={style}>
      {!imgError && (
        <img
          className="world-map-bg-img"
          src={WORLD_MAP_IMAGE}
          alt=""
          onError={() => setImgError(true)}
        />
      )}
      {imgError && <div className="world-map-bg-fallback" />}

      <div className="world-map-placeholder">
        <div className="world-map-placeholder-icon">🗺️</div>
        <h2 className="world-map-placeholder-title">The Map</h2>
        <p className="world-map-placeholder-text">
          Your full journey map is being drawn. Soon you'll see every
          island you've explored — and the ones still waiting on the
          horizon.
        </p>
      </div>
    </div>
  );
}
