import { create } from "zustand";
import { OverlayState } from "../_types";

const useOverlayStore = create<OverlayState>((set) => ({
  showOverlay: null,
  activeParticipantSid: null,
  activeParticipantIndex: null,

  setActiveParticipant: (sid: string | null, index: number | null) =>
    set({ activeParticipantSid: sid, activeParticipantIndex: index }),

  toggleOverlay: (participantSid, index) =>
    set((state) => {
      if (state.activeParticipantSid === participantSid) {
        return { ...state };
      } else {
        return {
          ...state,
          showOverlay: participantSid,
          activeParticipantSid: participantSid,
          activeParticipantIndex: index
        };
      }
    }),

  clearActiveParticipant: () => set({ activeParticipantSid: null, activeParticipantIndex: null })
}));

export default useOverlayStore;
