import { create } from "zustand";
import { OverlayState } from "../types";

const useOverlayStore = create<OverlayState>((set) => ({
  showOverlay: null, //NOTE - 사용처 모름
  activeParticipantSid: null, //NOTE -  캠 이미지 띄우기
  activeParticipantIndex: null, //NOTE - 사용처 모름
  isLocalOverlay: true, //NOTE - local click event handler
  isRemoteOverlay: true, //NOTE - remote click event handler

  setActiveParticipant: (sid: string | null, index: number | null) =>
    set({ activeParticipantSid: sid, activeParticipantIndex: index }),

  //NOTE - 클릭한 user의 정보를 update
  toggleOverlay: (newParticipantSid, index) =>
    set((state) => {
      if (state.activeParticipantSid === newParticipantSid) {
        return { ...state };
      } else {
        return {
          ...state,
          showOverlay: newParticipantSid,
          activeParticipantSid: newParticipantSid,
          activeParticipantIndex: index
        };
      }
    }),

  //NOTE - 활성화된 user의 정보를 초기화 시킨다.(캠에 보여지는 이미지 비활성화)
  clearActiveParticipant: () => set({ activeParticipantSid: null, activeParticipantIndex: null }),
  //NOTE - 캠 클릭 이벤트 핸들러 및 cursor 활성화 및 비활성화
  setIsOverlay: (newIsOverlay) => set({ isLocalOverlay: newIsOverlay, isRemoteOverlay: newIsOverlay }),
  setIsRemoteOverlay: (newIsOverlay) => set({ isRemoteOverlay: newIsOverlay })
}));

export default useOverlayStore;
