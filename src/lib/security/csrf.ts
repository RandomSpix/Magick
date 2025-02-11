import { create } from 'zustand';

interface CSRFState {
  token: string | null;
  setToken: (token: string) => void;
}

export const useCSRFStore = create<CSRFState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));

export function generateCSRFToken(): string {
  return crypto.randomUUID();
}