import { motion } from 'framer-motion';

interface FloatingOrbProps {
  size?: number;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
  positionY?: number;
  mode?: 'idle' | 'moving' | 'arrived';
}

export function FloatingOrb({
  size = 44,
  intensity = 'medium',
  className = '',
  positionY,
  mode = 'idle',
}: FloatingOrbProps) {
  const glowIntensity = {
    low: { outer: 0.3, middle: 0.4, core: 0.8 },
    medium: { outer: 0.5, middle: 0.6, core: 1 },
    high: { outer: 0.7, middle: 0.8, core: 1 },
  }[intensity];

  const isMoving = mode === 'moving';
  const isArrived = mode === 'arrived';

  const floatY = isArrived ? 0 : (isMoving ? [0, -8, 0] : [0, -14, 0]);
  const floatDuration = isMoving ? 2 : 5;

  const yAnimate = positionY !== undefined ? positionY : floatY;

  const glowOpacity = isArrived ? 0.3 : 0.4;
  const trailCount = isMoving ? 6 : 4;
  const trailDuration = isMoving ? 1.2 : 1.8;

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={{ y: yAnimate }}
      transition={{
        duration: positionY !== undefined ? 0.8 : floatDuration,
        repeat: positionY !== undefined ? 0 : (isArrived ? 0 : Infinity),
        ease: positionY !== undefined ? 'easeInOut' : 'easeInOut',
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(0,229,224,${glowIntensity.outer * glowOpacity}) 0%, transparent 70%)`,
          transform: 'scale(3)',
        }}
        animate={isArrived ? { scale: [2.8, 3.0, 2.8], opacity: [0.3, 0.5, 0.3] } : { scale: [2.8, 3.2, 2.8], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: isArrived ? 3 : 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(0,229,224,${glowIntensity.middle * (isArrived ? 0.7 : 1)}) 0%, transparent 60%)`,
          transform: 'scale(2)',
        }}
        animate={{ scale: [1.8, 2.2, 1.8], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: isArrived ? 4 : 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95) 0%, rgba(0,229,224,${glowIntensity.core * (isArrived ? 0.7 : 1)}) 30%, rgba(0,150,160,${glowIntensity.core * (isArrived ? 0.7 : 1)}) 100%)`,
          boxShadow: `0 0 ${size * 0.8 * (isArrived ? 0.6 : 1)}px rgba(0,229,224,${isArrived ? 0.2 : 0.4}), 0 0 ${size * 1.5 * (isArrived ? 0.6 : 1)}px rgba(0,229,224,${isArrived ? 0.08 : 0.15})`,
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.3,
          height: size * 0.3,
          top: size * 0.12,
          left: size * 0.18,
          background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, transparent 70%)',
          filter: 'blur(1.5px)',
        }}
      />

      {[...Array(trailCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size * 0.12,
            height: size * 0.12,
            background: `rgba(0, 229, 224, ${(0.7 - (i / trailCount) * 0.6) * (isMoving ? 1.3 : 1)})`,
            bottom: -size * 0.15,
            left: '50%',
            marginLeft: -(size * 0.06),
          }}
          animate={{
            y: [0, size * 0.5, size * 1],
            opacity: [0.7, 0.3, 0],
            scale: [1, 0.5, 0.2],
          }}
          transition={{
            duration: trailDuration,
            repeat: Infinity,
            delay: i * (trailDuration / trailCount),
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.div>
  );
}
