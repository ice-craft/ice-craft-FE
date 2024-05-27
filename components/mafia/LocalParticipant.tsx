import CamCheck from "@/assets/images/cam_check.svg";
import useOverlayStore from "@/store/overlay-store";
import { useReadyStore } from "@/store/toggle-store";
import S from "@/style/livekit/livekit.module.css";
import { Participants } from "@/types";
import { ParticipantTile, useLocalParticipant } from "@livekit/components-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import GameStartButton from "./GameStartButton";
import RoundTimer from "./SpeakTimer";

const LocalParticipant: React.FC<Participants> = ({ tracks, checkClickHandle }) => {
  const { localParticipant } = useLocalParticipant();
  const { activeParticipantSid, isLocalOverlay } = useOverlayStore();
  const { isReady } = useReadyStore();

  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)!;

  return (
    <div className={S.localParticipant}>
      <RoundTimer />
      {localTracks.map((track, index) => (
        <div
          key={`${track.participant.sid}-${index}`}
          className={`${S.participantOverlay} ${activeParticipantSid === track.participant.sid ? S.active : ""}`}
          onClick={isLocalOverlay ? (e) => checkClickHandle(e, track.participant, index) : undefined}
        >
          <ParticipantTile
            trackRef={track}
            disableSpeakingIndicator={true}
            className={isLocalOverlay ? S.localCam : undefined}
          />

          <div className={`${S.imageOverlay} ${isReady ? S.active : ""}`}>
            <Image src={CamCheck} alt={track.participant.sid} />
          </div>
        </div>
      ))}
      <GameStartButton />
    </div>
  );
};

export default LocalParticipant;
