import { useDiedPlayer } from "@/store/game-store";
import { useInSelect, useOverLayActions } from "@/store/overlay-store";
import { useRoleModalElement } from "@/store/show-modal-store";
import { Role } from "@/types";
import getPlayerJob from "@/utils/mafiaSocket/getPlayerJob";
import { useLocalParticipant } from "@livekit/components-react";
import { useEffect } from "react";

const useSelectSocket = () => {
  const inSelect = useInSelect();
  // const role = useRoleModalElement();
  const role: Role = {
    mafia: ["", "adfasdfasfasfdsaf"],
    doctor: [
      "asdfkjhkj32k21123",
      "adhfk23jk1h3k123",
      "ed21e5d9-e3b6-4faf-af38-3a906c7827ae",
      "6ef00822-f847-4e94-9732-61b71c467e68"
    ],
    police: [
      "4446de7f-27bd-46f8-bf2a-b870edb5a950",
      "ed21e5d9-e3b6-4faf-af38-3a906c7827ae",
      "b73d123a-cc89-496b-a786-dc2cab696b21"
    ],
    citizen: ["794d5dc8-cf4c-46e8-b7cc-82a41c537c4c", "53f37d03-9080-479f-bf78-aa5da13c6390"]
  };

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
