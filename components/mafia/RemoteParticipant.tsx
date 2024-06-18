import { useIsStart } from "@/store/game-store";
import S from "@/style/livekit/livekit.module.css";
import { Participants } from "@/types";
import { TrackLoop, TrackReferenceOrPlaceholder, useLocalParticipant } from "@livekit/components-react";
import React, { useState } from "react";
import RemoteParticipantTile from "./RemoteParticipantTile";

const RemoteParticipant = ({ tracks }: Participants) => {
  const isStart = useIsStart();
  const [remoteTracks, setRemoteTracks] = useState<TrackReferenceOrPlaceholder[]>([]);
  const { localParticipant } = useLocalParticipant();

  const filteredTracks = tracks.filter(
    (track) => track.source === "camera" && track.participant.sid !== localParticipant.sid
  );

  //NOTE -  게임 시작 전까지 track에 대한 정보를 state 값에 저장
  // useEffect(() => {
  //   // 게임 시작 이후부터는 state값을 유지
  //   if (isStart) {
  //     return;
  //   }

  //   const filteredTracks = tracks.filter(
  //     (track) => track.source === "camera" && track.participant.sid !== localParticipant.sid
  //   );
  //   setRemoteTracks(filteredTracks);
  // }, [tracks, isStart]);

  return (
    <ul className={S.remoteParticipant}>
      <TrackLoop tracks={filteredTracks}>
        <RemoteParticipantTile />
      </TrackLoop>
    </ul>
  );
};

export default RemoteParticipant;
