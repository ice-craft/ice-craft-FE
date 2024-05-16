import { create } from "zustand";
import { CreateState, ReadyState } from "../types";

export const useReadyStore = create<ReadyState>((set) => ({
  isReady: false,

  setIsReady: (newToggle: boolean) => set({ isReady: newToggle })
}));

export const useCreateStore = create<CreateState>((set) => ({
  isCreate: false,

  setIsCreate: (newToggle: boolean) => set({ isCreate: newToggle })
}));
