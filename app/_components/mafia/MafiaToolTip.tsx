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

const MafiaToolTip = () => {
  return (
    <ul className={S.toolTipWrap}>
      <li>
        <h3>
          <Image src={CitizensToolTipIcon} alt="시민 정보 아이콘" />
        </h3>
        <p>
          <Image src={CitizensToolTipText} alt="시민 정보 내용" />
        </p>
      </li>
      <li>
        <h3>
          <Image src={MafiaToolTipIcon} alt="마피아 정보 아이콘" />
        </h3>
        <p>
          <Image src={MafiaToolTipText} alt="마피아 정보 내용" />
        </p>
      </li>
      <li>
        <h3>
          <Image src={DoctorToolTipIcon} alt="의사 정보 아이콘" />
        </h3>
        <p>
          <Image src={DoctorToolTipText} alt="의사 정보 내용" />
        </p>
      </li>
      <li>
        <h3>
          <Image src={PoliceToolTipIcon} alt="경찰 정보 아이콘" />
        </h3>
        <p>
          <Image src={PoliceToolTipText} alt="경찰 정보 내용" />
        </p>
      </li>
    </ul>
  );
};

export default MafiaToolTip;
