import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UIState {
  mobileMenuOpen: boolean;
  uploadModalOpen: boolean;
  activeToast: { message: string; type: "success" | "error" | "info" } | null;

  setMobileMenuOpen: (open: boolean) => void;
  setUploadModalOpen: (open: boolean) => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  clearToast: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      mobileMenuOpen: false,
      uploadModalOpen: false,
      activeToast: null,

      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }, false, "setMobileMenuOpen"),
      setUploadModalOpen: (open) => set({ uploadModalOpen: open }, false, "setUploadModalOpen"),
      showToast: (message, type = "info") =>
        set({ activeToast: { message, type } }, false, "showToast"),
      clearToast: () => set({ activeToast: null }, false, "clearToast"),
    }),
    { name: "TRID UI Store" }
  )
);
