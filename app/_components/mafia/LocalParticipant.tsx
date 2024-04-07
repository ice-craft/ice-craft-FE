import useVideoStore from "@/app/_store/video-store";
import { Participants } from "@/app/_types";
import { ParticipantTile, useLocalParticipant } from "@livekit/components-react";
import React from "react";
import S from "@/app/_style/livekit/livekit.module.css";
import useOverlayStore from "@/app/_store/overlay-store";
import CamCheck from "@/public/images/cam_check.png";
import Image from "next/image";

const LocalParticipant: React.FC<Participants> = ({ tracks, checkClickHandle }) => {
  const { localParticipant } = useLocalParticipant();
  // const { tracks } = useVideoStore();
  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)!;

  return (
    <div className={S.localParticipant}>
      <h2>05 : 00</h2>
      {localTracks.map((track) => (
        <div className={S.participantOverlay} onClick={(e) => checkClickHandle(e, track.participant.sid)}>
          <ParticipantTile key={track.participant.sid} trackRef={track} />
          <Image src={CamCheck} alt={track.participant.sid} />
        </div>
      ))}
      <button>START</button>
    </div>
  );
};

export default LocalParticipant;
