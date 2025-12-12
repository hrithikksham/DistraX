import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from './storage';

interface AppState {
  hasOnboarded: boolean;
  dailyGoalMinutes: number;
  totalFocusTime: number; // in seconds
  setHasOnboarded: (val: boolean) => void;
  setDailyGoal: (minutes: number) => void;
  addFocusTime: (seconds: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasOnboarded: false,
      dailyGoalMinutes: 240, // 4 hours default
      totalFocusTime: 0,
      setHasOnboarded: (val) => set({ hasOnboarded: val }),
      setDailyGoal: (minutes) => set({ dailyGoalMinutes: minutes }),
      addFocusTime: (seconds) => set((state) => ({ totalFocusTime: state.totalFocusTime + seconds })),
    }),
    {
      name: 'distrax-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);