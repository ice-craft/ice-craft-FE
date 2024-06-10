import { useDiedPlayer } from "@/store/game-store";
import { useInSelect, useOverLayActions } from "@/store/overlay-store";
import { useRoleModalElement } from "@/store/show-modal-store";
import { Role } from "@/types";
import getPlayerJob from "@/utils/mafiaSocket/getPlayerJob";
import { useLocalParticipant } from "@livekit/components-react";
import { useEffect } from "react";

const useSelectSocket = () => {
  const inSelect = useInSelect();
  const role = useRoleModalElement();

  const diedPlayerId = useDiedPlayer();
  const { setIsOverlay, setIsRemoteOverlay } = useOverLayActions();

  const { localParticipant } = useLocalParticipant();
  const localPlayerId = localParticipant.identity;

  //NOTE - 투표 시간, 직업별 캠 클릭 활성화
  useEffect(() => {
    const isDiedPlayer = diedPlayerId.find((playerId) => localPlayerId === playerId);

    //NOTE - 죽은 player일 경우 or 특정 시간이 아닐 경우 캠클릭 비활성화
    if (isDiedPlayer || !inSelect) {
      setIsOverlay(false);
      return;
    }

    //NOTE - 해당 player의 직업
    const localJob = getPlayerJob(role, localPlayerId);

    //NOTE - 투표 시간이면서, 모든 player 캠 클릭 이벤트 활성화
    if (inSelect.includes("vote")) {
      console.log("투표 중입니다!");
      setIsOverlay(true);
    }
    //NOTE - 마피아 시간이면서, 마피아인 player만 캠 클릭 이벤트 활성화
    if (inSelect.includes("mafia") && localJob === "mafia") {
      console.log("마피아 시간입니다.!");
      setIsRemoteOverlay(true);
    }
    //NOTE - 의사 시간이면서, 의사인 player만 캠 클릭 이벤트 활성화
    if (inSelect.includes("doctor") && localJob === "doctor") {
      console.log("의사 시간입니다.!");
      setIsOverlay(true);
    }
    //NOTE - 경찰 시간이면서, 경찰인 player만 캠 클릭 이벤트 활성화
    if (inSelect.includes("police") && localJob === "police") {
      console.log("경찰 시간입니다.!");
      setIsRemoteOverlay(true);
    }
  }, [inSelect, diedPlayerId]);
};

export default useSelectSocket;
