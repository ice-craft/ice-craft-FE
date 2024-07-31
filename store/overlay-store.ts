import { create } from "zustand";
import { OverlayState } from "@/types";
import CamCheck from "@/assets/images/cam_check.svg";

const useOverlayStore = create<OverlayState>((set) => ({
  activePlayerId: "",
  playersReady: {},
  isLocalOverlay: false,
  isRemoteOverlay: false,
  inSelect: "",
  imageState: CamCheck,

  actions: {
    setReadyPlayers: (playerId: string, isReady: boolean) =>
      set((state) => ({ playersReady: { ...state.playersReady, [playerId]: isReady } })),

    //NOTE - 클릭한 player의 정보를 update
    setActiveParticipant: (playerId: string | null) => set({ activePlayerId: playerId }),

    //NOTE - 캠 클릭 이벤트 핸들러 및 cursor 활성화 및 비활성화
    setIsOverlay: (newIsOverlay) => set({ isLocalOverlay: newIsOverlay, isRemoteOverlay: newIsOverlay }),
    setIsRemoteOverlay: (newIsOverlay) => set({ isRemoteOverlay: newIsOverlay }),

    //NOTE - OO시간(투표, 마피아, 의사, 경찰) 구별
    setInSelect: (newSelect) => set({ inSelect: newSelect }),

    //NOTE - 경찰 시간에 클릭한 player의 직업 이미지 띄우기
    setImageState: (newImage) => set({ imageState: newImage }),

    //NOTE - overlay 초기화
    setOverlayReset: () =>
      set({
        activePlayerId: "",
        playersReady: {},
        isLocalOverlay: false,
        isRemoteOverlay: false,
        inSelect: "",
        imageState: CamCheck
      })
  }
}));

//NOTE - Ready한 player의 캠 위치에 이미지 띄우기
export const useReadyPlayers = () => useOverlayStore((state) => state.playersReady);

//NOTE -  클릭한 캠 위치에 이미지 띄우기
export const useActivePlayer = () => useOverlayStore((state) => state.activePlayerId);

//NOTE - local의 캠 클릭 이벤트
export const useIsLocalOverlay = () => useOverlayStore((state) => state.isLocalOverlay);

//NOTE - remote의 캠 클릭 이벤트
export const useIsRemoteOverlay = () => useOverlayStore((state) => state.isRemoteOverlay);

//NOTE - OO시간 구별(투표, 마피아, 의사, 경찰)
export const useInSelect = () => useOverlayStore((state) => state.inSelect);

//NOTE -  OO시간(투표, 마피아, 의사, 경찰)에 다른 이미지 띄우기
export const useJobImageState = () => useOverlayStore((state) => state.imageState);

//NOTE - overlay actions 관리
export const useOverLayActions = () => useOverlayStore((state) => state.actions);
