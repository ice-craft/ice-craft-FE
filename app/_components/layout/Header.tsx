import React from "react";
import Nav from "./Nav";
import Link from "next/link";
import Logo from "@/public/images/logo.svg";
import Image from "next/image";
import S from "@/app/_style/commons/commons.module.css";

const Header = () => {
  return (
    <div className={S.headerWrap}>
      <header className={S.header}>
        <h1>
          <Link href="/">
            <Image src={Logo} alt="Logo" />
          </Link>
        </h1>
        <Nav />
      </header>
    </div>
  );
};

export default Header;
