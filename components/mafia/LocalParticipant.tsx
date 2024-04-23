import CamCheck from "@/assets/images/cam_check.svg";
import useConnectStore from "@/store/connect-store";
import useOverlayStore from "@/store/overlay-store";
import { useModalStore } from "@/store/toggle-store";
import S from "@/style/livekit/livekit.module.css";
import { Participants } from "@/types";
import { socket } from "@/utils/socket/socket";
import { ParticipantTile, useLocalParticipant } from "@livekit/components-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GroupMafiaModal from "./GroupMafiaModal";

const LocalParticipant: React.FC<Participants> = ({ tracks, checkClickHandle }) => {
  const { localParticipant } = useLocalParticipant();
  const { activeParticipantSid, isLocalOverlay } = useOverlayStore();
  const { roomId, userId } = useConnectStore();
  const { isModal, setIsModal } = useModalStore();
  const [isReady, setIsReady] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)!;

  const startGameHandler = () => {
    const newIsReady = !isReady;
    setIsReady(newIsReady);

    socket.emit("setReady", userId, newIsReady, roomId);
  };

  useEffect(() => {
    socket.on("setReady", (message) => {
      console.log("게임 준비", message);
      setModalMessage(message);
      setIsModal(true);
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
          onClick={isLocalOverlay ? (e) => checkClickHandle(e, track.participant, index) : undefined}
        >
          <ParticipantTile trackRef={track} className={isLocalOverlay ? S.localCam : undefined} />

          <div className={`${S.imageOverlay} ${isReady ? S.active : ""}`}>
            <Image src={CamCheck} alt={track.participant.sid} />
          </div>
        </div>
      ))}
      <button style={{ backgroundColor: isReady ? "#5c5bad" : "#bfbfbf" }} onClick={startGameHandler}>
        {isReady ? "취소" : "게임 준비"}
      </button>
      {isModal && <GroupMafiaModal />}
    </div>
  );
};

export default LocalParticipant;
