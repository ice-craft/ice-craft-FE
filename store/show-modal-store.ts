import { ShowModalState } from "@/types";
import { create } from "zustand";

//NOTE - 모달의 데이터 요소

const useShowModalStore = create<ShowModalState>((set) => ({
  isOpen: false,
  title: "",
  timer: -1,
  actions: {
    setIsOpen: (newIsOpen) => set({ isOpen: newIsOpen }),
    setTitle: (newTitle) => set({ title: newTitle }),
    setTimer: (newTimer) => set({ timer: newTimer })
  }
}));

//NOTE - modal on, off
export const useModalIsOpen = () => useShowModalStore((state) => state.isOpen);

//NOTE - GroupModal 요소
export const useGroupModalElement = () => useShowModalStore((state) => state.title);

///NOTE - modal timer
export const useModalTimer = () => useShowModalStore((state) => state.timer);

//NOTE - modal action 관리
export const useModalActions = () => useShowModalStore((state) => state.actions);
