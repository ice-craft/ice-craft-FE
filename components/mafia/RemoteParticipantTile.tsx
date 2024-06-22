import PlayerDieImages from "@/assets/images/player_die.svg";
import useClickHandler from "@/hooks/useClickHandler";
import { useDiedPlayer, usePlayersNumbers } from "@/store/game-store";
import { useJobImageState } from "@/store/image-store";
import { useActivePlayer, useIsRemoteOverlay, useReadyPlayers } from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import { ParticipantTile, ParticipantTileProps, useEnsureTrackRef } from "@livekit/components-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const RemoteParticipantTile = ({ trackRef }: ParticipantTileProps) => {
  const remote = useEnsureTrackRef(trackRef);
  const activePlayerId = useActivePlayer();
  const diedPlayers = useDiedPlayer();
  const playersNumber = usePlayersNumbers();
  const imageState = useJobImageState();
  const isRemoteOverlay = useIsRemoteOverlay();
  const remoteReadyStates = useReadyPlayers();
  const [remotePlayerNumber, setRemotePlayerNumber] = useState<number | undefined>();
  const { clickHandler } = useClickHandler();

  const diedPlayer = diedPlayers.find((diedPlayer) => diedPlayer === remote.participant.identity);

  //NOTE - 게임 시작시 players의 번호 부여
  useEffect(() => {
    const remotePlayer = playersNumber.find((player) => remote.participant.name === player.playerName);

    if (remotePlayer) {
      setRemotePlayerNumber(remotePlayer.playerNumber);
    }
  }, [playersNumber]);

  if (!remote) {
    return null;
  }

  return (
    <>
      <li
        className={`${S.remoteParticipantOverlay} ${activePlayerId === remote.participant.identity ? S.active : ""}`}
        onClick={isRemoteOverlay ? (e) => clickHandler(e, remote.participant.identity) : undefined}
      >
        {remotePlayerNumber && <p className={"text-red-600"}>{remotePlayerNumber}</p>}
        <ParticipantTile
          disableSpeakingIndicator={true}
          className={`${S.remoteCam} ${isRemoteOverlay ? "cursor-pointer" : ""}`}
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
