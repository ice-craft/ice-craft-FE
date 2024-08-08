import { ExitState } from "@/types";
import { create } from "zustand";

const useRoomStore = create<ExitState>((set) => ({
  isEntry: false,
  actions: {
    setIsEntry: (newIsJoin: boolean) => set({ isEntry: newIsJoin })
  }
}));

export const useIsEntry = () => useRoomStore((state) => state.isEntry);
export const useRoomAction = () => useRoomStore((state) => state.actions);
