import { TrackReference, TrackReferenceOrPlaceholder } from "@livekit/components-react";
import { User } from "@supabase/supabase-js";
import { LocalParticipant, Participant, RemoteParticipant, Track } from "livekit-client";
import { StaticImageData } from "next/image";
import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";

export interface MafiaRoom {
  room: string;
  userInfo: User | undefined | null;
}

// 미디어 상태 객체의 구조를 정의
export interface MediaStatus {
  [userId: string]: { camera: boolean; mike: boolean };
}

// socket 이벤트 핸들러 인터페이스 정의
export interface SocketEventHandler {
  [eventName: string]: (...args: any[]) => void;
}

export interface Role {
  [job: string]: string[];
}

// export interface RenderCardsProps {
//   cards: {
//     doctor: { src: string; alt: string };
//     police: { src: string; alt: string };
//     mafia: { src: string; alt: string };
//     citizen: { src: string; alt: string };
//   };
//   role: Role;
//   showAllCards: boolean;
// }

export interface VoteResult {
  user_id: string;
  user_nickname: string;
  voted_count: number;
}

export interface Participants {
  tracks: TrackReferenceOrPlaceholder[];
}

export interface playerMedia {
  userId: string;
  camera: boolean;
  mike: boolean;
}

export interface OverlayState {
  activePlayerId: string | null;
  playersReady: RemoteReadyStates;
  isLocalOverlay: boolean;
  isRemoteOverlay: boolean;
  inSelect: string;

  actions: {
    setReadyPlayers: (userId: string, isReady: boolean) => void;
    clearActiveImage: () => void;
    setActiveParticipant: (playerId: string | null) => void;
    setIsOverlay: (newIsOverlay: boolean) => void;
    setIsRemoteOverlay: (newIsOverlay: boolean) => void;
    setInSelect: (newSelect: string) => void;
  };
}

// export type Role = "citizens" | "mafia" | "doctor" | "police" | null;

// export interface MafiaGameToolTip {
//   role: Role;
// }

// export interface MafiaModalContent {
//   count: number;
//   content: string;
//   nickname?: string;
// }

// export interface CountState {
//   isStart: boolean;
//   timer: number;
//   setTimer: (newCount: number) => void;
//   setIsStart: (newToggle: boolean) => void;
// }

export interface ImageState {
  imageState: StaticImageData | null;
  setImageState: (newImage: StaticImageData | null) => void;
}

export interface GameState {
  isStart: boolean;
  isReady: boolean;
  diedPlayerId: string[];
  actions: {
    setIsStart: (isStart: boolean) => void;
    setIsReady: (isReady: boolean) => void;
    setDiedPlayer: (playerId: string) => void;
  };
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

// export interface MessageState {
//   messages: string[];
//   addMessage: (newMessage: string) => void;
//   clearMessages: () => void;
// }

// export interface CardInfo {
//   src: string;
//   alt: string;
// }

// export interface ModalData {
//   title: string;
//   message: string;
//   nickname: string;
//   timer: number;
//   isOpen: boolean;
// }

export interface RemoteReadyStates {
  [key: string]: boolean;
}

export interface ExitState {
  isExit: boolean;
  setIsExit: (newToggle: boolean) => void;
}

export interface ReadyState {
  isReady: boolean;
  setIsReady: (newReady: boolean) => void;
}

export interface CreateState {
  isCreate: boolean;
  setIsCreate: (newReady: boolean) => void;
}

export interface ShowModalState {
  isOpen: boolean;
  currentModal: string;
  title: string;
  timer: number;
  role: Role;
  voteResult: VoteResult[];
  yesOrNoResult: YesOrNoResults;
  actions: {
    setIsOpen: (newIsOpen: boolean) => void;
    setCurrentModal: (newCurrentModal: string) => void;
    setTimer: (newTimer: number) => void;
    setTitle: (newTitle: string) => void;
    setRole: (newRole: Role) => void;
    setVoteResult: (newVote: VoteResult[]) => void;
    setYesOrNoVoteResult: (newVote: YesOrNoResults) => void;
  };
}

export interface VoteData {
  userId: string;
  nickname: string;
}

export interface VoteResults {
  [nickname: string]: number;
}

export interface YesOrNoResults {
  detail: { noCount: number; yesCount: number };
  result: boolean;
}

export interface totalTimeState {
  timer: number;
  isTimer: boolean;
  actions: {
    setTimer: (newTimer: number) => void;
    setIsTimer: (newTimer: boolean) => void;
  };
}

// export interface TimerState {
//   timerIds: NodeJS.Timeout[];
//   setTimerIds: (newTimerId: NodeJS.Timeout) => void;
// }

// export interface TotalSocketState {
//   userId: string;
//   roomId: string;
//   votedPlayer: string;
//   voteBoard?: any;
//   setIsOpen: (newIsOpen: boolean) => void;
//   setTitle: (newTitle: string) => void;
//   setMessage: (newMessage: string) => void;
//   setTimer: (newTimer: number) => void;
//   setIsClose: (newIsClose: boolean) => void;
//   setIsOverlay: (newIsOverlay: boolean) => void;
//   setTimerIds: Dispatch<SetStateAction<NodeJS.Timeout[]>>;
//   clearActiveParticipant: () => void;
// }

// export interface VoteState {
//   votedPlayer: string;
//   isVoted: boolean;
//   timerRef: MutableRefObject<boolean>;
//   setVoteTimerClose: Dispatch<SetStateAction<NodeJS.Timeout | undefined>>;
//   setIsOverlay: (newIsOverlay: boolean) => void;
//   clearActiveParticipant: () => void;
//   setVoted: (newIsVoted: boolean) => void;
// }
// export type SetModalState = Omit<TotalSocketState, "userId" | "roomId" | "votedPlayer" | "voteBoard" | "setTimerIds">;

// export interface MediaState {
//   tracks: TrackReferenceOrPlaceholder[];
//   localUserId: string | undefined;
//   participants: (RemoteParticipant | LocalParticipant)[];
//   players: string[];
//   userId: string;
//   roomId: string;
//   sources: Track.Source[];
//   setTimerIds: Dispatch<SetStateAction<NodeJS.Timeout[]>>;
// }
