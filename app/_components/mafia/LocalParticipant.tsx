import React from "react";
import { Participants } from "@/app/_types";
import { ParticipantTile, useLocalParticipant } from "@livekit/components-react";
import S from "@/app/_style/livekit/livekit.module.css";
import { allCamOff } from "@/app/_utils/participantCamSettings/camSetting";
import CamCheck from "@/public/images/cam_check.png";
import Image from "next/image";
import { useModalStore } from "@/app/_store/modal-store";
import useOverlayStore from "@/app/_store/overlay-store";

const LocalParticipant: React.FC<Participants> = ({ tracks, checkClickHandle }) => {
  const { setIsModal } = useModalStore();
  const { localParticipant } = useLocalParticipant();
  const { activeParticipantSid } = useOverlayStore();
  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)!;

  const startGameHandler = () => {
    allCamOff(tracks);
    setIsModal(true);
  };

  return (
    <div className={S.localParticipant}>
      <h2>05 : 00</h2>
      {localTracks.map((track, index) => (
        <div
          key={track.participant.sid}
          className={`${S.participantOverlay} ${activeParticipantSid === track.participant.sid ? S.active : ""}`}
          onClick={(e) => checkClickHandle(e, track.participant.sid, index)}
        >
          <ParticipantTile trackRef={track} className={S.localCam} />
          <div className={S.imageOverlay}>
            <Image src={CamCheck} alt={track.participant.sid} />
          </div>
        </div>
      ))}
      <button onClick={startGameHandler}>START</button>
    </div>
  );
};

export default LocalParticipant;
