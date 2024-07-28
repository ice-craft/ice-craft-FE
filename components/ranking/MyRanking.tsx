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
        let userInfo = await getUserInfo();
        const nickname = userInfo.user_metadata.name;
        const ranking = rankingList.find((ranking: Ranking) => ranking.nickname === nickname);

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
