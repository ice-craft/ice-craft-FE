import React from "react";
import S from "@/style/Intropage/intro.module.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import TextTyping from "@/utils/TextTyping";
import IntroBg from "@/assets/images/intro_bg.png";

const IntroPage = () => {
  return (
    <div className={S.introWrapper}>
      <header>
        <Link href="/">
          <Image src={Logo} alt="아이스 크래프트 홈페이지입니다." priority />
        </Link>
      </header>
      <section className={S.section}>
        <Image src={IntroBg} alt="ice craft" className={S.IntroImage} />
        {/* <video
          className={S.video}
          src="https://ktfrmyssyzqmoljohixh.supabase.co/storage/v1/object/public/vedio/intro.mp4"
          muted
          autoPlay
          loop
        ></video> */}
        <div className={S.introTitle}>
          <TextTyping />
          <Link href="/main" className={S.mainButton}>
            Get Started
          </Link>
          <Link href="/login" className={S.loginButton}>
            Login
          </Link>
          <div className={S.signUpButton}>
            <p>아직 IceCraft에 가입하지 않으셨나요?</p>
            <Link href="/register">회원가입 하기</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntroPage;
