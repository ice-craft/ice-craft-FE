import CamCheck from "@/assets/images/cam_check.svg";
import useConnectStore from "@/store/connect-store";
import useOverlayStore from "@/store/overlay-store";
import { useReadyStore } from "@/store/toggle-store";
import S from "@/style/livekit/livekit.module.css";
import { Participants } from "@/types";
import { allMediaSetting } from "@/utils/participantCamSettings/camSetting";
import { socket } from "@/utils/socket/socket";
import { ParticipantTile, useLocalParticipant } from "@livekit/components-react";
import Image from "next/image";
import React, { useEffect } from "react";

const LocalParticipant: React.FC<Participants> = ({ tracks, checkClickHandle }) => {
  const { isReady, setIsReady } = useReadyStore();
  const { localParticipant } = useLocalParticipant();
  const { activeParticipantSid, isOverlay } = useOverlayStore();
  const { roomId } = useConnectStore();

  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)!;

  const startGameHandler = async () => {
    allMediaSetting(tracks, false);
    setIsReady(!isReady);
    socket.emit("setReady", {
      userId: localParticipant.sid,
      roomId,
      isReady: !isReady
    });
  };

  useEffect(() => {
    socket.on("setReady", (message) => {
      console.log(message);
    });

    return () => {
      socket.off("setReady");
    };
  }, []);

  return (
    <div className={S.localParticipant}>
      <h2>00 : 00</h2>
      {localTracks.map((track, index) => (
        <div
          key={`${track.participant.sid}-${index}`}
          className={`${S.participantOverlay} ${activeParticipantSid === track.participant.sid ? S.active : ""}`}
          onClick={isOverlay ? (e) => checkClickHandle(e, track.participant.sid, index) : undefined}
        >
          <ParticipantTile trackRef={track} className={isOverlay ? S.localCam : undefined} />

          <div className={S.imageOverlay}>
            <Image src={CamCheck} alt={track.participant.sid} />
          </div>
        </div>
      ))}
      <button style={{ backgroundColor: isReady ? "#5c5bad" : "#bfbfbf" }} onClick={startGameHandler}>
        {isReady ? "취소" : "Ready"}
      </button>
    </div>
  );
};

export default LocalParticipant;
