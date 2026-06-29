import { useMemo } from 'react';

const CHAPTER_BG: Record<string, string> = {
  resume: '#0a1628',
  linkedin: '#1a0a2e',
  applications: '#2a1408',
  interview: '#0d1117',
  offer: '#0a1f14',
};

const DEFAULT_BG = '#071320';

interface BackgroundLayerProps {
  chapterDomain?: string;
}

export function BackgroundLayer({ chapterDomain }: BackgroundLayerProps) {
  const bgColor = useMemo(() => {
    if (!chapterDomain) return DEFAULT_BG;
    const key = chapterDomain.toLowerCase();
    return CHAPTER_BG[key] || DEFAULT_BG;
  }, [chapterDomain]);

  return (
    <div
      className="background-layer"
      style={{ backgroundColor: bgColor }}
    />
  );
}
