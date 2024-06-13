import CitizensToolTipIcon from "@/assets/images/citizens_ToolTip_Icon.svg";
import CitizensToolTipText from "@/assets/images/citizens_ToolTip_text.svg";
import DoctorToolTipIcon from "@/assets/images/doctor_ToolTip_Icon.svg";
import DoctorToolTipText from "@/assets/images/doctor_ToolTip_text.svg";
import MafiaToolTipIcon from "@/assets/images/mafia_ToolTip_Icon.svg";
import MafiaToolTipText from "@/assets/images/mafia_ToolTip_text.svg";
import PoliceToolTipIcon from "@/assets/images/police_ToolTip_Icon.svg";
import PoliceToolTipText from "@/assets/images/police_ToolTip_text.svg";
import { useRoleModalElement } from "@/store/show-modal-store";
import S from "@/style/livekit/livekit.module.css";
import getPlayerJob from "@/utils/mafiaSocket/getPlayerJob";
import { useLocalParticipant } from "@livekit/components-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const toolTipInfo: { [key: string]: { icon: string; text: string } } = {
  citizen: {
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
  const role = useRoleModalElement();
  const { localParticipant } = useLocalParticipant();
  const [playerJob, setPlayerJob] = useState<string | undefined>("");

  useEffect(() => {
    const job = getPlayerJob(role, localParticipant.identity);
    setPlayerJob(job);
  }, [role]);

  if (!role || !playerJob) {
    return null;
  }

  const currentRoleInfo = toolTipInfo[playerJob];

  console.log("currentRole", currentRoleInfo);

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
