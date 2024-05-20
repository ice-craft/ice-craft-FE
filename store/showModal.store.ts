import { ShowModalState } from "@/types";
import { create } from "zustand";

//NOTE - 모달의 데이터 요소
const useShowModalStore = create<ShowModalState>((set) => ({
  isOpen: false,
  title: "",
  message: "",
  nickname: "",
  timer: 0,
  setIsOpen: (newIsOpen) => set({ isOpen: newIsOpen }),
  setTitle: (newTitle) => set({ title: newTitle }),
  setMessage: (newMessage) => set({ message: newMessage }),
  setTimer: (newTimer) => set({ timer: newTimer })
}));

export default useShowModalStore;
