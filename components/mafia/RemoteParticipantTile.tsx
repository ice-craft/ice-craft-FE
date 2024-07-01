import PlayerDieImages from "@/assets/images/player_die.svg";
import useClickHandler from "@/hooks/useClickHandler";
import usePlayerNumber from "@/hooks/usePlayerNumber";
import { useDiedPlayer, useIsGameState } from "@/store/game-store";
import { useActivePlayer, useIsRemoteOverlay, useJobImageState, useReadyPlayers } from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import { ParticipantTile, ParticipantTileProps, useEnsureTrackRef } from "@livekit/components-react";
import Image from "next/image";

const RemoteParticipantTile = ({ trackRef }: ParticipantTileProps) => {
  const remote = useEnsureTrackRef(trackRef);
  const activePlayerId = useActivePlayer();
  const diedPlayers = useDiedPlayer();
  const imageState = useJobImageState();
  const isGameState = useIsGameState();
  const playerNumber = usePlayerNumber(remote.participant.identity, isGameState);
  const isRemoteOverlay = useIsRemoteOverlay();

  const remoteReadyStates = useReadyPlayers();
  const { clickHandler } = useClickHandler();

  const diedPlayer = diedPlayers.find((diedPlayer) => diedPlayer === remote.participant.identity);

  return (
    <>
      <li
        className={`${S.remoteParticipantOverlay} ${activePlayerId === remote.participant.identity ? S.active : ""}`}
        onClick={isRemoteOverlay && !diedPlayer ? (e) => clickHandler(e, remote.participant.identity) : undefined}
      >
        {isGameState && <p className={"text-red-600"}>{playerNumber}</p>}
        <ParticipantTile
          disableSpeakingIndicator={true}
          className={`${S.remoteCam} ${isRemoteOverlay && !diedPlayer ? "cursor-pointer" : ""}`}
        />
        {!diedPlayer ? (
          <div className={`${S.remoteOverlay} ${remoteReadyStates[remote.participant.identity] ? S.active : ""}`}>
            <Image src={imageState!} alt={remote.participant.identity} />
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
