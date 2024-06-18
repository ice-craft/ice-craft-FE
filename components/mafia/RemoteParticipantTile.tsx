import PlayerDieImages from "@/assets/images/player_die.svg";
import useClickHandler from "@/hooks/useClickHandler";
import { useDiedPlayer } from "@/store/game-store";
import { useJobImageState } from "@/store/image-store";
import { useActivePlayer, useIsRemoteOverlay, useReadyPlayers } from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import { ParticipantTile, ParticipantTileProps, useEnsureTrackRef } from "@livekit/components-react";
import Image from "next/image";

const RemoteParticipantTile = ({ trackRef }: ParticipantTileProps) => {
  const trackReference = useEnsureTrackRef(trackRef);
  const PlayerId = useActivePlayer();
  const diedPlayers = useDiedPlayer();
  const imageState = useJobImageState();
  const isRemoteOverlay = useIsRemoteOverlay();
  const remoteReadyStates = useReadyPlayers();
  const { clickHandler } = useClickHandler();

  const diedPlayer = diedPlayers.find((diedPlayer) => diedPlayer === trackReference.participant.identity);

  if (!trackReference) {
    return null;
  }

  return (
    <>
      <li
        className={`${S.remoteParticipantOverlay} ${PlayerId === trackReference.participant.identity ? S.active : ""}`}
        onClick={isRemoteOverlay ? (e) => clickHandler(e, trackReference.participant.identity) : undefined}
      >
        <ParticipantTile
          disableSpeakingIndicator={true}
          className={`${S.remoteCam} ${isRemoteOverlay ? "cursor-pointer" : ""}`}
        />
        {!diedPlayer ? (
          <div
            className={`${S.remoteOverlay} ${remoteReadyStates[trackReference.participant.identity] ? S.active : ""}`}
          >
            <Image src={imageState!} alt={trackReference.participant.identity} />
          </div>
        ) : (
          <div className={S.playerDieOverlay}>
            <Image src={PlayerDieImages} alt={trackReference.participant.identity} />
          </div>
        )}
      </li>
    </>
  );
};

export default RemoteParticipantTile;
