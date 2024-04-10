import React from "react";
import FooterLogo from "@/assets/images/footer_logo.svg";
import GithubIcon from "@/assets/images/icon-github.png";
import S from "@/style/commons/commons.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={S.footerWrap}>
      <footer className={S.footer}>
        <Image src={FooterLogo} alt="Logo" />
        <p>copyright &copy; 2024 by IceCraft. all rights reserved.</p>
        <Link href="https://github.com/TeamSparta-Project/ice-craft" target="_blank">
          <Image src={GithubIcon} alt="github logo" />
        </Link>
      </footer>
    </div>
  );
};
export default Footer;
