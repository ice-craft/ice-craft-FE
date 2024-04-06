import useVideoStore from "@/app/_store/video-store";
import { Participants } from "@/app/_types";
import { ParticipantTile, useLocalParticipant } from "@livekit/components-react";
import React from "react";

const LocalParticipant: React.FC<Participants> = ({ tracks }) => {
  const { localParticipant } = useLocalParticipant();
  // const { tracks } = useVideoStore();

  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)!;

  return (
    <>
      {localTracks.map((track) => (
        <ParticipantTile key={track.participant.sid} trackRef={track} />
      ))}
    </>
  );
};

export default LocalParticipant;
