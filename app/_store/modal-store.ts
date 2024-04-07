import { create } from "zustand";
import { ModalState } from "../_types";

export const useModalStore = create<ModalState>((set) => ({
  isModal: false,

  setIsModal: (newToggle: boolean) => set({ isModal: newToggle })
}));
