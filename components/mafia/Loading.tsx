import Image from "next/image";
import React from "react";
import S from "@/style/commons/commons.module.css";
import { designer } from "@/public/fonts/fonts";

const Loading = () => {
  return (
    <section className={`${S.loadingWrapper} ${designer.className}`}>
      <div>IceCraft</div>
      <div>Loading...</div>
      <div>메인페이지로 이동중 입니다.</div>
    </section>
  );
};

export default Loading;
