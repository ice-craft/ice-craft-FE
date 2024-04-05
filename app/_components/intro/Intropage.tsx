import React from "react";
import S from "@/app/_style/IntroPage/video.module.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/logo.svg";

const IntroPage = () => {
  return (
    <section className="">
      <header className="">
        <Link href="/">
          <Image src={Logo} alt="아이스크레프트 홈페이지입니다." />
        </Link>
      </header>
      <div>
        <Link href="/main">GetStarted</Link>
        <Link href="/login">Login</Link>
        <div>
          <p>아직 회원가입을 하지 않으셨으면</p>
          <Link href="/register">회원가입 하기</Link>
        </div>
      </div>
      <video
        className={S.video}
        src="https://ktfrmyssyzqmoljohixh.supabase.co/storage/v1/object/public/vedio/intro.mp4?t=2024-04-04T09%3A05%3A53.658Z"
        muted
        autoPlay
        loop
      ></video>
    </section>
  );
};

export default IntroPage;
