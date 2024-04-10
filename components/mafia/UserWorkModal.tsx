import React, { useState, useEffect } from "react";
import S from "@/style/modal/modal.module.css";
import DoctorCard from "@/assets/images/Doctor_Card.png";
import PoliceCard from "@/assets/images/Police_Card.png";
import MafiaCard from "@/assets/images/Mafia_Card.png";
import CitizensCard from "@/assets/images/Citizens_Card.png";
import Image from "next/image";
import { Role } from "@/types/index";

const UserWorkModal = () => {
  const [role, setRole] = useState<Role>("mafia");
  const [showAllCards, setShowAllCards] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const cards = {
    doctor: { src: DoctorCard, alt: "의사" },
    police: { src: PoliceCard, alt: "경찰" },
    mafia: { src: MafiaCard, alt: "마피아" },
    citizens: { src: CitizensCard, alt: "시민" }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const roles = ["doctor", "police", "mafia", "citizens"];
      //NOTE - 임시 데이터 불러오면 변경할 예정
      const randomRole = roles[Math.floor(Math.random() * roles.length)];
      setRole(randomRole as Role);
      setShowAllCards(false);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isModalOpen) return null;

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.workModal}>
          <h2 className={S.workTitle}>직업을 선택합니다.</h2>
          <ul className={S.workList}>
            {showAllCards ? (
              //NOTE - 객체 순회 함수
              Object.entries(cards).map(([key, { src, alt }]) => (
                <li key={key}>
                  <Image src={src} alt={alt} />
                </li>
              ))
            ) : role ? (
              <li>
                <Image src={cards[role].src} alt={cards[role].alt} />
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserWorkModal;
