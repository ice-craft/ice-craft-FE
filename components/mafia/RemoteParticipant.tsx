import { Participants } from "@/types";
import { ParticipantTile, useLocalParticipant } from "@livekit/components-react";
import React from "react";
import S from "@/style/livekit/livekit.module.css";
import CamCheck from "@/app/assets/images/cam_check.png";
import Image from "next/image";
import useOverlayStore from "@/store/overlay-store";

const RemoteParticipant: React.FC<Participants> = ({ tracks, checkClickHandle }) => {
  const { localParticipant } = useLocalParticipant();
  const { activeParticipantSid } = useOverlayStore();

  const cameraTracks = tracks.filter((track) => track.source === "camera");
  const remoteTracks = cameraTracks.filter((track) => track.participant.sid !== localParticipant.sid);

  return (
    <div className={S.remoteParticipant}>
      {remoteTracks.map((track, index) => (
        <div
          key={`${track.participant.sid}-${index}`}
          className={`${S.remoteParticipantOverlay} ${activeParticipantSid === track.participant.sid ? S.active : ""}`}
          onClick={(e) => checkClickHandle(e, track.participant.sid, index)}
        >
          <ParticipantTile trackRef={track} className={S.remoteCam} />
          {/* <div className={S.remoteOverlay}>
            <Image src={CamCheck} alt={track.participant.sid} />
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default RemoteParticipant;
