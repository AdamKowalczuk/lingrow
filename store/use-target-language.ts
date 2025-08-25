import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TargetLanguage = 'pl' | 'en' | 'jp';

interface TargetLanguageState {
  targetLanguage: TargetLanguage;
  setTargetLanguage: (language: TargetLanguage) => void;
}

export const useTargetLanguage = create<TargetLanguageState>()(
  persist(
    set => ({
      targetLanguage: 'pl',
      setTargetLanguage: (language: TargetLanguage) =>
        set({ targetLanguage: language }),
    }),
    {
      name: 'target-language-storage',
    },
  ),
);
