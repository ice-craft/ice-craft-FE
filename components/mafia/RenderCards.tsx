import React from "react";
import Image from "next/image";
import { RenderCardsProps } from "@/types/index";

const RenderCards: React.FC<RenderCardsProps> = ({ cards, role, showAllCards }) => {
  if (showAllCards) {
    return (
      <ul>
        {Object.entries(cards).map(([key, { src, alt }]) => (
          <li key={key}>
            <Image src={src} alt={alt} />
          </li>
        ))}
      </ul>
    );
  } else if (role && cards[role]) {
    const card = cards[role];
    return (
      <ul>
        <li>
          <Image src={card.src} alt={card.alt} />
        </li>
      </ul>
    );
  } else {
    return null;
  }
};

export default RenderCards;
