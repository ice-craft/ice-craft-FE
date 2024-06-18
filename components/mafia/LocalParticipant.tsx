import CamCheck from "@/assets/images/cam_check.svg";
import PlayerDieImage from "@/assets/images/player_die.svg";
import useClickHandler from "@/hooks/useClickHandler";
import { useDiedPlayer, useIsReady } from "@/store/game-store";
import { useActivePlayer, useIsLocalOverlay } from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import { Participants } from "@/types";
import { ParticipantTile, TrackLoop, useLocalParticipant } from "@livekit/components-react";
import Image from "next/image";
import React from "react";
import GameStartButton from "./GameStartButton";
import SpeakTimer from "./SpeakTimer";

const LocalParticipant = ({ tracks }: Participants) => {
  const { localParticipant } = useLocalParticipant();
  const activePlayerId = useActivePlayer();
  const isLocalOverlay = useIsLocalOverlay();
  const isReady = useIsReady();
  const { clickHandler } = useClickHandler();
  const diedPlayers = useDiedPlayer();

  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid);
  const diedPlayer = diedPlayers.find((diedPlayer) => diedPlayer === localParticipant.identity);

  return (
    <div className={S.localParticipant}>
      <SpeakTimer />
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
      <GameStartButton />
    </div>
  );
};

export default LocalParticipant;
