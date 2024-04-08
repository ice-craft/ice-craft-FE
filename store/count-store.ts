import { create } from "zustand";
import { CountState } from "../types";

export const useCountStore = create<CountState>((set) => ({
  isStart: false,
  timer: 0,
  setTimer: (newTimer: number) => set({ timer: newTimer }),
  setIsStart: (newToggle: boolean) => set({ isStart: newToggle })
}));
