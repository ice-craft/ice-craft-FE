import { TrackReferenceOrPlaceholder } from "@livekit/components-react";

export interface MafiaRoom {
  room: string;
  name: string;
}

export interface ModalState {
  isModal: boolean;
  setIsModal: (newModal: boolean) => void;
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

export type Role = "citizens" | "mafia" | "doctor" | "police";
export interface MafiaGameToolTip {
  role: Role;
}

export interface MafiaModalContent {
  count: number;
  content: string;
  nickname?: string;
}

export interface CountState {
  isStart: boolean;
  timer: number;
  setTimer: (newCount: number) => void;
  setIsStart: (newToggle: boolean) => void;
}

export interface ReadyState {
  isReady: boolean;
  setIsReady: (newModal: boolean) => void;
}
