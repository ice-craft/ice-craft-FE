import { useCountDown } from "@/app/_hooks/useCountDown";
import S from "@/app/_style/livekit/livekit.module.css";
import { Participants } from "@/app/_types";
import CamCheck from "@/public/images/cam_check.png";
import { ParticipantTile, useLocalParticipant } from "@livekit/components-react";
import Image from "next/image";
import React from "react";

const LocalParticipant: React.FC<Participants> = ({ tracks, checkClickHandle }) => {
  const { localParticipant } = useLocalParticipant();
  // const timer = useCountDown(60);

  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)!;
  console.log("렌더링");

  return (
    <div className={S.localParticipant}>
      {/* <h2>{timer}</h2> */}
      {localTracks.map((track) => (
        <div
          key={track.participant.sid}
          className={S.participantOverlay}
          onClick={(e) => checkClickHandle(e, track.participant.sid)}
        >
          <ParticipantTile trackRef={track} className={S.localCam} />
          <div className={S.imageOverlay}>
            <Image src={CamCheck} alt={track.participant.sid} />
          </div>
        </div>
      ))}
      <button>START</button>
    </div>
  );
};

export default LocalParticipant;
