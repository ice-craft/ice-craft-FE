import { create } from "zustand";
import { CreateState } from "../types";

export const useCreateStore = create<CreateState>((set) => ({
  isCreate: false,
  actions: {
    setIsCreate: (newToggle: boolean) => set({ isCreate: newToggle })
  }
}));

export const useCreate = () => useCreateStore((state) => state.isCreate);
export const useCreateActions = () => useCreateStore((state) => state.actions);
