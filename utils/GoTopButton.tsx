import React, { useState, useEffect } from "react";
import Image from "next/image";
import GoTopButtonIcon from "@/assets/images/arrow_top.svg";

export default function GoTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldBeVisible = scrollY > 700;

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
        <button className="go-top-button" onClick={scrollToTop}>
          <Image src={GoTopButtonIcon} alt="Scroll to Top" />
        </button>
      )}
    </div>
  );
}
