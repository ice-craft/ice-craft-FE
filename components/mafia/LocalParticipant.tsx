import CamCheck from "@/assets/images/cam_check.svg";
import PlayerDieImage from "@/assets/images/player_die.svg";
import useClickHandler from "@/hooks/useClickHandler";
import { useDiedPlayer, useGameActions, useGamePlayers } from "@/store/game-store";
import { useActivePlayer, useIsLocalOverlay, useOverLayActions } from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import { GamePlayerInfo, Participants } from "@/types";
import { socket } from "@/utils/socket/socket";
import { ParticipantTile, TrackLoop, useLocalParticipant, useParticipants } from "@livekit/components-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import GameStartButton from "./GameStartButton";
import SpeakTimer from "./SpeakTimer";

const LocalParticipant = ({ tracks }: Participants) => {
  const { localParticipant } = useLocalParticipant();
  const { setOverlayReset } = useOverLayActions();
  const isLocalOverlay = useIsLocalOverlay();
  const { clickHandler } = useClickHandler();
  const activePlayerId = useActivePlayer();
  const participants = useParticipants();
  const diedPlayers = useDiedPlayer();
  const gamePlayers = useGamePlayers();
  const { setGamePlayers } = useGameActions();

  const [localPlayerNumber, setLocalPlayerNumber] = useState<number | undefined>();
  const [isReady, setIsReady] = useState(false);
  const [isStartButton, setIsStartButton] = useState(true);

  const playersCount = participants.length;
  const userId = localParticipant.identity;
  const roomId = localParticipant.metadata;

  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid);
  const diedPlayer = diedPlayers.find((diedPlayer) => diedPlayer === localParticipant.identity);

  //NOTE - 게임 준비 이벤트 핸들러
  const readyHandler = () => {
    const newIsReady = !isReady;
    setIsReady(newIsReady);
    setGamePlayers(participants); // 게임 시작시 player Number 부여
    socket.emit("setReady", userId, newIsReady);
  };

  //NOTE - 게임 시작 이벤트 핸들러
  const startHandler = () => {
    socket.emit("gameStart", roomId, playersCount);

    // 게임 버튼 비활성화
    setIsStartButton(false);

    //local, remote 이미지 초기화
    setIsReady(false);
    setOverlayReset();
  };

  // //NOTE - 게임 시작 시 PlayerNumber를 부여
  useEffect(() => {
    const localNumber = gamePlayers.find((player) => localParticipant.name === player.playerName);

    if (localNumber) {
      setLocalPlayerNumber(localNumber.playerNumber);
    }
  }, [gamePlayers]);

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

          {!diedPlayer ? (
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
