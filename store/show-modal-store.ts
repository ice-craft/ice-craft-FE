import { ShowModalState } from "@/types";
import { create } from "zustand";

//NOTE - 모달 데이터 요소
const useShowModalStore = create<ShowModalState>((set) => ({
  isOpen: false,
  currentModal: "",
  timer: -1,
  title: "",
  role: {},
  voteResult: [],
  yesOrNoResult: { detail: { noCount: 0, yesCount: 0 }, result: false },
  actions: {
    setIsOpen: (newIsOpen) => set({ isOpen: newIsOpen }),
    setCurrentModal: (newCurrentModal) => set({ currentModal: newCurrentModal }),
    setTimer: (newTimer) => set({ timer: newTimer }),
    setTitle: (newTitle) => set({ title: newTitle }),
    setRole: (newRole) => set({ role: newRole }),
    setVoteResult: (newResult) => set({ voteResult: newResult }),
    setYesOrNoVoteResult: (newVote) => set({ yesOrNoResult: newVote })
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

//NOTE - VoteResultModal 요소(투표 결과)
export const useVoteResultElement = () => useShowModalStore((state) => state.voteResult);

//NOTE - VoteResultModal 요소(최후의 투표 결과)
export const useYesOrNoResultElement = () => useShowModalStore((state) => state.yesOrNoResult);

//NOTE - ModalList 조건부 랜더링 관리
export const useCurrentModal = () => useShowModalStore((state) => state.currentModal);
