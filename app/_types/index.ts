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
  checkClickHandle: (event: React.MouseEvent<HTMLElement>, participantSid: string, index: number) => void;
}
export interface OverlayState {
  showOverlay: string | null;
  activeParticipantSid: string | null;
  activeParticipantIndex: number | null;
  setActiveParticipant: (sid: string | null, index: number | null) => void;
  toggleOverlay: (participantSid: string, index: number) => void;
}

export interface MafiaModalContent {
  count: number;
  content: string;
  nickname?: string;
}
