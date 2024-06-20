import React from "react";
import { useJobImageAction } from "@/store/image-store";
import { useInSelect, useOverLayActions } from "@/store/overlay-store";
import { useRoleModalElement } from "@/store/show-modal-store";
import { socket } from "@/utils/socket/socket";
import getPlayerJob from "@/utils/mafiaSocket/getPlayerJob";

const useClickHandler = () => {
  const { setActiveParticipant, setIsOverlay } = useOverLayActions();

  const joinClickHandler = (event: React.MouseEvent<HTMLElement>, playerId: string) => {
    event.stopPropagation();
    setIsOverlay(false); // : 클릭 이벤트를 한 번만 수행
    setActiveParticipant(playerId); // : 캠 클릭시 클릭한 위치에 이미지 띄우기

    return { joinClickHandler };
  };
};
export default useClickHandler;
