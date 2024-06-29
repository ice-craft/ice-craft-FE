"use client";

import React, { useEffect, useState } from "react";
import S from "@/style/commons/commons.module.css";
import { useCookies } from "react-cookie";

const Popup = () => {
  const [open, setOpen] = useState(true);
  const [cookies, setCookie] = useCookies(["IceCraft_Cookie"]);

  //닫기
  const closeModal = () => {
    setOpen(false);
  };

  //하루 보지 않기
  const closeForADay = () => {
    const expires = getExpiredDate(1);
    setCookie("IceCraft_Cookie", true, { expires });
    setOpen(false);
  };

  const getExpiredDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };

  useEffect(() => {
    if (cookies["IceCraft_Cookie"]) {
      setOpen(false);
    }
  }, []);

  if (!open) return null;

  return (
    <article className={S.article}>
      <div className={S.popupContent}>
        <h2>공지사항</h2>
        <div>
          <p>IceCraft를 방문해 주셔서 감사합니다.</p>
          <p>
            현재 마피아 게임은 <span>&quot;캠&quot;</span>과 <span>&quot;마이크&quot;</span>가 있으신 분들만 게임이
            가능합니다. 이용에 참고해 주시기 바랍니다.
          </p>
        </div>
      </div>
      <div className={S.closeButton}>
        <button onClick={closeForADay}>하루 보지 않기</button>
        <button onClick={closeModal}>닫기</button>
      </div>
    </article>
  );
};

export default Popup;
