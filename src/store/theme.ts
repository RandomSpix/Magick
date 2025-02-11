import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isMagicMode: boolean;
  isDarkMode: boolean;
  toggleMagicMode: () => void;
  toggleDarkMode: () => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      isMagicMode: false,
      isDarkMode: false,
      toggleMagicMode: () => set((state) => ({ isMagicMode: !state.isMagicMode })),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'theme-storage',
    }
  )
);