import { motion } from 'framer-motion';

interface FloatingOrbProps {
  size?: number;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export function FloatingOrb({ size = 44, intensity = 'medium', className = '' }: FloatingOrbProps) {
  const glowIntensity = {
    low: { outer: 0.3, middle: 0.4, core: 0.8 },
    medium: { outer: 0.5, middle: 0.6, core: 1 },
    high: { outer: 0.7, middle: 0.8, core: 1 },
  }[intensity];

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(0,229,224,${glowIntensity.outer * 0.4}) 0%, transparent 70%)`,
          transform: 'scale(3)',
        }}
        animate={{ scale: [2.8, 3.2, 2.8], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(0,229,224,${glowIntensity.middle}) 0%, transparent 60%)`,
          transform: 'scale(2)',
        }}
        animate={{ scale: [1.8, 2.2, 1.8], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95) 0%, rgba(0,229,224,${glowIntensity.core}) 30%, rgba(0,150,160,${glowIntensity.core}) 100%)`,
          boxShadow: `0 0 ${size * 0.8}px rgba(0,229,224,0.4), 0 0 ${size * 1.5}px rgba(0,229,224,0.15)`,
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

      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size * 0.12,
            height: size * 0.12,
            background: `rgba(0, 229, 224, ${0.5 - i * 0.1})`,
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
            duration: 1.8,
            repeat: Infinity,
            delay: i * 0.35,
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.div>
  );
}
