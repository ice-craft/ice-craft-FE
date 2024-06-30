import React from "react";
import FooterLogo from "@/assets/images/footer_logo.svg";
import GithubIcon from "@/assets/images/icon-github.svg";
import S from "@/style/commons/commons.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={S.footerWrap}>
      <footer className={S.footer}>
        <Image src={FooterLogo} alt="Logo" />
        <address className={S.addressInfo}>
          <p>copyright &copy;2024 by IceCraft Team. all rights reserved.</p>
          <Link href="">버그 제보 및 문의사항 바로가기</Link>
        </address>
        <Link href="https://github.com/TeamSparta-Project/ice-craft" target="_blank" rel="noopener noreferrer">
          <Image src={GithubIcon} alt="github logo" />
        </Link>
      </footer>
    </div>
  );
};
export default Footer;
