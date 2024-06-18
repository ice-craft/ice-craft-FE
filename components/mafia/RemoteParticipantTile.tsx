import PlayerDieImages from "@/assets/images/player_die.svg";
import useClickHandler from "@/hooks/useClickHandler";
import useSocketOn from "@/hooks/useSocketOn";
import { useDiedPlayer } from "@/store/game-store";
import { useJobImageState } from "@/store/image-store";
import { useActivePlayer, useIsRemoteOverlay, useOverLayActions, useReadyPlayers } from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import { ParticipantTile, ParticipantTileProps, useEnsureTrackRef } from "@livekit/components-react";
import Image from "next/image";

const RemoteParticipantTile = ({ trackRef }: ParticipantTileProps) => {
  const trackReference = useEnsureTrackRef(trackRef);
  const PlayerId = useActivePlayer();
  const imageState = useJobImageState();
  const isRemoteOverlay = useIsRemoteOverlay();
  const remoteReadyStates = useReadyPlayers();
  const { clickHandler } = useClickHandler();
  const { setReadyPlayers } = useOverLayActions();

  const diedPlayers = useDiedPlayer();
  const diedPlayer = diedPlayers.find((diedPlayer) => diedPlayer === trackReference.participant.identity);

  //NOTE - players의 실시간 준비 상태 update
  const sockets = {
    setReady: (playerId: string, isReady: boolean) => {
      setReadyPlayers(playerId, isReady);
    }
  };

  useSocketOn(sockets);

  //NOTE - remotePlayer의 Ready 초기 상태

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
