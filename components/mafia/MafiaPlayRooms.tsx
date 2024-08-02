import useMediaDevice from "@/hooks/useMediaDevice";
import useSelectSocket from "@/hooks/useSelectSocket";
import useSocketOn from "@/hooks/useSocketOn";
import { pretendard } from "@/public/fonts/fonts";
import { useGameActions, useGameState, useVictoryPlayers } from "@/store/game-store";
import { useOverLayActions } from "@/store/overlay-store";
import { useModalActions } from "@/store/show-modal-store";
import S from "@/style/livekit/livekit.module.css";
import { MediaStatus, playersInfo } from "@/types";

import { Tables } from "@/types/supabase";
import { socket } from "@/utils/socket/socket";
import { RoomAudioRenderer, useLocalParticipant } from "@livekit/components-react";
import { useEffect, useRef } from "react";
import LocalParticipant from "@/components/mafia/LocalParticipant";
import MafiaHeader from "@/components/mafia/MafiaHeader";
import MafiaModals from "@/components/mafia/MafiaModals";
import MafiaToolTip from "@/components/mafia/MafiaToolTip";
import RemoteParticipant from "@/components/mafia/RemoteParticipant";
import { getRankingScore, setRankingScore } from "@/utils/supabase/rankingAPI";

const MafiaPlayRooms = () => {
  const hasEmitted = useRef(false);

  //NOTE - livekit Hooks
  const localParticipant = useLocalParticipant();

  //NOTE - global state
  const isGameState = useGameState();
  const victoryPlayers = useVictoryPlayers();
  const { setPresentRoomId, setChiefPlayerId, setDiedPlayer, setIsGameState, setGameReset } = useGameActions();
  const { setReadyPlayers, setOverlayReset } = useOverLayActions();
  const { setModalReset } = useModalActions();

  //NOTE - custom Hooks
  useSelectSocket(localParticipant);

  const { setIsMediaReset, setPlayersMediaStatus } = useMediaDevice(); // 카메라 및 오디오 처리

  // // NOTE - 방 입장 시 초기화
  useEffect(() => {
    setOverlayReset(); //Local,Remote 클릭 이벤트 및 캠 이미지 초기화
    setModalReset(); //전체 모달 요소 초기화
    setGameReset(); // 죽은 players 및 게임 state 초기화
  }, []);

  //NOTE - 방 입장 시 방의 정보를 불러온다.
  useEffect(() => {
    if (localParticipant.localParticipant.metadata && !hasEmitted.current) {
      const roomId = localParticipant.localParticipant.metadata;

      setPresentRoomId(roomId);
      socket.emit("updateRoomInfo", roomId);
      socket.emit("usersInfo", roomId);
      hasEmitted.current = true;
    }
  }, [localParticipant]);

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
    //NOTE - 방에 대한 정보
    updateRoomInfo: (roomInfo: Tables<"room_table">) => {
      if (roomInfo.chief) {
        setChiefPlayerId({ chief: roomInfo.chief, roomId: roomInfo.room_id });
      }
    },
    //NOTE - players의 초기 Ready 상태
    usersInfo: (players: playersInfo[]) => {
      players.forEach((player) => {
        setReadyPlayers(player.user_id, player.is_ready);
      });
    },
    //NOTE - Error 처리
    playError: (roomName: string, error: string) => {
      setOverlayReset(); //Local,Remote 클릭 이벤트 및 캠 이미지 초기화
      setModalReset(); //전체 모달 요소 초기화
      setGameReset(); // 죽은 players 및 게임 state 초기화
      setIsMediaReset(true); // 캠 및 오디오 초기화
    }
  };
  useSocketOn(sockets);

  //NOTE - 게임 종료 및 Ranking 점수 산정
  useEffect(() => {
    const updateVictoryRanking = async () => {
      try {
        const localPlayerId = localParticipant.localParticipant.identity;
        console.log("🚀 ~ updateVictoryRanking ~ localPlayerId:", localPlayerId);
        const { mafia_score, music_score } = await getRankingScore(localPlayerId);
        console.log("🚀 victoryPlayers:", victoryPlayers);
        const isVictoryPlayer = victoryPlayers.find((playerId) => playerId === localPlayerId);

        const newScore = isVictoryPlayer ? 100 : 20;
        console.log("🚀 newScore:", newScore);

        const newMafia_score = mafia_score + newScore;

        const newMusic_score = music_score;

        const total_score = newMafia_score + newMusic_score;

        console.log("🚀 ~ updateVictoryRanking ~ newMafia_score:", newMafia_score);
        console.log("🚀 ~ updateVictoryRanking ~ newMusic_score:", newMusic_score);
        console.log("🚀 ~ updateVictoryRanking ~ total_score:", total_score);
        await setRankingScore(localPlayerId, newMafia_score, newMusic_score, total_score);
      } catch (error) {
      } finally {
        setOverlayReset(); //Local,Remote 클릭 이벤트 및 캠 이미지 초기화
        setModalReset(); //전체 모달 요소 초기화
        setGameReset(); // 죽은 players 및 게임 state 초기화
        setIsMediaReset(true); // 캠 및 오디오 초기화
      }
    };

    if (isGameState === "gameEnd") {
      updateVictoryRanking();
    }
  }, [isGameState]);

  return (
    <section className={`${S.mafiaPlayRoomWrapper} ${pretendard.className}`}>
      <div className={S.goToMainPage}></div>

      <MafiaHeader />
      <div className={S.mafiaPlayRoomSection}>
        <LocalParticipant />
        <RemoteParticipant />
        <RoomAudioRenderer muted={false} /> {/* 원격 참가자 오디오 트랙 처리 및 관리 */}
        <MafiaToolTip />
        <MafiaModals />
      </div>
    </section>
  );
};

export default MafiaPlayRooms;
