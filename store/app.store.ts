import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

interface AppState {
  user: User | null;
  sidebarOpen: boolean;
  setUser: (user: User | null) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      sidebarOpen: false,
      setUser: (user) => set({ user }),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: "trid-app-store",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
