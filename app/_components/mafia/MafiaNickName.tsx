import { ParticipantLoop, ParticipantName, useRemoteParticipants } from "@livekit/components-react";
import React from "react";

const MafiaNickName = () => {
  const remoteParticipants = useRemoteParticipants();
  //NOTE - 본인이 마피아시 같은 팀 마피아 닉네임 보이게 출력하는 로직
  return (
    <>
      <ParticipantLoop participants={remoteParticipants}>
        <ParticipantName />
      </ParticipantLoop>
    </>
  );
};

export default MafiaNickName;
