export const revalidate = 1800;

import RankingEmptyImage from "@/assets/images/ranking_empty.svg";
import S from "@/style/ranking/ranking.module.css";
import GoTopButton from "@/utils/GoTopButton";
import Image from "next/image";
import Pagination from "@/components/ranking/Pagination";
import MyLanking from "@/components/ranking/MyRanking";
import { getUsersRanking } from "@/utils/supabase/rankingAPI";
import { Ranking } from "@/types";

const Rankingpage = async () => {
  const rankingList = await getUsersRanking();

  const setRanking = async (rankingList: Ranking[]) => {
    let sameScoreCount = 1;
    let ranking = 1;

    rankingList[0].ranking = 1;

    for (let i = 1; i < rankingList.length; i++) {
      if (rankingList[i].total_score === rankingList[i - 1].total_score) {
        sameScoreCount++;
      } else {
        ranking += sameScoreCount;
        sameScoreCount = 1;
      }
      rankingList[i].ranking = ranking;
    }
  };

  setRanking(rankingList);

  return (
    <section className={S.sectionWrapper}>
      <div className={S.userRanking}>
        <h2>랭킹 순위</h2>
      </div>
      <ul className={S.userRankingTitle}>
        <li>랭킹</li>
        <li>닉네임</li>
        <li>마피아</li>
        <li>노래 맞추기</li>
        <li>총점</li>
      </ul>
      {<MyLanking rankingList={rankingList} />}
      {rankingList ? (
        <Pagination rankingList={rankingList} />
      ) : (
        <div className={S.rankingEmpty}>
          <Image src={RankingEmptyImage} alt="랭킹페이지 내용이 없습니다." />
        </div>
      )}
      <GoTopButton />
    </section>
  );
};

export default Rankingpage;
