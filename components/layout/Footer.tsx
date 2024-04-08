import React from "react";
import FooterLogo from "@/public/images/footer_logo.svg";
import S from "@/style/commons/commons.module.css";
import Image from "next/image";
import Link from "next/link";
import GithubIcon from "@/public/images/icon-github.png";

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
