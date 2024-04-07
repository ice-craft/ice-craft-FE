import { useModalStore } from "@/app/_store/modal-store";
import S from "@/app/_style/livekit/livekit.module.css";
import { Participants } from "@/app/_types";
import { allCamOff } from "@/app/_utils/participantCamSettings/camSetting";
import CamCheck from "@/public/images/cam_check.png";
import { ParticipantTile, useLocalParticipant } from "@livekit/components-react";
import Image from "next/image";
import React from "react";

const LocalParticipant: React.FC<Participants> = ({ tracks, checkClickHandle }) => {
  const { setIsModal } = useModalStore();
  const { localParticipant } = useLocalParticipant();

  const startGameHandler = () => {
    allCamOff(tracks);
    setIsModal(true);
  };

  const localTracks = tracks.find((track) => track.participant.sid === localParticipant.sid);

  if (!localTracks) {
    return;
  }

  return (
    <div className={S.localParticipant}>
      <h2>시간</h2>
      <div className={S.participantOverlay} onClick={(e) => checkClickHandle(e, localTracks.participant.sid)}>
        <ParticipantTile trackRef={localTracks} className={S.localCam} />
        <div className={S.imageOverlay}>
          <Image src={CamCheck} alt={localTracks.participant.sid} />
        </div>
      </div>

      <button onClick={startGameHandler}>START</button>
    </div>
  );
};

export default LocalParticipant;
