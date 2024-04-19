import { TrackReferenceOrPlaceholder } from "@livekit/components-react";
import { User } from "@supabase/supabase-js";
import { StaticImageData } from "next/image";

export interface MafiaRoom {
  room: string;
  // userInfo: User;
  userInfo: User | undefined | null;
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
  isOverlay: boolean;
  clearActiveParticipant: () => void;
  setActiveParticipant: (sid: string | null, index: number | null) => void;
  toggleOverlay: (participantSid: string, index: number) => void;
  setIsOverlay: (newIsOverlay: boolean) => void;
}

export type Role = "citizens" | "mafia" | "doctor" | "police" | null;

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

export interface ImageState {
  imageState: StaticImageData | null;
  setImageState: (newImage: StaticImageData | null) => void;
}

export interface ActiveNameState {
  activeName: string | null;
  setActiveName: (newName: string | null) => void;
}

export interface ConnectState {
  join: boolean;
  nickname: string;
  userId: string;
  roomId: string;
  setJoinStatus: (status: boolean) => void;
  setRoomId: (id: string) => void;
  setUserId: (id: string) => void;
  setUserNickname: (id: string) => void;
}

export interface MessageState {
  messages: string[];
  addMessage: (newMessage: string) => void;
  clearMessages: () => void;
}

export interface VoteData {
  userId: string;
  nickname: string;
}

export interface CardInfo {
  src: string;
  alt: string;
}

export interface RenderCardsProps {
  cards: {
    doctor: CardInfo;
    police: CardInfo;
    mafia: CardInfo;
    citizens: CardInfo;
  };

  role: Role;
  showAllCards: boolean;
}

export interface ModalData {
  title: string;
  message: string;
  nickname: string;
  timer: number;
  isOpen: boolean;
}

export interface ParticipantReadyData {
  userId: string;
  isReady: boolean;
}

export interface RemoteReadyStates {
  [key: string]: boolean;
}

export interface ExitState {
  isExit: boolean;
  setIsExit: (newToggle: boolean) => void;
}
