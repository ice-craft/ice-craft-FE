import { create } from "zustand";

interface OverlayState {
  showOverlay: string | null;
  activeParticipantSid: string | null; // 현재 활성화된 사용자의 sid 상태
  setActiveParticipantSid: (sid: string | null) => void; // 상태 업데이트 함수
  toggleOverlay: (participantSid: string) => void;
}

const useOverlayStore = create<OverlayState>((set) => ({
  showOverlay: null,
  activeParticipantSid: null, // 초기 상태값을 null로 설정
  setActiveParticipantSid: (sid) => set({ activeParticipantSid: sid }), // 함수로 상태 업데이트
  toggleOverlay: (participantSid) =>
    set((state) => {
      // 여기에서는 상태가 변경될 때마다 showOverlay와 activeParticipantSid를 업데이트합니다.
      // activeParticipantSid를 업데이트하는 로직이 필요한 경우에만 setActiveParticipantSid를 사용합니다.
      const isSameParticipant = state.activeParticipantSid === participantSid;
      return {
        showOverlay: isSameParticipant ? null : participantSid,
        activeParticipantSid: isSameParticipant ? null : participantSid
      };
    })
}));

export default useOverlayStore;
