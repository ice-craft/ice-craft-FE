import { useIsStart } from "@/store/game-store";
import { useJobImageState } from "@/store/image-store";
import { useActivePlayer, useIsRemoteOverlay } from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import { Participants, RemoteReadyStates } from "@/types";
import { socket } from "@/utils/socket/socket";
import {
  ParticipantTile,
  TrackLoop,
  TrackRefContext,
  TrackReferenceOrPlaceholder,
  useLocalParticipant
} from "@livekit/components-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const RemoteParticipant: React.FC<Participants> = ({ tracks, checkClickHandle }) => {
  const [remoteReadyStates, setRemoteReadyStates] = useState<RemoteReadyStates>({});
  const [remoteTracks, setRemoteTracks] = useState<TrackReferenceOrPlaceholder[]>([]);
  const { localParticipant } = useLocalParticipant();
  const isRemoteOverlay = useIsRemoteOverlay();
  const imageState = useJobImageState();
  const PlayerId = useActivePlayer();
  const isStart = useIsStart();

  //NOTE -  게임 시작 전까지 track에 대한 정보를 state 값에 저장
  useEffect(() => {
    // 게임 시작 이후부터는 state값을 유지
    if (isStart) {
      return;
    }

    const filteredTracks = tracks.filter(
      (track) => track.source === "camera" && track.participant.sid !== localParticipant.sid
    );
    setRemoteTracks(filteredTracks);
  }, [tracks, isStart]);

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
