import { Participants, RemoteReadyStates } from "@/types";
import { ParticipantTile, TrackLoop, TrackRefContext, useLocalParticipant } from "@livekit/components-react";
import React, { useEffect, useState } from "react";
import S from "@/style/livekit/livekit.module.css";
import Image from "next/image";
import { useActivePlayer, useIsLocalOverlay, useIsRemoteOverlay } from "@/store/overlay-store";
import { useJobImageState } from "@/store/image-store";
import { socket } from "@/utils/socket/socket";

const RemoteParticipant: React.FC<Participants> = ({ tracks, checkClickHandle }) => {
  const { localParticipant } = useLocalParticipant();
  const PlayerId = useActivePlayer();
  const isRemoteOverlay = useIsRemoteOverlay();
  const imageState = useJobImageState();

  const [remoteReadyStates, setRemoteReadyStates] = useState<RemoteReadyStates>({});

  const cameraTracks = tracks.filter((track) => track.source === "camera");
  const remoteTracks = cameraTracks.filter((track) => track.participant.sid !== localParticipant.sid);

  useEffect(() => {
    const participantReady = (userId: string, isReady: boolean) => {
      setRemoteReadyStates((prev) => ({ ...prev, [userId]: isReady }));
    };

    socket.on("updateUserReady", participantReady);

    return () => {
      socket.off("updateUserReady");
    };
  }, []);

  return (
    // 원격 사용자들의 camera 및 클릭 Event 제어
    <div className={S.remoteParticipant}>
      <TrackLoop tracks={remoteTracks}>
        <TrackRefContext.Consumer>
          {(track) => (
            <div
              className={`${S.remoteParticipantOverlay} ${PlayerId === track!.participant.identity ? S.active : ""}`}
              onClick={isRemoteOverlay ? (e) => checkClickHandle(e, track!.participant.identity) : undefined}
            >
              <ParticipantTile
                disableSpeakingIndicator={true}
                className={`${S.remoteCam} ${isRemoteOverlay ? "cursor-pointer" : ""}`}
              />
              <div className={`${S.remoteOverlay} ${remoteReadyStates[track!.participant.identity] ? S.active : ""}`}>
                <Image src={imageState!} alt={track!.participant.identity} />
              </div>
            </div>
          )}
        </TrackRefContext.Consumer>
      </TrackLoop>
    </div>
  );
};

export default RemoteParticipant;
