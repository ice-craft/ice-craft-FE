import { Participants } from "@/app/_types";
import { ParticipantTile, useGridLayout, useLocalParticipant } from "@livekit/components-react";
import React from "react";

const RemoteParticipant: React.FC<Participants> = ({ tracks }) => {
  const { localParticipant } = useLocalParticipant();
  const remoteTracks = tracks.filter((track) => track.participant.sid !== localParticipant.sid);

  return (
    <>
      {remoteTracks.map((track) => (
        <ParticipantTile key={track.participant.sid} trackRef={track} />
      ))}
    </>
  );
};

export default RemoteParticipant;
