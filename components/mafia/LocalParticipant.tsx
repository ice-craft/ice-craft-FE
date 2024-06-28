import CamCheck from "@/assets/images/cam_check.svg";
import PlayerDieImage from "@/assets/images/player_die.svg";
import useClickHandler from "@/hooks/useClickHandler";
import useSocketOn from "@/hooks/useSocketOn";
import { useDiedPlayer, useGameActions } from "@/store/game-store";
import { useActivePlayer, useIsLocalOverlay, useOverLayActions } from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import { Participants } from "@/types";
import getPlayerNumber from "@/utils/mafiaSocket/getPlayerNumber";
import { socket } from "@/utils/socket/socket";
import { ParticipantTile, TrackLoop, useLocalParticipant, useParticipants } from "@livekit/components-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import GameStartButton from "./GameStartButton";
import SpeakTimer from "./SpeakTimer";

const LocalParticipant = ({ tracks }: Participants) => {
  const participants = useParticipants();
  const { localParticipant } = useLocalParticipant();
  const [isReady, setIsReady] = useState(false);
  const [isStartButton, setIsStartButton] = useState(true);
  const [isPlayerNumber, setIsPlayerNumber] = useState(false);
  const [localPlayerNumber, setLocalPlayerNumber] = useState<number | undefined>();
  const isLocalOverlay = useIsLocalOverlay();
  const diedPlayers = useDiedPlayer();
  const activePlayerId = useActivePlayer();
  const { setOverlayReset } = useOverLayActions();
  const { clickHandler } = useClickHandler();
  const { setSortPlayers } = useGameActions();

  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid);
  const isDied = diedPlayers.find((diedPlayer) => diedPlayer === localParticipant.identity);

  //NOTE - 게임 시작
  const gameStartSocket = {
    gameStart: () => {
      // 게임 버튼 비활성화
      setIsStartButton(false);

      //local, remote 이미지 초기화
      setIsReady(false);
      setOverlayReset();

      // player 번호 부여
      setIsPlayerNumber(true);
    }
  };

  useSocketOn(gameStartSocket);

  //NOTE - 게임 시작시 players의 번호 부여
  useEffect(() => {
    if (isPlayerNumber) {
      const gamePlayers = getPlayerNumber(participants);

      const localPlayer = gamePlayers.find((player) => localParticipant.name === player.playerName);
      const remotePlayers = gamePlayers.filter((player) => localParticipant.name !== player.playerName);

      if (localPlayer) {
        console.log("gamePlayers", gamePlayers);
        console.log("remotePlayers", remotePlayers);
        setLocalPlayerNumber(localPlayer.playerNumber);
      }

      setSortPlayers(remotePlayers);
    }
  }, [isPlayerNumber]);

  //NOTE - 게임 준비 이벤트 핸들러
  const readyHandler = () => {
    const playerId = localParticipant.identity;
    const newIsReady = !isReady;

    setIsReady(newIsReady);

    socket.emit("setReady", playerId, newIsReady);
  };

  //NOTE - 게임 시작 이벤트 핸들러(방장 player에게만 권한 부여)
  const startHandler = () => {
    const roomId = localParticipant.metadata;
    const playersCount = participants.length;

    socket.emit("gameStart", roomId, playersCount);
  };

  return (
    <div className={S.localParticipant}>
      <SpeakTimer />
      {localPlayerNumber && <p className={"text-red-600"}>{localPlayerNumber}</p>}
      <TrackLoop tracks={localTracks}>
        <div
          className={`${S.participantOverlay} ${activePlayerId === localParticipant.identity ? S.active : ""}`}
          onClick={isLocalOverlay ? (e) => clickHandler(e, localParticipant.identity) : undefined}
        >
          <ParticipantTile disableSpeakingIndicator={true} className={isLocalOverlay ? S.localCam : undefined} />

          {!isDied ? (
            <div className={`${S.imageOverlay} ${isReady ? S.active : ""}`}>
              <Image src={CamCheck} alt={localParticipant.identity} />
            </div>
          ) : (
            <div className={S.playerDieOverlay}>
              <Image src={PlayerDieImage} alt={localParticipant.identity} />
            </div>
          )}
        </div>
      </TrackLoop>
      {isStartButton && <GameStartButton isReady={isReady} readyHandler={readyHandler} startHandler={startHandler} />}
    </div>
  );
};

export default LocalParticipant;
