"use client";
import React, { useEffect } from "react";
import { getUserInfo, getUserNickname, oAuthKakaoLogIn } from "../_utils/supabase/authAPI";

const Test = () => {
  useEffect(() => {
    const test = async () => {
      const nickname = await getUserInfo();
      if (!nickname) {
        console.log("닉네임 없음");
      }
      console.log(nickname);
    };

    test();
  }, []);
  return <div>Test</div>;
};

export default Test;
