export const revalidate = 1; //NOTE - 30분
// "use client";

import RankingEmptyImage from "@/assets/images/ranking_empty.svg";
import S from "@/style/ranking/ranking.module.css";
import GoTopButton from "@/utils/GoTopButton";
import Image from "next/image";
import Pagination from "@/components/ranking/Pagination";
import MyLanking from "@/components/ranking/MyRanking";
import FormSearch from "@/utils/FormSearch";
import { getUsersRanking } from "@/utils/supabase/rankingAPI";
import { Ranking } from "@/types";
import { getUserInfo } from "@/utils/supabase/authAPI";

const Rankingpage = async () => {
  const rankingList = await getUsersRanking();
  let myLanking = null;
  console.log("렌더링");

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

  const getMyLanking = async () => {
    // let userInfo = null;
    try {
      // userInfo = await getUserInfo();

      // const nickname = userInfo.user_metadata.name;
      const nickname = "김명환";
      const result = rankingList.find((ranking) => ranking.nickname === nickname);

      return result;
    } catch (e) {
      console.log((e as Error).message);
      return null;
    }
  };

  setRanking(rankingList);
  myLanking = await getMyLanking();
  console.log("나의 랭킹", myLanking);
  console.log("랭킹 목록", rankingList);

  return (
    <section className={S.sectionWrapper}>
      <div className={S.userRanking}>
        <h2>랭킹 순위</h2>
        <FormSearch placeholder="닉네임을 입력해 주세요." />
      </div>
      <ul className={S.userRankingTitle}>
        <li>랭킹</li>
        <li>닉네임</li>
        <li>마피아</li>
        <li>노래 맞추기</li>
        <li>총점</li>
      </ul>
      {myLanking && <MyLanking ranking={myLanking} />}
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
