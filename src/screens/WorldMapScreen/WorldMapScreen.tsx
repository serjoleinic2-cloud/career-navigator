import { useState, type CSSProperties } from 'react';
import './WorldMapScreen.css';

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
    </div>
  );
}
