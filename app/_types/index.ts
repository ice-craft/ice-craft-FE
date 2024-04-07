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

export interface activeState {
  isToggle: boolean;
  setIsToggle: (a: boolean) => void;
}

export interface MafiaModalContent {
  count: number;
  content: string;
  nickname?: string;
}
