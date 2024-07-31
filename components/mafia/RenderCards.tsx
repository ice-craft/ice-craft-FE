import CitizensCard from "@/assets/images/Citizens_Card.avif";
import DoctorCard from "@/assets/images/Doctor_Card.avif";
import MafiaCard from "@/assets/images/Mafia_Card.avif";
import PoliceCard from "@/assets/images/Police_Card.avif";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLocalParticipant } from "@livekit/components-react";
import getPlayerJob from "@/utils/mafia/getPlayerJob";
import { useRoleModalElement } from "@/store/show-modal-store";

const RenderCards = () => {
  const role = useRoleModalElement();
  const { localParticipant } = useLocalParticipant();
  const [showAllCards, setShowAllCards] = useState(true);

  //NOTE - 해당 local player의 직업 찾기
  const playerJob = getPlayerJob(role, localParticipant.identity);

  // 카드 이미지 리스트
  const cards = {
    doctor: { src: DoctorCard.src, alt: "의사" },
    police: { src: PoliceCard.src, alt: "경찰" },
    mafia: { src: MafiaCard.src, alt: "마피아" },
    citizen: { src: CitizensCard.src, alt: "시민" }
  };

  //NOTE - 직업 카드
  useEffect(() => {
    const cardTimer = setTimeout(() => {
      setShowAllCards(false);
    }, 3000);

    return () => clearTimeout(cardTimer);
  }, []);

  return (
    <>
      {Object.entries(cards).map(([key, { src, alt }]) =>
        showAllCards || key === playerJob ? (
          <li key={key}>
            <Image width={521} height={716} src={src} alt={alt} />
          </li>
        ) : null
      )}
    </>
  );
};

export default RenderCards;
