import { create } from "zustand";
import { ModalState, ReadyState } from "../types";

export const useModalStore = create<ModalState>((set) => ({
  isModal: false,

  setIsModal: (newToggle: boolean) => set({ isModal: newToggle })
}));

export const useReadyStore = create<ReadyState>((set) => ({
  isReady: false,

  setIsReady: (newToggle: boolean) => set({ isReady: !newToggle })
}));
