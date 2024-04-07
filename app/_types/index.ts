import { TrackReferenceOrPlaceholder } from "@livekit/components-react";

export interface MafiaRoom {
  room: string;
  name: string;
}
export interface ModalState {
  isModal: boolean;
  setIsModal: (a: boolean) => void;
}
export interface Participants {
  tracks: TrackReferenceOrPlaceholder[];
  checkClickHandle: (event: any, participantSid: string) => void;
}

export interface OverlayState {
  showOverlay: string | null;
  activeParticipantSid: string | null;
  setActiveParticipantSid: (sid: string | null) => void;
  toggleOverlay: (participantSid: string) => void;
}
