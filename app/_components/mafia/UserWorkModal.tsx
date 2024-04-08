import React, { useState } from "react";
import S from "@/app/_style/modal/modal.module.css";
import DoctorCard from "@/public/images/Doctor_Card.png";
import PoliceCard from "@/public/images/Police_Card.png";
import MafiaCard from "@/public/images/Mafia_Card.png";
import CitizensCard from "@/public/images/Citizens_Card.png";
import Image from "next/image";
import { Role } from "@/app/_types/index";

const UserWorkModal = () => {
  const [role, setRole] = useState<Role>("mafia");

  const cards = {
    doctor: { src: DoctorCard, alt: "의사" },
    police: { src: PoliceCard, alt: "경찰" },
    mafia: { src: MafiaCard, alt: "마피아" },
    citizens: { src: CitizensCard, alt: "시민" }
  };

  const currentCard = cards[role];

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.workModal}>
          <h2 className={S.workTitle}>직업을 선택합니다.</h2>
          <ul className={S.workList}>
            <li>
              <Image src={currentCard.src} alt={currentCard.alt} />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserWorkModal;
