export const CHAPTER_THEMES = {
  Resume: {
    primary: '#4A90D9',
    secondary: '#7BB3E8',
    gradient: 'linear-gradient(180deg, #1a365d 0%, #2c5282 50%, #4A90D9 100%)',
    particles: 'radial-gradient(circle at 20% 30%, rgba(74, 144, 217, 0.15) 0%, transparent 50%)',
  },
  LinkedIn: {
    primary: '#7B68EE',
    secondary: '#9B82F3',
    gradient: 'linear-gradient(180deg, #2d1b69 0%, #4c3d99 50%, #7B68EE 100%)',
    particles: 'radial-gradient(circle at 80% 20%, rgba(123, 104, 238, 0.15) 0%, transparent 50%)',
  },
  Applications: {
    primary: '#F6AD55',
    secondary: '#FBD38D',
    gradient: 'linear-gradient(180deg, #744210 0%, #975a16 50%, #F6AD55 100%)',
    particles: 'radial-gradient(circle at 30% 70%, rgba(246, 173, 85, 0.15) 0%, transparent 50%)',
  },
  Interview: {
    primary: '#2D3748',
    secondary: '#4A5568',
    gradient: 'linear-gradient(180deg, #1a202c 0%, #2d3748 50%, #4A5568 100%)',
    particles: 'radial-gradient(circle at 70% 40%, rgba(74, 85, 104, 0.2) 0%, transparent 50%)',
  },
  Offer: {
    primary: '#48BB78',
    secondary: '#68D391',
    gradient: 'linear-gradient(180deg, #22543d 0%, #276749 50%, #48BB78 100%)',
    particles: 'radial-gradient(circle at 50% 50%, rgba(72, 187, 120, 0.15) 0%, transparent 50%)',
  },
} as const;

export type ChapterTheme = typeof CHAPTER_THEMES[keyof typeof CHAPTER_THEMES];
