// export const revalidate = 30 * 60 * 60; //NOTE - 30분
"use client";

import RankingEmptyImage from "@/assets/images/ranking_empty.svg";
import S from "@/style/ranking/ranking.module.css";
import GoTopButton from "@/utils/GoTopButton";
import Image from "next/image";
import Pagination from "@/components/ranking/Pagination";
import MyLanking from "@/components/ranking/MyRanking";
import FormSearch from "@/utils/FormSearch";
import { getUsersRanking } from "@/utils/supabase/rankingAPI";
import { useEffect } from "react";

const Rankingpage = async () => {
  const rankingList = await getUsersRanking();
  // let data = await getUsersRanking();
  // console.log("목록", rankingList);
  console.log("렌더링");

  const setRanking = async () => {
    const data = await getUsersRanking();
    let sameScoreCount = 1;
    let ranking = 1;
    let prevItem = data[0].total_score;

    // console.log("결과");
    for (let i = 0; i < data.length; i++) {
      // console.log(i, data[i]);
    }
  };

  setRanking();

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
      {rankingList ? (
        <MyLanking data={rankingList} />
      ) : (
        <div className={S.rankingEmpty}>
          <Image src={RankingEmptyImage} alt="랭킹페이지 내용이 없습니다." />
        </div>
      )}
      <Pagination data={rankingList} />
      <GoTopButton />
    </section>
  );
};

export default Rankingpage;
