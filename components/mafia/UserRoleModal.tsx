import React, { useState, useEffect } from "react";
import Image from "next/image";
import S from "@/style/modal/modal.module.css";
import DoctorCard from "@/assets/images/Doctor_Card.avif";
import PoliceCard from "@/assets/images/Police_Card.avif";
import MafiaCard from "@/assets/images/Mafia_Card.avif";
import CitizensCard from "@/assets/images/Citizens_Card.avif";
import { Role } from "@/types/index";
import { socket } from "@/utils/socket/socket";
import useConnectStore from "@/store/connect-store";
import RenderCards from "./RenderCards";

const cards = {
  doctor: { src: DoctorCard.src, alt: "의사" },
  police: { src: PoliceCard.src, alt: "경찰" },
  mafia: { src: MafiaCard.src, alt: "마피아" },
  citizens: { src: CitizensCard.src, alt: "시민" }
};

interface UserRoleModalProps {
  role: Role;
}

const UserRoleModal: React.FC<UserRoleModalProps> = ({ role }) => {
  // const { userId } = useConnectStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllCards, setShowAllCards] = useState(true);

  useEffect(() => {
    setIsModalOpen(true);
    setShowAllCards(true);

    const timer = setTimeout(() => {
      setShowAllCards(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [role]);

  if (!isModalOpen) return null;

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.workModal}>
          <h2 className={S.workTitle}>직업을 정하겠습니다.</h2>
          <ul className={S.workList}>
            <RenderCards cards={cards} role={role} showAllCards={showAllCards} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserRoleModal;
