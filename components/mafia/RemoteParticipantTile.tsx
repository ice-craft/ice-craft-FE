import CamCheck from "@/assets/images/cam_check.svg";
import ChiefImage from "@/assets/images/leader.svg";
import PlayerDieImages from "@/assets/images/player_die.svg";
import useChief from "@/hooks/useChief";
import useClickHandler from "@/hooks/useClickHandler";
import usePlayerNumber from "@/hooks/usePlayerNumber";
import { useDiedPlayer, useGameState } from "@/store/game-store";
import { useActivePlayer, useIsRemoteOverlay, useJobImageState, useReadyPlayers } from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import { ParticipantTile, ParticipantTileProps, useEnsureTrackRef } from "@livekit/components-react";
import Image from "next/image";

const RemoteParticipantTile = ({ trackRef }: ParticipantTileProps) => {
  //NOTE - livekit Hooks
  const remote = useEnsureTrackRef(trackRef);

  //NOTE - 전역 state
  const isGameState = useGameState();
  const diedPlayers = useDiedPlayer();
  const activePlayerId = useActivePlayer();
  const remoteReadyStates = useReadyPlayers();
  const isRemoteOverlay = useIsRemoteOverlay();
  const imageState = useJobImageState();

  //NOTE - custom Hooks
  const { clickHandler } = useClickHandler();
  const playerNumber = usePlayerNumber(remote.participant.identity, isGameState);
  const isChief = useChief(remote.participant.identity, isGameState);

  const diedPlayer = diedPlayers.find((diedPlayer) => diedPlayer === remote.participant.identity);

  return (
    <>
      <li
        className={`${S.remoteParticipantOverlay} ${activePlayerId === remote.participant.identity ? S.active : ""}`}
        onClick={isRemoteOverlay && !diedPlayer ? (e) => clickHandler(e, remote.participant.identity) : undefined}
      >
        <ParticipantTile
          // disableSpeakingIndicator={true}
          className={`${S.remoteCam} ${isRemoteOverlay && !diedPlayer ? "cursor-pointer" : ""}`}
        />
        <div className={S.remoteChief}>
          {isGameState === "gameReady" && isChief && <Image src={ChiefImage} alt={remote.participant.identity} />}
        </div>
        {isGameState === "gameStart" && <p className={S.remotePlayerNumber}>{playerNumber}번</p>}
        {!diedPlayer ? (
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
