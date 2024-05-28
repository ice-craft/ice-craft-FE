import React, { useEffect, useState } from "react";
import S from "@/style/livekit/livekit.module.css";
import Image from "next/image";
import CitizensToolTipIcon from "@/assets/images/citizens_ToolTip_Icon.svg";
import CitizensToolTipText from "@/assets/images/citizens_ToolTip_text.svg";
import MafiaToolTipIcon from "@/assets/images/mafia_ToolTip_Icon.svg";
import MafiaToolTipText from "@/assets/images/mafia_ToolTip_text.svg";
import DoctorToolTipIcon from "@/assets/images/doctor_ToolTip_Icon.svg";
import DoctorToolTipText from "@/assets/images/doctor_ToolTip_text.svg";
import PoliceToolTipIcon from "@/assets/images/police_ToolTip_Icon.svg";
import PoliceToolTipText from "@/assets/images/police_ToolTip_text.svg";
import { Role } from "@/types/index";
import { socket } from "@/utils/socket/socket";
import useConnectStore from "@/store/connect-store";
import { useRoleModalElement } from "@/store/show-modal-store";
import { useLocalParticipant } from "@livekit/components-react";

const toolTipInfo: { [key: string]: { icon: string; text: string } } = {
  시민: {
    icon: CitizensToolTipIcon,
    text: CitizensToolTipText
  },
  마피아: {
    icon: MafiaToolTipIcon,
    text: MafiaToolTipText
  },
  의사: {
    icon: DoctorToolTipIcon,
    text: DoctorToolTipText
  },
  경찰: {
    icon: PoliceToolTipIcon,
    text: PoliceToolTipText
  }
};

const MafiaToolTip = () => {
  // const [role, setRole] = useState<Role | null>(null);
  const role = useRoleModalElement();
  const { localParticipant } = useLocalParticipant();

  //NOTE - role 구조: {jobName: string, userList: []}
  const jobNameList = Object.keys(role);

  //NOTE - 해당 player의 직업
  const playerJob = jobNameList.find((job) => {
    //NOTE - 직업별 해당 userId[]
    const jobPlayerList = role[job];

    //NOTE - 직업이 존재하지 않을 경우
    if (!jobPlayerList) {
      return;
    }

    const isPlayerJob = jobPlayerList.find((userId: string) => localParticipant.identity === userId);

    if (isPlayerJob) {
      return job;
    }
  });

  if (!role || !playerJob) {
    return null;
  }

  const currentRoleInfo = toolTipInfo[playerJob];

  return (
    <ul className={S.toolTipWrap}>
      <li>
        <h3>
          <Image src={currentRoleInfo.icon} alt={playerJob} />
        </h3>
        <p>
          <Image src={currentRoleInfo.text} alt={playerJob} />
        </p>
      </li>
    </ul>
  );
};

export default MafiaToolTip;
