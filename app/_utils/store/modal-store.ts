import { create } from "zustand";

type modalState = {
  isModal: boolean;
  setIsModal: (a: boolean) => void;
};

export const useModalStore = create<modalState>((set) => ({
  isModal: false,

  setIsModal: (newToggle: boolean) => set({ isModal: newToggle })
}));
