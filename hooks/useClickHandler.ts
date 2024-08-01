import CamCheck from "@/assets/images/cam_check.svg";
import Citizen from "@/assets/images/cam_citizen.svg";
import Doctor from "@/assets/images/cam_doctor.svg";
import Mafia from "@/assets/images/cam_mafia.svg";
import { useInSelect, useOverLayActions } from "@/store/overlay-store";
import { useRoleModalElement } from "@/store/show-modal-store";
import getPlayerJob from "@/utils/mafia/getPlayerJob";
import { socket } from "@/utils/socket/socket";
import React from "react";

const useClickHandler = () => {
  const inSelect = useInSelect();
  const role = useRoleModalElement();

  const { setActiveParticipant, setIsOverlay, setImageState } = useOverLayActions();

  const clickHandler = (event: React.MouseEvent<HTMLElement>, playerId: string) => {
    event.stopPropagation();
    setIsOverlay(false);
    setActiveParticipant(playerId);

    //NOTE - 투표 및 마피아 시간
    if (inSelect.includes("vote") || inSelect.includes("mafia")) {
      socket.emit("voteTo", playerId);
      setImageState(CamCheck);
      return;
    }

    //NOTE - 의사 시간
    if (inSelect.includes("doctor")) {
      socket.emit("selectPlayer", playerId);
      setImageState(CamCheck);
      return;
    }

    //NOTE - 경찰 시간
    if (inSelect.includes("police")) {
      const clickPlayerJob = getPlayerJob(role, playerId);

      if (clickPlayerJob === "mafia") {
        setImageState(Mafia);
      }
      if (clickPlayerJob === "doctor") {
        setImageState(Doctor);
      }
      if (clickPlayerJob === "citizen") {
        setImageState(Citizen);
      }
    }
  };

  return { clickHandler };
};

export default useClickHandler;
