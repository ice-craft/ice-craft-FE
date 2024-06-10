import { create } from "zustand";
import { CreateState } from "../types";

export const useCreateStore = create<CreateState>((set) => ({
  isCreate: false,

  setIsCreate: (newToggle: boolean) => set({ isCreate: newToggle })
}));
