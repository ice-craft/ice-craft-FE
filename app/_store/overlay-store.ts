import { create } from "zustand";
import { OverlayState } from "../_types";

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
