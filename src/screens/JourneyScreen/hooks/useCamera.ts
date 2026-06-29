import { useState, useCallback } from 'react';

interface CameraState {
  scale: number;
  x: number;
  y: number;
}

export function useCamera() {
  const [state, setState] = useState<CameraState>({ scale: 1, x: 0, y: 0 });
  const [transition, setTransition] = useState('transform 350ms ease-out');

  const focusOn = useCallback((elementX: number, elementY: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setTransition('transform 350ms ease-out');
    setState({
      scale: 1.5,
      x: vw / 2 - elementX,
      y: vh / 3 - elementY,
    });
  }, []);

  const zoomOut = useCallback(() => {
    setTransition('transform 350ms ease-out');
    setState({ scale: 1, x: 0, y: 0 });
  }, []);

  const moveUp = useCallback(() => {
    setTransition('transform 600ms ease-in-out');
    setState(prev => ({ ...prev, y: prev.y - window.innerHeight }));
  }, []);

  return {
    cameraStyle: {
      transform: `translate(${state.x}px, ${state.y}px) scale(${state.scale})`,
      transition,
    },
    focusOn,
    zoomOut,
    moveUp,
  };
}
