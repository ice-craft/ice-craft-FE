import { create } from "zustand";

interface OverlayState {
  showOverlay: string | null;
  activeParticipantSid: string | null;
  setActiveParticipantSid: (sid: string | null) => void;
  toggleOverlay: (participantSid: string) => void;
}

const useOverlayStore = create<OverlayState>((set) => ({
  showOverlay: null,
  activeParticipantSid: null,
  setActiveParticipantSid: (sid) => set({ activeParticipantSid: sid }),
  toggleOverlay: (participantSid) =>
    set((state) => {
      const isSameParticipant = state.activeParticipantSid === participantSid;
      return {
        showOverlay: isSameParticipant ? null : participantSid,
        activeParticipantSid: isSameParticipant ? null : participantSid
      };
    })
}));

export default useOverlayStore;
