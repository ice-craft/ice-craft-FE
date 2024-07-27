import React from "react";
import S from "@/style/ranking/ranking.module.css";
import { MyLankingProps, Ranking } from "@/types";

const MyLanking = ({ ranking }: MyLankingProps) => {
  return (
    <div>
      {ranking ? (
        <ul className={S.myRankingList}>
          <li>
            <div>
              <h2>{ranking.ranking}</h2>
              <h3>{ranking.nickname}</h3>
              <p className={S.mafiaUserRanking}>{ranking.mafia_score}</p>
              <p className={S.songUserRanking}>{ranking.music_score}</p>
              <p className={S.totalRanking}>{ranking.total_score}</p>
            </div>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default MyLanking;
