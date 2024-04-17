import React, { useState, useEffect } from "react";
import S from "@/style/modal/modal.module.css";
import DoctorCard from "@/assets/images/Doctor_Card.svg";
import PoliceCard from "@/assets/images/Police_Card.svg";
import MafiaCard from "@/assets/images/Mafia_Card.svg";
import CitizensCard from "@/assets/images/Citizens_Card.svg";
import { Role } from "@/types/index";
import { socket } from "@/utils/socket/socket";
import useConnectStore from "@/store/connect-store";
import RenderCards from "./RenderCards";

const cards = {
  doctor: { src: DoctorCard, alt: "의사" },
  police: { src: PoliceCard, alt: "경찰" },
  mafia: { src: MafiaCard, alt: "마피아" },
  citizens: { src: CitizensCard, alt: "시민" }
};

const UserRoleModal = () => {
  const { userId } = useConnectStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const [showAllCards, setShowAllCards] = useState(true);

  useEffect(() => {
    socket.on("openPlayerRole", (incomingUserId, Role) => {
      if (incomingUserId === userId) {
        setRole(Role);
        setIsModalOpen(true);
        setTimeout(() => {
          setShowAllCards(false);
        }, 3000);
      }
    });

    return () => {
      socket.off("openPlayerRole");
    };
  }, [userId]);

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
