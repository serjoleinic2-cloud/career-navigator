import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProgressState, CareerScore, TabId } from '@/types';

interface ProgressStore extends ProgressState {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  completeNode: (nodeId: string) => void;
  setCurrentNode: (nodeId: string) => void;
  unlockNode: (nodeId: string) => void;
  resetProgress: () => void;
  getNodeStatus: (nodeId: string) => 'completed' | 'current' | 'locked';
  getProgressPercent: () => number;
}

const defaultCareerScore: CareerScore = {
  total_score: 0,
  resume_score: 0,
  positioning_score: 0,
  applications_score: 0,
  interview_preparation_score: 0,
  interview_practice_score: 0,
  consistency_score: 0,
};

const initialState: ProgressState = {
  currentNodeId: 'node-1',
  completedNodeIds: [],
  unlockedNodeIds: ['node-1'],
  journeyStarted: true,
  journeyCompleted: false,
  careerScore: defaultCareerScore,
  confidenceScore: null,
  currentDay: 1,
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      activeTab: 'journey',

      setActiveTab: (tab: TabId) => {
        set({ activeTab: tab });
      },

      completeNode: (nodeId: string) => {
        set((state) => {
          const newCompleted = [...state.completedNodeIds, nodeId];
          return {
            completedNodeIds: newCompleted,
            careerScore: {
              ...state.careerScore,
              total_score: Math.min(100, newCompleted.length * 10),
            },
          };
        });
      },

      setCurrentNode: (nodeId: string) => {
        set({ currentNodeId: nodeId });
      },

      unlockNode: (nodeId: string) => {
        set((state) => ({
          unlockedNodeIds: [...new Set([...state.unlockedNodeIds, nodeId])],
        }));
      },

      resetProgress: () => {
        set(initialState);
      },

      getNodeStatus: (nodeId: string) => {
        const state = get();
        if (state.completedNodeIds.includes(nodeId)) return 'completed';
        if (state.currentNodeId === nodeId) return 'current';
        if (state.unlockedNodeIds.includes(nodeId)) return 'current';
        return 'locked';
      },

      getProgressPercent: () => {
        const state = get();
        return Math.round((state.completedNodeIds.length / 10) * 100);
      },
    }),
    {
      name: 'career-navigator-progress',
      version: 1,
    }
  )
);