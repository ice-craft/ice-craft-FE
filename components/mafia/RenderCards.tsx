import React from "react";
import Image from "next/image";
import { RenderCardsProps } from "@/types/index";

const RenderCards: React.FC<RenderCardsProps> = ({ cards, role, showAllCards }) => {
  return (
    <>
      {Object.entries(cards).map(([key, { src, alt }]) =>
        showAllCards || key === role ? (
          <li key={key}>
            <Image src={src} alt={alt} />
          </li>
        ) : null
      )}
    </>
  );
};

export default RenderCards;
