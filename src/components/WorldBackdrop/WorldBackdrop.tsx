import React from 'react';
import type { WorldRenderConfig } from '@/core/world/world_composer';

interface WorldBackdropProps {
  config: WorldRenderConfig;
}

export const WorldBackdrop: React.FC<WorldBackdropProps> = ({ config }) => {
  const { backdrop, palette } = config;

  const gradientStyle = backdrop.type === 'gradient'
    ? { background: `linear-gradient(to bottom, ${backdrop.colors[0]}, ${backdrop.colors[1]})` }
    : { background: palette.backgroundFrom };

  return (
    <div
      className="world-backdrop"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        ...gradientStyle,
      }}
    >
      {backdrop.stars && (
        <div className="stars-layer" style={{ opacity: 0.3 + (config.atmosphere.ambientLight * 0.5) }} />
      )}
      {backdrop.clouds && (
        <div className="clouds-layer" />
      )}
    </div>
  );
};
