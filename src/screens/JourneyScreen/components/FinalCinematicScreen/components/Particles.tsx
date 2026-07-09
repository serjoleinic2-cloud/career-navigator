interface FinalParticlesProps {
  visible: boolean;
}

export function FinalParticles({ visible }: FinalParticlesProps) {
  if (!visible) return null;

  return (
    <div className="door-particles">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="gold-particle"
          style={{
            animationDelay: `${i * 0.25}s`,
            left: `${45 + Math.random() * 10}%`,
            bottom: `${20 + Math.random() * 15}%`,
          }}
        />
      ))}
    </div>
  );
}
