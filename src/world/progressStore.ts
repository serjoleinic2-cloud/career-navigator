import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WorldProgress {
  completedLevels: number[];
  currentLevel: number;
  unlockedLevels: number[];
}

interface WorldProgressStore extends WorldProgress {
  completeLevel: (index: number) => void;
  setCurrentLevel: (index: number) => void;
  isLevelUnlocked: (index: number) => boolean;
  isLevelCompleted: (index: number) => boolean;
}

export const useWorldProgressStore = create<WorldProgressStore>()(
  persist(
    (set, get) => ({
      completedLevels: [],
      currentLevel: 0,
      unlockedLevels: [0],

      completeLevel: (index: number) => {
        set((state) => {
          const newCompleted = [...new Set([...state.completedLevels, index])];
          const nextLevel = index + 1;
          const newUnlocked = new Set([...state.unlockedLevels, nextLevel]);
          return {
            completedLevels: newCompleted,
            unlockedLevels: [...newUnlocked],
            currentLevel: nextLevel,
          };
        });
      },

      setCurrentLevel: (index: number) => {
        set({ currentLevel: index });
      },

      isLevelUnlocked: (index: number) => {
        return get().unlockedLevels.includes(index);
      },

      isLevelCompleted: (index: number) => {
        return get().completedLevels.includes(index);
      },
    }),
    {
      name: 'career-navigator-world-progress',
      version: 1,
    }
  )
);
