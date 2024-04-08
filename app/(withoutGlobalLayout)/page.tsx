import React from "react";
import S from "@/style/introPage/intro.module.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/logo.svg";

const IntroPage = () => {
  return (
    <>
      <div className={S.introHeaderWrap}>
        <header>
          <Link href="/">
            <Image src={Logo} alt="아이스 크래프트 홈페이지입니다." />
          </Link>
        </header>
        <section className={S.section}>
          <video
            className={S.video}
            src="https://ktfrmyssyzqmoljohixh.supabase.co/storage/v1/object/public/vedio/intro.mp4?t=2024-04-04T09%3A05%3A53.658Z"
            muted
            autoPlay
            loop
          ></video>
          <div className={S.introTitle}>
            <h1 className={S.h1}>INTO STUNNING SPACE</h1>
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
    </>
  );
};

export default IntroPage;
