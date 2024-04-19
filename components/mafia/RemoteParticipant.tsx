import { ParticipantReadyData, Participants, RemoteReadyStates } from "@/types";
import { ParticipantTile, useLocalParticipant } from "@livekit/components-react";
import React, { useEffect, useState } from "react";
import S from "@/style/livekit/livekit.module.css";
import Image from "next/image";
import useOverlayStore from "@/store/overlay-store";
import { useCamClickImageState } from "@/store/image-store";
import { socket } from "@/utils/socket/socket";

const RemoteParticipant: React.FC<Participants> = ({ tracks, checkClickHandle }) => {
  const { localParticipant } = useLocalParticipant();
  const { activeParticipantSid, isOverlay } = useOverlayStore();
  const { imageState } = useCamClickImageState();

  const [remoteReadyStates, setRemoteReadyStates] = useState<RemoteReadyStates>({});

  const cameraTracks = tracks.filter((track) => track.source === "camera");
  const remoteTracks = cameraTracks.filter((track) => track.participant.sid !== localParticipant.sid);

  useEffect(() => {
    const participantReady = (data: ParticipantReadyData) => {
      const { userId, isReady } = data;
      setRemoteReadyStates((prev) => ({ ...prev, [userId]: isReady }));
    };

    socket.on("participantReady", participantReady);

    return () => {
      socket.off("participantReady", participantReady);
    };
  }, []);

  return (
    <div className={S.remoteParticipant}>
      {remoteTracks.map((track, index) => (
        <div
          key={`${track.participant.sid}-${index}`}
          className={`${S.remoteParticipantOverlay} ${activeParticipantSid === track.participant.sid ? S.active : ""}`}
          onClick={isOverlay ? (e) => checkClickHandle(e, track.participant.sid, index) : undefined}
        >
          <ParticipantTile trackRef={track} className={`${S.remoteCam} ${isOverlay ? "cursor-pointer" : ""}`} />
          <div className={`${S.remoteOverlay} ${remoteReadyStates[track.participant.sid] ? S.active : ""}`}>
            <Image src={imageState!} alt={track.participant.sid} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RemoteParticipant;
