import { ShowModalState } from "@/types";
import { create } from "zustand";

//NOTE - 모달의 데이터 요소
const useShowModalStore = create<ShowModalState>((set) => ({
  isOpen: false,
  timer: -1,
  title: "",
  role: {},
  actions: {
    setIsOpen: (newIsOpen) => set({ isOpen: newIsOpen }),
    setTimer: (newTimer) => set({ timer: newTimer }),
    setTitle: (newTitle) => set({ title: newTitle }),
    setRole: (newRole) => set({ role: newRole })
  }
}));

//NOTE - modal on, off
export const useModalIsOpen = () => useShowModalStore((state) => state.isOpen);

//NOTE - modal timer
export const useModalTimer = () => useShowModalStore((state) => state.timer);

//NOTE - modal actions 관리
export const useModalActions = () => useShowModalStore((state) => state.actions);

//NOTE - GroupModal 요소
export const useGroupModalElement = () => useShowModalStore((state) => state.title);

//NOTE - UserRoleModal 요소
export const useRoleModalElement = () => useShowModalStore((state) => state.role);
