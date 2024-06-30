import CamCheck from "@/assets/images/cam_check.svg";
import Citizen from "@/assets/images/cam_citizen.svg";
import Doctor from "@/assets/images/cam_doctor.svg";
import Mafia from "@/assets/images/cam_mafia.svg";
import { useInSelect, useOverLayActions } from "@/store/overlay-store";
import { useRoleModalElement } from "@/store/show-modal-store";
import getPlayerJob from "@/utils/mafiaSocket/getPlayerJob";
import { socket } from "@/utils/socket/socket";
import React from "react";

const useClickHandler = () => {
  const inSelect = useInSelect();
  const role = useRoleModalElement();

  const { setActiveParticipant, setIsOverlay, setImageState } = useOverLayActions();

  const clickHandler = (event: React.MouseEvent<HTMLElement>, playerId: string) => {
    event.stopPropagation();
    setIsOverlay(false); // : 클릭 이벤트를 한 번만 수행
    setActiveParticipant(playerId); // : 캠 클릭시 클릭한 위치에 이미지 띄우기

    //NOTE - 투표 및 마피아 시간
    if (inSelect.includes("vote")) {
      console.log(inSelect, playerId);
      socket.emit("voteTo", playerId);
      setImageState(CamCheck);
      return;
    }

    if (inSelect.includes("mafia")) {
      console.log(inSelect, playerId);
      socket.emit("voteTo", playerId);
      setImageState(CamCheck);
      return;
    }

    //NOTE - 의사 시간
    if (inSelect.includes("doctor")) {
      console.log(inSelect, playerId);
      socket.emit("selectPlayer", playerId);
      setImageState(CamCheck);
      return;
    }

    //NOTE - 경찰 시간
    if (inSelect.includes("police")) {
      const clickPlayerJob = getPlayerJob(role, playerId);
      console.log(inSelect, playerId);

      if (clickPlayerJob === "mafia") {
        console.log("clickJob", clickPlayerJob);
        setImageState(Mafia);
      }
      if (clickPlayerJob === "doctor") {
        console.log("clickJob", clickPlayerJob);
        setImageState(Doctor);
      }
      if (clickPlayerJob === "citizen") {
        console.log("clickJob", clickPlayerJob);
        setImageState(Citizen);
      }
    }
  };

  return { clickHandler };
};

export default useClickHandler;
