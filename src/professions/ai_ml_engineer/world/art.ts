import { registerWorldArt } from '@/core/world/world_art_contract';

registerWorldArt({
  professionId: 'ai_ml_engineer',
  landmarks: [
    { type: 'neural_network', position: 'background', density: 'high' },
    { type: 'floating_nodes', position: 'midground', density: 'medium' },
    { type: 'data_streams', position: 'foreground', density: 'low' },
  ],
  particleEffects: {
    type: 'gradient_orbs',
    color: '#00d4ff',
    count: 50,
  },
  ambientAnimation: 'pulse_network',
});