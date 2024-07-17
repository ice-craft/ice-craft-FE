"use client";
import React, { useEffect } from "react";
import { getUserEmail, getUserNickname, getUserUid, setUserNickname } from "../../utils/supabase/authAPI";
import { checkUserEmailRegistered, registerAccount } from "../../utils/supabase/accountAPI";
import { useRouter } from "next/navigation";

const Test = () => {
  const router = useRouter();
  useEffect(() => {
    const test = async () => {
      const userEmail = await getUserEmail();
      const isUserEmailRegistered = await checkUserEmailRegistered(userEmail!);
      if (isUserEmailRegistered) {
        return;
      }
      while (true) {
        let inputNickname = window.prompt("닉네임을 입력하세요.");
        if (inputNickname && 2 <= inputNickname.length && inputNickname.length <= 6) {
          const isExistedNickname = true; // await checkUserNicknameRegistered(inputNickname);
          if (!isExistedNickname) {
            const email = await getUserEmail();
            const nickname = inputNickname;
            const uid = await getUserUid();
            if (email && nickname && uid) {
              await setUserNickname(nickname);
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
    router.push("/");
  }, []);
  return <div>Test</div>;
};

export default Test;
