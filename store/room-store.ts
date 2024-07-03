import { ExitState } from "@/types";
import { create } from "zustand";

const useRoomStore = create<ExitState>((set) => ({
  isEntry: false,
  isBack: false,
  actions: {
    setIsEntry: (newIsJoin: boolean) => set({ isEntry: newIsJoin }),
    setIsBack: (newIsBack: boolean) => set({ isBack: newIsBack })
  }
}));

export const useIsEntry = () => useRoomStore((state) => state.isEntry);
export const useIsBack = () => useRoomStore((state) => state.isBack);
export const useRoomAction = () => useRoomStore((state) => state.actions);
