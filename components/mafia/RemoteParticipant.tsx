import S from "@/style/livekit/livekit.module.css";
import { TrackLoop, useLocalParticipant, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import RemoteParticipantTile from "@/components/mafia/RemoteParticipantTile";

const RemoteParticipant = () => {
  const { localParticipant } = useLocalParticipant();
  const tracks = useTracks([{ source: Track.Source.Camera, withPlaceholder: true }], { onlySubscribed: true });
  const remotesTrack = tracks.filter((track) => track.participant.sid !== localParticipant.sid);

  return (
    <ul className={S.remoteParticipant}>
      <TrackLoop tracks={remotesTrack}>
        <RemoteParticipantTile />
      </TrackLoop>
    </ul>
  );
};

export default RemoteParticipant;
