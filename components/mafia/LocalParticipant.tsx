import CamCheck from "@/assets/images/cam_check.svg";
import GroupMafiaModal from "@/components/modal/GroupMafiaModal";
import useOverlayStore from "@/store/overlay-store";
import useShowModalStore from "@/store/showModal-store";
import { useReadyStore } from "@/store/toggle-store";
import S from "@/style/livekit/livekit.module.css";
import { Participants } from "@/types";
import { ParticipantTile, useLocalParticipant } from "@livekit/components-react";
import Image from "next/image";
import React from "react";
import GameStartButton from "./GameStartButton";

const LocalParticipant: React.FC<Participants> = ({ tracks, checkClickHandle }) => {
  const { localParticipant } = useLocalParticipant();
  const { activeParticipantSid, isLocalOverlay } = useOverlayStore();
  const { isReady } = useReadyStore();
  const { isOpen } = useShowModalStore();

  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)!;

  return (
    <div className={S.localParticipant}>
      <h2>00 : 00</h2>
      {localTracks.map((track, index) => (
        <div
          key={`${track.participant.sid}-${index}`}
          className={`${S.participantOverlay} ${activeParticipantSid === track.participant.sid ? S.active : ""}`}
          onClick={isLocalOverlay ? (e) => checkClickHandle(e, track.participant, index) : undefined}
        >
          <ParticipantTile
            trackRef={track}
            disableSpeakingIndicator={true}
            className={isLocalOverlay ? S.localCam : undefined}
          />

          <div className={`${S.imageOverlay} ${isReady ? S.active : ""}`}>
            <Image src={CamCheck} alt={track.participant.sid} />
          </div>
        </div>
      ))}
      <GameStartButton />
      {/* isOpen: 모달창 띄우기 */}
      {isOpen && <GroupMafiaModal />}
    </div>
  );
};

export default LocalParticipant;
