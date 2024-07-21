import React from "react";
import InfoIcon from "@/assets/images/info_icon.svg";
import Image from "next/image";
import S from "@/style/commons/commons.module.css";

const InfoChat = () => {
  return (
    <div>
      <button className={S.infoButton}>
        <Image src={InfoIcon} alt="info_chat_icon" />
      </button>
    </div>
  );
};

export default InfoChat;
