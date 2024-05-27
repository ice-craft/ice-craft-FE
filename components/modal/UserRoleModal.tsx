import CitizensCard from "@/assets/images/Citizens_Card.avif";
import DoctorCard from "@/assets/images/Doctor_Card.avif";
import MafiaCard from "@/assets/images/Mafia_Card.avif";
import PoliceCard from "@/assets/images/Police_Card.avif";
import RenderCards from "@/components/mafia/RenderCards";
import { useCountDown } from "@/hooks/useCountDown";
import { useModalActions, useModalTimer, useRoleModalElement } from "@/store/show-modal-store";
import S from "@/style/modal/modal.module.css";
import React, { useEffect, useState } from "react";

// 카드 이미지 리스트
const cards = {
  의사: { src: DoctorCard.src, alt: "의사" },
  경찰: { src: PoliceCard.src, alt: "경찰" },
  마피아: { src: MafiaCard.src, alt: "마피아" },
  시민: { src: CitizensCard.src, alt: "시민" }
};

const UserRoleModal = () => {
  const timer = useModalTimer();
  // const count = useCountDown(timer, 10, 100);
  const role = useRoleModalElement();
  const { setIsOpen } = useModalActions();
  const [showAllCards, setShowAllCards] = useState(true);

  //NOTE - 직업 카드
  useEffect(() => {
    const cardTimer = setTimeout(() => {
      setShowAllCards(false);
    }, 3000);

    return () => clearTimeout(cardTimer);
  }, []);

  // 모달창 종료
  // useEffect(() => {
  //   if (count === 0) {
  //     setIsOpen(false);
  //   }
  // }, [count]);

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.workModal}>
          <h1 className={S.workTitle}>직업을 정하겠습니다.</h1>
          <ul className={S.workList}>
            <RenderCards cards={cards} role={role} showAllCards={showAllCards} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserRoleModal;
