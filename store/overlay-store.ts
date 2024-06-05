import { create } from "zustand";
import { OverlayState } from "../types";

const useOverlayStore = create<OverlayState>((set) => ({
  activePlayerId: "",
  isLocalOverlay: false,
  isRemoteOverlay: false,
  inSelect: "",

  // showOverlay: null, //NOTE - 사용처 모름
  // activeParticipantIndex: null, //NOTE - 사용처 모름

  actions: {
    //NOTE - 클릭한 user의 정보를 update
    setActiveParticipant: (playerId: string | null) => set({ activePlayerId: playerId }),

    //NOTE - 활성화된 user의 정보를 초기화 시킨다.(캠에 보여지는 이미지 비활성화)
    clearActiveParticipant: () => set({ activePlayerId: null }),

    //NOTE - 캠 클릭 이벤트 핸들러 및 cursor 활성화 및 비활성화
    setIsOverlay: (newIsOverlay) => set({ isLocalOverlay: newIsOverlay, isRemoteOverlay: newIsOverlay }),
    setIsRemoteOverlay: (newIsOverlay) => set({ isRemoteOverlay: newIsOverlay }),
    //NOTE - OO시간 구별(투표, 마피아, 의사, 경찰)
    setInSelect: (newSelect) => set({ inSelect: newSelect })
  }
}));

//NOTE -  클릭한 캠 위치에 이미지 띄우기
export const useActivePlayer = () => useOverlayStore((state) => state.activePlayerId);

//NOTE - local의 캠 클릭 이벤트
export const useIsLocalOverlay = () => useOverlayStore((state) => state.isLocalOverlay);

//NOTE - remote의 캠 클릭 이벤트
export const useIsRemoteOverlay = () => useOverlayStore((state) => state.isRemoteOverlay);

//NOTE - OO시간 구별(투표, 마피아, 의사, 경찰)
export const useInSelect = () => useOverlayStore((state) => state.inSelect);

//NOTE - overlay actions 관리
export const useOverLayActions = () => useOverlayStore((state) => state.actions);
