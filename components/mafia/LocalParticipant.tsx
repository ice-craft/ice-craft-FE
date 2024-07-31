import CamCheck from "@/assets/images/cam_check.svg";
import ChiefImage from "@/assets/images/leader.svg";
import PlayerDieImage from "@/assets/images/player_die.svg";
import useClickHandler from "@/hooks/useClickHandler";
import usePlayerNumber from "@/hooks/usePlayerNumber";
import { useChiefPlayer, useDiedPlayer, useGameState } from "@/store/game-store";
import { useActivePlayer, useIsLocalOverlay, useReadyPlayers } from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import { ParticipantTile, TrackLoop, useLocalParticipant, useTracks } from "@livekit/components-react";
import Image from "next/image";
import GameStartButton from "@/components/mafia/GameStartButton";
import { useEffect, useState } from "react";
import { Track } from "livekit-client";

const LocalParticipant = () => {
  const [isChief, setIsChief] = useState(false);

  //NOTE - livekit Hooks
  const localParticipant = useLocalParticipant();
  const localPlayerId = localParticipant.localParticipant.identity;
  const localTrackId = localParticipant.localParticipant.sid;

  // NOTE -  전체 데이터
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: true }
    ],
    { onlySubscribed: true } // 구독됐을 경우에만 실행
  );

  //NOTE - global state
  const isGameState = useGameState();
  const diedPlayers = useDiedPlayer();
  const activePlayerId = useActivePlayer();
  const localReadyState = useReadyPlayers();
  const isLocalOverlay = useIsLocalOverlay();
  const chiefPlayerId = useChiefPlayer();

  //NOTE - custom Hooks
  const { clickHandler } = useClickHandler();
  const playerNumber = usePlayerNumber(localPlayerId, isGameState);

  const isDiedPlayer = diedPlayers.find((diedPlayer) => diedPlayer === localPlayerId);
  const localTracks = tracks.filter((track) => track.participant.sid === localTrackId);

  //NOTE - 게임 시작 전) 실시간 방장 정보 update
  useEffect(() => {
    // 초기 렌더링 필터
    if (!localParticipant.localParticipant.identity || !chiefPlayerId) {
      return;
    }

    const localPlayerId = localParticipant.localParticipant.identity;

    if (isGameState === "gameReady" && localPlayerId === chiefPlayerId.chief) {
      console.log("Local 게임 준비 시 방장 UI 실행 isGameState", isGameState);
      console.log("Local 게임 준비 시 방장 UI 실행 localParticipant", localParticipant.localParticipant.identity);
      console.log("Local 게임 준비 시 방장 UI 실행 chiefPlayerId", chiefPlayerId);
      setIsChief(true);
    }

    if (isGameState === "gameStart" || isGameState === "gameEnd") {
      console.log("Local 게임 시작 및 종료 후 방장 UI 종료");
      setIsChief(false);
    }
  }, [chiefPlayerId, isGameState]);

  return (
    <div className={S.localParticipant}>
      <div className={S.playerInfo}>
        <div className={S.chief}>{isChief && <Image src={ChiefImage} alt={localPlayerId} />}</div>
        {isGameState === "gameStart" && <p className={S.playerNumber}>{playerNumber}번</p>}
      </div>
      <TrackLoop tracks={localTracks}>
        <div
          className={`${S.participantOverlay} ${activePlayerId === localPlayerId ? S.active : ""}`}
          onClick={isLocalOverlay && !isDiedPlayer ? (e) => clickHandler(e, localPlayerId) : undefined}
        >
          <ParticipantTile
            // disableSpeakingIndicator={true}
            className={isLocalOverlay ? S.localCam : undefined}
          />
          {!isDiedPlayer ? (
            <div className={`${S.imageOverlay} ${localReadyState[localPlayerId] ? S.active : ""}`}>
              <Image src={CamCheck} alt={localPlayerId} />
            </div>
          ) : (
            <div className={S.playerDieOverlay}>
              <Image src={PlayerDieImage} alt={localPlayerId} />
            </div>
          )}
        </div>
      </TrackLoop>
      {isGameState === "gameReady" && <GameStartButton isGameState={isGameState} />}
    </div>
  );
};

export default LocalParticipant;
