import CamCheck from "@/assets/images/cam_check.svg";
import { useReadyStore } from "@/store/toggle-store";
import S from "@/style/livekit/livekit.module.css";
import { Participants } from "@/types";
import { ParticipantTile, TrackLoop, useLocalParticipant } from "@livekit/components-react";
import Image from "next/image";
import React from "react";
import GameStartButton from "./GameStartButton";
import SpeakTimer from "./SpeakTimer";
import { useActivePlayer, useIsLocalOverlay } from "@/store/overlay-store";

const LocalParticipant: React.FC<Participants> = ({ tracks, checkClickHandle }) => {
  const { localParticipant } = useLocalParticipant();
  const activePlayerId = useActivePlayer();
  const isLocalOverlay = useIsLocalOverlay();
  const { isReady } = useReadyStore();

  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid);

  console.log("LocalParticipant 작동", activePlayerId);

  return (
    <div className={S.localParticipant}>
      <SpeakTimer />
      <TrackLoop tracks={localTracks}>
        <div
          className={`${S.participantOverlay} ${activePlayerId === localParticipant.identity ? S.active : ""}`}
          onClick={isLocalOverlay ? (e) => checkClickHandle(e, localParticipant.identity) : undefined}
        >
          <ParticipantTile disableSpeakingIndicator={true} className={isLocalOverlay ? S.localCam : undefined} />

          <div className={`${S.imageOverlay} ${isReady ? S.active : ""}`}>
            <Image src={CamCheck} alt={localParticipant.identity} />
          </div>
        </div>
      </TrackLoop>
      <GameStartButton />
    </div>
  );
};

export default LocalParticipant;
