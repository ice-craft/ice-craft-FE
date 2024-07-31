import { useDiedPlayer } from "@/store/game-store";
import { useInSelect, useOverLayActions } from "@/store/overlay-store";
import { useRoleModalElement } from "@/store/show-modal-store";
import getPlayerJob from "@/utils/mafia/getPlayerJob";
import { LocalParticipant } from "livekit-client";
import { useEffect } from "react";

const useSelectSocket = ({ localParticipant }: { localParticipant: LocalParticipant }) => {
  const inSelect = useInSelect();
  const role = useRoleModalElement();
  const diedPlayerId = useDiedPlayer();
  const { setIsOverlay, setIsRemoteOverlay } = useOverLayActions();

  // NOTE - 투표, 직업 시간별 캠 클릭 활성화
  useEffect(() => {
    const localPlayerId = localParticipant.identity;
    const isDiedPlayer = diedPlayerId.find((playerId) => localPlayerId === playerId);

    // //NOTE - 특정 시간이 아닐 경우 및 죽은 player일 경우
    if (inSelect === "" || isDiedPlayer) {
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
  }, [inSelect]);
};

export default useSelectSocket;
