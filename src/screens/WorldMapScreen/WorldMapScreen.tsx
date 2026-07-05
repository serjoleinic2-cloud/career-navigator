import type { CSSProperties } from 'react';
import './WorldMapScreen.css';

// WORLD (per +Window_functional.md): "Это НЕ рабочий экран. Это карта
// путешествия." — a full illustrated map of every island the user has
// visited/will visit (Resume → LinkedIn → Applications → Interview →
// Offer), tappable to revisit Notes/Playbook for that chapter. This is a
// deliberate placeholder: no map art or camera exists yet, so this screen
// intentionally stays empty rather than faking a version of it with
// temporary UI. Do not build list-of-cards logic here — that's what the
// old World tab (now "Journey") already does; this screen's whole point is
// to be visually different (a real illustrated map), not a second list.
export function WorldMapScreen({ style }: { style?: CSSProperties }) {
  return (
    <div className="world-map-screen" style={style}>
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
