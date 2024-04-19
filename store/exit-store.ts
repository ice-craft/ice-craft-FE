import { ExitState } from "@/types";
import { create } from "zustand";

export const useExitStore = create<ExitState>((set) => ({
  isExit: false,
  setIsExit: (newToggle: boolean) => set({ isExit: newToggle })
}));
