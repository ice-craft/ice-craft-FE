import { useInSelect, useOverLayActions } from "@/store/overlay-store";
import { useRoleModalElement } from "@/store/show-modal-store";
import getPlayerJob from "@/utils/mafiaSocket/getPlayerJob";
import { LocalParticipant } from "livekit-client";
import { useEffect } from "react";

const useSelectSocket = ({ localParticipant }: { localParticipant: LocalParticipant }) => {
  const inSelect = useInSelect();
  const role = useRoleModalElement();
  const { setIsOverlay, setIsRemoteOverlay } = useOverLayActions();

  // NOTE - 투표, 직업 시간별 캠 클릭 활성화
  useEffect(() => {
    // //NOTE - 특정 시간이 아닐 경우
    if (inSelect === "") {
      console.log("필터링");
      return;
    }

    //NOTE - 해당 player의 직업
    const localJob = getPlayerJob(role, localParticipant.identity);

    //NOTE - 투표 시간이면서, 모든 player 캠 클릭 이벤트 활성화
    if (inSelect.includes("vote")) {
      console.log("투표 중입니다.");
      setIsOverlay(true);
    }
    //NOTE - 마피아 시간이면서, 마피아인 player만 캠 클릭 이벤트 활성화
    if (inSelect.includes("mafia") && localJob === "mafia") {
      console.log("마피아 시간입니다.");
      setIsRemoteOverlay(true);
    }
    //NOTE - 의사 시간이면서, 의사인 player만 캠 클릭 이벤트 활성화
    if (inSelect.includes("doctor") && localJob === "doctor") {
      console.log("의사 시간입니다.");
      setIsOverlay(true);
    }
    //NOTE - 경찰 시간이면서, 경찰인 player만 캠 클릭 이벤트 활성화
    if (inSelect.includes("police") && localJob === "police") {
      console.log("경찰 시간입니다.");
      setIsRemoteOverlay(true);
    }
  }, [inSelect]);
};

export default useSelectSocket;
