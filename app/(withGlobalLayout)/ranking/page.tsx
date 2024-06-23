export const revalidate = 1800;

import ArrowLeft from "@/assets/images/ranking_arrow_left.svg";
import ArrowRight from "@/assets/images/ranking_arrow_right.svg";
import RankingEmptyImage from "@/assets/images/ranking_empty.svg";
import S from "@/style/ranking/ranking.module.css";
import GoTopButton from "@/utils/GoTopButton";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import SearchIcon from "@/assets/images/icon_search.svg";
import Pagination from "@/components/ranking/Pagination";

const Rankingpage = async () => {
  const supabase = createClient();
  const { data } = await supabase.from("ranking_table").select("*").order("mafia_score", { ascending: false });

  return (
    <section className={S.sectionWrapper}>
      <div className={S.userRanking}>
        <h2>랭킹 순위</h2>
        <form>
          <input type="text" placeholder="검색어를 입력해 주세요" />
        </form>
        <button>
          <Image src={SearchIcon} alt="search Icon" />
        </button>
      </div>
      <ul className={S.userRankingTitle}>
        <li>랭킹</li>
        <li>닉네임</li>
        <li>마피아</li>
        <li>노래 맞추기</li>
        <li>총점</li>
      </ul>
      {data ? (
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
          {/* <ul className={S.userRankingList}>
            {data.map((item: any, index: number) => (
              <li key={index}>
                <div>
                  <h2>{index + 1}</h2>
                  <h3>{item.nickname}</h3>
                  <p className={S.mafiaUserRanking}>{item.game_category}</p>
                  <p className={S.songUserRanking}>-</p>
                  <p className={S.totalRanking}>{item.total_score}</p>
                </div>
              </li>
            ))}
          </ul> */}
        </div>
      ) : (
        <div className={S.rankingEmpty}>
          <Image src={RankingEmptyImage} alt="랭킹페이지 내용이 없습니다." />
        </div>
      )}
      {/* <div className={S.pagerWrapper}>
        <button>
          <Image src={ArrowLeft} alt="left button" />
        </button>
        <ol className={S.pager}>
          <li className={S.active}>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
        </ol>
        <button>
          <Image src={ArrowRight} alt="right button" />
        </button>
      </div> */}
      <Pagination data={data} />
      <GoTopButton />
    </section>
  );
};

export default Rankingpage;
