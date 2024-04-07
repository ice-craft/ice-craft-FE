import useCountUp from "@/app/_hooks/useCountUp";
import { useCountStore } from "@/app/_store/count-store";
import { useModalStore } from "@/app/_store/modal-store";
import useOverlayStore from "@/app/_store/overlay-store";
import S from "@/app/_style/livekit/livekit.module.css";
import { Participants } from "@/app/_types";
import { allCamOff } from "@/app/_utils/participantCamSettings/camSetting";
import CamCheck from "@/public/images/cam_check.png";
import { ParticipantTile, useLocalParticipant } from "@livekit/components-react";
import Image from "next/image";
import React from "react";

const LocalParticipant: React.FC<Participants> = ({ tracks, checkClickHandle }) => {
  const { setIsModal } = useModalStore();
  const { setIsStart } = useCountStore();
  const timer = useCountUp();
  const { localParticipant } = useLocalParticipant();
  const { activeParticipantSid } = useOverlayStore();
  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)!;

  const startGameHandler = () => {
    allCamOff(tracks);
    setIsModal(true);
    setIsStart(true);
  };

  return (
    <div className={S.localParticipant}>
      <h2>{timer}</h2>
      {localTracks.map((track, index) => (
        <div
          key={`${track.participant.sid}-${index}`}
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
