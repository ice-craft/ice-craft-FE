"use client";
import React, { useEffect } from "react";
import {
  getUserEmail,
  getUserInfo,
  getUserNickname,
  getUserUid,
  logOut,
  updateUserNickname
} from "../_utils/supabase/authAPI";
import { checkUserRegistered, duplicateCheckUserNickname, registerAccount } from "../_utils/supabase/accountAPI";

const Test = () => {
  useEffect(() => {
    const test = async () => {
      const userEmail = await getUserEmail();
      const isUserRegistered = await checkUserRegistered(userEmail!);
      if (isUserRegistered) {
        return;
      }
      while (true) {
        let inputNickname = window.prompt("닉네임을 입력하세요.");
        if (inputNickname && 2 <= inputNickname.length && inputNickname.length <= 6) {
          const isExistedNickname = await duplicateCheckUserNickname(inputNickname);
          if (!isExistedNickname) {
            const email = await getUserEmail();
            const nickname = await getUserNickname();
            const uid = await getUserUid();
            if (email && nickname && uid) {
              await registerAccount(uid, email, nickname);
              break;
            }
          } else {
            console.log("이미 존재하는 닉네임입니다."); //NOTE - 테스트 코드입니다.
            continue;
          }
        } else {
          console.log("닉네임의 조건이 맞지않습니다."); //NOTE - 테스트 코드입니다.
          continue;
        }
      }
    };
    test();
  }, []);
  return <div>Test</div>;
};

export default Test;
