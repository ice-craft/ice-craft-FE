import S from "@/style/livekit/livekit.module.css";
import { Participants } from "@/types";
import { TrackLoop, useLocalParticipant } from "@livekit/components-react";
import React from "react";
import RemoteParticipantTile from "./RemoteParticipantTile";

const RemoteParticipant: React.FC<Participants> = ({ tracks }) => {
  const { localParticipant } = useLocalParticipant();

  const filteredTracks = tracks.filter(
    (track) => track.source === "camera" && track.participant.sid !== localParticipant.sid
  );

  return (
    <ul className={S.remoteParticipant}>
      <TrackLoop tracks={filteredTracks}>
        <RemoteParticipantTile />
      </TrackLoop>
    </ul>
  );
};

export default RemoteParticipant;
