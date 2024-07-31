"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import GoTopButtonIcon from "@/assets/images/arrow_top.svg";
import GoTopButtonIconHover from "@/assets/images/arrow_top_hover.svg";
import S from "@/style/commons/commons.module.css";

export default function GoTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldBeVisible = scrollY > 500;

      setIsVisible(shouldBeVisible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };

  const mouseLeaveHandler = () => {
    setIsHovered(false);
  };

  return (
    <>
      {isVisible && (
        <button
          className={S.goTopButton}
          onClick={scrollToTop}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          <Image src={isHovered ? GoTopButtonIconHover : GoTopButtonIcon} alt="Scroll to Top" />
        </button>
      )}
    </>
  );
}
