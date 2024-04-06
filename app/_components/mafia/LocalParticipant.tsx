import useVideoStore from "@/app/_store/video-store";
import { Participants } from "@/app/_types";
import { ParticipantTile, useLocalParticipant } from "@livekit/components-react";
import React from "react";
import S from "@/app/_style/livekit/livekit.module.css";

const LocalParticipant: React.FC<Participants> = ({ tracks }) => {
  const { localParticipant } = useLocalParticipant();
  // const { tracks } = useVideoStore();

  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)!;

  return (
    <div className={S.localParticipant}>
      <h2>05 : 00</h2>
      {localTracks.map((track) => (
        <ParticipantTile key={track.participant.sid} trackRef={track} />
      ))}
      <button>START</button>
    </div>
  );
};

export default LocalParticipant;
