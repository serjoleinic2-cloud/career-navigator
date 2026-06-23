/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#0a0a0f',
          900: '#0d0d14',
          850: '#11111c',
          800: '#161625',
          700: '#1e1e35',
          600: '#2a2a4a',
          500: '#3a3a5c',
        },
        glow: {
          cyan: '#00e5e0',
          teal: '#00b8a9',
          purple: '#a855f7',
          amber: '#f59e0b',
          rose: '#f43f5e',
          soft: 'rgba(0, 229, 224, 0.08)',
        },
        node: {
          completed: '#00e5e0',
          current: '#f59e0b',
          locked: '#2a2a4a',
          path: 'rgba(0, 229, 224, 0.15)',
          pathGlow: 'rgba(0, 229, 224, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'drift': 'drift 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(8px, -12px)' },
          '66%': { transform: 'translate(-6px, 6px)' },
        },
      },
    },
  },
  plugins: [],
}