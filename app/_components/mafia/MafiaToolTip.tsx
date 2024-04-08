import React from "react";
import S from "@/app/_style/livekit/livekit.module.css";
import Image from "next/image";
import CitizensToolTipIcon from "@/public/images/citizens_ToolTip_Icon.png";
import CitizensToolTipText from "@/public/images/citizens_ToolTip_text.png";
import MafiaToolTipIcon from "@/public/images/mafia_ToolTip_Icon.png";
import MafiaToolTipText from "@/public/images/mafia_ToolTip_text.png";
import DoctorToolTipIcon from "@/public/images/doctor_ToolTip_Icon.png";
import DoctorToolTipText from "@/public/images/doctor_ToolTip_text.png";
import PoliceToolTipIcon from "@/public/images/police_ToolTip_Icon.png";
import PoliceToolTipText from "@/public/images/police_ToolTip_Text.png";
import { MafiaGameToolTip } from "@/app/_types/index";

const MafiaToolTip: React.FC<MafiaGameToolTip> = ({ role }) => {
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
