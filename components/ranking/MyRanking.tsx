"use client";

import React, { useEffect, useState } from "react";
import S from "@/style/ranking/ranking.module.css";
import { MyLankingProps, Ranking } from "@/types";
import { getUserInfo } from "@/utils/supabase/authAPI";

const MyLanking = ({ rankingList }: MyLankingProps) => {
  const [myRanking, setMyRanking] = useState<Ranking | null>();

  useEffect(() => {
    const setMyLanking = async () => {
      try {
        const userInfo = await getUserInfo();
        const userId = userInfo.id;
        const ranking = rankingList.find((ranking: Ranking) => ranking.user_id === userId);

        setMyRanking(ranking);
      } catch (e) {
        setMyRanking(null);
      }
    };

    setMyLanking();
  }, []);

  return (
    <div>
      {myRanking && (
        <ul className={S.myRankingList}>
          <li>
            <div>
              <h2>{myRanking.ranking}</h2>
              <h3>{myRanking.nickname}</h3>
              <p className={S.mafiaUserRanking}>{myRanking.mafia_score}</p>
              <p className={S.songUserRanking}>{myRanking.music_score}</p>
              <p className={S.totalRanking}>{myRanking.total_score}</p>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default MyLanking;
