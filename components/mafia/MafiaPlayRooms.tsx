import useMediaDevice from "@/hooks/useMediaDevice";
import useSelectSocket from "@/hooks/useSelectSocket";
import useSocketOn from "@/hooks/useSocketOn";
import { useGameActions, useGameState } from "@/store/game-store";
import { useOverLayActions } from "@/store/overlay-store";
import { useRoomAction } from "@/store/room-store";
import { useModalActions } from "@/store/show-modal-store";
import S from "@/style/livekit/livekit.module.css";
import { MediaStatus } from "@/types";
import { allAudioSetting } from "@/utils/participantCamSettings/camSetting";
import { socket } from "@/utils/socket/socket";
import { DisconnectButton, RoomAudioRenderer, useLocalParticipant, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import LocalParticipant from "./LocalParticipant";
import MafiaModals from "./MafiaModals";
import MafiaToolTip from "./MafiaToolTip";
import RemoteParticipant from "./RemoteParticipant";
import { pretendard } from "@/public/fonts/fonts";
import SpeakTimer from "./SpeakTimer";

const MafiaPlayRooms = () => {
  const { localParticipant } = useLocalParticipant();
  const roomId = localParticipant.metadata;
  const userId = localParticipant.identity;
  const isGameState = useGameState();
  const { setDiedPlayer, setIsGameState, setGameReset } = useGameActions();
  const { setReadyPlayers, setOverlayReset } = useOverLayActions();
  const { setModalReset } = useModalActions();
  const { setIsEntry } = useRoomAction();
  const { setIsMediaReset, setPlayersMediaStatus } = useMediaDevice(); // 카메라 및 오디오 처리
  useSelectSocket(); // 클릭 이벤트 처리
  const [day, setDay] = useState(false);
  const [night, setNight] = useState(false);

  //NOTE -  전체 데이터
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: true }
    ],
    { onlySubscribed: true } // 구독됐을 경우에만 실행
  );

  //NOTE - 방 입장 시 초기화
  useEffect(() => {
    console.log("🚀 MafiaPlayRooms: 방 입장 시 초기화");
    setOverlayReset(); //Local,Remote 클릭 이벤트 및 캠 이미지 초기화
    setModalReset(); //전체 모달 요소 초기화
    setGameReset(); // 죽은 players 및 게임 state 초기화
    setDay(false);
    setNight(false);
  }, []);

  const sockets = {
    //NOTE - 전체 players의 실시간 Ready 상태
    setReady: (playerId: string, isReady: boolean) => {
      setReadyPlayers(playerId, isReady);
    },
    //NOTE - 게임 시작
    gameStart: () => {
      setIsGameState("gameStart");
      setOverlayReset(); //local, remote "Ready" 이미지 초기화
    },
    //NOTE - players 미디어 관리
    playerMediaStatus: (playersMedias: MediaStatus) => {
      setPlayersMediaStatus(playersMedias);
    },
    //NOTE - 죽은 player 관리
    diedPlayer: (playerId: string) => {
      setDiedPlayer(playerId);
    },
    //NOTE - Error 처리
    playError: (roomName: string, error: string) => {
      console.log("roomName", roomName);
      console.log("roomError", error);

      setOverlayReset(); //Local,Remote 클릭 이벤트 및 캠 이미지 초기화
      setModalReset(); //전체 모달 요소 초기화
      setGameReset(); // 죽은 players 및 게임 state 초기화
      setIsMediaReset(true); // 캠 및 오디오 초기화
      setDay(false);
      setNight(false);
    },
    showModal: (title: string) => {
      //NOTE -  CheckModal(찬성/반대) 투표 모달창 요소
      if (title.includes("낮")) {
        setDay(true);
        return;
      }
      if (title.includes("밤")) {
        setNight(true);
        return;
      }
    }
  };

  useSocketOn(sockets);

  //NOTE - 게임 종료
  useEffect(() => {
    if (isGameState === "gameEnd") {
      console.log("🚀 isGameState:", isGameState);
      setOverlayReset(); //Local,Remote 클릭 이벤트 및 캠 이미지 초기화
      setModalReset(); //전체 모달 요소 초기화
      setGameReset(); // 죽은 players 및 게임 state 초기화
      setIsMediaReset(true); // 캠 및 오디오 초기화
      setDay(false);
      setNight(false);
    }
  }, [isGameState]);

  //NOTE - 방 나가기 이벤트 헨들러
  const leaveRoom = () => {
    setIsEntry(false);
    socket.emit("exitRoom", roomId, userId);
  };

  return (
    <section
      className={`${S.mafiaPlayRoomWrapper} ${pretendard.className} ${day ? S.day : ""} ${night ? S.night : ""}`}
    >
      <div className={S.gameTimer}>
        <div className={S.goToMainPage}>
          {/* <button
          onClick={() => {
            allAudioSetting(tracks, false);
          }}
          style={{ background: "red" }}
        >
          전체 소리 끄기
        </button> */}
          <DisconnectButton onClick={leaveRoom}>
            <span>＜</span> 방 나가기
          </DisconnectButton>
        </div>
        <div className={S.timer}>
          <SpeakTimer />
        </div>
      </div>
      <div className={S.mafiaPlayRoomSection}>
        <LocalParticipant tracks={tracks} />
        <RemoteParticipant tracks={tracks} />
        <RoomAudioRenderer muted={false} /> {/* 원격 참가자 오디오 트랙 처리 및 관리 */}
        <MafiaToolTip />
        <MafiaModals />
      </div>
    </section>
  );
};

export default MafiaPlayRooms;
