import { useInSelect, useOverLayActions } from "@/store/overlay-store";
import { useRoleModalElement } from "@/store/show-modal-store";
import { useLocalParticipant } from "@livekit/components-react";
import { useEffect, useRef } from "react";

const usePlayerJob = () => {
  const localJob = useRef("");
  const role = useRoleModalElement();
  const { localParticipant } = useLocalParticipant();

  // const { setIsOverlay, setIsRemoteOverlay } = useOverLayActions();
  // const message = useInSelect();

  useEffect(() => {
    // NOTE - role, message가 존재하지 않을 시
    if (!role) return;

    //NOTE - role 구조: {jobName: string, userList: []}
    const jobNameList = Object.keys(role);
    const localPlayerId = localParticipant.identity;

    //NOTE - 해당 player의 직업

    jobNameList.find((job) => {
      //NOTE - 직업별 해당 userId[]
      const jobPlayerList = role[job];

      // NOTE - 직업이 존재하지 않을 경우(경찰, 의사)
      if (!jobPlayerList) return;

      const LocalPlayerJob = jobPlayerList.find((jobId: string) => localPlayerId === jobId);

      if (LocalPlayerJob) {
        return (localJob.current = job);
      }
    });

    // //NOTE - 투표 시간이면서, 모든 player 캠 클릭 이벤트 활성화
    // if (message.includes("vote")) {
    //   setIsOverlay(true);
    // }
    // //NOTE - 마피아 시간이면서, 마피아인 player만 캠 클릭 이벤트 활성화
    // if (message.includes("mafia") && localJob.current === "mafia") {
    //   setIsRemoteOverlay(true);
    // }
    // //NOTE - 의사 시간이면서, 의사인 player만 캠 클릭 이벤트 활성화
    // if (message.includes("doctor") && localJob.current === "doctor") {
    //   setIsOverlay(true);
    // }
    // //NOTE - 경찰 시간이면서, 경찰인 player만 캠 클릭 이벤트 활성화
    // if (message.includes("police") && localJob.current === "police") {
    //   setIsRemoteOverlay(true);
    // }
  }, [role]);

  // remoteJob을 반환
  return localJob.current;
};

export default usePlayerJob;
