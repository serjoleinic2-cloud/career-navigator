import { motion } from 'framer-motion';

interface EnvironmentGeneratorProps {
  side: 'left' | 'right';
  environmentType: string;
  levelIndex: number;
}

interface EnvConfig {
  width: number;
  height: number;
  gradient: string;
  borderRadius: string;
}

const leftEnvs: Record<string, EnvConfig> = {
  'skill-lab': { width: 40, height: 80, gradient: 'linear-gradient(180deg, rgba(0,229,224,0.2), rgba(0,150,160,0.1))', borderRadius: '8px 8px 0 0' },
  'training-ground': { width: 50, height: 60, gradient: 'linear-gradient(180deg, rgba(0,229,224,0.15), rgba(0,180,190,0.08))', borderRadius: '4px 4px 12px 12px' },
  'school-tower': { width: 30, height: 100, gradient: 'linear-gradient(180deg, rgba(0,200,200,0.25), rgba(0,130,140,0.1))', borderRadius: '4px' },
  'practice-field': { width: 60, height: 40, gradient: 'linear-gradient(180deg, rgba(0,229,224,0.12), rgba(0,170,180,0.06))', borderRadius: '12px' },
  'milestone-gate': { width: 50, height: 70, gradient: 'linear-gradient(180deg, rgba(245,158,11,0.2), rgba(245,158,11,0.08))', borderRadius: '50% 50% 0 0' },
};

const rightEnvs: Record<string, EnvConfig> = {
  'startup-office': { width: 70, height: 50, gradient: 'linear-gradient(180deg, rgba(168,85,247,0.2), rgba(130,50,200,0.1))', borderRadius: '4px' },
  'dev-studio': { width: 60, height: 60, gradient: 'linear-gradient(180deg, rgba(168,85,247,0.15), rgba(140,60,210,0.08))', borderRadius: '8px' },
  'corporate-building': { width: 80, height: 70, gradient: 'linear-gradient(180deg, rgba(150,70,230,0.18), rgba(100,40,180,0.08))', borderRadius: '2px' },
  'industry-hub': { width: 90, height: 45, gradient: 'linear-gradient(180deg, rgba(168,85,247,0.12), rgba(120,50,200,0.06))', borderRadius: '6px 6px 0 0' },
  'offer-castle': { width: 60, height: 80, gradient: 'linear-gradient(180deg, rgba(245,158,11,0.2), rgba(168,85,247,0.1))', borderRadius: '20px 20px 4px 4px' },
};

const envMap: Record<string, Record<string, EnvConfig>> = {
  left: leftEnvs,
  right: rightEnvs,
};

export function EnvironmentGenerator({ side, environmentType, levelIndex }: EnvironmentGeneratorProps) {
  const config = envMap[side]?.[environmentType];

  if (!config) return null;

  const xOffset = side === 'left' ? -100 : 20;
  const yOffset = levelIndex * 200 + 30;
  const isLeft = side === 'left';
  const animDelay = levelIndex * 0.3;

  return (
    <motion.div
      className="absolute"
      style={{
        width: config.width,
        height: config.height,
        background: config.gradient,
        borderRadius: config.borderRadius,
        left: xOffset,
        top: yOffset,
        opacity: 0.2,
      }}
      animate={
        isLeft
          ? { scale: [0.98, 1.02, 0.98] }
          : { y: [yOffset - 4, yOffset + 4, yOffset - 4] }
      }
      transition={{
        duration: isLeft ? 6 : 8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: animDelay,
      }}
    />
  );
}
