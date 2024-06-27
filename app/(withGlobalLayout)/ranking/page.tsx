export const revalidate = 1800;

import RankingEmptyImage from "@/assets/images/ranking_empty.svg";
import S from "@/style/ranking/ranking.module.css";
import GoTopButton from "@/utils/GoTopButton";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Pagination from "@/components/ranking/Pagination";
import MyLanking from "@/components/ranking/MyRanking";
import FormSearch from "@/utils/FormSearch";

const Rankingpage = async () => {
  const supabase = createClient();
  const { data } = await supabase.from("ranking_table").select("*").order("total_score", { ascending: false });

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
      {data ? (
        <MyLanking data={data} />
      ) : (
        <div className={S.rankingEmpty}>
          <Image src={RankingEmptyImage} alt="랭킹페이지 내용이 없습니다." />
        </div>
      )}
      <Pagination data={data} />
      <GoTopButton />
    </section>
  );
};

export default Rankingpage;
