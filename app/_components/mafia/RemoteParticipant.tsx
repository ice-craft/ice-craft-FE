import { Participants } from "@/app/_types";
import { ParticipantTile, useLocalParticipant } from "@livekit/components-react";
import React from "react";
import S from "@/app/_style/livekit/livekit.module.css";

const RemoteParticipant: React.FC<Participants> = ({ tracks }) => {
  const { localParticipant } = useLocalParticipant();
  const remoteTracks = tracks.filter((track) => track.participant.sid !== localParticipant.sid);

  return (
    <div className={S.remoteParticipant}>
      {remoteTracks.map((track) => (
        <ParticipantTile key={track.participant.sid} trackRef={track} className={S.remoteCam} />
      ))}
    </div>
  );
};

export default RemoteParticipant;
