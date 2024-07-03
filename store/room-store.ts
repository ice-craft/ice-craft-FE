import { ExitState } from "@/types";
import { create } from "zustand";

const useExitStore = create<ExitState>((set) => ({
  isExit: false,
  isBack: false,
  actions: {
    setIsExit: (newIsExit: boolean) => set({ isExit: newIsExit }),
    setIsBack: (newIsBack: boolean) => set({ isBack: newIsBack })
  }
}));

export const useIsExit = () => useExitStore((state) => state.isExit);
export const useIsBack = () => useExitStore((state) => state.isBack);
export const useExitAction = () => useExitStore((state) => state.actions);
