import React, { useEffect, useState } from "react";
import useSocketOn from "./useSocketOn";
import { useRoleModalElement } from "@/store/show-modal-store";
import { useInSelect, useOverLayActions } from "@/store/overlay-store";
import getPlayerJob from "@/utils/mafiaSocket/getPlayerJob";
import { useLocalParticipant } from "@livekit/components-react";

//캠 클릭 이벤트 비활성화
const useDiedSocket = () => {
  const inSelect = useInSelect();
  const role = useRoleModalElement();
  const { setIsOverlay, setIsRemoteOverlay } = useOverLayActions();
  const [diedPlayer, setDiedPlayer] = useState("");
  const { localParticipant } = useLocalParticipant();
  const localPlayerId = localParticipant.identity;

  const sockets = {
    diedPlayer: (playerId: string) => {
      setDiedPlayer(playerId);
      console.log("죽은 player", playerId);
    }
  };

  // NOTE - socket On, Off 담당
  useSocketOn(sockets);

  //NOTE - 캠 클릭 활성화
  useEffect(() => {
    // NOTE - role, inSelect 존재하지 않을 시
    if (!role || !inSelect) return;

    //NOTE - 죽은 player일 경우 캠클릭 비활성화
    if (localPlayerId === diedPlayer) {
      setIsOverlay(false);
      return;
    }

    //NOTE - 해당 player의 직업
    const localJob = getPlayerJob(role, localPlayerId);

    //NOTE - 투표 시간이면서, 모든 player 캠 클릭 이벤트 활성화
    if (inSelect.includes("vote")) {
      setIsOverlay(true);
    }
    //NOTE - 마피아 시간이면서, 마피아인 player만 캠 클릭 이벤트 활성화
    if (inSelect.includes("mafia") && localJob === "mafia") {
      setIsRemoteOverlay(true);
    }
    //NOTE - 의사 시간이면서, 의사인 player만 캠 클릭 이벤트 활성화
    if (inSelect.includes("doctor") && localJob === "doctor") {
      setIsOverlay(true);
    }
    //NOTE - 경찰 시간이면서, 경찰인 player만 캠 클릭 이벤트 활성화
    if (inSelect.includes("police") && localJob === "police") {
      setIsRemoteOverlay(true);
    }
  }, [inSelect, diedPlayer]);
};

export default useDiedSocket;
