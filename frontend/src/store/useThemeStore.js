import { create } from "zustand";

export const useThemeStore = create((set) => ({
  themes: localStorage.getItem("chat-theme") || "dark",
  setThemes: (themes) => {
    localStorage.setItem("chat-theme", themes);
    set({ themes });
  },
}));
