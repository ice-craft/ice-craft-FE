import { Participants } from "@/app/_types";
import { ParticipantTile, useLocalParticipant } from "@livekit/components-react";
import React from "react";
import S from "@/app/_style/livekit/livekit.module.css";
import CamCheck from "@/public/images/cam_check.png";
import Image from "next/image";

const RemoteParticipant: React.FC<Participants> = ({ tracks, checkClickHandle }) => {
  const { localParticipant } = useLocalParticipant();
  const remoteTracks = tracks.filter((track) => track.participant.sid !== localParticipant.sid);

  return (
    <div className={S.remoteParticipant}>
      {remoteTracks.map((track) => (
        <div
          key={track.participant.sid}
          className={S.remoteParticipantOverlay}
          onClick={(e) => checkClickHandle(e, track.participant.sid)}
        >
          <ParticipantTile trackRef={track} className={S.remoteCam} />
          <div className={S.remoteOverlay}>
            <Image src={CamCheck} alt={track.participant.sid} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RemoteParticipant;
