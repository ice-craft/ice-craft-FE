"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import GoTopButtonIcon from "@/assets/images/arrow_top.svg";
import S from "@/style/commons/commons.module.css";

export default function GoTopButton() {
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div>
      {isVisible && (
        <button className={S.goTopButton} onClick={scrollToTop}>
          <Image src={GoTopButtonIcon} alt="Scroll to Top" />
        </button>
      )}
    </div>
  );
}
