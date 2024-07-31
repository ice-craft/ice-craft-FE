import CamCheck from "@/assets/images/cam_check.svg";
import ChiefImage from "@/assets/images/leader.svg";
import PlayerDieImages from "@/assets/images/player_die.svg";
import useClickHandler from "@/hooks/useClickHandler";
import usePlayerNumber from "@/hooks/usePlayerNumber";
import { useChiefPlayer, useDiedPlayer, useGameState } from "@/store/game-store";
import { useActivePlayer, useIsRemoteOverlay, useJobImageState, useReadyPlayers } from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import { ParticipantTile, ParticipantTileProps, useEnsureTrackRef } from "@livekit/components-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const RemoteParticipantTile = ({ trackRef }: ParticipantTileProps) => {
  const [isChief, setIsChief] = useState(false);

  //NOTE - livekit Hooks
  const remote = useEnsureTrackRef(trackRef);

  //NOTE - 전역 state
  const isGameState = useGameState();
  const diedPlayers = useDiedPlayer();
  const activePlayerId = useActivePlayer();
  const remoteReadyStates = useReadyPlayers();
  const isRemoteOverlay = useIsRemoteOverlay();
  const imageState = useJobImageState();
  const chiefPlayerId = useChiefPlayer();

  //NOTE - custom Hooks
  const { clickHandler } = useClickHandler();
  const playerNumber = usePlayerNumber(remote.participant.identity, isGameState);

  const isDiedPlayer = diedPlayers.find((diedPlayer) => diedPlayer === remote.participant.identity);

  //NOTE - 게임 시작 전) 실시간 방장 정보 update
  useEffect(() => {
    if (isGameState === "gameReady" && remote.participant.identity === chiefPlayerId.chief) {
      setIsChief(true);
    }

    if (isGameState === "gameStart" || isGameState === "gameEnd") {
      setIsChief(false);
    }
  }, [chiefPlayerId, remote, isGameState]);

  return (
    <>
      <li
        className={`${S.remoteParticipantOverlay} ${activePlayerId === remote.participant.identity ? S.active : ""}`}
        onClick={isRemoteOverlay && !isDiedPlayer ? (e) => clickHandler(e, remote.participant.identity) : undefined}
      >
        <ParticipantTile
          // disableSpeakingIndicator={true}
          className={`${S.remoteCam} ${isRemoteOverlay && !isDiedPlayer ? "cursor-pointer" : ""}`}
        />
        <div className={S.remoteChief}>{isChief && <Image src={ChiefImage} alt={remote.participant.identity} />}</div>
        {isGameState === "gameStart" && <p className={S.remotePlayerNumber}>{playerNumber}번</p>}
        {!isDiedPlayer ? (
          <div className={`${S.remoteOverlay} ${remoteReadyStates[remote.participant.identity] ? S.active : ""}`}>
            <Image src={imageState || CamCheck} alt={remote.participant.identity} />
          </div>
        ) : (
          <div className={S.playerDieOverlay}>
            <Image src={PlayerDieImages} alt={remote.participant.identity} />
          </div>
        )}
      </li>
    </>
  );
};

export default RemoteParticipantTile;
