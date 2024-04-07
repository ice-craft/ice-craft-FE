// store.js
import { create } from "zustand";
import { TrackPublication } from "livekit-client";
import { TrackReferenceOrPlaceholder } from "@livekit/components-react";

//NOTE - TrackPublication livekit에서 제공하는 track 객체 반환 훅
//NOTE - conference 컴포넌트 useTrack이 반환하는 속성이 달라 TrackReferenceOrPlaceholder 연결함
export interface VideoState {
  tracks: TrackReferenceOrPlaceholder[];
  setTracks: (tracks: TrackReferenceOrPlaceholder[]) => void;
}

const useVideoStore = create<VideoState>((set) => ({
  tracks: [],
  setTracks: (tracks) => set({ tracks })
}));

export default useVideoStore;
