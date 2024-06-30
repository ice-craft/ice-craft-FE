import useMediaSocket from "@/hooks/useMediaSocket";
import useSelectSocket from "@/hooks/useSelectSocket";
import useSocketOn from "@/hooks/useSocketOn";
import { useExitAction } from "@/store/exit-store";
import { useGameActions } from "@/store/game-store";
import { useOverLayActions } from "@/store/overlay-store";
import { useModalActions } from "@/store/show-modal-store";
import S from "@/style/livekit/livekit.module.css";
import getPlayerNumber from "@/utils/mafiaSocket/getPlayerNumber";
import { allAudioSetting } from "@/utils/participantCamSettings/camSetting";
import { socket } from "@/utils/socket/socket";
import {
  DisconnectButton,
  RoomAudioRenderer,
  useLocalParticipant,
  useParticipants,
  useTracks
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import LocalParticipant from "./LocalParticipant";
import MafiaModals from "./MafiaModals";
import MafiaToolTip from "./MafiaToolTip";
import RemoteParticipant from "./RemoteParticipant";

const MafiaPlayRooms = () => {
  const participants = useParticipants();
  const [isGameState, setIsGame] = useState(false);
  const { localParticipant } = useLocalParticipant();
  const roomId = localParticipant.metadata;
  const userId = localParticipant.identity;
  const { setDiedPlayer, setPlayersNumbers, setPlayerReset } = useGameActions();
  const { setReadyPlayers, setOverlayReset } = useOverLayActions();
  const { setModalReset } = useModalActions();
  const { setIsExit } = useExitAction();

  useMediaSocket(); // 카메라 및 오디오 처리
  useSelectSocket(); // 클릭 이벤트 처리

  //NOTE -  전체 데이터
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: true }
    ],
    { onlySubscribed: false } // 구독 여부 상관없이 실행
  );

  const sockets = {
    //NOTE - 전체 players의 실시간 Ready 상태
    setReady: (playerId: string, isReady: boolean) => {
      setReadyPlayers(playerId, isReady);
    },
    //NOTE - 게임 시작
    gameStart: () => {
      setIsGame(true);
      setOverlayReset(); //local, remote "Ready" 이미지 초기화
    },
    //NOTE - 게임 종료
    gameEnd: () => {
      setIsGame(false);
      setOverlayReset(); //Local,Remote 클릭 이벤트 및 캠 이미지 초기화
      setModalReset(); //전체 모달 요소 초기화
      setPlayerReset(); // 죽은 players, playersNumber 초기화
    },
    //NOTE - 죽은 player 관리
    diedPlayer: (playerId: string) => {
      setDiedPlayer(playerId);
    }
  };

  useSocketOn(sockets);

  //NOTE - 게임 시작 시, 전체 players[] 목록을 정렬 및 번호를 부여
  useEffect(() => {
    if (isGameState) {
      const gamePlayers = getPlayerNumber(participants);
      setPlayersNumbers(gamePlayers);
    }
  }, [isGameState]);

  //NOTE - 방 나가기 이벤트 헨들러
  // supabase의 성능문제를 해결하기위해 로딩창을 띄어 텀을 주었다.
  const leaveRoom = () => {
    setIsExit(true);
    socket.emit("exitRoom", roomId, userId);
  };

  return (
    <section className={S.section}>
      <LocalParticipant tracks={tracks} isGameState={isGameState} />
      <RemoteParticipant tracks={tracks} />
      {/* 원격 참가자의 오디오 트랙을 처리 및 관리 */}
      <RoomAudioRenderer muted={false} />
      <div className={S.goToMainPage}>
        <button
          onClick={() => {
            allAudioSetting(tracks, false);
          }}
          style={{ background: "red" }}
        >
          전체 소리 끄기
        </button>
        <DisconnectButton onClick={leaveRoom}>나가기</DisconnectButton>
      </div>
      <MafiaToolTip />
      <MafiaModals />
    </section>
  );
};

export default MafiaPlayRooms;
