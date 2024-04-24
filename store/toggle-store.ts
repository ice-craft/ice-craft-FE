import { create } from "zustand";
import { CreateState, ModalState, ReadyState } from "../types";

export const useModalStore = create<ModalState>((set) => ({
  isModal: false,

  setIsModal: (newToggle: boolean) => set({ isModal: newToggle })
}));

export const useReadyStore = create<ReadyState>((set) => ({
  isReady: false,

  setIsReady: (newToggle: boolean) => set({ isReady: newToggle })
}));

export const useCreateStore = create<CreateState>((set) => ({
  isCreate: false,

  setIsCreate: (newToggle: boolean) => set({ isCreate: newToggle })
}));
