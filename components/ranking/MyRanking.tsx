"use client";

import React from "react";
import S from "@/style/ranking/ranking.module.css";

const MyLanking = () => {
  return (
    <div>
      <ul className={S.myRankingList}>
        <li>
          <div>
            <h2>999</h2>
            <h3>내 닉네임</h3>
            <p className={S.mafiaUserRanking}>1000</p>
            <p className={S.songUserRanking}>2000</p>
            <p className={S.totalRanking}>3000</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MyLanking;
