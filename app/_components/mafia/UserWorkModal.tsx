import React from "react";
import S from "@/app/_style/modal/modal.module.css";
import DoctorCard from "@/public/images/Doctor_Card.png";
import PoliceCard from "@/public/images/Police_Card.png";
import MafiaCard from "@/public/images/Mafia_Card.png";
import CitizensCard from "@/public/images/Citizens_Card.png";
import Image from "next/image";

const UserWorkModal = () => {
  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.workModal}>
          <h2 className={S.workTitle}>직업을 선택합니다.</h2>
          <ul className={S.workList}>
            <li>
              <Image src={CitizensCard} alt="doctor" />
            </li>
            <li>
              <Image src={MafiaCard} alt="doctor" />
            </li>
            <li>
              <Image src={PoliceCard} alt="doctor" />
            </li>
            <li>
              <Image src={DoctorCard} alt="doctor" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserWorkModal;
