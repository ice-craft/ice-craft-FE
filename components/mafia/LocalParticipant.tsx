import CamCheck from "@/assets/images/cam_check.svg";
import GroupMafiaModal from "@/components/modal/GroupMafiaModal";
import useOverlayStore from "@/store/overlay-store";
import { useReadyStore } from "@/store/toggle-store";
import S from "@/style/livekit/livekit.module.css";
import { Participants } from "@/types";
import { ParticipantTile, useLocalParticipant } from "@livekit/components-react";
import Image from "next/image";
import React, { useState } from "react";
import GameStartButton from "./GameStartButton";
import { useModalIsOpen } from "@/store/show-modal-store";
import useSocketOn from "@/hooks/useSocketOn";
import useSocketOff from "@/hooks/useSocketOff";
import { useCountDown } from "@/hooks/useCountDown";

const LocalParticipant: React.FC<Participants> = ({ tracks, checkClickHandle }) => {
  const { localParticipant } = useLocalParticipant();
  const { activeParticipantSid, isLocalOverlay } = useOverlayStore();
  const [timer, setTimer] = useState(-1);
  const count = useCountDown(timer, 10, 100);
  const { isReady } = useReadyStore();

  console.log("timer", timer);
  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)!;

  const sockets = {
    //NOTE - 마피아 player들끼리 확인하는 시간, 토론시간, 최후의 변론 시간
    timerStatus: (timer: number) => {
      console.log("timer", timer);
      setTimer(timer);
    }
  };

  //NOTE - socket On, Off 담당
  useSocketOn(sockets);
  useSocketOff(sockets);

  console.log("count", count);
  return (
    <div className={S.localParticipant}>
      {count < 0 ? <h2>00 : 00</h2> : <h2>00 : {count}</h2>}
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
    </div>
  );
};

export default LocalParticipant;
