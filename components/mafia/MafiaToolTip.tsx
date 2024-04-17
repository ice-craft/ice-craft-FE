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

const toolTipInfo = {
  citizens: {
    icon: CitizensToolTipIcon,
    text: CitizensToolTipText
  },
  mafia: {
    icon: MafiaToolTipIcon,
    text: MafiaToolTipText
  },
  doctor: {
    icon: DoctorToolTipIcon,
    text: DoctorToolTipText
  },
  police: {
    icon: PoliceToolTipIcon,
    text: PoliceToolTipText
  }
};

const MafiaToolTip = () => {
  const [role, setRole] = useState<Role | null>(null);
  const { userId } = useConnectStore();

  useEffect(() => {
    socket.on("openPlayerRole", (incomingUserId, assignedRole: Role) => {
      if (incomingUserId === userId) {
        setRole(assignedRole); //할당된 Role을 받아옴
      }
    });

    return () => {
      socket.off("openPlayerRole");
    };
  }, [userId]);

  if (!role || !toolTipInfo[role]) {
    return null;
  }

  const currentRoleInfo = toolTipInfo[role];

  return (
    <ul className={S.toolTipWrap}>
      <li>
        <h3>
          <Image src={currentRoleInfo.icon} alt={role} />
        </h3>
        <p>
          <Image src={currentRoleInfo.text} alt={role} />
        </p>
      </li>
    </ul>
  );
};

export default MafiaToolTip;
