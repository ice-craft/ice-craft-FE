import { ShowModalState } from "@/types";
import { create } from "zustand";

//NOTE - 모달의 데이터 요소
const useShowModalStore = create<ShowModalState>((set) => ({
  isOpen: false,
  IsGroupOpen: false,
  IsRoleOpen: false,
  IsVoteOpen: false,
  timer: -1,
  title: "",
  role: {},
  voteResult: { userId: "", nickname: "", count: 0 },
  actions: {
    setIsOpen: (newIsOpen) => set({ isOpen: newIsOpen }),
    setGroupIsOpen: (newIsOpen) => set({ IsGroupOpen: newIsOpen }),
    setRoleIsOpen: (newIsOpen) => set({ IsRoleOpen: newIsOpen }),
    setVoteIsOpen: (newIsOpen) => set({ IsVoteOpen: newIsOpen }),
    setTimer: (newTimer) => set({ timer: newTimer }),
    setTitle: (newTitle) => set({ title: newTitle }),
    setRole: (newRole) => set({ role: newRole }),
    setVoteResult: (newResult) => set({ voteResult: newResult })
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

//NOTE - VoteResultModal 요소
export const useVoteResultElement = () => useShowModalStore((state) => state.voteResult);

//NOTE - 임시 모달 on, off 요소
export const useGroupModalIsOpen = () => useShowModalStore((state) => state.IsGroupOpen);
export const useRoleModalIsOpen = () => useShowModalStore((state) => state.IsRoleOpen);
export const useVoteModalIsOpen = () => useShowModalStore((state) => state.IsVoteOpen);
