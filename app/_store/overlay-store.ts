import { create } from "zustand";

interface OverlayState {
  showOverlay: string | null;
  setShowOverlay: (sid: string | null) => void;
  toggleOverlay: (participantSid: string) => void;
}

const useOverlayStore = create<OverlayState>((set) => ({
  showOverlay: null,
  setShowOverlay: (sid: string | null) => set({ showOverlay: sid }),
  toggleOverlay: (participantSid: string) =>
    set((state) => ({
      showOverlay: state.showOverlay === participantSid ? null : participantSid
    }))
}));

export default useOverlayStore;
