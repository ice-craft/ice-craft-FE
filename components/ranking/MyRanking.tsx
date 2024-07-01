"use client";

import React from "react";
import S from "@/style/ranking/ranking.module.css";
import { checkUserLogIn } from "@/utils/supabase/authAPI";

//FIXME - 나중에 타입 수정하시구 타입 폴더 index.ts에 넣어주세요
interface MyRankingProps {
  data: any[];
}

const MyRanking = ({ data }: MyRankingProps) => {
  console.log(data);

  /*
  //TODO - 수파베이스에 있는 로그인 정보 불러왔음.
  checkUserLogIn 함수를 사용해서 로그인 된 사용자 정보를 가져오고, 
  if문으로 현재 내가 로그인한 상태 (userId)와 같으면
  자신의 랭킹 정보를 표시하는로직을 작성하면 됨.
*/
  const fetchUser = async () => {
    const loginCheckUser = await checkUserLogIn();
    console.log(loginCheckUser);
  };
  fetchUser();

  //NOTE - 미리 변수이름 생성해둠. 여기다 작성하면 됨. (null 지우셈)
  const myRanking = null;

  return (
    <div>
      {myRanking ? (
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
      ) : null}
    </div>
  );
};

export default MyRanking;
