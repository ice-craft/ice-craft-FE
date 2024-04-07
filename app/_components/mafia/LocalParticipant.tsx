import { allCamOff } from "@/app/_utils/participantCamSettings/camSetting";
import { useCountDown } from "@/app/_hooks/useCountDown";
import { useModalStore } from "@/app/_store/modal-store";
import S from "@/app/_style/livekit/livekit.module.css";
import { Participants } from "@/app/_types";
import CamCheck from "@/public/images/cam_check.png";
import { ParticipantTile, useLocalParticipant } from "@livekit/components-react";
import Image from "next/image";
import React from "react";

const LocalParticipant: React.FC<Participants> = ({ tracks, checkClickHandle }) => {
  const { setIsModal } = useModalStore();
  let initialTime = 0;
  const timer = useCountDown(initialTime);
  const { localParticipant } = useLocalParticipant();

  const startGameHandler = () => {
    allCamOff(tracks);
    setIsModal(true);
  };

  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)!;

  return (
    <div className={S.localParticipant}>
      {timer > 0 ? <h2>{timer}</h2> : null}
      {localTracks.map((track) => (
        <div
          key={track.participant.sid}
          className={S.participantOverlay}
          onClick={(e) => checkClickHandle(e, track.participant.sid)}
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
