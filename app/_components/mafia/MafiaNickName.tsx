import { ParticipantLoop, ParticipantName, useRemoteParticipants } from "@livekit/components-react";
import React from "react";

const MafiaNickName = () => {
  const remoteParticipants = useRemoteParticipants();

  return (
    <>
      <ParticipantLoop participants={remoteParticipants}>
        <ParticipantName />
      </ParticipantLoop>
    </>
  );
};

export default MafiaNickName;
